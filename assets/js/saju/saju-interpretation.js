/* =========================================================
   saju-interpretation.js — 사주 분석 결과 해석 문구
   ---------------------------------------------------------
   ▸ 계산된 숫자(오행/음양/십신/관계)를 사람이 읽을 문장으로
     바꾸는 역할만 담당한다. 계산 로직은 절대 포함하지 않는다.
   ========================================================= */

(function (global) {
  var D = global.SajuData;

  var ELEMENT_INTERPRETATION = {
    wood: {
      personality: '새로운 것을 배우고 성장하려는 성향이 강합니다. 주변 사람들과의 관계에서도 배려와 협력을 중요하게 생각하는 편입니다.',
      love: '상대방의 감정을 세심하게 살피는 편이며 천천히 신뢰를 쌓아가는 관계가 잘 맞습니다.',
      money: '한 번에 큰 수익을 기대하기보다 꾸준하게 능력을 키워 수입을 늘리는 방식이 잘 맞습니다.',
      career: '기획, 교육, 연구, 디자인, 콘텐츠, 상담처럼 성장과 창의성을 활용하는 분야와 잘 맞습니다.'
    },
    fire: {
      personality: '목표가 생기면 빠르게 행동하는 추진력이 있습니다. 자신의 생각을 적극적으로 표현하는 편입니다.',
      love: '좋아하는 사람에게 적극적으로 다가가는 편이며 서로의 감정을 솔직하게 표현하는 관계가 좋습니다.',
      money: '기회를 빠르게 잡는 능력이 있지만 충동적인 지출은 주의하는 것이 좋습니다.',
      career: '영업, 마케팅, 방송, 콘텐츠, 서비스, 리더십이 필요한 분야에서 장점을 발휘할 수 있습니다.'
    },
    earth: {
      personality: '신중하고 현실적인 판단을 중요하게 생각합니다. 한번 시작한 일은 꾸준히 이어가는 힘이 있습니다.',
      love: '안정적인 관계를 선호하며 신뢰와 책임감을 중요하게 생각합니다.',
      money: '무리한 투자보다 계획적인 저축과 안정적인 자산관리가 잘 맞습니다.',
      career: '관리, 회계, 금융, 행정, 부동산, 조직관리 등 안정성과 책임감이 필요한 분야와 잘 맞습니다.'
    },
    metal: {
      personality: '논리적인 판단과 명확한 기준을 중요하게 생각합니다. 목표를 정하면 끝까지 밀고 나가는 힘이 있습니다.',
      love: '감정보다는 신뢰와 행동을 중요하게 보는 편입니다. 서로의 영역을 존중하는 관계가 잘 맞습니다.',
      money: '수입과 지출을 체계적으로 관리하면 재물운을 안정적으로 키울 수 있습니다.',
      career: '경영, 기술, 금융, 법률, 분석, IT, 전문직처럼 정확한 판단이 필요한 분야와 잘 맞습니다.'
    },
    water: {
      personality: '상황을 빠르게 파악하고 유연하게 대응하는 능력이 있습니다. 관찰력이 좋은 편입니다.',
      love: '상대방을 이해하려는 마음이 강하며 깊은 대화를 나눌 수 있는 관계를 선호합니다.',
      money: '정보를 활용해 기회를 찾는 능력이 있습니다. 다만 지나치게 많은 선택지를 두고 고민하지 않는 것이 좋습니다.',
      career: 'IT, 연구, 기획, 금융, 무역, 상담, 데이터, 커뮤니케이션 분야에서 강점을 발휘할 수 있습니다.'
    }
  };

  var TEN_GOD_DESCRIPTIONS = {
    비견: '자기 주관이 뚜렷하고 독립적으로 행동하는 힘을 뜻합니다.',
    겁재: '경쟁심과 추진력이 있지만 지출·경쟁 과열에 주의가 필요함을 뜻합니다.',
    식신: '표현력과 여유, 꾸준한 결실을 만드는 힘을 뜻합니다.',
    상관: '재능과 표현욕이 강하지만 규율과의 마찰에 주의가 필요함을 뜻합니다.',
    편재: '기회를 잡는 감각과 활동적인 재물운을 뜻합니다.',
    정재: '꾸준하고 계획적인 재물 관리 능력을 뜻합니다.',
    편관: '추진력과 위기 대응력이 있지만 스트레스 관리가 필요함을 뜻합니다.',
    정관: '책임감과 원칙을 지키는 힘, 안정적인 사회적 위치를 뜻합니다.',
    편인: '독창적인 사고와 직관력을 뜻합니다.',
    정인: '학습 능력과 후원, 안정적인 보호막을 뜻합니다.'
  };

  function getElementInterpretation(elementKey) {
    return ELEMENT_INTERPRETATION[elementKey] || null;
  }

  function getTenGodDescription(godName) {
    return TEN_GOD_DESCRIPTIONS[godName] || '';
  }

  function getDayStemSummary(dayStemIndex, dayBranchIndex) {
    var elIndex = D.STEM_ELEMENT[dayStemIndex];
    var el = D.ELEMENTS[elIndex];
    var interp = getElementInterpretation(el.key);
    return {
      label: '일간 ' + D.STEMS[dayStemIndex] + D.BRANCHES[dayBranchIndex] + ' · ' + el.name,
      copy: '태어난 날의 천간(일간)이 ' + D.STEMS[dayStemIndex] + '으로 ' + el.name +
        '에 속합니다. ' + el.trait + '의 기운을 중심으로 보며, 나머지 일곱 글자와의 관계에 따라 실제 해석은 달라집니다.'
    };
  }

  function getYinYangSummary(yinYang) {
    var yangPct = Math.round(yinYang.yangRatio * 100);
    var eumPct = 100 - yangPct;
    var diff = Math.abs(yangPct - eumPct);
    var balance;
    if (diff <= 20) {
      balance = '음과 양의 기운이 비교적 고르게 섞여 있어 상황에 따라 유연하게 대응하는 편입니다.';
    } else if (yangPct > eumPct) {
      balance = '양(陽)의 기운이 더 강해 적극적이고 외향적인 성향이 두드러질 수 있습니다.';
    } else {
      balance = '음(陰)의 기운이 더 강해 신중하고 내면적인 성향이 두드러질 수 있습니다.';
    }
    return { yangPct: yangPct, eumPct: eumPct, copy: balance };
  }

  var RELATION_DESCRIPTIONS = {
    stemCombinations: '천간이 합을 이루면 서로 다른 기운이 결합해 새로운 성향으로 바뀌려는 힘이 생깁니다.',
    stemClashes: '천간이 충돌하면 서로 다른 방향으로 끌어당기는 힘이 작용해 갈등이나 변화가 생기기 쉽습니다.',
    branchCombinations: '지지가 합을 이루면 관계 안에서 화합과 결속이 강해지는 경향이 있습니다.',
    branchTriads: '삼합을 이루면 하나의 기운으로 강하게 뭉쳐 그 오행의 성향이 두드러지게 나타날 수 있습니다.',
    branchClashes: '지지가 충돌하면 자리(연·월·일·시가 상징하는 시기)와 관련된 변화나 이동이 생기기 쉽습니다.',
    punishments: '형이 있으면 관계나 상황에서 마찰, 다툼의 소지가 생기기 쉬우니 절제가 필요합니다.',
    breaks: '파가 있으면 계획이나 관계가 예상과 다르게 틀어지는 일이 생길 수 있습니다.',
    harms: '해가 있으면 겉으로 드러나지 않는 서운함이나 오해가 쌓이기 쉬우니 소통이 중요합니다.'
  };

  function describeRelations(relations) {
    var out = [];
    Object.keys(RELATION_DESCRIPTIONS).forEach(function (key) {
      var list = relations[key];
      if (list && list.length) {
        out.push({
          key: key,
          items: list,
          description: RELATION_DESCRIPTIONS[key]
        });
      }
    });
    return out;
  }

  global.SajuInterpretation = {
    getElementInterpretation: getElementInterpretation,
    getTenGodDescription: getTenGodDescription,
    getDayStemSummary: getDayStemSummary,
    getYinYangSummary: getYinYangSummary,
    describeRelations: describeRelations
  };
})(window);
