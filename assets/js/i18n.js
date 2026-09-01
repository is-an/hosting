// ============ 다국어(i18n) 번역 시스템 ============
// 지원 언어: ko(한국어), en(English), zh(中文), ja(日本語)
// 저장 위치: localStorage("language")
// 우선순위: 사용자가 저장한 언어 > 브라우저 언어 > 한국어(기본값)

const SUPPORTED_LANGUAGES = ['ko', 'en', 'zh', 'ja'];
const DEFAULT_LANGUAGE = 'ko';
const LANGUAGE_STORAGE_KEY = 'language';
const LANGUAGE_NAMES = { ko: '한국어', en: 'English', zh: '中文', ja: '日本語' };

const legacyTranslations = {
  ko: {
    nav_home: "홈",
    nav_calculator: "계산기",
    nav_lotto: "로또",
    nav_tools: "도구",
    nav_games: "게임",
    nav_saju: "사주·운세",
    nav_blog: "블로그",
    nav_faq: "자주 묻는 질문",

    footer_toolsTitle: "도구 모음",
    footer_infoTitle: "정보",
    footer_socialTitle: "소셜",
    footer_calculatorLink: "계산기",
    footer_lottoLink: "로또",
    footer_toolsLink: "도구",
    footer_gamesLink: "게임",
    footer_sajuLink: "사주·운세",
    footer_home: "홈",
    footer_contact: "문의",
    footer_blog: "블로그",
    footer_faq: "자주 묻는 질문",
    footer_social_github: "GitHub",

    darkMode: "다크모드로 전환",
    lightMode: "라이트모드로 전환",
    language: "언어 선택",

    meta_title: "무료 온라인 도구 모음 | 계산기, 변환기, 생성기",
    meta_description: "무료 온라인 도구 모음: 퍼센트 계산기, 나이 계산기, 글자수 세기, 단위 변환기, BMI 계산기, 연봉 계산기, 대출 이자 계산기 등 15개의 유용한 도구들을 한곳에서 만나보세요.",
    og_title: "무료 온라인 도구 모음",
    og_description: "퍼센트, 나이, 글자수, 단위 변환, BMI, 연봉, 대출, 이미지 처리 등 15개 도구 모음",
    calculator_meta_title: "계산기 카테고리 - 무료 온라인 계산기 모음",
    calculator_meta_description: "퍼센트·나이·D-Day·전역일 계산기부터 연봉·대출·예금·퇴직금·부가세·BMI 계산기까지 무료 온라인 계산기를 한곳에 모았습니다.",
    tools_meta_title: "도구 카테고리 - 무료 온라인 도구 모음",
    tools_meta_description: "글자수·바이트 계산기, 단위 변환기, 텍스트 변환 도구, 카메라 셔터카운트 확인기 등 무료 온라인 유틸리티 도구 모음입니다.",
    lotto_meta_title: "로또번호 생성기 - 무료 로또번호 추천 | 온라인 도구",
    lotto_meta_description: "1부터 45까지의 숫자 중 6개를 무작위로 선택하여 로또번호를 추천하는 무료 도구입니다.",
    games_meta_title: "미니게임 - 무료 온라인 게임 모음",
    games_meta_description: "반응속도 테스트, 스도쿠, 타자 속도 테스트, 블록 퍼즐을 무료로 즐길 수 있는 온라인 미니게임 모음입니다.",
    nav_blog: "블로그",
    blog_meta_title: "블로그 - is-an 온라인 도구 이야기",
    blog_meta_description: "계산기, 도구, 미니게임과 웹사이트 제작에 관한 소식을 전합니다.",
    blog_eyebrow: "is-an 이야기",
    blog_title: "블로그",
    blog_copy: "온라인 도구를 만들며 얻은 기록과 유용한 정보를 공유합니다.",
    blog_read: "읽기",
    blog_post_title: "정적 웹사이트에 유용한 도구를 추가하는 방법",
    blog_post_summary: "작은 온라인 도구 사이트를 안정적으로 확장하는 구조와 운영 방법을 정리했습니다.",
    blog_post_date: "2026년 8월 14일",
    blog_post_category: "웹 개발",
    blog_post_heading: "작고 빠른 도구 사이트의 구조",
    blog_post_body: "정적 HTML, CSS, JavaScript만으로도 계산기와 도구를 빠르게 제공할 수 있습니다. 공통 헤더와 푸터를 재사용하고, 각 기능을 독립된 디렉터리에 배치하면 유지보수와 배포가 단순해집니다.",
    blog_related: "관련 글",
    blog_back: "목록으로 돌아가기",
    games_eyebrow: "무료 온라인 미니게임",
    games_title: "게임 모음",
    games_copy: "짧은 시간에 즐기면서 반응속도, 집중력, 타자 실력을 확인해 보세요.",
    shutter_meta_title: "카메라 셔터카운트 확인기 - EXIF 사진 정보 분석",
    shutter_meta_description: "사진을 브라우저에서 분석하여 카메라 EXIF 정보와 확인 가능한 셔터카운트를 표시하는 무료 도구입니다.",

    home_popular_title: "인기 도구",
    home_categories_title: "카테고리",
    home_eyebrow_calc: "무료 온라인 계산기",
    home_eyebrow: "무료 온라인 도구 모음",
    home_title: "유용한 도구를 한곳에서",
    home_copy: "계산기, 도구, 게임, 로또, 사주를 한곳에서 무료로 이용하세요.",
    home_searchPlaceholder: "도구 검색... (예: BMI, 연봉, 로또)",
    home_about_title: "is-an 온라인 도구 모음",
    home_about_copy: "is-an.github.io는 회원가입 없이 무료로 쓸 수 있는 온라인 도구 모음입니다. 퍼센트·나이·D-Day 계산기부터 연봉·대출·예금·퇴직금 등 금융 계산기, 글자수·단위 변환 도구, 미니게임, 로또번호 생성기, 사주까지 자주 찾는 기능을 한곳에서 빠르게 이용할 수 있습니다. 모든 계산은 브라우저에서 처리되며 입력한 값은 서버로 전송되지 않습니다.",
    home_allTools: "전체 카테고리 둘러보기",
    cal_finance_title: "금융·생활 계산기",
    tools_calc_note: "연봉·대출·예금·퇴직금·BMI 등 계산기는 계산기 카테고리에서 이용할 수 있습니다.",

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
    tools_copy: "글자수 세기, 단위 변환, 텍스트 변환, 사진 EXIF 분석 등 실생활에 필요한 유틸리티 도구를 모았습니다.",

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
    lotto_intro: "1부터 45까지 중 서로 다른 6개 번호를 무작위로 생성합니다.",
    lotto_fixedLabel: "번호 고정 설정 (1~6자리)",
    lotto_slot1: "1번째", lotto_slot2: "2번째", lotto_slot3: "3번째",
    lotto_slot4: "4번째", lotto_slot5: "5번째", lotto_slot6: "6번째",
    lotto_generateOne: "1개 생성", lotto_generateFive: "5개 생성", lotto_reset: "초기화",
    lotto_how_title: "로또번호 생성기 사용 방법",
    lotto_how_1: "‘1개 생성’을 누르면 1~45 중 서로 다른 6개 번호가 무작위로 나옵니다.",
    lotto_how_2: "‘5개 생성’은 서로 다른 6개 번호 조합을 한 번에 5줄 만들어 줍니다.",
    lotto_how_3: "‘번호 고정’에서 1~6칸에 숫자를 지정하면 그 번호는 항상 포함되고 나머지 칸만 무작위로 채워집니다.",
    lotto_how_4: "‘초기화’는 고정한 번호와 생성 결과를 모두 지웁니다.",
    lotto_how_note: "생성된 번호는 저장되지 않으며, 새로 생성하면 이전 결과는 사라집니다.",
    lotto_odds_title: "로또 6/45 당첨 확률",
    lotto_odds_intro: "대한민국 로또 6/45는 1~45의 숫자 중 6개를 맞히는 방식입니다. 나올 수 있는 조합은 모두 8,145,060가지이며, 1등(6개 일치) 확률은 8,145,060분의 1입니다.",
    lotto_odds_th_rank: "등수",
    lotto_odds_th_cond: "조건",
    lotto_odds_th_prob: "1회 기준 확률",
    lotto_odds_rank_suffix: "등",
    lotto_odds_r1: "6개 번호 일치",
    lotto_odds_r2: "5개 번호 + 보너스 번호 일치",
    lotto_odds_r3: "5개 번호 일치",
    lotto_odds_r4: "4개 번호 일치",
    lotto_odds_r5: "3개 번호 일치",
    lotto_odds_note: "확률은 매 회차 동일하며, 자동·수동 또는 과거 당첨 이력과 관계없이 모든 조합의 당첨 가능성은 같습니다.",
    lotto_random_title: "무작위 번호 생성의 의미",
    lotto_random_p1: "이 도구는 브라우저의 난수 생성기로 매번 새로운 조합을 만듭니다. 특정 번호가 '잘 나오는 번호'이거나 '나올 때가 된 번호'라는 통계적 근거는 없습니다. 로또 추첨은 매 회차 독립적이어서, 과거에 자주 나온 번호와 적게 나온 번호 모두 다음 회차에 나올 확률은 같습니다.",
    lotto_random_p2: "번호 고정 기능은 생일·기념일처럼 의미 있는 숫자를 포함하고 싶을 때 쓰는 편의 기능이며, 당첨 확률을 높이지는 않습니다.",
    lotto_notice_title: "이용 시 유의사항",
    lotto_notice_1: "이 생성기는 재미와 편의를 위한 도구이며, 당첨이나 수익을 보장하지 않습니다.",
    lotto_notice_2: "복권은 만 19세 이상만 구매할 수 있습니다.",
    lotto_notice_3: "구매는 여윳돈 범위에서 하고 과도한 몰입에 주의하세요. 도박 문제 상담은 한국도박문제예방치유원(국번 없이 1336)에서 받을 수 있습니다.",
    lotto_notice_4: "실제 번호 구매와 당첨 확인은 공식 판매처 및 동행복권에서 진행됩니다.",
    lotto_faq_title: "❓ 자주 묻는 질문",
    lotto_faq1_q: "판매점 자동 번호와 무엇이 다른가요?",
    lotto_faq1_a: "차이가 없습니다. 판매점 자동도 무작위 추출이며, 이 도구도 같은 방식으로 서로 다른 6개 번호를 무작위로 고릅니다.",
    lotto_faq2_q: "여러 번 생성하면 같은 조합이 나올 수 있나요?",
    lotto_faq2_a: "한 조합 안에서는 번호가 중복되지 않습니다. 다만 여러 조합을 생성하면 조합끼리 겹칠 수는 있으며, 그 확률은 매우 낮습니다.",
    lotto_faq3_q: "번호를 고정하면 당첨 확률이 올라가나요?",
    lotto_faq3_a: "아니요. 어떤 번호를 고르든 6개 조합 하나의 1등 확률은 8,145,060분의 1로 동일합니다.",
    lotto_faq4_q: "생성한 번호가 서버에 저장되나요?",
    lotto_faq4_a: "아니요. 번호 생성은 모두 사용자의 브라우저에서 처리되며 서버로 전송되거나 저장되지 않습니다.",
    lotto_related_title: "🔗 관련 도구",

    loan_method_title: "상환 방식 이해하기",
    loan_method_intro: "대출 상환 방식에 따라 매달 내는 금액과 총 이자가 달라집니다. 이 계산기는 두 가지 방식을 지원합니다.",
    loan_method_equal_payment: "원리금균등상환: 매달 갚는 금액(원금+이자)이 일정합니다. 초반에는 이자 비중이 크고 갈수록 원금 비중이 커집니다. 매달 나가는 돈이 일정해 계획을 세우기 쉽습니다.",
    loan_method_equal_principal: "원금균등상환: 매달 갚는 원금이 일정하고, 남은 원금에 대한 이자가 줄어들어 매달 상환액이 조금씩 감소합니다. 총 이자는 원리금균등보다 대체로 적습니다.",
    loan_method_formula: "원리금균등의 월 상환액은 ‘원금 × 월이율 × (1+월이율)^개월수 ÷ ((1+월이율)^개월수 − 1)’ 공식으로 계산하며, 월이율은 연이율을 12로 나눈 값입니다.",
    loan_example_title: "계산 예시",
    loan_example_intro: "대출금액 3,000만 원, 연이율 4.5%, 기간 60개월(5년)로 이 계산기에서 계산하면 다음과 같습니다.",
    loan_example_th_type: "상환 방식",
    loan_example_th_monthly: "월 상환액",
    loan_example_th_interest: "총 이자",
    loan_example_r1_type: "원리금균등",
    loan_example_r1_monthly: "약 559,000원 (매달 동일)",
    loan_example_r1_interest: "약 356만 원",
    loan_example_r2_type: "원금균등",
    loan_example_r2_monthly: "첫 달 약 612,500원 → 마지막 달 약 501,900원",
    loan_example_r2_interest: "약 343만 원",
    loan_example_note: "같은 조건이라도 원금균등이 총 이자는 적지만 초기 상환 부담은 더 큽니다.",
    loan_notice_title: "이용 시 유의사항",
    loan_notice_1: "이 계산기는 입력한 이율이 만기까지 고정된다고 가정합니다. 변동금리 대출은 시장금리에 따라 상환액이 달라집니다.",
    loan_notice_2: "중도상환수수료, 인지세, 근저당 설정비 등 부대비용과 거치기간(원금 없이 이자만 내는 기간)은 반영하지 않습니다.",
    loan_notice_3: "실제 대출 한도와 금리는 소득, 신용점수, DSR·LTV 규제 등에 따라 결정되므로 금융회사 상담이 필요합니다.",
    loan_notice_4: "계산 결과는 참고용이며 실제 대출 상품의 상환 일정과 다를 수 있습니다.",
    loan_faq_title: "❓ 자주 묻는 질문",
    loan_faq1_q: "원리금균등과 원금균등, 어떤 게 유리한가요?",
    loan_faq1_a: "총 이자만 보면 원금균등이 대체로 적습니다. 다만 원금균등은 초기 상환액이 크기 때문에, 매달 나가는 돈을 일정하게 관리하고 싶다면 원리금균등이 편할 수 있습니다.",
    loan_faq2_q: "거치기간이 있으면 어떻게 되나요?",
    loan_faq2_a: "거치기간에는 이자만 납부하고 원금 상환은 이후에 시작됩니다. 이 계산기는 거치기간을 지원하지 않으므로, 거치 후 상환 개월수만 따로 입력해 대략적인 금액을 확인하세요.",
    loan_faq3_q: "중도상환하면 이자가 줄어드나요?",
    loan_faq3_a: "네, 남은 원금이 줄어 이후 이자가 감소합니다. 다만 대출 실행 후 일정 기간 안에는 중도상환수수료가 붙을 수 있어 실제 이득은 상품 조건에 따라 다릅니다.",
    loan_faq4_q: "입력한 값이 저장되나요?",
    loan_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    loan_related_title: "🔗 관련 도구",

    vat_method_title: "부가세 계산 방법",
    vat_method_intro: "부가세(부가가치세)는 재화나 서비스의 공급가액에 매기는 세금입니다. 한국의 표준 세율은 10%입니다.",
    vat_method_forward: "공급가액에서 합계 구하기: 부가세 = 공급가액 × 10%, 합계 = 공급가액 + 부가세. 예를 들어 공급가액이 100,000원이면 부가세는 10,000원, 합계는 110,000원입니다.",
    vat_method_reverse: "합계에서 공급가액 구하기: 공급가액 = 합계 ÷ 1.1, 부가세 = 합계 − 공급가액. 예를 들어 합계가 110,000원이면 공급가액은 100,000원, 부가세는 10,000원입니다.",
    vat_method_note: "카드 영수증이나 간이영수증에 표시된 금액은 보통 부가세가 포함된 합계 금액입니다. 이때는 ‘합계 → 공급가액’ 탭을 사용하세요.",
    vat_notice_title: "이용 시 유의사항",
    vat_notice_1: "면세 사업자나 면세 품목(기초 생필품, 도서, 일부 농수산물 등)에는 부가세가 붙지 않습니다.",
    vat_notice_2: "간이과세자는 업종별 부가가치율이 적용되어 실제 납부세액이 이 계산과 다릅니다.",
    vat_notice_3: "매입세액 공제, 의제매입세액 등은 반영하지 않습니다. 실제 신고세액은 매출세액에서 매입세액을 뺀 금액입니다.",
    vat_notice_4: "계산 결과는 참고용이며 세무 신고 시에는 국세청 홈택스 또는 세무 전문가의 확인이 필요합니다.",
    vat_faq_title: "❓ 자주 묻는 질문",
    vat_faq1_q: "한국의 부가세율은 몇 %인가요?",
    vat_faq1_a: "표준 세율은 10%입니다. 수출 등 영세율이 적용되는 거래는 0%, 면세 거래는 부가세가 없습니다.",
    vat_faq2_q: "합계 금액에서 부가세만 빠르게 알고 싶어요.",
    vat_faq2_a: "‘합계 → 공급가액’ 탭에 합계 금액을 넣으면 공급가액과 부가세가 분리되어 표시됩니다. 세율 10% 기준 부가세는 대략 합계의 1/11입니다.",
    vat_faq3_q: "세율을 10%가 아닌 값으로 바꿀 수 있나요?",
    vat_faq3_a: "네, 세율 입력란의 값을 바꾸면 해당 세율로 계산됩니다. 다른 나라의 부가세(VAT/GST) 계산에도 사용할 수 있습니다.",
    vat_faq4_q: "입력한 금액이 저장되나요?",
    vat_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    vat_related_title: "🔗 관련 도구",

    salary_about_title: "실수령액은 어떻게 정해지나요",
    salary_about_intro: "세전 월급에서 아래 항목이 빠진 금액이 실제로 통장에 들어오는 실수령액입니다.",
    salary_about_1: "국민연금·건강보험·장기요양보험·고용보험 등 4대 보험료(근로자 부담분)",
    salary_about_2: "근로소득세와 지방소득세(소득세의 10%)",
    salary_about_note: "소득세는 부양가족 수와 공제 항목에 따라 간이세액표로 정해지고, 국민연금은 기준소득월액 상한이 있으며 건강보험료율은 해마다 조정됩니다. 이 계산기는 이해를 돕기 위한 단순화된 비율을 사용하므로, 실제 급여명세서 금액과는 차이가 있을 수 있습니다.",
    salary_example_title: "계산 예시",
    salary_example_body: "연봉 3,600만 원을 입력하면 세전 월급은 300만 원이고, 이 계산기의 단순 모델 기준 공제액은 약 50만 원, 월 실수령액은 약 250만 원으로 표시됩니다. 실제 금액은 공제 조건에 따라 달라집니다.",
    salary_notice_title: "이용 시 유의사항",
    salary_notice_1: "비과세 항목(식대, 자가운전보조금 등), 부양가족, 연장근로수당, 성과급은 반영하지 않습니다.",
    salary_notice_2: "연말정산 결과에 따라 실제 부담하는 세액은 매달 원천징수액과 달라질 수 있습니다.",
    salary_notice_3: "4대 보험료율과 소득세 간이세액표는 매년 바뀌므로 정확한 금액은 급여명세서나 국세청·건강보험공단 자료로 확인하세요.",
    salary_notice_4: "계산 결과는 참고용입니다.",
    salary_faq_title: "❓ 자주 묻는 질문",
    salary_faq1_q: "세전과 세후는 무엇이 다른가요?",
    salary_faq1_a: "세전은 4대 보험료와 세금을 빼기 전 금액, 세후(실수령액)는 이 공제를 모두 뺀 뒤 실제로 받는 금액입니다.",
    salary_faq2_q: "왜 이 계산기 결과가 실제 월급과 다른가요?",
    salary_faq2_a: "실제 공제액은 부양가족 수, 비과세 급여, 국민연금 상한, 건강보험료율 변동 등에 따라 달라집니다. 이 계산기는 고정 비율을 쓰는 단순 모델이라 근사값만 제공합니다.",
    salary_faq3_q: "연봉에 퇴직금이 포함되나요?",
    salary_faq3_a: "회사마다 다릅니다. ‘연봉에 퇴직금 포함’인 경우 실제 매달 받는 급여는 연봉을 13으로 나눈 값에 가깝습니다. 근로계약서를 확인하세요.",
    salary_faq4_q: "입력한 연봉이 저장되나요?",
    salary_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    salary_related_title: "🔗 관련 도구",

    savings_about_title: "예금과 적금, 단리와 복리",
    savings_about_deposit: "정기예금: 목돈을 한 번에 맡기고 만기에 원금과 이자를 받습니다. 이 계산기의 ‘정기예금(단리)’은 예치금 칸에 맡기는 금액을 입력합니다.",
    savings_about_savings: "적금: 매달 일정액을 나눠 넣습니다. 이 계산기의 ‘적금(월복리)’은 예치금 칸에 매달 넣는 금액을 입력합니다.",
    savings_about_simple: "단리는 원금에만 이자가 붙고, 복리는 이자에 다시 이자가 붙습니다.",
    savings_about_tax: "이자에는 이자소득세 15.4%(소득세 14% + 지방소득세 1.4%)가 원천징수됩니다. 이 계산기는 세전 이자와 세후 이자를 함께 보여 줍니다.",
    savings_example_title: "계산 예시",
    savings_example_body: "정기예금에 1,000만 원을 연 3.5%로 12개월 맡기면, 세전 이자는 35만 원, 세금 15.4%를 뺀 세후 이자는 약 29만 6천 원, 만기액은 약 1,029만 6천 원입니다.",
    savings_example_note: "적금은 매달 나눠 넣기 때문에 먼저 넣은 돈만 전체 기간 이자가 붙고, 나중에 넣은 돈은 짧게 붙습니다. 그래서 표시 이율이 같아도 적금의 실제 수령 이자는 같은 금액의 예금보다 적습니다.",
    savings_notice_title: "이용 시 유의사항",
    savings_notice_1: "실제 은행 적금은 대부분 단리로, 월별 예치 개월수에 따라 이자를 계산합니다. 이 계산기의 ‘적금(월복리)’ 결과는 실제 상품보다 이자가 다소 높게 나올 수 있습니다.",
    savings_notice_2: "우대금리 조건, 중도해지 시 약정이율 미적용, 비과세·세금우대 상품 여부는 반영하지 않습니다.",
    savings_notice_3: "계산 결과는 참고용이며, 정확한 금액은 가입하려는 상품의 약관과 은행 안내로 확인하세요.",
    savings_faq_title: "❓ 자주 묻는 질문",
    savings_faq1_q: "적금인데 왜 예치금 칸에 월 납입액을 넣나요?",
    savings_faq1_a: "이 계산기의 적금 모드는 매달 같은 금액을 넣는다고 가정합니다. 예치금 칸에 매달 넣을 금액을, 기간 칸에 납입 개월수를 입력하세요.",
    savings_faq2_q: "이자소득세는 왜 15.4%인가요?",
    savings_faq2_a: "이자·배당 소득에는 소득세 14%와 그에 대한 지방소득세 1.4%가 함께 부과되어 합계 15.4%가 원천징수됩니다.",
    savings_faq3_q: "표시 이율이 같은데 예금과 적금 이자가 왜 다른가요?",
    savings_faq3_a: "적금은 나중에 넣은 돈일수록 이자가 붙는 기간이 짧기 때문입니다. 대략 같은 이율이라면 적금의 실효 이자는 예금의 절반 안팎입니다.",
    savings_faq4_q: "입력한 금액이 저장되나요?",
    savings_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    savings_related_title: "🔗 관련 도구",

    retirement_about_title: "퇴직금은 어떻게 계산되나요",
    retirement_about_intro: "법정 퇴직금은 계속 근로기간 1년에 대해 30일분의 평균임금을 지급하는 것이 기준입니다. 공식은 대략 ‘1일 평균임금 × 30 × (재직일수 ÷ 365)’ 입니다.",
    retirement_about_1: "계속 근로기간이 1년 미만이면 법정 퇴직금 지급 대상이 아닙니다.",
    retirement_about_2: "평균임금은 퇴직 직전 3개월 동안 받은 임금 총액을 그 기간의 총일수로 나눈 값이며, 연간 상여금과 연차수당의 일부도 포함됩니다.",
    retirement_about_3: "주 15시간 미만 초단시간 근로 등 일부 예외가 있습니다.",
    retirement_about_note: "이 계산기는 입력한 마지막 월급과 보너스를 바탕으로 한 단순 추정치를 보여 줍니다. 실제 평균임금 산정과는 차이가 있을 수 있습니다.",
    retirement_example_title: "계산 예시",
    retirement_example_body: "마지막 월급 300만 원, 보너스 없음, 3년(약 1,096일) 근무로 계산하면 예상 퇴직금은 약 900만 원으로 표시됩니다. 대략 ‘월급 × 근속연수’ 수준입니다.",
    retirement_notice_title: "이용 시 유의사항",
    retirement_notice_1: "퇴직소득세는 별도로 공제되며 이 계산기 결과에는 반영되지 않습니다. 근속연수가 길수록 세 부담은 낮아집니다.",
    retirement_notice_2: "확정기여형(DC) 퇴직연금은 회사가 매년 납입한 금액과 운용 수익에 따라 최종 수령액이 달라집니다.",
    retirement_notice_3: "회사 규정이 법정 기준보다 유리한 경우 그 규정이 우선 적용됩니다.",
    retirement_notice_4: "계산 결과는 참고용이며, 정확한 금액은 고용노동부 퇴직금 계산기나 회사 인사 담당에게 확인하세요.",
    retirement_faq_title: "❓ 자주 묻는 질문",
    retirement_faq1_q: "1년을 딱 채우면 퇴직금을 받나요?",
    retirement_faq1_a: "계속 근로기간이 1년 이상이면 지급 대상입니다. 1년에서 하루라도 모자라면 법정 퇴직금은 발생하지 않습니다.",
    retirement_faq2_q: "평균임금과 통상임금은 무엇이 다른가요?",
    retirement_faq2_a: "평균임금은 실제로 받은 임금(상여·수당 포함) 기준이고, 통상임금은 정기적·일률적으로 지급되는 기본 임금 기준입니다. 퇴직금은 원칙적으로 평균임금으로 계산하되, 평균임금이 통상임금보다 적으면 통상임금을 씁니다.",
    retirement_faq3_q: "아르바이트도 퇴직금을 받을 수 있나요?",
    retirement_faq3_a: "고용 형태와 상관없이 1년 이상 계속 근로하고 주 소정근로시간이 15시간 이상이면 퇴직금 지급 대상입니다.",
    retirement_faq4_q: "입력한 정보가 저장되나요?",
    retirement_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    retirement_related_title: "🔗 관련 도구",

    bmi_about_title: "BMI란 무엇인가",
    bmi_about_intro: "BMI(체질량지수, Body Mass Index)는 체중(kg)을 키(m)의 제곱으로 나눈 값입니다. 키 170cm, 체중 68kg이면 68 ÷ (1.7 × 1.7) ≈ 23.5입니다. 키 대비 체중이 어느 정도인지 간단히 가늠하는 지표로, 세계보건기구(WHO)와 여러 보건기관이 비만 정도를 분류할 때 사용합니다.",
    bmi_table_title: "BMI 판정 기준",
    bmi_table_intro: "이 계산기는 WHO 국제 기준을 사용합니다.",
    bmi_table_th_range: "BMI 범위",
    bmi_table_th_status: "분류",
    bmi_status_under: "저체중",
    bmi_status_normal: "정상체중",
    bmi_status_over: "과체중",
    bmi_status_obese: "비만",
    bmi_table_note: "대한비만학회 등 아시아·태평양 기준에서는 BMI 23 이상을 과체중(비만 전 단계), 25 이상을 비만으로 봅니다. 같은 체중이라도 적용 기준에 따라 분류가 달라질 수 있습니다.",
    bmi_limit_title: "결과 해석 시 주의할 점",
    bmi_limit_1: "BMI는 근육량과 체지방을 구분하지 못합니다. 근육량이 많은 사람은 실제 체지방이 적어도 BMI가 높게 나올 수 있습니다.",
    bmi_limit_2: "성장기 어린이·청소년, 임산부, 고령자에게는 그대로 적용하기 어렵습니다.",
    bmi_limit_3: "같은 BMI라도 복부 지방(허리둘레)에 따라 건강 위험도가 다릅니다.",
    bmi_limit_4: "BMI는 참고 지표이며 의학적 진단이 아닙니다. 체중 관리나 건강 상태가 걱정된다면 의료진과 상담하세요.",
    bmi_faq_title: "❓ 자주 묻는 질문",
    bmi_faq1_q: "적정 체중은 어떻게 나오나요?",
    bmi_faq1_a: "정상 범위인 BMI 18.5~25에 해당하는 체중을 계산해 표시합니다. 키(m)의 제곱에 18.5와 25를 각각 곱한 값입니다.",
    bmi_faq2_q: "한국 기준과 결과가 다른 것 같아요.",
    bmi_faq2_a: "이 계산기는 WHO 국제 기준(정상 18.5~24.9)을 씁니다. 대한비만학회 기준으로는 BMI 23부터 비만 전 단계로 보기 때문에 분류가 더 엄격합니다.",
    bmi_faq3_q: "BMI가 정상이면 건강한 건가요?",
    bmi_faq3_a: "BMI는 여러 지표 중 하나일 뿐입니다. 체지방률, 허리둘레, 혈압·혈당·콜레스테롤 등을 함께 봐야 건강 상태를 제대로 알 수 있습니다.",
    bmi_faq4_q: "입력한 키·체중이 저장되나요?",
    bmi_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    bmi_related_title: "🔗 관련 도구",

    age_about_title: "만 나이·연 나이·세는 나이",
    age_about_1: "만 나이: 태어난 날을 0세로 시작해 생일마다 한 살씩 더합니다. 2023년 6월부터 법령·행정의 기본 기준입니다. 이 계산기가 계산하는 값입니다.",
    age_about_2: "연 나이: 생일과 관계없이 ‘올해 연도 − 태어난 연도’로 계산합니다. 병역법 등 일부 법률에서 사용합니다.",
    age_about_3: "세는 나이: 태어나면 1세, 매년 1월 1일에 한 살씩 더하는 전통 방식입니다. 만 나이보다 한두 살 많습니다.",
    age_example_title: "계산 예시",
    age_example_body: "1990년 5월 10일생을 2026년 9월 1일 기준으로 계산하면, 올해 생일이 지났으므로 만 36세입니다. 생일 전이라면 만 35세가 됩니다. 경과 일수는 태어난 날부터 기준일까지의 총 일수입니다.",
    age_faq_title: "❓ 자주 묻는 질문",
    age_faq1_q: "만 나이와 세는 나이의 차이는?",
    age_faq1_a: "만 나이는 출생 이후 실제로 지난 햇수이고, 세는 나이는 출생 시 1세로 시작해 새해마다 한 살을 더합니다. 그래서 세는 나이가 만 나이보다 한두 살 많습니다.",
    age_faq2_q: "기준 날짜를 바꿀 수 있나요?",
    age_faq2_a: "네. 기준 날짜를 직접 입력하면 그 날짜를 기준으로 나이와 경과 일수를 계산합니다. 특정 시점의 만 나이를 확인할 때 유용합니다.",
    age_faq3_q: "2월 29일생은 어떻게 계산되나요?",
    age_faq3_a: "평년에는 2월 28일 또는 3월 1일을 생일로 보는 견해가 있어 하루 차이가 날 수 있습니다. 이 계산기는 다음 생일을 표시할 때 3월 1일로 처리합니다.",
    age_faq4_q: "입력한 생년월일이 저장되나요?",
    age_faq4_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    age_related_title: "🔗 관련 도구",

    dday_basis_title: "D-Day 계산 기준",
    dday_basis_body: "이 계산기는 ‘목표 날짜 − 오늘 날짜’를 계산합니다. 오늘은 0일째로 보며, 목표일이 내일이면 D-1, 오늘이면 D-Day, 어제였으면 D+1로 표시합니다.",
    dday_basis_note: "‘시험 100일 전’처럼 당일을 1일째로 세는 방식과는 하루 차이가 날 수 있습니다. 그럴 때는 목표 날짜를 하루 조정해 맞추세요.",
    dday_use_title: "이런 데 쓸 수 있어요",
    dday_use_1: "시험, 자격증 접수 마감, 원서 접수일까지 남은 날짜",
    dday_use_2: "기념일, 결혼식, 여행 출발일 카운트다운",
    dday_use_3: "출산 예정일, 프로젝트 마감일 등 지난 날짜 확인(D+)",
    dday_faq_title: "❓ 자주 묻는 질문",
    dday_faq1_q: "D-Day는 무엇인가요?",
    dday_faq1_a: "특정 목표일을 기준으로 남은 일수를 나타내는 형식입니다. 목표일까지 10일이 남으면 D-10, 당일은 D-Day, 지난 지 5일이면 D+5입니다.",
    dday_faq2_q: "과거 날짜를 입력할 수 있나요?",
    dday_faq2_a: "네. 과거 날짜를 입력하면 그 날짜로부터 며칠이 지났는지 D+ 형식으로 표시합니다.",
    dday_faq3_q: "‘시험 D-100’과 계산이 다른 것 같아요.",
    dday_faq3_a: "기관에 따라 시험 당일을 1일째로 세기도 합니다. 이 계산기는 당일을 0일째로 보므로, 필요하면 목표 날짜를 하루 앞당겨 입력하세요.",
    dday_faq4_q: "시간 단위로도 계산할 수 있나요?",
    dday_faq4_a: "현재는 날짜(일) 단위로만 계산합니다.",
    dday_related_title: "🔗 관련 도구",

    discharge_term_title: "군별 복무기간",
    discharge_term_th_branch: "군 종류",
    discharge_term_th_months: "복무기간",
    discharge_term_army: "육군·해병대",
    discharge_term_army_m: "18개월",
    discharge_term_navy: "해군",
    discharge_term_navy_m: "20개월",
    discharge_term_air: "공군",
    discharge_term_air_m: "21개월",
    discharge_term_note: "사회복무요원, 산업기능요원 등은 복무기간이 다릅니다. ‘기타(직접입력)’를 선택해 개월수를 입력하세요.",
    discharge_how_title: "전역일과 진행률 계산 방식",
    discharge_how_body: "전역일은 입대일에 복무 개월수를 더한 날의 전날을 기준으로 합니다(현역병은 만기 전역 시 전역일이 그렇게 정해집니다). 이 계산기는 입대일에 개월수를 더한 날짜를 전역일로 표시하고, 오늘까지 지난 비율을 진행률로 보여 줍니다. 진행률은 한 달을 30일로 어림해 계산하므로 실제와 소폭 차이가 있을 수 있습니다.",
    discharge_faq_title: "❓ 자주 묻는 질문",
    discharge_faq1_q: "복무기간은 얼마인가요?",
    discharge_faq1_a: "현재 기준 육군·해병대 18개월, 해군 20개월, 공군 21개월입니다. 복무기간은 정책에 따라 조정될 수 있으니 최신 정보는 병무청 안내를 확인하세요.",
    discharge_faq2_q: "조기 전역이나 분할 복무도 계산되나요?",
    discharge_faq2_a: "이 계산기는 입대일부터 연속 복무한다고 가정합니다. 휴가 미복귀, 조기 전역, 분할 복무 등은 반영되지 않습니다.",
    discharge_faq3_q: "입력한 입대일이 저장되나요?",
    discharge_faq3_a: "아니요. 계산은 모두 브라우저에서 처리되며 입력값은 서버로 전송되지 않습니다.",
    discharge_related_title: "🔗 관련 도구",

    percent_guide_title: "퍼센트 계산 공식",
    percent_guide_1: "A의 B%: A × (B ÷ 100). 예) 1,000의 15% = 1,000 × 0.15 = 150",
    percent_guide_2: "A는 B의 몇 %: (A ÷ B) × 100. 예) 150은 1,000의 (150 ÷ 1,000) × 100 = 15%",
    percent_guide_3: "증감 비율: (현재 값 − 이전 값) ÷ 이전 값 × 100. 예) 100 → 120이면 20% 증가, 100 → 80이면 20% 감소",
    percent_guide_note: "할인가는 ‘원래 가격 × (100 − 할인율) ÷ 100’으로 구합니다. 10,000원에서 20% 할인이면 10,000 × 0.8 = 8,000원입니다.",

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
    faq_a4: "네, 모든 도구는 모바일 기기에 최적화되어 있습니다.",

    saju_title: "사주·운세",
    saju_copy: "생년월일을 바탕으로 사주 정보를 확인합니다.",

    saju_meta_title: "무료 사주풀이 | 사주팔자 확인",
    saju_meta_description: "생년월일과 출생시간을 입력하여 사주 정보를 확인해보세요.",

    saju_eyebrow: "무료 온라인 사주풀이",
    saju_page_title: "무료 사주팔자 풀이",
    saju_page_copy: "생년월일과 출생시간을 입력하여 나의 사주 정보를 확인해보세요.",

    saju_input_title: "사주 정보 입력",
    saju_birth_date: "생년월일",
    saju_birth_time: "출생시간",
    saju_birth_time_unknown: "모름",
    saju_gender: "성별",
    saju_male: "남성",
    saju_female: "여성",
    saju_calculate: "사주 보기",
    saju_input_required: "생년월일을 입력해주세요.",

    saju_result_title: "사주 결과",
    saju_result_placeholder: "정보를 입력하면 결과가 표시됩니다.",
    saju_result_ready: "입력 정보가 확인되었습니다.",
    saju_result_demo: "현재는 사주 입력 및 결과 화면을 준비하는 단계입니다. 실제 만세력 계산 기능은 다음 단계에서 연결합니다.",

    saju_about_title: "사주란?",
    saju_about_copy: "사주는 태어난 연월일시를 기준으로 전통적인 명리학 관점에서 성향과 운세를 살펴보는 방법입니다.",

    saju_faq_title: "❓ 자주 묻는 질문",
    saju_faq1: "출생시간을 모르면 사주를 볼 수 있나요?",
    saju_faq1_answer: "출생시간을 모르는 경우에도 일부 정보를 기준으로 확인할 수 있지만 결과에 차이가 있을 수 있습니다.",
    saju_faq2: "사주 결과는 정확한가요?",
    saju_faq2_answer: "사주는 전통적인 명리학을 바탕으로 한 참고용 해석이며 미래를 확정적으로 예측하는 결과가 아닙니다.",
    saju_faq3: "입력한 정보가 저장되나요?",
    saju_faq3_answer: "입력한 정보의 저장 여부는 서비스 설정에 따라 달라질 수 있습니다.",

    stock_meta_title: "주식·ETF 적립식 투자 수익 계산기 - 과거 수익률 백테스트 | 무료 온라인 도구",
    stock_meta_description: "특정 시점부터 매달 일정 금액을 주식이나 ETF에 적립식으로 투자했다면 지금 얼마가 되었을지 계산합니다. SPY, QQQ, VOO 등 미국 상장 종목의 과거 수익률을 무료로 백테스트하세요.",
    stock_eyebrow: "과거 수익률 백테스트",
    stock_title: "주식·ETF 적립식 투자 수익 계산기",
    stock_copy: "특정 시점부터 매달 일정 금액을 주식이나 ETF에 적립식으로 투자했다면 지금 얼마가 되었을지 계산합니다.",
    stock_form_ticker: "종목 티커",
    stock_form_ticker_hint: "미국 상장 주식·ETF의 티커를 입력하세요. (예: SPY, QQQ, VOO, AAPL)",
    stock_form_amount: "매월 투자금액 (USD)",
    stock_form_amount_hint: "매달 같은 금액을 매수한다고 가정합니다. 금액은 미국 달러 기준이며 환율은 반영하지 않습니다.",
    stock_form_start: "투자 시작 월",
    stock_form_end: "투자 종료 월 (선택)",
    stock_form_end_hint: "비워 두면 가장 최근 월까지 계산합니다. 과거 데이터는 최대 약 10년까지 제공됩니다.",
    stock_form_dividend: "배당금 처리",
    stock_form_dividend_on: "배당 재투자 포함 (수정주가 기준)",
    stock_form_dividend_off: "배당 제외 (종가 기준)",
    stock_calculate: "계산하기",
    stock_copy_result: "결과 복사",
    stock_reset: "초기화",
    stock_chart_value: "평가금액",
    stock_chart_principal: "투자원금",
    stock_table_toggle: "월별 상세 내역 보기",
    stock_th_month: "월",
    stock_th_price: "주가",
    stock_th_bought: "매수 수량",
    stock_th_shares: "누적 수량",
    stock_th_invested: "누적 원금",
    stock_th_value: "평가금액",
    stock_data_source: "시세 데이터: stockanalysis.com · 참고용이며 실제 투자 결과와 다를 수 있습니다.",
    stock_about_title: "적립식 투자(적금식 투자)란?",
    stock_about_copy: "적립식 투자는 매달 정해진 금액으로 같은 종목을 꾸준히 매수하는 방법입니다. 가격이 쌀 때는 더 많은 수량을, 비쌀 때는 더 적은 수량을 사게 되어 평균 매입 단가가 자연스럽게 분산됩니다. 영어로는 DCA(Dollar Cost Averaging)라고 합니다.",
    stock_about_copy2: "이 계산기는 선택한 시작 월부터 매달 첫 거래일에 입력한 금액만큼 매수했다고 가정하고, 누적 수량과 현재 평가금액, 투자원금 대비 수익률, 연평균 수익률(투자금 가중 수익률)을 계산합니다.",
    stock_disclaimer_title: "계산 시 유의사항",
    stock_disclaimer_copy: "매매 수수료, 세금, 환율, 슬리피지는 반영하지 않습니다. '배당 재투자 포함'은 수정주가(Adjusted Close)를 사용해 배당을 같은 종목에 재투자한 경우를 근사한 값입니다. 과거 수익률은 미래 수익을 보장하지 않으며, 이 도구는 투자 자문이 아닙니다.",
    stock_faq_title: "❓ 자주 묻는 질문",
    stock_faq1_q: "어떤 종목을 조회할 수 있나요?",
    stock_faq1_a: "미국 거래소에 상장된 주식과 ETF를 티커로 조회할 수 있습니다. 예를 들어 SPY, QQQ, VOO, SCHD, AAPL 등입니다. 한국 거래소 종목은 지원하지 않습니다.",
    stock_faq2_q: "얼마나 과거까지 계산할 수 있나요?",
    stock_faq2_a: "시세 데이터 제공 범위에 따라 대략 최근 10년까지 계산할 수 있습니다. 그보다 이른 시작 월을 선택하면 데이터가 있는 가장 이른 월부터 계산합니다.",
    stock_faq3_q: "배당금은 어떻게 반영되나요?",
    stock_faq3_a: "'배당 재투자 포함'을 선택하면 배당락을 반영한 수정주가로 계산해 배당을 같은 종목에 재투자한 결과를 근사합니다. '배당 제외'는 단순 종가로만 계산합니다.",
    stock_faq4_q: "연평균 수익률은 어떻게 계산하나요?",
    stock_faq4_a: "매달 현금을 넣는 적립식 특성을 반영해 투자금 가중 수익률(내부수익률, IRR)을 구한 뒤 연 단위로 환산합니다. 단순히 최종 수익률을 기간으로 나눈 값과는 다릅니다.",
    stock_related_title: "🔗 관련 도구",
    stock_loading: "시세 데이터를 불러오는 중입니다...",
    stock_err_symbol: "해당 티커의 시세 데이터를 찾을 수 없습니다. 티커를 다시 확인해 주세요. (미국 상장 종목만 지원)",
    stock_err_network: "시세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요. (네트워크 또는 데이터 제공처 문제)",
    stock_err_range: "선택한 기간에 사용할 수 있는 시세 데이터가 없습니다. 시작 월과 종료 월을 확인해 주세요.",
    stock_err_input: "티커와 매월 투자금액, 시작 월을 올바르게 입력해 주세요.",
    stock_notice_clamped: "선택하신 시작 월보다 데이터가 늦게 시작합니다. {month}부터 계산했습니다.",
    stock_res_principal: "총 투자원금",
    stock_res_value: "최종 평가금액",
    stock_res_profit: "총 손익",
    stock_res_return: "누적 수익률",
    stock_res_cagr: "연평균 수익률",
    stock_res_months: "매수 횟수",
    stock_res_shares: "누적 수량",
    stock_res_avgprice: "평균 매입가",
    stock_months_unit: "회",
    stock_shares_unit: "주",
    stock_copied: "결과가 복사되었습니다.",
    tool_stock_title: "주식·ETF 적립식 투자 계산기",
    tool_stock_desc: "과거 특정 시점부터 매달 적립식으로 투자했을 때의 수익률을 계산합니다."
  },

  en: {
    nav_home: "Home",
    nav_calculator: "Calculators",
    nav_lotto: "Lotto",
    nav_tools: "Tools",
    nav_saju: "Saju & Fortune",

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
    calculator_meta_description: "Free online calculators in one place: percentage, age, D-Day, and discharge date, plus salary, loan, savings, severance, VAT, and BMI calculators.",
    tools_meta_title: "Tools Category - Free Online Tools",
    tools_meta_description: "A collection of free online utility tools including a character/byte counter, unit converter, text converter, and camera shutter count checker.",
    lotto_meta_title: "Lotto Number Generator - Free Lotto Recommendations",
    lotto_meta_description: "A free tool that randomly selects 6 lotto numbers from 1 to 45.",
    games_meta_title: "Mini Games - Free Online Games",
    games_meta_description: "Enjoy free online mini games including reaction tests, Sudoku, typing tests, and block puzzles.",
    nav_blog: "Blog",
    blog_meta_title: "Blog - Stories from is-an Tools",
    blog_meta_description: "Updates about calculators, tools, mini games, and building the is-an website.",
    blog_eyebrow: "Stories from is-an",
    blog_title: "Blog",
    blog_copy: "Notes and useful ideas from building online tools.",
    blog_read: "Read",
    blog_post_title: "How to Add Useful Tools to a Static Website",
    blog_post_summary: "A practical look at the structure and workflow for growing a small online tools site.",
    blog_post_date: "August 14, 2026",
    blog_post_category: "Web Development",
    blog_post_heading: "A small, fast tools site structure",
    blog_post_body: "Static HTML, CSS, and JavaScript are enough to deliver calculators and useful tools quickly. Reusing shared headers and footers while keeping each feature in its own directory makes maintenance and deployment simpler.",
    blog_related: "Related posts",
    blog_back: "Back to posts",
    games_eyebrow: "Free Online Mini Games",
    games_title: "Game Collection",
    games_copy: "Enjoy short games while testing your reaction time, focus, and typing skills.",
    shutter_meta_title: "Camera Shutter Count Checker - EXIF Photo Analysis",
    shutter_meta_description: "Analyze camera EXIF data in your browser and display a shutter count only when explicitly available.",
    og_title: "Free Online Tools",
    og_description: "15 tools including percentage, age, character count, unit conversion, BMI, salary, loan, and image processing",

    home_popular_title: "Popular Tools",
    home_categories_title: "Categories",
    home_eyebrow: "Free Online Tools",
    home_title: "Useful tools, all in one place",
    home_copy: "Calculators, tools, games, lotto, and Saju — all free, all in one place.",
    home_searchPlaceholder: "Search tools... (e.g. BMI, salary, lotto)",
    home_about_title: "is-an Online Tools",
    home_about_copy: "is-an.github.io is a collection of free online tools that need no sign-up. From percentage, age, and D-Day calculators to salary, loan, savings, and severance calculators, character and unit converters, mini games, a lotto number generator, and Saju readings, you can reach the tools people use most from one place. Every calculation runs in your browser and your input is never sent to a server.",
    home_allTools: "Browse all categories",
    cal_finance_title: "Finance & Life Calculators",
    tools_calc_note: "Salary, loan, savings, severance, BMI and other calculators are available in the Calculators category.",

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
    tools_copy: "Handy utilities for everyday tasks: character counting, unit conversion, text transformation, and photo EXIF analysis.",

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
    lotto_intro: "Randomly generates 6 distinct numbers from 1 to 45.",
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
    faq_a4: "Yes, all tools are optimized for mobile devices.",

    saju_title: "Saju & Fortune",
    saju_copy: "Check Saju information based on your birth date.",

    saju_meta_title: "Free Saju Reading | Four Pillars",
    saju_meta_description: "Enter your birth date and time to check your Saju information.",

    saju_eyebrow: "Free Online Saju Reading",
    saju_page_title: "Free Saju Reading",
    saju_page_copy: "Enter your birth date and time to check your Saju information.",

    saju_input_title: "Birth Information",
    saju_birth_date: "Birth date",
    saju_birth_time: "Birth time",
    saju_birth_time_unknown: "Unknown",
    saju_gender: "Gender",
    saju_male: "Male",
    saju_female: "Female",
    saju_calculate: "View Saju",
    saju_input_required: "Please enter your birth date.",

    saju_result_title: "Saju Result",
    saju_result_placeholder: "Your result will appear after entering your information.",
    saju_result_ready: "Your information has been confirmed.",
    saju_result_demo: "The input and result interface is ready. The actual Four Pillars calculation will be connected in the next step.",

    saju_about_title: "What is Saju?",
    saju_about_copy: "Saju is a traditional East Asian method that interprets tendencies and fortune based on the year, month, day, and time of birth.",

    saju_faq_title: "❓ Frequently Asked Questions",
    saju_faq1: "Can I check Saju without knowing my birth time?",
    saju_faq1_answer: "Yes, but the result may differ because the birth time is used for part of the Saju calculation.",
    saju_faq2: "Are Saju results accurate?",
    saju_faq2_answer: "Saju is a traditional interpretive practice and should be considered for reference rather than a definitive prediction of the future.",
    saju_faq3: "Is my information stored?",
    saju_faq3_answer: "Whether information is stored depends on the service configuration.",

    stock_meta_title: "Stock & ETF Dollar-Cost-Averaging Return Calculator - Historical Backtest",
    stock_meta_description: "See what a fixed monthly investment into a stock or ETF from a past starting point would be worth today. Backtest the historical returns of US-listed tickers such as SPY, QQQ, and VOO for free.",
    stock_eyebrow: "Historical return backtest",
    stock_title: "Stock & ETF Recurring Investment Calculator",
    stock_copy: "See what a fixed monthly investment into a stock or ETF, started at a past point in time, would be worth today.",
    stock_form_ticker: "Ticker symbol",
    stock_form_ticker_hint: "Enter the ticker of a US-listed stock or ETF (e.g. SPY, QQQ, VOO, AAPL).",
    stock_form_amount: "Monthly investment (USD)",
    stock_form_amount_hint: "Assumes you buy the same amount every month. Amounts are in US dollars; currency conversion is not included.",
    stock_form_start: "Start month",
    stock_form_end: "End month (optional)",
    stock_form_end_hint: "Leave blank to calculate through the most recent month. Historical data goes back about 10 years.",
    stock_form_dividend: "Dividend handling",
    stock_form_dividend_on: "Reinvest dividends (adjusted close)",
    stock_form_dividend_off: "Exclude dividends (raw close)",
    stock_calculate: "Calculate",
    stock_copy_result: "Copy result",
    stock_reset: "Reset",
    stock_chart_value: "Portfolio value",
    stock_chart_principal: "Amount invested",
    stock_table_toggle: "Show monthly breakdown",
    stock_th_month: "Month",
    stock_th_price: "Price",
    stock_th_bought: "Shares bought",
    stock_th_shares: "Total shares",
    stock_th_invested: "Total invested",
    stock_th_value: "Value",
    stock_data_source: "Price data: stockanalysis.com. For reference only; actual results may differ.",
    stock_about_title: "What is recurring (dollar-cost-averaging) investing?",
    stock_about_copy: "Recurring investing means buying the same security with a fixed amount every month. You buy more shares when the price is low and fewer when it is high, so your average purchase price is naturally spread out. In English this is called DCA (Dollar Cost Averaging).",
    stock_about_copy2: "This calculator assumes you buy the entered amount on the first trading day of each month from the chosen start month, and computes your accumulated shares, current value, return versus principal, and annualized (money-weighted) return.",
    stock_disclaimer_title: "Things to keep in mind",
    stock_disclaimer_copy: "Trading fees, taxes, currency conversion, and slippage are not included. \"Reinvest dividends\" uses the adjusted close to approximate reinvesting dividends into the same security. Past performance does not guarantee future returns, and this tool is not investment advice.",
    stock_faq_title: "❓ Frequently asked questions",
    stock_faq1_q: "Which tickers can I look up?",
    stock_faq1_a: "Stocks and ETFs listed on US exchanges, by ticker — for example SPY, QQQ, VOO, SCHD, or AAPL. Korean-exchange tickers are not supported.",
    stock_faq2_q: "How far back can I calculate?",
    stock_faq2_a: "About 10 years, depending on data availability. If you choose an earlier start month, the calculation begins from the earliest month with data.",
    stock_faq3_q: "How are dividends handled?",
    stock_faq3_a: "\"Reinvest dividends\" uses the dividend-adjusted close to approximate reinvesting dividends into the same security. \"Exclude dividends\" uses the raw close only.",
    stock_faq4_q: "How is the annualized return calculated?",
    stock_faq4_a: "It uses the money-weighted return (internal rate of return, IRR) to reflect monthly contributions, then annualizes it. This differs from simply dividing the total return by the number of years.",
    stock_related_title: "🔗 Related tools",
    stock_loading: "Loading price data...",
    stock_err_symbol: "No price data found for that ticker. Please check the symbol (US-listed tickers only).",
    stock_err_network: "Could not load price data. Please try again later (network or data-provider issue).",
    stock_err_range: "No price data is available for the selected period. Please check the start and end months.",
    stock_err_input: "Please enter a valid ticker, monthly amount, and start month.",
    stock_notice_clamped: "Data starts later than the start month you chose. Calculated from {month}.",
    stock_res_principal: "Total invested",
    stock_res_value: "Final value",
    stock_res_profit: "Total gain/loss",
    stock_res_return: "Total return",
    stock_res_cagr: "Annualized return",
    stock_res_months: "Purchases",
    stock_res_shares: "Total shares",
    stock_res_avgprice: "Avg. cost",
    stock_months_unit: "",
    stock_shares_unit: "sh",
    stock_copied: "Result copied.",
    tool_stock_title: "Stock & ETF DCA Calculator",
    tool_stock_desc: "Calculate the return of investing a fixed amount every month from a past starting point."
  },

  zh: {
    nav_home: "首页",
    nav_calculator: "计算器",
    nav_lotto: "乐透",
    nav_tools: "工具",
    nav_saju: "四柱推命",

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
    calculator_meta_description: "一站式免费在线计算器：百分比、年龄、D-Day、退伍日期，以及薪资、贷款、存款、退休金、增值税和 BMI 计算器。",
    tools_meta_title: "工具分类 - 免费在线工具集合",
    tools_meta_description: "免费在线实用工具集合，包括字数/字节统计、单位换算、文本转换和相机快门次数查询器。",
    lotto_meta_title: "乐透号码生成器 - 免费乐透推荐",
    lotto_meta_description: "从1到45中随机选择6个乐透号码的免费工具。",
    games_meta_title: "迷你游戏 - 免费在线游戏集合",
    games_meta_description: "免费体验反应速度测试、数独、打字速度测试和方块拼图等在线迷你游戏。",
    nav_blog: "博客",
    blog_meta_title: "博客 - is-an 在线工具故事",
    blog_meta_description: "分享计算器、工具、迷你游戏和网站制作的最新内容。",
    blog_eyebrow: "is-an 故事",
    blog_title: "博客",
    blog_copy: "分享制作在线工具时的记录和实用信息。",
    blog_read: "阅读",
    blog_post_title: "如何为静态网站添加实用工具",
    blog_post_summary: "整理小型在线工具网站的扩展结构和运营方法。",
    blog_post_date: "2026年8月14日",
    blog_post_category: "网页开发",
    blog_post_heading: "小而快速的工具网站结构",
    blog_post_body: "只使用静态 HTML、CSS 和 JavaScript，也可以快速提供计算器和工具。复用通用页眉页脚，并将每项功能放在独立目录中，可以让维护和部署更加简单。",
    blog_related: "相关文章",
    blog_back: "返回文章列表",
    games_eyebrow: "免费在线迷你游戏",
    games_title: "游戏集合",
    games_copy: "用短时间的游戏测试你的反应速度、专注力和打字能力。",
    shutter_meta_title: "相机快门次数查询器 - EXIF照片分析",
    shutter_meta_description: "在浏览器中分析相机EXIF信息，并仅在明确存在时显示快门次数。",
    og_title: "免费在线工具集合",
    og_description: "包含百分比、年龄、字数、单位换算、BMI、薪资、贷款、图片处理等15款工具",

    home_popular_title: "热门工具",
    home_categories_title: "工具分类",
    home_eyebrow: "免费在线工具集合",
    home_title: "实用工具，一站搞定",
    home_copy: "计算器、工具、游戏、乐透、四柱推命，全部免费，一站搞定。",
    home_searchPlaceholder: "搜索工具...(例如 BMI、薪资、乐透)",
    home_about_title: "is-an 在线工具集",
    home_about_copy: "is-an.github.io 是一个无需注册即可免费使用的在线工具集。从百分比、年龄、D-Day 计算器到薪资、贷款、存款、退休金等财务计算器，以及字数与单位换算工具、迷你游戏、乐透号码生成器和四柱推命，你都可以在同一个页面快速使用。所有计算都在浏览器中完成，输入内容不会发送到服务器。",
    home_allTools: "浏览所有分类",
    cal_finance_title: "财务与生活计算器",
    tools_calc_note: "薪资、贷款、存款、退休金、BMI 等计算器可在“计算器”分类中使用。",

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
    tools_copy: "日常实用工具：字数统计、单位换算、文本转换和照片 EXIF 分析。",

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
    lotto_intro: "从1到45中随机生成6个不重复的号码。",
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

    saju_title: "四柱八字·运势",
    saju_copy: "根据出生日期查看四柱八字信息。",

    saju_meta_title: "免费四柱八字解析 | 八字查询",
    saju_meta_description: "输入出生日期和时间，查看四柱八字信息。",

    saju_eyebrow: "免费在线四柱八字解析",
    saju_page_title: "免费四柱八字解析",
    saju_page_copy: "输入出生日期和时间，查看您的四柱八字信息。",

    saju_input_title: "出生信息",
    saju_birth_date: "出生日期",
    saju_birth_time: "出生时间",
    saju_birth_time_unknown: "未知",
    saju_gender: "性别",
    saju_male: "男性",
    saju_female: "女性",
    saju_calculate: "查看八字",
    saju_input_required: "请输入出生日期。",

    saju_result_title: "八字结果",
    saju_result_placeholder: "输入信息后将显示结果。",
    saju_result_ready: "出生信息已确认。",
    saju_result_demo: "当前已完成输入和结果界面。实际四柱八字计算功能将在下一阶段连接。",

    saju_about_title: "什么是四柱八字？",
    saju_about_copy: "四柱八字是根据出生的年、月、日、时，从传统命理学角度分析个人倾向和运势的方法。",

    saju_faq_title: "❓ 常见问题",
    saju_faq1: "不知道出生时间也可以查询吗？",
    saju_faq1_answer: "可以，但由于出生时间会影响部分八字计算，结果可能有所不同。",
    saju_faq2: "八字结果准确吗？",
    saju_faq2_answer: "四柱八字属于传统命理解释，应作为参考，而不是对未来的确定性预测。",
    saju_faq3: "输入的信息会被保存吗？",
    saju_faq3_answer: "是否保存输入信息取决于服务的具体配置。",

    stock_meta_title: "股票·ETF 定投收益计算器 - 历史收益率回测",
    stock_meta_description: "计算从过去某个时间点开始每月定额投资股票或 ETF，到现在会值多少钱。免费回测 SPY、QQQ、VOO 等美国上市标的的历史收益率。",
    stock_eyebrow: "历史收益率回测",
    stock_title: "股票·ETF 定投收益计算器",
    stock_copy: "计算从过去某个时间点开始，每月定额定投股票或 ETF，到现在会值多少钱。",
    stock_form_ticker: "股票代码",
    stock_form_ticker_hint: "请输入美国上市股票或 ETF 的代码（例如 SPY、QQQ、VOO、AAPL）。",
    stock_form_amount: "每月投资金额（美元）",
    stock_form_amount_hint: "假设每月买入相同金额。金额以美元计，不含汇率换算。",
    stock_form_start: "开始月份",
    stock_form_end: "结束月份（可选）",
    stock_form_end_hint: "留空则计算至最近月份。历史数据最多约 10 年。",
    stock_form_dividend: "股息处理",
    stock_form_dividend_on: "股息再投资（复权价）",
    stock_form_dividend_off: "不含股息（收盘价）",
    stock_calculate: "计算",
    stock_copy_result: "复制结果",
    stock_reset: "重置",
    stock_chart_value: "持仓市值",
    stock_chart_principal: "投入本金",
    stock_table_toggle: "查看每月明细",
    stock_th_month: "月份",
    stock_th_price: "股价",
    stock_th_bought: "买入数量",
    stock_th_shares: "累计数量",
    stock_th_invested: "累计本金",
    stock_th_value: "市值",
    stock_data_source: "行情数据：stockanalysis.com · 仅供参考，实际结果可能不同。",
    stock_about_title: "什么是定投（定额定投）？",
    stock_about_copy: "定投是指每月用固定金额持续买入同一标的。价格低时买得多，价格高时买得少，平均买入成本自然被分摊。英文称为 DCA（Dollar Cost Averaging）。",
    stock_about_copy2: "本计算器假设从所选开始月份起，每月第一个交易日按输入金额买入，并计算累计数量、当前市值、相对本金的收益率以及年化（资金加权）收益率。",
    stock_disclaimer_title: "计算注意事项",
    stock_disclaimer_copy: "不含交易手续费、税费、汇率和滑点。“股息再投资”使用复权收盘价来近似将股息再投资于同一标的。过往收益不代表未来收益，本工具不构成投资建议。",
    stock_faq_title: "❓ 常见问题",
    stock_faq1_q: "可以查询哪些标的？",
    stock_faq1_a: "可以按代码查询美国交易所上市的股票和 ETF，例如 SPY、QQQ、VOO、SCHD、AAPL 等。不支持韩国交易所标的。",
    stock_faq2_q: "可以回测多久之前？",
    stock_faq2_a: "视数据范围而定，大约最近 10 年。若选择更早的开始月份，将从有数据的最早月份开始计算。",
    stock_faq3_q: "股息如何计入？",
    stock_faq3_a: "选择“股息再投资”会使用反映除息的复权价，近似将股息再投资于同一标的；“不含股息”仅按收盘价计算。",
    stock_faq4_q: "年化收益率如何计算？",
    stock_faq4_a: "结合每月投入现金的特点，先求资金加权收益率（内部收益率 IRR），再换算为年化。这与将总收益率简单除以年数不同。",
    stock_related_title: "🔗 相关工具",
    stock_loading: "正在加载行情数据...",
    stock_err_symbol: "找不到该代码的行情数据，请检查代码（仅支持美国上市标的）。",
    stock_err_network: "无法加载行情数据，请稍后再试（网络或数据源问题）。",
    stock_err_range: "所选期间没有可用的行情数据，请检查开始月份和结束月份。",
    stock_err_input: "请正确输入股票代码、每月投资金额和开始月份。",
    stock_notice_clamped: "数据的起始时间晚于您选择的开始月份，已从 {month} 开始计算。",
    stock_res_principal: "累计投入本金",
    stock_res_value: "最终市值",
    stock_res_profit: "总盈亏",
    stock_res_return: "累计收益率",
    stock_res_cagr: "年化收益率",
    stock_res_months: "买入次数",
    stock_res_shares: "累计数量",
    stock_res_avgprice: "平均买入价",
    stock_months_unit: "次",
    stock_shares_unit: "股",
    stock_copied: "结果已复制。",
    tool_stock_title: "股票·ETF 定投计算器",
    tool_stock_desc: "计算从过去某个时间点开始每月定额定投的收益率。"
  },

  ja: {
    nav_home: "ホーム",
    nav_calculator: "計算機",
    nav_lotto: "ロト",
    nav_tools: "ツール",
    nav_saju: "四柱推命",

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
    calculator_meta_description: "パーセント・年齢・D-Day・除隊日から、給与・ローン・預金・退職金・付加価値税・BMI まで、無料オンライン計算機を一箇所にまとめました。",
    tools_meta_title: "ツールカテゴリ - 無料オンラインツール集",
    tools_meta_description: "文字数・バイト計算、単位変換、テキスト変換、カメラのシャッター回数チェッカーなど、無料オンラインユーティリティツール集です。",
    lotto_meta_title: "ロト番号生成機 - 無料ロト番号推薦",
    lotto_meta_description: "1から45までの数字から6個をランダムに選ぶ無料ロト番号生成ツールです。",
    games_meta_title: "ミニゲーム - 無料オンラインゲーム集",
    games_meta_description: "反応速度テスト、数独、タイピングテスト、ブロックパズルを楽しめる無料オンラインゲーム集です。",
    nav_blog: "ブログ",
    blog_meta_title: "ブログ - is-an オンラインツールの話",
    blog_meta_description: "計算機、ツール、ミニゲーム、ウェブサイト制作に関する情報をお届けします。",
    blog_eyebrow: "is-an の記録",
    blog_title: "ブログ",
    blog_copy: "オンラインツールを作る中で得た記録と役立つ情報を共有します。",
    blog_read: "読む",
    blog_post_title: "静的ウェブサイトに便利なツールを追加する方法",
    blog_post_summary: "小さなオンラインツールサイトを拡張する構成と運用方法をまとめました。",
    blog_post_date: "2026年8月14日",
    blog_post_category: "ウェブ開発",
    blog_post_heading: "小さく速いツールサイトの構成",
    blog_post_body: "静的な HTML、CSS、JavaScript だけでも、計算機や便利なツールを素早く提供できます。共通ヘッダーとフッターを再利用し、機能ごとにディレクトリを分けると、保守とデプロイが簡単になります。",
    blog_related: "関連記事",
    blog_back: "記事一覧に戻る",
    games_eyebrow: "無料オンラインミニゲーム",
    games_title: "ゲーム一覧",
    games_copy: "短いゲームを楽しみながら、反応速度、集中力、タイピングスキルを試してみましょう。",
    shutter_meta_title: "カメラシャッター回数チェッカー - EXIF写真解析",
    shutter_meta_description: "ブラウザーでカメラのEXIF情報を解析し、明示的に確認できる場合のみシャッター回数を表示します。",
    og_title: "無料オンラインツール集",
    og_description: "パーセント、年齢、文字数、単位変換、BMI、給与、ローン、画像処理な〩15のツール集",

    home_categories_title: "カテゴリー",
    home_popular_title: "人気ツール",
    home_eyebrow: "無料オンラインツール集",
    home_title: "便利なツールを一箇所に",
    home_copy: "計算機、ツール、ゲーム、ロト、四柱推命をまとめて無料で。",
    home_searchPlaceholder: "ツールを検索...(例: BMI、給与、ロト)",
    home_about_title: "is-an オンラインツール集",
    home_about_copy: "is-an.github.io は登録不要で無料で使えるオンラインツール集です。パーセント・年齢・D-Day 計算機から、給与・ローン・預金・退職金などの金融計算機、文字数・単位変換ツール、ミニゲーム、ロト番号ジェネレーター、四柱推命まで、よく使う機能を一つのページからすぐに利用できます。すべての計算はブラウザー内で行われ、入力内容がサーバーに送信されることはありません。",
    home_allTools: "すべてのカテゴリーを見る",
    cal_finance_title: "金融・生活の計算機",
    tools_calc_note: "給与・ローン・預金・退職金・BMI などの計算機は「計算機」カテゴリーでご利用いただけます。",

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
    tools_copy: "文字数カウント、単位変換、テキスト変換、写真の EXIF 解析など、日常に役立つユーティリティをまとめました。",

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
    lotto_intro: "1から45までの中から重複しない6個の番号をランダムに生成します。",
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

    saju_title: "四柱推命・運勢",
    saju_copy: "生年月日をもとに四柱推命の情報を確認します。",

    saju_meta_title: "無料四柱推命 | 四柱八字を確認",
    saju_meta_description: "生年月日と出生時間を入力して四柱推命の情報を確認できます。",

    saju_eyebrow: "無料オンライン四柱推命",
    saju_page_title: "無料四柱推命",
    saju_page_copy: "生年月日と出生時間を入力して四柱推命の情報を確認してください。",

    saju_input_title: "出生情報",
    saju_birth_date: "生年月日",
    saju_birth_time: "出生時間",
    saju_birth_time_unknown: "不明",
    saju_gender: "性別",
    saju_male: "男性",
    saju_female: "女性",
    saju_calculate: "四柱推命を見る",
    saju_input_required: "生年月日を入力してください。",

    saju_result_title: "四柱推命の結果",
    saju_result_placeholder: "情報を入力すると結果が表示されます。",
    saju_result_ready: "出生情報を確認しました。",
    saju_result_demo: "現在は入力と結果画面を準備しています。実際の四柱推命計算機能は次の段階で接続します。",

    saju_about_title: "四柱推命とは？",
    saju_about_copy: "四柱推命は、生まれた年・月・日・時間をもとに、伝統的な命理学の観点から性質や運勢を読み解く方法です。",

    saju_faq_title: "❓ よくある質問",
    saju_faq1: "出生時間が分からなくても確認できますか？",
    saju_faq1_answer: "確認できますが、出生時間は一部の計算に影響するため、結果が異なる場合があります。",
    saju_faq2: "四柱推命の結果は正確ですか？",
    saju_faq2_answer: "四柱推命は伝統的な解釈方法であり、未来を確定的に予測するものではありません。",
    saju_faq3: "入力した情報は保存されますか？",
    saju_faq3_answer: "入力情報を保存するかどうかはサービスの設定によって異なります。",

    stock_meta_title: "株式・ETF 積立投資リターン計算機 - 過去リターンのバックテスト",
    stock_meta_description: "過去のある時点から毎月一定額を株式や ETF に積立投資していたら、今いくらになっているかを計算します。SPY、QQQ、VOO など米国上場銘柄の過去リターンを無料でバックテストできます。",
    stock_eyebrow: "過去リターンのバックテスト",
    stock_title: "株式・ETF 積立投資リターン計算機",
    stock_copy: "過去のある時点から毎月一定額を株式や ETF に積立投資していたら、今いくらになっているかを計算します。",
    stock_form_ticker: "ティッカーシンボル",
    stock_form_ticker_hint: "米国上場の株式・ETF のティッカーを入力してください（例：SPY、QQQ、VOO、AAPL）。",
    stock_form_amount: "毎月の投資額（USD）",
    stock_form_amount_hint: "毎月同じ金額を買い付けると仮定します。金額は米ドル建てで、為替は反映しません。",
    stock_form_start: "積立開始月",
    stock_form_end: "積立終了月（任意）",
    stock_form_end_hint: "空欄の場合は直近の月まで計算します。過去データは最大で約 10 年分です。",
    stock_form_dividend: "配当の扱い",
    stock_form_dividend_on: "配当を再投資（調整後終値）",
    stock_form_dividend_off: "配当を除く（終値）",
    stock_calculate: "計算する",
    stock_copy_result: "結果をコピー",
    stock_reset: "リセット",
    stock_chart_value: "評価額",
    stock_chart_principal: "投資元本",
    stock_table_toggle: "月別の明細を表示",
    stock_th_month: "月",
    stock_th_price: "株価",
    stock_th_bought: "購入数量",
    stock_th_shares: "累計数量",
    stock_th_invested: "累計元本",
    stock_th_value: "評価額",
    stock_data_source: "価格データ：stockanalysis.com ・ 参考値であり、実際の投資結果とは異なる場合があります。",
    stock_about_title: "積立投資（ドルコスト平均法）とは？",
    stock_about_copy: "積立投資は、毎月決まった金額で同じ銘柄を継続的に買い付ける方法です。価格が安いときは多く、高いときは少なく買うため、平均取得単価が自然と分散されます。英語では DCA（Dollar Cost Averaging）と呼ばれます。",
    stock_about_copy2: "この計算機は、選択した開始月から毎月最初の取引日に入力金額分を買い付けたと仮定し、累計数量・現在の評価額・元本に対するリターン・年率（資金加重）リターンを計算します。",
    stock_disclaimer_title: "計算にあたっての注意",
    stock_disclaimer_copy: "売買手数料、税金、為替、スリッページは反映しません。「配当を再投資」は調整後終値を用いて、配当を同じ銘柄に再投資した場合を近似したものです。過去のリターンは将来の成果を保証するものではなく、本ツールは投資助言ではありません。",
    stock_faq_title: "❓ よくある質問",
    stock_faq1_q: "どの銘柄を照会できますか？",
    stock_faq1_a: "米国取引所に上場する株式と ETF をティッカーで照会できます。例えば SPY、QQQ、VOO、SCHD、AAPL などです。韓国取引所の銘柄には対応していません。",
    stock_faq2_q: "どのくらい過去まで計算できますか？",
    stock_faq2_a: "データの提供範囲により、おおむね直近 10 年程度です。それより前の開始月を選んだ場合は、データがある最も古い月から計算します。",
    stock_faq3_q: "配当はどう反映されますか？",
    stock_faq3_a: "「配当を再投資」を選ぶと、権利落ちを反映した調整後終値で計算し、配当を同じ銘柄に再投資した結果を近似します。「配当を除く」は単純な終値のみで計算します。",
    stock_faq4_q: "年率リターンはどう計算しますか？",
    stock_faq4_a: "毎月現金を投じる積立の特性を反映して資金加重リターン（内部収益率、IRR）を求め、年率に換算します。最終リターンを年数で割った値とは異なります。",
    stock_related_title: "🔗 関連ツール",
    stock_loading: "価格データを読み込んでいます...",
    stock_err_symbol: "そのティッカーの価格データが見つかりません。シンボルをご確認ください（米国上場銘柄のみ対応）。",
    stock_err_network: "価格データを読み込めませんでした。しばらくしてから再度お試しください（ネットワークまたはデータ提供元の問題）。",
    stock_err_range: "選択した期間に利用できる価格データがありません。開始月と終了月をご確認ください。",
    stock_err_input: "ティッカー、毎月の投資額、開始月を正しく入力してください。",
    stock_notice_clamped: "選択された開始月よりデータの開始が遅いため、{month} から計算しました。",
    stock_res_principal: "投資元本の合計",
    stock_res_value: "最終評価額",
    stock_res_profit: "総損益",
    stock_res_return: "累計リターン",
    stock_res_cagr: "年率リターン",
    stock_res_months: "買付回数",
    stock_res_shares: "累計数量",
    stock_res_avgprice: "平均取得単価",
    stock_months_unit: "回",
    stock_shares_unit: "株",
    stock_copied: "結果をコピーしました。",
    tool_stock_title: "株式・ETF 積立投資計算機",
    tool_stock_desc: "過去のある時点から毎月一定額を積立投資した場合のリターンを計算します。"
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

Object.keys(gameTranslations).forEach((lang) => Object.assign(legacyTranslations[lang], gameTranslations[lang]));

const gamePageTranslations = {
  ko: { sudoku_copy: '난이도를 선택하고 새로운 9x9 퍼즐을 완성하세요.', sudoku_difficulty: '난이도', sudoku_mistakes: '실수', sudoku_check: '정답 확인', sudoku_how: '게임 방법', sudoku_info: '빈 칸을 선택한 뒤 아래 숫자 버튼 또는 키보드 숫자를 입력하세요. 같은 숫자는 강조되고, 틀린 답은 표시됩니다.', typing_copy: '문장을 정확하게 입력하고 타자 속도를 확인하세요.', typing_language: '언어', typing_duration: '시간', typing_placeholder: '시작 후 여기에 입력하세요.', typing_how: '게임 방법', typing_info: '시작을 누른 뒤 표시된 문장을 입력하세요. 선택한 시간이 끝나면 실제 입력을 기준으로 속도와 정확도를 계산합니다.', block_copy: '블록을 쌓고 줄을 완성해 최고 점수에 도전하세요.', block_how: '게임 방법', block_info: '왼쪽/오른쪽 화살표로 이동하고 위쪽 화살표로 회전합니다. 아래쪽 화살표는 빠르게 내리고, 스페이스바는 즉시 떨어뜨립니다.' },
  en: { sudoku_copy: 'Choose a difficulty and complete a fresh 9x9 puzzle.', sudoku_difficulty: 'Difficulty', sudoku_mistakes: 'Mistakes', sudoku_check: 'Check answer', sudoku_how: 'How to play', sudoku_info: 'Select an empty cell, then use the number buttons or keyboard. Matching numbers are highlighted and incorrect entries are marked.', typing_copy: 'Type the sentence accurately and check your typing speed.', typing_language: 'Language', typing_duration: 'Duration', typing_placeholder: 'Type here after starting.', typing_how: 'How to play', typing_info: 'Press start and type the displayed sentence. At the end of your chosen time, speed and accuracy are calculated from your actual input.', block_copy: 'Stack blocks, clear lines, and aim for a high score.', block_how: 'How to play', block_info: 'Use left and right arrows to move, up to rotate, down to soft drop, and space to drop instantly.' },
  zh: { sudoku_copy: '选择难度并完成新的 9x9 谜题。', sudoku_difficulty: '难度', sudoku_mistakes: '失误', sudoku_check: '检查答案', sudoku_how: '游戏方法', sudoku_info: '选择空格后使用下方数字或键盘输入。相同数字会突出显示，错误输入会标记。', typing_copy: '准确输入句子并查看打字速度。', typing_language: '语言', typing_duration: '时间', typing_placeholder: '开始后在这里输入。', typing_how: '游戏方法', typing_info: '点击开始后输入显示的句子。时间结束时会根据实际输入计算速度和准确率。', block_copy: '堆叠方块、消除行并挑战最高分。', block_how: '游戏方法', block_info: '使用左右方向键移动，上方向键旋转，下方向键快速下落，空格键立即落下。' },
  ja: { sudoku_copy: '難易度を選んで新しい 9x9 パズルを完成させましょう。', sudoku_difficulty: '難易度', sudoku_mistakes: 'ミス', sudoku_check: '答えを確認', sudoku_how: '遊び方', sudoku_info: '空のマスを選び、下の数字またはキーボードで入力します。同じ数字は強調され、間違いは表示されます。', typing_copy: '文章を正確に入力してタイピング速度を確認しましょう。', typing_language: '言語', typing_duration: '時間', typing_placeholder: '開始後にここへ入力します。', typing_how: '遊び方', typing_info: '開始後に表示された文章を入力します。選択した時間が終わると、実際の入力から速度と正確さを計算します。', block_copy: 'ブロックを積み、ラインを消してハイスコアを目指しましょう。', block_how: '遊び方', block_info: '左右矢印で移動、上矢印で回転、下矢印で高速落下、スペースで即時落下します。' }
};

Object.keys(gamePageTranslations).forEach((lang) => Object.assign(legacyTranslations[lang], gamePageTranslations[lang]));

const shutterTranslations = {
  ko: { shutter_eyebrow: '브라우저에서 안전하게 분석', shutter_title: '카메라 셔터카운트 확인기', shutter_copy: '사진을 선택하면 EXIF 정보를 분석하여 카메라 모델과 확인 가능한 셔터카운트를 표시합니다.', shutter_upload: '사진 업로드', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: '사진 선택', shutter_ready: '사진은 이 기기에서만 분석되며 서버로 전송되지 않습니다.', shutter_reading: '사진 정보를 분석하는 중입니다...', shutter_complete: '분석이 완료되었습니다.', shutter_remove: '사진 제거', shutter_again: '다시 확인', shutter_share: '결과 공유', shutter_copyLink: '링크 복사', shutter_unknown: '확인할 수 없음', shutter_cameraInfo: '카메라 정보', shutter_count: '셔터카운트', shutter_confirmed: '🟢 사진 EXIF에서 확인된 값입니다.', shutter_missing: '🟡 카메라는 확인했지만 이 사진에 셔터카운트 정보가 없습니다.', shutter_missingShort: '셔터카운트: 확인할 수 없음', shutter_unsupported: '🔴 지원 제조사 여부를 확인할 수 없으며 셔터카운트 정보도 없습니다.', shutter_make: '제조사', shutter_model: '모델', shutter_date: '촬영일시', shutter_lens: '렌즈', shutter_speed: '셔터스피드', shutter_aperture: '조리개', shutter_focal: '초점거리', shutter_file: '파일 형식', shutter_size: '이미지 크기', shutter_noExif: '이 파일에서 읽을 수 있는 EXIF 정보를 찾지 못했습니다.', shutter_rafInvalid: 'RAF 파일 구조는 인식되었지만 내부 JPEG/EXIF 영역을 찾지 못했습니다.', shutter_error: 'EXIF 정보를 분석할 수 없습니다.', shutter_privacyTitle: '🔒 개인정보 보호', shutter_privacyCopy: '사진은 서버에 업로드되지 않습니다. 모든 파일 읽기와 EXIF 분석은 사용자의 브라우저에서만 처리됩니다.', shutter_aboutTitle: '셔터카운트와 EXIF', shutter_aboutCopy: '셔터카운트는 카메라가 촬영한 횟수를 나타내는 기록입니다. 일부 카메라는 이를 사진의 MakerNote에 저장하지만, 모든 파일과 모든 제조사에서 제공하는 것은 아닙니다. 이 도구는 파일에 명시적으로 저장된 값만 표시하며, 파일명이나 촬영일로 숫자를 추정하지 않습니다.', shutter_rawNote: 'RAW 파일은 카메라 및 브라우저에 따라 EXIF 정보를 읽지 못할 수 있습니다.', shutter_faqTitle: '자주 묻는 질문', shutter_faq1q: '셔터카운트란 무엇인가요?', shutter_faq1a: '카메라가 촬영한 횟수를 뜻하는 기록입니다.', shutter_faq2q: '사진만으로 항상 확인할 수 있나요?', shutter_faq2a: '아니요. 카메라와 파일에 따라 셔터카운트가 EXIF에 저장되지 않을 수 있습니다.', shutter_faq3q: '사진이 서버에 업로드되나요?', shutter_faq3a: '아니요. 이 페이지는 네트워크로 사진을 전송하지 않고 브라우저에서만 분석합니다.', shutter_related: '관련 도구', shutter_shareTitle: '카메라 셔터카운트 확인 결과' },
  en: { shutter_eyebrow: 'Safely analyzed in your browser', shutter_title: 'Camera Shutter Count Checker', shutter_copy: 'Select a photo to inspect EXIF data, camera details, and a shutter count when explicitly available.', shutter_upload: 'Upload a photo', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: 'Choose photo', shutter_ready: 'Your photo is analyzed only on this device and is never uploaded.', shutter_reading: 'Analyzing photo information...', shutter_complete: 'Analysis complete.', shutter_remove: 'Remove photo', shutter_again: 'Check another photo', shutter_share: 'Share result', shutter_copyLink: 'Copy link', shutter_unknown: 'Unavailable', shutter_cameraInfo: 'Camera information', shutter_count: 'Shutter count', shutter_confirmed: '🟢 Explicitly found in this photo EXIF data.', shutter_missing: '🟡 The camera was identified, but this photo has no shutter-count value.', shutter_missingShort: 'Shutter count: unavailable', shutter_unsupported: '🔴 No supported maker value or explicit shutter count was found.', shutter_make: 'Make', shutter_model: 'Model', shutter_date: 'Date taken', shutter_lens: 'Lens', shutter_speed: 'Shutter speed', shutter_aperture: 'Aperture', shutter_focal: 'Focal length', shutter_file: 'File type', shutter_size: 'Image size', shutter_noExif: 'No readable EXIF data was found in this file.', shutter_rafInvalid: 'The RAF container was recognized, but no embedded JPEG/EXIF section could be found.', shutter_error: 'EXIF data could not be analyzed.', shutter_privacyTitle: '🔒 Privacy', shutter_privacyCopy: 'Photos are not uploaded to a server. File reading and EXIF analysis happen only in your browser.', shutter_aboutTitle: 'Shutter Count and EXIF', shutter_aboutCopy: 'A shutter count records how many photos a camera has taken. Some cameras store it in a photo MakerNote, but not every camera or file includes it. This tool only displays values explicitly stored in the file and never estimates a number from filenames or dates.', shutter_rawNote: 'RAW EXIF data may not be readable depending on the camera and browser.', shutter_faqTitle: 'Frequently asked questions', shutter_faq1q: 'What is a shutter count?', shutter_faq1a: 'It is a record of how many photos a camera has taken.', shutter_faq2q: 'Can every photo reveal a shutter count?', shutter_faq2a: 'No. A camera or photo file may not store it in EXIF data.', shutter_faq3q: 'Is my photo uploaded?', shutter_faq3a: 'No. This page does not send photos over the network.', shutter_related: 'Related tools', shutter_shareTitle: 'Camera shutter count result' },
  zh: { shutter_eyebrow: '在浏览器中安全分析', shutter_title: '相机快门次数查询器', shutter_copy: '选择照片以分析 EXIF 信息、相机型号和可确认的快门次数。', shutter_upload: '上传照片', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: '选择照片', shutter_ready: '照片仅在此设备上分析，不会上传到服务器。', shutter_reading: '正在分析照片信息...', shutter_complete: '分析完成。', shutter_remove: '移除照片', shutter_again: '重新检查', shutter_share: '分享结果', shutter_copyLink: '复制链接', shutter_unknown: '无法确认', shutter_cameraInfo: '相机信息', shutter_count: '快门次数', shutter_confirmed: '🟢 已在照片 EXIF 中明确确认。', shutter_missing: '🟡 已识别相机，但此照片没有快门次数信息。', shutter_missingShort: '快门次数：无法确认', shutter_unsupported: '🔴 未找到受支持的厂商值或明确的快门次数。', shutter_make: '制造商', shutter_model: '型号', shutter_date: '拍摄时间', shutter_lens: '镜头', shutter_speed: '快门速度', shutter_aperture: '光圈', shutter_focal: '焦距', shutter_file: '文件格式', shutter_size: '图像尺寸', shutter_noExif: '此文件中没有可读取的 EXIF 信息。', shutter_rafInvalid: '已识别出 RAF 容器，但未找到内嵌的 JPEG/EXIF 区域。', shutter_error: '无法分析 EXIF 信息。', shutter_privacyTitle: '🔒 隐私保护', shutter_privacyCopy: '照片不会上传到服务器。文件读取和 EXIF 分析仅在浏览器中进行。', shutter_aboutTitle: '快门次数与 EXIF', shutter_aboutCopy: '快门次数表示相机拍摄的次数。部分相机将其保存到照片的 MakerNote 中，但并非所有相机或文件都有该信息。本工具只显示文件中明确保存的值，不会根据文件名或日期进行推测。', shutter_rawNote: 'RAW 文件的 EXIF 信息可能因相机和浏览器而无法读取。', shutter_faqTitle: '常见问题', shutter_faq1q: '什么是快门次数？', shutter_faq1a: '它是相机拍摄次数的记录。', shutter_faq2q: '每张照片都能查询快门次数吗？', shutter_faq2a: '不能。相机或照片文件可能未在 EXIF 中保存该信息。', shutter_faq3q: '照片会被上传吗？', shutter_faq3a: '不会。本页面不会通过网络发送照片。', shutter_related: '相关工具', shutter_shareTitle: '相机快门次数查询结果' },
  ja: { shutter_eyebrow: 'ブラウザー内で安全に解析', shutter_title: 'カメラシャッター回数チェッカー', shutter_copy: '写真を選択すると、EXIF 情報、カメラモデル、確認できるシャッター回数を表示します。', shutter_upload: '写真をアップロード', shutter_formats: 'JPG / JPEG / TIFF / RAW', shutter_choose: '写真を選択', shutter_ready: '写真はこの端末内でのみ解析され、サーバーにはアップロードされません。', shutter_reading: '写真情報を解析しています...', shutter_complete: '解析が完了しました。', shutter_remove: '写真を削除', shutter_again: 'もう一度確認', shutter_share: '結果を共有', shutter_copyLink: 'リンクをコピー', shutter_unknown: '確認できません', shutter_cameraInfo: 'カメラ情報', shutter_count: 'シャッター回数', shutter_confirmed: '🟢 写真の EXIF から明確に確認された値です。', shutter_missing: '🟡 カメラは確認できましたが、この写真にはシャッター回数情報がありません。', shutter_missingShort: 'シャッター回数：確認できません', shutter_unsupported: '🔴 対応するメーカー値または明確なシャッター回数が見つかりませんでした。', shutter_make: 'メーカー', shutter_model: 'モデル', shutter_date: '撮影日時', shutter_lens: 'レンズ', shutter_speed: 'シャッター速度', shutter_aperture: '絞り', shutter_focal: '焦点距離', shutter_file: 'ファイル形式', shutter_size: '画像サイズ', shutter_noExif: 'このファイルには読み取れる EXIF 情報がありません。', shutter_rafInvalid: 'RAF コンテナは認識されましたが、内部の JPEG/EXIF 領域が見つかりませんでした。', shutter_error: 'EXIF 情報を解析できません。', shutter_privacyTitle: '🔒 プライバシー', shutter_privacyCopy: '写真はサーバーにアップロードされません。ファイル読み取りと EXIF 解析はブラウザー内でのみ行われます。', shutter_aboutTitle: 'シャッター回数と EXIF', shutter_aboutCopy: 'シャッター回数はカメラの撮影回数を示す記録です。一部のカメラは写真の MakerNote に保存しますが、すべてのカメラやファイルに含まれるわけではありません。このツールはファイルに明示的に保存された値のみを表示し、ファイル名や日付から推測しません。', shutter_rawNote: 'RAW ファイルの EXIF はカメラやブラウザーによって読み取れない場合があります。', shutter_faqTitle: 'よくある質問', shutter_faq1q: 'シャッター回数とは何ですか？', shutter_faq1a: 'カメラが撮影した回数の記録です。', shutter_faq2q: 'すべての写真から確認できますか？', shutter_faq2a: 'いいえ。カメラや写真ファイルに EXIF として保存されていないことがあります。', shutter_faq3q: '写真はアップロードされますか？', shutter_faq3a: 'いいえ。このページはネットワークで写真を送信しません。', shutter_related: '関連ツール', shutter_shareTitle: 'カメラシャッター回数確認結果' }
};

Object.keys(shutterTranslations).forEach((lang) => Object.assign(legacyTranslations[lang], shutterTranslations[lang]));

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
    ko: { title: '퍼센트 계산기 - 할인, 증감 비율 계산 | 무료 온라인 도구', h1: '퍼센트 계산기', copy: 'A의 B%, A는 B의 몇%, 증감 비율을 쉽고 빠르게 계산하세요.', tabOf: 'A의 B%', tabIs: 'A는 B의 몇%', increase: '증가 비율', decrease: '감소 비율', base: 'A (기준값)', percent: 'B (%)', value: 'A (값)', previous: '이전 값', current: '현재 값', calculate: '계산하기', copyButton: '복사', reset: '초기화', faq: '❓ 자주 묻는 질문', faq1: '1000의 15%는 얼마인가요?', faq1a: '첫 번째 탭 "A의 B%"에서 A에 1000, B에 15를 입력하면 150이라는 답을 얻을 수 있습니다.', faq2: '할인가를 계산하려면?', faq2a: '10,000원에서 20% 할인받으면 "A의 B%"에서 10000의 80%를 계산하면 됩니다. 원래 가격의 80%가 할인가입니다.', faq3: '증감 비율을 어떻게 계산하나요?', faq3a: '"증가 비율" 탭에서 이전 값과 현재 값을 입력하면 증가율을 계산할 수 있습니다.', related: '🔗 관련 도구', vat: '부가세 계산기', vatDesc: '공급가액과 부가세 계산', salary: '연봉 계산기', salaryDesc: '연봉에서 세후 급여 계산' },
    en: { title: 'Percentage Calculator - Discount and Change Rate', h1: 'Percentage Calculator', copy: 'Quickly calculate B% of A, what percentage A is of B, and the rate of change.', tabOf: 'B% of A', tabIs: 'What percent is A of B?', increase: 'Increase rate', decrease: 'Decrease rate', base: 'A (base value)', percent: 'B (%)', value: 'A (value)', previous: 'Previous value', current: 'Current value', calculate: 'Calculate', copyButton: 'Copy', reset: 'Reset', faq: '❓ Frequently asked questions', faq1: 'What is 15% of 1000?', faq1a: 'Enter 1000 for A and 15 for B in the "B% of A" tab to get 150.', faq2: 'How do I calculate a discount price?', faq2a: 'For a 20% discount on 10,000 won, calculate 80% of 10,000 in the "B% of A" tab.', faq3: 'How do I calculate a change rate?', faq3a: 'Enter the previous and current values in the "Increase rate" tab to calculate the increase percentage.', related: '🔗 Related tools', vat: 'VAT Calculator', vatDesc: 'Calculate supply price and VAT', salary: 'Salary Calculator', salaryDesc: 'Calculate take-home pay from salary' },
    zh: { title: '百分比计算器 - 折扣与增减比例计算', h1: '百分比计算器', copy: '快速计算 A 的 B%、A 是 B 的百分之多少以及增减比例。', tabOf: 'A 的 B%', tabIs: 'A 是 B 的百分之多少', increase: '增加比例', decrease: '减少比例', base: 'A（基准值）', percent: 'B（%）', value: 'A（数值）', previous: '之前的值', current: '当前值', calculate: '计算', copyButton: '复制', reset: '重置', faq: '❓ 常见问题', faq1: '1000 的 15% 是多少？', faq1a: '在“A 的 B%”标签中输入 A=1000、B=15，即可得到 150。', faq2: '如何计算折后价格？', faq2a: '例如 10000 打八折，在“A 的 B%”标签中计算 10000 的 80% 即可。', faq3: '如何计算增减比例？', faq3a: '在“增加比例”标签中输入之前的值和当前值即可计算增加百分比。', related: '🔗 相关工具', vat: '增值税计算器', vatDesc: '计算供货价和增值税', salary: '薪资计算器', salaryDesc: '根据年薪计算税后工资' },
    ja: { title: 'パーセント計算機 - 割引と増減率を計算', h1: 'パーセント計算機', copy: 'AのB%、AはBの何%か、増減率を簡単に計算します。', tabOf: 'AのB%', tabIs: 'AはBの何%', increase: '増加率', decrease: '減少率', base: 'A（基準値）', percent: 'B（%）', value: 'A（値）', previous: '以前の値', current: '現在の値', calculate: '計算する', copyButton: 'コピー', reset: 'リセット', faq: '❓ よくある質問', faq1: '1000の15%はいくつですか？', faq1a: '「AのB%」タブでAに1000、Bに15を入力すると150になります。', faq2: '割引価格を計算するには？', faq2a: '10,000円を20%割引する場合、「AのB%」で10,000の80%を計算します。', faq3: '増減率を計算するには？', faq3a: '「増加率」タブで以前の値と現在の値を入力すると増加率を計算できます。', related: '🔗 関連ツール', vat: '付加価値税計算機', vatDesc: '供給価額と税額を計算', salary: '年俸計算機', salaryDesc: '年俸から手取り給与を計算' }
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

const translations = {};

function pickTranslationKeys(source, keys) {
  return keys.reduce((group, key) => {
    if (source[key] !== undefined) group[key] = source[key];
    return group;
  }, {});
}

function buildTranslationCatalog(lang) {
  const source = legacyTranslations[lang];
  const gameCommon = pickTranslationKeys(source, [
    'nav_games', 'filter_game', 'cat_games', 'game_start', 'game_new', 'game_restart', 'game_result',
    'game_best', 'game_share', 'game_copyLink', 'game_other', 'game_linkCopied', 'game_copyManual',
    'game_time', 'game_score', 'game_level', 'game_lines', 'game_easy', 'game_medium', 'game_hard',
    'game_complete', 'game_gameOver', 'game_reaction_title', 'game_reaction_desc', 'game_sudoku_title',
    'game_sudoku_desc', 'game_typing_title', 'game_typing_desc', 'game_block_title', 'game_block_desc',
    'sudoku_copy', 'sudoku_difficulty', 'sudoku_mistakes', 'sudoku_check', 'sudoku_how', 'sudoku_info',
    'typing_copy', 'typing_language', 'typing_duration', 'typing_placeholder', 'typing_how', 'typing_info',
    'block_copy', 'block_how', 'block_info'
  ]);
  const games = {
    common: gameCommon,
    reaction: { title: source.game_reaction_title, desc: source.game_reaction_desc },
    sudoku: { title: source.game_sudoku_title, desc: source.game_sudoku_desc, copy: source.sudoku_copy },
    typing: { title: source.game_typing_title, desc: source.game_typing_desc, copy: source.typing_copy },
    blockPuzzle: { title: source.game_block_title, desc: source.game_block_desc, copy: source.block_copy }
  };
  const cal = {
    age: subpageTranslations.age[lang],
    dday: subpageTranslations.dday[lang],
    discharge: subpageTranslations.discharge[lang],
    percent: Object.assign({}, subpageTranslations.percent[lang], {
      sub_percent_copy: subpageTranslations.percent[lang].copy,
      sub_percent_tabOf: subpageTranslations.percent[lang].tabOf,
      sub_percent_tabIs: subpageTranslations.percent[lang].tabIs,
      sub_percent_increase: subpageTranslations.percent[lang].increase,
      sub_percent_decrease: subpageTranslations.percent[lang].decrease,
      sub_percent_base: subpageTranslations.percent[lang].base,
      sub_percent_percent: subpageTranslations.percent[lang].percent,
      sub_percent_value: subpageTranslations.percent[lang].value,
      sub_percent_previous: subpageTranslations.percent[lang].previous,
      sub_percent_current: subpageTranslations.percent[lang].current,
      sub_percent_faq1: subpageTranslations.percent[lang].faq1,
      sub_percent_faq1a: subpageTranslations.percent[lang].faq1a,
      sub_percent_faq2: subpageTranslations.percent[lang].faq2,
      sub_percent_faq2a: subpageTranslations.percent[lang].faq2a,
      sub_percent_faq3: subpageTranslations.percent[lang].faq3,
      sub_percent_faq3a: subpageTranslations.percent[lang].faq3a,
      sub_percent_vat: subpageTranslations.percent[lang].vat,
      sub_percent_vatDesc: subpageTranslations.percent[lang].vatDesc,
      sub_percent_salary: subpageTranslations.percent[lang].salary,
      sub_percent_salaryDesc: subpageTranslations.percent[lang].salaryDesc
    })
  };
  const tools = {
    bmi: subpageTranslations.bmi[lang],
    charcount: subpageTranslations.charcount[lang],
    loan: subpageTranslations.loan[lang],
    retirement: subpageTranslations.retirement[lang],
    salary: subpageTranslations.salary[lang],
    savings: subpageTranslations.savings[lang],
    shutterCount: shutterTranslations[lang],
    textconv: subpageTranslations.textconv[lang],
    unit: subpageTranslations.unit[lang],
    vat: subpageTranslations.vat[lang]
  };
  return {
    common: pickTranslationKeys(source, [
      'language', 'darkMode', 'lightMode', 'meta_title', 'meta_description', 'og_title', 'og_description',
      'filter_all', 'filter_calculator', 'filter_converter', 'filter_generator', 'filter_game', 'cat_calculator',
      'cat_converter', 'cat_finance', 'cat_generator', 'cat_popular', 'cat_faq', 'faq_q1', 'faq_a1',
      'faq_q2', 'faq_a2', 'faq_q3', 'faq_a3', 'faq_q4', 'faq_a4'
    ]),
    nav: {
      home: source.nav_home,
      calculator: source.nav_calculator,
      saju: source.nav_saju,
      lotto: source.nav_lotto,
      tools: source.nav_tools,
      games: source.nav_games,
      blog: source.nav_blog,
      faq: source.nav_faq,
      contact: source.nav_contact
    },
    footer: {
      toolsTitle: source.footer_toolsTitle,
      infoTitle: source.footer_infoTitle,
      socialTitle: source.footer_socialTitle,
      calculatorLink: source.footer_calculatorLink,
      lottoLink: source.footer_lottoLink,
      toolsLink: source.footer_toolsLink,
      gamesLink: source.footer_gamesLink,
      sajuLink: source.footer_sajuLink,
      home: source.footer_home,
      blog: source.footer_blog,
      faq: source.footer_faq,
      contact: source.footer_contact
    },
    cal: cal,
    games: games,
    lotto: {
      meta: pickTranslationKeys(source, ['lotto_meta_title', 'lotto_meta_description']),
      eyebrow: source.lotto_eyebrow,
      title: source.lotto_title,
      copy: source.lotto_copy,
      intro: source.lotto_intro,
      fixedLabel: source.lotto_fixedLabel,
      slot1: source.lotto_slot1, slot2: source.lotto_slot2, slot3: source.lotto_slot3,
      slot4: source.lotto_slot4, slot5: source.lotto_slot5, slot6: source.lotto_slot6,
      generateOne: source.lotto_generateOne, generateFive: source.lotto_generateFive, reset: source.lotto_reset,
      toolTitle: source.tool_lotto_title, toolDesc: source.tool_lotto_desc
    },
    tools: Object.assign(tools, pickTranslationKeys(source, ['tools_meta_title', 'tools_meta_description', 'tools_eyebrow', 'tools_title', 'tools_copy', 'tool_charcount_title', 'tool_charcount_desc', 'tool_unit_title', 'tool_unit_desc', 'tool_textconv_title', 'tool_textconv_desc', 'tool_shutter_count_title', 'tool_shutter_count_desc', 'tool_bmi_title', 'tool_bmi_desc', 'tool_salary_title', 'tool_salary_desc', 'tool_vat_title', 'tool_vat_desc', 'tool_loan_title', 'tool_loan_desc', 'tool_savings_title', 'tool_savings_desc', 'tool_retirement_title', 'tool_retirement_desc'])),
    blog: {
      nav: source.nav_blog,
      meta: { title: source.blog_meta_title, description: source.blog_meta_description },
      eyebrow: source.blog_eyebrow, title: source.blog_title, copy: source.blog_copy, read: source.blog_read,
      post: { title: source.blog_post_title, summary: source.blog_post_summary, date: source.blog_post_date, category: source.blog_post_category, heading: source.blog_post_heading, body: source.blog_post_body },
      related: source.blog_related, back: source.blog_back
    },
    saju: {
      meta_title: source.saju_meta_title,
      meta_description: source.saju_meta_description,
      eyebrow: source.saju_eyebrow,
      title: source.saju_page_title,
      copy: source.saju_page_copy,
      input_title: source.saju_input_title,
      birth_date: source.saju_birth_date,
      birth_time: source.saju_birth_time,
      birth_time_unknown: source.saju_birth_time_unknown,
      gender: source.saju_gender,
      male: source.saju_male,
      female: source.saju_female,
      calculate: source.saju_calculate,
      result_title: source.saju_result_title,
      result_placeholder: source.saju_result_placeholder,
      about_title: source.saju_about_title,
      about_copy: source.saju_about_copy,
      faq_title: source.saju_faq_title,
      faq1: source.saju_faq1,
      faq1_answer: source.saju_faq1_answer,
      faq2: source.saju_faq2,
      faq2_answer: source.saju_faq2_answer,
      faq3: source.saju_faq3,
      faq3_answer: source.saju_faq3_answer
    },
  };
}

SUPPORTED_LANGUAGES.forEach((lang) => {
  translations[lang] = buildTranslationCatalog(lang);
  Object.assign(translations[lang], legacyTranslations[lang]);
});

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
      faq1: 'faq1', faq1a: 'faq1a', faq2: 'faq2', faq2a: 'faq2a', faq3: 'faq3', faq3a: 'faq3a', vat: 'vat', vatDesc: 'vatDesc', salary: 'salary', salaryDesc: 'salaryDesc'
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

function findGroupedTranslation(group, key) {
  if (!group || typeof group !== 'object') return undefined;
  if (key.includes('.')) {
    const value = key.split('.').reduce((current, segment) => {
      return current && typeof current === 'object' ? current[segment] : undefined;
    }, group);
    if (value !== undefined) return value;
  }
  if (Object.prototype.hasOwnProperty.call(group, key)) return group[key];
  for (const child of Object.values(group)) {
    const value = findGroupedTranslation(child, key);
    if (value !== undefined) return value;
  }
  return undefined;
}

function translate(key, lang) {
  const grouped = findGroupedTranslation(translations[lang], key);
  if (grouped !== undefined) return grouped;
  const fallbackGrouped = findGroupedTranslation(translations[DEFAULT_LANGUAGE], key);
  return fallbackGrouped !== undefined ? fallbackGrouped : key;
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
