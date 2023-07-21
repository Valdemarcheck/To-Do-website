/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/date-fns/esm/_lib/assign/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/assign/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ assign)
/* harmony export */ });
function assign(target, object) {
  if (target == null) {
    throw new TypeError('assign requires that input parameter not be null or undefined');
  }
  for (var property in object) {
    if (Object.prototype.hasOwnProperty.call(object, property)) {
      ;
      target[property] = object[property];
    }
  }
  return target;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/cloneObject/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/cloneObject/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ cloneObject)
/* harmony export */ });
/* harmony import */ var _assign_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../assign/index.js */ "./node_modules/date-fns/esm/_lib/assign/index.js");

function cloneObject(object) {
  return (0,_assign_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({}, object);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultLocale/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getDefaultOptions: () => (/* binding */ getDefaultOptions),
/* harmony export */   setDefaultOptions: () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getTimezoneOffsetInMilliseconds)
/* harmony export */ });
/**
 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
 * They usually appear for dates that denote time before the timezones were introduced
 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
 * and GMT+01:00:00 after that date)
 *
 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
 * which would lead to incorrect calculations.
 *
 * This function returns the timezone offset in milliseconds that takes seconds in account.
 */
function getTimezoneOffsetInMilliseconds(date) {
  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
  utcDate.setUTCFullYear(date.getFullYear());
  return date.getTime() - utcDate.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/compareAsc/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/compareAsc/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ compareAsc)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name compareAsc
 * @category Common Helpers
 * @summary Compare the two dates and return -1, 0 or 1.
 *
 * @description
 * Compare the two dates and return 1 if the first date is after the second,
 * -1 if the first date is before the second or 0 if dates are equal.
 *
 * @param {Date|Number} dateLeft - the first date to compare
 * @param {Date|Number} dateRight - the second date to compare
 * @returns {Number} the result of the comparison
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Compare 11 February 1987 and 10 July 1989:
 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
 * //=> -1
 *
 * @example
 * // Sort the array of dates:
 * const result = [
 *   new Date(1995, 6, 2),
 *   new Date(1987, 1, 11),
 *   new Date(1989, 6, 10)
 * ].sort(compareAsc)
 * //=> [
 * //   Wed Feb 11 1987 00:00:00,
 * //   Mon Jul 10 1989 00:00:00,
 * //   Sun Jul 02 1995 00:00:00
 * // ]
 */
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  var diff = dateLeft.getTime() - dateRight.getTime();
  if (diff < 0) {
    return -1;
  } else if (diff > 0) {
    return 1;
    // Return 0 if diff is 0; return NaN if diff is NaN
  } else {
    return diff;
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/formatDistanceStrict/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/formatDistanceStrict/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistanceStrict)
/* harmony export */ });
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");
/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js");
/* harmony import */ var _compareAsc_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../compareAsc/index.js */ "./node_modules/date-fns/esm/compareAsc/index.js");
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_lib/cloneObject/index.js */ "./node_modules/date-fns/esm/_lib/cloneObject/index.js");
/* harmony import */ var _lib_assign_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../_lib/assign/index.js */ "./node_modules/date-fns/esm/_lib/assign/index.js");
/* harmony import */ var _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/defaultLocale/index.js */ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");








var MILLISECONDS_IN_MINUTE = 1000 * 60;
var MINUTES_IN_DAY = 60 * 24;
var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;

/**
 * @name formatDistanceStrict
 * @category Common Helpers
 * @summary Return the distance between the given dates in words.
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|Number} date - the date
 * @param {Date|Number} baseDate - the date to compare with
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `baseDate` must not be Invalid Date
 * @throws {RangeError} `options.roundingMethod` must be 'floor', 'ceil' or 'round'
 * @throws {RangeError} `options.unit` must be 'second', 'minute', 'hour', 'day', 'month' or 'year'
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // What is the distance between 2 July 2014 and 1 January 2015?
 * const result = formatDistanceStrict(new Date(2014, 6, 2), new Date(2015, 0, 2))
 * //=> '6 months'
 *
 * @example
 * // What is the distance between 1 January 2015 00:00:15
 * // and 1 January 2015 00:00:00?
 * const result = formatDistanceStrict(
 *   new Date(2015, 0, 1, 0, 0, 15),
 *   new Date(2015, 0, 1, 0, 0, 0)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, with a suffix?
 * const result = formatDistanceStrict(new Date(2015, 0, 1), new Date(2016, 0, 1), {
 *   addSuffix: true
 * })
 * //=> '1 year ago'
 *
 * @example
 * // What is the distance from 1 January 2016
 * // to 1 January 2015, in minutes?
 * const result = formatDistanceStrict(new Date(2016, 0, 1), new Date(2015, 0, 1), {
 *   unit: 'minute'
 * })
 * //=> '525600 minutes'
 *
 * @example
 * // What is the distance from 1 January 2015
 * // to 28 January 2015, in months, rounded up?
 * const result = formatDistanceStrict(new Date(2015, 0, 28), new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // What is the distance between 1 August 2016 and 1 January 2015 in Esperanto?
 * import { eoLocale } from 'date-fns/locale/eo'
 * const result = formatDistanceStrict(new Date(2016, 7, 1), new Date(2015, 0, 1), {
 *   locale: eoLocale
 * })
 * //=> '1 jaro'
 */

function formatDistanceStrict(dirtyDate, dirtyBaseDate, options) {
  var _ref, _options$locale, _options$roundingMeth;
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var locale = (_ref = (_options$locale = options === null || options === void 0 ? void 0 : options.locale) !== null && _options$locale !== void 0 ? _options$locale : defaultOptions.locale) !== null && _ref !== void 0 ? _ref : _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  if (!locale.formatDistance) {
    throw new RangeError('locale must contain localize.formatDistance property');
  }
  var comparison = (0,_compareAsc_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate, dirtyBaseDate);
  if (isNaN(comparison)) {
    throw new RangeError('Invalid time value');
  }
  var localizeOptions = (0,_lib_assign_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(options), {
    addSuffix: Boolean(options === null || options === void 0 ? void 0 : options.addSuffix),
    comparison: comparison
  });
  var dateLeft;
  var dateRight;
  if (comparison > 0) {
    dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyBaseDate);
    dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyDate);
  } else {
    dateLeft = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyDate);
    dateRight = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(dirtyBaseDate);
  }
  var roundingMethod = String((_options$roundingMeth = options === null || options === void 0 ? void 0 : options.roundingMethod) !== null && _options$roundingMeth !== void 0 ? _options$roundingMeth : 'round');
  var roundingMethodFn;
  if (roundingMethod === 'floor') {
    roundingMethodFn = Math.floor;
  } else if (roundingMethod === 'ceil') {
    roundingMethodFn = Math.ceil;
  } else if (roundingMethod === 'round') {
    roundingMethodFn = Math.round;
  } else {
    throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
  }
  var milliseconds = dateRight.getTime() - dateLeft.getTime();
  var minutes = milliseconds / MILLISECONDS_IN_MINUTE;
  var timezoneOffset = (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__["default"])(dateRight) - (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__["default"])(dateLeft);

  // Use DST-normalized difference in minutes for years, months and days;
  // use regular difference in minutes for hours, minutes and seconds.
  var dstNormalizedMinutes = (milliseconds - timezoneOffset) / MILLISECONDS_IN_MINUTE;
  var defaultUnit = options === null || options === void 0 ? void 0 : options.unit;
  var unit;
  if (!defaultUnit) {
    if (minutes < 1) {
      unit = 'second';
    } else if (minutes < 60) {
      unit = 'minute';
    } else if (minutes < MINUTES_IN_DAY) {
      unit = 'hour';
    } else if (dstNormalizedMinutes < MINUTES_IN_MONTH) {
      unit = 'day';
    } else if (dstNormalizedMinutes < MINUTES_IN_YEAR) {
      unit = 'month';
    } else {
      unit = 'year';
    }
  } else {
    unit = String(defaultUnit);
  }

  // 0 up to 60 seconds
  if (unit === 'second') {
    var seconds = roundingMethodFn(milliseconds / 1000);
    return locale.formatDistance('xSeconds', seconds, localizeOptions);

    // 1 up to 60 mins
  } else if (unit === 'minute') {
    var roundedMinutes = roundingMethodFn(minutes);
    return locale.formatDistance('xMinutes', roundedMinutes, localizeOptions);

    // 1 up to 24 hours
  } else if (unit === 'hour') {
    var hours = roundingMethodFn(minutes / 60);
    return locale.formatDistance('xHours', hours, localizeOptions);

    // 1 up to 30 days
  } else if (unit === 'day') {
    var days = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_DAY);
    return locale.formatDistance('xDays', days, localizeOptions);

    // 1 up to 12 months
  } else if (unit === 'month') {
    var months = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_MONTH);
    return months === 12 && defaultUnit !== 'month' ? locale.formatDistance('xYears', 1, localizeOptions) : locale.formatDistance('xMonths', months, localizeOptions);

    // 1 year up to max Date
  } else if (unit === 'year') {
    var years = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_YEAR);
    return locale.formatDistance('xYears', years, localizeOptions);
  }
  throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
}

/***/ }),

/***/ "./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js":
/*!**********************************************************************!*\
  !*** ./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ formatDistanceToNowStrict)
/* harmony export */ });
/* harmony import */ var _formatDistanceStrict_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formatDistanceStrict/index.js */ "./node_modules/date-fns/esm/formatDistanceStrict/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name formatDistanceToNowStrict
 * @category Common Helpers
 * @summary Return the distance between the given date and now in words.
 * @pure false
 *
 * @description
 * Return the distance between the given dates in words, using strict units.
 * This is like `formatDistance`, but does not use helpers like 'almost', 'over',
 * 'less than' and the like.
 *
 * | Distance between dates | Result              |
 * |------------------------|---------------------|
 * | 0 ... 59 secs          | [0..59] seconds     |
 * | 1 ... 59 mins          | [1..59] minutes     |
 * | 1 ... 23 hrs           | [1..23] hours       |
 * | 1 ... 29 days          | [1..29] days        |
 * | 1 ... 11 months        | [1..11] months      |
 * | 1 ... N years          | [1..N]  years       |
 *
 * @param {Date|Number} date - the given date
 * @param {Object} [options] - an object with options.
 * @param {Boolean} [options.addSuffix=false] - result indicates if the second date is earlier or later than the first
 * @param {'second'|'minute'|'hour'|'day'|'month'|'year'} [options.unit] - if specified, will force a unit
 * @param {'floor'|'ceil'|'round'} [options.roundingMethod='round'] - which way to round partial units
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the distance in words
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `date` must not be Invalid Date
 * @throws {RangeError} `options.locale` must contain `formatDistance` property
 *
 * @example
 * // If today is 1 January 2015, what is the distance to 2 July 2014?
 * const result = formatDistanceToNowStrict(
 *   new Date(2014, 6, 2)
 * )
 * //=> '6 months'
 *
 * @example
 * // If now is 1 January 2015 00:00:00,
 * // what is the distance to 1 January 2015 00:00:15, including seconds?
 * const result = formatDistanceToNowStrict(
 *   new Date(2015, 0, 1, 0, 0, 15)
 * )
 * //=> '15 seconds'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016, with a suffix?
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {addSuffix: true}
 * )
 * //=> 'in 1 year'
 *
 * @example
 * // If today is 28 January 2015,
 * // what is the distance to 1 January 2015, in months, rounded up??
 * const result = formatDistanceToNowStrict(new Date(2015, 0, 1), {
 *   unit: 'month',
 *   roundingMethod: 'ceil'
 * })
 * //=> '1 month'
 *
 * @example
 * // If today is 1 January 2015,
 * // what is the distance to 1 January 2016 in Esperanto?
 * const eoLocale = require('date-fns/locale/eo')
 * const result = formatDistanceToNowStrict(
 *   new Date(2016, 0, 1),
 *   {locale: eoLocale}
 * )
 * //=> '1 jaro'
 */
function formatDistanceToNowStrict(dirtyDate, options) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_formatDistanceStrict_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate, Date.now(), options);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isPast/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/isPast/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isPast)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isPast
 * @category Common Helpers
 * @summary Is the given date in the past?
 * @pure false
 *
 * @description
 * Is the given date in the past?
 *
 * > ⚠️ Please note that this function is not present in the FP submodule as
 * > it uses `Date.now()` internally hence impure and can't be safely curried.
 *
 * @param {Date|Number} date - the date to check
 * @returns {Boolean} the date is in the past
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // If today is 6 October 2014, is 2 July 2014 in the past?
 * const result = isPast(new Date(2014, 6, 2))
 * //=> true
 */
function isPast(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  return (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate).getTime() < Date.now();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildFormatLongFn)
/* harmony export */ });
function buildFormatLongFn(args) {
  return function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    // TODO: Remove String()
    var width = options.width ? String(options.width) : args.defaultWidth;
    var format = args.formats[width] || args.formats[args.defaultWidth];
    return format;
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildLocalizeFn)
/* harmony export */ });
function buildLocalizeFn(args) {
  return function (dirtyIndex, options) {
    var context = options !== null && options !== void 0 && options.context ? String(options.context) : 'standalone';
    var valuesArray;
    if (context === 'formatting' && args.formattingValues) {
      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
      var width = options !== null && options !== void 0 && options.width ? String(options.width) : defaultWidth;
      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
    } else {
      var _defaultWidth = args.defaultWidth;
      var _width = options !== null && options !== void 0 && options.width ? String(options.width) : args.defaultWidth;
      valuesArray = args.values[_width] || args.values[_defaultWidth];
    }
    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
    // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
    return valuesArray[index];
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchFn)
/* harmony export */ });
function buildMatchFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var width = options.width;
    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
    var matchResult = string.match(matchPattern);
    if (!matchResult) {
      return null;
    }
    var matchedString = matchResult[0];
    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
    var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    }) : findKey(parsePatterns, function (pattern) {
      return pattern.test(matchedString);
    });
    var value;
    value = args.valueCallback ? args.valueCallback(key) : key;
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}
function findKey(object, predicate) {
  for (var key in object) {
    if (object.hasOwnProperty(key) && predicate(object[key])) {
      return key;
    }
  }
  return undefined;
}
function findIndex(array, predicate) {
  for (var key = 0; key < array.length; key++) {
    if (predicate(array[key])) {
      return key;
    }
  }
  return undefined;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ buildMatchPatternFn)
/* harmony export */ });
function buildMatchPatternFn(args) {
  return function (string) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var matchResult = string.match(args.matchPattern);
    if (!matchResult) return null;
    var matchedString = matchResult[0];
    var parseResult = string.match(args.parsePattern);
    if (!parseResult) return null;
    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
    value = options.valueCallback ? options.valueCallback(value) : value;
    var rest = string.slice(matchedString.length);
    return {
      value: value,
      rest: rest
    };
  };
}

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },
  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },
  halfAMinute: 'half a minute',
  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },
  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },
  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },
  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },
  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },
  aboutXWeeks: {
    one: 'about 1 week',
    other: 'about {{count}} weeks'
  },
  xWeeks: {
    one: '1 week',
    other: '{{count}} weeks'
  },
  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },
  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },
  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },
  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },
  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },
  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};
var formatDistance = function formatDistance(token, count, options) {
  var result;
  var tokenValue = formatDistanceLocale[token];
  if (typeof tokenValue === 'string') {
    result = tokenValue;
  } else if (count === 1) {
    result = tokenValue.one;
  } else {
    result = tokenValue.other.replace('{{count}}', count.toString());
  }
  if (options !== null && options !== void 0 && options.addSuffix) {
    if (options.comparison && options.comparison > 0) {
      return 'in ' + result;
    } else {
      return result + ' ago';
    }
  }
  return result;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatDistance);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js");

var dateFormats = {
  full: 'EEEE, MMMM do, y',
  long: 'MMMM do, y',
  medium: 'MMM d, y',
  short: 'MM/dd/yyyy'
};
var timeFormats = {
  full: 'h:mm:ss a zzzz',
  long: 'h:mm:ss a z',
  medium: 'h:mm:ss a',
  short: 'h:mm a'
};
var dateTimeFormats = {
  full: "{{date}} 'at' {{time}}",
  long: "{{date}} 'at' {{time}}",
  medium: '{{date}}, {{time}}',
  short: '{{date}}, {{time}}'
};
var formatLong = {
  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateFormats,
    defaultWidth: 'full'
  }),
  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: timeFormats,
    defaultWidth: 'full'
  }),
  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    formats: dateTimeFormats,
    defaultWidth: 'full'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var formatRelativeLocale = {
  lastWeek: "'last' eeee 'at' p",
  yesterday: "'yesterday at' p",
  today: "'today at' p",
  tomorrow: "'tomorrow at' p",
  nextWeek: "eeee 'at' p",
  other: 'P'
};
var formatRelative = function formatRelative(token, _date, _baseDate, _options) {
  return formatRelativeLocale[token];
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatRelative);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js");

var eraValues = {
  narrow: ['B', 'A'],
  abbreviated: ['BC', 'AD'],
  wide: ['Before Christ', 'Anno Domini']
};
var quarterValues = {
  narrow: ['1', '2', '3', '4'],
  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter']
};

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var monthValues = {
  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
var dayValues = {
  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
var dayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'morning',
    afternoon: 'afternoon',
    evening: 'evening',
    night: 'night'
  }
};
var formattingDayPeriodValues = {
  narrow: {
    am: 'a',
    pm: 'p',
    midnight: 'mi',
    noon: 'n',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  abbreviated: {
    am: 'AM',
    pm: 'PM',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  },
  wide: {
    am: 'a.m.',
    pm: 'p.m.',
    midnight: 'midnight',
    noon: 'noon',
    morning: 'in the morning',
    afternoon: 'in the afternoon',
    evening: 'in the evening',
    night: 'at night'
  }
};
var ordinalNumber = function ordinalNumber(dirtyNumber, _options) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`.
  //
  // `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
  // 'day', 'hour', 'minute', 'second'.

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
    }
  }
  return number + 'th';
};
var localize = {
  ordinalNumber: ordinalNumber,
  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: eraValues,
    defaultWidth: 'wide'
  }),
  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: quarterValues,
    defaultWidth: 'wide',
    argumentCallback: function argumentCallback(quarter) {
      return quarter - 1;
    }
  }),
  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: monthValues,
    defaultWidth: 'wide'
  }),
  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayValues,
    defaultWidth: 'wide'
  }),
  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    values: dayPeriodValues,
    defaultWidth: 'wide',
    formattingValues: formattingDayPeriodValues,
    defaultFormattingWidth: 'wide'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js");
/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js");


var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
var parseOrdinalNumberPattern = /\d+/i;
var matchEraPatterns = {
  narrow: /^(b|a)/i,
  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
  wide: /^(before christ|before common era|anno domini|common era)/i
};
var parseEraPatterns = {
  any: [/^b/i, /^(a|c)/i]
};
var matchQuarterPatterns = {
  narrow: /^[1234]/i,
  abbreviated: /^q[1234]/i,
  wide: /^[1234](th|st|nd|rd)? quarter/i
};
var parseQuarterPatterns = {
  any: [/1/i, /2/i, /3/i, /4/i]
};
var matchMonthPatterns = {
  narrow: /^[jfmasond]/i,
  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};
var parseMonthPatterns = {
  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};
var matchDayPatterns = {
  narrow: /^[smtwf]/i,
  short: /^(su|mo|tu|we|th|fr|sa)/i,
  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};
var parseDayPatterns = {
  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};
var matchDayPeriodPatterns = {
  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
};
var parseDayPeriodPatterns = {
  any: {
    am: /^a/i,
    pm: /^p/i,
    midnight: /^mi/i,
    noon: /^no/i,
    morning: /morning/i,
    afternoon: /afternoon/i,
    evening: /evening/i,
    night: /night/i
  }
};
var match = {
  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    matchPattern: matchOrdinalNumberPattern,
    parsePattern: parseOrdinalNumberPattern,
    valueCallback: function valueCallback(value) {
      return parseInt(value, 10);
    }
  }),
  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchEraPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseEraPatterns,
    defaultParseWidth: 'any'
  }),
  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchQuarterPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseQuarterPatterns,
    defaultParseWidth: 'any',
    valueCallback: function valueCallback(index) {
      return index + 1;
    }
  }),
  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchMonthPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseMonthPatterns,
    defaultParseWidth: 'any'
  }),
  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPatterns,
    defaultMatchWidth: 'wide',
    parsePatterns: parseDayPatterns,
    defaultParseWidth: 'any'
  }),
  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
    matchPatterns: matchDayPeriodPatterns,
    defaultMatchWidth: 'any',
    parsePatterns: parseDayPeriodPatterns,
    defaultParseWidth: 'any'
  })
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js");
/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js");
/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js");
/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js");
/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js");





/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
 */
var locale = {
  code: 'en-US',
  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */
function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument);

  // Clone the date
  if (argument instanceof Date || (0,_babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments");
      // eslint-disable-next-line no-console
      console.warn(new Error().stack);
    }
    return new Date(NaN);
  }
}

/***/ }),

/***/ "./src/js/PubSub.js":
/*!**************************!*\
  !*** ./src/js/PubSub.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PubSub: () => (/* binding */ PubSub)
/* harmony export */ });
const PubSub = (() => {
  const NOT_PRESENT_IN_THE_ARRAY = -1;
  const events = {};

  function debugEventAnnounce(event) {
    console.log(`[debug] EVENT ${event} IS CALLED`);
  }

  function emit(event, param = null) {
    if (events[event]) {
      debugEventAnnounce(event);
      for (let func of events[event]) {
        func(param);
      }
    } else {
      alert(`There is no event with a name '${event}'`);
    }
  }

  function on(event, func) {
    if (events[event]) {
      events[event].push(func);
    } else {
      events[event] = [func];
    }
  }

  function off(event, func) {
    if (events[event]) {
      const indexOfGivenFunction = events[event].indexOf(func);
      if (indexOfGivenFunction !== NOT_PRESENT_IN_THE_ARRAY) {
        events[event].splice(indexOfGivenFunction, 1);
      }
    } else {
      alert(
        `There is either no such event (${event}) registered, or your function isn't present there`
      );
    }
  }

  return { emit, on, off };
})();


/***/ }),

/***/ "./src/js/formManagement/form-manager.js":
/*!***********************************************!*\
  !*** ./src/js/formManagement/form-manager.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FORM_REGISTRY: () => (/* binding */ FORM_REGISTRY)
/* harmony export */ });
/* harmony import */ var _form_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-utilities */ "./src/js/formManagement/form-utilities.js");
/* harmony import */ var _managers_subtask_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./managers/subtask-manager */ "./src/js/formManagement/managers/subtask-manager.js");
const { PubSub } = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");



const FORM_REGISTRY = {};
const MODES = { CREATION: 0, EDITING: 1, INFORMATION: 2 };

const createSubtaskButton = document.getElementById("create-subtask-button");
createSubtaskButton.addEventListener("click", createSubtask);

const listForm = registerForm("list-form-background", "List");
const taskForm = registerForm("task-form-background", "Task");
const parentList = document.getElementById("parentList");
registerManager(
  taskForm,
  new _managers_subtask_manager__WEBPACK_IMPORTED_MODULE_1__.SubtaskManager(taskForm),
  "subtaskManager",
  "subtasks"
);

function registerManager(
  workingForm,
  managerReference,
  managerName,
  inputPropertyName
) {
  workingForm.managers[managerName] = {
    reference: managerReference,
    name: inputPropertyName,
  };
}

function createSubtask() {
  const subtaskManagerReference = taskForm.managers.subtaskManager.reference;
  if (!subtaskManagerReference.isInsideParentForm()) {
    const rows = taskForm.form.querySelectorAll(".row");
    const lastRow = rows[rows.length - 1];
    subtaskManagerReference.setup({
      nodeBeforeWhichToPutSection: lastRow,
    });
  }
  subtaskManagerReference.addSubtask();
}

function registerForm(backgroundId, codename) {
  FORM_REGISTRY[codename] = codename;
  const formBackground = document.getElementById(backgroundId);
  return {
    background: formBackground,
    form: formBackground.querySelector("form"),
    title: formBackground.getElementsByClassName("form-title")[0],
    mode: MODES.CREATION,
    managers: {},
  };
}

function getFormData(formType) {
  const workingForm = getWorkingForm(formType);

  const formInputData = {};
  Array.from(workingForm.form.elements).forEach((current) => {
    if (current.nodeName !== "BUTTON") {
      const inputContentType = current.id;
      formInputData[inputContentType] = _form_utilities__WEBPACK_IMPORTED_MODULE_0__.trimInput(current.value);
    }
  });
  if (workingForm.managers) {
    for (let manager of Object.values(workingForm.managers)) {
      formInputData[manager.name] = manager.reference.getData();
      manager.reference.reset();
    }
  }

  let path = null;
  if (workingForm.mode === MODES.EDITING) {
    path = _form_utilities__WEBPACK_IMPORTED_MODULE_0__.getEntityPath(workingForm, formType);
  }

  if (workingForm.mode === MODES.CREATION) {
    PubSub.emit(formType + "IsReadyForCreation", formInputData);
  } else if (workingForm.mode === MODES.EDITING) {
    PubSub.emit(formType + "IsReadyForEditing", {
      data: formInputData,
      path,
    });
  }
  resetForm(formType);
}

function getWorkingForm(formType) {
  switch (formType) {
    case FORM_REGISTRY.List:
      return listForm;
    case FORM_REGISTRY.Task:
      return taskForm;
  }
}

function resetForm(formType) {
  const workingForm = getWorkingForm(formType);
  workingForm.form.reset();
  workingForm.form.removeAttribute("data-${formType}-list-id");

  workingForm.title.textContent = `Create a new ${formType}`;
  workingForm.mode = MODES.CREATION;

  const finishUsingFormButton =
    workingForm.form.querySelector(".finish-button");
  finishUsingFormButton.style.display = "inline";

  for (let manager of Object.values(workingForm.managers)) {
    manager.reference.reset();
  }
}

function openForm(formType) {
  const workingForm = getWorkingForm(formType);
  workingForm.background.style.display = "flex";

  if (workingForm === taskForm) {
    PubSub.emit("GetListRegistry");
  }
}

function closeForm(formType) {
  const workingForm = getWorkingForm(formType);
  workingForm.background.style.display = "none";

  if (workingForm.mode !== MODES.CREATION) {
    resetForm(formType);
  }
}

function setupParentListSelection(registry) {
  let parentListContent = "";
  registry.forEach((list) => {
    parentListContent += `<option value="${list.id}">${list.name}</option>`;
  });
  parentList.innerHTML = parentListContent;
}

function setParentListSelectionToValue(id) {
  parentList.value = id;
}

function prepareFormForEditingMode(data) {
  const formType = data.formType;
  const entity = data.entity;

  const workingForm = getWorkingForm(formType);
  const datasetPropertyName = `editable${formType}Id`;

  workingForm.title.textContent = `Edit a ${data.formType}`;
  workingForm.mode = MODES.EDITING;

  Array.from(workingForm.form.elements).forEach((node) => {
    if (node.nodeName !== "BUTTON") {
      node.value = entity[node.id];
    }
  });
  for (let manager of Object.values(workingForm.managers)) {
    const rows = workingForm.form.querySelectorAll(".row");
    const lastRow = rows[rows.length - 1];
    console.log(manager, entity);
    manager.reference.setup({ entity, nodeBeforeWhichToPutSection: lastRow });
  }

  if (formType === FORM_REGISTRY.List) {
    workingForm.form.dataset[datasetPropertyName] = entity.id;
  } else if (formType === FORM_REGISTRY.Task) {
    workingForm.form.dataset[
      datasetPropertyName
    ] = `${entity.parentList}:${entity.id}`;
  }
}

PubSub.on("OpenForm", openForm);
PubSub.on("CloseForm", closeForm);

PubSub.on("UserFinishedUsingForm", getFormData);
PubSub.on("ListRegistryGetsReturned", setupParentListSelection);
PubSub.on("ListIdGetsReturned", setParentListSelectionToValue);

PubSub.on("UserWantsToEditList", prepareFormForEditingMode);
PubSub.on("UserWantsToEditTask", prepareFormForEditingMode);


/***/ }),

/***/ "./src/js/formManagement/form-utilities.js":
/*!*************************************************!*\
  !*** ./src/js/formManagement/form-utilities.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getEntityPath: () => (/* binding */ getEntityPath),
/* harmony export */   trimInput: () => (/* binding */ trimInput)
/* harmony export */ });
function trimInput(inputValue) {
  return inputValue.trim();
}

function getEntityPath(workingForm, formType) {
  const datasetQuery = `editable${formType}Id`;
  const editableEntityId = workingForm.form.dataset[datasetQuery];
  const pathArray = editableEntityId.split(":");
  const path = { listId: pathArray[0], taskId: pathArray[1] };
  return path;
}


/***/ }),

/***/ "./src/js/formManagement/managers/subtask-manager.js":
/*!***********************************************************!*\
  !*** ./src/js/formManagement/managers/subtask-manager.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubtaskManager: () => (/* binding */ SubtaskManager)
/* harmony export */ });
/* harmony import */ var _subtaskManagement_subtask_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../subtaskManagement/subtask-creator */ "./src/js/subtaskManagement/subtask-creator.js");
/* harmony import */ var _subtaskManagement_subtask_registrar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../subtaskManagement/subtask-registrar */ "./src/js/subtaskManagement/subtask-registrar.js");
/* harmony import */ var _subtaskManagement_subtask_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../subtaskManagement/subtask-renderer */ "./src/js/subtaskManagement/subtask-renderer.js");




class SubtaskManager {
  constructor(parentForm) {
    this.parentForm = parentForm;
    this.subtaskSection = document.createElement("div");
    this.subtaskSection.id = "subtask-section";

    this.subtaskCreator = new _subtaskManagement_subtask_creator__WEBPACK_IMPORTED_MODULE_0__.SubtaskCreator();
    this.subtaskRegistrar = new _subtaskManagement_subtask_registrar__WEBPACK_IMPORTED_MODULE_1__.SubtaskRegistrar();
    this.subtaskRenderer = new _subtaskManagement_subtask_renderer__WEBPACK_IMPORTED_MODULE_2__.SubtaskRenderer(this.subtaskSection);
  }

  isInsideParentForm() {
    return this.parentForm.form.contains(this.subtaskSection);
  }

  setup({ nodeBeforeWhichToPutSection = null, entity = null }) {
    if (entity) {
      entity.subtasks.forEach((subtask) => {
        this.addSubtask(subtask);
      });
    }
    if (nodeBeforeWhichToPutSection) {
      this.parentForm.form.insertBefore(
        this.subtaskSection,
        nodeBeforeWhichToPutSection
      );
    } else {
      this.parentForm.form.appendChild(this.subtaskSection);
    }
  }

  addSubtask(subtask) {
    const newSubtask = subtask ? subtask : this.subtaskCreator.createSubtask();
    this.subtaskRegistrar.registerSubtask(newSubtask);
    this.subtaskRenderer.renderSubtask(newSubtask);
    this.subtaskRegistrar.updateIds();
  }

  getData() {
    return this.subtaskRegistrar.getSubtasks(this.subtaskSection);
  }

  reset() {
    const registry = this.subtaskRegistrar.getSubtasks();
    this.subtaskRenderer.unrenderSubtasks(registry);

    this.subtaskRegistrar.resetRegistry();
    this.subtaskSection.innerHTML = "";
    this.subtaskSection.remove();
  }
}


/***/ }),

/***/ "./src/js/listManagement/list-bundle.js":
/*!**********************************************!*\
  !*** ./src/js/listManagement/list-bundle.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-creator */ "./src/js/listManagement/list-creator.js");
/* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./list-registrar */ "./src/js/listManagement/list-registrar.js");
/* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_list_registrar__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _list_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./list-renderer */ "./src/js/listManagement/list-renderer.js");





/***/ }),

/***/ "./src/js/listManagement/list-creator.js":
/*!***********************************************!*\
  !*** ./src/js/listManagement/list-creator.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formManagement/form-manager */ "./src/js/formManagement/form-manager.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./src/js/utilities.js");
/* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list */ "./src/js/listManagement/list.js");





function createDefaultList() {
  const creationData = { name: "Default", color: "#ccc" };
  const defaultList = new _list__WEBPACK_IMPORTED_MODULE_3__.List(creationData);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", defaultList);
}

function createNewList(newData) {
  const list = new _list__WEBPACK_IMPORTED_MODULE_3__.List(newData);
  addNonDefaultListButtons(list);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
}

function addNonDefaultListButtons(list) {
  list.EditListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
    "edit",
    "edit-button",
    list,
    "EditListButton"
  );
  list.EditListButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditList", {
      entity: list,
      formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List,
    });
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
  });

  list.RemoveListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
    "x",
    "remove-button",
    list,
    "RemoveListButton"
  );
  list.RemoveListButton.addEventListener("click", () => {
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListShouldBeRemoved", list);
  });
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListIsReadyForCreation", createNewList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("CreateDefaultList", createDefaultList);


/***/ }),

/***/ "./src/js/listManagement/list-registrar.js":
/*!*************************************************!*\
  !*** ./src/js/listManagement/list-registrar.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

const { PubSub } = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");

const LIST_REGISTRY = [];

function addListToRegistry(list) {
  LIST_REGISTRY.push(list);
  list.id = LIST_REGISTRY.length - 1;
  const listData = { list, listId: LIST_REGISTRY.length - 1 };
  PubSub.emit("ListRegistered", listData);
}

function updateListIds() {
  for (let i = 1; i < LIST_REGISTRY.length; i++) {
    const list = LIST_REGISTRY[i];
    list.id = i;
    list.div.dataset.listId = i;
  }
}

function removeListFromRegistry(list) {
  LIST_REGISTRY.splice(list.id, 1);
  updateListIds();
}

function editList(listData) {
  const editableList = LIST_REGISTRY[listData.path.listId];
  for (const [key, value] of Object.entries(listData.data)) {
    editableList[key] = value;
  }
  PubSub.emit("listShouldBeRerendered", {
    list: editableList,
    listId: editableList.id,
  });
}

function getListRegistry() {
  PubSub.emit("ListRegistryGetsReturned", LIST_REGISTRY);
}

PubSub.on("ListPending", addListToRegistry);
PubSub.on("ListShouldBeRemoved", removeListFromRegistry);
PubSub.on("ListIsReadyForEditing", editList);
PubSub.on("GetListRegistry", getListRegistry);


/***/ }),

/***/ "./src/js/listManagement/list-renderer.js":
/*!************************************************!*\
  !*** ./src/js/listManagement/list-renderer.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utilities */ "./src/js/utilities.js");



const listDisplay = document.getElementById("lists");

function renderList(listData) {
  const list = listData.list;

  const listDiv = list.div;
  listDiv.dataset.listId = listData.listId;
  listDiv.classList.add("list");
  listDiv.style.borderColor = list.color;

  (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.appendEntity)(listDisplay, "list", list, listDiv);

  const listRow = document.createElement("div");
  listRow.classList.add("list-row");
  listDiv.appendChild(listRow);

  const listNameText = document.createElement("p");
  listNameText.classList.add("list-name");
  listNameText.textContent = list.name;
  listRow.appendChild(listNameText);

  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons-row");
  listRow.appendChild(buttonsDiv);

  renderAllListButtons(list, buttonsDiv);

  const hr = document.createElement("hr");
  listDiv.appendChild(hr);

  const taskSection = document.createElement("div");
  taskSection.classList.add("task-section");
  listDiv.appendChild(taskSection);
}

function renderAllListButtons(list, buttonsDiv) {
  Object.values(list.buttons).forEach((button) => {
    buttonsDiv.appendChild(button);
  });
}

function stopRenderingList(list) {
  (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.removeEntityDiv)(list);
}

function rerenderList(listData) {
  stopRenderingList(listData.list);
  renderList(listData);
}

_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("DefaultListPending", renderList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListRegistered", renderList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("ListShouldBeRemoved", stopRenderingList);
_PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("listShouldBeRerendered", rerenderList);


/***/ }),

/***/ "./src/js/listManagement/list-utilities.js":
/*!*************************************************!*\
  !*** ./src/js/listManagement/list-utilities.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   checkTask: () => (/* binding */ checkTask),
/* harmony export */   deleteTask: () => (/* binding */ deleteTask),
/* harmony export */   editTask: () => (/* binding */ editTask),
/* harmony export */   establishNewTask: () => (/* binding */ establishNewTask),
/* harmony export */   setupTaskHelpers: () => (/* binding */ setupTaskHelpers),
/* harmony export */   uncheckTask: () => (/* binding */ uncheckTask)
/* harmony export */ });
/* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../taskManagement/task-creator */ "./src/js/taskManagement/task-creator.js");
/* harmony import */ var _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../taskManagement/task-registrar */ "./src/js/taskManagement/task-registrar.js");
/* harmony import */ var _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../taskManagement/task-renderer */ "./src/js/taskManagement/task-renderer.js");




function setupTaskHelpers(list) {
  list.taskCreator = new _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_0__.TaskCreator();
  list.taskRegistrar = new _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_1__.TaskRegistrar();
  list.taskRenderer = new _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_2__.TaskRenderer(list.div);
}

function establishNewTask(taskData) {
  if (taskBelongsToThisList(taskData.parentList, this.id)) {
    const task = this.taskCreator.createTask(taskData);
    this.taskRegistrar.registerTask(task);
    this.taskRenderer.renderTask(this.div, task);
    console.log(task);
  }
}

function editTask(taskData) {
  if (taskBelongsToThisList(taskData.path.listId, this.id)) {
    const editedTask = this.taskRegistrar.editTask(taskData);
    this.taskRenderer.rerenderTask(this.div, editedTask);
    console.log(task);
  }
}

function deleteTask(task) {
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.deleteTask(task);
    this.taskRenderer.stopRenderingTask(task);
  }
}

function checkTask(task) {
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.setTaskFinished({ task, finished: true });
    this.taskRenderer.renderTaskAsChecked(task.div);
  }
}

function uncheckTask(task) {
  if (taskBelongsToThisList(task.parentList, this.id)) {
    this.taskRegistrar.setTaskFinished({ task, finished: false });
    this.taskRenderer.renderTaskAsUnchecked(task.div);
  }
}

function taskBelongsToThisList(listNameTaskIsLookingFor, currentListName) {
  return listNameTaskIsLookingFor == currentListName;
}


/***/ }),

/***/ "./src/js/listManagement/list.js":
/*!***************************************!*\
  !*** ./src/js/listManagement/list.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   List: () => (/* binding */ List)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formManagement/form-manager */ "./src/js/formManagement/form-manager.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./src/js/utilities.js");
/* harmony import */ var _list_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./list-utilities */ "./src/js/listManagement/list-utilities.js");





class List {
  id = null;
  div = document.createElement("div");
  buttons = {};

  constructor(data) {
    this.name = data.name || "Unnamed";
    this.color = data.color;

    this.SortListButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "sort",
      "sort-button",
      this,
      "SortListButton"
    );
    this.AddTaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)("+", "add-button", this, "AddTaskButton");
    this.AddTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListIdGetsReturned", this.id);
    });

    _list_utilities__WEBPACK_IMPORTED_MODULE_3__.setupTaskHelpers(this);
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskIsReadyForCreation", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.establishNewTask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskIsReadyForEditing", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.editTask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("UserWantsToDeleteTask", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.deleteTask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskChecked", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.checkTask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("TaskUnchecked", _list_utilities__WEBPACK_IMPORTED_MODULE_3__.uncheckTask.bind(this));
  }
}


/***/ }),

/***/ "./src/js/subtaskManagement/subtask-creator.js":
/*!*****************************************************!*\
  !*** ./src/js/subtaskManagement/subtask-creator.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubtaskCreator: () => (/* binding */ SubtaskCreator)
/* harmony export */ });
/* harmony import */ var _subtask__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subtask */ "./src/js/subtaskManagement/subtask.js");


class SubtaskCreator {
  constructor() {}

  createSubtask() {
    return new _subtask__WEBPACK_IMPORTED_MODULE_0__.Subtask();
  }
}


/***/ }),

/***/ "./src/js/subtaskManagement/subtask-registrar.js":
/*!*******************************************************!*\
  !*** ./src/js/subtaskManagement/subtask-registrar.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubtaskRegistrar: () => (/* binding */ SubtaskRegistrar)
/* harmony export */ });
class SubtaskRegistrar {
  subtaskRegistry = [];

  constructor() {}

  registerSubtask(subtask) {
    this.subtaskRegistry.push(subtask);
    console.log(this.subtaskRegistry);
  }

  updateIds() {
    this.subtaskRegistry.forEach((subtask, index) => {
      subtask.id = index;
    });
  }

  getSubtasks() {
    return this.subtaskRegistry;
  }

  resetRegistry() {
    this.subtaskRegistry = [];
    console.log(this.subtaskRegistry);
  }
}


/***/ }),

/***/ "./src/js/subtaskManagement/subtask-renderer.js":
/*!******************************************************!*\
  !*** ./src/js/subtaskManagement/subtask-renderer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SubtaskRenderer: () => (/* binding */ SubtaskRenderer)
/* harmony export */ });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities */ "./src/js/utilities.js");


class SubtaskRenderer {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  renderSubtask(subtask) {
    const subtaskDiv = subtask.div;
    subtaskDiv.classList.add("subtask-div");
    this.parentDiv.appendChild(subtaskDiv);

    const subtaskContentInput = document.createElement("input");
    subtaskContentInput.classList.add("subtask-content");

    subtaskDiv.appendChild(subtaskContentInput);
    if (subtask) {
      subtaskContentInput.textContent = subtask.content;
    }
    console.log(subtaskDiv);
  }

  unrenderSubtasks(subtasksRegistry) {
    subtasksRegistry.forEach((item) => {
      item.div.innerHTML = "";
    });
  }
}


/***/ }),

/***/ "./src/js/subtaskManagement/subtask.js":
/*!*********************************************!*\
  !*** ./src/js/subtaskManagement/subtask.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subtask: () => (/* binding */ Subtask)
/* harmony export */ });
class Subtask {
  div = document.createElement("div");
  content = "";
  id = null;

  constructor() {}
}


/***/ }),

/***/ "./src/js/taskManagement/task-creator.js":
/*!***********************************************!*\
  !*** ./src/js/taskManagement/task-creator.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskCreator: () => (/* binding */ TaskCreator)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/js/taskManagement/task.js");


class TaskCreator {
  constructor() {}

  createTask(taskData) {
    return new _task__WEBPACK_IMPORTED_MODULE_0__.Task(taskData);
  }
}


/***/ }),

/***/ "./src/js/taskManagement/task-registrar.js":
/*!*************************************************!*\
  !*** ./src/js/taskManagement/task-registrar.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskRegistrar: () => (/* binding */ TaskRegistrar)
/* harmony export */ });
class TaskRegistrar {
  TASK_REGISTRY = [];

  constructor() {}

  registerTask(task) {
    this.TASK_REGISTRY.push(task);
    task.id = this.TASK_REGISTRY.length - 1;
  }

  updateIds() {
    this.TASK_REGISTRY.forEach((task, index) => {
      task.id = index;
    });
  }

  editTask(taskData) {
    const editableTask = this.TASK_REGISTRY[taskData.path.taskId];
    for (const [key, value] of Object.entries(taskData.data)) {
      editableTask[key] = value;
    }
    return editableTask;
  }

  setTaskFinished(data) {
    data.task.finished = data.finished;
  }

  deleteTask(task) {
    this.TASK_REGISTRY.splice(task.id, 1);
    this.updateIds();
  }
}


/***/ }),

/***/ "./src/js/taskManagement/task-renderer.js":
/*!************************************************!*\
  !*** ./src/js/taskManagement/task-renderer.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TaskRenderer: () => (/* binding */ TaskRenderer)
/* harmony export */ });
/* harmony import */ var date_fns_isPast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! date-fns/isPast */ "./node_modules/date-fns/esm/isPast/index.js");
/* harmony import */ var date_fns_formatDistanceToNowStrict__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! date-fns/formatDistanceToNowStrict */ "./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utilities */ "./src/js/utilities.js");




class TaskRenderer {
  construct() {}

  renderTask(parentListDiv, task) {
    const parentListTaskSection = parentListDiv.querySelector(".task-section");

    const taskDiv = task.div;
    taskDiv.classList.add("task");
    (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.appendEntity)(parentListTaskSection, "task", task, taskDiv);

    taskDiv.appendChild(task.finishTaskCheckbox);

    const taskNameText = document.createElement("p");
    taskNameText.classList.add("task-name");
    taskNameText.textContent = task.name;
    taskDiv.appendChild(taskNameText);

    const taskDueDate = document.createElement("p");
    taskDueDate.classList.add("due-date");
    taskDueDate.textContent = (0,date_fns_formatDistanceToNowStrict__WEBPACK_IMPORTED_MODULE_1__["default"])(task.dueDate);
    setupPostponedClass(task.dueDate, taskDueDate);
    taskDiv.appendChild(taskDueDate);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons-row");
    taskDiv.appendChild(buttonsDiv);

    this.renderTaskButtons(buttonsDiv, task);
    this.renderTaskAsUnchecked(taskDiv);
  }

  renderTaskButtons(buttonsDiv, task) {
    Object.values(task.buttons).forEach((button) => {
      buttonsDiv.appendChild(button);
    });
  }

  rerenderTask(parentListDiv, task) {
    this.stopRenderingTask(task);
    this.renderTask(parentListDiv, task);
  }

  renderTaskAsChecked(taskDiv) {
    taskDiv.classList.remove("unchecked-task");
    taskDiv.classList.add("checked-task");
  }

  renderTaskAsUnchecked(taskDiv) {
    taskDiv.classList.remove("checked-task");
    taskDiv.classList.add("unchecked-task");
  }

  stopRenderingTask(task) {
    (0,_utilities__WEBPACK_IMPORTED_MODULE_0__.removeEntityDiv)(task);
  }
}

function setupPostponedClass(dueDateValue, taskDueDateElement) {
  if (isPostponed(dueDateValue)) {
    taskDueDateElement.classList.add("postponed");
  } else {
    taskDueDateElement.classList.remove("postponed");
  }
}

function isPostponed(dueDateValue) {
  return (0,date_fns_isPast__WEBPACK_IMPORTED_MODULE_2__["default"])(dueDateValue);
}


/***/ }),

/***/ "./src/js/taskManagement/task-utilities.js":
/*!*************************************************!*\
  !*** ./src/js/taskManagement/task-utilities.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   setupDueDate: () => (/* binding */ setupDueDate)
/* harmony export */ });
function setupDueDate(dueDateString) {
  if (dueDateString) {
    return new Date(dueDateString);
  } else {
    return new Date();
  }
}


/***/ }),

/***/ "./src/js/taskManagement/task.js":
/*!***************************************!*\
  !*** ./src/js/taskManagement/task.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Task: () => (/* binding */ Task)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../formManagement/form-manager */ "./src/js/formManagement/form-manager.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utilities */ "./src/js/utilities.js");
/* harmony import */ var _task_utilities__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./task-utilities */ "./src/js/taskManagement/task-utilities.js");





class Task {
  id = null;
  finished = false;
  div = document.createElement("div");
  buttons = {};

  constructor(taskData) {
    this.name = taskData.name || "Unnamed";
    this.description = taskData.description;
    this._dueDate = (0,_task_utilities__WEBPACK_IMPORTED_MODULE_3__.setupDueDate)(taskData.dueDate);
    this.subtasks = taskData.subtasks;
    this.priority = taskData.priority;
    this.parentList = taskData.parentList;

    this.div.addEventListener("click", (e) => {
      if (e.target.classList.contains("task") || e.target.nodeName === "P") {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditTask", {
          formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task,
          entity: this,
        });
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
      }
    });

    this.finishTaskCheckbox = document.createElement("input");
    this.finishTaskCheckbox.setAttribute("type", "checkbox");
    this.finishTaskCheckbox.addEventListener("change", (e) => {
      if (e.currentTarget.checked) {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskChecked", this);
      } else {
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("TaskUnchecked", this);
      }
    });

    this.EditTaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "edit",
      "edit-button",
      this,
      "EditTaskButton"
    );
    this.EditTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToEditTask", {
        formType: _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task,
        entity: this,
      });
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
    });

    this.DeleteTaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
      "x",
      "delete-button",
      this,
      "DeleteTaskButton"
    );
    this.DeleteTaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToDeleteTask", this);
    });
  }

  removeDiv() {
    this.div.remove();
    this.div = document.createElement("div");
  }

  get dueDate() {
    return this._dueDate;
  }

  set dueDate(value) {
    this._dueDate = (0,_task_utilities__WEBPACK_IMPORTED_MODULE_3__.setupDueDate)(value);
  }
}


/***/ }),

/***/ "./src/js/unique-button-manager.js":
/*!*****************************************!*\
  !*** ./src/js/unique-button-manager.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   finishUsingListFormButton: () => (/* binding */ finishUsingListFormButton),
/* harmony export */   finishUsingTaskFormButton: () => (/* binding */ finishUsingTaskFormButton),
/* harmony export */   listFormCloseButton: () => (/* binding */ listFormCloseButton),
/* harmony export */   listFormOpenButton: () => (/* binding */ listFormOpenButton),
/* harmony export */   taskFormCloseButton: () => (/* binding */ taskFormCloseButton)
/* harmony export */ });
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formManagement/form-manager */ "./src/js/formManagement/form-manager.js");



const listFormOpenButton = document.getElementById(
  "list-form-open-button"
);
listFormOpenButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("OpenForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
});

const listFormCloseButton = document.getElementById(
  "list-form-close-button"
);
listFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
});

const finishUsingListFormButton =
  document.getElementById("finish-list-button");
finishUsingListFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.List);
});

const taskFormCloseButton = document.getElementById(
  "task-form-close-button"
);
taskFormCloseButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
});

const finishUsingTaskFormButton =
  document.getElementById("finish-task-button");
finishUsingTaskFormButton.addEventListener("click", () => {
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserFinishedUsingForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
  _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("CloseForm", _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__.FORM_REGISTRY.Task);
});


/***/ }),

/***/ "./src/js/utilities.js":
/*!*****************************!*\
  !*** ./src/js/utilities.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   appendEntity: () => (/* binding */ appendEntity),
/* harmony export */   removeEntityDiv: () => (/* binding */ removeEntityDiv),
/* harmony export */   setupButton: () => (/* binding */ setupButton)
/* harmony export */ });
function setupButton(name, className, parent, buttonArrayName) {
  const button = document.createElement("button");
  button.textContent = name;
  button.classList.add(className);
  parent.buttons[buttonArrayName] = button;
  return button;
}

function removeEntityDiv(entity) {
  entity.div.remove();
  entity.div = document.createElement("div");
}

function appendEntity(parent, className, entity, entityDiv) {
  const siblingEntityToPutAfter =
    parent.getElementsByClassName(className)[entity.id - 1];
  if (siblingEntityToPutAfter) {
    insertAfter(siblingEntityToPutAfter, entityDiv);
  } else {
    parent.prepend(entityDiv);
  }
}

function insertAfter(nodeToPutAfter, newNode) {
  nodeToPutAfter.parentNode.insertBefore(newNode, nodeToPutAfter.nextSibling);
}


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _unique_button_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./unique-button-manager */ "./src/js/unique-button-manager.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formManagement/form-manager */ "./src/js/formManagement/form-manager.js");
/* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./listManagement/list-bundle */ "./src/js/listManagement/list-bundle.js");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PubSub */ "./src/js/PubSub.js");





_PubSub__WEBPACK_IMPORTED_MODULE_3__.PubSub.emit("CreateDefaultList");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOaUM7QUFDTTtBQUNEO0FBQ0o7O0FBRWxDLDJDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9jbG9uZU9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2RlZmF1bHRMb2NhbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vY29tcGFyZUFzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXREaXN0YW5jZVN0cmljdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0L2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzUGFzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9tYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vdG9EYXRlL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvUHViU3ViLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvZm9ybU1hbmFnZW1lbnQvZm9ybS11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9mb3JtTWFuYWdlbWVudC9tYW5hZ2Vycy9zdWJ0YXNrLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZS5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2xpc3RNYW5hZ2VtZW50L2xpc3QtY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2xpc3RNYW5hZ2VtZW50L2xpc3QtdXRpbGl0aWVzLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvbGlzdE1hbmFnZW1lbnQvbGlzdC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL3N1YnRhc2tNYW5hZ2VtZW50L3N1YnRhc2stY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL3N1YnRhc2tNYW5hZ2VtZW50L3N1YnRhc2stcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL3N1YnRhc2tNYW5hZ2VtZW50L3N1YnRhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy90YXNrTWFuYWdlbWVudC90YXNrLWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy90YXNrTWFuYWdlbWVudC90YXNrLXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy90YXNrTWFuYWdlbWVudC90YXNrLXV0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL3Rhc2tNYW5hZ2VtZW50L3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy91bmlxdWUtYnV0dG9uLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy91dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2YuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBvYmplY3QpIHtcbiAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYXNzaWduIHJlcXVpcmVzIHRoYXQgaW5wdXQgcGFyYW1ldGVyIG5vdCBiZSBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICB9XG4gIGZvciAodmFyIHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSkpIHtcbiAgICAgIDtcbiAgICAgIHRhcmdldFtwcm9wZXJ0eV0gPSBvYmplY3RbcHJvcGVydHldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufSIsImltcG9ydCBhc3NpZ24gZnJvbSBcIi4uL2Fzc2lnbi9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiBhc3NpZ24oe30sIG9iamVjdCk7XG59IiwiaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uLy4uL2xvY2FsZS9lbi1VUy9pbmRleC5qc1wiO1xuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdExvY2FsZTsiLCJ2YXIgZGVmYXVsdE9wdGlvbnMgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiBnZXREZWZhdWx0T3B0aW9ucygpIHtcbiAgcmV0dXJuIGRlZmF1bHRPcHRpb25zO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldERlZmF1bHRPcHRpb25zKG5ld09wdGlvbnMpIHtcbiAgZGVmYXVsdE9wdGlvbnMgPSBuZXdPcHRpb25zO1xufSIsIi8qKlxuICogR29vZ2xlIENocm9tZSBhcyBvZiA2Ny4wLjMzOTYuODcgaW50cm9kdWNlZCB0aW1lem9uZXMgd2l0aCBvZmZzZXQgdGhhdCBpbmNsdWRlcyBzZWNvbmRzLlxuICogVGhleSB1c3VhbGx5IGFwcGVhciBmb3IgZGF0ZXMgdGhhdCBkZW5vdGUgdGltZSBiZWZvcmUgdGhlIHRpbWV6b25lcyB3ZXJlIGludHJvZHVjZWRcbiAqIChlLmcuIGZvciAnRXVyb3BlL1ByYWd1ZScgdGltZXpvbmUgdGhlIG9mZnNldCBpcyBHTVQrMDA6NTc6NDQgYmVmb3JlIDEgT2N0b2JlciAxODkxXG4gKiBhbmQgR01UKzAxOjAwOjAwIGFmdGVyIHRoYXQgZGF0ZSlcbiAqXG4gKiBEYXRlI2dldFRpbWV6b25lT2Zmc2V0IHJldHVybnMgdGhlIG9mZnNldCBpbiBtaW51dGVzIGFuZCB3b3VsZCByZXR1cm4gNTcgZm9yIHRoZSBleGFtcGxlIGFib3ZlLFxuICogd2hpY2ggd291bGQgbGVhZCB0byBpbmNvcnJlY3QgY2FsY3VsYXRpb25zLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyB0aGUgdGltZXpvbmUgb2Zmc2V0IGluIG1pbGxpc2Vjb25kcyB0aGF0IHRha2VzIHNlY29uZHMgaW4gYWNjb3VudC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlKSB7XG4gIHZhciB1dGNEYXRlID0gbmV3IERhdGUoRGF0ZS5VVEMoZGF0ZS5nZXRGdWxsWWVhcigpLCBkYXRlLmdldE1vbnRoKCksIGRhdGUuZ2V0RGF0ZSgpLCBkYXRlLmdldEhvdXJzKCksIGRhdGUuZ2V0TWludXRlcygpLCBkYXRlLmdldFNlY29uZHMoKSwgZGF0ZS5nZXRNaWxsaXNlY29uZHMoKSkpO1xuICB1dGNEYXRlLnNldFVUQ0Z1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSAtIHV0Y0RhdGUuZ2V0VGltZSgpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlcXVpcmVkQXJncyhyZXF1aXJlZCwgYXJncykge1xuICBpZiAoYXJncy5sZW5ndGggPCByZXF1aXJlZCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocmVxdWlyZWQgKyAnIGFyZ3VtZW50JyArIChyZXF1aXJlZCA+IDEgPyAncycgOiAnJykgKyAnIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJncy5sZW5ndGggKyAnIHByZXNlbnQnKTtcbiAgfVxufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgY29tcGFyZUFzY1xuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAtMSwgMCBvciAxLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kLFxuICogLTEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYmVmb3JlIHRoZSBzZWNvbmQgb3IgMCBpZiBkYXRlcyBhcmUgZXF1YWwuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZUxlZnQgLSB0aGUgZmlyc3QgZGF0ZSB0byBjb21wYXJlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHJldHVybnMge051bWJlcn0gdGhlIHJlc3VsdCBvZiB0aGUgY29tcGFyaXNvblxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb21wYXJlIDExIEZlYnJ1YXJ5IDE5ODcgYW5kIDEwIEp1bHkgMTk4OTpcbiAqIGNvbnN0IHJlc3VsdCA9IGNvbXBhcmVBc2MobmV3IERhdGUoMTk4NywgMSwgMTEpLCBuZXcgRGF0ZSgxOTg5LCA2LCAxMCkpXG4gKiAvLz0+IC0xXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNvcnQgdGhlIGFycmF5IG9mIGRhdGVzOlxuICogY29uc3QgcmVzdWx0ID0gW1xuICogICBuZXcgRGF0ZSgxOTk1LCA2LCAyKSxcbiAqICAgbmV3IERhdGUoMTk4NywgMSwgMTEpLFxuICogICBuZXcgRGF0ZSgxOTg5LCA2LCAxMClcbiAqIF0uc29ydChjb21wYXJlQXNjKVxuICogLy89PiBbXG4gKiAvLyAgIFdlZCBGZWIgMTEgMTk4NyAwMDowMDowMCxcbiAqIC8vICAgTW9uIEp1bCAxMCAxOTg5IDAwOjAwOjAwLFxuICogLy8gICBTdW4gSnVsIDAyIDE5OTUgMDA6MDA6MDBcbiAqIC8vIF1cbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29tcGFyZUFzYyhkaXJ0eURhdGVMZWZ0LCBkaXJ0eURhdGVSaWdodCkge1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZUxlZnQpO1xuICB2YXIgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZVJpZ2h0KTtcbiAgdmFyIGRpZmYgPSBkYXRlTGVmdC5nZXRUaW1lKCkgLSBkYXRlUmlnaHQuZ2V0VGltZSgpO1xuICBpZiAoZGlmZiA8IDApIHtcbiAgICByZXR1cm4gLTE7XG4gIH0gZWxzZSBpZiAoZGlmZiA+IDApIHtcbiAgICByZXR1cm4gMTtcbiAgICAvLyBSZXR1cm4gMCBpZiBkaWZmIGlzIDA7IHJldHVybiBOYU4gaWYgZGlmZiBpcyBOYU5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZGlmZjtcbiAgfVxufSIsImltcG9ydCB7IGdldERlZmF1bHRPcHRpb25zIH0gZnJvbSBcIi4uL19saWIvZGVmYXVsdE9wdGlvbnMvaW5kZXguanNcIjtcbmltcG9ydCBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzIGZyb20gXCIuLi9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanNcIjtcbmltcG9ydCBjb21wYXJlQXNjIGZyb20gXCIuLi9jb21wYXJlQXNjL2luZGV4LmpzXCI7XG5pbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCBjbG9uZU9iamVjdCBmcm9tIFwiLi4vX2xpYi9jbG9uZU9iamVjdC9pbmRleC5qc1wiO1xuaW1wb3J0IGFzc2lnbiBmcm9tIFwiLi4vX2xpYi9hc3NpZ24vaW5kZXguanNcIjtcbmltcG9ydCBkZWZhdWx0TG9jYWxlIGZyb20gXCIuLi9fbGliL2RlZmF1bHRMb2NhbGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSA9IDEwMDAgKiA2MDtcbnZhciBNSU5VVEVTX0lOX0RBWSA9IDYwICogMjQ7XG52YXIgTUlOVVRFU19JTl9NT05USCA9IE1JTlVURVNfSU5fREFZICogMzA7XG52YXIgTUlOVVRFU19JTl9ZRUFSID0gTUlOVVRFU19JTl9EQVkgKiAzNjU7XG5cbi8qKlxuICogQG5hbWUgZm9ybWF0RGlzdGFuY2VTdHJpY3RcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3Jkcy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMsIHVzaW5nIHN0cmljdCB1bml0cy5cbiAqIFRoaXMgaXMgbGlrZSBgZm9ybWF0RGlzdGFuY2VgLCBidXQgZG9lcyBub3QgdXNlIGhlbHBlcnMgbGlrZSAnYWxtb3N0JywgJ292ZXInLFxuICogJ2xlc3MgdGhhbicgYW5kIHRoZSBsaWtlLlxuICpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDU5IHNlY3MgICAgICAgICAgfCBbMC4uNTldIHNlY29uZHMgICAgIHxcbiAqIHwgMSAuLi4gNTkgbWlucyAgICAgICAgICB8IFsxLi41OV0gbWludXRlcyAgICAgfFxuICogfCAxIC4uLiAyMyBocnMgICAgICAgICAgIHwgWzEuLjIzXSBob3VycyAgICAgICB8XG4gKiB8IDEgLi4uIDI5IGRheXMgICAgICAgICAgfCBbMS4uMjldIGRheXMgICAgICAgIHxcbiAqIHwgMSAuLi4gMTEgbW9udGhzICAgICAgICB8IFsxLi4xMV0gbW9udGhzICAgICAgfFxuICogfCAxIC4uLiBOIHllYXJzICAgICAgICAgIHwgWzEuLk5dICB5ZWFycyAgICAgICB8XG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBiYXNlRGF0ZSAtIHRoZSBkYXRlIHRvIGNvbXBhcmUgd2l0aFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgaW5kaWNhdGVzIGlmIHRoZSBzZWNvbmQgZGF0ZSBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIGZpcnN0XG4gKiBAcGFyYW0geydzZWNvbmQnfCdtaW51dGUnfCdob3VyJ3wnZGF5J3wnbW9udGgnfCd5ZWFyJ30gW29wdGlvbnMudW5pdF0gLSBpZiBzcGVjaWZpZWQsIHdpbGwgZm9yY2UgYSB1bml0XG4gKiBAcGFyYW0geydmbG9vcid8J2NlaWwnfCdyb3VuZCd9IFtvcHRpb25zLnJvdW5kaW5nTWV0aG9kPSdyb3VuZCddIC0gd2hpY2ggd2F5IHRvIHJvdW5kIHBhcnRpYWwgdW5pdHNcbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGRpc3RhbmNlIGluIHdvcmRzXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgZGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgYmFzZURhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMucm91bmRpbmdNZXRob2RgIG11c3QgYmUgJ2Zsb29yJywgJ2NlaWwnIG9yICdyb3VuZCdcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLnVuaXRgIG11c3QgYmUgJ3NlY29uZCcsICdtaW51dGUnLCAnaG91cicsICdkYXknLCAnbW9udGgnIG9yICd5ZWFyJ1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdERpc3RhbmNlYCBwcm9wZXJ0eVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDIgSnVseSAyMDE0IGFuZCAxIEphbnVhcnkgMjAxNT9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KG5ldyBEYXRlKDIwMTQsIDYsIDIpLCBuZXcgRGF0ZSgyMDE1LCAwLCAyKSlcbiAqIC8vPT4gJzYgbW9udGhzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgSmFudWFyeSAyMDE1IDAwOjAwOjE1XG4gKiAvLyBhbmQgMSBKYW51YXJ5IDIwMTUgMDA6MDA6MDA/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpLFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAwKVxuICogKVxuICogLy89PiAnMTUgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIHdpdGggYSBzdWZmaXg/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChuZXcgRGF0ZSgyMDE1LCAwLCAxKSwgbmV3IERhdGUoMjAxNiwgMCwgMSksIHtcbiAqICAgYWRkU3VmZml4OiB0cnVlXG4gKiB9KVxuICogLy89PiAnMSB5ZWFyIGFnbydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNlxuICogLy8gdG8gMSBKYW51YXJ5IDIwMTUsIGluIG1pbnV0ZXM/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChuZXcgRGF0ZSgyMDE2LCAwLCAxKSwgbmV3IERhdGUoMjAxNSwgMCwgMSksIHtcbiAqICAgdW5pdDogJ21pbnV0ZSdcbiAqIH0pXG4gKiAvLz0+ICc1MjU2MDAgbWludXRlcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgZnJvbSAxIEphbnVhcnkgMjAxNVxuICogLy8gdG8gMjggSmFudWFyeSAyMDE1LCBpbiBtb250aHMsIHJvdW5kZWQgdXA/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChuZXcgRGF0ZSgyMDE1LCAwLCAyOCksIG5ldyBEYXRlKDIwMTUsIDAsIDEpLCB7XG4gKiAgIHVuaXQ6ICdtb250aCcsXG4gKiAgIHJvdW5kaW5nTWV0aG9kOiAnY2VpbCdcbiAqIH0pXG4gKiAvLz0+ICcxIG1vbnRoJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIDEgQXVndXN0IDIwMTYgYW5kIDEgSmFudWFyeSAyMDE1IGluIEVzcGVyYW50bz9cbiAqIGltcG9ydCB7IGVvTG9jYWxlIH0gZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNiwgNywgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpLCB7XG4gKiAgIGxvY2FsZTogZW9Mb2NhbGVcbiAqIH0pXG4gKiAvLz0+ICcxIGphcm8nXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2VTdHJpY3QoZGlydHlEYXRlLCBkaXJ0eUJhc2VEYXRlLCBvcHRpb25zKSB7XG4gIHZhciBfcmVmLCBfb3B0aW9ucyRsb2NhbGUsIF9vcHRpb25zJHJvdW5kaW5nTWV0aDtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkZWZhdWx0T3B0aW9ucyA9IGdldERlZmF1bHRPcHRpb25zKCk7XG4gIHZhciBsb2NhbGUgPSAoX3JlZiA9IChfb3B0aW9ucyRsb2NhbGUgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyRsb2NhbGUgIT09IHZvaWQgMCA/IF9vcHRpb25zJGxvY2FsZSA6IGRlZmF1bHRPcHRpb25zLmxvY2FsZSkgIT09IG51bGwgJiYgX3JlZiAhPT0gdm9pZCAwID8gX3JlZiA6IGRlZmF1bHRMb2NhbGU7XG4gIGlmICghbG9jYWxlLmZvcm1hdERpc3RhbmNlKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ2xvY2FsZSBtdXN0IGNvbnRhaW4gbG9jYWxpemUuZm9ybWF0RGlzdGFuY2UgcHJvcGVydHknKTtcbiAgfVxuICB2YXIgY29tcGFyaXNvbiA9IGNvbXBhcmVBc2MoZGlydHlEYXRlLCBkaXJ0eUJhc2VEYXRlKTtcbiAgaWYgKGlzTmFOKGNvbXBhcmlzb24pKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdGltZSB2YWx1ZScpO1xuICB9XG4gIHZhciBsb2NhbGl6ZU9wdGlvbnMgPSBhc3NpZ24oY2xvbmVPYmplY3Qob3B0aW9ucyksIHtcbiAgICBhZGRTdWZmaXg6IEJvb2xlYW4ob3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmFkZFN1ZmZpeCksXG4gICAgY29tcGFyaXNvbjogY29tcGFyaXNvblxuICB9KTtcbiAgdmFyIGRhdGVMZWZ0O1xuICB2YXIgZGF0ZVJpZ2h0O1xuICBpZiAoY29tcGFyaXNvbiA+IDApIHtcbiAgICBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eUJhc2VEYXRlKTtcbiAgICBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICAgIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eUJhc2VEYXRlKTtcbiAgfVxuICB2YXIgcm91bmRpbmdNZXRob2QgPSBTdHJpbmcoKF9vcHRpb25zJHJvdW5kaW5nTWV0aCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yb3VuZGluZ01ldGhvZCkgIT09IG51bGwgJiYgX29wdGlvbnMkcm91bmRpbmdNZXRoICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRyb3VuZGluZ01ldGggOiAncm91bmQnKTtcbiAgdmFyIHJvdW5kaW5nTWV0aG9kRm47XG4gIGlmIChyb3VuZGluZ01ldGhvZCA9PT0gJ2Zsb29yJykge1xuICAgIHJvdW5kaW5nTWV0aG9kRm4gPSBNYXRoLmZsb29yO1xuICB9IGVsc2UgaWYgKHJvdW5kaW5nTWV0aG9kID09PSAnY2VpbCcpIHtcbiAgICByb3VuZGluZ01ldGhvZEZuID0gTWF0aC5jZWlsO1xuICB9IGVsc2UgaWYgKHJvdW5kaW5nTWV0aG9kID09PSAncm91bmQnKSB7XG4gICAgcm91bmRpbmdNZXRob2RGbiA9IE1hdGgucm91bmQ7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJyb3VuZGluZ01ldGhvZCBtdXN0IGJlICdmbG9vcicsICdjZWlsJyBvciAncm91bmQnXCIpO1xuICB9XG4gIHZhciBtaWxsaXNlY29uZHMgPSBkYXRlUmlnaHQuZ2V0VGltZSgpIC0gZGF0ZUxlZnQuZ2V0VGltZSgpO1xuICB2YXIgbWludXRlcyA9IG1pbGxpc2Vjb25kcyAvIE1JTExJU0VDT05EU19JTl9NSU5VVEU7XG4gIHZhciB0aW1lem9uZU9mZnNldCA9IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZVJpZ2h0KSAtIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZUxlZnQpO1xuXG4gIC8vIFVzZSBEU1Qtbm9ybWFsaXplZCBkaWZmZXJlbmNlIGluIG1pbnV0ZXMgZm9yIHllYXJzLCBtb250aHMgYW5kIGRheXM7XG4gIC8vIHVzZSByZWd1bGFyIGRpZmZlcmVuY2UgaW4gbWludXRlcyBmb3IgaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHMuXG4gIHZhciBkc3ROb3JtYWxpemVkTWludXRlcyA9IChtaWxsaXNlY29uZHMgLSB0aW1lem9uZU9mZnNldCkgLyBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFO1xuICB2YXIgZGVmYXVsdFVuaXQgPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMudW5pdDtcbiAgdmFyIHVuaXQ7XG4gIGlmICghZGVmYXVsdFVuaXQpIHtcbiAgICBpZiAobWludXRlcyA8IDEpIHtcbiAgICAgIHVuaXQgPSAnc2Vjb25kJztcbiAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCA2MCkge1xuICAgICAgdW5pdCA9ICdtaW51dGUnO1xuICAgIH0gZWxzZSBpZiAobWludXRlcyA8IE1JTlVURVNfSU5fREFZKSB7XG4gICAgICB1bml0ID0gJ2hvdXInO1xuICAgIH0gZWxzZSBpZiAoZHN0Tm9ybWFsaXplZE1pbnV0ZXMgPCBNSU5VVEVTX0lOX01PTlRIKSB7XG4gICAgICB1bml0ID0gJ2RheSc7XG4gICAgfSBlbHNlIGlmIChkc3ROb3JtYWxpemVkTWludXRlcyA8IE1JTlVURVNfSU5fWUVBUikge1xuICAgICAgdW5pdCA9ICdtb250aCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHVuaXQgPSAneWVhcic7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHVuaXQgPSBTdHJpbmcoZGVmYXVsdFVuaXQpO1xuICB9XG5cbiAgLy8gMCB1cCB0byA2MCBzZWNvbmRzXG4gIGlmICh1bml0ID09PSAnc2Vjb25kJykge1xuICAgIHZhciBzZWNvbmRzID0gcm91bmRpbmdNZXRob2RGbihtaWxsaXNlY29uZHMgLyAxMDAwKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4U2Vjb25kcycsIHNlY29uZHMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIHVwIHRvIDYwIG1pbnNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnbWludXRlJykge1xuICAgIHZhciByb3VuZGVkTWludXRlcyA9IHJvdW5kaW5nTWV0aG9kRm4obWludXRlcyk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneE1pbnV0ZXMnLCByb3VuZGVkTWludXRlcywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgdXAgdG8gMjQgaG91cnNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnaG91cicpIHtcbiAgICB2YXIgaG91cnMgPSByb3VuZGluZ01ldGhvZEZuKG1pbnV0ZXMgLyA2MCk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneEhvdXJzJywgaG91cnMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIHVwIHRvIDMwIGRheXNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnZGF5Jykge1xuICAgIHZhciBkYXlzID0gcm91bmRpbmdNZXRob2RGbihkc3ROb3JtYWxpemVkTWludXRlcyAvIE1JTlVURVNfSU5fREFZKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4RGF5cycsIGRheXMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIHVwIHRvIDEyIG1vbnRoc1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdtb250aCcpIHtcbiAgICB2YXIgbW9udGhzID0gcm91bmRpbmdNZXRob2RGbihkc3ROb3JtYWxpemVkTWludXRlcyAvIE1JTlVURVNfSU5fTU9OVEgpO1xuICAgIHJldHVybiBtb250aHMgPT09IDEyICYmIGRlZmF1bHRVbml0ICE9PSAnbW9udGgnID8gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4WWVhcnMnLCAxLCBsb2NhbGl6ZU9wdGlvbnMpIDogbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4TW9udGhzJywgbW9udGhzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMSB5ZWFyIHVwIHRvIG1heCBEYXRlXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ3llYXInKSB7XG4gICAgdmFyIHllYXJzID0gcm91bmRpbmdNZXRob2RGbihkc3ROb3JtYWxpemVkTWludXRlcyAvIE1JTlVURVNfSU5fWUVBUik7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneFllYXJzJywgeWVhcnMsIGxvY2FsaXplT3B0aW9ucyk7XG4gIH1cbiAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoXCJ1bml0IG11c3QgYmUgJ3NlY29uZCcsICdtaW51dGUnLCAnaG91cicsICdkYXknLCAnbW9udGgnIG9yICd5ZWFyJ1wiKTtcbn0iLCJpbXBvcnQgZm9ybWF0RGlzdGFuY2VTdHJpY3QgZnJvbSBcIi4uL2Zvcm1hdERpc3RhbmNlU3RyaWN0L2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZSBhbmQgbm93IGluIHdvcmRzLlxuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMsIHVzaW5nIHN0cmljdCB1bml0cy5cbiAqIFRoaXMgaXMgbGlrZSBgZm9ybWF0RGlzdGFuY2VgLCBidXQgZG9lcyBub3QgdXNlIGhlbHBlcnMgbGlrZSAnYWxtb3N0JywgJ292ZXInLFxuICogJ2xlc3MgdGhhbicgYW5kIHRoZSBsaWtlLlxuICpcbiAqIHwgRGlzdGFuY2UgYmV0d2VlbiBkYXRlcyB8IFJlc3VsdCAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IDAgLi4uIDU5IHNlY3MgICAgICAgICAgfCBbMC4uNTldIHNlY29uZHMgICAgIHxcbiAqIHwgMSAuLi4gNTkgbWlucyAgICAgICAgICB8IFsxLi41OV0gbWludXRlcyAgICAgfFxuICogfCAxIC4uLiAyMyBocnMgICAgICAgICAgIHwgWzEuLjIzXSBob3VycyAgICAgICB8XG4gKiB8IDEgLi4uIDI5IGRheXMgICAgICAgICAgfCBbMS4uMjldIGRheXMgICAgICAgIHxcbiAqIHwgMSAuLi4gMTEgbW9udGhzICAgICAgICB8IFsxLi4xMV0gbW9udGhzICAgICAgfFxuICogfCAxIC4uLiBOIHllYXJzICAgICAgICAgIHwgWzEuLk5dICB5ZWFycyAgICAgICB8XG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBnaXZlbiBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWRkU3VmZml4PWZhbHNlXSAtIHJlc3VsdCBpbmRpY2F0ZXMgaWYgdGhlIHNlY29uZCBkYXRlIGlzIGVhcmxpZXIgb3IgbGF0ZXIgdGhhbiB0aGUgZmlyc3RcbiAqIEBwYXJhbSB7J3NlY29uZCd8J21pbnV0ZSd8J2hvdXInfCdkYXknfCdtb250aCd8J3llYXInfSBbb3B0aW9ucy51bml0XSAtIGlmIHNwZWNpZmllZCwgd2lsbCBmb3JjZSBhIHVuaXRcbiAqIEBwYXJhbSB7J2Zsb29yJ3wnY2VpbCd8J3JvdW5kJ30gW29wdGlvbnMucm91bmRpbmdNZXRob2Q9J3JvdW5kJ10gLSB3aGljaCB3YXkgdG8gcm91bmQgcGFydGlhbCB1bml0c1xuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdERpc3RhbmNlYCBwcm9wZXJ0eVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSwgd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMiBKdWx5IDIwMTQ/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE0LCA2LCAyKVxuICogKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIG5vdyBpcyAxIEphbnVhcnkgMjAxNSAwMDowMDowMCxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE1IDAwOjAwOjE1LCBpbmNsdWRpbmcgc2Vjb25kcz9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDE1KVxuICogKVxuICogLy89PiAnMTUgc2Vjb25kcydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNiwgd2l0aCBhIHN1ZmZpeD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDAsIDEpLFxuICogICB7YWRkU3VmZml4OiB0cnVlfVxuICogKVxuICogLy89PiAnaW4gMSB5ZWFyJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAyOCBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNSwgaW4gbW9udGhzLCByb3VuZGVkIHVwPz9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QobmV3IERhdGUoMjAxNSwgMCwgMSksIHtcbiAqICAgdW5pdDogJ21vbnRoJyxcbiAqICAgcm91bmRpbmdNZXRob2Q6ICdjZWlsJ1xuICogfSlcbiAqIC8vPT4gJzEgbW9udGgnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTYgaW4gRXNwZXJhbnRvP1xuICogY29uc3QgZW9Mb2NhbGUgPSByZXF1aXJlKCdkYXRlLWZucy9sb2NhbGUvZW8nKVxuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNiwgMCwgMSksXG4gKiAgIHtsb2NhbGU6IGVvTG9jYWxlfVxuICogKVxuICogLy89PiAnMSBqYXJvJ1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KGRpcnR5RGF0ZSwgb3B0aW9ucykge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIGZvcm1hdERpc3RhbmNlU3RyaWN0KGRpcnR5RGF0ZSwgRGF0ZS5ub3coKSwgb3B0aW9ucyk7XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBpc1Bhc3RcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHBhc3Q/XG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGdpdmVuIGRhdGUgaW4gdGhlIHBhc3Q/XG4gKlxuICogPiDimqDvuI8gUGxlYXNlIG5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIGlzIG5vdCBwcmVzZW50IGluIHRoZSBGUCBzdWJtb2R1bGUgYXNcbiAqID4gaXQgdXNlcyBgRGF0ZS5ub3coKWAgaW50ZXJuYWxseSBoZW5jZSBpbXB1cmUgYW5kIGNhbid0IGJlIHNhZmVseSBjdXJyaWVkLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIGluIHRoZSBwYXN0XG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgNiBPY3RvYmVyIDIwMTQsIGlzIDIgSnVseSAyMDE0IGluIHRoZSBwYXN0P1xuICogY29uc3QgcmVzdWx0ID0gaXNQYXN0KG5ldyBEYXRlKDIwMTQsIDYsIDIpKVxuICogLy89PiB0cnVlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlzUGFzdChkaXJ0eURhdGUpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0b0RhdGUoZGlydHlEYXRlKS5nZXRUaW1lKCkgPCBEYXRlLm5vdygpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkRm9ybWF0TG9uZ0ZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gICAgLy8gVE9ETzogUmVtb3ZlIFN0cmluZygpXG4gICAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgIHZhciBmb3JtYXQgPSBhcmdzLmZvcm1hdHNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0c1thcmdzLmRlZmF1bHRXaWR0aF07XG4gICAgcmV0dXJuIGZvcm1hdDtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZExvY2FsaXplRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKGRpcnR5SW5kZXgsIG9wdGlvbnMpIHtcbiAgICB2YXIgY29udGV4dCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuY29udGV4dCA/IFN0cmluZyhvcHRpb25zLmNvbnRleHQpIDogJ3N0YW5kYWxvbmUnO1xuICAgIHZhciB2YWx1ZXNBcnJheTtcbiAgICBpZiAoY29udGV4dCA9PT0gJ2Zvcm1hdHRpbmcnICYmIGFyZ3MuZm9ybWF0dGluZ1ZhbHVlcykge1xuICAgICAgdmFyIGRlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdEZvcm1hdHRpbmdXaWR0aCB8fCBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciB3aWR0aCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBkZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1t3aWR0aF0gfHwgYXJncy5mb3JtYXR0aW5nVmFsdWVzW2RlZmF1bHRXaWR0aF07XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBfZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YXIgX3dpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLnZhbHVlc1tfd2lkdGhdIHx8IGFyZ3MudmFsdWVzW19kZWZhdWx0V2lkdGhdO1xuICAgIH1cbiAgICB2YXIgaW5kZXggPSBhcmdzLmFyZ3VtZW50Q2FsbGJhY2sgPyBhcmdzLmFyZ3VtZW50Q2FsbGJhY2soZGlydHlJbmRleCkgOiBkaXJ0eUluZGV4O1xuICAgIC8vIEB0cy1pZ25vcmU6IEZvciBzb21lIHJlYXNvbiBUeXBlU2NyaXB0IGp1c3QgZG9uJ3Qgd2FudCB0byBtYXRjaCBpdCwgbm8gbWF0dGVyIGhvdyBoYXJkIHdlIHRyeS4gSSBjaGFsbGVuZ2UgeW91IHRvIHRyeSB0byByZW1vdmUgaXQhXG4gICAgcmV0dXJuIHZhbHVlc0FycmF5W2luZGV4XTtcbiAgfTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgIHZhciBtYXRjaFBhdHRlcm4gPSB3aWR0aCAmJiBhcmdzLm1hdGNoUGF0dGVybnNbd2lkdGhdIHx8IGFyZ3MubWF0Y2hQYXR0ZXJuc1thcmdzLmRlZmF1bHRNYXRjaFdpZHRoXTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2gobWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgdmFyIG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcbiAgICB2YXIgcGFyc2VQYXR0ZXJucyA9IHdpZHRoICYmIGFyZ3MucGFyc2VQYXR0ZXJuc1t3aWR0aF0gfHwgYXJncy5wYXJzZVBhdHRlcm5zW2FyZ3MuZGVmYXVsdFBhcnNlV2lkdGhdO1xuICAgIHZhciBrZXkgPSBBcnJheS5pc0FycmF5KHBhcnNlUGF0dGVybnMpID8gZmluZEluZGV4KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pIDogZmluZEtleShwYXJzZVBhdHRlcm5zLCBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKTtcbiAgICB9KTtcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2soa2V5KSA6IGtleTtcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB2YXIgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHJlc3Q6IHJlc3RcbiAgICB9O1xuICB9O1xufVxuZnVuY3Rpb24gZmluZEtleShvYmplY3QsIHByZWRpY2F0ZSkge1xuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHByZWRpY2F0ZShvYmplY3Rba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyYXksIHByZWRpY2F0ZSkge1xuICBmb3IgKHZhciBrZXkgPSAwOyBrZXkgPCBhcnJheS5sZW5ndGg7IGtleSsrKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MubWF0Y2hQYXR0ZXJuKTtcbiAgICBpZiAoIW1hdGNoUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLnBhcnNlUGF0dGVybik7XG4gICAgaWYgKCFwYXJzZVJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKHBhcnNlUmVzdWx0WzBdKSA6IHBhcnNlUmVzdWx0WzBdO1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59IiwidmFyIGZvcm1hdERpc3RhbmNlTG9jYWxlID0ge1xuICBsZXNzVGhhblhTZWNvbmRzOiB7XG4gICAgb25lOiAnbGVzcyB0aGFuIGEgc2Vjb25kJyxcbiAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gc2Vjb25kcydcbiAgfSxcbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6ICcxIHNlY29uZCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gc2Vjb25kcydcbiAgfSxcbiAgaGFsZkFNaW51dGU6ICdoYWxmIGEgbWludXRlJyxcbiAgbGVzc1RoYW5YTWludXRlczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIG1pbnV0ZScsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IG1pbnV0ZXMnXG4gIH0sXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiAnMSBtaW51dGUnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1pbnV0ZXMnXG4gIH0sXG4gIGFib3V0WEhvdXJzOiB7XG4gICAgb25lOiAnYWJvdXQgMSBob3VyJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBob3VycydcbiAgfSxcbiAgeEhvdXJzOiB7XG4gICAgb25lOiAnMSBob3VyJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBob3VycydcbiAgfSxcbiAgeERheXM6IHtcbiAgICBvbmU6ICcxIGRheScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gZGF5cydcbiAgfSxcbiAgYWJvdXRYV2Vla3M6IHtcbiAgICBvbmU6ICdhYm91dCAxIHdlZWsnLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHdlZWtzJ1xuICB9LFxuICB4V2Vla3M6IHtcbiAgICBvbmU6ICcxIHdlZWsnLFxuICAgIG90aGVyOiAne3tjb3VudH19IHdlZWtzJ1xuICB9LFxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6ICdhYm91dCAxIG1vbnRoJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBtb250aHMnXG4gIH0sXG4gIHhNb250aHM6IHtcbiAgICBvbmU6ICcxIG1vbnRoJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBtb250aHMnXG4gIH0sXG4gIGFib3V0WFllYXJzOiB7XG4gICAgb25lOiAnYWJvdXQgMSB5ZWFyJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgeFllYXJzOiB7XG4gICAgb25lOiAnMSB5ZWFyJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgb3ZlclhZZWFyczoge1xuICAgIG9uZTogJ292ZXIgMSB5ZWFyJyxcbiAgICBvdGhlcjogJ292ZXIge3tjb3VudH19IHllYXJzJ1xuICB9LFxuICBhbG1vc3RYWWVhcnM6IHtcbiAgICBvbmU6ICdhbG1vc3QgMSB5ZWFyJyxcbiAgICBvdGhlcjogJ2FsbW9zdCB7e2NvdW50fX0geWVhcnMnXG4gIH1cbn07XG52YXIgZm9ybWF0RGlzdGFuY2UgPSBmdW5jdGlvbiBmb3JtYXREaXN0YW5jZSh0b2tlbiwgY291bnQsIG9wdGlvbnMpIHtcbiAgdmFyIHJlc3VsdDtcbiAgdmFyIHRva2VuVmFsdWUgPSBmb3JtYXREaXN0YW5jZUxvY2FsZVt0b2tlbl07XG4gIGlmICh0eXBlb2YgdG9rZW5WYWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlO1xuICB9IGVsc2UgaWYgKGNvdW50ID09PSAxKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZS5vbmU7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZS5vdGhlci5yZXBsYWNlKCd7e2NvdW50fX0nLCBjb3VudC50b1N0cmluZygpKTtcbiAgfVxuICBpZiAob3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5hZGRTdWZmaXgpIHtcbiAgICBpZiAob3B0aW9ucy5jb21wYXJpc29uICYmIG9wdGlvbnMuY29tcGFyaXNvbiA+IDApIHtcbiAgICAgIHJldHVybiAnaW4gJyArIHJlc3VsdDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArICcgYWdvJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXREaXN0YW5jZTsiLCJpbXBvcnQgYnVpbGRGb3JtYXRMb25nRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRGb3JtYXRMb25nRm4vaW5kZXguanNcIjtcbnZhciBkYXRlRm9ybWF0cyA9IHtcbiAgZnVsbDogJ0VFRUUsIE1NTU0gZG8sIHknLFxuICBsb25nOiAnTU1NTSBkbywgeScsXG4gIG1lZGl1bTogJ01NTSBkLCB5JyxcbiAgc2hvcnQ6ICdNTS9kZC95eXl5J1xufTtcbnZhciB0aW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogJ2g6bW06c3MgYSB6enp6JyxcbiAgbG9uZzogJ2g6bW06c3MgYSB6JyxcbiAgbWVkaXVtOiAnaDptbTpzcyBhJyxcbiAgc2hvcnQ6ICdoOm1tIGEnXG59O1xudmFyIGRhdGVUaW1lRm9ybWF0cyA9IHtcbiAgZnVsbDogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIGxvbmc6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBtZWRpdW06ICd7e2RhdGV9fSwge3t0aW1lfX0nLFxuICBzaG9ydDogJ3t7ZGF0ZX19LCB7e3RpbWV9fSdcbn07XG52YXIgZm9ybWF0TG9uZyA9IHtcbiAgZGF0ZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pLFxuICB0aW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogdGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIGRhdGVUaW1lOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZVRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0TG9uZzsiLCJ2YXIgZm9ybWF0UmVsYXRpdmVMb2NhbGUgPSB7XG4gIGxhc3RXZWVrOiBcIidsYXN0JyBlZWVlICdhdCcgcFwiLFxuICB5ZXN0ZXJkYXk6IFwiJ3llc3RlcmRheSBhdCcgcFwiLFxuICB0b2RheTogXCIndG9kYXkgYXQnIHBcIixcbiAgdG9tb3Jyb3c6IFwiJ3RvbW9ycm93IGF0JyBwXCIsXG4gIG5leHRXZWVrOiBcImVlZWUgJ2F0JyBwXCIsXG4gIG90aGVyOiAnUCdcbn07XG52YXIgZm9ybWF0UmVsYXRpdmUgPSBmdW5jdGlvbiBmb3JtYXRSZWxhdGl2ZSh0b2tlbiwgX2RhdGUsIF9iYXNlRGF0ZSwgX29wdGlvbnMpIHtcbiAgcmV0dXJuIGZvcm1hdFJlbGF0aXZlTG9jYWxlW3Rva2VuXTtcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRSZWxhdGl2ZTsiLCJpbXBvcnQgYnVpbGRMb2NhbGl6ZUZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qc1wiO1xudmFyIGVyYVZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ0InLCAnQSddLFxuICBhYmJyZXZpYXRlZDogWydCQycsICdBRCddLFxuICB3aWRlOiBbJ0JlZm9yZSBDaHJpc3QnLCAnQW5ubyBEb21pbmknXVxufTtcbnZhciBxdWFydGVyVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnMScsICcyJywgJzMnLCAnNCddLFxuICBhYmJyZXZpYXRlZDogWydRMScsICdRMicsICdRMycsICdRNCddLFxuICB3aWRlOiBbJzFzdCBxdWFydGVyJywgJzJuZCBxdWFydGVyJywgJzNyZCBxdWFydGVyJywgJzR0aCBxdWFydGVyJ11cbn07XG5cbi8vIE5vdGU6IGluIEVuZ2xpc2gsIHRoZSBuYW1lcyBvZiBkYXlzIG9mIHRoZSB3ZWVrIGFuZCBtb250aHMgYXJlIGNhcGl0YWxpemVkLlxuLy8gSWYgeW91IGFyZSBtYWtpbmcgYSBuZXcgbG9jYWxlIGJhc2VkIG9uIHRoaXMgb25lLCBjaGVjayBpZiB0aGUgc2FtZSBpcyB0cnVlIGZvciB0aGUgbGFuZ3VhZ2UgeW91J3JlIHdvcmtpbmcgb24uXG4vLyBHZW5lcmFsbHksIGZvcm1hdHRlZCBkYXRlcyBzaG91bGQgbG9vayBsaWtlIHRoZXkgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzZW50ZW5jZSxcbi8vIGUuZy4gaW4gU3BhbmlzaCBsYW5ndWFnZSB0aGUgd2Vla2RheXMgYW5kIG1vbnRocyBzaG91bGQgYmUgaW4gdGhlIGxvd2VyY2FzZS5cbnZhciBtb250aFZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ0onLCAnRicsICdNJywgJ0EnLCAnTScsICdKJywgJ0onLCAnQScsICdTJywgJ08nLCAnTicsICdEJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0phbicsICdGZWInLCAnTWFyJywgJ0FwcicsICdNYXknLCAnSnVuJywgJ0p1bCcsICdBdWcnLCAnU2VwJywgJ09jdCcsICdOb3YnLCAnRGVjJ10sXG4gIHdpZGU6IFsnSmFudWFyeScsICdGZWJydWFyeScsICdNYXJjaCcsICdBcHJpbCcsICdNYXknLCAnSnVuZScsICdKdWx5JywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2N0b2JlcicsICdOb3ZlbWJlcicsICdEZWNlbWJlciddXG59O1xudmFyIGRheVZhbHVlcyA9IHtcbiAgbmFycm93OiBbJ1MnLCAnTScsICdUJywgJ1cnLCAnVCcsICdGJywgJ1MnXSxcbiAgc2hvcnQ6IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gIHdpZGU6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxufTtcbnZhciBkYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfVxufTtcbnZhciBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogJ2EnLFxuICAgIHBtOiAncCcsXG4gICAgbWlkbmlnaHQ6ICdtaScsXG4gICAgbm9vbjogJ24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiAnQU0nLFxuICAgIHBtOiAnUE0nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiAnYS5tLicsXG4gICAgcG06ICdwLm0uJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH1cbn07XG52YXIgb3JkaW5hbE51bWJlciA9IGZ1bmN0aW9uIG9yZGluYWxOdW1iZXIoZGlydHlOdW1iZXIsIF9vcHRpb25zKSB7XG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuXG4gIC8vIElmIG9yZGluYWwgbnVtYmVycyBkZXBlbmQgb24gY29udGV4dCwgZm9yIGV4YW1wbGUsXG4gIC8vIGlmIHRoZXkgYXJlIGRpZmZlcmVudCBmb3IgZGlmZmVyZW50IGdyYW1tYXRpY2FsIGdlbmRlcnMsXG4gIC8vIHVzZSBgb3B0aW9ucy51bml0YC5cbiAgLy9cbiAgLy8gYHVuaXRgIGNhbiBiZSAneWVhcicsICdxdWFydGVyJywgJ21vbnRoJywgJ3dlZWsnLCAnZGF0ZScsICdkYXlPZlllYXInLFxuICAvLyAnZGF5JywgJ2hvdXInLCAnbWludXRlJywgJ3NlY29uZCcuXG5cbiAgdmFyIHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3N0JztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICduZCc7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAncmQnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgJ3RoJztcbn07XG52YXIgbG9jYWxpemUgPSB7XG4gIG9yZGluYWxOdW1iZXI6IG9yZGluYWxOdW1iZXIsXG4gIGVyYTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGVyYVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgcXVhcnRlcjogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IHF1YXJ0ZXJWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZScsXG4gICAgYXJndW1lbnRDYWxsYmFjazogZnVuY3Rpb24gYXJndW1lbnRDYWxsYmFjayhxdWFydGVyKSB7XG4gICAgICByZXR1cm4gcXVhcnRlciAtIDE7XG4gICAgfVxuICB9KSxcbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBtb250aFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgZGF5OiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5VmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXlQZXJpb2Q6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZScsXG4gICAgZm9ybWF0dGluZ1ZhbHVlczogZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0Rm9ybWF0dGluZ1dpZHRoOiAnd2lkZSdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBsb2NhbGl6ZTsiLCJpbXBvcnQgYnVpbGRNYXRjaEZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hGbi9pbmRleC5qc1wiO1xuaW1wb3J0IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qc1wiO1xudmFyIG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2k7XG52YXIgcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9cXGQrL2k7XG52YXIgbWF0Y2hFcmFQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihifGEpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihiXFwuP1xccz9jXFwuP3xiXFwuP1xccz9jXFwuP1xccz9lXFwuP3xhXFwuP1xccz9kXFwuP3xjXFwuP1xccz9lXFwuPykvaSxcbiAgd2lkZTogL14oYmVmb3JlIGNocmlzdHxiZWZvcmUgY29tbW9uIGVyYXxhbm5vIGRvbWluaXxjb21tb24gZXJhKS9pXG59O1xudmFyIHBhcnNlRXJhUGF0dGVybnMgPSB7XG4gIGFueTogWy9eYi9pLCAvXihhfGMpL2ldXG59O1xudmFyIG1hdGNoUXVhcnRlclBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eWzEyMzRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXnFbMTIzNF0vaSxcbiAgd2lkZTogL15bMTIzNF0odGh8c3R8bmR8cmQpPyBxdWFydGVyL2lcbn07XG52YXIgcGFyc2VRdWFydGVyUGF0dGVybnMgPSB7XG4gIGFueTogWy8xL2ksIC8yL2ksIC8zL2ksIC80L2ldXG59O1xudmFyIG1hdGNoTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltqZm1hc29uZF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGphbnxmZWJ8bWFyfGFwcnxtYXl8anVufGp1bHxhdWd8c2VwfG9jdHxub3Z8ZGVjKS9pLFxuICB3aWRlOiAvXihqYW51YXJ5fGZlYnJ1YXJ5fG1hcmNofGFwcmlsfG1heXxqdW5lfGp1bHl8YXVndXN0fHNlcHRlbWJlcnxvY3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyKS9pXG59O1xudmFyIHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15qL2ksIC9eZi9pLCAvXm0vaSwgL15hL2ksIC9ebS9pLCAvXmovaSwgL15qL2ksIC9eYS9pLCAvXnMvaSwgL15vL2ksIC9ebi9pLCAvXmQvaV0sXG4gIGFueTogWy9eamEvaSwgL15mL2ksIC9ebWFyL2ksIC9eYXAvaSwgL15tYXkvaSwgL15qdW4vaSwgL15qdWwvaSwgL15hdS9pLCAvXnMvaSwgL15vL2ksIC9ebi9pLCAvXmQvaV1cbn07XG52YXIgbWF0Y2hEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXltzbXR3Zl0vaSxcbiAgc2hvcnQ6IC9eKHN1fG1vfHR1fHdlfHRofGZyfHNhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oc3VufG1vbnx0dWV8d2VkfHRodXxmcml8c2F0KS9pLFxuICB3aWRlOiAvXihzdW5kYXl8bW9uZGF5fHR1ZXNkYXl8d2VkbmVzZGF5fHRodXJzZGF5fGZyaWRheXxzYXR1cmRheSkvaVxufTtcbnZhciBwYXJzZURheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXnMvaSwgL15tL2ksIC9edC9pLCAvXncvaSwgL150L2ksIC9eZi9pLCAvXnMvaV0sXG4gIGFueTogWy9ec3UvaSwgL15tL2ksIC9edHUvaSwgL153L2ksIC9edGgvaSwgL15mL2ksIC9ec2EvaV1cbn07XG52YXIgbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihhfHB8bWl8bnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2ksXG4gIGFueTogL14oW2FwXVxcLj9cXHM/bVxcLj98bWlkbmlnaHR8bm9vbnwoaW4gdGhlfGF0KSAobW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZ3xuaWdodCkpL2lcbn07XG52YXIgcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyA9IHtcbiAgYW55OiB7XG4gICAgYW06IC9eYS9pLFxuICAgIHBtOiAvXnAvaSxcbiAgICBtaWRuaWdodDogL15taS9pLFxuICAgIG5vb246IC9ebm8vaSxcbiAgICBtb3JuaW5nOiAvbW9ybmluZy9pLFxuICAgIGFmdGVybm9vbjogL2FmdGVybm9vbi9pLFxuICAgIGV2ZW5pbmc6IC9ldmVuaW5nL2ksXG4gICAgbmlnaHQ6IC9uaWdodC9pXG4gIH1cbn07XG52YXIgbWF0Y2ggPSB7XG4gIG9yZGluYWxOdW1iZXI6IGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oe1xuICAgIG1hdGNoUGF0dGVybjogbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICBwYXJzZVBhdHRlcm46IHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayh2YWx1ZSkge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHZhbHVlLCAxMCk7XG4gICAgfVxuICB9KSxcbiAgZXJhOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZUVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgcXVhcnRlcjogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55JyxcbiAgICB2YWx1ZUNhbGxiYWNrOiBmdW5jdGlvbiB2YWx1ZUNhbGxiYWNrKGluZGV4KSB7XG4gICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgIH1cbiAgfSksXG4gIG1vbnRoOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlTW9udGhQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaERheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnYW55JyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBlcmlvZFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IG1hdGNoOyIsImltcG9ydCBmb3JtYXREaXN0YW5jZSBmcm9tIFwiLi9fbGliL2Zvcm1hdERpc3RhbmNlL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0TG9uZyBmcm9tIFwiLi9fbGliL2Zvcm1hdExvbmcvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRSZWxhdGl2ZSBmcm9tIFwiLi9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzXCI7XG5pbXBvcnQgbG9jYWxpemUgZnJvbSBcIi4vX2xpYi9sb2NhbGl6ZS9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoIGZyb20gXCIuL19saWIvbWF0Y2gvaW5kZXguanNcIjtcbi8qKlxuICogQHR5cGUge0xvY2FsZX1cbiAqIEBjYXRlZ29yeSBMb2NhbGVzXG4gKiBAc3VtbWFyeSBFbmdsaXNoIGxvY2FsZSAoVW5pdGVkIFN0YXRlcykuXG4gKiBAbGFuZ3VhZ2UgRW5nbGlzaFxuICogQGlzby02MzktMiBlbmdcbiAqIEBhdXRob3IgU2FzaGEgS29zcyBbQGtvc3Nub2NvcnBde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9rb3Nzbm9jb3JwfVxuICogQGF1dGhvciBMZXNoYSBLb3NzIFtAbGVzaGFrb3NzXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20vbGVzaGFrb3NzfVxuICovXG52YXIgbG9jYWxlID0ge1xuICBjb2RlOiAnZW4tVVMnLFxuICBmb3JtYXREaXN0YW5jZTogZm9ybWF0RGlzdGFuY2UsXG4gIGZvcm1hdExvbmc6IGZvcm1hdExvbmcsXG4gIGZvcm1hdFJlbGF0aXZlOiBmb3JtYXRSZWxhdGl2ZSxcbiAgbG9jYWxpemU6IGxvY2FsaXplLFxuICBtYXRjaDogbWF0Y2gsXG4gIG9wdGlvbnM6IHtcbiAgICB3ZWVrU3RhcnRzT246IDAgLyogU3VuZGF5ICovLFxuICAgIGZpcnN0V2Vla0NvbnRhaW5zRGF0ZTogMVxuICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgbG9jYWxlOyIsImltcG9ydCBfdHlwZW9mIGZyb20gXCJAYmFiZWwvcnVudGltZS9oZWxwZXJzL2VzbS90eXBlb2ZcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgbm9uZSBvZiB0aGUgYWJvdmUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIEludmFsaWQgRGF0ZS5cbiAqXG4gKiAqKk5vdGUqKjogKmFsbCogRGF0ZSBhcmd1bWVudHMgcGFzc2VkIHRvIGFueSAqZGF0ZS1mbnMqIGZ1bmN0aW9uIGlzIHByb2Nlc3NlZCBieSBgdG9EYXRlYC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBhcmd1bWVudCAtIHRoZSB2YWx1ZSB0byBjb252ZXJ0XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIHBhcnNlZCBkYXRlIGluIHRoZSBsb2NhbCB0aW1lIHpvbmVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDbG9uZSB0aGUgZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZShuZXcgRGF0ZSgyMDE0LCAxLCAxMSwgMTEsIDMwLCAzMCkpXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHRoZSB0aW1lc3RhbXAgdG8gZGF0ZTpcbiAqIGNvbnN0IHJlc3VsdCA9IHRvRGF0ZSgxMzkyMDk4NDMwMDAwKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9EYXRlKGFyZ3VtZW50KSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICB2YXIgYXJnU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3VtZW50KTtcblxuICAvLyBDbG9uZSB0aGUgZGF0ZVxuICBpZiAoYXJndW1lbnQgaW5zdGFuY2VvZiBEYXRlIHx8IF90eXBlb2YoYXJndW1lbnQpID09PSAnb2JqZWN0JyAmJiBhcmdTdHIgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgIC8vIFByZXZlbnQgdGhlIGRhdGUgdG8gbG9zZSB0aGUgbWlsbGlzZWNvbmRzIHdoZW4gcGFzc2VkIHRvIG5ldyBEYXRlKCkgaW4gSUUxMFxuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudC5nZXRUaW1lKCkpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCA9PT0gJ251bWJlcicgfHwgYXJnU3RyID09PSAnW29iamVjdCBOdW1iZXJdJykge1xuICAgIHJldHVybiBuZXcgRGF0ZShhcmd1bWVudCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCh0eXBlb2YgYXJndW1lbnQgPT09ICdzdHJpbmcnIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgU3RyaW5nXScpICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihcIlN0YXJ0aW5nIHdpdGggdjIuMC4wLWJldGEuMSBkYXRlLWZucyBkb2Vzbid0IGFjY2VwdCBzdHJpbmdzIGFzIGRhdGUgYXJndW1lbnRzLiBQbGVhc2UgdXNlIGBwYXJzZUlTT2AgdG8gcGFyc2Ugc3RyaW5ncy4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvYmxvYi9tYXN0ZXIvZG9jcy91cGdyYWRlR3VpZGUubWQjc3RyaW5nLWFyZ3VtZW50c1wiKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4obmV3IEVycm9yKCkuc3RhY2spO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERhdGUoTmFOKTtcbiAgfVxufSIsImV4cG9ydCBjb25zdCBQdWJTdWIgPSAoKCkgPT4ge1xuICBjb25zdCBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkgPSAtMTtcbiAgY29uc3QgZXZlbnRzID0ge307XG5cbiAgZnVuY3Rpb24gZGVidWdFdmVudEFubm91bmNlKGV2ZW50KSB7XG4gICAgY29uc29sZS5sb2coYFtkZWJ1Z10gRVZFTlQgJHtldmVudH0gSVMgQ0FMTEVEYCk7XG4gIH1cblxuICBmdW5jdGlvbiBlbWl0KGV2ZW50LCBwYXJhbSA9IG51bGwpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZGVidWdFdmVudEFubm91bmNlKGV2ZW50KTtcbiAgICAgIGZvciAobGV0IGZ1bmMgb2YgZXZlbnRzW2V2ZW50XSkge1xuICAgICAgICBmdW5jKHBhcmFtKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoYFRoZXJlIGlzIG5vIGV2ZW50IHdpdGggYSBuYW1lICcke2V2ZW50fSdgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBldmVudHNbZXZlbnRdLnB1c2goZnVuYyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50c1tldmVudF0gPSBbZnVuY107XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb2ZmKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGNvbnN0IGluZGV4T2ZHaXZlbkZ1bmN0aW9uID0gZXZlbnRzW2V2ZW50XS5pbmRleE9mKGZ1bmMpO1xuICAgICAgaWYgKGluZGV4T2ZHaXZlbkZ1bmN0aW9uICE9PSBOT1RfUFJFU0VOVF9JTl9USEVfQVJSQVkpIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50XS5zcGxpY2UoaW5kZXhPZkdpdmVuRnVuY3Rpb24sIDEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChcbiAgICAgICAgYFRoZXJlIGlzIGVpdGhlciBubyBzdWNoIGV2ZW50ICgke2V2ZW50fSkgcmVnaXN0ZXJlZCwgb3IgeW91ciBmdW5jdGlvbiBpc24ndCBwcmVzZW50IHRoZXJlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBlbWl0LCBvbiwgb2ZmIH07XG59KSgpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5pbXBvcnQgKiBhcyBmb3JtVXRpbHMgZnJvbSBcIi4vZm9ybS11dGlsaXRpZXNcIjtcbmltcG9ydCB7IFN1YnRhc2tNYW5hZ2VyIH0gZnJvbSBcIi4vbWFuYWdlcnMvc3VidGFzay1tYW5hZ2VyXCI7XG5cbmV4cG9ydCBjb25zdCBGT1JNX1JFR0lTVFJZID0ge307XG5jb25zdCBNT0RFUyA9IHsgQ1JFQVRJT046IDAsIEVESVRJTkc6IDEsIElORk9STUFUSU9OOiAyIH07XG5cbmNvbnN0IGNyZWF0ZVN1YnRhc2tCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNyZWF0ZS1zdWJ0YXNrLWJ1dHRvblwiKTtcbmNyZWF0ZVN1YnRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNyZWF0ZVN1YnRhc2spO1xuXG5jb25zdCBsaXN0Rm9ybSA9IHJlZ2lzdGVyRm9ybShcImxpc3QtZm9ybS1iYWNrZ3JvdW5kXCIsIFwiTGlzdFwiKTtcbmNvbnN0IHRhc2tGb3JtID0gcmVnaXN0ZXJGb3JtKFwidGFzay1mb3JtLWJhY2tncm91bmRcIiwgXCJUYXNrXCIpO1xuY29uc3QgcGFyZW50TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGFyZW50TGlzdFwiKTtcbnJlZ2lzdGVyTWFuYWdlcihcbiAgdGFza0Zvcm0sXG4gIG5ldyBTdWJ0YXNrTWFuYWdlcih0YXNrRm9ybSksXG4gIFwic3VidGFza01hbmFnZXJcIixcbiAgXCJzdWJ0YXNrc1wiXG4pO1xuXG5mdW5jdGlvbiByZWdpc3Rlck1hbmFnZXIoXG4gIHdvcmtpbmdGb3JtLFxuICBtYW5hZ2VyUmVmZXJlbmNlLFxuICBtYW5hZ2VyTmFtZSxcbiAgaW5wdXRQcm9wZXJ0eU5hbWVcbikge1xuICB3b3JraW5nRm9ybS5tYW5hZ2Vyc1ttYW5hZ2VyTmFtZV0gPSB7XG4gICAgcmVmZXJlbmNlOiBtYW5hZ2VyUmVmZXJlbmNlLFxuICAgIG5hbWU6IGlucHV0UHJvcGVydHlOYW1lLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVTdWJ0YXNrKCkge1xuICBjb25zdCBzdWJ0YXNrTWFuYWdlclJlZmVyZW5jZSA9IHRhc2tGb3JtLm1hbmFnZXJzLnN1YnRhc2tNYW5hZ2VyLnJlZmVyZW5jZTtcbiAgaWYgKCFzdWJ0YXNrTWFuYWdlclJlZmVyZW5jZS5pc0luc2lkZVBhcmVudEZvcm0oKSkge1xuICAgIGNvbnN0IHJvd3MgPSB0YXNrRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucm93XCIpO1xuICAgIGNvbnN0IGxhc3RSb3cgPSByb3dzW3Jvd3MubGVuZ3RoIC0gMV07XG4gICAgc3VidGFza01hbmFnZXJSZWZlcmVuY2Uuc2V0dXAoe1xuICAgICAgbm9kZUJlZm9yZVdoaWNoVG9QdXRTZWN0aW9uOiBsYXN0Um93LFxuICAgIH0pO1xuICB9XG4gIHN1YnRhc2tNYW5hZ2VyUmVmZXJlbmNlLmFkZFN1YnRhc2soKTtcbn1cblxuZnVuY3Rpb24gcmVnaXN0ZXJGb3JtKGJhY2tncm91bmRJZCwgY29kZW5hbWUpIHtcbiAgRk9STV9SRUdJU1RSWVtjb2RlbmFtZV0gPSBjb2RlbmFtZTtcbiAgY29uc3QgZm9ybUJhY2tncm91bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChiYWNrZ3JvdW5kSWQpO1xuICByZXR1cm4ge1xuICAgIGJhY2tncm91bmQ6IGZvcm1CYWNrZ3JvdW5kLFxuICAgIGZvcm06IGZvcm1CYWNrZ3JvdW5kLnF1ZXJ5U2VsZWN0b3IoXCJmb3JtXCIpLFxuICAgIHRpdGxlOiBmb3JtQmFja2dyb3VuZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZm9ybS10aXRsZVwiKVswXSxcbiAgICBtb2RlOiBNT0RFUy5DUkVBVElPTixcbiAgICBtYW5hZ2Vyczoge30sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1EYXRhKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuXG4gIGNvbnN0IGZvcm1JbnB1dERhdGEgPSB7fTtcbiAgQXJyYXkuZnJvbSh3b3JraW5nRm9ybS5mb3JtLmVsZW1lbnRzKS5mb3JFYWNoKChjdXJyZW50KSA9PiB7XG4gICAgaWYgKGN1cnJlbnQubm9kZU5hbWUgIT09IFwiQlVUVE9OXCIpIHtcbiAgICAgIGNvbnN0IGlucHV0Q29udGVudFR5cGUgPSBjdXJyZW50LmlkO1xuICAgICAgZm9ybUlucHV0RGF0YVtpbnB1dENvbnRlbnRUeXBlXSA9IGZvcm1VdGlscy50cmltSW5wdXQoY3VycmVudC52YWx1ZSk7XG4gICAgfVxuICB9KTtcbiAgaWYgKHdvcmtpbmdGb3JtLm1hbmFnZXJzKSB7XG4gICAgZm9yIChsZXQgbWFuYWdlciBvZiBPYmplY3QudmFsdWVzKHdvcmtpbmdGb3JtLm1hbmFnZXJzKSkge1xuICAgICAgZm9ybUlucHV0RGF0YVttYW5hZ2VyLm5hbWVdID0gbWFuYWdlci5yZWZlcmVuY2UuZ2V0RGF0YSgpO1xuICAgICAgbWFuYWdlci5yZWZlcmVuY2UucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBsZXQgcGF0aCA9IG51bGw7XG4gIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgcGF0aCA9IGZvcm1VdGlscy5nZXRFbnRpdHlQYXRoKHdvcmtpbmdGb3JtLCBmb3JtVHlwZSk7XG4gIH1cblxuICBpZiAod29ya2luZ0Zvcm0ubW9kZSA9PT0gTU9ERVMuQ1JFQVRJT04pIHtcbiAgICBQdWJTdWIuZW1pdChmb3JtVHlwZSArIFwiSXNSZWFkeUZvckNyZWF0aW9uXCIsIGZvcm1JbnB1dERhdGEpO1xuICB9IGVsc2UgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkVESVRJTkcpIHtcbiAgICBQdWJTdWIuZW1pdChmb3JtVHlwZSArIFwiSXNSZWFkeUZvckVkaXRpbmdcIiwge1xuICAgICAgZGF0YTogZm9ybUlucHV0RGF0YSxcbiAgICAgIHBhdGgsXG4gICAgfSk7XG4gIH1cbiAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpIHtcbiAgc3dpdGNoIChmb3JtVHlwZSkge1xuICAgIGNhc2UgRk9STV9SRUdJU1RSWS5MaXN0OlxuICAgICAgcmV0dXJuIGxpc3RGb3JtO1xuICAgIGNhc2UgRk9STV9SRUdJU1RSWS5UYXNrOlxuICAgICAgcmV0dXJuIHRhc2tGb3JtO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0Rm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uZm9ybS5yZXNldCgpO1xuICB3b3JraW5nRm9ybS5mb3JtLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtJHtmb3JtVHlwZX0tbGlzdC1pZFwiKTtcblxuICB3b3JraW5nRm9ybS50aXRsZS50ZXh0Q29udGVudCA9IGBDcmVhdGUgYSBuZXcgJHtmb3JtVHlwZX1gO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuQ1JFQVRJT047XG5cbiAgY29uc3QgZmluaXNoVXNpbmdGb3JtQnV0dG9uID1cbiAgICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoLWJ1dHRvblwiKTtcbiAgZmluaXNoVXNpbmdGb3JtQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuXG4gIGZvciAobGV0IG1hbmFnZXIgb2YgT2JqZWN0LnZhbHVlcyh3b3JraW5nRm9ybS5tYW5hZ2VycykpIHtcbiAgICBtYW5hZ2VyLnJlZmVyZW5jZS5yZXNldCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9wZW5Gb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblxuICBpZiAod29ya2luZ0Zvcm0gPT09IHRhc2tGb3JtKSB7XG4gICAgUHViU3ViLmVtaXQoXCJHZXRMaXN0UmVnaXN0cnlcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VGb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBpZiAod29ya2luZ0Zvcm0ubW9kZSAhPT0gTU9ERVMuQ1JFQVRJT04pIHtcbiAgICByZXNldEZvcm0oZm9ybVR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwUGFyZW50TGlzdFNlbGVjdGlvbihyZWdpc3RyeSkge1xuICBsZXQgcGFyZW50TGlzdENvbnRlbnQgPSBcIlwiO1xuICByZWdpc3RyeS5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgcGFyZW50TGlzdENvbnRlbnQgKz0gYDxvcHRpb24gdmFsdWU9XCIke2xpc3QuaWR9XCI+JHtsaXN0Lm5hbWV9PC9vcHRpb24+YDtcbiAgfSk7XG4gIHBhcmVudExpc3QuaW5uZXJIVE1MID0gcGFyZW50TGlzdENvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIHNldFBhcmVudExpc3RTZWxlY3Rpb25Ub1ZhbHVlKGlkKSB7XG4gIHBhcmVudExpc3QudmFsdWUgPSBpZDtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUZvcm1Gb3JFZGl0aW5nTW9kZShkYXRhKSB7XG4gIGNvbnN0IGZvcm1UeXBlID0gZGF0YS5mb3JtVHlwZTtcbiAgY29uc3QgZW50aXR5ID0gZGF0YS5lbnRpdHk7XG5cbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIGNvbnN0IGRhdGFzZXRQcm9wZXJ0eU5hbWUgPSBgZWRpdGFibGUke2Zvcm1UeXBlfUlkYDtcblxuICB3b3JraW5nRm9ybS50aXRsZS50ZXh0Q29udGVudCA9IGBFZGl0IGEgJHtkYXRhLmZvcm1UeXBlfWA7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5FRElUSU5HO1xuXG4gIEFycmF5LmZyb20od29ya2luZ0Zvcm0uZm9ybS5lbGVtZW50cykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLm5vZGVOYW1lICE9PSBcIkJVVFRPTlwiKSB7XG4gICAgICBub2RlLnZhbHVlID0gZW50aXR5W25vZGUuaWRdO1xuICAgIH1cbiAgfSk7XG4gIGZvciAobGV0IG1hbmFnZXIgb2YgT2JqZWN0LnZhbHVlcyh3b3JraW5nRm9ybS5tYW5hZ2VycykpIHtcbiAgICBjb25zdCByb3dzID0gd29ya2luZ0Zvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLnJvd1wiKTtcbiAgICBjb25zdCBsYXN0Um93ID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnNvbGUubG9nKG1hbmFnZXIsIGVudGl0eSk7XG4gICAgbWFuYWdlci5yZWZlcmVuY2Uuc2V0dXAoeyBlbnRpdHksIG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvbjogbGFzdFJvdyB9KTtcbiAgfVxuXG4gIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5MaXN0KSB7XG4gICAgd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0W2RhdGFzZXRQcm9wZXJ0eU5hbWVdID0gZW50aXR5LmlkO1xuICB9IGVsc2UgaWYgKGZvcm1UeXBlID09PSBGT1JNX1JFR0lTVFJZLlRhc2spIHtcbiAgICB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXRbXG4gICAgICBkYXRhc2V0UHJvcGVydHlOYW1lXG4gICAgXSA9IGAke2VudGl0eS5wYXJlbnRMaXN0fToke2VudGl0eS5pZH1gO1xuICB9XG59XG5cblB1YlN1Yi5vbihcIk9wZW5Gb3JtXCIsIG9wZW5Gb3JtKTtcblB1YlN1Yi5vbihcIkNsb3NlRm9ybVwiLCBjbG9zZUZvcm0pO1xuXG5QdWJTdWIub24oXCJVc2VyRmluaXNoZWRVc2luZ0Zvcm1cIiwgZ2V0Rm9ybURhdGEpO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdHJ5R2V0c1JldHVybmVkXCIsIHNldHVwUGFyZW50TGlzdFNlbGVjdGlvbik7XG5QdWJTdWIub24oXCJMaXN0SWRHZXRzUmV0dXJuZWRcIiwgc2V0UGFyZW50TGlzdFNlbGVjdGlvblRvVmFsdWUpO1xuXG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0VkaXRMaXN0XCIsIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUpO1xuUHViU3ViLm9uKFwiVXNlcldhbnRzVG9FZGl0VGFza1wiLCBwcmVwYXJlRm9ybUZvckVkaXRpbmdNb2RlKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmltSW5wdXQoaW5wdXRWYWx1ZSkge1xuICByZXR1cm4gaW5wdXRWYWx1ZS50cmltKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRpdHlQYXRoKHdvcmtpbmdGb3JtLCBmb3JtVHlwZSkge1xuICBjb25zdCBkYXRhc2V0UXVlcnkgPSBgZWRpdGFibGUke2Zvcm1UeXBlfUlkYDtcbiAgY29uc3QgZWRpdGFibGVFbnRpdHlJZCA9IHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldFtkYXRhc2V0UXVlcnldO1xuICBjb25zdCBwYXRoQXJyYXkgPSBlZGl0YWJsZUVudGl0eUlkLnNwbGl0KFwiOlwiKTtcbiAgY29uc3QgcGF0aCA9IHsgbGlzdElkOiBwYXRoQXJyYXlbMF0sIHRhc2tJZDogcGF0aEFycmF5WzFdIH07XG4gIHJldHVybiBwYXRoO1xufVxuIiwiaW1wb3J0IHsgU3VidGFza0NyZWF0b3IgfSBmcm9tIFwiLi4vLi4vc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1jcmVhdG9yXCI7XG5pbXBvcnQgeyBTdWJ0YXNrUmVnaXN0cmFyIH0gZnJvbSBcIi4uLy4uL3N1YnRhc2tNYW5hZ2VtZW50L3N1YnRhc2stcmVnaXN0cmFyXCI7XG5pbXBvcnQgeyBTdWJ0YXNrUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1yZW5kZXJlclwiO1xuXG5leHBvcnQgY2xhc3MgU3VidGFza01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRGb3JtKSB7XG4gICAgdGhpcy5wYXJlbnRGb3JtID0gcGFyZW50Rm9ybTtcbiAgICB0aGlzLnN1YnRhc2tTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnN1YnRhc2tTZWN0aW9uLmlkID0gXCJzdWJ0YXNrLXNlY3Rpb25cIjtcblxuICAgIHRoaXMuc3VidGFza0NyZWF0b3IgPSBuZXcgU3VidGFza0NyZWF0b3IoKTtcbiAgICB0aGlzLnN1YnRhc2tSZWdpc3RyYXIgPSBuZXcgU3VidGFza1JlZ2lzdHJhcigpO1xuICAgIHRoaXMuc3VidGFza1JlbmRlcmVyID0gbmV3IFN1YnRhc2tSZW5kZXJlcih0aGlzLnN1YnRhc2tTZWN0aW9uKTtcbiAgfVxuXG4gIGlzSW5zaWRlUGFyZW50Rm9ybSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJlbnRGb3JtLmZvcm0uY29udGFpbnModGhpcy5zdWJ0YXNrU2VjdGlvbik7XG4gIH1cblxuICBzZXR1cCh7IG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvbiA9IG51bGwsIGVudGl0eSA9IG51bGwgfSkge1xuICAgIGlmIChlbnRpdHkpIHtcbiAgICAgIGVudGl0eS5zdWJ0YXNrcy5mb3JFYWNoKChzdWJ0YXNrKSA9PiB7XG4gICAgICAgIHRoaXMuYWRkU3VidGFzayhzdWJ0YXNrKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobm9kZUJlZm9yZVdoaWNoVG9QdXRTZWN0aW9uKSB7XG4gICAgICB0aGlzLnBhcmVudEZvcm0uZm9ybS5pbnNlcnRCZWZvcmUoXG4gICAgICAgIHRoaXMuc3VidGFza1NlY3Rpb24sXG4gICAgICAgIG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJlbnRGb3JtLmZvcm0uYXBwZW5kQ2hpbGQodGhpcy5zdWJ0YXNrU2VjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgYWRkU3VidGFzayhzdWJ0YXNrKSB7XG4gICAgY29uc3QgbmV3U3VidGFzayA9IHN1YnRhc2sgPyBzdWJ0YXNrIDogdGhpcy5zdWJ0YXNrQ3JlYXRvci5jcmVhdGVTdWJ0YXNrKCk7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLnJlZ2lzdGVyU3VidGFzayhuZXdTdWJ0YXNrKTtcbiAgICB0aGlzLnN1YnRhc2tSZW5kZXJlci5yZW5kZXJTdWJ0YXNrKG5ld1N1YnRhc2spO1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJhci51cGRhdGVJZHMoKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3VidGFza1JlZ2lzdHJhci5nZXRTdWJ0YXNrcyh0aGlzLnN1YnRhc2tTZWN0aW9uKTtcbiAgfVxuXG4gIHJlc2V0KCkge1xuICAgIGNvbnN0IHJlZ2lzdHJ5ID0gdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLmdldFN1YnRhc2tzKCk7XG4gICAgdGhpcy5zdWJ0YXNrUmVuZGVyZXIudW5yZW5kZXJTdWJ0YXNrcyhyZWdpc3RyeSk7XG5cbiAgICB0aGlzLnN1YnRhc2tSZWdpc3RyYXIucmVzZXRSZWdpc3RyeSgpO1xuICAgIHRoaXMuc3VidGFza1NlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcbiAgICB0aGlzLnN1YnRhc2tTZWN0aW9uLnJlbW92ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgXCIuL2xpc3QtY3JlYXRvclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlZ2lzdHJhclwiO1xuaW1wb3J0IFwiLi9saXN0LXJlbmRlcmVyXCI7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSBcIi4vbGlzdFwiO1xuXG5mdW5jdGlvbiBjcmVhdGVEZWZhdWx0TGlzdCgpIHtcbiAgY29uc3QgY3JlYXRpb25EYXRhID0geyBuYW1lOiBcIkRlZmF1bHRcIiwgY29sb3I6IFwiI2NjY1wiIH07XG4gIGNvbnN0IGRlZmF1bHRMaXN0ID0gbmV3IExpc3QoY3JlYXRpb25EYXRhKTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBkZWZhdWx0TGlzdCk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5ld0xpc3QobmV3RGF0YSkge1xuICBjb25zdCBsaXN0ID0gbmV3IExpc3QobmV3RGF0YSk7XG4gIGFkZE5vbkRlZmF1bHRMaXN0QnV0dG9ucyhsaXN0KTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UGVuZGluZ1wiLCBsaXN0KTtcbn1cblxuZnVuY3Rpb24gYWRkTm9uRGVmYXVsdExpc3RCdXR0b25zKGxpc3QpIHtcbiAgbGlzdC5FZGl0TGlzdEJ1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgIFwiZWRpdFwiLFxuICAgIFwiZWRpdC1idXR0b25cIixcbiAgICBsaXN0LFxuICAgIFwiRWRpdExpc3RCdXR0b25cIlxuICApO1xuICBsaXN0LkVkaXRMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRMaXN0XCIsIHtcbiAgICAgIGVudGl0eTogbGlzdCxcbiAgICAgIGZvcm1UeXBlOiBGT1JNX1JFR0lTVFJZLkxpc3QsXG4gICAgfSk7XG4gICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xuICB9KTtcblxuICBsaXN0LlJlbW92ZUxpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICBcInhcIixcbiAgICBcInJlbW92ZS1idXR0b25cIixcbiAgICBsaXN0LFxuICAgIFwiUmVtb3ZlTGlzdEJ1dHRvblwiXG4gICk7XG4gIGxpc3QuUmVtb3ZlTGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFB1YlN1Yi5lbWl0KFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCBsaXN0KTtcbiAgfSk7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgY3JlYXRlTmV3TGlzdCk7XG5QdWJTdWIub24oXCJDcmVhdGVEZWZhdWx0TGlzdFwiLCBjcmVhdGVEZWZhdWx0TGlzdCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4uL1B1YlN1YlwiKTtcblxuY29uc3QgTElTVF9SRUdJU1RSWSA9IFtdO1xuXG5mdW5jdGlvbiBhZGRMaXN0VG9SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkucHVzaChsaXN0KTtcbiAgbGlzdC5pZCA9IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMTtcbiAgY29uc3QgbGlzdERhdGEgPSB7IGxpc3QsIGxpc3RJZDogTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxIH07XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdGVyZWRcIiwgbGlzdERhdGEpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVMaXN0SWRzKCkge1xuICBmb3IgKGxldCBpID0gMTsgaSA8IExJU1RfUkVHSVNUUlkubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBsaXN0ID0gTElTVF9SRUdJU1RSWVtpXTtcbiAgICBsaXN0LmlkID0gaTtcbiAgICBsaXN0LmRpdi5kYXRhc2V0Lmxpc3RJZCA9IGk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVtb3ZlTGlzdEZyb21SZWdpc3RyeShsaXN0KSB7XG4gIExJU1RfUkVHSVNUUlkuc3BsaWNlKGxpc3QuaWQsIDEpO1xuICB1cGRhdGVMaXN0SWRzKCk7XG59XG5cbmZ1bmN0aW9uIGVkaXRMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IGVkaXRhYmxlTGlzdCA9IExJU1RfUkVHSVNUUllbbGlzdERhdGEucGF0aC5saXN0SWRdO1xuICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhsaXN0RGF0YS5kYXRhKSkge1xuICAgIGVkaXRhYmxlTGlzdFtrZXldID0gdmFsdWU7XG4gIH1cbiAgUHViU3ViLmVtaXQoXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIHtcbiAgICBsaXN0OiBlZGl0YWJsZUxpc3QsXG4gICAgbGlzdElkOiBlZGl0YWJsZUxpc3QuaWQsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRMaXN0UmVnaXN0cnkoKSB7XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFJlZ2lzdHJ5R2V0c1JldHVybmVkXCIsIExJU1RfUkVHSVNUUlkpO1xufVxuXG5QdWJTdWIub24oXCJMaXN0UGVuZGluZ1wiLCBhZGRMaXN0VG9SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JFZGl0aW5nXCIsIGVkaXRMaXN0KTtcblB1YlN1Yi5vbihcIkdldExpc3RSZWdpc3RyeVwiLCBnZXRMaXN0UmVnaXN0cnkpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgYXBwZW5kRW50aXR5LCByZW1vdmVFbnRpdHlEaXYgfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5cbmNvbnN0IGxpc3REaXNwbGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaXN0c1wiKTtcblxuZnVuY3Rpb24gcmVuZGVyTGlzdChsaXN0RGF0YSkge1xuICBjb25zdCBsaXN0ID0gbGlzdERhdGEubGlzdDtcblxuICBjb25zdCBsaXN0RGl2ID0gbGlzdC5kaXY7XG4gIGxpc3REaXYuZGF0YXNldC5saXN0SWQgPSBsaXN0RGF0YS5saXN0SWQ7XG4gIGxpc3REaXYuY2xhc3NMaXN0LmFkZChcImxpc3RcIik7XG4gIGxpc3REaXYuc3R5bGUuYm9yZGVyQ29sb3IgPSBsaXN0LmNvbG9yO1xuXG4gIGFwcGVuZEVudGl0eShsaXN0RGlzcGxheSwgXCJsaXN0XCIsIGxpc3QsIGxpc3REaXYpO1xuXG4gIGNvbnN0IGxpc3RSb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBsaXN0Um93LmNsYXNzTGlzdC5hZGQoXCJsaXN0LXJvd1wiKTtcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChsaXN0Um93KTtcblxuICBjb25zdCBsaXN0TmFtZVRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgbGlzdE5hbWVUZXh0LmNsYXNzTGlzdC5hZGQoXCJsaXN0LW5hbWVcIik7XG4gIGxpc3ROYW1lVGV4dC50ZXh0Q29udGVudCA9IGxpc3QubmFtZTtcbiAgbGlzdFJvdy5hcHBlbmRDaGlsZChsaXN0TmFtZVRleHQpO1xuXG4gIGNvbnN0IGJ1dHRvbnNEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgbGlzdFJvdy5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcblxuICByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KTtcblxuICBjb25zdCBociA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoclwiKTtcbiAgbGlzdERpdi5hcHBlbmRDaGlsZChocik7XG5cbiAgY29uc3QgdGFza1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB0YXNrU2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1zZWN0aW9uXCIpO1xuICBsaXN0RGl2LmFwcGVuZENoaWxkKHRhc2tTZWN0aW9uKTtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdikge1xuICBPYmplY3QudmFsdWVzKGxpc3QuYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc3RvcFJlbmRlcmluZ0xpc3QobGlzdCkge1xuICByZW1vdmVFbnRpdHlEaXYobGlzdCk7XG59XG5cbmZ1bmN0aW9uIHJlcmVuZGVyTGlzdChsaXN0RGF0YSkge1xuICBzdG9wUmVuZGVyaW5nTGlzdChsaXN0RGF0YS5saXN0KTtcbiAgcmVuZGVyTGlzdChsaXN0RGF0YSk7XG59XG5cblB1YlN1Yi5vbihcIkRlZmF1bHRMaXN0UGVuZGluZ1wiLCByZW5kZXJMaXN0KTtcblB1YlN1Yi5vbihcIkxpc3RSZWdpc3RlcmVkXCIsIHJlbmRlckxpc3QpO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCBzdG9wUmVuZGVyaW5nTGlzdCk7XG5QdWJTdWIub24oXCJsaXN0U2hvdWxkQmVSZXJlbmRlcmVkXCIsIHJlcmVuZGVyTGlzdCk7XG4iLCJpbXBvcnQgeyBUYXNrQ3JlYXRvciB9IGZyb20gXCIuLi90YXNrTWFuYWdlbWVudC90YXNrLWNyZWF0b3JcIjtcbmltcG9ydCB7IFRhc2tSZWdpc3RyYXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXJcIjtcbmltcG9ydCB7IFRhc2tSZW5kZXJlciB9IGZyb20gXCIuLi90YXNrTWFuYWdlbWVudC90YXNrLXJlbmRlcmVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXR1cFRhc2tIZWxwZXJzKGxpc3QpIHtcbiAgbGlzdC50YXNrQ3JlYXRvciA9IG5ldyBUYXNrQ3JlYXRvcigpO1xuICBsaXN0LnRhc2tSZWdpc3RyYXIgPSBuZXcgVGFza1JlZ2lzdHJhcigpO1xuICBsaXN0LnRhc2tSZW5kZXJlciA9IG5ldyBUYXNrUmVuZGVyZXIobGlzdC5kaXYpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZXN0YWJsaXNoTmV3VGFzayh0YXNrRGF0YSkge1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2tEYXRhLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgY29uc3QgdGFzayA9IHRoaXMudGFza0NyZWF0b3IuY3JlYXRlVGFzayh0YXNrRGF0YSk7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLnJlZ2lzdGVyVGFzayh0YXNrKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5yZW5kZXJUYXNrKHRoaXMuZGl2LCB0YXNrKTtcbiAgICBjb25zb2xlLmxvZyh0YXNrKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZWRpdFRhc2sodGFza0RhdGEpIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrRGF0YS5wYXRoLmxpc3RJZCwgdGhpcy5pZCkpIHtcbiAgICBjb25zdCBlZGl0ZWRUYXNrID0gdGhpcy50YXNrUmVnaXN0cmFyLmVkaXRUYXNrKHRhc2tEYXRhKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5yZXJlbmRlclRhc2sodGhpcy5kaXYsIGVkaXRlZFRhc2spO1xuICAgIGNvbnNvbGUubG9nKHRhc2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2spIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLmRlbGV0ZVRhc2sodGFzayk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIuc3RvcFJlbmRlcmluZ1Rhc2sodGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrVGFzayh0YXNrKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFzay5wYXJlbnRMaXN0LCB0aGlzLmlkKSkge1xuICAgIHRoaXMudGFza1JlZ2lzdHJhci5zZXRUYXNrRmluaXNoZWQoeyB0YXNrLCBmaW5pc2hlZDogdHJ1ZSB9KTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5yZW5kZXJUYXNrQXNDaGVja2VkKHRhc2suZGl2KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdW5jaGVja1Rhc2sodGFzaykge1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2sucGFyZW50TGlzdCwgdGhpcy5pZCkpIHtcbiAgICB0aGlzLnRhc2tSZWdpc3RyYXIuc2V0VGFza0ZpbmlzaGVkKHsgdGFzaywgZmluaXNoZWQ6IGZhbHNlIH0pO1xuICAgIHRoaXMudGFza1JlbmRlcmVyLnJlbmRlclRhc2tBc1VuY2hlY2tlZCh0YXNrLmRpdik7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGFza0JlbG9uZ3NUb1RoaXNMaXN0KGxpc3ROYW1lVGFza0lzTG9va2luZ0ZvciwgY3VycmVudExpc3ROYW1lKSB7XG4gIHJldHVybiBsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IgPT0gY3VycmVudExpc3ROYW1lO1xufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IHNldHVwQnV0dG9uIH0gZnJvbSBcIi4uL3V0aWxpdGllc1wiO1xuaW1wb3J0ICogYXMgbGlzdFV0aWxzIGZyb20gXCIuL2xpc3QtdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgaWQgPSBudWxsO1xuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zID0ge307XG5cbiAgY29uc3RydWN0b3IoZGF0YSkge1xuICAgIHRoaXMubmFtZSA9IGRhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmNvbG9yID0gZGF0YS5jb2xvcjtcblxuICAgIHRoaXMuU29ydExpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwic29ydFwiLFxuICAgICAgXCJzb3J0LWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiU29ydExpc3RCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uID0gc2V0dXBCdXR0b24oXCIrXCIsIFwiYWRkLWJ1dHRvblwiLCB0aGlzLCBcIkFkZFRhc2tCdXR0b25cIik7XG4gICAgdGhpcy5BZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgICBQdWJTdWIuZW1pdChcIkxpc3RJZEdldHNSZXR1cm5lZFwiLCB0aGlzLmlkKTtcbiAgICB9KTtcblxuICAgIGxpc3RVdGlscy5zZXR1cFRhc2tIZWxwZXJzKHRoaXMpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgbGlzdFV0aWxzLmVzdGFibGlzaE5ld1Rhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFwiVGFza0lzUmVhZHlGb3JFZGl0aW5nXCIsIGxpc3RVdGlscy5lZGl0VGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIiwgbGlzdFV0aWxzLmRlbGV0ZVRhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFwiVGFza0NoZWNrZWRcIiwgbGlzdFV0aWxzLmNoZWNrVGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJUYXNrVW5jaGVja2VkXCIsIGxpc3RVdGlscy51bmNoZWNrVGFzay5iaW5kKHRoaXMpKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgU3VidGFzayB9IGZyb20gXCIuL3N1YnRhc2tcIjtcblxuZXhwb3J0IGNsYXNzIFN1YnRhc2tDcmVhdG9yIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGNyZWF0ZVN1YnRhc2soKSB7XG4gICAgcmV0dXJuIG5ldyBTdWJ0YXNrKCk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTdWJ0YXNrUmVnaXN0cmFyIHtcbiAgc3VidGFza1JlZ2lzdHJ5ID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyU3VidGFzayhzdWJ0YXNrKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cnkucHVzaChzdWJ0YXNrKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN1YnRhc2tSZWdpc3RyeSk7XG4gIH1cblxuICB1cGRhdGVJZHMoKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cnkuZm9yRWFjaCgoc3VidGFzaywgaW5kZXgpID0+IHtcbiAgICAgIHN1YnRhc2suaWQgPSBpbmRleDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFN1YnRhc2tzKCkge1xuICAgIHJldHVybiB0aGlzLnN1YnRhc2tSZWdpc3RyeTtcbiAgfVxuXG4gIHJlc2V0UmVnaXN0cnkoKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cnkgPSBbXTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN1YnRhc2tSZWdpc3RyeSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IHJlbW92ZUVudGl0eURpdiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFN1YnRhc2tSZW5kZXJlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudERpdikge1xuICAgIHRoaXMucGFyZW50RGl2ID0gcGFyZW50RGl2O1xuICB9XG5cbiAgcmVuZGVyU3VidGFzayhzdWJ0YXNrKSB7XG4gICAgY29uc3Qgc3VidGFza0RpdiA9IHN1YnRhc2suZGl2O1xuICAgIHN1YnRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInN1YnRhc2stZGl2XCIpO1xuICAgIHRoaXMucGFyZW50RGl2LmFwcGVuZENoaWxkKHN1YnRhc2tEaXYpO1xuXG4gICAgY29uc3Qgc3VidGFza0NvbnRlbnRJbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBzdWJ0YXNrQ29udGVudElucHV0LmNsYXNzTGlzdC5hZGQoXCJzdWJ0YXNrLWNvbnRlbnRcIik7XG5cbiAgICBzdWJ0YXNrRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tDb250ZW50SW5wdXQpO1xuICAgIGlmIChzdWJ0YXNrKSB7XG4gICAgICBzdWJ0YXNrQ29udGVudElucHV0LnRleHRDb250ZW50ID0gc3VidGFzay5jb250ZW50O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhzdWJ0YXNrRGl2KTtcbiAgfVxuXG4gIHVucmVuZGVyU3VidGFza3Moc3VidGFza3NSZWdpc3RyeSkge1xuICAgIHN1YnRhc2tzUmVnaXN0cnkuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5kaXYuaW5uZXJIVE1MID0gXCJcIjtcbiAgICB9KTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFN1YnRhc2sge1xuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBjb250ZW50ID0gXCJcIjtcbiAgaWQgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cbn1cbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVUYXNrKHRhc2tEYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBUYXNrKHRhc2tEYXRhKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tSZWdpc3RyYXIge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnB1c2godGFzayk7XG4gICAgdGFzay5pZCA9IHRoaXMuVEFTS19SRUdJU1RSWS5sZW5ndGggLSAxO1xuICB9XG5cbiAgdXBkYXRlSWRzKCkge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgdGFzay5pZCA9IGluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZWRpdFRhc2sodGFza0RhdGEpIHtcbiAgICBjb25zdCBlZGl0YWJsZVRhc2sgPSB0aGlzLlRBU0tfUkVHSVNUUllbdGFza0RhdGEucGF0aC50YXNrSWRdO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRhc2tEYXRhLmRhdGEpKSB7XG4gICAgICBlZGl0YWJsZVRhc2tba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZWRpdGFibGVUYXNrO1xuICB9XG5cbiAgc2V0VGFza0ZpbmlzaGVkKGRhdGEpIHtcbiAgICBkYXRhLnRhc2suZmluaXNoZWQgPSBkYXRhLmZpbmlzaGVkO1xuICB9XG5cbiAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnNwbGljZSh0YXNrLmlkLCAxKTtcbiAgICB0aGlzLnVwZGF0ZUlkcygpO1xuICB9XG59XG4iLCJpbXBvcnQgaXNQYXN0IGZyb20gXCJkYXRlLWZucy9pc1Bhc3RcIjtcbmltcG9ydCBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0IGZyb20gXCJkYXRlLWZucy9mb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0XCI7XG5pbXBvcnQgeyBhcHBlbmRFbnRpdHksIHJlbW92ZUVudGl0eURpdiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2tSZW5kZXJlciB7XG4gIGNvbnN0cnVjdCgpIHt9XG5cbiAgcmVuZGVyVGFzayhwYXJlbnRMaXN0RGl2LCB0YXNrKSB7XG4gICAgY29uc3QgcGFyZW50TGlzdFRhc2tTZWN0aW9uID0gcGFyZW50TGlzdERpdi5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VjdGlvblwiKTtcblxuICAgIGNvbnN0IHRhc2tEaXYgPSB0YXNrLmRpdjtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIGFwcGVuZEVudGl0eShwYXJlbnRMaXN0VGFza1NlY3Rpb24sIFwidGFza1wiLCB0YXNrLCB0YXNrRGl2KTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFzay5maW5pc2hUYXNrQ2hlY2tib3gpO1xuXG4gICAgY29uc3QgdGFza05hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza05hbWVUZXh0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgdGFza05hbWVUZXh0LnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza05hbWVUZXh0KTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZChcImR1ZS1kYXRlXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdCh0YXNrLmR1ZURhdGUpO1xuICAgIHNldHVwUG9zdHBvbmVkQ2xhc3ModGFzay5kdWVEYXRlLCB0YXNrRHVlRGF0ZSk7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG5cbiAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xuXG4gICAgdGhpcy5yZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKTtcbiAgICB0aGlzLnJlbmRlclRhc2tBc1VuY2hlY2tlZCh0YXNrRGl2KTtcbiAgfVxuXG4gIHJlbmRlclRhc2tCdXR0b25zKGJ1dHRvbnNEaXYsIHRhc2spIHtcbiAgICBPYmplY3QudmFsdWVzKHRhc2suYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgfSk7XG4gIH1cblxuICByZXJlbmRlclRhc2socGFyZW50TGlzdERpdiwgdGFzaykge1xuICAgIHRoaXMuc3RvcFJlbmRlcmluZ1Rhc2sodGFzayk7XG4gICAgdGhpcy5yZW5kZXJUYXNrKHBhcmVudExpc3REaXYsIHRhc2spO1xuICB9XG5cbiAgcmVuZGVyVGFza0FzQ2hlY2tlZCh0YXNrRGl2KSB7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QucmVtb3ZlKFwidW5jaGVja2VkLXRhc2tcIik7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZC10YXNrXCIpO1xuICB9XG5cbiAgcmVuZGVyVGFza0FzVW5jaGVja2VkKHRhc2tEaXYpIHtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkLXRhc2tcIik7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidW5jaGVja2VkLXRhc2tcIik7XG4gIH1cblxuICBzdG9wUmVuZGVyaW5nVGFzayh0YXNrKSB7XG4gICAgcmVtb3ZlRW50aXR5RGl2KHRhc2spO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwUG9zdHBvbmVkQ2xhc3MoZHVlRGF0ZVZhbHVlLCB0YXNrRHVlRGF0ZUVsZW1lbnQpIHtcbiAgaWYgKGlzUG9zdHBvbmVkKGR1ZURhdGVWYWx1ZSkpIHtcbiAgICB0YXNrRHVlRGF0ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInBvc3Rwb25lZFwiKTtcbiAgfSBlbHNlIHtcbiAgICB0YXNrRHVlRGF0ZUVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcInBvc3Rwb25lZFwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1Bvc3Rwb25lZChkdWVEYXRlVmFsdWUpIHtcbiAgcmV0dXJuIGlzUGFzdChkdWVEYXRlVmFsdWUpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIHNldHVwRHVlRGF0ZShkdWVEYXRlU3RyaW5nKSB7XG4gIGlmIChkdWVEYXRlU3RyaW5nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGR1ZURhdGVTdHJpbmcpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgRGF0ZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQgeyBzZXR1cER1ZURhdGUgfSBmcm9tIFwiLi90YXNrLXV0aWxpdGllc1wiO1xuXG5leHBvcnQgY2xhc3MgVGFzayB7XG4gIGlkID0gbnVsbDtcbiAgZmluaXNoZWQgPSBmYWxzZTtcbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9ucyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHRhc2tEYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gdGFza0RhdGEubmFtZSB8fCBcIlVubmFtZWRcIjtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGFza0RhdGEuZGVzY3JpcHRpb247XG4gICAgdGhpcy5fZHVlRGF0ZSA9IHNldHVwRHVlRGF0ZSh0YXNrRGF0YS5kdWVEYXRlKTtcbiAgICB0aGlzLnN1YnRhc2tzID0gdGFza0RhdGEuc3VidGFza3M7XG4gICAgdGhpcy5wcmlvcml0eSA9IHRhc2tEYXRhLnByaW9yaXR5O1xuICAgIHRoaXMucGFyZW50TGlzdCA9IHRhc2tEYXRhLnBhcmVudExpc3Q7XG5cbiAgICB0aGlzLmRpdi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJ0YXNrXCIpIHx8IGUudGFyZ2V0Lm5vZGVOYW1lID09PSBcIlBcIikge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdFRhc2tcIiwge1xuICAgICAgICAgIGZvcm1UeXBlOiBGT1JNX1JFR0lTVFJZLlRhc2ssXG4gICAgICAgICAgZW50aXR5OiB0aGlzLFxuICAgICAgICB9KTtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcImNoZWNrYm94XCIpO1xuICAgIHRoaXMuZmluaXNoVGFza0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcbiAgICAgIGlmIChlLmN1cnJlbnRUYXJnZXQuY2hlY2tlZCkge1xuICAgICAgICBQdWJTdWIuZW1pdChcIlRhc2tDaGVja2VkXCIsIHRoaXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJUYXNrVW5jaGVja2VkXCIsIHRoaXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJlZGl0XCIsXG4gICAgICBcImVkaXQtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJFZGl0VGFza0J1dHRvblwiXG4gICAgKTtcbiAgICB0aGlzLkVkaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdFRhc2tcIiwge1xuICAgICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5UYXNrLFxuICAgICAgICBlbnRpdHk6IHRoaXMsXG4gICAgICB9KTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgICB9KTtcblxuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJ4XCIsXG4gICAgICBcImRlbGV0ZS1idXR0b25cIixcbiAgICAgIHRoaXMsXG4gICAgICBcIkRlbGV0ZVRhc2tCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5EZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRGVsZXRlVGFza1wiLCB0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZURpdigpIHtcbiAgICB0aGlzLmRpdi5yZW1vdmUoKTtcbiAgICB0aGlzLmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIH1cblxuICBnZXQgZHVlRGF0ZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fZHVlRGF0ZTtcbiAgfVxuXG4gIHNldCBkdWVEYXRlKHZhbHVlKSB7XG4gICAgdGhpcy5fZHVlRGF0ZSA9IHNldHVwRHVlRGF0ZSh2YWx1ZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1PcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1mb3JtLW9wZW4tYnV0dG9uXCJcbik7XG5saXN0Rm9ybU9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBsaXN0Rm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwibGlzdC1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5pc2gtbGlzdC1idXR0b25cIik7XG5maW5pc2hVc2luZ0xpc3RGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG59KTtcblxuZXhwb3J0IGNvbnN0IHRhc2tGb3JtQ2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgXCJ0YXNrLWZvcm0tY2xvc2UtYnV0dG9uXCJcbik7XG50YXNrRm9ybUNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG59KTtcblxuZXhwb3J0IGNvbnN0IGZpbmlzaFVzaW5nVGFza0Zvcm1CdXR0b24gPVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZpbmlzaC10YXNrLWJ1dHRvblwiKTtcbmZpbmlzaFVzaW5nVGFza0Zvcm1CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJVc2VyRmluaXNoZWRVc2luZ0Zvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbn0pO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHNldHVwQnV0dG9uKG5hbWUsIGNsYXNzTmFtZSwgcGFyZW50LCBidXR0b25BcnJheU5hbWUpIHtcbiAgY29uc3QgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcbiAgYnV0dG9uLnRleHRDb250ZW50ID0gbmFtZTtcbiAgYnV0dG9uLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgcGFyZW50LmJ1dHRvbnNbYnV0dG9uQXJyYXlOYW1lXSA9IGJ1dHRvbjtcbiAgcmV0dXJuIGJ1dHRvbjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUVudGl0eURpdihlbnRpdHkpIHtcbiAgZW50aXR5LmRpdi5yZW1vdmUoKTtcbiAgZW50aXR5LmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcHBlbmRFbnRpdHkocGFyZW50LCBjbGFzc05hbWUsIGVudGl0eSwgZW50aXR5RGl2KSB7XG4gIGNvbnN0IHNpYmxpbmdFbnRpdHlUb1B1dEFmdGVyID1cbiAgICBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpW2VudGl0eS5pZCAtIDFdO1xuICBpZiAoc2libGluZ0VudGl0eVRvUHV0QWZ0ZXIpIHtcbiAgICBpbnNlcnRBZnRlcihzaWJsaW5nRW50aXR5VG9QdXRBZnRlciwgZW50aXR5RGl2KTtcbiAgfSBlbHNlIHtcbiAgICBwYXJlbnQucHJlcGVuZChlbnRpdHlEaXYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluc2VydEFmdGVyKG5vZGVUb1B1dEFmdGVyLCBuZXdOb2RlKSB7XG4gIG5vZGVUb1B1dEFmdGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKG5ld05vZGUsIG5vZGVUb1B1dEFmdGVyLm5leHRTaWJsaW5nKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIF90eXBlb2Yob2JqKSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcblxuICByZXR1cm4gX3R5cGVvZiA9IFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIFwic3ltYm9sXCIgPT0gdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA/IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIFwiZnVuY3Rpb25cIiA9PSB0eXBlb2YgU3ltYm9sICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqO1xuICB9LCBfdHlwZW9mKG9iaik7XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcIi4vdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9saXN0TWFuYWdlbWVudC9saXN0LWJ1bmRsZVwiO1xuaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4vUHViU3ViXCI7XG5cblB1YlN1Yi5lbWl0KFwiQ3JlYXRlRGVmYXVsdExpc3RcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=