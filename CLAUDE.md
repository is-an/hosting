# CLAUDE.md

## Project

`is-an.github.io` is a static, dependency-free Korean utility website.

Purpose: free utilities, calculators, generators, games, lotto, saju, SEO traffic, and AdSense.

### Stack

* HTML
* CSS
* Vanilla JavaScript
* GitHub Pages

No frameworks, TypeScript, npm packages, bundlers, modules, or build steps unless explicitly requested.

---

## Commands

```bash
npm start
```

Runs:

```bash
python -m http.server 8000
```

Use HTTP, not `file://`. Shared components use `fetch()`.

`npm run build` and `npm test` are placeholders.

Deployment:

```text
push main
→ .github/workflows/static.yml
→ GitHub Pages
```

`.nojekyll` disables Jekyll. Do not rely on Jekyll or `config.yml`.

---

# Architecture

## Shared components

Pages use:

```html
<div id="site-header"></div>
<div id="ads-slot"></div>
<div id="site-footer"></div>
```

`assets/js/common.js` loads:

```text
components/header.html
components/ads.html
components/footer.html
```

Component paths are derived from the `common.js` script path.

Do not hardcode component paths unnecessarily.

## Header

Header navigation uses `data-route`.

Routes:

```text
assets/js/common.js
→ routeMap
```

Adding a top-level section requires updating `routeMap`.

Header:

```css
#site-header { position: sticky; }
```

---

# CSS

## Load order

```text
style.css
→ v2.css
→ page CSS
```

## File responsibility

```text
assets/css/style.css
→ legacy/global styles

assets/css/v2.css
→ v2 design system + shared v2 components

home.css
→ home only

saju.css
→ saju only

game.css
→ game only
```

### Legacy

`style.css` contains legacy tokens, base, layout, components, and page styles.

Legacy tokens include:

```text
--text
--bg
--accent
...
```

### v2

`v2.css` contains:

* `--v2-*` tokens
* `body.v2-page`
* v2 header/footer/ads layout
* `.v2-*` components
* search popup
* responsive layout

v2 theme tokens are defined under:

```css
:root
[data-theme="dark"]
```

### Page CSS

Page-specific CSS must be scoped:

```text
body.home-v2
body.v2-page
```

Do not place page-specific styles in `v2.css`.

## CSS decision rule

```text
Global/shared v2
→ v2.css

Legacy/shared
→ style.css

One page only
→ page CSS
```

New/redesigned pages use v2:

```text
--v2-*
.v2-*
```

Avoid legacy patterns such as:

```text
.tool-card
.primary-btn
```

unless maintaining an existing legacy page.

## CSS rules

* Reuse existing variables/components.
* Do not duplicate tokens or components.
* Do not use `!important`.
* Prefer classes over IDs.
* Avoid unnecessarily deep selectors.
* Keep page styles scoped.
* Do not create independent theme systems.
* Do not rewrite unrelated CSS.
* Do not change existing class names unnecessarily.
* Remove CSS only after confirming it is unused.
* Preserve responsive behavior.

### New CSS component

Before adding CSS:

```text
1. Search existing CSS.
2. Check v2.css.
3. Reuse an existing component if possible.
4. Create a new class only when responsibility is different.
```

### Layout

Legacy `.container` may use:

```css
width: min(920px, calc(100% - 32px));
```

v2 uses:

```text
--v2-max
1160px
```

Do not use legacy `.container` for new v2 layouts.

Prevent horizontal overflow.

Test widths:

```text
320px–1440px
```

---

# JavaScript

## Script order

```text
i18n.js
→ common.js
→ header-nav.js
→ [tools-data.js]
→ page script
```

`header-nav.js` is required for pages using the shared v2 header.

## File responsibility

```text
assets/js/i18n.js
→ language/translation

assets/js/common.js
→ shared site utilities/components

assets/js/header-nav.js
→ header/menu/search

assets/js/tools-data.js
→ tool data

assets/js/share.js
→ sharing

page JS
→ page-specific logic
```

## JavaScript decision rule

```text
Used by multiple pages
→ existing shared JS/common.js

Header/menu/search
→ header-nav.js

Data
→ tools-data.js

Sharing
→ share.js

One page only
→ page JS
```

Do not put unrelated page functionality into `common.js`.

Before creating a helper:

```text
1. Search existing JS.
2. Reuse existing functionality.
3. Create only when necessary.
```

Existing shared helpers include:

```javascript
formatNumber
formatDecimal
copyToClipboard
localDateOnly
formatDate
dateToInputValue
parseInputDate
switchCalcTab
```

Avoid name collisions.

JavaScript currently uses global scope. Do not introduce ES modules unless explicitly requested.

### JS rules

* One file = clear primary responsibility.
* Keep data, UI, and calculation logic reasonably separated.
* Reuse existing functions.
* Avoid duplicate functions.
* Avoid global name collisions.
* Do not modify shared JS for page-only features.
* Do not rename stable public/global functions unnecessarily.
* Before renaming, search all references.
* Remove JS only after confirming it is unused.
* Preserve script order.

---

# Header Popups

Managed by:

```text
assets/js/header-nav.js
```

Features:

```text
mobile menu
search popup
header interactions
```

Popup types:

```text
language
menu
search
```

Popup coordination:

```text
document
→ v2:popup
```

Only one header popup may be open at a time.

New header popups must use the existing `v2:popup` mechanism.

Do not create another popup state system.

Search may lazy-load `tools-data.js`.

---

# i18n

File:

```text
assets/js/i18n.js
```

Languages:

```text
ko
en
zh
ja
```

Priority:

```text
localStorage("language")
→ browser language
→ ko
```

Translations originate from:

```javascript
legacyTranslations[lang]
```

Supported forms:

```html
data-i18n="nav.home"
data-i18n="nav_home"
```

Supported attributes:

```text
data-i18n
data-i18n-placeholder
data-i18n-aria-label
data-i18n-title
data-i18n-content
```

New user-visible strings require all four languages.

Do not refactor the existing i18n architecture unless explicitly requested.

## Subpages

`/cal/*` and `/tools/*` use:

```text
subpageTranslations
applySubpageLanguage()
getSubpageName()
```

New `/cal/` or `/tools/` pages may require:

```text
subpageTranslations
buildTranslationCatalog()
```

Existing translation logic may depend on:

```text
.primary-btn
.secondary-btn
.text-button
```

Do not rename/remove these without checking i18n dependencies.

---

# Theme

Theme:

```text
light / dark
```

Stored in:

```javascript
localStorage("theme")
```

Every page has an inline blocking theme script in `<head>`.

New pages must copy the existing theme script.

Do not create independent theme systems.

New v2 colors use:

```text
--v2-*
```

---

# Tools Data

Single source of truth:

```text
assets/js/tools-data.js
→ TOOLS
```

Used by:

* home index
* search popup
* tool sidebars
* tool counts/indexes

Adding a tool normally means updating `TOOLS`.

Do not duplicate tool lists in HTML/JS.

For i18n tools use:

```text
key
descKey
```

Reuse `TOOLS` before creating another registry.

---

# Feature Structure

Typical:

```text
category/name/
├── index.html
└── name.js
```

Examples:

```text
cal/
tools/
games/
lotto/
saju/
```

Games reuse:

```javascript
window.shareGameResult()
window.copyGameLink()
```

from:

```text
assets/js/share.js
```

Do not duplicate existing sharing functionality.

---

# File / Naming Management

## Core rule

After every CSS/JS/HTML modification:

```text
No unnecessary files.
No duplicate files.
No obsolete files.
No ambiguous names.
```

Before creating, renaming, or replacing a file:

```text
1. Search existing files.
2. Check responsibility and references.
3. Reuse/consolidate when safe.
4. Remove obsolete files only after confirming they are unused.
5. Verify all references.
```

Do not leave temporary, backup, old, duplicate, or unused files created by the task.

## Naming

Use intuitive, searchable names.

Preferred:

```text
header-nav.js
tools-data.js
search-popup.js
mobile-menu.js
fortune-result.js

style.css
v2.css
home.css
saju.css
game.css
```

Avoid:

```text
new.js
temp.js
test.js
script2.js
common2.js
utils-new.js
style-new.css
final.css
backup.css
misc.js
```

Use:

```text
lowercase
kebab-case
```

Names should reveal the feature/responsibility immediately.

Do not add version suffixes such as `-new`, `-v2`, `-final`, or `-old` unless versioning is an intentional architectural requirement.

## CSS naming

Prefer clear component names:

```text
.v2-header
.v2-header-nav
.v2-mobile-menu
.v2-search-popup
.v2-tool-card
.v2-tool-sidebar
```

Avoid vague names:

```text
.box
.item
.wrap
.content2
.new-box
```

Before creating a class:

```text
Search existing CSS
→ reuse if responsibility matches
→ create only if necessary
```

Do not create duplicate classes for the same UI responsibility.

## Variable/function naming

Prefer:

```javascript
const mobileMenu
const searchPopup
const languageButton

function openMobileMenu() {}
function closeSearchPopup() {}
function updateToolList() {}
```

Avoid vague names:

```javascript
data
item
temp
value2
run()
process()
handle()
```

unless the meaning is obvious from a very small local scope.

Rules:

* Use descriptive, domain-specific names.
* Do not duplicate names with different meanings.
* Do not rename stable names unnecessarily.
* Before renaming, search all references.
* Update every reference when renaming.

---

# Duplicate / Obsolete Cleanup

When modifying a feature:

```text
Search
→ inspect related files
→ check references
→ consolidate duplicates
→ remove confirmed obsolete files/code
→ verify references
```

Check:

```text
duplicate CSS
duplicate JS
duplicate functions
duplicate data sources
unused CSS classes
unused JS files
unused variables/functions
obsolete HTML references
broken link/script references
```

Do not keep both old and new implementations when only one is required.

Never delete code merely because it appears unused. Confirm references first.

---

# File Creation Rule

Before creating a new CSS/JS/HTML file:

```text
Existing file with same responsibility?
        ↓
       YES
        ↓
Use/reuse existing file

        NO
        ↓
Clearly independent responsibility?
        ↓
       YES
        ↓
Create new file
```

Prefer:

```text
few
clear
well-scoped
files
```

Avoid unnecessary file fragmentation.

---

# Paths

New depth-1 pages use:

```text
../assets/
```

Do not copy the existing incorrect:

```text
../../assets/
```

pattern.

Do not rename directories or change URLs without explicit instruction.

Existing URLs may be indexed.

---

# Working Rules

## Priority

```text
1. Preserve existing functionality
2. Preserve existing URLs
3. Make the smallest safe change
4. Preserve project architecture
5. Implement the requested feature
6. Improve code only when relevant
```

## Before Editing

```text
1. Read relevant files.
2. Inspect the current implementation.
3. Search for reusable code/references.
4. Identify affected files.
5. Make the smallest necessary change.
```

Do not guess.

For changes affecting shared architecture, `common.js`, `header-nav.js`, i18n, global CSS, theme, or shared components:

```text
analyze impact
→ identify affected files/risks
→ modify minimally
```

## Do Not

* delete existing functionality
* rewrite unrelated files
* refactor unrelated code
* rename functions/classes unnecessarily
* move files unnecessarily
* create duplicate implementations
* leave obsolete files
* add dependencies
* add frameworks
* add TypeScript
* add bundlers/build systems
* introduce modules unless requested

Do not change calculation, game, or saju logic unless explicitly requested.

---

# Protected Files

Do not modify unless explicitly requested:

```text
ads.txt
robots.txt
sitemap.xml
```

Do not remove or restructure AdSense code in:

```text
components/ads.html
index.html
```

Do not modify `sitemap.xml` for normal page creation unless explicitly requested.

---

# New Pages

New/redesigned pages use v2:

```html
<body class="v2-page">
```

CSS:

```text
style.css
→ v2.css
→ page CSS
```

Use:

```text
.v2-*
--v2-*
```

Include:

```text
unique <title>
unique meta description
exactly one <h1>
canonical URL
robots=index,follow
useful explanatory content
related internal links
responsive layout
inline theme script
i18n.js
common.js
header-nav.js
page script
shared component placeholders
```

Copy `<head>` structure from an existing sibling page.

New `/cal/` or `/tools/` pages must update required i18n structures.

Link new pages from appropriate category/home pages.

Add FAQ or JSON-LD (`WebApplication` / `VideoGame`) only when appropriate.

---

# Completion Checklist

Before finishing:

```text
Functionality preserved
URLs unchanged
No unnecessary files
No duplicate/obsolete files
No unnecessary dependencies
File/class/function names are clear
i18n updated for ko/en/zh/ja when required
Light/dark mode works
Shared header/footer/ads load
Sticky header works
Language/menu/search popups are mutually exclusive
No horizontal scroll at 320–1440px
Mobile/tablet/desktop layout works
No Console errors
No Network errors
No JavaScript errors
No 404 errors
New-page SEO requirements present
```

---

# Final Response

Report only:

1. Modified files
2. What changed
3. Existing functionality impact
4. How to test
5. Notes/risks, if any

Keep the final response concise.
