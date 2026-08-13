// ============ 다국어(i18n) 번역 시스템 ============
// 지원 언어: ko(한국어), en(English), zh(中文), ja(日本語)
// 저장 위치: localStorage("language")
// 우선순위: 사용자가 저장한 언어 > 브라우저 언어 > 한국어(기본값)

const SUPPORTED_LANGUAGES = ['ko', 'en', 'zh', 'ja'];
const DEFAULT_LANGUAGE = 'ko';
const LANGUAGE_STORAGE_KEY = 'language';
const LANGUAGE_NAMES = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語' };

const translations = {
  ko: {
    nav_home: "홈",
    nav_calculator: "계산기",
    nav_lotto: "로또",
    nav_tools: "도구",

    footer_toolsTitle: "도구 모음",
    footer_infoTitle: "정보",
    footer_socialTitle: "소셜",
    footer_calculatorLink: "계산기",
    footer_lottoLink: "로또",
    footer_toolsLink: "도구",
    footer_home: "홈",
    footer_contact: "문의",

    darkMode: "다크모드로 전환",
    lightMode: "라이트모드로 전환",
    language: "언어 선택",

    meta_title: "무료 온라인 도구 모음 | 계산기, 변환기, 생성기",
    meta_description: "무료 온라인 도구 모음: 퍼센트 계산기, 나이 계산기, 글자수 세기, 단위 변환기, BMI 계산기, 연봉 계산기, 대출 이자 계산기 등 15개의 유용한 도구들을 한곳에서 만나보세요.",
    og_title: "무료 온라인 도구 모음",
    og_description: "퍼센트, 나이, 글자수, 단위 변환, BMI, 연봉, 대출, 이미지 처리 등 15개 도구 모음",

    home_eyebrow: "무료 온라인 도구 모음",
    home_title: "유용한 도구를 한곳에서",
    home_copy: "무료 온라인 계산기, 변환기, 생성기를 사용해보세요. 빠르고, 쉽고, 정확합니다.",
    home_searchPlaceholder: "도구 검색... (예: BMI, 연봉, 로또)",

    filter_all: "전체",
    filter_calculator: "계산기",
    filter_converter: "변환기",
    filter_generator: "생성기",

    cat_calculator: "📊 계산기",
    cat_converter: "🔄 변환기",
    cat_finance: "💰 금융 계산기",
    cat_generator: "🎰 생성기",
    cat_popular: "⭐ 인기 도구",
    cat_faq: "❓ 자주 묻는 질문",

    tool_percent_title: "퍼센트 계산기",
    tool_percent_desc: "A의 B%, A는 B의 몇 %, 증감 비율 등을 빠르게 계산합니다.",
    tool_age_title: "나이 계산기",
    tool_age_desc: "생년월일을 입력하면 만 나이, 경과 일수, 다음 생일까지의 날짜를 계산합니다.",
    tool_dday_title: "D-Day 계산기",
    tool_dday_desc: "목표 날짜를 입력하면 오늘을 기준으로 D-Day까지 남은 날짜를 계산합니다.",
    tool_discharge_title: "전역일 계산기",
    tool_discharge_desc: "입대일과 복무기간으로부터 전역일을 계산합니다.",

    tool_charcount_title: "글자수/바이트 계산기",
    tool_charcount_desc: "텍스트의 글자수, 공백 포함/제외 글자수, 바이트 수를 실시간으로 계산합니다.",
    tool_unit_title: "단위 변환기",
    tool_unit_desc: "길이, 무게, 온도, 면적, 부피, 시간, 데이터 용량을 변환합니다.",
    tool_textconv_title: "텍스트 변환 도구",
    tool_textconv_desc: "텍스트를 다양한 방식으로 변환하고 처리합니다.",

    tool_bmi_title: "BMI 계산기",
    tool_bmi_desc: "키와 체중을 입력하면 BMI와 건강 상태를 표시합니다.",
    tool_salary_title: "연봉 계산기",
    tool_salary_desc: "연봉으로부터 월급, 세전/세후 금액을 계산합니다.",
    tool_vat_title: "부가세 계산기",
    tool_vat_desc: "공급가액, 부가세, 합계금액을 계산하고 역산합니다.",
    tool_loan_title: "대출 이자 계산기",
    tool_loan_desc: "대출금액, 이율, 기간으로부터 월 상환액과 총 이자를 계산합니다.",
    tool_savings_title: "예금/적금 이자 계산기",
    tool_savings_desc: "예치금과 이율로부터 이자와 만기 수령액을 계산합니다.",
    tool_retirement_title: "퇴직금 계산기",
    tool_retirement_desc: "입사일과 퇴사일로부터 예상 퇴직금을 계산합니다.",

    tool_lotto_title: "로또번호 생성기",
    tool_lotto_desc: "1부터 45까지의 숫자 중 6개를 무작위로 선택하여 로또번호를 추천합니다.",

    popular_salary_desc: "연봉을 입력하고 실수령액을 확인하세요",
    popular_bmi_desc: "건강한 체중을 유지하세요",
    popular_dday_desc: "목표 날짜까지 남은 날짜를 확인하세요",

    faq_q1: "이 도구들을 사용하려면 회원가입이 필요한가요?",
    faq_a1: "아니요, 모든 도구는 완전히 무료이며 회원가입 없이 사용할 수 있습니다.",
    faq_q2: "계산 결과가 정확한가요?",
    faq_a2: "네, 모든 계산은 정확한 알고리즘으로 계산되지만, 세금이나 복지혜택 등 개인의 상황에 따라 실제 금액과 다를 수 있습니다.",
    faq_q3: "결과를 저장하거나 내보낼 수 있나요?",
    faq_a3: "각 도구의 복사 버튼으로 결과를 클립보드에 복사할 수 있습니다. 현재는 파일 저장 기능은 제공하지 않습니다.",
    faq_q4: "모바일에서도 사용할 수 있나요?",
    faq_a4: "네, 모든 도구는 모바일 기기에 최적화되어 있습니다."
  },

  en: {
    nav_home: "Home",
    nav_calculator: "Calculators",
    nav_lotto: "Lotto",
    nav_tools: "Tools",

    footer_toolsTitle: "Tools",
    footer_infoTitle: "Info",
    footer_socialTitle: "Social",
    footer_calculatorLink: "Calculators",
    footer_lottoLink: "Lotto",
    footer_toolsLink: "Tools",
    footer_home: "Home",
    footer_contact: "Contact",

    darkMode: "Switch to dark mode",
    lightMode: "Switch to light mode",
    language: "Select language",

    meta_title: "Free Online Tools | Calculators, Converters, Generators",
    meta_description: "Free online tools: percentage calculator, age calculator, character counter, unit converter, BMI calculator, salary calculator, loan interest calculator, and more — 15 useful tools in one place.",
    og_title: "Free Online Tools",
    og_description: "15 tools including percentage, age, character count, unit conversion, BMI, salary, loan, and image processing",

    home_eyebrow: "Free Online Tools",
    home_title: "Useful tools, all in one place",
    home_copy: "Try free online calculators, converters, and generators. Fast, simple, and accurate.",
    home_searchPlaceholder: "Search tools... (e.g. BMI, salary, lotto)",

    filter_all: "All",
    filter_calculator: "Calculators",
    filter_converter: "Converters",
    filter_generator: "Generators",

    cat_calculator: "📊 Calculators",
    cat_converter: "🔄 Converters",
    cat_finance: "💰 Finance Calculators",
    cat_generator: "🎰 Generators",
    cat_popular: "⭐ Popular Tools",
    cat_faq: "❓ Frequently Asked Questions",

    tool_percent_title: "Percentage Calculator",
    tool_percent_desc: "Quickly calculate B% of A, what percent A is of B, and rate of change.",
    tool_age_title: "Age Calculator",
    tool_age_desc: "Enter a birth date to calculate exact age, days elapsed, and days until the next birthday.",
    tool_dday_title: "D-Day Calculator",
    tool_dday_desc: "Enter a target date to calculate the D-Day countdown from today.",
    tool_discharge_title: "Discharge Date Calculator",
    tool_discharge_desc: "Calculate your discharge date from enlistment date and service period.",

    tool_charcount_title: "Character/Byte Counter",
    tool_charcount_desc: "Count characters, characters excluding spaces, and bytes in real time.",
    tool_unit_title: "Unit Converter",
    tool_unit_desc: "Convert length, weight, temperature, area, volume, time, and data size.",
    tool_textconv_title: "Text Converter",
    tool_textconv_desc: "Convert and process text in various ways.",

    tool_bmi_title: "BMI Calculator",
    tool_bmi_desc: "Enter height and weight to see your BMI and health status.",
    tool_salary_title: "Salary Calculator",
    tool_salary_desc: "Calculate monthly pay and net/gross amounts from annual salary.",
    tool_vat_title: "VAT Calculator",
    tool_vat_desc: "Calculate and reverse-calculate supply price, VAT, and total amount.",
    tool_loan_title: "Loan Interest Calculator",
    tool_loan_desc: "Calculate monthly payments and total interest from loan amount, rate, and term.",
    tool_savings_title: "Savings/Deposit Interest Calculator",
    tool_savings_desc: "Calculate interest and maturity amount from deposit and rate.",
    tool_retirement_title: "Severance Pay Calculator",
    tool_retirement_desc: "Estimate severance pay from hire date and resignation date.",

    tool_lotto_title: "Lotto Number Generator",
    tool_lotto_desc: "Randomly picks 6 numbers from 1 to 45 to recommend lotto numbers.",

    popular_salary_desc: "Enter your salary to check your take-home pay",
    popular_bmi_desc: "Keep track of a healthy weight",
    popular_dday_desc: "Check the days remaining until your target date",

    faq_q1: "Do I need to sign up to use these tools?",
    faq_a1: "No, all tools are completely free and require no sign-up.",
    faq_q2: "Are the calculation results accurate?",
    faq_a2: "Yes, all calculations use accurate formulas, but actual amounts may differ depending on taxes, benefits, and personal circumstances.",
    faq_q3: "Can I save or export the results?",
    faq_a3: "You can copy results to the clipboard using each tool's copy button. File export is not currently supported.",
    faq_q4: "Can I use this on mobile?",
    faq_a4: "Yes, all tools are optimized for mobile devices."
  },

  zh: {
    nav_home: "首页",
    nav_calculator: "计算器",
    nav_lotto: "乐透",
    nav_tools: "工具",

    footer_toolsTitle: "工具集合",
    footer_infoTitle: "信息",
    footer_socialTitle: "社交",
    footer_calculatorLink: "计算器",
    footer_lottoLink: "乐透",
    footer_toolsLink: "工具",
    footer_home: "首页",
    footer_contact: "联系我们",

    darkMode: "切换至深色模式",
    lightMode: "切换至浅色模式",
    language: "选择语言",

    meta_title: "免费在线工具 | 计算器、转换器、生成器",
    meta_description: "免费在线工具集合：百分比计算器、年龄计算器、字数统计、单位换算器、BMI计算器、薪资计算器、贷款利息计算器等15款实用工具，一站获取。",
    og_title: "免费在线工具集合",
    og_description: "包含百分比、年龄、字数、单位换算、BMI、薪资、贷款、图片处理等15款工具",

    home_eyebrow: "免费在线工具集合",
    home_title: "实用工具，一站搞定",
    home_copy: "使用免费的在线计算器、转换器和生成器。快速、简单、准确。",
    home_searchPlaceholder: "搜索工具...(例如 BMI、薪资、乐透)",

    filter_all: "全部",
    filter_calculator: "计算器",
    filter_converter: "转换器",
    filter_generator: "生成器",

    cat_calculator: "📊 计算器",
    cat_converter: "🔄 转换器",
    cat_finance: "💰 财务计算器",
    cat_generator: "🎰 生成器",
    cat_popular: "⭐ 热门工具",
    cat_faq: "❓ 常见问题",

    tool_percent_title: "百分比计算器",
    tool_percent_desc: "快速计算 A 的 B%、A 是 B 的百分之多少，以及增减比率。",
    tool_age_title: "年龄计算器",
    tool_age_desc: "输入出生日期即可计算周岁、经过天数以及距下次生日的天数。",
    tool_dday_title: "D-Day 倒数计算器",
    tool_dday_desc: "输入目标日期，计算从今天起的 D-Day 倒数天数。",
    tool_discharge_title: "退伍日计算器",
    tool_discharge_desc: "根据入伍日期和服役期限计算退伍日期。",

    tool_charcount_title: "字数/字节计算器",
    tool_charcount_desc: "实时计算文本的字数、含/不含空格的字数以及字节数。",
    tool_unit_title: "单位换算器",
    tool_unit_desc: "换算长度、重量、温度、面积、体积、时间和数据容量。",
    tool_textconv_title: "文本转换工具",
    tool_textconv_desc: "以多种方式转换和处理文本。",

    tool_bmi_title: "BMI 计算器",
    tool_bmi_desc: "输入身高体重即可显示 BMI 和健康状态。",
    tool_salary_title: "薪资计算器",
    tool_salary_desc: "根据年薪计算月薪及税前/税后金额。",
    tool_vat_title: "增值税计算器",
    tool_vat_desc: "计算并反算供货价、增值税及总金额。",
    tool_loan_title: "贷款利息计算器",
    tool_loan_desc: "根据贷款金额、利率和期限计算月供及总利息。",
    tool_savings_title: "存款/定期利息计算器",
    tool_savings_desc: "根据存款金额和利率计算利息及到期领取金额。",
    tool_retirement_title: "退休金计算器",
    tool_retirement_desc: "根据入职日期和离职日期估算退休金。",

    tool_lotto_title: "乐透号码生成器",
    tool_lotto_desc: "从 1 到 45 中随机选出 6 个号码推荐乐透号码。",

    popular_salary_desc: "输入年薪查看实际到手金额",
    popular_bmi_desc: "保持健康体重",
    popular_dday_desc: "查看距离目标日期还剩多少天",

    faq_q1: "使用这些工具需要注册吗?",
    faq_a1: "不需要，所有工具完全免费且无需注册即可使用。",
    faq_q2: "计算结果准确吗?",
    faq_a2: "是的，所有计算均采用精确算法，但实际金额可能因税金、福利等个人情况而有所不同。",
    faq_q3: "可以保存或导出结果吗?",
    faq_a3: "您可以使用各工具的复制按钮将结果复制到剪贴板。目前暂不支持文件保存功能。",
    faq_q4: "可以在手机上使用吗?",
    faq_a4: "可以，所有工具均已针对移动设备进行优化。"
  },

  ja: {
    nav_home: "ホーム",
    nav_calculator: "計算機",
    nav_lotto: "ロト",
    nav_tools: "ツール",

    footer_toolsTitle: "ツール一覧",
    footer_infoTitle: "情報",
    footer_socialTitle: "ソーシャル",
    footer_calculatorLink: "計算機",
    footer_lottoLink: "ロト",
    footer_toolsLink: "ツール",
    footer_home: "ホーム",
    footer_contact: "お問い合わせ",

    darkMode: "ダークモードに切り替え",
    lightMode: "ライトモードに切り替え",
    language: "言語を選択",

    meta_title: "無料オンラインツール | 計算機、変換ツール、生成ツール",
    meta_description: "無料オンラインツール集：パーセント計算機、年齢計算機、文字数カウント、単位変換機、BMI計算機、給与計算機、ローン利息計算機な〩15の便利なツールを一箇所で。",
    og_title: "無料オンラインツール集",
    og_description: "パーセント、年齢、文字数、単位変換、BMI、給与、ローン、画像処理な〩15のツール集",

    home_eyebrow: "無料オンラインツール集",
    home_title: "便利なツールを一箇所に",
    home_copy: "無料のオンライン計算機、変換ツール、生成ツールをお試しください。速くて簡単、正確です。",
    home_searchPlaceholder: "ツールを検索...(例: BMI、給与、ロト)",

    filter_all: "すべて",
    filter_calculator: "計算機",
    filter_converter: "変換ツール",
    filter_generator: "生成ツール",

    cat_calculator: "📊 計算機",
    cat_converter: "🔄 変換ツール",
    cat_finance: "💰 金融計算機",
    cat_generator: "🎰 生成ツール",
    cat_popular: "⭐ 人気ツール",
    cat_faq: "❓ よくある質問",

    tool_percent_title: "パーセント計算機",
    tool_percent_desc: "AのB%、AはBの何%か、増減率などを素早く計算します。",
    tool_age_title: "年齢計算機",
    tool_age_desc: "生年月日を入力すると満年齢、経過日数、次の誕生日までの日数を計算します。",
    tool_dday_title: "D-Day計算機",
    tool_dday_desc: "目標日を入力すると今日を基準にD-Dayまでの残り日数を計算します。",
    tool_discharge_title: "除隊日計算機",
    tool_discharge_desc: "入隊日と服務期間から除隊日を計算します。",

    tool_charcount_title: "文字数/バイト計算機",
    tool_charcount_desc: "テキストの文字数、空白を含む/除く文字数、バイト数をリアルタイムで計算します。",
    tool_unit_title: "単位変換機",
    tool_unit_desc: "長さ、重さ、温度、面積、体積、時間、データ容量を変換します。",
    tool_textconv_title: "テキスト変換ツール",
    tool_textconv_desc: "テキストをさまざまな方式で変換・処理します。",

    tool_bmi_title: "BMI計算機",
    tool_bmi_desc: "身長と体重を入力するとBMIと健康状態を表示します。",
    tool_salary_title: "年俸計算機",
    tool_salary_desc: "年俸から月給、税引前/税引後の金額を計算します。",
    tool_vat_title: "付加価値税計算機",
    tool_vat_desc: "供給価額、付加価値税、合計金額を計算・逆算します。",
    tool_loan_title: "ローン利息計算機",
    tool_loan_desc: "融資額、利率、期間から月々の返済額と総利息を計算します。",
    tool_savings_title: "預金/積立金利計算機",
    tool_savings_desc: "預入金額と利率から利息と満期受取額を計算します。",
    tool_retirement_title: "退職金計算機",
    tool_retirement_desc: "入社日と退社日から予想退職金を計算します。",

    tool_lotto_title: "ロト番号生成機",
    tool_lotto_desc: "1から45までの数字の中から6個をランダムに選んでロト番号を推薦します。",

    popular_salary_desc: "年俸を入力して手取り額を確認しましょう",
    popular_bmi_desc: "健康的な体重を維持しましょう",
    popular_dday_desc: "目標日までの残り日数を確認しましょう",

    faq_q1: "これらのツールを利用するには会員登録が必要ですか?",
    faq_a1: "いいえ、すべてのツールは完全無料で、会員登録なしでご利用いただけます。",
    faq_q2: "計算結果は正確ですか?",
    faq_a2: "はい、すべての計算は正確なアルゴリズムで行われますが、税金や福祉手当など個人の状況により実際の金額と異なる場合があります。",
    faq_q3: "結果を保存したりエクスポートしたりできますか?",
    faq_a3: "各ツールのコピーボタンで結果をクリップボードにコピーできます。現在ファイル保存機能は提供していません。",
    faq_q4: "モバイルでも利用できますか?",
    faq_a4: "はい、すべてのツールはモバイル端末に最適化されています。"
  }
};

function getStoredLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

function detectBrowserLanguage() {
  const raw = ((navigator.language || navigator.userLanguage || '') + '').toLowerCase();
  if (raw.indexOf('ko') === 0) return 'ko';
  if (raw.indexOf('en') === 0) return 'en';
  if (raw.indexOf('zh') === 0) return 'zh';
  if (raw.indexOf('ja') === 0) return 'ja';
  return DEFAULT_LANGUAGE;
}

function getCurrentLanguage() {
  const stored = getStoredLanguage();
  if (stored && SUPPORTED_LANGUAGES.indexOf(stored) !== -1) {
    return stored;
  }
  return detectBrowserLanguage();
}

function translate(key, lang) {
  const dict = translations[lang] || translations[DEFAULT_LANGUAGE];
  if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
    return dict[key];
  }
  const fallback = translations[DEFAULT_LANGUAGE];
  return (fallback && fallback[key] !== undefined) ? fallback[key] : key;
}

function applyLanguage(lang) {
  const activeLang = SUPPORTED_LANGUAGES.indexOf(lang) !== -1 ? lang : DEFAULT_LANGUAGE;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    el.textContent = translate(key, activeLang);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', translate(key, activeLang));
  });

  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria-label');
    el.setAttribute('aria-label', translate(key, activeLang));
  });

  document.querySelectorAll('[data-i18n-title]').forEach((el) => {
    const key = el.getAttribute('data-i18n-title');
    el.setAttribute('title', translate(key, activeLang));
  });

  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    const key = el.getAttribute('data-i18n-content');
    el.setAttribute('content', translate(key, activeLang));
  });

  document.documentElement.setAttribute('lang', activeLang);

  const langCurrentEl = document.getElementById('langCurrent');
  if (langCurrentEl) {
    langCurrentEl.textContent = LANGUAGE_NAMES[activeLang] || LANGUAGE_NAMES[DEFAULT_LANGUAGE];
  }

  document.querySelectorAll('.lang-dropdown [data-lang]').forEach((item) => {
    item.setAttribute('aria-selected', item.getAttribute('data-lang') === activeLang ? 'true' : 'false');
  });

  if (typeof updateThemeToggleLabel === 'function') {
    updateThemeToggleLabel();
  }
}

function setLanguage(lang) {
  const activeLang = SUPPORTED_LANGUAGES.indexOf(lang) !== -1 ? lang : DEFAULT_LANGUAGE;
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, activeLang);
  } catch (e) {
    // localStorage 사용 불가 환경에서도 언어 전환은 동작하도록 유지
  }
  applyLanguage(activeLang);
}

function initI18n() {
  applyLanguage(getCurrentLanguage());
}

function attachLanguageSwitcher() {
  const toggle = document.getElementById('langToggle');
  const dropdown = document.getElementById('langDropdown');
  if (!toggle || !dropdown || toggle.dataset.langBound === 'true') {
    return;
  }
  toggle.dataset.langBound = 'true';

  function closeDropdown() {
    dropdown.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function openDropdown() {
    dropdown.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (dropdown.classList.contains('open')) {
      closeDropdown();
    } else {
      openDropdown();
    }
  });

  dropdown.querySelectorAll('[data-lang]').forEach((item) => {
    item.addEventListener('click', () => {
      setLanguage(item.getAttribute('data-lang'));
      closeDropdown();
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setLanguage(item.getAttribute('data-lang'));
        closeDropdown();
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && e.target !== toggle) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDropdown();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
