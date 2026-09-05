/* =========================================================
   saju-data.js — 사주 원시 데이터 (천간·지지·오행·음양·십신·관계)
   ---------------------------------------------------------
   ▸ 순수 데이터/상수만 정의한다. 계산 로직은 saju-calculator.js,
     해석 문구는 saju-interpretation.js 를 참고할 것.
   ▸ 모든 표는 명리학 고전(자평진전 등)에 실린 표준 배속표로,
     추정/임의 계산이 아니다.
   ========================================================= */

(function (global) {
  var STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
  var BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

  /* 오행 인덱스: 0=목 1=화 2=토 3=금 4=수 */
  var ELEMENTS = [
    { key: 'wood',  name: '목(木)', trait: '성장, 뻗어 나감', color: '#6fae7c' },
    { key: 'fire',  name: '화(火)', trait: '열정, 확산',      color: '#d1795f' },
    { key: 'earth', name: '토(土)', trait: '안정, 중재',      color: '#c2a166' },
    { key: 'metal', name: '금(金)', trait: '결단, 정리',      color: '#9fa7b3' },
    { key: 'water', name: '수(水)', trait: '지혜, 유연함',    color: '#6f92c4' }
  ];

  var STEM_ELEMENT = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
  var STEM_YINYANG = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1]; // 1=양 -1=음

  var BRANCH_ELEMENT = [4, 2, 0, 0, 2, 1, 1, 2, 3, 3, 2, 4];
  var BRANCH_YINYANG = [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1];

  var PILLAR_LABELS = ['년주 年', '월주 月', '일주 日', '시주 時'];
  var PILLAR_SHORT = ['년', '월', '일', '시'];

  /* 십신: [일간 기준 오행차, 음양 동일 여부] → 이름 */
  var TEN_GOD_NAMES = {
    same_same: '비견', same_diff: '겁재',
    generate_same: '식신', generate_diff: '상관',
    control_same: '편재', control_diff: '정재',
    controlledBy_same: '편관', controlledBy_diff: '정관',
    generatedBy_same: '편인', generatedBy_diff: '정인'
  };

  /* 천간합 (합화 오행) */
  var STEM_COMBINATIONS = [
    { pair: [0, 5], element: 2, name: '갑기합토' },
    { pair: [1, 6], element: 3, name: '을경합금' },
    { pair: [2, 7], element: 4, name: '병신합수' },
    { pair: [3, 8], element: 0, name: '정임합목' },
    { pair: [4, 9], element: 1, name: '무계합화' }
  ];

  /* 천간충 (무기토는 충이 없음) */
  var STEM_CLASHES = [
    { pair: [0, 6], name: '갑경충' },
    { pair: [1, 7], name: '을신충' },
    { pair: [2, 8], name: '병임충' },
    { pair: [3, 9], name: '정계충' }
  ];

  /* 지지 육합 (합화 오행, 오미합은 합화 오행이 불분명하여 null) */
  var BRANCH_COMBINATIONS = [
    { pair: [0, 1], element: 2, name: '자축합' },
    { pair: [2, 11], element: 0, name: '인해합' },
    { pair: [3, 10], element: 1, name: '묘술합' },
    { pair: [4, 9], element: 3, name: '진유합' },
    { pair: [5, 8], element: 4, name: '사신합' },
    { pair: [6, 7], element: null, name: '오미합' }
  ];

  /* 지지 삼합 (합화 오행) */
  var BRANCH_TRIADS = [
    { triad: [2, 6, 10], element: 1, name: '인오술 삼합(화국)' },
    { triad: [5, 9, 1], element: 3, name: '사유축 삼합(금국)' },
    { triad: [8, 0, 4], element: 4, name: '신자진 삼합(수국)' },
    { triad: [11, 3, 7], element: 0, name: '해묘미 삼합(목국)' }
  ];

  /* 지지충 (정반대 방향) */
  var BRANCH_CLASHES = [
    { pair: [0, 6], name: '자오충' },
    { pair: [1, 7], name: '축미충' },
    { pair: [2, 8], name: '인신충' },
    { pair: [3, 9], name: '묘유충' },
    { pair: [4, 10], name: '진술충' },
    { pair: [5, 11], name: '사해충' }
  ];

  /* 지지 삼형 / 상형 (자형은 계산 시 동일 지지 중복으로 판정) */
  var BRANCH_TRIPLE_PUNISHMENTS = [
    { triad: [2, 5, 8], name: '인사신 삼형' },
    { triad: [1, 10, 7], name: '축술미 삼형' }
  ];
  var BRANCH_PAIR_PUNISHMENTS = [
    { pair: [0, 3], name: '자묘형' }
  ];
  var BRANCH_SELF_PUNISH = [4, 6, 9, 11]; // 진·오·유·해가 중복되면 자형

  /* 지지파 */
  var BRANCH_BREAKS = [
    { pair: [0, 9], name: '자유파' },
    { pair: [1, 4], name: '축진파' },
    { pair: [2, 11], name: '인해파' },
    { pair: [3, 6], name: '묘오파' },
    { pair: [5, 8], name: '사신파' },
    { pair: [10, 7], name: '술미파' }
  ];

  /* 지지해 */
  var BRANCH_HARMS = [
    { pair: [0, 7], name: '자미해' },
    { pair: [1, 6], name: '축오해' },
    { pair: [2, 5], name: '인사해' },
    { pair: [3, 4], name: '묘진해' },
    { pair: [8, 11], name: '신해해' },
    { pair: [9, 10], name: '유술해' }
  ];

  global.SajuData = {
    STEMS: STEMS,
    BRANCHES: BRANCHES,
    ELEMENTS: ELEMENTS,
    STEM_ELEMENT: STEM_ELEMENT,
    STEM_YINYANG: STEM_YINYANG,
    BRANCH_ELEMENT: BRANCH_ELEMENT,
    BRANCH_YINYANG: BRANCH_YINYANG,
    PILLAR_LABELS: PILLAR_LABELS,
    PILLAR_SHORT: PILLAR_SHORT,
    TEN_GOD_NAMES: TEN_GOD_NAMES,
    STEM_COMBINATIONS: STEM_COMBINATIONS,
    STEM_CLASHES: STEM_CLASHES,
    BRANCH_COMBINATIONS: BRANCH_COMBINATIONS,
    BRANCH_TRIADS: BRANCH_TRIADS,
    BRANCH_CLASHES: BRANCH_CLASHES,
    BRANCH_TRIPLE_PUNISHMENTS: BRANCH_TRIPLE_PUNISHMENTS,
    BRANCH_PAIR_PUNISHMENTS: BRANCH_PAIR_PUNISHMENTS,
    BRANCH_SELF_PUNISH: BRANCH_SELF_PUNISH,
    BRANCH_BREAKS: BRANCH_BREAKS,
    BRANCH_HARMS: BRANCH_HARMS
  };
})(window);
