(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);

  function t(key) {
    const lang = typeof getCurrentLanguage === 'function'
      ? getCurrentLanguage()
      : 'ko';

    return typeof translate === 'function'
      ? translate(key, lang)
      : key;
  }

  function showResult() {
    const birthDate = $('#birthDate');
    const birthTime = $('#birthTime');
    const gender = $('#gender');

    const result = $('#sajuResult');
    const content = $('#sajuResultContent');

    if (!birthDate || !birthTime || !gender || !result || !content) {
      return;
    }

    if (!birthDate.value) {
      alert(t('saju.input_required'));
      birthDate.focus();
      return;
    }

    const genderText = gender.value === 'male'
      ? t('saju.male')
      : t('saju.female');

    const timeText = birthTime.value
      ? `${birthTime.value}:00`
      : t('saju.birth_time_unknown');

    const date = birthDate.value;

    content.innerHTML = `
      <div class="saju-result-card">

        <div class="saju-result-summary">

          <div class="saju-summary-item">
            <span>${t('saju.birth_date')}</span>
            <strong>${escapeHtml(date)}</strong>
          </div>

          <div class="saju-summary-item">
            <span>${t('saju.birth_time')}</span>
            <strong>${escapeHtml(timeText)}</strong>
          </div>

          <div class="saju-summary-item">
            <span>${t('saju.gender')}</span>
            <strong>${escapeHtml(genderText)}</strong>
          </div>

        </div>

        <div class="saju-result-message">
          <h3>${t('saju.result_ready')}</h3>
          <p>${t('saju.result_demo')}</p>
        </div>

      </div>
    `;

    result.hidden = false;

    result.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function init() {
    const button = $('#sajuCalculateBtn');

    if (!button) {
      return;
    }

    button.addEventListener('click', showResult);

    const birthDate = $('#birthDate');

    if (birthDate) {
      birthDate.max = new Date().toISOString().split('T')[0];
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();