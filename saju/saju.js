(function () {
  'use strict';

  var calculateBtn = document.getElementById('sajuCalculateBtn');
  var birthDateInput = document.getElementById('birthDate');
  var birthTimeInput = document.getElementById('birthTime');
  var genderInput = document.getElementById('gender');

  var resultSection = document.getElementById('sajuResult');
  var resultContent = document.getElementById('sajuResultContent');

  if (!calculateBtn || !birthDateInput || !resultContent) {
    return;
  }

  /*
   * ---------------------------------------------------------
   * 기본 데이터
   * ---------------------------------------------------------
   */

  var elements = [
    {
      name: '목(木)',
      keyword: '성장과 발전',
      personality: '새로운 것을 배우고 성장하려는 성향이 강합니다. 주변 사람들과의 관계에서도 배려와 협력을 중요하게 생각하는 편입니다.',
      love: '상대방의 감정을 세심하게 살피는 편이며 천천히 신뢰를 쌓아가는 관계가 잘 맞습니다.',
      money: '한 번에 큰 수익을 기대하기보다 꾸준하게 자신의 능력을 키워 수입을 늘리는 방식이 잘 맞습니다.',
      career: '기획, 교육, 연구, 디자인, 콘텐츠, 상담처럼 성장과 창의성을 활용하는 분야와 잘 맞습니다.'
    },
    {
      name: '화(火)',
      keyword: '열정과 추진력',
      personality: '목표가 생기면 빠르게 행동하는 추진력이 있습니다. 자신의 생각을 적극적으로 표현하는 편입니다.',
      love: '좋아하는 사람에게 적극적으로 다가가는 편이며 서로의 감정을 솔직하게 표현하는 관계가 좋습니다.',
      money: '기회를 빠르게 잡는 능력이 있지만 충동적인 지출은 주의하는 것이 좋습니다.',
      career: '영업, 마케팅, 방송, 콘텐츠, 서비스, 리더십이 필요한 분야에서 장점을 발휘할 수 있습니다.'
    },
    {
      name: '토(土)',
      keyword: '안정과 신뢰',
      personality: '신중하고 현실적인 판단을 중요하게 생각합니다. 한번 시작한 일은 꾸준히 이어가는 힘이 있습니다.',
      love: '안정적인 관계를 선호하며 신뢰와 책임감을 중요하게 생각합니다.',
      money: '무리한 투자보다 계획적인 저축과 안정적인 자산관리가 잘 맞습니다.',
      career: '관리, 회계, 금융, 행정, 부동산, 조직관리 등 안정성과 책임감이 필요한 분야와 잘 맞습니다.'
    },
    {
      name: '금(金)',
      keyword: '판단력과 결단력',
      personality: '논리적인 판단과 명확한 기준을 중요하게 생각합니다. 목표를 정하면 끝까지 밀고 나가는 힘이 있습니다.',
      love: '감정보다는 신뢰와 행동을 중요하게 보는 편입니다. 서로의 영역을 존중하는 관계가 잘 맞습니다.',
      money: '수입과 지출을 체계적으로 관리하면 재물운을 안정적으로 키울 수 있습니다.',
      career: '경영, 기술, 금융, 법률, 분석, IT, 전문직처럼 정확한 판단이 필요한 분야와 잘 맞습니다.'
    },
    {
      name: '수(水)',
      keyword: '지혜와 유연함',
      personality: '상황을 빠르게 파악하고 유연하게 대응하는 능력이 있습니다. 관찰력이 좋은 편입니다.',
      love: '상대방을 이해하려는 마음이 강하며 깊은 대화를 나눌 수 있는 관계를 선호합니다.',
      money: '정보를 활용해 기회를 찾는 능력이 있습니다. 다만 지나치게 많은 선택지를 고민하지 않는 것이 좋습니다.',
      career: 'IT, 연구, 기획, 금융, 무역, 상담, 데이터, 커뮤니케이션 분야에서 강점을 발휘할 수 있습니다.'
    }
  ];

  var fortuneLevels = [
    '좋은 흐름',
    '안정적인 흐름',
    '점차 좋아지는 흐름',
    '변화가 필요한 흐름',
    '새로운 기회를 준비하는 흐름'
  ];

  var luckyColors = [
    '청록색',
    '붉은색',
    '노란색',
    '흰색',
    '검은색'
  ];

  /*
   * ---------------------------------------------------------
   * 유틸
   * ---------------------------------------------------------
   */

  function getSeed(dateString) {
    var seed = 0;

    for (var i = 0; i < dateString.length; i++) {
      seed += dateString.charCodeAt(i) * (i + 1);
    }

    return Math.abs(seed);
  }

  function getElement(dateString) {
    var seed = getSeed(dateString);

    return elements[seed % elements.length];
  }

  function getLevel(dateString, offset) {
    var seed = getSeed(dateString);

    return fortuneLevels[(seed + offset) % fortuneLevels.length];
  }

  function getColor(dateString) {
    var seed = getSeed(dateString);

    return luckyColors[seed % luckyColors.length];
  }

  function getLuckyNumber(dateString) {
    var seed = getSeed(dateString);

    return (seed % 9) + 1;
  }

  function getAge(dateString) {
    var birth = new Date(dateString);
    var today = new Date();

    var age = today.getFullYear() - birth.getFullYear();

    var monthDiff = today.getMonth() - birth.getMonth();

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
        today.getDate() < birth.getDate()
      )
    ) {
      age--;
    }

    return age;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /*
   * ---------------------------------------------------------
   * 사주 결과
   * ---------------------------------------------------------
   */

  function createSajuResult(dateString, time, gender) {
    var element = getElement(dateString);

    var age = getAge(dateString);

    var timeText = time
      ? time + ':00'
      : '출생시간 미상';

    var genderText = gender === 'female'
      ? '여성'
      : '남성';

    var overall = getLevel(dateString, 0);
    var loveLevel = getLevel(dateString, 1);
    var moneyLevel = getLevel(dateString, 2);
    var careerLevel = getLevel(dateString, 3);

    var color = getColor(dateString);
    var luckyNumber = getLuckyNumber(dateString);

    return {
      element: element,
      age: age,
      time: timeText,
      gender: genderText,
      overall: overall,
      loveLevel: loveLevel,
      moneyLevel: moneyLevel,
      careerLevel: careerLevel,
      color: color,
      luckyNumber: luckyNumber
    };
  }

  /*
   * ---------------------------------------------------------
   * 결과 HTML
   * ---------------------------------------------------------
   */

  function renderSajuResult(result) {
    var element = result.element;

    resultContent.innerHTML = `
      <div class="saju-result">

        <div class="saju-result-summary">

          <p class="eyebrow">
            사주·운세
          </p>

          <h3>
            ${escapeHtml(element.name)} 기운이 두드러지는 사주
          </h3>

          <p>
            ${escapeHtml(element.keyword)}을 중심으로 자신의 장점을
            발전시켜 나가는 것이 좋습니다.
          </p>

        </div>


        <div class="saju-info-grid">

          <div class="saju-info-card">
            <strong>나이</strong>
            <span>${escapeHtml(result.age)}세</span>
          </div>

          <div class="saju-info-card">
            <strong>성별</strong>
            <span>${escapeHtml(result.gender)}</span>
          </div>

          <div class="saju-info-card">
            <strong>출생시간</strong>
            <span>${escapeHtml(result.time)}</span>
          </div>

          <div class="saju-info-card">
            <strong>오행</strong>
            <span>${escapeHtml(element.name)}</span>
          </div>

        </div>


        <div class="saju-result-block">

          <h3>성향</h3>

          <p>
            ${escapeHtml(element.personality)}
          </p>

        </div>


        <div class="saju-result-grid">

          <div class="saju-result-block">

            <h3>❤️ 연애운</h3>

            <p class="fortune-level">
              ${escapeHtml(result.loveLevel)}
            </p>

            <p>
              ${escapeHtml(element.love)}
            </p>

          </div>


          <div class="saju-result-block">

            <h3>💰 재물운</h3>

            <p class="fortune-level">
              ${escapeHtml(result.moneyLevel)}
            </p>

            <p>
              ${escapeHtml(element.money)}
            </p>

          </div>


          <div class="saju-result-block">

            <h3>💼 직업운</h3>

            <p class="fortune-level">
              ${escapeHtml(result.careerLevel)}
            </p>

            <p>
              ${escapeHtml(element.career)}
            </p>

          </div>


          <div class="saju-result-block">

            <h3>🍀 행운 정보</h3>

            <p>
              행운의 색상 :
              <strong>${escapeHtml(result.color)}</strong>
            </p>

            <p>
              행운의 숫자 :
              <strong>${escapeHtml(result.luckyNumber)}</strong>
            </p>

          </div>

        </div>


        <div class="saju-result-block">

          <h3>📅 전체 운세</h3>

          <p>
            현재 운세는 <strong>${escapeHtml(result.overall)}</strong>에
            해당합니다.
          </p>

          <p>
            지금은 자신의 장점을 활용하면서 무리하게 결과를 서두르기보다
            꾸준하게 계획을 실행하는 것이 좋은 시기입니다.
          </p>

        </div>


        <div class="saju-result-notice">

          <strong>※ 참고사항</strong>

          <p>
            이 결과는 생년월일을 활용한 간단한 운세 해석입니다.
            전통 명리학의 정밀한 만세력, 대운, 세운 등을 모두 계산한
            결과가 아니며 재미와 참고 목적으로 이용해주세요.
          </p>

        </div>

      </div>
    `;

    resultSection.hidden = false;

    resultSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  /*
   * ---------------------------------------------------------
   * 버튼
   * ---------------------------------------------------------
   */

  calculateBtn.addEventListener('click', function () {

    var birthDate = birthDateInput.value;

    if (!birthDate) {
      alert('생년월일을 입력해주세요.');
      birthDateInput.focus();
      return;
    }

    var birthTime = birthTimeInput
      ? birthTimeInput.value
      : '';

    var gender = genderInput
      ? genderInput.value
      : 'male';

    var result = createSajuResult(
      birthDate,
      birthTime,
      gender
    );

    renderSajuResult(result);
  });

})();