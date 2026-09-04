# 리디자인 적용 가이드

저장소 `is-an/is-an.github.io` 에 그대로 복사해서 커밋할 수 있는 파일 모음입니다.
이 폴더의 경로 = 저장소 루트 기준 경로입니다.

포함 화면: **헤더 · 푸터 · 홈 · D-Day 계산기 · 사주 · 반응속도 테스트**

---

## 새로 추가되는 파일

### CSS
| 파일 | 설명 |
| --- | --- |
| `assets/css/v2-tokens.css` | 리디자인 공통 디자인 토큰(`--v2-*`) + `body.v2-page` 바탕 |
| `assets/css/chrome.css` | 헤더 / 푸터 / 모바일 메뉴 / 광고 슬롯 |
| `assets/css/home.css` | 홈 전용 레이아웃 |
| `assets/css/tool.css` | 상세 페이지 공통(브레드크럼·폼·결과·사이드바) |
| `assets/css/saju.css` | 사주 전용(먹색 결과 패널·사주팔자·오행) |
| `assets/css/game.css` | 게임 전용(플레이 패드·기록) |

### JS
| 파일 | 설명 |
| --- | --- |
| `assets/js/tools-data.js` | **도구 목록 단일 관리 지점.** 도구 추가 = 배열에 한 줄 |
| `assets/js/home.js` | 홈 렌더링 / 검색 / 즐겨찾기 / 최근 사용 |
| `assets/js/header-nav.js` | 모바일 메뉴 토글 + 헤더 검색 링크 (모든 페이지) |
| `assets/js/tool-sidebar.js` | 상세 페이지 사이드바(관련 도구·가이드) 렌더 |
| `assets/js/dday.js` | D-Day 계산 |
| `assets/js/saju-view.js` | 사주팔자 계산 + 결과 렌더 |
| `assets/js/reaction.js` | 반응속도 게임 |

### HTML
| 파일 | 설명 |
| --- | --- |
| `index.html` | 홈 |
| `cal/dday/index.html` | D-Day 계산기 |
| `saju/index.html` | 사주·운세 |
| `games/reaction/index.html` | 반응속도 테스트 |
| `components/header.html` | 헤더 |
| `components/footer.html` | 푸터 |

### 참고 문서
| 파일 | 설명 |
| --- | --- |
| `assets/js/i18n-home-additions.js` | en/zh/ja 번역 스니펫. **로드하지 않습니다** — 복사용 |

---

## 수정되는 파일

| 파일 | 변경 내용 |
| --- | --- |
| `assets/js/i18n.js` | 끝부분 `homeIndexTranslations.ko` 블록 추가 (한국어만) |
| `assets/i18n/en.js` / `zh.js` / `ja.js` | `i18n-home-additions.js` 의 해당 블록 키를 추가 |

---

## 건드리지 않은 것

- 각 페이지 `<head>`: title, meta description, keywords, canonical, Open Graph, JSON-LD, verification, manifest, theme-color, **AdSense 스크립트**
- URL·디렉터리 구조, `robots.txt`, `sitemap.xml`, `ads.txt`
- `components/ads.html` (광고 코드 원본 그대로)
- `assets/css/style.css`, `assets/js/common.js` — **한 줄도 수정 없음**
- `#site-header` / `#ads-slot` / `#site-footer` 자리
- 스크립트 로드 순서: i18n → common → 페이지 스크립트

### 헤더에서 반드시 유지해야 하는 것 (common.js / i18n.js 가 참조)

`.site-header` `.logo` `.logo-img` `.nav-link[data-route]` `#themeToggle`
`.theme-toggle-icon` `#langToggle` `#langCurrent` `#langDropdown` `li[data-lang]`

리디자인 헤더는 이 이름을 모두 유지하고 `v2-*` 클래스를 함께 붙여 스타일만 덮어씁니다.
로고 `src`·`href`, 내비 링크 `href`, `.active` 표시는 계속 `common.js` 의
`applyHeaderLinks()` 가 채웁니다.

---

## 확인한 충돌 지점

- `common.js` 의 `initToolsFilter()` 는 `.tool-card` 가 있을 때만 동작합니다. 새 홈은 `.v2-*` 클래스를 쓰므로 함수가 즉시 반환되고, 검색은 `home.js` 가 단독으로 처리합니다.
- `home.css` 는 모든 규칙이 `body.home-v2` 아래, `tool.css` / `saju.css` / `game.css` 는 `body.v2-page` 아래로 한정되어 아직 리디자인하지 않은 페이지에 영향이 없습니다.
- `chrome.css` 는 헤더·푸터를 전역으로 덮어씁니다. **모든 페이지에 즉시 적용되므로**, 아직 손대지 않은 페이지도 새 헤더/푸터로 보입니다(의도된 동작).
- 다크모드는 기존 `data-theme` + `localStorage('theme')` 방식을 그대로 사용하고, `#themeToggle` 이 계속 담당합니다.

---

## 도구를 추가할 때

`assets/js/tools-data.js` 의 `TOOLS` 배열에 한 줄 추가하면 됩니다.

```js
{ id: 'newtool', cat: 'tools', name: '새 도구', key: null, href: '/tools/newtool/',
  desc: '한 줄 설명.', descKey: null, short: '짧은 라벨', keywords: '검색 보조어' },
```

카테고리 개수, 전체 개수, 검색 색인, 인기 순위, 상세 페이지의 관련 도구 목록이 모두 자동 계산됩니다. 화면 어디에도 개수를 하드코딩하지 않았습니다.

4개 언어 번역이 필요하면 i18n에 키를 추가하고 `key` / `descKey` 에 그 키를 적으면 됩니다. 비워 두면 한국어 문구가 그대로 출력됩니다.

---

## 계산 로직 교체

프로토타입의 계산은 표준 규칙으로 새로 구현한 것입니다. 저장소에 이미 검증된 로직이 있으면 아래만 갈아끼우고 결과 렌더는 그대로 쓰면 됩니다.

| 파일 | 교체 지점 |
| --- | --- |
| `assets/js/dday.js` | `calculate()` 내부의 날짜 차이 계산 |
| `assets/js/saju-view.js` | `buildSaju()` — 반환 형식(천간/지지 인덱스)만 맞추면 됩니다 |
| `assets/js/reaction.js` | 없음 (게임 로직 자체가 이 파일에 있음) |

`reaction.js` 의 공유 버튼은 기존 `assets/js/share.js` 의 `shareGameResult()` / `copyGameLink()` 가 로드되어 있으면 그 함수를 우선 사용하고, 없으면 자체 폴백으로 동작합니다.

---

## 로컬 확인

```bash
npm start   # python -m http.server 8000
```

`http://localhost:8000` 에서 확인하세요. (`file://` 은 헤더/푸터 fetch 가 실패합니다.)

체크 항목

- 라이트 / 다크 모드 전환
- 홈: 검색·빈 상태·즐겨찾기 별표·최근 사용 기록
- D-Day: 프리셋 4개, D-N / D-Day / D+N, 결과 복사·링크 공유
- 사주: 출생시간 '모름' 선택 시 시주가 `—` 로 비고 오행에서 제외
- 게임: 대기 중 클릭 = 무효, 5회 평균 모드 연속 진행, 최고 기록 저장
- 모바일 375px: 헤더 ☰ 메뉴, 사이드바가 본문 아래로 접힘
- 4개 언어 전환 후 문구 누락 없음
- 콘솔 에러 없음

---

## 참고

`assets/css/style.css`, `assets/js/common.js`, `components/ads.html`, `logo.png`,
`green-circle-logo.svg` 는 비교·미리보기용으로 저장소 원본을 그대로 복사해 둔 것입니다.
`i18n.js` 만 위 블록이 추가되어 있고, 나머지는 원본과 동일하므로 덮어쓸 필요가 없습니다.
