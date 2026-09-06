// ============ 주식·ETF 적립식 투자 수익 계산기 ============
// 시세 데이터: stockanalysis.com (월봉, 최근 약 10년, 수정주가 포함)
(function () {
  'use strict';

  var tickerInput = document.getElementById('stockTicker');
  var amountInput = document.getElementById('stockAmount');
  var startInput = document.getElementById('stockStart');
  var endInput = document.getElementById('stockEnd');
  var dividendSelect = document.getElementById('stockDividend');
  var calcBtn = document.getElementById('stockCalcBtn');
  var copyBtn = document.getElementById('stockCopyBtn');
  var resetBtn = document.getElementById('stockResetBtn');

  var statusEl = document.getElementById('stockStatus');
  var errorEl = document.getElementById('stockError');
  var resultEl = document.getElementById('stockResult');
  var summaryEl = document.getElementById('stockSummary');
  var chartEl = document.getElementById('stockChart');
  var tableBody = document.getElementById('stockTableBody');

  if (!tickerInput || !calcBtn || !resultEl) {
    return;
  }

  // ---- 번역 헬퍼: i18n.js가 있으면 사용, 없으면 기본(한국어) 문자열 ----
  var FALLBACK = {
    stock_loading: '시세 데이터를 불러오는 중입니다...',
    stock_err_symbol: '해당 티커의 시세 데이터를 찾을 수 없습니다. 티커를 다시 확인해 주세요. (미국 상장 종목만 지원)',
    stock_err_network: '시세 데이터를 불러오지 못했습니다. 잠시 후 다시 시도해 주세요. (네트워크 또는 데이터 제공처 문제)',
    stock_err_range: '선택한 기간에 사용할 수 있는 시세 데이터가 없습니다. 시작 월과 종료 월을 확인해 주세요.',
    stock_err_input: '티커와 매월 투자금액, 시작 월을 올바르게 입력해 주세요.',
    stock_notice_clamped: '선택하신 시작 월보다 데이터가 늦게 시작합니다. {month}부터 계산했습니다.',
    stock_res_principal: '총 투자원금',
    stock_res_value: '최종 평가금액',
    stock_res_profit: '총 손익',
    stock_res_return: '누적 수익률',
    stock_res_cagr: '연평균 수익률',
    stock_res_months: '매수 횟수',
    stock_res_shares: '누적 수량',
    stock_res_avgprice: '평균 매입가',
    stock_months_unit: '회',
    stock_shares_unit: '주',
    stock_copy_title: '{ticker} 적립식 투자 결과',
    stock_copy_period: '기간: {start} ~ {end} ({months}개월)',
    stock_copy_monthly: '매월 투자: ${amount}',
    stock_copy_principal: '투자원금: ${principal}',
    stock_copy_value: '평가금액: ${value}',
    stock_copy_profit: '손익: ${profit} ({return})',
    stock_copy_cagr: '연평균 수익률: {cagr}',
    stock_copied: '결과가 복사되었습니다.'
  };

  function t(key, vars) {
    var s = FALLBACK[key] || key;
    try {
      if (typeof translate === 'function' && typeof getCurrentLanguage === 'function') {
        var v = translate(key, getCurrentLanguage());
        if (v && v !== key) s = v;
      }
    } catch (e) {}
    if (vars) {
      Object.keys(vars).forEach(function (k) {
        s = s.replace('{' + k + '}', vars[k]);
      });
    }
    return s;
  }

  // ---- 포맷 헬퍼 ----
  function fmtMoney(n) {
    return (Math.round(n)).toLocaleString('en-US');
  }
  function fmtPrice(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  function fmtShares(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 });
  }
  function fmtPct(n) {
    return (n >= 0 ? '+' : '') + n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + '%';
  }
  function monthKey(dateStr) {
    return String(dateStr).slice(0, 7);
  }
  function shiftMonths(date, delta) {
    return new Date(date.getFullYear(), date.getMonth() + delta, 1);
  }
  function toMonthValue(date) {
    var y = date.getFullYear();
    var m = String(date.getMonth() + 1).padStart(2, '0');
    return y + '-' + m;
  }

  // ---- 입력 기본값 / 범위 설정 ----
  var now = new Date();
  var currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  var lastCompleteMonth = shiftMonths(currentMonth, -1); // 이번 달은 아직 마감되지 않음
  var earliestMonth = shiftMonths(currentMonth, -120); // 약 10년

  startInput.min = toMonthValue(earliestMonth);
  startInput.max = toMonthValue(lastCompleteMonth);
  endInput.min = toMonthValue(earliestMonth);
  endInput.max = toMonthValue(lastCompleteMonth);
  if (!startInput.value) {
    startInput.value = toMonthValue(shiftMonths(currentMonth, -60)); // 기본 5년 전
  }

  // ---- 쿼리 파라미터 프리필 ----
  (function prefill() {
    var params = new URLSearchParams(window.location.search);
    if (params.get('ticker')) tickerInput.value = params.get('ticker').toUpperCase();
    if (params.get('amount')) amountInput.value = params.get('amount');
    if (params.get('start') && /^\d{4}-\d{2}$/.test(params.get('start'))) startInput.value = params.get('start');
    if (params.get('end') && /^\d{4}-\d{2}$/.test(params.get('end'))) endInput.value = params.get('end');
    if (params.get('dividend') === 'off') dividendSelect.value = 'off';
    if (params.get('ticker') && params.get('run') !== '0') {
      run();
    }
  })();

  tickerInput.addEventListener('input', function () {
    var pos = tickerInput.selectionStart;
    tickerInput.value = tickerInput.value.toUpperCase();
    try { tickerInput.setSelectionRange(pos, pos); } catch (e) {}
  });

  calcBtn.addEventListener('click', run);
  resetBtn.addEventListener('click', function () {
    tickerInput.value = '';
    amountInput.value = '100';
    startInput.value = toMonthValue(shiftMonths(currentMonth, -60));
    endInput.value = '';
    dividendSelect.value = 'on';
    hide(resultEl); hide(errorEl); hide(statusEl); hide(copyBtn);
  });

  var lastSummaryText = '';
  copyBtn.addEventListener('click', function () {
    if (lastSummaryText && typeof copyToClipboard === 'function') {
      copyToClipboard(lastSummaryText);
    }
  });

  if (typeof renderRelatedByCategory === 'function') {
    renderRelatedByCategory('relatedList', 'cal', 'stock', 5);
  }

  function show(el) { el.classList.remove('hidden'); }
  function hide(el) { el.classList.add('hidden'); }

  function setStatus(msg) {
    statusEl.textContent = msg;
    show(statusEl);
  }
  function setError(msg) {
    errorEl.textContent = msg;
    show(errorEl);
    hide(resultEl);
    hide(copyBtn);
  }

  // ---- 메인 실행 ----
  function run() {
    hide(errorEl);
    hide(statusEl);

    var ticker = (tickerInput.value || '').trim().toUpperCase();
    var amount = parseFloat(amountInput.value);
    var startVal = startInput.value;
    var endVal = endInput.value;
    var useAdjusted = dividendSelect.value !== 'off';

    if (!ticker || !isFinite(amount) || amount <= 0 || !/^\d{4}-\d{2}$/.test(startVal)) {
      setError(t('stock_err_input'));
      return;
    }
    if (endVal && !/^\d{4}-\d{2}$/.test(endVal)) {
      endVal = '';
    }
    if (endVal && endVal < startVal) {
      setError(t('stock_err_range'));
      return;
    }

    calcBtn.disabled = true;
    setStatus(t('stock_loading'));

    fetchHistory(ticker)
      .then(function (rows) {
        calcBtn.disabled = false;
        hide(statusEl);
        simulate(ticker, rows, amount, startVal, endVal, useAdjusted);
      })
      .catch(function (err) {
        calcBtn.disabled = false;
        hide(statusEl);
        if (err && err.code === 'SYMBOL') {
          setError(t('stock_err_symbol'));
        } else {
          setError(t('stock_err_network'));
        }
      });
  }

  // ---- 시세 데이터 조회 ----
  function fetchHistory(ticker) {
    var url = 'https://stockanalysis.com/api/symbol/s/' + encodeURIComponent(ticker) +
      '/history?range=10Y&period=Monthly';
    return fetch(url, { cache: 'no-store' })
      .then(function (res) {
        return res.json().catch(function () { return null; });
      })
      .then(function (json) {
        if (!json || typeof json !== 'object') {
          throw new Error('bad response'); // 응답 파싱 실패 → 네트워크/제공처 문제로 처리
        }
        var data = json.data;
        if (data && !Array.isArray(data) && Array.isArray(data.data)) {
          data = data.data;
        }
        if (!Array.isArray(data) || !data.length) {
          var e = new Error('symbol not found');
          e.code = 'SYMBOL';
          throw e;
        }
        var rows = data.map(function (row) {
          return {
            month: monthKey(row.t),
            close: Number(row.c),
            adj: Number(row.a != null ? row.a : row.c)
          };
        }).filter(function (r) {
          return r.month && isFinite(r.close) && r.close > 0 && isFinite(r.adj) && r.adj > 0;
        });
        rows.sort(function (a, b) { return a.month < b.month ? -1 : (a.month > b.month ? 1 : 0); });
        // 월 중복 제거 (마지막 값 우선)
        var seen = {};
        var unique = [];
        for (var i = rows.length - 1; i >= 0; i--) {
          if (!seen[rows[i].month]) {
            seen[rows[i].month] = true;
            unique.unshift(rows[i]);
          }
        }
        return unique;
      });
  }

  // ---- 적립식 시뮬레이션 ----
  function simulate(ticker, rows, amount, startVal, endVal, useAdjusted) {
    var priceOf = function (r) { return useAdjusted ? r.adj : r.close; };

    var effectiveStart = startVal;
    var clamped = false;
    if (startVal < rows[0].month) {
      effectiveStart = rows[0].month;
      clamped = true;
    }
    var effectiveEnd = endVal || rows[rows.length - 1].month;

    var windowRows = rows.filter(function (r) {
      return r.month >= effectiveStart && r.month <= effectiveEnd;
    });

    if (windowRows.length < 1) {
      setError(t('stock_err_range'));
      return;
    }

    var shares = 0;
    var invested = 0;
    var series = [];
    var lastPrice = priceOf(windowRows[windowRows.length - 1]);

    windowRows.forEach(function (r) {
      var p = priceOf(r);
      var bought = amount / p;
      shares += bought;
      invested += amount;
      series.push({
        month: r.month,
        price: p,
        bought: bought,
        shares: shares,
        invested: invested,
        value: shares * p // 해당 시점 주가 기준 평가금액
      });
    });

    var months = windowRows.length;
    var finalValue = shares * lastPrice;
    var profit = finalValue - invested;
    var totalReturnPct = (profit / invested) * 100;
    var avgPrice = invested / shares;
    var annualPct = computeAnnualIRR(amount, months, finalValue);

    renderSummary({
      ticker: ticker,
      invested: invested,
      finalValue: finalValue,
      profit: profit,
      totalReturnPct: totalReturnPct,
      annualPct: annualPct,
      months: months,
      shares: shares,
      avgPrice: avgPrice,
      start: windowRows[0].month,
      end: windowRows[windowRows.length - 1].month,
      amount: amount
    });
    renderChart(series);
    renderTable(series);

    if (clamped) {
      setStatus(t('stock_notice_clamped', { month: effectiveStart }));
    } else {
      hide(statusEl);
    }
    show(resultEl);
    show(copyBtn);
  }

  // 투자금 가중 수익률(월 IRR) → 연 환산.
  // 현금흐름: 월 0..n-1 에 -amount, 마지막 시점에 +finalValue
  function computeAnnualIRR(amount, n, finalValue) {
    if (n < 2) return null;

    function npv(r) {
      var sum = 0;
      for (var t = 0; t < n; t++) {
        sum += -amount / Math.pow(1 + r, t);
      }
      sum += finalValue / Math.pow(1 + r, n - 1);
      return sum;
    }

    var lo = -0.99;
    var hi = 1.0;
    var fLo = npv(lo);
    var fHi = npv(hi);
    if (!isFinite(fLo) || !isFinite(fHi) || fLo * fHi > 0) {
      return null;
    }
    var mid = 0;
    for (var i = 0; i < 200; i++) {
      mid = (lo + hi) / 2;
      var fMid = npv(mid);
      if (Math.abs(fMid) < 1e-7) break;
      if (fLo * fMid < 0) {
        hi = mid;
      } else {
        lo = mid;
        fLo = fMid;
      }
    }
    var annual = Math.pow(1 + mid, 12) - 1;
    return annual * 100;
  }

  // ---- 렌더링 ----
  function statItem(label, value, cls) {
    var el = document.createElement('div');
    el.className = 'stat-item';
    var l = document.createElement('span');
    l.className = 'label';
    l.textContent = label;
    var v = document.createElement('span');
    v.className = 'value' + (cls ? ' ' + cls : '');
    v.textContent = value;
    el.appendChild(l);
    el.appendChild(v);
    return el;
  }

  function renderSummary(d) {
    summaryEl.innerHTML = '';
    var sign = d.profit >= 0 ? 'pos' : 'neg';
    summaryEl.appendChild(statItem(t('stock_res_principal'), '$' + fmtMoney(d.invested)));
    summaryEl.appendChild(statItem(t('stock_res_value'), '$' + fmtMoney(d.finalValue)));
    summaryEl.appendChild(statItem(t('stock_res_profit'), (d.profit >= 0 ? '+$' : '-$') + fmtMoney(Math.abs(d.profit)), sign));
    summaryEl.appendChild(statItem(t('stock_res_return'), fmtPct(d.totalReturnPct), sign));
    summaryEl.appendChild(statItem(
      t('stock_res_cagr'),
      d.annualPct == null ? '-' : fmtPct(d.annualPct),
      d.annualPct == null ? '' : (d.annualPct >= 0 ? 'pos' : 'neg')
    ));
    summaryEl.appendChild(statItem(t('stock_res_months'), (d.months + ' ' + t('stock_months_unit')).trim()));
    summaryEl.appendChild(statItem(t('stock_res_shares'), (fmtShares(d.shares) + ' ' + t('stock_shares_unit')).trim()));
    summaryEl.appendChild(statItem(t('stock_res_avgprice'), '$' + fmtPrice(d.avgPrice)));

    lastSummaryText = [
      t('stock_copy_title', { ticker: d.ticker }),
      t('stock_copy_period', { start: d.start, end: d.end, months: d.months }),
      t('stock_copy_monthly', { amount: fmtMoney(d.amount) }),
      t('stock_copy_principal', { principal: fmtMoney(d.invested) }),
      t('stock_copy_value', { value: fmtMoney(d.finalValue) }),
      t('stock_copy_profit', { profit: (d.profit >= 0 ? '' : '-') + fmtMoney(Math.abs(d.profit)), return: fmtPct(d.totalReturnPct) }),
      d.annualPct == null ? '' : t('stock_copy_cagr', { cagr: fmtPct(d.annualPct) }),
      window.location.origin + window.location.pathname +
        '?ticker=' + encodeURIComponent(d.ticker) +
        '&amount=' + encodeURIComponent(d.amount) +
        '&start=' + encodeURIComponent(d.start) +
        '&end=' + encodeURIComponent(d.end) +
        (dividendSelect.value === 'off' ? '&dividend=off' : '')
    ].filter(Boolean).join('\n');
  }

  function renderChart(series) {
    var W = 640, H = 260, padL = 8, padR = 8, padT = 12, padB = 22;
    var n = series.length;
    var maxV = 0;
    series.forEach(function (s) {
      maxV = Math.max(maxV, s.value, s.invested);
    });
    if (maxV <= 0) { chartEl.innerHTML = ''; return; }

    function x(i) {
      return padL + (n <= 1 ? 0 : (i / (n - 1)) * (W - padL - padR));
    }
    function y(v) {
      return padT + (1 - v / maxV) * (H - padT - padB);
    }

    function path(key) {
      return series.map(function (s, i) {
        return (i === 0 ? 'M' : 'L') + x(i).toFixed(1) + ' ' + y(s[key]).toFixed(1);
      }).join(' ');
    }

    var valueArea = 'M' + x(0).toFixed(1) + ' ' + y(0).toFixed(1) + ' ' +
      series.map(function (s, i) { return 'L' + x(i).toFixed(1) + ' ' + y(s.value).toFixed(1); }).join(' ') +
      ' L' + x(n - 1).toFixed(1) + ' ' + y(0).toFixed(1) + ' Z';

    var first = series[0].month;
    var last = series[n - 1].month;

    var svg =
      '<svg class="stock-chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="평가금액과 투자원금 추이">' +
        '<path d="' + valueArea + '" style="fill:var(--accent);fill-opacity:0.12;stroke:none"/>' +
        '<path d="' + path('invested') + '" style="fill:none;stroke:var(--muted);stroke-width:2;stroke-dasharray:4 3" vector-effect="non-scaling-stroke"/>' +
        '<path d="' + path('value') + '" style="fill:none;stroke:var(--accent);stroke-width:2.5" vector-effect="non-scaling-stroke"/>' +
        '<text x="' + padL + '" y="' + (H - 6) + '" style="fill:var(--muted);font-size:11px">' + first + '</text>' +
        '<text x="' + (W - padR) + '" y="' + (H - 6) + '" style="fill:var(--muted);font-size:11px" text-anchor="end">' + last + '</text>' +
        '<text x="' + padL + '" y="' + (padT + 4) + '" style="fill:var(--muted);font-size:11px">$' + fmtMoney(maxV) + '</text>' +
      '</svg>';
    chartEl.innerHTML = svg;
  }

  function renderTable(series) {
    tableBody.innerHTML = '';
    var frag = document.createDocumentFragment();
    series.forEach(function (s) {
      var tr = document.createElement('tr');
      [
        s.month,
        '$' + fmtPrice(s.price),
        fmtShares(s.bought),
        fmtShares(s.shares),
        '$' + fmtMoney(s.invested),
        '$' + fmtMoney(s.value)
      ].forEach(function (text, idx) {
        var td = document.createElement('td');
        td.textContent = text;
        tr.appendChild(td);
      });
      frag.appendChild(tr);
    });
    tableBody.appendChild(frag);
  }
})();
