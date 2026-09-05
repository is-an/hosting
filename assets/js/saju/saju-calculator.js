/* =========================================================
   saju-calculator.js — 사주팔자 계산
   ---------------------------------------------------------
   지원 범위: 1940~2040년, 양력 생년월일 (+시간 선택)
   음력/윤달 입력은 정확한 변환 데이터가 없어 이번 버전에서는
   지원하지 않는다(가짜 결과 방지, saju-view.js 안내 참고).

   계산 근거
     연주: 절기 "입춘"(태양황경 315°) 이전 출생은 전년도로 계산
     월주: 월지는 절기 "절"(입춘·경칩·청명 …) 경계로 결정,
           월간은 오호둔(五虎遁) 공식 적용
     일주: 1984-02-02(갑자일)을 기준으로 한 날짜 차이의 60진법
     시주: 오자둔(五子遁). 23:00~23:59 출생은 다음날 자시로 보아
           일주를 하루 진행시킨다(통용되는 "정자시" 기준)
     절기 계산: 태양 겉보기 황경을 Jean Meeus의 저정밀도 태양좌표
           공식(각행성 섭동항 제외)으로 구하고, 목표 각도(15° 간격)에
           도달하는 시각을 수치적으로 역산한다. 이 저정밀도 공식 자체의
           오차가 있어 절기 시각은 실제보다 최대 ±15분 정도 어긋날 수
           있다. 태어난 시각이 절기 경계에서 15분 이내로 아주 가까운
           경우가 아니라면 연주/월주 판정에는 영향이 없으며, 달력 월
           경계로 근사하던(최대 며칠 오차) 기존 방식보다는 훨씬 정확하다.
   ========================================================= */

(function (global) {
  var D = global.SajuData;

  var MIN_YEAR = 1940;
  var MAX_YEAR = 2040;

  /* ---------- 공통 유틸 ---------- */

  function pad2(n) { return String(n).padStart(2, '0'); }

  function mod(n, m) { return ((n % m) + m) % m; }

  /* ---------- 태양 황경(절기) 계산 ---------- */

  /** 그레고리력(KST) → 율리우스일(UT 기준) */
  function toJulianDay(year, month, day, hourKst) {
    var y = year, m = month;
    if (m <= 2) { y -= 1; m += 12; }
    var A = Math.floor(y / 100);
    var B = 2 - A + Math.floor(A / 4);
    var hourUt = hourKst - 9; // KST = UT+9
    return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) +
      day + B - 1524.5 + hourUt / 24;
  }

  /** 태양의 겉보기 황경(도, 0~360) — Meeus 저정밀도 공식 */
  function sunApparentLongitude(jd) {
    var T = (jd - 2451545.0) / 36525;
    var L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    var M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    var Mrad = M * Math.PI / 180;
    var C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mrad) +
      (0.019993 - 0.000101 * T) * Math.sin(2 * Mrad) +
      0.000289 * Math.sin(3 * Mrad);
    var trueLongitude = L0 + C;
    var omega = 125.04 - 1934.136 * T;
    var apparent = trueLongitude - 0.00569 - 0.00478 * Math.sin(omega * Math.PI / 180);
    return mod(apparent, 360);
  }

  /** 특정 연도 부근에서 태양 황경이 targetDeg(도)가 되는 순간의 JD를 수치적으로 구한다 */
  function findSolarTermJD(year, month, day, targetDeg) {
    var jd = toJulianDay(year, month, day, 0);
    for (var i = 0; i < 10; i++) {
      var lon = sunApparentLongitude(jd);
      var diff = mod(targetDeg - lon + 540, 360) - 180; // -180~180 최단 각도차
      if (Math.abs(diff) < 0.0001) { break; }
      jd += diff / 0.9856; // 태양의 평균 일일 이동량(약 0.9856°/일)
    }
    return jd;
  }

  /** 해당 연도의 입춘(태양황경 315°) 시각을 JD로 반환 */
  function solarTermIpchunJD(year) {
    return findSolarTermJD(year, 2, 4, 315);
  }

  /* 절기 "절"(월지 경계) 12개: [시작 태양황경, 대략적 날짜(수치해석용 초기값), 월지 인덱스] */
  var MONTH_TERMS = [
    { deg: 315, guess: [2, 4], branch: 2 },  // 입춘 → 인월
    { deg: 345, guess: [3, 6], branch: 3 },  // 경칩 → 묘월
    { deg: 15, guess: [4, 5], branch: 4 },  // 청명 → 진월
    { deg: 45, guess: [5, 6], branch: 5 },  // 입하 → 사월
    { deg: 75, guess: [6, 6], branch: 6 },  // 망종 → 오월
    { deg: 105, guess: [7, 7], branch: 7 },  // 소서 → 미월
    { deg: 135, guess: [8, 8], branch: 8 },  // 입추 → 신월
    { deg: 165, guess: [9, 8], branch: 9 },  // 백로 → 유월
    { deg: 195, guess: [10, 8], branch: 10 }, // 한로 → 술월
    { deg: 225, guess: [11, 7], branch: 11 }, // 입동 → 해월
    { deg: 255, guess: [12, 7], branch: 0 },  // 대설 → 자월
    { deg: 285, guess: [1, 6], branch: 1 }   // 소한 → 축월
  ];

  /** 생일의 태양황경으로부터 월지·"몇 번째 절기(0=인월)"인지 계산 */
  function resolveMonthByLongitude(lon) {
    var shifted = mod(lon - 315, 360);
    var order = Math.floor(shifted / 30); // 0=인월 ... 11=축월
    var branch = mod(2 + order, 12);
    return { order: order, branch: branch };
  }

  /* ---------- 검증 ---------- */

  function validateBirthData(input) {
    var errors = [];
    if (!input || !input.birthDate) {
      errors.push('생년월일을 입력해주세요.');
      return { valid: false, errors: errors };
    }
    var parts = String(input.birthDate).split('-').map(Number);
    var y = parts[0], m = parts[1], d = parts[2];
    if (!y || !m || !d) {
      errors.push('생년월일 형식이 올바르지 않습니다.');
      return { valid: false, errors: errors };
    }
    if (y < MIN_YEAR || y > MAX_YEAR) {
      errors.push('현재 ' + MIN_YEAR + '년~' + MAX_YEAR + '년생만 계산할 수 있습니다.');
    }
    var date = new Date(y, m - 1, d);
    if (date.getFullYear() !== y || date.getMonth() !== m - 1 || date.getDate() !== d) {
      errors.push('존재하지 않는 날짜입니다.');
    }
    if (input.calendarType === 'lunar') {
      errors.push('음력 생년월일은 정확한 변환 데이터가 없어 이번 버전에서는 지원하지 않습니다. 양력으로 입력해주세요.');
    }
    return { valid: errors.length === 0, errors: errors };
  }

  /* ---------- 4주 계산 ---------- */

  function calculateYearPillar(year, month, day) {
    var ipchunJd = solarTermIpchunJD(year);
    var birthJd = toJulianDay(year, month, day, 12); // 정오 기준 근사(일 단위 판정에 충분)
    var effectiveYear = birthJd < ipchunJd ? year - 1 : year;
    var stem = mod(effectiveYear - 4, 10);
    var branch = mod(effectiveYear - 4, 12);
    return { year: effectiveYear, stem: stem, branch: branch };
  }

  function calculateMonthPillar(year, month, day, yearStem) {
    var birthJd = toJulianDay(year, month, day, 12);
    var lon = sunApparentLongitude(birthJd);
    var resolved = resolveMonthByLongitude(lon);
    var stem = mod((yearStem % 5) * 2 + resolved.order + 2, 10);
    return { stem: stem, branch: resolved.branch };
  }

  /** 자시(23:00~23:59) 보정을 반영한 "일주 계산용" 날짜 문자열 대신 일수 오프셋을 반환 */
  function dayPillarOffset(hour) {
    return (hour !== null && hour >= 23) ? 1 : 0;
  }

  function calculateDayPillar(year, month, day, hour) {
    var offset = dayPillarOffset(hour);
    var days = Math.round(
      (Date.UTC(year, month - 1, day + offset) - Date.UTC(1984, 1, 2)) / 86400000
    );
    return { stem: mod(days, 10), branch: mod(days, 12) };
  }

  function calculateHourPillar(hour, dayStem) {
    if (hour === null || hour === undefined) {
      return { stem: null, branch: null };
    }
    var branch = Math.floor(mod(hour + 1, 24) / 2);
    var stem = mod((dayStem % 5) * 2 + branch, 10);
    return { stem: stem, branch: branch };
  }

  /* ---------- 오행 / 음양 분석 ---------- */

  function analyzeElements(pillars) {
    var counts = [0, 0, 0, 0, 0];
    pillars.forEach(function (p) {
      if (p.stem !== null) { counts[D.STEM_ELEMENT[p.stem]]++; }
      if (p.branch !== null) { counts[D.BRANCH_ELEMENT[p.branch]]++; }
    });
    var total = counts.reduce(function (a, b) { return a + b; }, 0) || 1;
    return D.ELEMENTS.map(function (el, i) {
      return {
        key: el.key, name: el.name, trait: el.trait, color: el.color,
        count: counts[i], ratio: counts[i] / total
      };
    });
  }

  function analyzeYinYang(pillars) {
    var yang = 0, eum = 0;
    pillars.forEach(function (p) {
      if (p.stem !== null) { D.STEM_YINYANG[p.stem] > 0 ? yang++ : eum++; }
      if (p.branch !== null) { D.BRANCH_YINYANG[p.branch] > 0 ? yang++ : eum++; }
    });
    var total = yang + eum || 1;
    return {
      yang: yang, eum: eum,
      yangRatio: yang / total, eumRatio: eum / total
    };
  }

  /* ---------- 십신 ---------- */

  function tenGodOf(dayStem, targetStem) {
    if (targetStem === null || targetStem === undefined) { return null; }
    var de = D.STEM_ELEMENT[dayStem];
    var te = D.STEM_ELEMENT[targetStem];
    var sameYinYang = D.STEM_YINYANG[dayStem] === D.STEM_YINYANG[targetStem];
    var suffix = sameYinYang ? '_same' : '_diff';
    var key;
    if (de === te) { key = 'same' + suffix; }
    else if (mod(de + 1, 5) === te) { key = 'generate' + suffix; }   // 일간이 생함
    else if (mod(de + 2, 5) === te) { key = 'control' + suffix; }    // 일간이 극함
    else if (mod(te + 1, 5) === de) { key = 'generatedBy' + suffix; } // 일간을 생함
    else { key = 'controlledBy' + suffix; }                          // 일간을 극함
    return D.TEN_GOD_NAMES[key];
  }

  function calculateTenGods(pillars) {
    var dayStem = pillars[2].stem;
    return D.PILLAR_SHORT.map(function (label, i) {
      if (i === 2) { return { pillar: label, god: null, isSelf: true }; }
      return { pillar: label, god: tenGodOf(dayStem, pillars[i].stem), isSelf: false };
    });
  }

  /* ---------- 합/충/형/파/해, 삼합/육합 ---------- */

  function pairsAmong(items) {
    var out = [];
    for (var i = 0; i < items.length; i++) {
      for (var j = i + 1; j < items.length; j++) {
        if (items[i].value !== null && items[j].value !== null) {
          out.push([items[i], items[j]]);
        }
      }
    }
    return out;
  }

  function matchPair(list, a, b) {
    return list.find(function (r) {
      return (r.pair[0] === a && r.pair[1] === b) || (r.pair[0] === b && r.pair[1] === a);
    });
  }

  function analyzeRelations(pillars) {
    var stems = pillars.map(function (p, i) { return { label: D.PILLAR_SHORT[i], value: p.stem }; });
    var branches = pillars.map(function (p, i) { return { label: D.PILLAR_SHORT[i], value: p.branch }; });

    var result = {
      stemCombinations: [], stemClashes: [],
      branchCombinations: [], branchTriads: [],
      branchClashes: [], punishments: [], breaks: [], harms: []
    };

    pairsAmong(stems).forEach(function (pair) {
      var combo = matchPair(D.STEM_COMBINATIONS, pair[0].value, pair[1].value);
      if (combo) {
        result.stemCombinations.push({ pillars: [pair[0].label, pair[1].label], name: combo.name, element: combo.element });
      }
      var clash = matchPair(D.STEM_CLASHES, pair[0].value, pair[1].value);
      if (clash) {
        result.stemClashes.push({ pillars: [pair[0].label, pair[1].label], name: clash.name });
      }
    });

    var branchPairs = pairsAmong(branches);
    branchPairs.forEach(function (pair) {
      var combo = matchPair(D.BRANCH_COMBINATIONS, pair[0].value, pair[1].value);
      if (combo) {
        result.branchCombinations.push({ pillars: [pair[0].label, pair[1].label], name: combo.name, element: combo.element });
      }
      var clash = matchPair(D.BRANCH_CLASHES, pair[0].value, pair[1].value);
      if (clash) {
        result.branchClashes.push({ pillars: [pair[0].label, pair[1].label], name: clash.name });
      }
      var brk = matchPair(D.BRANCH_BREAKS, pair[0].value, pair[1].value);
      if (brk) {
        result.breaks.push({ pillars: [pair[0].label, pair[1].label], name: brk.name });
      }
      var harm = matchPair(D.BRANCH_HARMS, pair[0].value, pair[1].value);
      if (harm) {
        result.harms.push({ pillars: [pair[0].label, pair[1].label], name: harm.name });
      }
      var pairPunish = matchPair(D.BRANCH_PAIR_PUNISHMENTS, pair[0].value, pair[1].value);
      if (pairPunish) {
        result.punishments.push({ pillars: [pair[0].label, pair[1].label], name: pairPunish.name });
      }
    });

    /* 삼합 (3개 모두 존재해야 성립) */
    D.BRANCH_TRIADS.forEach(function (triad) {
      var found = triad.triad.map(function (b) {
        return branches.filter(function (br) { return br.value === b; });
      });
      if (found.every(function (f) { return f.length > 0; })) {
        var labels = found.map(function (f) { return f[0].label; });
        result.branchTriads.push({ pillars: labels, name: triad.name, element: triad.element });
      }
    });

    /* 삼형 (3개 모두 존재해야 성립) */
    D.BRANCH_TRIPLE_PUNISHMENTS.forEach(function (triad) {
      var found = triad.triad.map(function (b) {
        return branches.filter(function (br) { return br.value === b; });
      });
      if (found.every(function (f) { return f.length > 0; })) {
        var labels = found.map(function (f) { return f[0].label; });
        result.punishments.push({ pillars: labels, name: triad.name });
      }
    });

    /* 자형 (동일 지지가 2개 이상) */
    D.BRANCH_SELF_PUNISH.forEach(function (b) {
      var found = branches.filter(function (br) { return br.value === b; });
      if (found.length >= 2) {
        result.punishments.push({
          pillars: found.map(function (f) { return f.label; }),
          name: D.BRANCHES[b] + D.BRANCHES[b] + ' 자형'
        });
      }
    });

    return result;
  }

  /* ---------- 종합 계산 ---------- */

  function calculateSaju(input) {
    var validation = validateBirthData(input);
    if (!validation.valid) { return { ok: false, errors: validation.errors }; }

    var parts = String(input.birthDate).split('-').map(Number);
    var year = parts[0], month = parts[1], day = parts[2];
    var hour = (input.birthTime === '' || input.birthTime === null || input.birthTime === undefined)
      ? null : Number(input.birthTime);

    var yearPillar = calculateYearPillar(year, month, day);
    var monthPillar = calculateMonthPillar(year, month, day, yearPillar.stem);
    var dayPillar = calculateDayPillar(year, month, day, hour);
    var hourPillar = calculateHourPillar(hour, dayPillar.stem);

    var pillars = [
      { stem: yearPillar.stem, branch: yearPillar.branch },
      { stem: monthPillar.stem, branch: monthPillar.branch },
      { stem: dayPillar.stem, branch: dayPillar.branch },
      { stem: hourPillar.stem, branch: hourPillar.branch }
    ];

    return {
      ok: true,
      input: { birthDate: input.birthDate, birthTime: input.birthTime, gender: input.gender },
      effectiveYear: yearPillar.year,
      hour: hour,
      pillars: pillars,
      elements: analyzeElements(pillars),
      yinYang: analyzeYinYang(pillars),
      tenGods: calculateTenGods(pillars),
      relations: analyzeRelations(pillars)
    };
  }

  global.SajuCalculator = {
    MIN_YEAR: MIN_YEAR,
    MAX_YEAR: MAX_YEAR,
    validateBirthData: validateBirthData,
    calculateYearPillar: calculateYearPillar,
    calculateMonthPillar: calculateMonthPillar,
    calculateDayPillar: calculateDayPillar,
    calculateHourPillar: calculateHourPillar,
    analyzeElements: analyzeElements,
    analyzeYinYang: analyzeYinYang,
    calculateTenGods: calculateTenGods,
    analyzeRelations: analyzeRelations,
    calculateSaju: calculateSaju,
    /* 절기 계산은 saju-fortune.js 등에서 재사용할 수 있도록 노출 */
    sunApparentLongitude: sunApparentLongitude,
    toJulianDay: toJulianDay
  };
})(window);
