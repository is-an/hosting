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
    calculator_meta_title: "계산기 카테고리 - 무료 온라인 계산기 모음",
    calculator_meta_description: "퍼센트 계산기, 나이 계산기, D-Day 계산기, 전역일 계산기 등 무료 온라인 계산기 모음입니다.",
    tools_meta_title: "도구 카테고리 - 무료 온라인 도구 모음",
    tools_meta_description: "글자수 계산기, 단위 변환기, BMI 계산기, 대출 계산기, 예금 계산기, 퇴직금 계산기 등 무료 온라인 도구 모음입니다.",
    lotto_meta_title: "로또번호 생성기 - 무료 로또번호 추천 | 온라인 도구",
    lotto_meta_description: "1부터 45까지의 숫자 중 6개를 무작위로 선택하여 로또번호를 추천하는 무료 도구입니다.",
    games_meta_title: "미니게임 - 무료 온라인 게임 모음",
    games_meta_description: "반응속도 테스트, 스도쿠, 타자 속도 테스트, 블록 퍼즐을 무료로 즐길 수 있는 온라인 미니게임 모음입니다.",
    games_eyebrow: "무료 온라인 미니게임",
    games_title: "게임 모음",
    games_copy: "짧은 시간에 즐기면서 반응속도, 집중력, 타자 실력을 확인해 보세요.",
    shutter_meta_title: "카메라 셔터카운트 확인기 - EXIF 사진 정보 분석",
    shutter_meta_description: "사진을 브라우저에서 분석하여 카메라 EXIF 정보와 확인 가능한 셔터카운트를 표시하는 무료 도구입니다.",

    home_eyebrow_calc: "무료 온라인 계산기",
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

    tool_calculator_title: "계산기 모음",
    tool_calculator_desc: "필요한 계산을 빠르게 확인할 수 있는 공식 기반 도구들을 한곳에 정리했습니다.",
    tool_percent_title: "퍼센트 계산기",
    tool_percent_desc: "A의 B%, A는 B의 몇 %, 증감 비율 등을 빠르게 계산합니다.",
    tool_age_title: "나이 계산기",
    tool_age_desc: "생년월일을 입력하면 만 나이, 경과 일수, 다음 생일까지의 날짜를 계산합니다.",
    tool_dday_title: "D-Day 계산기",
    tool_dday_desc: "목표 날짜를 입력하면 오늘을 기준으로 D-Day까지 남은 날짜를 계산합니다.",
    tool_discharge_title: "전역일 계산기",
    tool_discharge_desc: "입대일과 복무기간으로부터 전역일을 계산합니다.",
    tools_eyebrow: "무료 온라인 도구",
    tools_title: "도구 모음",
    tools_copy: "문자 처리, 단위 변환, 건강/재무 계산 등 실생활에 필요한 다양한 도구를 만나보세요.",

    tool_charcount_title: "글자수/바이트 계산기",
    tool_charcount_desc: "텍스트의 글자수, 공백 포함/제외 글자수, 바이트 수를 실시간으로 계산합니다.",
    tool_unit_title: "단위 변환기",
    tool_unit_desc: "길이, 무게, 온도, 면적, 부피, 시간, 데이터 용량을 변환합니다.",
    tool_textconv_title: "텍스트 변환 도구",
    tool_textconv_desc: "텍스트를 다양한 방식으로 변환하고 처리합니다.",
    tool_shutter_count_title: "카메라 셔터카운트 확인기",
    tool_shutter_count_desc: "사진의 EXIF 정보를 브라우저에서 분석하여 카메라 정보와 확인 가능한 셔터카운트를 표시합니다.",

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
    lotto_eyebrow: "무료 온라인 로또 생성기",
    lotto_title: "로또번호 생성기",
    lotto_copy: "1부터 45까지의 숫자 중 6개를 무작위로 선택하여 로또번호를 추천합니다.",
    lotto_intro: "기운이 있는 로또번호를 추천해드립니다.",
    lotto_fixedLabel: "번호 고정 설정 (1~6자리)",
    lotto_slot1: "1번째", lotto_slot2: "2번째", lotto_slot3: "3번째",
    lotto_slot4: "4번째", lotto_slot5: "5번째", lotto_slot6: "6번째",
    lotto_generateOne: "1개 생성", lotto_generateFive: "5개 생성", lotto_reset: "초기화",

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
    calculator_meta_title: "Calculator Category - Free Online Calculators",
    calculator_meta_description: "A collection of free online calculators including percentage, age, D-Day, and discharge date calculators.",
    tools_meta_title: "Tools Category - Free Online Tools",
    tools_meta_description: "Free online tools including character counter, unit converter, BMI, loan, savings, and severance pay calculators.",
    lotto_meta_title: "Lotto Number Generator - Free Lotto Recommendations",
    lotto_meta_description: "A free tool that randomly selects 6 lotto numbers from 1 to 45.",
    games_meta_title: "Mini Games - Free Online Games",
    games_meta_description: "Enjoy free online mini games including reaction tests, Sudoku, typing tests, and block puzzles.",
    games_eyebrow: "Free Online Mini Games",
    games_title: "Game Collection",
    games_copy: "Enjoy short games while testing your reaction time, focus, and typing skills.",
    shutter_meta_title: "Camera Shutter Count Checker - EXIF Photo Analysis",
    shutter_meta_description: "Analyze camera EXIF data in your browser and display a shutter count only when explicitly available.",
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

    tool_calculator_title: "Calculators Collection",
    tool_calculator_desc: "A collection of formula-based tools to quickly check necessary calculations.",
    tool_percent_title: "Percentage Calculator",
    tool_percent_desc: "Quickly calculate B% of A, what percent A is of B, and rate of change.",
    tool_age_title: "Age Calculator",
    tool_age_desc: "Enter a birth date to calculate exact age, days elapsed, and days until the next birthday.",
    tool_dday_title: "D-Day Calculator",
    tool_dday_desc: "Enter a target date to calculate the D-Day countdown from today.",
    tool_discharge_title: "Discharge Date Calculator",
    tool_discharge_desc: "Calculate your discharge date from enlistment date and service period.",
    tools_eyebrow: "Free Online Tools",
    tools_title: "Tools Collection",
    tools_copy: "Explore practical tools for text processing, unit conversion, health, and finance.",

    tool_charcount_title: "Character/Byte Counter",
    tool_charcount_desc: "Count characters, characters excluding spaces, and bytes in real time.",
    tool_unit_title: "Unit Converter",
    tool_unit_desc: "Convert length, weight, temperature, area, volume, time, and data size.",
    tool_textconv_title: "Text Converter",
    tool_textconv_desc: "Convert and process text in various ways.",
    tool_shutter_count_title: "Camera Shutter Count Checker",
    tool_shutter_count_desc: "Analyze photo EXIF data in your browser to show camera details and a shutter count when available.",

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
    lotto_eyebrow: "Free Online Lotto Generator",
    lotto_title: "Lotto Number Generator",
    lotto_copy: "Randomly picks 6 numbers from 1 to 45 to recommend lotto numbers.",
    lotto_intro: "Generate a lucky set of lotto numbers.",
    lotto_fixedLabel: "Fix numbers by position (1-6)",
    lotto_slot1: "1st", lotto_slot2: "2nd", lotto_slot3: "3rd",
    lotto_slot4: "4th", lotto_slot5: "5th", lotto_slot6: "6th",
    lotto_generateOne: "Generate 1", lotto_generateFive: "Generate 5", lotto_reset: "Reset",

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
    calculator_meta_title: "计算器分类 - 免费在线计算器集合",
    calculator_meta_description: "包含百分比、年龄、D-Day和退伍日期计算器的免费在线计算器集合。",
    tools_meta_title: "工具分类 - 免费在线工具集合",
    tools_meta_description: "包含字数统计、单位换算、BMI、贷款、存款和退休金计算器的免费在线工具集合。",
    lotto_meta_title: "乐透号码生成器 - 免费乐透推荐",
    lotto_meta_description: "从1到45中随机选择6个乐透号码的免费工具。",
    games_meta_title: "迷你游戏 - 免费在线游戏集合",
    games_meta_description: "免费体验反应速度测试、数独、打字速度测试和方块拼图等在线迷你游戏。",
    games_eyebrow: "免费在线迷你游戏",
    games_title: "游戏集合",
    games_copy: "用短时间的游戏测试你的反应速度、专注力和打字能力。",
    shutter_meta_title: "相机快门次数查询器 - EXIF照片分析",
    shutter_meta_description: "在浏览器中分析相机EXIF信息，并仅在明确存在时显示快门次数。",
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

    tool_calculator_title: "计算器集合",
    tool_calculator_desc: "将基于公式的工具集中在一处，以便快速检查所需的计算。",
    tool_percent_title: "百分比计算器",
    tool_percent_desc: "快速计算 A 的 B%、A 是 B 的百分之多少，以及增减比率。",
    tool_age_title: "年龄计算器",
    tool_age_desc: "输入出生日期即可计算周岁、经过天数以及距下次生日的天数。",
    tool_dday_title: "D-Day 倒数计算器",
    tool_dday_desc: "输入目标日期，计算从今天起的 D-Day 倒数天数。",
    tool_discharge_title: "退伍日计算器",
    tool_discharge_desc: "根据入伍日期和服役期限计算退伍日期。",
    tools_eyebrow: "免费在线工具",
    tools_title: "工具集合",
    tools_copy: "探索文字处理、单位换算、健康和财务等日常实用工具。",

    tool_charcount_title: "字数/字节计算器",
    tool_charcount_desc: "实时计算文本的字数、含/不含空格的字数以及字节数。",
    tool_unit_title: "单位换算器",
    tool_unit_desc: "换算长度、重量、温度、面积、体积、时间和数据容量。",
    tool_textconv_title: "文本转换工具",
    tool_textconv_desc: "以多种方式转换和处理文本。",
    tool_shutter_count_title: "相机快门次数查询器",
    tool_shutter_count_desc: "在浏览器中分析照片 EXIF 信息，显示相机信息和可确认的快门次数。",

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
    lotto_eyebrow: "免费在线乐透生成器",
    lotto_title: "乐透号码生成器",
    lotto_copy: "从1到45中随机选择6个号码推荐乐透号码。",
    lotto_intro: "为你生成幸运的乐透号码。",
    lotto_fixedLabel: "按位置固定号码（1~6位）",
    lotto_slot1: "第1位", lotto_slot2: "第2位", lotto_slot3: "第3位",
    lotto_slot4: "第4位", lotto_slot5: "第5位", lotto_slot6: "第6位",
    lotto_generateOne: "生成1组", lotto_generateFive: "生成5组", lotto_reset: "重置",

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
    meta_description: "無料オンラインツール集：パーセント計算機、年齢計算機、文字数カウント、単位変換機、BMI計算機、給与計算機、ローン利息計算機など15の便利なツールを一箇所で。",
    calculator_meta_title: "計算機カテゴリ - 無料オンライン計算機集",
    calculator_meta_description: "パーセント、年齢、D-Day、除隊日などを計算できる無料オンライン計算機集です。",
    tools_meta_title: "ツールカテゴリ - 無料オンラインツール集",
    tools_meta_description: "文字数、単位変換、BMI、ローン、預金、退職金などの無料オンラインツール集です。",
    lotto_meta_title: "ロト番号生成機 - 無料ロト番号推薦",
    lotto_meta_description: "1から45までの数字から6個をランダムに選ぶ無料ロト番号生成ツールです。",
    games_meta_title: "ミニゲーム - 無料オンラインゲーム集",
    games_meta_description: "反応速度テスト、数独、タイピングテスト、ブロックパズルを楽しめる無料オンラインゲーム集です。",
    games_eyebrow: "無料オンラインミニゲーム",
    games_title: "ゲーム一覧",
    games_copy: "短いゲームを楽しみながら、反応速度、集中力、タイピングスキルを試してみましょう。",
    shutter_meta_title: "カメラシャッター回数チェッカー - EXIF写真解析",
    shutter_meta_description: "ブラウザーでカメラのEXIF情報を解析し、明示的に確認できる場合のみシャッター回数を表示します。",
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

    tool_calculator_title: "計算機集合",
    tool_calculator_desc: "必要な計算を素早く確認できる公式ベースのツールを一箇所にまとめました。",
    tool_percent_title: "パーセント計算機",
    tool_percent_desc: "AのB%、AはBの何%か、増減率などを素早く計算します。",
    tool_age_title: "年齢計算機",
    tool_age_desc: "生年月日を入力すると満年齢、経過日数、次の誕生日までの日数を計算します。",
    tool_dday_title: "D-Day計算機",
    tool_dday_desc: "目標日を入力すると今日を基準にD-Dayまでの残り日数を計算します。",
    tool_discharge_title: "除隊日計算機",
    tool_discharge_desc: "入隊日と服務期間から除隊日を計算します。",
    tools_eyebrow: "無料オンラインツール",
    tools_title: "ツール一覧",
    tools_copy: "文字処理、単位変換、健康や金融など、日常に役立つツールをご利用ください。",

    tool_charcount_title: "文字数/バイト計算機",
    tool_charcount_desc: "テキストの文字数、空白を含む/除く文字数、バイト数をリアルタイムで計算します。",
    tool_unit_title: "単位変換機",
    tool_unit_desc: "長さ、重さ、温度、面積、体積、時間、データ容量を変換します。",
    tool_textconv_title: "テキスト変換ツール",
    tool_textconv_desc: "テキストをさまざまな方式で変換・処理します。",
    tool_shutter_count_title: "カメラシャッター回数チェッカー",
    tool_shutter_count_desc: "写真の EXIF 情報をブラウザーで解析し、カメラ情報と確認できるシャッター回数を表示します。",

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
    lotto_eyebrow: "無料オンラインロト生成機",
    lotto_title: "ロト番号生成機",
    lotto_copy: "1から45までの数字から6個をランダムに選び、ロト番号を推薦します。",
    lotto_intro: "幸運なロト番号を生成します。",
    lotto_fixedLabel: "位置ごとに番号を固定（1~6桁）",
    lotto_slot1: "1番目", lotto_slot2: "2番目", lotto_slot3: "3番目",
    lotto_slot4: "4番目", lotto_slot5: "5番目", lotto_slot6: "6番目",
    lotto_generateOne: "1組生成", lotto_generateFive: "5組生成", lotto_reset: "リセット",

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

const gameTranslations = {
  ko: {
    nav_games: '게임', filter_game: '게임', cat_games: '🎮 미니게임',
    game_start: '게임 시작', game_new: '새 게임', game_restart: '다시하기', game_result: '게임 결과', game_best: '최고 기록', game_share: '결과 공유', game_copyLink: '게임 링크 복사', game_other: '다른 게임', game_linkCopied: '링크가 복사되었습니다.', game_copyManual: '위 텍스트를 직접 복사하세요.', game_time: '시간', game_score: '점수', game_level: '레벨', game_lines: '줄', game_easy: '쉬움', game_medium: '보통', game_hard: '어려움', game_complete: '축하합니다!', game_gameOver: '게임 오버',
    game_reaction_title: '반응속도 테스트', game_reaction_desc: '화면이 바뀌는 순간을 눌러 내 반응 시간을 확인하세요.',
    game_sudoku_title: '스도쿠', game_sudoku_desc: '난이도를 고르고 새로운 9x9 퍼즐에 도전하세요.',
    game_typing_title: '타자 속도 테스트', game_typing_desc: '정확도와 분당 속도를 측정해 보세요.',
    game_block_title: '블록 퍼즐', game_block_desc: '블록을 쌓고 줄을 완성해 최고 점수에 도전하세요.'
  },
  en: {
    nav_games: 'Games', filter_game: 'Games', cat_games: '🎮 Mini Games',
    game_start: 'Start game', game_new: 'New game', game_restart: 'Play again', game_result: 'Game result', game_best: 'Best record', game_share: 'Share result', game_copyLink: 'Copy game link', game_other: 'Other games', game_linkCopied: 'Link copied.', game_copyManual: 'Copy the text above manually.', game_time: 'Time', game_score: 'Score', game_level: 'Level', game_lines: 'Lines', game_easy: 'Easy', game_medium: 'Medium', game_hard: 'Hard', game_complete: 'Congratulations!', game_gameOver: 'Game over',
    game_reaction_title: 'Reaction Time Test', game_reaction_desc: 'Tap the moment the screen changes to measure your reaction time.',
    game_sudoku_title: 'Sudoku', game_sudoku_desc: 'Choose a difficulty and solve a fresh 9x9 puzzle.',
    game_typing_title: 'Typing Speed Test', game_typing_desc: 'Measure your accuracy and words per minute.',
    game_block_title: 'Block Puzzle', game_block_desc: 'Stack blocks, clear lines, and chase a high score.'
  },
  zh: {
    nav_games: '游戏', filter_game: '游戏', cat_games: '🎮 迷你游戏',
    game_start: '开始游戏', game_new: '新游戏', game_restart: '再玩一次', game_result: '游戏结果', game_best: '最高纪录', game_share: '分享结果', game_copyLink: '复制游戏链接', game_other: '其他游戏', game_linkCopied: '链接已复制。', game_copyManual: '请手动复制上方文本。', game_time: '时间', game_score: '分数', game_level: '等级', game_lines: '行数', game_easy: '简单', game_medium: '中等', game_hard: '困难', game_complete: '恭喜！', game_gameOver: '游戏结束',
    game_reaction_title: '反应速度测试', game_reaction_desc: '屏幕变化时立即点击，测量反应速度。',
    game_sudoku_title: '数独', game_sudoku_desc: '选择难度，挑战新的 9x9 谜题。',
    game_typing_title: '打字速度测试', game_typing_desc: '测量准确率和每分钟打字速度。',
    game_block_title: '方块拼图', game_block_desc: '堆叠方块、消除行并挑战最高分。'
  },
  ja: {
    nav_games: 'ゲーム', filter_game: 'ゲーム', cat_games: '🎮 ミニゲーム',
    game_start: 'ゲームを始める', game_new: '新しいゲーム', game_restart: 'もう一度', game_result: 'ゲーム結果', game_best: 'ベスト記録', game_share: '結果を共有', game_copyLink: 'ゲームリンクをコピー', game_other: 'ほかのゲーム', game_linkCopied: 'リンクをコピーしました。', game_copyManual: '上のテキストを手動でコピーしてください。', game_time: '時間', game_score: 'スコア', game_level: 'レベル', game_lines: 'ライン', game_easy: 'かんたん', game_medium: 'ふつう', game_hard: 'むずかしい', game_complete: 'おめでとうございます！', game_gameOver: 'ゲームオーバー',
    game_reaction_title: '反応速度テスト', game_reaction_desc: '画面が変わった瞬間にタップして反応時間を測ります。',
    game_sudoku_title: '数独', game_sudoku_desc: '難易度を選んで新しい 9x9 パズルに挑戦しましょう。',
    game_typing_title: 'タイピング速度テスト', game_typing_desc: '正確さと 1 分あたりの入力速度を測定します。',
    game_block_title: 'ブロックパズル', game_block_desc: 'ブロックを積み、ラインを消してハイスコアを目指します。'
  }
};

Object.keys(gameTranslations).forEach((lang) => Object.assign(translations[lang], gameTranslations[lang]));

const gamePageTranslations = {
  ko: { sudoku_copy: '난이도를 선택하고 새로운 9x9 퍼즐을 완성하세요.', sudoku_difficulty: '난이도', sudoku_mistakes: '실수', sudoku_check: '정답 확인', sudoku_how: '게임 방법', sudoku_info: '빈 칸을 선택한 뒤 아래 숫자 버튼 또는 키보드 숫자를 입력하세요. 같은 숫자는 강조되고, 틀린 답은 표시됩니다.', typing_copy: '문장을 정확하게 입력하고 타자 속도를 확인하세요.', typing_language: '언어', typing_duration: '시간', typing_placeholder: '시작 후 여기에 입력하세요.', typing_how: '게임 방법', typing_info: '시작을 누른 뒤 표시된 문장을 입력하세요. 선택한 시간이 끝나면 실제 입력을 기준으로 속도와 정확도를 계산합니다.', block_copy: '블록을 쌓고 줄을 완성해 최고 점수에 도전하세요.', block_how: '게임 방법', block_info: '왼쪽/오른쪽 화살표로 이동하고 위쪽 화살표로 회전합니다. 아래쪽 화살표는 빠르게 내리고, 스페이스바는 즉시 떨어뜨립니다.' },
  en: { sudoku_copy: 'Choose a difficulty and complete a fresh 9x9 puzzle.', sudoku_difficulty: 'Difficulty', sudoku_mistakes: 'Mistakes', sudoku_check: 'Check answer', sudoku_how: 'How to play', sudoku_info: 'Select an empty cell, then use the number buttons or keyboard. Matching numbers are highlighted and incorrect entries are marked.', typing_copy: 'Type the sentence accurately and check your typing speed.', typing_language: 'Language', typing_duration: 'Duration', typing_placeholder: 'Type here after starting.', typing_how: 'How to play', typing_info: 'Press start and type the displayed sentence. At the end of your chosen time, speed and accuracy are calculated from your actual input.', block_copy: 'Stack blocks, clear lines, and aim for a high score.', block_how: 'How to play', block_info: 'Use left and right arrows to move, up to rotate, down to soft drop, and space to drop instantly.' },
  zh: { sudoku_copy: '选择难度并完成新的 9x9 谜题。', sudoku_difficulty: '难度', sudoku_mistakes: '失误', sudoku_check: '检查答案', sudoku_how: '游戏方法', sudoku_info: '选择空格后使用下方数字或键盘输入。相同数字会突出显示，错误输入会标记。', typing_copy: '准确输入句子并查看打字速度。', typing_language: '语言', typing_duration: '时间', typing_placeholder: '开始后在这里输入。', typing_how: '游戏方法', typing_info: '点击开始后输入显示的句子。时间结束时会根据实际输入计算速度和准确率。', block_copy: '堆叠方块、消除行并挑战最高分。', block_how: '游戏方法', block_info: '使用左右方向键移动，上方向键旋转，下方向键快速下落，空格键立即落下。' },
  ja: { sudoku_copy: '難易度を選んで新しい 9x9 パズルを完成させましょう。', sudoku_difficulty: '難易度', sudoku_mistakes: 'ミス', sudoku_check: '答えを確認', sudoku_how: '遊び方', sudoku_info: '空のマスを選び、下の数字またはキーボードで入力します。同じ数字は強調され、間違いは表示されます。', typing_copy: '文章を正確に入力してタイピング速度を確認しましょう。', typing_language: '言語', typing_duration: '時間', typing_placeholder: '開始後にここへ入力します。', typing_how: '遊び方', typing_info: '開始後に表示された文章を入力します。選択した時間が終わると、実際の入力から速度と正確さを計算します。', block_copy: 'ブロックを積み、ラインを消してハイスコアを目指しましょう。', block_how: '遊び方', block_info: '左右矢印で移動、上矢印で回転、下矢印で高速落下、スペースで即時落下します。' }
};

Object.keys(gamePageTranslations).forEach((lang) => Object.assign(translations[lang], gamePageTranslations[lang]));

const shutterTranslations = {
  ko: { shutter_eyebrow: '브라우저에서 안전하게 분석', shutter_title: '카메라 셔터카운트 확인기', shutter_copy: '사진을 선택하면 EXIF 정보를 분석하여 카메라 모델과 확인 가능한 셔터카운트를 표시합니다.', shutter_upload: '사진 업로드', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: '사진 선택', shutter_ready: '사진은 이 기기에서만 분석되며 서버로 전송되지 않습니다.', shutter_reading: '사진 정보를 분석하는 중입니다...', shutter_complete: '분석이 완료되었습니다.', shutter_remove: '사진 제거', shutter_again: '다시 확인', shutter_share: '결과 공유', shutter_copyLink: '링크 복사', shutter_unknown: '확인할 수 없음', shutter_cameraInfo: '카메라 정보', shutter_count: '셔터카운트', shutter_confirmed: '🟢 사진 EXIF에서 확인된 값입니다.', shutter_missing: '🟡 카메라는 확인했지만 이 사진에 셔터카운트 정보가 없습니다.', shutter_missingShort: '셔터카운트: 확인할 수 없음', shutter_unsupported: '🔴 지원 제조사 여부를 확인할 수 없으며 셔터카운트 정보도 없습니다.', shutter_make: '제조사', shutter_model: '모델', shutter_date: '촬영일시', shutter_lens: '렌즈', shutter_speed: '셔터스피드', shutter_aperture: '조리개', shutter_focal: '초점거리', shutter_file: '파일 형식', shutter_size: '이미지 크기', shutter_noExif: '이 파일에서 읽을 수 있는 EXIF 정보를 찾지 못했습니다.', shutter_rafInvalid: 'RAF 파일 구조는 인식되었지만 내부 JPEG/EXIF 영역을 찾지 못했습니다.', shutter_error: 'EXIF 정보를 분석할 수 없습니다.', shutter_privacyTitle: '🔒 개인정보 보호', shutter_privacyCopy: '사진은 서버에 업로드되지 않습니다. 모든 파일 읽기와 EXIF 분석은 사용자의 브라우저에서만 처리됩니다.', shutter_aboutTitle: '셔터카운트와 EXIF', shutter_aboutCopy: '셔터카운트는 카메라가 촬영한 횟수를 나타내는 기록입니다. 일부 카메라는 이를 사진의 MakerNote에 저장하지만, 모든 파일과 모든 제조사에서 제공하는 것은 아닙니다. 이 도구는 파일에 명시적으로 저장된 값만 표시하며, 파일명이나 촬영일로 숫자를 추정하지 않습니다.', shutter_rawNote: 'RAW 파일은 카메라 및 브라우저에 따라 EXIF 정보를 읽지 못할 수 있습니다.', shutter_faqTitle: '자주 묻는 질문', shutter_faq1q: '셔터카운트란 무엇인가요?', shutter_faq1a: '카메라가 촬영한 횟수를 뜻하는 기록입니다.', shutter_faq2q: '사진만으로 항상 확인할 수 있나요?', shutter_faq2a: '아니요. 카메라와 파일에 따라 셔터카운트가 EXIF에 저장되지 않을 수 있습니다.', shutter_faq3q: '사진이 서버에 업로드되나요?', shutter_faq3a: '아니요. 이 페이지는 네트워크로 사진을 전송하지 않고 브라우저에서만 분석합니다.', shutter_related: '관련 도구', shutter_shareTitle: '카메라 셔터카운트 확인 결과' },
  en: { shutter_eyebrow: 'Safely analyzed in your browser', shutter_title: 'Camera Shutter Count Checker', shutter_copy: 'Select a photo to inspect EXIF data, camera details, and a shutter count when explicitly available.', shutter_upload: 'Upload a photo', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: 'Choose photo', shutter_ready: 'Your photo is analyzed only on this device and is never uploaded.', shutter_reading: 'Analyzing photo information...', shutter_complete: 'Analysis complete.', shutter_remove: 'Remove photo', shutter_again: 'Check another photo', shutter_share: 'Share result', shutter_copyLink: 'Copy link', shutter_unknown: 'Unavailable', shutter_cameraInfo: 'Camera information', shutter_count: 'Shutter count', shutter_confirmed: '🟢 Explicitly found in this photo EXIF data.', shutter_missing: '🟡 The camera was identified, but this photo has no shutter-count value.', shutter_missingShort: 'Shutter count: unavailable', shutter_unsupported: '🔴 No supported maker value or explicit shutter count was found.', shutter_make: 'Make', shutter_model: 'Model', shutter_date: 'Date taken', shutter_lens: 'Lens', shutter_speed: 'Shutter speed', shutter_aperture: 'Aperture', shutter_focal: 'Focal length', shutter_file: 'File type', shutter_size: 'Image size', shutter_noExif: 'No readable EXIF data was found in this file.', shutter_rafInvalid: 'The RAF container was recognized, but no embedded JPEG/EXIF section could be found.', shutter_error: 'EXIF data could not be analyzed.', shutter_privacyTitle: '🔒 Privacy', shutter_privacyCopy: 'Photos are not uploaded to a server. File reading and EXIF analysis happen only in your browser.', shutter_aboutTitle: 'Shutter Count and EXIF', shutter_aboutCopy: 'A shutter count records how many photos a camera has taken. Some cameras store it in a photo MakerNote, but not every camera or file includes it. This tool only displays values explicitly stored in the file and never estimates a number from filenames or dates.', shutter_rawNote: 'RAW EXIF data may not be readable depending on the camera and browser.', shutter_faqTitle: 'Frequently asked questions', shutter_faq1q: 'What is a shutter count?', shutter_faq1a: 'It is a record of how many photos a camera has taken.', shutter_faq2q: 'Can every photo reveal a shutter count?', shutter_faq2a: 'No. A camera or photo file may not store it in EXIF data.', shutter_faq3q: 'Is my photo uploaded?', shutter_faq3a: 'No. This page does not send photos over the network.', shutter_related: 'Related tools', shutter_shareTitle: 'Camera shutter count result' },
  zh: { shutter_eyebrow: '在浏览器中安全分析', shutter_title: '相机快门次数查询器', shutter_copy: '选择照片以分析 EXIF 信息、相机型号和可确认的快门次数。', shutter_upload: '上传照片', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: '选择照片', shutter_ready: '照片仅在此设备上分析，不会上传到服务器。', shutter_reading: '正在分析照片信息...', shutter_complete: '分析完成。', shutter_remove: '移除照片', shutter_again: '重新检查', shutter_share: '分享结果', shutter_copyLink: '复制链接', shutter_unknown: '无法确认', shutter_cameraInfo: '相机信息', shutter_count: '快门次数', shutter_confirmed: '🟢 已在照片 EXIF 中明确确认。', shutter_missing: '🟡 已识别相机，但此照片没有快门次数信息。', shutter_missingShort: '快门次数：无法确认', shutter_unsupported: '🔴 未找到受支持的厂商值或明确的快门次数。', shutter_make: '制造商', shutter_model: '型号', shutter_date: '拍摄时间', shutter_lens: '镜头', shutter_speed: '快门速度', shutter_aperture: '光圈', shutter_focal: '焦距', shutter_file: '文件格式', shutter_size: '图像尺寸', shutter_noExif: '此文件中没有可读取的 EXIF 信息。', shutter_rafInvalid: '已识别出 RAF 容器，但未找到内嵌的 JPEG/EXIF 区域。', shutter_error: '无法分析 EXIF 信息。', shutter_privacyTitle: '🔒 隐私保护', shutter_privacyCopy: '照片不会上传到服务器。文件读取和 EXIF 分析仅在浏览器中进行。', shutter_aboutTitle: '快门次数与 EXIF', shutter_aboutCopy: '快门次数表示相机拍摄的次数。部分相机将其保存到照片的 MakerNote 中，但并非所有相机或文件都有该信息。本工具只显示文件中明确保存的值，不会根据文件名或日期进行推测。', shutter_rawNote: 'RAW 文件的 EXIF 信息可能因相机和浏览器而无法读取。', shutter_faqTitle: '常见问题', shutter_faq1q: '什么是快门次数？', shutter_faq1a: '它是相机拍摄次数的记录。', shutter_faq2q: '每张照片都能查询快门次数吗？', shutter_faq2a: '不能。相机或照片文件可能未在 EXIF 中保存该信息。', shutter_faq3q: '照片会被上传吗？', shutter_faq3a: '不会。本页面不会通过网络发送照片。', shutter_related: '相关工具', shutter_shareTitle: '相机快门次数查询结果' },
  ja: { shutter_eyebrow: 'ブラウザー内で安全に解析', shutter_title: 'カメラシャッター回数チェッカー', shutter_copy: '写真を選択すると、EXIF 情報、カメラモデル、確認できるシャッター回数を表示します。', shutter_upload: '写真をアップロード', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: '写真を選択', shutter_ready: '写真はこの端末内でのみ解析され、サーバーにはアップロードされません。', shutter_reading: '写真情報を解析しています...', shutter_complete: '解析が完了しました。', shutter_remove: '写真を削除', shutter_again: 'もう一度確認', shutter_share: '結果を共有', shutter_copyLink: 'リンクをコピー', shutter_unknown: '確認できません', shutter_cameraInfo: 'カメラ情報', shutter_count: 'シャッター回数', shutter_confirmed: '🟢 写真の EXIF から明確に確認された値です。', shutter_missing: '🟡 カメラは確認できましたが、この写真にはシャッター回数情報がありません。', shutter_missingShort: 'シャッター回数：確認できません', shutter_unsupported: '🔴 対応するメーカー値または明確なシャッター回数が見つかりませんでした。', shutter_make: 'メーカー', shutter_model: 'モデル', shutter_date: '撮影日時', shutter_lens: 'レンズ', shutter_speed: 'シャッター速度', shutter_aperture: '絞り', shutter_focal: '焦点距離', shutter_file: 'ファイル形式', shutter_size: '画像サイズ', shutter_noExif: 'このファイルには読み取れる EXIF 情報がありません。', shutter_rafInvalid: 'RAF コンテナは認識されましたが、内部の JPEG/EXIF 領域が見つかりませんでした。', shutter_error: 'EXIF 情報を解析できません。', shutter_privacyTitle: '🔒 プライバシー', shutter_privacyCopy: '写真はサーバーにアップロードされません。ファイル読み取りと EXIF 解析はブラウザー内でのみ行われます。', shutter_aboutTitle: 'シャッター回数と EXIF', shutter_aboutCopy: 'シャッター回数はカメラの撮影回数を示す記録です。一部のカメラは写真の MakerNote に保存しますが、すべてのカメラやファイルに含まれるわけではありません。このツールはファイルに明示的に保存された値のみを表示し、ファイル名や日付から推測しません。', shutter_rawNote: 'RAW ファイルの EXIF はカメラやブラウザーによって読み取れない場合があります。', shutter_faqTitle: 'よくある質問', shutter_faq1q: 'シャッター回数とは何ですか？', shutter_faq1a: 'カメラが撮影した回数の記録です。', shutter_faq2q: 'すべての写真から確認できますか？', shutter_faq2a: 'いいえ。カメラや写真ファイルに EXIF として保存されていないことがあります。', shutter_faq3q: '写真はアップロードされますか？', shutter_faq3a: 'いいえ。このページはネットワークで写真を送信しません。', shutter_related: '関連ツール', shutter_shareTitle: 'カメラシャッター回数確認結果' }
};

Object.keys(shutterTranslations).forEach((lang) => Object.assign(translations[lang], shutterTranslations[lang]));

const subpageTranslations = {
  age: {
    ko: { title: '나이 계산기 - 만 나이, 경과 일수 계산 | 무료 온라인 도구', description: '나이 계산기. 생년월일을 입력하면 만 나이, 경과 일수, 다음 생일까지 남은 날짜를 계산합니다.', h1: '나이 계산기', copy: '생년월일을 입력하면 만 나이와 경과 일수를 계산합니다.', birth: '생년월일', base: '기준 날짜', today: '오늘로 설정', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문', related: '🔗 관련 도구' },
    en: { title: 'Age Calculator - Exact Age and Days Elapsed', description: 'Enter a birth date to calculate exact age, elapsed days, and days until the next birthday.', h1: 'Age Calculator', copy: 'Enter a birth date to calculate exact age and days elapsed.', birth: 'Birth date', base: 'Base date', today: 'Set today', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions', related: '🔗 Related tools' },
    zh: { title: '年龄计算器 - 周岁与经过天数计算', description: '输入出生日期，计算周岁、经过天数以及距下次生日的天数。', h1: '年龄计算器', copy: '输入出生日期即可计算周岁和经过天数。', birth: '出生日期', base: '基准日期', today: '设为今天', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题', related: '🔗 相关工具' },
    ja: { title: '年齢計算機 - 満年齢と経過日数を計算', description: '生年月日を入力すると、満年齢、経過日数、次の誕生日までの日数を計算します。', h1: '年齢計算機', copy: '生年月日を入力すると満年齢と経過日数を計算します。', birth: '生年月日', base: '基準日', today: '今日に設定', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問', related: '🔗 関連ツール' }
  },
  dday: {
    ko: { title: 'D-Day 계산기 - 남은 날짜 계산 | 무료 온라인 도구', h1: 'D-Day 계산기', calculate: '계산하기', reset: '초기화', copyButton: '결과 복사', faq: '❓ 자주 묻는 질문', related: '🔗 관련 도구' },
    en: { title: 'D-Day Calculator - Days Remaining', h1: 'D-Day Calculator', calculate: 'Calculate', reset: 'Reset', copyButton: 'Copy result', faq: '❓ Frequently asked questions', related: '🔗 Related tools' },
    zh: { title: 'D-Day 倒数计算器 - 剩余天数计算', h1: 'D-Day 倒数计算器', calculate: '计算', reset: '重置', copyButton: '复制结果', faq: '❓ 常见问题', related: '🔗 相关工具' },
    ja: { title: 'D-Day計算機 - 残り日数を計算', h1: 'D-Day計算機', calculate: '計算する', reset: 'リセット', copyButton: '結果をコピー', faq: '❓ よくある質問', related: '🔗 関連ツール' }
  },
  discharge: {
    ko: { title: '전역일 계산기 - 군 복무기간 계산 | 무료 온라인 도구', h1: '전역일 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Discharge Date Calculator - Military Service Period', h1: 'Discharge Date Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '退伍日期计算器 - 服役期限计算', h1: '退伍日期计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '除隊日計算機 - 服務期間を計算', h1: '除隊日計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  percent: {
    ko: { title: '퍼센트 계산기 - 할인, 증감 비율 계산 | 무료 온라인 도구', h1: '퍼센트 계산기', copy: 'A의 B%, A는 B의 몇%, 증감 비율을 쉽고 빠르게 계산하세요.', tabOf: 'A의 B%', tabIs: 'A는 B의 몇%', increase: '증가 비율', decrease: '감소 비율', base: 'A (기준값)', percent: 'B (%)', value: 'A (값)', previous: '이전 값', current: '현재 값', faq: '❓ 자주 묻는 질문', faq1: '1000의 15%는 얼마인가요?', faq1a: '첫 번째 탭 "A의 B%"에서 A에 1000, B에 15를 입력하면 150이라는 답을 얻을 수 있습니다.', vat: '부가세 계산기', vatDesc: '공급가액과 부가세 계산', salary: '연봉 계산기', salaryDesc: '연봉에서 세후 급여 계산' },
    en: { title: 'Percentage Calculator - Discount and Change Rate', h1: 'Percentage Calculator', copy: 'Quickly calculate B% of A, what percentage A is of B, and the rate of change.', tabOf: 'B% of A', tabIs: 'What percent is A of B?', increase: 'Increase rate', decrease: 'Decrease rate', base: 'A (base value)', percent: 'B (%)', value: 'A (value)', previous: 'Previous value', current: 'Current value', faq: '❓ Frequently asked questions', faq1: 'What is 15% of 1000?', faq1a: 'Enter 1000 for A and 15 for B in the "B% of A" tab to get 150.', vat: 'VAT Calculator', vatDesc: 'Calculate supply price and VAT', salary: 'Salary Calculator', salaryDesc: 'Calculate take-home pay from salary' },
    zh: { title: '百分比计算器 - 折扣与增减比例计算', h1: '百分比计算器', copy: '快速计算 A 的 B%、A 是 B 的百分之多少以及增减比例。', tabOf: 'A 的 B%', tabIs: 'A 是 B 的百分之多少', increase: '增加比例', decrease: '减少比例', base: 'A（基准值）', percent: 'B（%）', value: 'A（数值）', previous: '之前的值', current: '当前值', faq: '❓ 常见问题', faq1: '1000 的 15% 是多少？', faq1a: '在“A 的 B%”标签中输入 A=1000、B=15，即可得到 150。', vat: '增值税计算器', vatDesc: '计算供货价和增值税', salary: '薪资计算器', salaryDesc: '根据年薪计算税后工资' },
    ja: { title: 'パーセント計算機 - 割引と増減率を計算', h1: 'パーセント計算機', copy: 'AのB%、AはBの何%か、増減率を簡単に計算します。', tabOf: 'AのB%', tabIs: 'AはBの何%', increase: '増加率', decrease: '減少率', base: 'A（基準値）', percent: 'B（%）', value: 'A（値）', previous: '以前の値', current: '現在の値', faq: '❓ よくある質問', faq1: '1000の15%はいくつですか？', faq1a: '「AのB%」タブでAに1000、Bに15を入力すると150になります。', vat: '付加価値税計算機', vatDesc: '供給価額と税額を計算', salary: '年俸計算機', salaryDesc: '年俸から手取り給与を計算' }
  },
  bmi: {
    ko: { title: 'BMI 계산기 - 건강 체중 계산 | 무료 온라인 도구', h1: 'BMI 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'BMI Calculator - Healthy Weight Calculator', h1: 'BMI Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: 'BMI 计算器 - 健康体重计算', h1: 'BMI 计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: 'BMI計算機 - 健康体重を計算', h1: 'BMI計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  charcount: {
    ko: { title: '글자수/바이트 계산기 - 텍스트 글자수 세기 | 무료 온라인 도구', h1: '글자수/바이트 계산기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Character/Byte Counter - Count Text Characters', h1: 'Character/Byte Counter', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '字数/字节计算器 - 文本字数统计', h1: '字数/字节计算器', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '文字数/バイト計算機 - テキスト文字数カウント', h1: '文字数/バイト計算機', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  unit: {
    ko: { title: '단위 변환기 - 길이, 무게, 온도 변환 | 무료 온라인 도구', h1: '단위 변환기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Unit Converter - Length, Weight, and Temperature', h1: 'Unit Converter', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '单位换算器 - 长度、重量和温度换算', h1: '单位换算器', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '単位変換機 - 長さ、重さ、温度を変換', h1: '単位変換機', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  textconv: {
    ko: { title: '텍스트 변환 도구 - 대소문자, 공백 제거 | 무료 온라인 도구', h1: '텍스트 변환 도구', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Text Converter - Case and Space Tools', h1: 'Text Converter', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '文本转换工具 - 大小写与空格处理', h1: '文本转换工具', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: 'テキスト変換ツール - 大文字・空白を処理', h1: 'テキスト変換ツール', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  loan: {
    ko: { title: '대출 이자 계산기 - 월 상환액 계산 | 무료 온라인 도구', h1: '대출 이자 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Loan Interest Calculator - Monthly Payment', h1: 'Loan Interest Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '贷款利息计算器 - 月供计算', h1: '贷款利息计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: 'ローン利息計算機 - 月々の返済額を計算', h1: 'ローン利息計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  retirement: {
    ko: { title: '퇴직금 계산기 - 예상 퇴직금 계산 | 무료 온라인 도구', h1: '퇴직금 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Severance Pay Calculator - Estimate Severance', h1: 'Severance Pay Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '退休金计算器 - 预计退休金计算', h1: '退休金计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '退職金計算機 - 予想退職金を計算', h1: '退職金計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  salary: {
    ko: { title: '연봉 계산기 - 세후 실수령액 계산 | 무료 온라인 도구', h1: '연봉 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Salary Calculator - Estimate Take-Home Pay', h1: 'Salary Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '薪资计算器 - 税后收入计算', h1: '薪资计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '年俸計算機 - 手取り額を計算', h1: '年俸計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  savings: {
    ko: { title: '예금/적금 이자 계산기 - 만기액 계산 | 무료 온라인 도구', h1: '예금/적금 이자 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'Savings Interest Calculator - Maturity Amount', h1: 'Savings Interest Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '存款利息计算器 - 到期金额计算', h1: '存款利息计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '預金・積立金利計算機 - 満期額を計算', h1: '預金・積立金利計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  },
  vat: {
    ko: { title: '부가세 계산기 - 공급가액, 부가세 계산 | 무료 온라인 도구', h1: '부가세 계산기', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문' },
    en: { title: 'VAT Calculator - Supply Price and VAT', h1: 'VAT Calculator', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions' },
    zh: { title: '增值税计算器 - 供货价与增值税计算', h1: '增值税计算器', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题' },
    ja: { title: '付加価値税計算機 - 供給価額と税額を計算', h1: '付加価値税計算機', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問' }
  }
};

function getSubpageName() {
  const path = window.location.pathname;
  const match = path.match(/\/(?:cal|tools)\/([^/]+)\/(?:index\.html?)?$/);
  return match ? match[1] : null;
}

function applySubpageLanguage(lang) {
  const page = getSubpageName();
  const dictionary = page && subpageTranslations[page] && subpageTranslations[page][lang];
  if (!dictionary) return;
  if (page === 'percent') {
    const percentKeys = {
      copy: 'copy', tabOf: 'tabOf', tabIs: 'tabIs', increase: 'increase', decrease: 'decrease',
      base: 'base', percent: 'percent', value: 'value', previous: 'previous', current: 'current',
      faq1: 'faq1', faq1a: 'faq1a', vat: 'vat', vatDesc: 'vatDesc', salary: 'salary', salaryDesc: 'salaryDesc'
    };
    document.querySelectorAll('[data-i18n^="sub_percent_"]').forEach((element) => {
      const suffix = element.getAttribute('data-i18n').replace('sub_percent_', '');
      const field = percentKeys[suffix];
      if (field && dictionary[field]) element.textContent = dictionary[field];
    });
  }
  if (dictionary.title) document.title = dictionary.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && dictionary.description) description.setAttribute('content', dictionary.description);
  const h1 = document.querySelector('main h1');
  if (h1 && dictionary.h1) h1.textContent = dictionary.h1;
  const copy = document.querySelector('main .hero-copy');
  if (copy && dictionary.copy) copy.textContent = dictionary.copy;
  document.querySelectorAll('main h2').forEach((heading) => {
    if (heading.textContent.includes('자주') || heading.textContent.includes('Frequently') || heading.textContent.includes('常见') || heading.textContent.includes('よく')) heading.textContent = dictionary.faq || heading.textContent;
    if (heading.textContent.includes('관련') || heading.textContent.includes('Related') || heading.textContent.includes('相关') || heading.textContent.includes('関連')) heading.textContent = dictionary.related || heading.textContent;
  });
  document.querySelectorAll('.primary-btn').forEach((button) => { if (dictionary.calculate && button.textContent.trim() === '계산하기') button.textContent = dictionary.calculate; });
  document.querySelectorAll('.secondary-btn').forEach((button) => { if (dictionary.copyButton && (button.textContent.trim() === '복사' || button.textContent.trim() === '결과 복사')) button.textContent = dictionary.copyButton; });
  document.querySelectorAll('.text-button').forEach((button) => { if (dictionary.reset && button.textContent.trim() === '초기화') button.textContent = dictionary.reset; });
  if (page === 'age') {
    const labels = document.querySelectorAll('label');
    if (labels[0] && dictionary.birth) labels[0].textContent = dictionary.birth;
    if (labels[1] && dictionary.base) labels[1].textContent = dictionary.base;
    const today = document.getElementById('setTodayBtn');
    if (today && dictionary.today) today.textContent = dictionary.today;
  }
}

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
  applySubpageLanguage(activeLang);
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
