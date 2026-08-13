# 무료 온라인 도구 모음

GitHub Pages + AdSense를 활용한 미니 프로젝트 포트폴리오입니다.

## ⚡ 주요 기능

- **로또번호 생성기** - 무료 로또번호 생성, 로또번호 추천, 로또번호 만들기 기능
- **D-Day 계산기** - 목표 날짜까지 남은 날 계산
- **Google AdSense 적용** - 광고 수익 창출
- **PWA 지원** - 모바일 앱처럼 설치 가능

## 📂 프로젝트 구조

```
/
├── index.html              # 메인 페이지
├── manifest.json           # PWA 설정
├── config.yml              # GitHub Pages 설정
├── package.json            # npm 프로젝트 설정
├── ads.txt                 # Google AdSense 인증
├── robots.txt              # 검색 엔진 크롤러 지시
├── sitemap.xml             # 사이트맵
├── .gitignore              # Git 무시 파일
├── .nojekyll               # Jekyll 빌드 비활성화
├── .well-known/
│   └── security.txt        # 보안 정책
├── assets/
│   ├── style.css           # 스타일시트
│   └── app.js              # JavaScript 기능
└── README.md               # 이 파일
```

## 🚀 빠른 시작 (GitHub Pages 배포)

1. GitHub에서 새 Repository를 생성합니다.
2. 이 폴더의 파일을 Repository에 업로드합니다.
3. Repository의 **Settings → Pages**로 이동합니다.
4. **Deploy from a branch**를 선택합니다.
5. Branch는 `main`, 폴더는 `/ (root)`를 선택합니다.
6. Save를 누르면 잠시 후 GitHub Pages 주소가 생성됩니다.


## 📱 PWA (Progressive Web App) 설정

**지원 기능:**
- ✅ 모바일 홈 화면에 앱 설치
- ✅ 오프라인 기본 지원
- ✅ 풀스크린 모드
- ✅ 스플래시 화면

**설정 파일:** `manifest.json`
- 앱 이름, 아이콘
- 시작 URL, 디스플레이 모드
- 테마색, 배경색

---

## 🔧 로컬 테스트

**Python 웹 서버로 테스트:**
```bash
python -m http.server 8000
# http://localhost:8000 방문
```

**npm으로 테스트:**
```bash
npm run start
```

---

## 📊 SEO 최적화 (검색 엔진 노출)

### ✅ 이미 적용된 사항

#### 1. 메타 태그 최적화
- `<title>` 태그 - 로또번호 생성기 중심의 제목
- `<meta name="description">` - 검색 결과에 표시되는 설명문
- `<meta name="keywords">` - 주요 검색어 (로또번호 생성기, 로또번호 추천, 로또번호 만들기 등)
- Open Graph 메타 태그 - SNS 공유 시 미리보기

#### 2. 구조화된 데이터 (JSON-LD)
- Schema.org WebApplication 스키마 적용
- 검색 엔진이 사이트를 더 잘 이해할 수 있음

#### 3. 검색 엔진 크롤러 설정
- `sitemap.xml` - 사이트 구조를 검색 엔진에 알림
- `robots.txt` - 크롤러 지시사항 제공

#### 4. 콘텐츠 최적화
- 로또번호 관련 키워드 자연스럽게 포함
- 제목(H1, H2, H3)에 주요 키워드 배치
- 이미지 ALT 텍스트 (미래 추가)

### 📋 Google Search Console에 등록

1. [Google Search Console](https://search.google.com/search-console) 방문
2. "속성 추가" → "URL 접두사" 선택
3. 배포된 사이트 URL 입력 (예: https://is-an.github.io/)
4. HTML 파일 업로드 또는 메타 태그로 소유권 확인
5. 사이트맵 제출: `sitemap.xml` 업로드

### 📋 Naver 서치어드바이저에 등록

1. [Naver 서치어드바이저](https://searchadvisor.naver.com/) 방문
2. "웹마스터 도구" → "사이트 등록" 선택
3. 사이트 URL 입력
4. 소유권 확인 (메타 태그 또는 HTML 파일)
5. 사이트맵 제출

### 🎯 로또 관련 검색어 노출 방법

이미 메타 데이터와 콘텐츠에 포함된 키워드:
- 로또번호 생성기 ⭐
- 로또번호 추천 ⭐
- 로또번호 생성 ⭐
- 로또번호 만들기 ⭐
- 로또번호
- 무료 로또
- 행운의 로또번호
- 로또번호 조합
- 로또번호 추천 서비스

### 💡 추가 최적화 방법

1. **페이지 속도 개선**
   - CSS/JS 최소화
   - 이미지 최적화
   - Google PageSpeed Insights에서 점수 확인

2. **모바일 최적화** ✅
   - 반응형 디자인 적용됨
   - 모바일 친화성 테스트 통과 필수

3. **백링크 구축**
   - 다른 사이트에서 링크받기
   - 로또 관련 커뮤니티 공유
   - 블로그/SNS 홍보

4. **정기적인 콘텐츠 업데이트**
   - 블로그 포스트 추가
   - FAQ 섹션 확장
   - 사용자 경험 개선

5. **소셜 시그널**
   - 트위터, 페이스북 공유
   - 카카오스토리 공유

### 📊 검색 순위 모니터링

1. Google Search Console
   - 검색 성과 → 클릭수, 노출 수, CTR, 평균 순위 확인

2. [Google Analytics](https://analytics.google.com/)
   - 트래픽 분석
   - 사용자 행동 분석

3. SEO 도구
   - [SEMrush](https://www.semrush.com/)
   - [Ahrefs](https://ahrefs.com/)
   - [Ubersuggest](https://ubersuggest.com/)

## 다음 확장

- `/cal/age/` 나이 계산기
- `/cal/percent/` 퍼센트 계산기
- `/cal/discount/` 할인율 계산기
- `/cal/vat/` 부가세 계산기
- `/tools/receipt/` 증빙자료 생성기
- 공통 헤더/푸터 및 관련 도구 링크
- Google Ads 적용
- AdSense 적용
