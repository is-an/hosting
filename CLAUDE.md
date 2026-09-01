# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Overview

`is-an.github.io` is a static, dependency-free website of free online utilities for Korean search traffic and AdSense revenue.

Features include calculators, converters, generators, mini games, lotto, and saju.

**Stack:**

* HTML
* CSS
* Vanilla JavaScript
* GitHub Pages

No frameworks, TypeScript, dependencies, bundlers, or build steps.

---

## Commands

```bash
npm start
```

Runs:

```bash
python -m http.server 8000
```

Open `http://localhost:8000`.

**Always use HTTP, not `file://`.** Shared header/footer/ads are loaded via `fetch()` and may fail on a `file://` origin.

`npm run build` and `npm test` are placeholder commands. Verify changes in a browser, including Console and Network errors.

Deployment is automatic: pushing to `main` runs `.github/workflows/static.yml` and deploys the repository root to GitHub Pages.

`.nojekyll` disables Jekyll processing. Do not use Jekyll features or rely on `config.yml`.

---

# Architecture

## Shared components

Every page contains:

```html
<div id="site-header"></div>
<div id="ads-slot"></div>
<div id="site-footer"></div>
```

`assets/js/common.js` → `initSharedComponents()` fetches:

```text
components/header.html
components/ads.html
components/footer.html
```

`common.js` derives the site root from its own `<script src>` path, allowing shared components to work at different directory depths.

Do not hardcode component paths unnecessarily.

### Header navigation

Header links use `data-route`. `applyHeaderLinks()` builds URLs from `routeMap` in `assets/js/common.js`.

**Adding a top-level section requires updating `routeMap`, not only `header.html`.**

### Script order

Keep this order:

```text
i18n.js
→ common.js
→ page script
```

`common.js` runs `applyLanguage()` after injecting shared components because injected markup contains `data-i18n`.

---

# i18n

File:

```text
assets/js/i18n.js
```

Supported languages:

```text
ko / en / zh / ja
```

Language priority:

```text
localStorage("language")
→ browser language
→ ko
```

## Translation structure

Translation strings are authored in:

```javascript
legacyTranslations[lang]
```

using flat keys such as:

```text
nav_home
footer_toolsTitle
home_title
```

`buildTranslationCatalog(lang)` converts flat keys into nested paths and merges flat keys back.

Both work:

```html
data-i18n="nav.home"
data-i18n="nav_home"
```

Follow the convention of the file being edited.

Supported attributes:

```text
data-i18n
data-i18n-placeholder
data-i18n-aria-label
data-i18n-title
data-i18n-content
```

### Rule

New user-visible strings must be added for **all four languages**:

```text
ko / en / zh / ja
```

Do not rewrite or refactor the existing i18n architecture unless explicitly requested.

---

## Subpage translations

`subpageTranslations` and `applySubpageLanguage()` handle `/cal/*` and `/tools/*` pages.

`getSubpageName()` identifies pages from URL paths.

This system is fragile because some translations depend on hardcoded Korean text and button classes.

For example:

```javascript
button.textContent.trim() === '계산하기'
```

Changing Korean labels or these classes may silently break translations:

```text
.primary-btn
.secondary-btn
.text-button
```

New `/cal/` or `/tools/` pages must update:

```text
subpageTranslations
buildTranslationCatalog()
```

---

# Theming

Dark mode uses:

```html
<html data-theme="light">
```

or:

```html
<html data-theme="dark">
```

Theme is stored in:

```javascript
localStorage("theme")
```

Every page has an inline blocking theme script in `<head>` to prevent theme flashing.

**Copy this script when creating new pages.**

All colors must use CSS custom properties in:

```text
assets/css/style.css
```

under:

```css
:root
[data-theme="dark"]
```

Do not create independent per-page dark mode systems.

---

# Feature structure

Each feature generally uses:

```text
<category>/<name>/
├── index.html
└── <name>.js
```

Examples:

```text
tools/bmi/
saju/
lotto/
games/*
```

JavaScript is global scope, not ES modules.

Avoid collisions with helpers in `common.js`, including:

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

Games use `assets/js/share.js`:

```javascript
window.shareGameResult()
window.copyGameLink()
```

Reuse existing functionality before creating duplicates.

---

# Path rule

Existing files:

```text
cal/index.html
tools/index.html
lotto/index.html
```

incorrectly use:

```text
../../assets/
```

This currently works at the root deployment but may fail under a subpath.

**New depth-1 pages should use:**

```text
../assets/
```

Do not copy the existing incorrect path pattern.

---

# Working rules

## 1. Preserve existing functionality

Never delete existing functionality.

Do not change existing calculation, game, or saju logic unless explicitly requested.

## 2. Preserve URLs

Directory names are live and may be indexed.

Do not rename directories or change URLs without explicit instruction.

## 3. No dependencies

Do not add:

* npm packages
* frameworks
* TypeScript
* bundlers
* build steps

Reuse `common.js` and `style.css` where possible.

## 4. Protected files

Do not modify these unless explicitly requested:

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

## 5. Analyze before editing

Before modifying code:

1. Read relevant files.
2. Understand the current implementation.
3. Make the smallest change necessary.

Do not guess.

## 6. Avoid unnecessary changes

Do not:

* rewrite files wholesale
* refactor unrelated code
* rename existing functions
* move files unnecessarily
* change unrelated UI/design

For changes affecting multiple files, shared architecture, `common.js`, i18n, or global CSS, explain the affected files and risks before making changes.

---

# New page requirements

Every new page must include:

* unique `<title>`
* unique meta description
* exactly one `<h1>`
* canonical URL
* `robots` set to `index,follow`
* explanatory content
* related internal links
* responsive layout

Add FAQ or JSON-LD (`WebApplication` / `VideoGame`) only when appropriate.

Copy `<head>` boilerplate from an existing sibling page, including the inline theme script.

Include:

```text
i18n.js
→ common.js
→ page script
```

and the three shared-component placeholders.

For new `/cal/` or `/tools/` pages, update the required i18n structures.

Link new pages from relevant category/home pages when appropriate.

**Do not modify `sitemap.xml` unless explicitly requested.**

---

# Completion checklist

Before finishing, verify:

* existing functionality is preserved
* URLs are unchanged
* no unnecessary files or dependencies were added
* all four i18n languages are updated when needed
* light and dark mode work
* header/footer/ads load correctly
* no Console, Network, JavaScript, or 404 errors
* mobile layout works
* SEO requirements for new pages are present

---

# Final response

After completing a task, provide:

1. **Modified files**
2. **What changed**
3. **Existing functionality impact**
4. **How to test**
5. **Notes or risks**, if any

---

# Priority

When rules conflict:

```text
1. Preserve existing functionality
2. Preserve existing URLs
3. Make the smallest change
4. Preserve project architecture
5. Implement the requested feature
6. Improve code
```
