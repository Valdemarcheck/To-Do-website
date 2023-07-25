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

/***/ "./src/css/styles.css":
/*!****************************!*\
  !*** ./src/css/styles.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
      const data = manager.reference.getData();
      console.log(data);
      formInputData[manager.name] = data;
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
    if (entity[manager.name].length > 0) {
      manager.reference.setup({ entity, nodeBeforeWhichToPutSection: lastRow });
    }
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
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _subtaskManagement_subtask_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../subtaskManagement/subtask-creator */ "./src/js/subtaskManagement/subtask-creator.js");
/* harmony import */ var _subtaskManagement_subtask_registrar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../subtaskManagement/subtask-registrar */ "./src/js/subtaskManagement/subtask-registrar.js");
/* harmony import */ var _subtaskManagement_subtask_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../subtaskManagement/subtask-renderer */ "./src/js/subtaskManagement/subtask-renderer.js");





class SubtaskManager {
  constructor(parentForm) {
    this.parentForm = parentForm;
    this.subtaskSection = document.createElement("div");
    this.subtaskSection.id = "subtask-section";

    this.subtaskCreator = new _subtaskManagement_subtask_creator__WEBPACK_IMPORTED_MODULE_1__.SubtaskCreator();
    this.subtaskRegistrar = new _subtaskManagement_subtask_registrar__WEBPACK_IMPORTED_MODULE_2__.SubtaskRegistrar(this.subtaskSection);
    this.subtaskRenderer = new _subtaskManagement_subtask_renderer__WEBPACK_IMPORTED_MODULE_3__.SubtaskRenderer(this.subtaskSection);

    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on("UserWantsToRemoveSubtask", this.removeSubtask.bind(this));
    _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
      "UserWantsToCheckSubtask",
      this.checkSubtaskFinishedOrOtherwise.bind(this)
    );
  }

  checkSubtaskFinishedOrOtherwise(subtask) {
    this.subtaskRegistrar.setCheckedOrOtherwise(subtask);
    this.subtaskRenderer.renderCheckedOrOtherwise(subtask);
  }

  removeSubtask(subtask) {
    this.subtaskRenderer.stopRenderingSubtask(subtask.div);
    this.subtaskRegistrar.removeSubtaskById(subtask);

    if (!this.subtaskSection.hasChildNodes()) {
      this.subtaskSection.remove();
    }
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
    this.subtaskRegistrar.applyData();
    return this.subtaskRegistrar.getSubtasks(this.subtaskSection);
  }

  reset() {
    const registry = this.subtaskRegistrar.getSubtasks();
    this.subtaskRenderer.stopRenderingSubtasksInnerElements(registry);

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
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../taskManagement/task-creator */ "./src/js/taskManagement/task-creator.js");
/* harmony import */ var _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../taskManagement/task-registrar */ "./src/js/taskManagement/task-registrar.js");
/* harmony import */ var _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../taskManagement/task-renderer */ "./src/js/taskManagement/task-renderer.js");





function setupTaskHelpers(list) {
  list.taskCreator = new _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_1__.TaskCreator();
  list.taskRegistrar = new _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_2__.TaskRegistrar();
  list.taskRenderer = new _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_3__.TaskRenderer(list.div);
}

function establishNewTask(taskData) {
  if (taskBelongsToThisList(taskData.parentList, this.id)) {
    const task = this.taskCreator.createTask(taskData);
    this.taskRegistrar.registerTask(task);
    this.taskRenderer.renderTask(this.div, task);
  }
}

function editTask(taskData) {
  if (taskBelongsToThisList(taskData.path.listId, this.id)) {
    const editedTask = this.taskRegistrar.editTask(taskData);
    this.taskRenderer.rerenderTask(this.div, editedTask);
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

  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  registerSubtask(subtask) {
    this.subtaskRegistry.push(subtask);
  }

  updateIds() {
    this.subtaskRegistry.forEach((subtask, index) => {
      subtask.id = index;
    });
  }

  applyData() {
    const queryForInputElements = "input:not([type='checkbox'])";
    const inputs = this.parentDiv.querySelectorAll(queryForInputElements);

    inputs.forEach((item, index) => {
      const subtask = this.subtaskRegistry[index];
      console.log(subtask, subtask.content, item, item.value);
      subtask.content = item.value;
    });
  }

  getSubtasks() {
    return this.subtaskRegistry;
  }

  removeSubtaskById(id) {
    this.subtaskRegistry.splice(id, 1);
  }

  resetRegistry() {
    this.subtaskRegistry = [];
  }

  setCheckedOrOtherwise(subtask) {
    const checked = subtask.finishSubtaskCheckbox.checked;
    subtask.checked = checked;
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
class SubtaskRenderer {
  constructor(parentDiv) {
    this.parentDiv = parentDiv;
  }

  renderSubtask(subtask) {
    const subtaskDiv = subtask.div;
    subtaskDiv.classList.add("subtask-div");
    this.parentDiv.appendChild(subtaskDiv);

    Object.values(subtask.buttons).forEach((button) => {
      subtaskDiv.appendChild(button);
    });

    const contentInput = subtask.contentInput;
    contentInput.value = subtask.content;
    subtaskDiv.appendChild(contentInput);

    const subtaskCheckbox = subtask.finishSubtaskCheckbox;
    subtaskDiv.appendChild(subtaskCheckbox);
  }

  stopRenderingSubtasksInnerElements(subtasksRegistry) {
    subtasksRegistry.forEach((item) => {
      item.div.innerHTML = "";
    });
  }

  stopRenderingSubtask(subtaskDiv) {
    subtaskDiv.remove();
  }

  renderCheckedOrOtherwise(subtask) {
    if (subtask.checked) {
      subtask.div.classList.add("checked");
    } else {
      subtask.div.classList.remove("checked");
    }
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
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../PubSub */ "./src/js/PubSub.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../utilities */ "./src/js/utilities.js");



class Subtask {
  buttons = {};
  _content = "";
  checked = false;
  id = null;

  constructor() {
    this.div = document.createElement("div");
    this.div.classList.add("unchecked");

    this.contentInput = document.createElement("input");
    this.contentInput.classList.add("subtask-content");

    this.finishSubtaskCheckbox = document.createElement("input");
    this.finishSubtaskCheckbox.setAttribute("type", "checkbox");
    this.finishSubtaskCheckbox.classList.add("finish-checkbox");
    this.finishSubtaskCheckbox.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToCheckSubtask", this);
    });

    this.removeSubtaskButton = (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.setupButton)(
      "x",
      "remove-button",
      this,
      "removeSubtaskButton"
    );
    this.removeSubtaskButton.addEventListener("click", () => {
      _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("UserWantsToRemoveSubtask", this);
    });
  }

  get content() {
    return this._content;
  }

  set content(value) {
    this._content = value;
  }
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
    taskDiv.classList.add("checked");
  }

  renderTaskAsUnchecked(taskDiv) {
    taskDiv.classList.remove("checked");
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
    this.finishTaskCheckbox.classList.add("finish-checkbox");
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
  button.setAttribute("type", "button");
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
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../css/styles.css */ "./src/css/styles.css");
/* harmony import */ var _unique_button_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unique-button-manager */ "./src/js/unique-button-manager.js");
/* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./formManagement/form-manager */ "./src/js/formManagement/form-manager.js");
/* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./listManagement/list-bundle */ "./src/js/listManagement/list-bundle.js");
/* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PubSub */ "./src/js/PubSub.js");






_PubSub__WEBPACK_IMPORTED_MODULE_4__.PubSub.emit("CreateDefaultList");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUIsdUVBQWE7QUFDeEMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcENNO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBLEdBQUc7QUFDSDs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTjZCO0FBQ0k7QUFDTTtBQUNEO0FBQ0o7O0FBRWxDLDJDQUFNIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9hc3NpZ24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9jbG9uZU9iamVjdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2RlZmF1bHRMb2NhbGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2dldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vY29tcGFyZUFzYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXREaXN0YW5jZVN0cmljdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9mb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0L2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2lzUGFzdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0RGlzdGFuY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL2VuLVVTL19saWIvZm9ybWF0TG9uZy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9sb2NhbGl6ZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9tYXRjaC9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vdG9EYXRlL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvY3NzL3N0eWxlcy5jc3M/ZTRiMCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL1B1YlN1Yi5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tdXRpbGl0aWVzLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvZm9ybU1hbmFnZW1lbnQvbWFuYWdlcnMvc3VidGFzay1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGUuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9saXN0TWFuYWdlbWVudC9saXN0LWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9saXN0TWFuYWdlbWVudC9saXN0LXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2xpc3RNYW5hZ2VtZW50L2xpc3QtcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9saXN0TWFuYWdlbWVudC9saXN0LXV0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL2xpc3RNYW5hZ2VtZW50L2xpc3QuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9zdWJ0YXNrTWFuYWdlbWVudC9zdWJ0YXNrLWNyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9zdWJ0YXNrTWFuYWdlbWVudC9zdWJ0YXNrLXJlZ2lzdHJhci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2pzL3N1YnRhc2tNYW5hZ2VtZW50L3N1YnRhc2stcmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy9zdWJ0YXNrTWFuYWdlbWVudC9zdWJ0YXNrLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvdGFza01hbmFnZW1lbnQvdGFzay1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy90YXNrTWFuYWdlbWVudC90YXNrLXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvdGFza01hbmFnZW1lbnQvdGFzay11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9qcy90YXNrTWFuYWdlbWVudC90YXNrLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvdW5pcXVlLWJ1dHRvbi1tYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvdXRpbGl0aWVzLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgb2JqZWN0KSB7XG4gIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2Fzc2lnbiByZXF1aXJlcyB0aGF0IGlucHV0IHBhcmFtZXRlciBub3QgYmUgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgfVxuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBvYmplY3QpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpKSB7XG4gICAgICA7XG4gICAgICB0YXJnZXRbcHJvcGVydHldID0gb2JqZWN0W3Byb3BlcnR5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRhcmdldDtcbn0iLCJpbXBvcnQgYXNzaWduIGZyb20gXCIuLi9hc3NpZ24vaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gYXNzaWduKHt9LCBvYmplY3QpO1xufSIsImltcG9ydCBkZWZhdWx0TG9jYWxlIGZyb20gXCIuLi8uLi9sb2NhbGUvZW4tVVMvaW5kZXguanNcIjtcbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRMb2NhbGU7IiwidmFyIGRlZmF1bHRPcHRpb25zID0ge307XG5leHBvcnQgZnVuY3Rpb24gZ2V0RGVmYXVsdE9wdGlvbnMoKSB7XG4gIHJldHVybiBkZWZhdWx0T3B0aW9ucztcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXREZWZhdWx0T3B0aW9ucyhuZXdPcHRpb25zKSB7XG4gIGRlZmF1bHRPcHRpb25zID0gbmV3T3B0aW9ucztcbn0iLCIvKipcbiAqIEdvb2dsZSBDaHJvbWUgYXMgb2YgNjcuMC4zMzk2Ljg3IGludHJvZHVjZWQgdGltZXpvbmVzIHdpdGggb2Zmc2V0IHRoYXQgaW5jbHVkZXMgc2Vjb25kcy5cbiAqIFRoZXkgdXN1YWxseSBhcHBlYXIgZm9yIGRhdGVzIHRoYXQgZGVub3RlIHRpbWUgYmVmb3JlIHRoZSB0aW1lem9uZXMgd2VyZSBpbnRyb2R1Y2VkXG4gKiAoZS5nLiBmb3IgJ0V1cm9wZS9QcmFndWUnIHRpbWV6b25lIHRoZSBvZmZzZXQgaXMgR01UKzAwOjU3OjQ0IGJlZm9yZSAxIE9jdG9iZXIgMTg5MVxuICogYW5kIEdNVCswMTowMDowMCBhZnRlciB0aGF0IGRhdGUpXG4gKlxuICogRGF0ZSNnZXRUaW1lem9uZU9mZnNldCByZXR1cm5zIHRoZSBvZmZzZXQgaW4gbWludXRlcyBhbmQgd291bGQgcmV0dXJuIDU3IGZvciB0aGUgZXhhbXBsZSBhYm92ZSxcbiAqIHdoaWNoIHdvdWxkIGxlYWQgdG8gaW5jb3JyZWN0IGNhbGN1bGF0aW9ucy5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgdGhlIHRpbWV6b25lIG9mZnNldCBpbiBtaWxsaXNlY29uZHMgdGhhdCB0YWtlcyBzZWNvbmRzIGluIGFjY291bnQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMoZGF0ZSkge1xuICB2YXIgdXRjRGF0ZSA9IG5ldyBEYXRlKERhdGUuVVRDKGRhdGUuZ2V0RnVsbFllYXIoKSwgZGF0ZS5nZXRNb250aCgpLCBkYXRlLmdldERhdGUoKSwgZGF0ZS5nZXRIb3VycygpLCBkYXRlLmdldE1pbnV0ZXMoKSwgZGF0ZS5nZXRTZWNvbmRzKCksIGRhdGUuZ2V0TWlsbGlzZWNvbmRzKCkpKTtcbiAgdXRjRGF0ZS5zZXRVVENGdWxsWWVhcihkYXRlLmdldEZ1bGxZZWFyKCkpO1xuICByZXR1cm4gZGF0ZS5nZXRUaW1lKCkgLSB1dGNEYXRlLmdldFRpbWUoKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXF1aXJlZEFyZ3MocmVxdWlyZWQsIGFyZ3MpIHtcbiAgaWYgKGFyZ3MubGVuZ3RoIDwgcmVxdWlyZWQpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHJlcXVpcmVkICsgJyBhcmd1bWVudCcgKyAocmVxdWlyZWQgPiAxID8gJ3MnIDogJycpICsgJyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3MubGVuZ3RoICsgJyBwcmVzZW50Jyk7XG4gIH1cbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGNvbXBhcmVBc2NcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29tcGFyZSB0aGUgdHdvIGRhdGVzIGFuZCByZXR1cm4gLTEsIDAgb3IgMS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIDEgaWYgdGhlIGZpcnN0IGRhdGUgaXMgYWZ0ZXIgdGhlIHNlY29uZCxcbiAqIC0xIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGJlZm9yZSB0aGUgc2Vjb25kIG9yIDAgaWYgZGF0ZXMgYXJlIGVxdWFsLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVMZWZ0IC0gdGhlIGZpcnN0IGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZVJpZ2h0IC0gdGhlIHNlY29uZCBkYXRlIHRvIGNvbXBhcmVcbiAqIEByZXR1cm5zIHtOdW1iZXJ9IHRoZSByZXN1bHQgb2YgdGhlIGNvbXBhcmlzb25cbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29tcGFyZSAxMSBGZWJydWFyeSAxOTg3IGFuZCAxMCBKdWx5IDE5ODk6XG4gKiBjb25zdCByZXN1bHQgPSBjb21wYXJlQXNjKG5ldyBEYXRlKDE5ODcsIDEsIDExKSwgbmV3IERhdGUoMTk4OSwgNiwgMTApKVxuICogLy89PiAtMVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBTb3J0IHRoZSBhcnJheSBvZiBkYXRlczpcbiAqIGNvbnN0IHJlc3VsdCA9IFtcbiAqICAgbmV3IERhdGUoMTk5NSwgNiwgMiksXG4gKiAgIG5ldyBEYXRlKDE5ODcsIDEsIDExKSxcbiAqICAgbmV3IERhdGUoMTk4OSwgNiwgMTApXG4gKiBdLnNvcnQoY29tcGFyZUFzYylcbiAqIC8vPT4gW1xuICogLy8gICBXZWQgRmViIDExIDE5ODcgMDA6MDA6MDAsXG4gKiAvLyAgIE1vbiBKdWwgMTAgMTk4OSAwMDowMDowMCxcbiAqIC8vICAgU3VuIEp1bCAwMiAxOTk1IDAwOjAwOjAwXG4gKiAvLyBdXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbXBhcmVBc2MoZGlydHlEYXRlTGVmdCwgZGlydHlEYXRlUmlnaHQpIHtcbiAgcmVxdWlyZWRBcmdzKDIsIGFyZ3VtZW50cyk7XG4gIHZhciBkYXRlTGVmdCA9IHRvRGF0ZShkaXJ0eURhdGVMZWZ0KTtcbiAgdmFyIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eURhdGVSaWdodCk7XG4gIHZhciBkaWZmID0gZGF0ZUxlZnQuZ2V0VGltZSgpIC0gZGF0ZVJpZ2h0LmdldFRpbWUoKTtcbiAgaWYgKGRpZmYgPCAwKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9IGVsc2UgaWYgKGRpZmYgPiAwKSB7XG4gICAgcmV0dXJuIDE7XG4gICAgLy8gUmV0dXJuIDAgaWYgZGlmZiBpcyAwOyByZXR1cm4gTmFOIGlmIGRpZmYgaXMgTmFOXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRpZmY7XG4gIH1cbn0iLCJpbXBvcnQgeyBnZXREZWZhdWx0T3B0aW9ucyB9IGZyb20gXCIuLi9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzXCI7XG5pbXBvcnQgZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyBmcm9tIFwiLi4vX2xpYi9nZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzL2luZGV4LmpzXCI7XG5pbXBvcnQgY29tcGFyZUFzYyBmcm9tIFwiLi4vY29tcGFyZUFzYy9pbmRleC5qc1wiO1xuaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgY2xvbmVPYmplY3QgZnJvbSBcIi4uL19saWIvY2xvbmVPYmplY3QvaW5kZXguanNcIjtcbmltcG9ydCBhc3NpZ24gZnJvbSBcIi4uL19saWIvYXNzaWduL2luZGV4LmpzXCI7XG5pbXBvcnQgZGVmYXVsdExvY2FsZSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0TG9jYWxlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSAxMDAwICogNjA7XG52YXIgTUlOVVRFU19JTl9EQVkgPSA2MCAqIDI0O1xudmFyIE1JTlVURVNfSU5fTU9OVEggPSBNSU5VVEVTX0lOX0RBWSAqIDMwO1xudmFyIE1JTlVURVNfSU5fWUVBUiA9IE1JTlVURVNfSU5fREFZICogMzY1O1xuXG4vKipcbiAqIEBuYW1lIGZvcm1hdERpc3RhbmNlU3RyaWN0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFJldHVybiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgZ2l2ZW4gZGF0ZXMgaW4gd29yZHMuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLCB1c2luZyBzdHJpY3QgdW5pdHMuXG4gKiBUaGlzIGlzIGxpa2UgYGZvcm1hdERpc3RhbmNlYCwgYnV0IGRvZXMgbm90IHVzZSBoZWxwZXJzIGxpa2UgJ2FsbW9zdCcsICdvdmVyJyxcbiAqICdsZXNzIHRoYW4nIGFuZCB0aGUgbGlrZS5cbiAqXG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgfCBSZXN1bHQgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiA1OSBzZWNzICAgICAgICAgIHwgWzAuLjU5XSBzZWNvbmRzICAgICB8XG4gKiB8IDEgLi4uIDU5IG1pbnMgICAgICAgICAgfCBbMS4uNTldIG1pbnV0ZXMgICAgIHxcbiAqIHwgMSAuLi4gMjMgaHJzICAgICAgICAgICB8IFsxLi4yM10gaG91cnMgICAgICAgfFxuICogfCAxIC4uLiAyOSBkYXlzICAgICAgICAgIHwgWzEuLjI5XSBkYXlzICAgICAgICB8XG4gKiB8IDEgLi4uIDExIG1vbnRocyAgICAgICAgfCBbMS4uMTFdIG1vbnRocyAgICAgIHxcbiAqIHwgMSAuLi4gTiB5ZWFycyAgICAgICAgICB8IFsxLi5OXSAgeWVhcnMgICAgICAgfFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZVxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYmFzZURhdGUgLSB0aGUgZGF0ZSB0byBjb21wYXJlIHdpdGhcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGRTdWZmaXg9ZmFsc2VdIC0gcmVzdWx0IGluZGljYXRlcyBpZiB0aGUgc2Vjb25kIGRhdGUgaXMgZWFybGllciBvciBsYXRlciB0aGFuIHRoZSBmaXJzdFxuICogQHBhcmFtIHsnc2Vjb25kJ3wnbWludXRlJ3wnaG91cid8J2RheSd8J21vbnRoJ3wneWVhcid9IFtvcHRpb25zLnVuaXRdIC0gaWYgc3BlY2lmaWVkLCB3aWxsIGZvcmNlIGEgdW5pdFxuICogQHBhcmFtIHsnZmxvb3InfCdjZWlsJ3wncm91bmQnfSBbb3B0aW9ucy5yb3VuZGluZ01ldGhvZD0ncm91bmQnXSAtIHdoaWNoIHdheSB0byByb3VuZCBwYXJ0aWFsIHVuaXRzXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGRhdGVgIG11c3Qgbm90IGJlIEludmFsaWQgRGF0ZVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYGJhc2VEYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLnJvdW5kaW5nTWV0aG9kYCBtdXN0IGJlICdmbG9vcicsICdjZWlsJyBvciAncm91bmQnXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy51bml0YCBtdXN0IGJlICdzZWNvbmQnLCAnbWludXRlJywgJ2hvdXInLCAnZGF5JywgJ21vbnRoJyBvciAneWVhcidcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXREaXN0YW5jZWAgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAyIEp1bHkgMjAxNCBhbmQgMSBKYW51YXJ5IDIwMTU/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChuZXcgRGF0ZSgyMDE0LCA2LCAyKSwgbmV3IERhdGUoMjAxNSwgMCwgMikpXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEphbnVhcnkgMjAxNSAwMDowMDoxNVxuICogLy8gYW5kIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDE1KSxcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMClcbiAqIClcbiAqIC8vPT4gJzE1IHNlY29uZHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTZcbiAqIC8vIHRvIDEgSmFudWFyeSAyMDE1LCB3aXRoIGEgc3VmZml4P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNSwgMCwgMSksIG5ldyBEYXRlKDIwMTYsIDAsIDEpLCB7XG4gKiAgIGFkZFN1ZmZpeDogdHJ1ZVxuICogfSlcbiAqIC8vPT4gJzEgeWVhciBhZ28nXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTZcbiAqIC8vIHRvIDEgSmFudWFyeSAyMDE1LCBpbiBtaW51dGVzP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNiwgMCwgMSksIG5ldyBEYXRlKDIwMTUsIDAsIDEpLCB7XG4gKiAgIHVuaXQ6ICdtaW51dGUnXG4gKiB9KVxuICogLy89PiAnNTI1NjAwIG1pbnV0ZXMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGZyb20gMSBKYW51YXJ5IDIwMTVcbiAqIC8vIHRvIDI4IEphbnVhcnkgMjAxNSwgaW4gbW9udGhzLCByb3VuZGVkIHVwP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNSwgMCwgMjgpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICB1bml0OiAnbW9udGgnLFxuICogICByb3VuZGluZ01ldGhvZDogJ2NlaWwnXG4gKiB9KVxuICogLy89PiAnMSBtb250aCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gV2hhdCBpcyB0aGUgZGlzdGFuY2UgYmV0d2VlbiAxIEF1Z3VzdCAyMDE2IGFuZCAxIEphbnVhcnkgMjAxNSBpbiBFc3BlcmFudG8/XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KG5ldyBEYXRlKDIwMTYsIDcsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICBsb2NhbGU6IGVvTG9jYWxlXG4gKiB9KVxuICogLy89PiAnMSBqYXJvJ1xuICovXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlU3RyaWN0KGRpcnR5RGF0ZSwgZGlydHlCYXNlRGF0ZSwgb3B0aW9ucykge1xuICB2YXIgX3JlZiwgX29wdGlvbnMkbG9jYWxlLCBfb3B0aW9ucyRyb3VuZGluZ01ldGg7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBnZXREZWZhdWx0T3B0aW9ucygpO1xuICB2YXIgbG9jYWxlID0gKF9yZWYgPSAoX29wdGlvbnMkbG9jYWxlID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLmxvY2FsZSkgIT09IG51bGwgJiYgX29wdGlvbnMkbG9jYWxlICE9PSB2b2lkIDAgPyBfb3B0aW9ucyRsb2NhbGUgOiBkZWZhdWx0T3B0aW9ucy5sb2NhbGUpICE9PSBudWxsICYmIF9yZWYgIT09IHZvaWQgMCA/IF9yZWYgOiBkZWZhdWx0TG9jYWxlO1xuICBpZiAoIWxvY2FsZS5mb3JtYXREaXN0YW5jZSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdsb2NhbGUgbXVzdCBjb250YWluIGxvY2FsaXplLmZvcm1hdERpc3RhbmNlIHByb3BlcnR5Jyk7XG4gIH1cbiAgdmFyIGNvbXBhcmlzb24gPSBjb21wYXJlQXNjKGRpcnR5RGF0ZSwgZGlydHlCYXNlRGF0ZSk7XG4gIGlmIChpc05hTihjb21wYXJpc29uKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHRpbWUgdmFsdWUnKTtcbiAgfVxuICB2YXIgbG9jYWxpemVPcHRpb25zID0gYXNzaWduKGNsb25lT2JqZWN0KG9wdGlvbnMpLCB7XG4gICAgYWRkU3VmZml4OiBCb29sZWFuKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5hZGRTdWZmaXgpLFxuICAgIGNvbXBhcmlzb246IGNvbXBhcmlzb25cbiAgfSk7XG4gIHZhciBkYXRlTGVmdDtcbiAgdmFyIGRhdGVSaWdodDtcbiAgaWYgKGNvbXBhcmlzb24gPiAwKSB7XG4gICAgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlCYXNlRGF0ZSk7XG4gICAgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlEYXRlKTtcbiAgICBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlCYXNlRGF0ZSk7XG4gIH1cbiAgdmFyIHJvdW5kaW5nTWV0aG9kID0gU3RyaW5nKChfb3B0aW9ucyRyb3VuZGluZ01ldGggPSBvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMucm91bmRpbmdNZXRob2QpICE9PSBudWxsICYmIF9vcHRpb25zJHJvdW5kaW5nTWV0aCAhPT0gdm9pZCAwID8gX29wdGlvbnMkcm91bmRpbmdNZXRoIDogJ3JvdW5kJyk7XG4gIHZhciByb3VuZGluZ01ldGhvZEZuO1xuICBpZiAocm91bmRpbmdNZXRob2QgPT09ICdmbG9vcicpIHtcbiAgICByb3VuZGluZ01ldGhvZEZuID0gTWF0aC5mbG9vcjtcbiAgfSBlbHNlIGlmIChyb3VuZGluZ01ldGhvZCA9PT0gJ2NlaWwnKSB7XG4gICAgcm91bmRpbmdNZXRob2RGbiA9IE1hdGguY2VpbDtcbiAgfSBlbHNlIGlmIChyb3VuZGluZ01ldGhvZCA9PT0gJ3JvdW5kJykge1xuICAgIHJvdW5kaW5nTWV0aG9kRm4gPSBNYXRoLnJvdW5kO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKFwicm91bmRpbmdNZXRob2QgbXVzdCBiZSAnZmxvb3InLCAnY2VpbCcgb3IgJ3JvdW5kJ1wiKTtcbiAgfVxuICB2YXIgbWlsbGlzZWNvbmRzID0gZGF0ZVJpZ2h0LmdldFRpbWUoKSAtIGRhdGVMZWZ0LmdldFRpbWUoKTtcbiAgdmFyIG1pbnV0ZXMgPSBtaWxsaXNlY29uZHMgLyBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFO1xuICB2YXIgdGltZXpvbmVPZmZzZXQgPSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGVSaWdodCkgLSBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGVMZWZ0KTtcblxuICAvLyBVc2UgRFNULW5vcm1hbGl6ZWQgZGlmZmVyZW5jZSBpbiBtaW51dGVzIGZvciB5ZWFycywgbW9udGhzIGFuZCBkYXlzO1xuICAvLyB1c2UgcmVndWxhciBkaWZmZXJlbmNlIGluIG1pbnV0ZXMgZm9yIGhvdXJzLCBtaW51dGVzIGFuZCBzZWNvbmRzLlxuICB2YXIgZHN0Tm9ybWFsaXplZE1pbnV0ZXMgPSAobWlsbGlzZWNvbmRzIC0gdGltZXpvbmVPZmZzZXQpIC8gTUlMTElTRUNPTkRTX0lOX01JTlVURTtcbiAgdmFyIGRlZmF1bHRVbml0ID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnVuaXQ7XG4gIHZhciB1bml0O1xuICBpZiAoIWRlZmF1bHRVbml0KSB7XG4gICAgaWYgKG1pbnV0ZXMgPCAxKSB7XG4gICAgICB1bml0ID0gJ3NlY29uZCc7XG4gICAgfSBlbHNlIGlmIChtaW51dGVzIDwgNjApIHtcbiAgICAgIHVuaXQgPSAnbWludXRlJztcbiAgICB9IGVsc2UgaWYgKG1pbnV0ZXMgPCBNSU5VVEVTX0lOX0RBWSkge1xuICAgICAgdW5pdCA9ICdob3VyJztcbiAgICB9IGVsc2UgaWYgKGRzdE5vcm1hbGl6ZWRNaW51dGVzIDwgTUlOVVRFU19JTl9NT05USCkge1xuICAgICAgdW5pdCA9ICdkYXknO1xuICAgIH0gZWxzZSBpZiAoZHN0Tm9ybWFsaXplZE1pbnV0ZXMgPCBNSU5VVEVTX0lOX1lFQVIpIHtcbiAgICAgIHVuaXQgPSAnbW9udGgnO1xuICAgIH0gZWxzZSB7XG4gICAgICB1bml0ID0gJ3llYXInO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB1bml0ID0gU3RyaW5nKGRlZmF1bHRVbml0KTtcbiAgfVxuXG4gIC8vIDAgdXAgdG8gNjAgc2Vjb25kc1xuICBpZiAodW5pdCA9PT0gJ3NlY29uZCcpIHtcbiAgICB2YXIgc2Vjb25kcyA9IHJvdW5kaW5nTWV0aG9kRm4obWlsbGlzZWNvbmRzIC8gMTAwMCk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneFNlY29uZHMnLCBzZWNvbmRzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMSB1cCB0byA2MCBtaW5zXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ21pbnV0ZScpIHtcbiAgICB2YXIgcm91bmRlZE1pbnV0ZXMgPSByb3VuZGluZ01ldGhvZEZuKG1pbnV0ZXMpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hNaW51dGVzJywgcm91bmRlZE1pbnV0ZXMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIHVwIHRvIDI0IGhvdXJzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ2hvdXInKSB7XG4gICAgdmFyIGhvdXJzID0gcm91bmRpbmdNZXRob2RGbihtaW51dGVzIC8gNjApO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hIb3VycycsIGhvdXJzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMSB1cCB0byAzMCBkYXlzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ2RheScpIHtcbiAgICB2YXIgZGF5cyA9IHJvdW5kaW5nTWV0aG9kRm4oZHN0Tm9ybWFsaXplZE1pbnV0ZXMgLyBNSU5VVEVTX0lOX0RBWSk7XG4gICAgcmV0dXJuIGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneERheXMnLCBkYXlzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMSB1cCB0byAxMiBtb250aHNcbiAgfSBlbHNlIGlmICh1bml0ID09PSAnbW9udGgnKSB7XG4gICAgdmFyIG1vbnRocyA9IHJvdW5kaW5nTWV0aG9kRm4oZHN0Tm9ybWFsaXplZE1pbnV0ZXMgLyBNSU5VVEVTX0lOX01PTlRIKTtcbiAgICByZXR1cm4gbW9udGhzID09PSAxMiAmJiBkZWZhdWx0VW5pdCAhPT0gJ21vbnRoJyA/IGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneFllYXJzJywgMSwgbG9jYWxpemVPcHRpb25zKSA6IGxvY2FsZS5mb3JtYXREaXN0YW5jZSgneE1vbnRocycsIG1vbnRocywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgeWVhciB1cCB0byBtYXggRGF0ZVxuICB9IGVsc2UgaWYgKHVuaXQgPT09ICd5ZWFyJykge1xuICAgIHZhciB5ZWFycyA9IHJvdW5kaW5nTWV0aG9kRm4oZHN0Tm9ybWFsaXplZE1pbnV0ZXMgLyBNSU5VVEVTX0lOX1lFQVIpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hZZWFycycsIHllYXJzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuICB9XG4gIHRocm93IG5ldyBSYW5nZUVycm9yKFwidW5pdCBtdXN0IGJlICdzZWNvbmQnLCAnbWludXRlJywgJ2hvdXInLCAnZGF5JywgJ21vbnRoJyBvciAneWVhcidcIik7XG59IiwiaW1wb3J0IGZvcm1hdERpc3RhbmNlU3RyaWN0IGZyb20gXCIuLi9mb3JtYXREaXN0YW5jZVN0cmljdC9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGUgYW5kIG5vdyBpbiB3b3Jkcy5cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLCB1c2luZyBzdHJpY3QgdW5pdHMuXG4gKiBUaGlzIGlzIGxpa2UgYGZvcm1hdERpc3RhbmNlYCwgYnV0IGRvZXMgbm90IHVzZSBoZWxwZXJzIGxpa2UgJ2FsbW9zdCcsICdvdmVyJyxcbiAqICdsZXNzIHRoYW4nIGFuZCB0aGUgbGlrZS5cbiAqXG4gKiB8IERpc3RhbmNlIGJldHdlZW4gZGF0ZXMgfCBSZXN1bHQgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCAwIC4uLiA1OSBzZWNzICAgICAgICAgIHwgWzAuLjU5XSBzZWNvbmRzICAgICB8XG4gKiB8IDEgLi4uIDU5IG1pbnMgICAgICAgICAgfCBbMS4uNTldIG1pbnV0ZXMgICAgIHxcbiAqIHwgMSAuLi4gMjMgaHJzICAgICAgICAgICB8IFsxLi4yM10gaG91cnMgICAgICAgfFxuICogfCAxIC4uLiAyOSBkYXlzICAgICAgICAgIHwgWzEuLjI5XSBkYXlzICAgICAgICB8XG4gKiB8IDEgLi4uIDExIG1vbnRocyAgICAgICAgfCBbMS4uMTFdIG1vbnRocyAgICAgIHxcbiAqIHwgMSAuLi4gTiB5ZWFycyAgICAgICAgICB8IFsxLi5OXSAgeWVhcnMgICAgICAgfFxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGUgLSB0aGUgZ2l2ZW4gZGF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSAtIGFuIG9iamVjdCB3aXRoIG9wdGlvbnMuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IFtvcHRpb25zLmFkZFN1ZmZpeD1mYWxzZV0gLSByZXN1bHQgaW5kaWNhdGVzIGlmIHRoZSBzZWNvbmQgZGF0ZSBpcyBlYXJsaWVyIG9yIGxhdGVyIHRoYW4gdGhlIGZpcnN0XG4gKiBAcGFyYW0geydzZWNvbmQnfCdtaW51dGUnfCdob3VyJ3wnZGF5J3wnbW9udGgnfCd5ZWFyJ30gW29wdGlvbnMudW5pdF0gLSBpZiBzcGVjaWZpZWQsIHdpbGwgZm9yY2UgYSB1bml0XG4gKiBAcGFyYW0geydmbG9vcid8J2NlaWwnfCdyb3VuZCd9IFtvcHRpb25zLnJvdW5kaW5nTWV0aG9kPSdyb3VuZCddIC0gd2hpY2ggd2F5IHRvIHJvdW5kIHBhcnRpYWwgdW5pdHNcbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHJldHVybnMge1N0cmluZ30gdGhlIGRpc3RhbmNlIGluIHdvcmRzXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmxvY2FsZWAgbXVzdCBjb250YWluIGBmb3JtYXREaXN0YW5jZWAgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDIgSnVseSAyMDE0P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMilcbiAqIClcbiAqIC8vPT4gJzYgbW9udGhzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiBub3cgaXMgMSBKYW51YXJ5IDIwMTUgMDA6MDA6MDAsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNSAwMDowMDoxNSwgaW5jbHVkaW5nIHNlY29uZHM/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAxNSlcbiAqIClcbiAqIC8vPT4gJzE1IHNlY29uZHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTYsIHdpdGggYSBzdWZmaXg/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAge2FkZFN1ZmZpeDogdHJ1ZX1cbiAqIClcbiAqIC8vPT4gJ2luIDEgeWVhcidcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMjggSmFudWFyeSAyMDE1LFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUsIGluIG1vbnRocywgcm91bmRlZCB1cD8/XG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KG5ldyBEYXRlKDIwMTUsIDAsIDEpLCB7XG4gKiAgIHVuaXQ6ICdtb250aCcsXG4gKiAgIHJvdW5kaW5nTWV0aG9kOiAnY2VpbCdcbiAqIH0pXG4gKiAvLz0+ICcxIG1vbnRoJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE2IGluIEVzcGVyYW50bz9cbiAqIGNvbnN0IGVvTG9jYWxlID0gcmVxdWlyZSgnZGF0ZS1mbnMvbG9jYWxlL2VvJylcbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTYsIDAsIDEpLFxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gJzEgamFybydcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChkaXJ0eURhdGUsIG9wdGlvbnMpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHJldHVybiBmb3JtYXREaXN0YW5jZVN0cmljdChkaXJ0eURhdGUsIERhdGUubm93KCksIG9wdGlvbnMpO1xufSIsImltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgaXNQYXN0XG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBwYXN0P1xuICogQHB1cmUgZmFsc2VcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIElzIHRoZSBnaXZlbiBkYXRlIGluIHRoZSBwYXN0P1xuICpcbiAqID4g4pqg77iPIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBmdW5jdGlvbiBpcyBub3QgcHJlc2VudCBpbiB0aGUgRlAgc3VibW9kdWxlIGFzXG4gKiA+IGl0IHVzZXMgYERhdGUubm93KClgIGludGVybmFsbHkgaGVuY2UgaW1wdXJlIGFuZCBjYW4ndCBiZSBzYWZlbHkgY3VycmllZC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZGF0ZSBpcyBpbiB0aGUgcGFzdFxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDYgT2N0b2JlciAyMDE0LCBpcyAyIEp1bHkgMjAxNCBpbiB0aGUgcGFzdD9cbiAqIGNvbnN0IHJlc3VsdCA9IGlzUGFzdChuZXcgRGF0ZSgyMDE0LCA2LCAyKSlcbiAqIC8vPT4gdHJ1ZVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBpc1Bhc3QoZGlydHlEYXRlKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gdG9EYXRlKGRpcnR5RGF0ZSkuZ2V0VGltZSgpIDwgRGF0ZS5ub3coKTtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBidWlsZEZvcm1hdExvbmdGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuICAgIC8vIFRPRE86IFJlbW92ZSBTdHJpbmcoKVxuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICB2YXIgZm9ybWF0ID0gYXJncy5mb3JtYXRzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHNbYXJncy5kZWZhdWx0V2lkdGhdO1xuICAgIHJldHVybiBmb3JtYXQ7XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRMb2NhbGl6ZUZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXJ0eUluZGV4LCBvcHRpb25zKSB7XG4gICAgdmFyIGNvbnRleHQgPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmNvbnRleHQgPyBTdHJpbmcob3B0aW9ucy5jb250ZXh0KSA6ICdzdGFuZGFsb25lJztcbiAgICB2YXIgdmFsdWVzQXJyYXk7XG4gICAgaWYgKGNvbnRleHQgPT09ICdmb3JtYXR0aW5nJyAmJiBhcmdzLmZvcm1hdHRpbmdWYWx1ZXMpIHtcbiAgICAgIHZhciBkZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRGb3JtYXR0aW5nV2lkdGggfHwgYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YXIgd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogZGVmYXVsdFdpZHRoO1xuICAgICAgdmFsdWVzQXJyYXkgPSBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbd2lkdGhdIHx8IGFyZ3MuZm9ybWF0dGluZ1ZhbHVlc1tkZWZhdWx0V2lkdGhdO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgX2RlZmF1bHRXaWR0aCA9IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFyIF93aWR0aCA9IG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMud2lkdGggPyBTdHJpbmcob3B0aW9ucy53aWR0aCkgOiBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy52YWx1ZXNbX3dpZHRoXSB8fCBhcmdzLnZhbHVlc1tfZGVmYXVsdFdpZHRoXTtcbiAgICB9XG4gICAgdmFyIGluZGV4ID0gYXJncy5hcmd1bWVudENhbGxiYWNrID8gYXJncy5hcmd1bWVudENhbGxiYWNrKGRpcnR5SW5kZXgpIDogZGlydHlJbmRleDtcbiAgICAvLyBAdHMtaWdub3JlOiBGb3Igc29tZSByZWFzb24gVHlwZVNjcmlwdCBqdXN0IGRvbid0IHdhbnQgdG8gbWF0Y2ggaXQsIG5vIG1hdHRlciBob3cgaGFyZCB3ZSB0cnkuIEkgY2hhbGxlbmdlIHlvdSB0byB0cnkgdG8gcmVtb3ZlIGl0IVxuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF07XG4gIH07XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYXRjaEZuKGFyZ3MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG4gICAgdmFyIHdpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICB2YXIgbWF0Y2hQYXR0ZXJuID0gd2lkdGggJiYgYXJncy5tYXRjaFBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLm1hdGNoUGF0dGVybnNbYXJncy5kZWZhdWx0TWF0Y2hXaWR0aF07XG4gICAgdmFyIG1hdGNoUmVzdWx0ID0gc3RyaW5nLm1hdGNoKG1hdGNoUGF0dGVybik7XG4gICAgaWYgKCFtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUGF0dGVybnMgPSB3aWR0aCAmJiBhcmdzLnBhcnNlUGF0dGVybnNbd2lkdGhdIHx8IGFyZ3MucGFyc2VQYXR0ZXJuc1thcmdzLmRlZmF1bHRQYXJzZVdpZHRoXTtcbiAgICB2YXIga2V5ID0gQXJyYXkuaXNBcnJheShwYXJzZVBhdHRlcm5zKSA/IGZpbmRJbmRleChwYXJzZVBhdHRlcm5zLCBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgcmV0dXJuIHBhdHRlcm4udGVzdChtYXRjaGVkU3RyaW5nKTtcbiAgICB9KSA6IGZpbmRLZXkocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSk7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhbHVlID0gYXJncy52YWx1ZUNhbGxiYWNrID8gYXJncy52YWx1ZUNhbGxiYWNrKGtleSkgOiBrZXk7XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGZpbmRLZXkob2JqZWN0LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBwcmVkaWNhdGUob2JqZWN0W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZmluZEluZGV4KGFycmF5LCBwcmVkaWNhdGUpIHtcbiAgZm9yICh2YXIga2V5ID0gMDsga2V5IDwgYXJyYXkubGVuZ3RoOyBrZXkrKykge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlba2V5XSkpIHtcbiAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRNYXRjaFBhdHRlcm5GbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChhcmdzLm1hdGNoUGF0dGVybik7XG4gICAgaWYgKCFtYXRjaFJlc3VsdCkgcmV0dXJuIG51bGw7XG4gICAgdmFyIG1hdGNoZWRTdHJpbmcgPSBtYXRjaFJlc3VsdFswXTtcbiAgICB2YXIgcGFyc2VSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5wYXJzZVBhdHRlcm4pO1xuICAgIGlmICghcGFyc2VSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIHZhciB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhwYXJzZVJlc3VsdFswXSkgOiBwYXJzZVJlc3VsdFswXTtcbiAgICB2YWx1ZSA9IG9wdGlvbnMudmFsdWVDYWxsYmFjayA/IG9wdGlvbnMudmFsdWVDYWxsYmFjayh2YWx1ZSkgOiB2YWx1ZTtcbiAgICB2YXIgcmVzdCA9IHN0cmluZy5zbGljZShtYXRjaGVkU3RyaW5nLmxlbmd0aCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIHJlc3Q6IHJlc3RcbiAgICB9O1xuICB9O1xufSIsInZhciBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIHhTZWNvbmRzOiB7XG4gICAgb25lOiAnMSBzZWNvbmQnLFxuICAgIG90aGVyOiAne3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG4gIGhhbGZBTWludXRlOiAnaGFsZiBhIG1pbnV0ZScsXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICB4TWludXRlczoge1xuICAgIG9uZTogJzEgbWludXRlJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuICBhYm91dFhIb3Vyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgaG91cicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhIb3Vyczoge1xuICAgIG9uZTogJzEgaG91cicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gaG91cnMnXG4gIH0sXG4gIHhEYXlzOiB7XG4gICAgb25lOiAnMSBkYXknLFxuICAgIG90aGVyOiAne3tjb3VudH19IGRheXMnXG4gIH0sXG4gIGFib3V0WFdlZWtzOiB7XG4gICAgb25lOiAnYWJvdXQgMSB3ZWVrJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgeFdlZWtzOiB7XG4gICAgb25lOiAnMSB3ZWVrJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB3ZWVrcydcbiAgfSxcbiAgYWJvdXRYTW9udGhzOiB7XG4gICAgb25lOiAnYWJvdXQgMSBtb250aCcsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICB4TW9udGhzOiB7XG4gICAgb25lOiAnMSBtb250aCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbW9udGhzJ1xuICB9LFxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIHhZZWFyczoge1xuICAgIG9uZTogJzEgeWVhcicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIG92ZXJYWWVhcnM6IHtcbiAgICBvbmU6ICdvdmVyIDEgeWVhcicsXG4gICAgb3RoZXI6ICdvdmVyIHt7Y291bnR9fSB5ZWFycydcbiAgfSxcbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiAnYWxtb3N0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICB9XG59O1xudmFyIGZvcm1hdERpc3RhbmNlID0gZnVuY3Rpb24gZm9ybWF0RGlzdGFuY2UodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gIHZhciByZXN1bHQ7XG4gIHZhciB0b2tlblZhbHVlID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dO1xuICBpZiAodHlwZW9mIHRva2VuVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmVzdWx0ID0gdG9rZW5WYWx1ZTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub25lO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWUub3RoZXIucmVwbGFjZSgne3tjb3VudH19JywgY291bnQudG9TdHJpbmcoKSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwICYmIG9wdGlvbnMuYWRkU3VmZml4KSB7XG4gICAgaWYgKG9wdGlvbnMuY29tcGFyaXNvbiAmJiBvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gJ2luICcgKyByZXN1bHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXN1bHQgKyAnIGFnbyc7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0RGlzdGFuY2U7IiwiaW1wb3J0IGJ1aWxkRm9ybWF0TG9uZ0ZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzXCI7XG52YXIgZGF0ZUZvcm1hdHMgPSB7XG4gIGZ1bGw6ICdFRUVFLCBNTU1NIGRvLCB5JyxcbiAgbG9uZzogJ01NTU0gZG8sIHknLFxuICBtZWRpdW06ICdNTU0gZCwgeScsXG4gIHNob3J0OiAnTU0vZGQveXl5eSdcbn07XG52YXIgdGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6ICdoOm1tOnNzIGEgenp6eicsXG4gIGxvbmc6ICdoOm1tOnNzIGEgeicsXG4gIG1lZGl1bTogJ2g6bW06c3MgYScsXG4gIHNob3J0OiAnaDptbSBhJ1xufTtcbnZhciBkYXRlVGltZUZvcm1hdHMgPSB7XG4gIGZ1bGw6IFwie3tkYXRlfX0gJ2F0JyB7e3RpbWV9fVwiLFxuICBsb25nOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbWVkaXVtOiAne3tkYXRlfX0sIHt7dGltZX19JyxcbiAgc2hvcnQ6ICd7e2RhdGV9fSwge3t0aW1lfX0nXG59O1xudmFyIGZvcm1hdExvbmcgPSB7XG4gIGRhdGU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgdGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IHRpbWVGb3JtYXRzLFxuICAgIGRlZmF1bHRXaWR0aDogJ2Z1bGwnXG4gIH0pLFxuICBkYXRlVGltZTogYnVpbGRGb3JtYXRMb25nRm4oe1xuICAgIGZvcm1hdHM6IGRhdGVUaW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdExvbmc7IiwidmFyIGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogXCInbGFzdCcgZWVlZSAnYXQnIHBcIixcbiAgeWVzdGVyZGF5OiBcIid5ZXN0ZXJkYXkgYXQnIHBcIixcbiAgdG9kYXk6IFwiJ3RvZGF5IGF0JyBwXCIsXG4gIHRvbW9ycm93OiBcIid0b21vcnJvdyBhdCcgcFwiLFxuICBuZXh0V2VlazogXCJlZWVlICdhdCcgcFwiLFxuICBvdGhlcjogJ1AnXG59O1xudmFyIGZvcm1hdFJlbGF0aXZlID0gZnVuY3Rpb24gZm9ybWF0UmVsYXRpdmUodG9rZW4sIF9kYXRlLCBfYmFzZURhdGUsIF9vcHRpb25zKSB7XG4gIHJldHVybiBmb3JtYXRSZWxhdGl2ZUxvY2FsZVt0b2tlbl07XG59O1xuZXhwb3J0IGRlZmF1bHQgZm9ybWF0UmVsYXRpdmU7IiwiaW1wb3J0IGJ1aWxkTG9jYWxpemVGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZExvY2FsaXplRm4vaW5kZXguanNcIjtcbnZhciBlcmFWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydCJywgJ0EnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnQkMnLCAnQUQnXSxcbiAgd2lkZTogWydCZWZvcmUgQ2hyaXN0JywgJ0Fubm8gRG9taW5pJ11cbn07XG52YXIgcXVhcnRlclZhbHVlcyA9IHtcbiAgbmFycm93OiBbJzEnLCAnMicsICczJywgJzQnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnUTEnLCAnUTInLCAnUTMnLCAnUTQnXSxcbiAgd2lkZTogWycxc3QgcXVhcnRlcicsICcybmQgcXVhcnRlcicsICczcmQgcXVhcnRlcicsICc0dGggcXVhcnRlciddXG59O1xuXG4vLyBOb3RlOiBpbiBFbmdsaXNoLCB0aGUgbmFtZXMgb2YgZGF5cyBvZiB0aGUgd2VlayBhbmQgbW9udGhzIGFyZSBjYXBpdGFsaXplZC5cbi8vIElmIHlvdSBhcmUgbWFraW5nIGEgbmV3IGxvY2FsZSBiYXNlZCBvbiB0aGlzIG9uZSwgY2hlY2sgaWYgdGhlIHNhbWUgaXMgdHJ1ZSBmb3IgdGhlIGxhbmd1YWdlIHlvdSdyZSB3b3JraW5nIG9uLlxuLy8gR2VuZXJhbGx5LCBmb3JtYXR0ZWQgZGF0ZXMgc2hvdWxkIGxvb2sgbGlrZSB0aGV5IGFyZSBpbiB0aGUgbWlkZGxlIG9mIGEgc2VudGVuY2UsXG4vLyBlLmcuIGluIFNwYW5pc2ggbGFuZ3VhZ2UgdGhlIHdlZWtkYXlzIGFuZCBtb250aHMgc2hvdWxkIGJlIGluIHRoZSBsb3dlcmNhc2UuXG52YXIgbW9udGhWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydKJywgJ0YnLCAnTScsICdBJywgJ00nLCAnSicsICdKJywgJ0EnLCAnUycsICdPJywgJ04nLCAnRCddLFxuICBhYmJyZXZpYXRlZDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICB3aWRlOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxufTtcbnZhciBkYXlWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWydTJywgJ00nLCAnVCcsICdXJywgJ1QnLCAnRicsICdTJ10sXG4gIHNob3J0OiBbJ1N1JywgJ01vJywgJ1R1JywgJ1dlJywgJ1RoJywgJ0ZyJywgJ1NhJ10sXG4gIGFiYnJldmlhdGVkOiBbJ1N1bicsICdNb24nLCAnVHVlJywgJ1dlZCcsICdUaHUnLCAnRnJpJywgJ1NhdCddLFxuICB3aWRlOiBbJ1N1bmRheScsICdNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5J11cbn07XG52YXIgZGF5UGVyaW9kVmFsdWVzID0ge1xuICBuYXJyb3c6IHtcbiAgICBhbTogJ2EnLFxuICAgIHBtOiAncCcsXG4gICAgbWlkbmlnaHQ6ICdtaScsXG4gICAgbm9vbjogJ24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9LFxuICBhYmJyZXZpYXRlZDoge1xuICAgIGFtOiAnQU0nLFxuICAgIHBtOiAnUE0nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgd2lkZToge1xuICAgIGFtOiAnYS5tLicsXG4gICAgcG06ICdwLm0uJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH1cbn07XG52YXIgZm9ybWF0dGluZ0RheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9XG59O1xudmFyIG9yZGluYWxOdW1iZXIgPSBmdW5jdGlvbiBvcmRpbmFsTnVtYmVyKGRpcnR5TnVtYmVyLCBfb3B0aW9ucykge1xuICB2YXIgbnVtYmVyID0gTnVtYmVyKGRpcnR5TnVtYmVyKTtcblxuICAvLyBJZiBvcmRpbmFsIG51bWJlcnMgZGVwZW5kIG9uIGNvbnRleHQsIGZvciBleGFtcGxlLFxuICAvLyBpZiB0aGV5IGFyZSBkaWZmZXJlbnQgZm9yIGRpZmZlcmVudCBncmFtbWF0aWNhbCBnZW5kZXJzLFxuICAvLyB1c2UgYG9wdGlvbnMudW5pdGAuXG4gIC8vXG4gIC8vIGB1bml0YCBjYW4gYmUgJ3llYXInLCAncXVhcnRlcicsICdtb250aCcsICd3ZWVrJywgJ2RhdGUnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheScsICdob3VyJywgJ21pbnV0ZScsICdzZWNvbmQnLlxuXG4gIHZhciByZW0xMDAgPSBudW1iZXIgJSAxMDA7XG4gIGlmIChyZW0xMDAgPiAyMCB8fCByZW0xMDAgPCAxMCkge1xuICAgIHN3aXRjaCAocmVtMTAwICUgMTApIHtcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdzdCc7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnbmQnO1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3JkJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bWJlciArICd0aCc7XG59O1xudmFyIGxvY2FsaXplID0ge1xuICBvcmRpbmFsTnVtYmVyOiBvcmRpbmFsTnVtYmVyLFxuICBlcmE6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBlcmFWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBxdWFydGVyVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnLFxuICAgIGFyZ3VtZW50Q2FsbGJhY2s6IGZ1bmN0aW9uIGFyZ3VtZW50Q2FsbGJhY2socXVhcnRlcikge1xuICAgICAgcmV0dXJuIHF1YXJ0ZXIgLSAxO1xuICAgIH1cbiAgfSksXG4gIG1vbnRoOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogbW9udGhWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheTogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJ1xuICB9KSxcbiAgZGF5UGVyaW9kOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnLFxuICAgIGZvcm1hdHRpbmdWYWx1ZXM6IGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMsXG4gICAgZGVmYXVsdEZvcm1hdHRpbmdXaWR0aDogJ3dpZGUnXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgbG9jYWxpemU7IiwiaW1wb3J0IGJ1aWxkTWF0Y2hGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanNcIjtcbmltcG9ydCBidWlsZE1hdGNoUGF0dGVybkZuIGZyb20gXCIuLi8uLi8uLi9fbGliL2J1aWxkTWF0Y2hQYXR0ZXJuRm4vaW5kZXguanNcIjtcbnZhciBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL14oXFxkKykodGh8c3R8bmR8cmQpPy9pO1xudmFyIHBhcnNlT3JkaW5hbE51bWJlclBhdHRlcm4gPSAvXFxkKy9pO1xudmFyIG1hdGNoRXJhUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYnxhKS9pLFxuICBhYmJyZXZpYXRlZDogL14oYlxcLj9cXHM/Y1xcLj98YlxcLj9cXHM/Y1xcLj9cXHM/ZVxcLj98YVxcLj9cXHM/ZFxcLj98Y1xcLj9cXHM/ZVxcLj8pL2ksXG4gIHdpZGU6IC9eKGJlZm9yZSBjaHJpc3R8YmVmb3JlIGNvbW1vbiBlcmF8YW5ubyBkb21pbml8Y29tbW9uIGVyYSkvaVxufTtcbnZhciBwYXJzZUVyYVBhdHRlcm5zID0ge1xuICBhbnk6IFsvXmIvaSwgL14oYXxjKS9pXVxufTtcbnZhciBtYXRjaFF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXlsxMjM0XS9pLFxuICBhYmJyZXZpYXRlZDogL15xWzEyMzRdL2ksXG4gIHdpZGU6IC9eWzEyMzRdKHRofHN0fG5kfHJkKT8gcXVhcnRlci9pXG59O1xudmFyIHBhcnNlUXVhcnRlclBhdHRlcm5zID0ge1xuICBhbnk6IFsvMS9pLCAvMi9pLCAvMy9pLCAvNC9pXVxufTtcbnZhciBtYXRjaE1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bamZtYXNvbmRdL2ksXG4gIGFiYnJldmlhdGVkOiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgd2lkZTogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaVxufTtcbnZhciBwYXJzZU1vbnRoUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9eai9pLCAvXmYvaSwgL15tL2ksIC9eYS9pLCAvXm0vaSwgL15qL2ksIC9eai9pLCAvXmEvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldLFxuICBhbnk6IFsvXmphL2ksIC9eZi9pLCAvXm1hci9pLCAvXmFwL2ksIC9ebWF5L2ksIC9eanVuL2ksIC9eanVsL2ksIC9eYXUvaSwgL15zL2ksIC9eby9pLCAvXm4vaSwgL15kL2ldXG59O1xudmFyIG1hdGNoRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bc210d2ZdL2ksXG4gIHNob3J0OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgd2lkZTogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2lcbn07XG52YXIgcGFyc2VEYXlQYXR0ZXJucyA9IHtcbiAgbmFycm93OiBbL15zL2ksIC9ebS9pLCAvXnQvaSwgL153L2ksIC9edC9pLCAvXmYvaSwgL15zL2ldLFxuICBhbnk6IFsvXnN1L2ksIC9ebS9pLCAvXnR1L2ksIC9edy9pLCAvXnRoL2ksIC9eZi9pLCAvXnNhL2ldXG59O1xudmFyIG1hdGNoRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL14oYXxwfG1pfG58KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pLFxuICBhbnk6IC9eKFthcF1cXC4/XFxzP21cXC4/fG1pZG5pZ2h0fG5vb258KGluIHRoZXxhdCkgKG1vcm5pbmd8YWZ0ZXJub29ufGV2ZW5pbmd8bmlnaHQpKS9pXG59O1xudmFyIHBhcnNlRGF5UGVyaW9kUGF0dGVybnMgPSB7XG4gIGFueToge1xuICAgIGFtOiAvXmEvaSxcbiAgICBwbTogL15wL2ksXG4gICAgbWlkbmlnaHQ6IC9ebWkvaSxcbiAgICBub29uOiAvXm5vL2ksXG4gICAgbW9ybmluZzogL21vcm5pbmcvaSxcbiAgICBhZnRlcm5vb246IC9hZnRlcm5vb24vaSxcbiAgICBldmVuaW5nOiAvZXZlbmluZy9pLFxuICAgIG5pZ2h0OiAvbmlnaHQvaVxuICB9XG59O1xudmFyIG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyOiBidWlsZE1hdGNoUGF0dGVybkZuKHtcbiAgICBtYXRjaFBhdHRlcm46IG1hdGNoT3JkaW5hbE51bWJlclBhdHRlcm4sXG4gICAgcGFyc2VQYXR0ZXJuOiBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHZhbHVlQ2FsbGJhY2s6IGZ1bmN0aW9uIHZhbHVlQ2FsbGJhY2sodmFsdWUpIHtcbiAgICAgIHJldHVybiBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgIH1cbiAgfSksXG4gIGVyYTogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaEVyYVBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSksXG4gIHF1YXJ0ZXI6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueScsXG4gICAgdmFsdWVDYWxsYmFjazogZnVuY3Rpb24gdmFsdWVDYWxsYmFjayhpbmRleCkge1xuICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRNYXRjaEZuKHtcbiAgICBtYXRjaFBhdHRlcm5zOiBtYXRjaE1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZU1vbnRoUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXk6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBkYXlQZXJpb2Q6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ2FueScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VEYXlQZXJpb2RQYXR0ZXJucyxcbiAgICBkZWZhdWx0UGFyc2VXaWR0aDogJ2FueSdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBtYXRjaDsiLCJpbXBvcnQgZm9ybWF0RGlzdGFuY2UgZnJvbSBcIi4vX2xpYi9mb3JtYXREaXN0YW5jZS9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdExvbmcgZnJvbSBcIi4vX2xpYi9mb3JtYXRMb25nL2luZGV4LmpzXCI7XG5pbXBvcnQgZm9ybWF0UmVsYXRpdmUgZnJvbSBcIi4vX2xpYi9mb3JtYXRSZWxhdGl2ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGxvY2FsaXplIGZyb20gXCIuL19saWIvbG9jYWxpemUvaW5kZXguanNcIjtcbmltcG9ydCBtYXRjaCBmcm9tIFwiLi9fbGliL21hdGNoL2luZGV4LmpzXCI7XG4vKipcbiAqIEB0eXBlIHtMb2NhbGV9XG4gKiBAY2F0ZWdvcnkgTG9jYWxlc1xuICogQHN1bW1hcnkgRW5nbGlzaCBsb2NhbGUgKFVuaXRlZCBTdGF0ZXMpLlxuICogQGxhbmd1YWdlIEVuZ2xpc2hcbiAqIEBpc28tNjM5LTIgZW5nXG4gKiBAYXV0aG9yIFNhc2hhIEtvc3MgW0Brb3Nzbm9jb3JwXXtAbGluayBodHRwczovL2dpdGh1Yi5jb20va29zc25vY29ycH1cbiAqIEBhdXRob3IgTGVzaGEgS29zcyBbQGxlc2hha29zc117QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2xlc2hha29zc31cbiAqL1xudmFyIGxvY2FsZSA9IHtcbiAgY29kZTogJ2VuLVVTJyxcbiAgZm9ybWF0RGlzdGFuY2U6IGZvcm1hdERpc3RhbmNlLFxuICBmb3JtYXRMb25nOiBmb3JtYXRMb25nLFxuICBmb3JtYXRSZWxhdGl2ZTogZm9ybWF0UmVsYXRpdmUsXG4gIGxvY2FsaXplOiBsb2NhbGl6ZSxcbiAgbWF0Y2g6IG1hdGNoLFxuICBvcHRpb25zOiB7XG4gICAgd2Vla1N0YXJ0c09uOiAwIC8qIFN1bmRheSAqLyxcbiAgICBmaXJzdFdlZWtDb250YWluc0RhdGU6IDFcbiAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsZTsiLCJpbXBvcnQgX3R5cGVvZiBmcm9tIFwiQGJhYmVsL3J1bnRpbWUvaGVscGVycy9lc20vdHlwZW9mXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSB0b0RhdGVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGFuIGluc3RhbmNlIG9mIERhdGUsIHRoZSBmdW5jdGlvbiByZXR1cm5zIGl0cyBjbG9uZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYSBudW1iZXIsIGl0IGlzIHRyZWF0ZWQgYXMgYSB0aW1lc3RhbXAuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIG5vbmUgb2YgdGhlIGFib3ZlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBJbnZhbGlkIERhdGUuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHJldHVybnMge0RhdGV9IHRoZSBwYXJzZWQgZGF0ZSBpbiB0aGUgbG9jYWwgdGltZSB6b25lXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2xvbmUgdGhlIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUobmV3IERhdGUoMjAxNCwgMSwgMTEsIDExLCAzMCwgMzApKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCB0aGUgdGltZXN0YW1wIHRvIGRhdGU6XG4gKiBjb25zdCByZXN1bHQgPSB0b0RhdGUoMTM5MjA5ODQzMDAwMClcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRvRGF0ZShhcmd1bWVudCkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgdmFyIGFyZ1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmd1bWVudCk7XG5cbiAgLy8gQ2xvbmUgdGhlIGRhdGVcbiAgaWYgKGFyZ3VtZW50IGluc3RhbmNlb2YgRGF0ZSB8fCBfdHlwZW9mKGFyZ3VtZW50KSA9PT0gJ29iamVjdCcgJiYgYXJnU3RyID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgYXJndW1lbnQgPT09ICdudW1iZXInIHx8IGFyZ1N0ciA9PT0gJ1tvYmplY3QgTnVtYmVyXScpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpO1xuICB9IGVsc2Uge1xuICAgIGlmICgodHlwZW9mIGFyZ3VtZW50ID09PSAnc3RyaW5nJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IFN0cmluZ10nKSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICBjb25zb2xlLndhcm4oXCJTdGFydGluZyB3aXRoIHYyLjAuMC1iZXRhLjEgZGF0ZS1mbnMgZG9lc24ndCBhY2NlcHQgc3RyaW5ncyBhcyBkYXRlIGFyZ3VtZW50cy4gUGxlYXNlIHVzZSBgcGFyc2VJU09gIHRvIHBhcnNlIHN0cmluZ3MuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2Jsb2IvbWFzdGVyL2RvY3MvdXBncmFkZUd1aWRlLm1kI3N0cmluZy1hcmd1bWVudHNcIik7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKG5ldyBFcnJvcigpLnN0YWNrKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTik7XG4gIH1cbn0iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJleHBvcnQgY29uc3QgUHViU3ViID0gKCgpID0+IHtcbiAgY29uc3QgTk9UX1BSRVNFTlRfSU5fVEhFX0FSUkFZID0gLTE7XG4gIGNvbnN0IGV2ZW50cyA9IHt9O1xuXG4gIGZ1bmN0aW9uIGRlYnVnRXZlbnRBbm5vdW5jZShldmVudCkge1xuICAgIGNvbnNvbGUubG9nKGBbZGVidWddIEVWRU5UICR7ZXZlbnR9IElTIENBTExFRGApO1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdChldmVudCwgcGFyYW0gPSBudWxsKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGRlYnVnRXZlbnRBbm5vdW5jZShldmVudCk7XG4gICAgICBmb3IgKGxldCBmdW5jIG9mIGV2ZW50c1tldmVudF0pIHtcbiAgICAgICAgZnVuYyhwYXJhbSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KGBUaGVyZSBpcyBubyBldmVudCB3aXRoIGEgbmFtZSAnJHtldmVudH0nYCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb24oZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgZXZlbnRzW2V2ZW50XS5wdXNoKGZ1bmMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudHNbZXZlbnRdID0gW2Z1bmNdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9mZihldmVudCwgZnVuYykge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBjb25zdCBpbmRleE9mR2l2ZW5GdW5jdGlvbiA9IGV2ZW50c1tldmVudF0uaW5kZXhPZihmdW5jKTtcbiAgICAgIGlmIChpbmRleE9mR2l2ZW5GdW5jdGlvbiAhPT0gTk9UX1BSRVNFTlRfSU5fVEhFX0FSUkFZKSB7XG4gICAgICAgIGV2ZW50c1tldmVudF0uc3BsaWNlKGluZGV4T2ZHaXZlbkZ1bmN0aW9uLCAxKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWxlcnQoXG4gICAgICAgIGBUaGVyZSBpcyBlaXRoZXIgbm8gc3VjaCBldmVudCAoJHtldmVudH0pIHJlZ2lzdGVyZWQsIG9yIHlvdXIgZnVuY3Rpb24gaXNuJ3QgcHJlc2VudCB0aGVyZWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgZW1pdCwgb24sIG9mZiB9O1xufSkoKTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi4vUHViU3ViXCIpO1xuaW1wb3J0ICogYXMgZm9ybVV0aWxzIGZyb20gXCIuL2Zvcm0tdXRpbGl0aWVzXCI7XG5pbXBvcnQgeyBTdWJ0YXNrTWFuYWdlciB9IGZyb20gXCIuL21hbmFnZXJzL3N1YnRhc2stbWFuYWdlclwiO1xuXG5leHBvcnQgY29uc3QgRk9STV9SRUdJU1RSWSA9IHt9O1xuY29uc3QgTU9ERVMgPSB7IENSRUFUSU9OOiAwLCBFRElUSU5HOiAxLCBJTkZPUk1BVElPTjogMiB9O1xuXG5jb25zdCBjcmVhdGVTdWJ0YXNrQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGUtc3VidGFzay1idXR0b25cIik7XG5jcmVhdGVTdWJ0YXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjcmVhdGVTdWJ0YXNrKTtcblxuY29uc3QgbGlzdEZvcm0gPSByZWdpc3RlckZvcm0oXCJsaXN0LWZvcm0tYmFja2dyb3VuZFwiLCBcIkxpc3RcIik7XG5jb25zdCB0YXNrRm9ybSA9IHJlZ2lzdGVyRm9ybShcInRhc2stZm9ybS1iYWNrZ3JvdW5kXCIsIFwiVGFza1wiKTtcbmNvbnN0IHBhcmVudExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBhcmVudExpc3RcIik7XG5yZWdpc3Rlck1hbmFnZXIoXG4gIHRhc2tGb3JtLFxuICBuZXcgU3VidGFza01hbmFnZXIodGFza0Zvcm0pLFxuICBcInN1YnRhc2tNYW5hZ2VyXCIsXG4gIFwic3VidGFza3NcIlxuKTtcblxuZnVuY3Rpb24gcmVnaXN0ZXJNYW5hZ2VyKFxuICB3b3JraW5nRm9ybSxcbiAgbWFuYWdlclJlZmVyZW5jZSxcbiAgbWFuYWdlck5hbWUsXG4gIGlucHV0UHJvcGVydHlOYW1lXG4pIHtcbiAgd29ya2luZ0Zvcm0ubWFuYWdlcnNbbWFuYWdlck5hbWVdID0ge1xuICAgIHJlZmVyZW5jZTogbWFuYWdlclJlZmVyZW5jZSxcbiAgICBuYW1lOiBpbnB1dFByb3BlcnR5TmFtZSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3VidGFzaygpIHtcbiAgY29uc3Qgc3VidGFza01hbmFnZXJSZWZlcmVuY2UgPSB0YXNrRm9ybS5tYW5hZ2Vycy5zdWJ0YXNrTWFuYWdlci5yZWZlcmVuY2U7XG4gIGlmICghc3VidGFza01hbmFnZXJSZWZlcmVuY2UuaXNJbnNpZGVQYXJlbnRGb3JtKCkpIHtcbiAgICBjb25zdCByb3dzID0gdGFza0Zvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLnJvd1wiKTtcbiAgICBjb25zdCBsYXN0Um93ID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdO1xuICAgIHN1YnRhc2tNYW5hZ2VyUmVmZXJlbmNlLnNldHVwKHtcbiAgICAgIG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvbjogbGFzdFJvdyxcbiAgICB9KTtcbiAgfVxuICBzdWJ0YXNrTWFuYWdlclJlZmVyZW5jZS5hZGRTdWJ0YXNrKCk7XG59XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyRm9ybShiYWNrZ3JvdW5kSWQsIGNvZGVuYW1lKSB7XG4gIEZPUk1fUkVHSVNUUllbY29kZW5hbWVdID0gY29kZW5hbWU7XG4gIGNvbnN0IGZvcm1CYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYmFja2dyb3VuZElkKTtcbiAgcmV0dXJuIHtcbiAgICBiYWNrZ3JvdW5kOiBmb3JtQmFja2dyb3VuZCxcbiAgICBmb3JtOiBmb3JtQmFja2dyb3VuZC5xdWVyeVNlbGVjdG9yKFwiZm9ybVwiKSxcbiAgICB0aXRsZTogZm9ybUJhY2tncm91bmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImZvcm0tdGl0bGVcIilbMF0sXG4gICAgbW9kZTogTU9ERVMuQ1JFQVRJT04sXG4gICAgbWFuYWdlcnM6IHt9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRGb3JtRGF0YShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcblxuICBjb25zdCBmb3JtSW5wdXREYXRhID0ge307XG4gIEFycmF5LmZyb20od29ya2luZ0Zvcm0uZm9ybS5lbGVtZW50cykuZm9yRWFjaCgoY3VycmVudCkgPT4ge1xuICAgIGlmIChjdXJyZW50Lm5vZGVOYW1lICE9PSBcIkJVVFRPTlwiKSB7XG4gICAgICBjb25zdCBpbnB1dENvbnRlbnRUeXBlID0gY3VycmVudC5pZDtcbiAgICAgIGZvcm1JbnB1dERhdGFbaW5wdXRDb250ZW50VHlwZV0gPSBmb3JtVXRpbHMudHJpbUlucHV0KGN1cnJlbnQudmFsdWUpO1xuICAgIH1cbiAgfSk7XG4gIGlmICh3b3JraW5nRm9ybS5tYW5hZ2Vycykge1xuICAgIGZvciAobGV0IG1hbmFnZXIgb2YgT2JqZWN0LnZhbHVlcyh3b3JraW5nRm9ybS5tYW5hZ2VycykpIHtcbiAgICAgIGNvbnN0IGRhdGEgPSBtYW5hZ2VyLnJlZmVyZW5jZS5nZXREYXRhKCk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIGZvcm1JbnB1dERhdGFbbWFuYWdlci5uYW1lXSA9IGRhdGE7XG4gICAgICBtYW5hZ2VyLnJlZmVyZW5jZS5yZXNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGxldCBwYXRoID0gbnVsbDtcbiAgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkVESVRJTkcpIHtcbiAgICBwYXRoID0gZm9ybVV0aWxzLmdldEVudGl0eVBhdGgod29ya2luZ0Zvcm0sIGZvcm1UeXBlKTtcbiAgfVxuXG4gIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5DUkVBVElPTikge1xuICAgIFB1YlN1Yi5lbWl0KGZvcm1UeXBlICsgXCJJc1JlYWR5Rm9yQ3JlYXRpb25cIiwgZm9ybUlucHV0RGF0YSk7XG4gIH0gZWxzZSBpZiAod29ya2luZ0Zvcm0ubW9kZSA9PT0gTU9ERVMuRURJVElORykge1xuICAgIFB1YlN1Yi5lbWl0KGZvcm1UeXBlICsgXCJJc1JlYWR5Rm9yRWRpdGluZ1wiLCB7XG4gICAgICBkYXRhOiBmb3JtSW5wdXREYXRhLFxuICAgICAgcGF0aCxcbiAgICB9KTtcbiAgfVxuICByZXNldEZvcm0oZm9ybVR5cGUpO1xufVxuXG5mdW5jdGlvbiBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSkge1xuICBzd2l0Y2ggKGZvcm1UeXBlKSB7XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLkxpc3Q6XG4gICAgICByZXR1cm4gbGlzdEZvcm07XG4gICAgY2FzZSBGT1JNX1JFR0lTVFJZLlRhc2s6XG4gICAgICByZXR1cm4gdGFza0Zvcm07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVzZXRGb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5mb3JtLnJlc2V0KCk7XG4gIHdvcmtpbmdGb3JtLmZvcm0ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS0ke2Zvcm1UeXBlfS1saXN0LWlkXCIpO1xuXG4gIHdvcmtpbmdGb3JtLnRpdGxlLnRleHRDb250ZW50ID0gYENyZWF0ZSBhIG5ldyAke2Zvcm1UeXBlfWA7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5DUkVBVElPTjtcblxuICBjb25zdCBmaW5pc2hVc2luZ0Zvcm1CdXR0b24gPVxuICAgIHdvcmtpbmdGb3JtLmZvcm0ucXVlcnlTZWxlY3RvcihcIi5maW5pc2gtYnV0dG9uXCIpO1xuICBmaW5pc2hVc2luZ0Zvcm1CdXR0b24uc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG5cbiAgZm9yIChsZXQgbWFuYWdlciBvZiBPYmplY3QudmFsdWVzKHdvcmtpbmdGb3JtLm1hbmFnZXJzKSkge1xuICAgIG1hbmFnZXIucmVmZXJlbmNlLnJlc2V0KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb3BlbkZvcm0oZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIHdvcmtpbmdGb3JtLmJhY2tncm91bmQuc3R5bGUuZGlzcGxheSA9IFwiZmxleFwiO1xuXG4gIGlmICh3b3JraW5nRm9ybSA9PT0gdGFza0Zvcm0pIHtcbiAgICBQdWJTdWIuZW1pdChcIkdldExpc3RSZWdpc3RyeVwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbG9zZUZvcm0oZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIHdvcmtpbmdGb3JtLmJhY2tncm91bmQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuXG4gIGlmICh3b3JraW5nRm9ybS5tb2RlICE9PSBNT0RFUy5DUkVBVElPTikge1xuICAgIHJlc2V0Rm9ybShmb3JtVHlwZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBQYXJlbnRMaXN0U2VsZWN0aW9uKHJlZ2lzdHJ5KSB7XG4gIGxldCBwYXJlbnRMaXN0Q29udGVudCA9IFwiXCI7XG4gIHJlZ2lzdHJ5LmZvckVhY2goKGxpc3QpID0+IHtcbiAgICBwYXJlbnRMaXN0Q29udGVudCArPSBgPG9wdGlvbiB2YWx1ZT1cIiR7bGlzdC5pZH1cIj4ke2xpc3QubmFtZX08L29wdGlvbj5gO1xuICB9KTtcbiAgcGFyZW50TGlzdC5pbm5lckhUTUwgPSBwYXJlbnRMaXN0Q29udGVudDtcbn1cblxuZnVuY3Rpb24gc2V0UGFyZW50TGlzdFNlbGVjdGlvblRvVmFsdWUoaWQpIHtcbiAgcGFyZW50TGlzdC52YWx1ZSA9IGlkO1xufVxuXG5mdW5jdGlvbiBwcmVwYXJlRm9ybUZvckVkaXRpbmdNb2RlKGRhdGEpIHtcbiAgY29uc3QgZm9ybVR5cGUgPSBkYXRhLmZvcm1UeXBlO1xuICBjb25zdCBlbnRpdHkgPSBkYXRhLmVudGl0eTtcblxuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgY29uc3QgZGF0YXNldFByb3BlcnR5TmFtZSA9IGBlZGl0YWJsZSR7Zm9ybVR5cGV9SWRgO1xuXG4gIHdvcmtpbmdGb3JtLnRpdGxlLnRleHRDb250ZW50ID0gYEVkaXQgYSAke2RhdGEuZm9ybVR5cGV9YDtcbiAgd29ya2luZ0Zvcm0ubW9kZSA9IE1PREVTLkVESVRJTkc7XG5cbiAgQXJyYXkuZnJvbSh3b3JraW5nRm9ybS5mb3JtLmVsZW1lbnRzKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgaWYgKG5vZGUubm9kZU5hbWUgIT09IFwiQlVUVE9OXCIpIHtcbiAgICAgIG5vZGUudmFsdWUgPSBlbnRpdHlbbm9kZS5pZF07XG4gICAgfVxuICB9KTtcbiAgZm9yIChsZXQgbWFuYWdlciBvZiBPYmplY3QudmFsdWVzKHdvcmtpbmdGb3JtLm1hbmFnZXJzKSkge1xuICAgIGNvbnN0IHJvd3MgPSB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwoXCIucm93XCIpO1xuICAgIGNvbnN0IGxhc3RSb3cgPSByb3dzW3Jvd3MubGVuZ3RoIC0gMV07XG4gICAgaWYgKGVudGl0eVttYW5hZ2VyLm5hbWVdLmxlbmd0aCA+IDApIHtcbiAgICAgIG1hbmFnZXIucmVmZXJlbmNlLnNldHVwKHsgZW50aXR5LCBub2RlQmVmb3JlV2hpY2hUb1B1dFNlY3Rpb246IGxhc3RSb3cgfSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGZvcm1UeXBlID09PSBGT1JNX1JFR0lTVFJZLkxpc3QpIHtcbiAgICB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXRbZGF0YXNldFByb3BlcnR5TmFtZV0gPSBlbnRpdHkuaWQ7XG4gIH0gZWxzZSBpZiAoZm9ybVR5cGUgPT09IEZPUk1fUkVHSVNUUlkuVGFzaykge1xuICAgIHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldFtcbiAgICAgIGRhdGFzZXRQcm9wZXJ0eU5hbWVcbiAgICBdID0gYCR7ZW50aXR5LnBhcmVudExpc3R9OiR7ZW50aXR5LmlkfWA7XG4gIH1cbn1cblxuUHViU3ViLm9uKFwiT3BlbkZvcm1cIiwgb3BlbkZvcm0pO1xuUHViU3ViLm9uKFwiQ2xvc2VGb3JtXCIsIGNsb3NlRm9ybSk7XG5cblB1YlN1Yi5vbihcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBnZXRGb3JtRGF0YSk7XG5QdWJTdWIub24oXCJMaXN0UmVnaXN0cnlHZXRzUmV0dXJuZWRcIiwgc2V0dXBQYXJlbnRMaXN0U2VsZWN0aW9uKTtcblB1YlN1Yi5vbihcIkxpc3RJZEdldHNSZXR1cm5lZFwiLCBzZXRQYXJlbnRMaXN0U2VsZWN0aW9uVG9WYWx1ZSk7XG5cblB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwgcHJlcGFyZUZvcm1Gb3JFZGl0aW5nTW9kZSk7XG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyaW1JbnB1dChpbnB1dFZhbHVlKSB7XG4gIHJldHVybiBpbnB1dFZhbHVlLnRyaW0oKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0eVBhdGgod29ya2luZ0Zvcm0sIGZvcm1UeXBlKSB7XG4gIGNvbnN0IGRhdGFzZXRRdWVyeSA9IGBlZGl0YWJsZSR7Zm9ybVR5cGV9SWRgO1xuICBjb25zdCBlZGl0YWJsZUVudGl0eUlkID0gd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0W2RhdGFzZXRRdWVyeV07XG4gIGNvbnN0IHBhdGhBcnJheSA9IGVkaXRhYmxlRW50aXR5SWQuc3BsaXQoXCI6XCIpO1xuICBjb25zdCBwYXRoID0geyBsaXN0SWQ6IHBhdGhBcnJheVswXSwgdGFza0lkOiBwYXRoQXJyYXlbMV0gfTtcbiAgcmV0dXJuIHBhdGg7XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBTdWJ0YXNrQ3JlYXRvciB9IGZyb20gXCIuLi8uLi9zdWJ0YXNrTWFuYWdlbWVudC9zdWJ0YXNrLWNyZWF0b3JcIjtcbmltcG9ydCB7IFN1YnRhc2tSZWdpc3RyYXIgfSBmcm9tIFwiLi4vLi4vc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1yZWdpc3RyYXJcIjtcbmltcG9ydCB7IFN1YnRhc2tSZW5kZXJlciB9IGZyb20gXCIuLi8uLi9zdWJ0YXNrTWFuYWdlbWVudC9zdWJ0YXNrLXJlbmRlcmVyXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJ0YXNrTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKHBhcmVudEZvcm0pIHtcbiAgICB0aGlzLnBhcmVudEZvcm0gPSBwYXJlbnRGb3JtO1xuICAgIHRoaXMuc3VidGFza1NlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHRoaXMuc3VidGFza1NlY3Rpb24uaWQgPSBcInN1YnRhc2stc2VjdGlvblwiO1xuXG4gICAgdGhpcy5zdWJ0YXNrQ3JlYXRvciA9IG5ldyBTdWJ0YXNrQ3JlYXRvcigpO1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJhciA9IG5ldyBTdWJ0YXNrUmVnaXN0cmFyKHRoaXMuc3VidGFza1NlY3Rpb24pO1xuICAgIHRoaXMuc3VidGFza1JlbmRlcmVyID0gbmV3IFN1YnRhc2tSZW5kZXJlcih0aGlzLnN1YnRhc2tTZWN0aW9uKTtcblxuICAgIFB1YlN1Yi5vbihcIlVzZXJXYW50c1RvUmVtb3ZlU3VidGFza1wiLCB0aGlzLnJlbW92ZVN1YnRhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFxuICAgICAgXCJVc2VyV2FudHNUb0NoZWNrU3VidGFza1wiLFxuICAgICAgdGhpcy5jaGVja1N1YnRhc2tGaW5pc2hlZE9yT3RoZXJ3aXNlLmJpbmQodGhpcylcbiAgICApO1xuICB9XG5cbiAgY2hlY2tTdWJ0YXNrRmluaXNoZWRPck90aGVyd2lzZShzdWJ0YXNrKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLnNldENoZWNrZWRPck90aGVyd2lzZShzdWJ0YXNrKTtcbiAgICB0aGlzLnN1YnRhc2tSZW5kZXJlci5yZW5kZXJDaGVja2VkT3JPdGhlcndpc2Uoc3VidGFzayk7XG4gIH1cblxuICByZW1vdmVTdWJ0YXNrKHN1YnRhc2spIHtcbiAgICB0aGlzLnN1YnRhc2tSZW5kZXJlci5zdG9wUmVuZGVyaW5nU3VidGFzayhzdWJ0YXNrLmRpdik7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLnJlbW92ZVN1YnRhc2tCeUlkKHN1YnRhc2spO1xuXG4gICAgaWYgKCF0aGlzLnN1YnRhc2tTZWN0aW9uLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgdGhpcy5zdWJ0YXNrU2VjdGlvbi5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICBpc0luc2lkZVBhcmVudEZvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50Rm9ybS5mb3JtLmNvbnRhaW5zKHRoaXMuc3VidGFza1NlY3Rpb24pO1xuICB9XG5cbiAgc2V0dXAoeyBub2RlQmVmb3JlV2hpY2hUb1B1dFNlY3Rpb24gPSBudWxsLCBlbnRpdHkgPSBudWxsIH0pIHtcbiAgICBpZiAoZW50aXR5KSB7XG4gICAgICBlbnRpdHkuc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaykgPT4ge1xuICAgICAgICB0aGlzLmFkZFN1YnRhc2soc3VidGFzayk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAobm9kZUJlZm9yZVdoaWNoVG9QdXRTZWN0aW9uKSB7XG4gICAgICB0aGlzLnBhcmVudEZvcm0uZm9ybS5pbnNlcnRCZWZvcmUoXG4gICAgICAgIHRoaXMuc3VidGFza1NlY3Rpb24sXG4gICAgICAgIG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJlbnRGb3JtLmZvcm0uYXBwZW5kQ2hpbGQodGhpcy5zdWJ0YXNrU2VjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgYWRkU3VidGFzayhzdWJ0YXNrKSB7XG4gICAgY29uc3QgbmV3U3VidGFzayA9IHN1YnRhc2sgPyBzdWJ0YXNrIDogdGhpcy5zdWJ0YXNrQ3JlYXRvci5jcmVhdGVTdWJ0YXNrKCk7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLnJlZ2lzdGVyU3VidGFzayhuZXdTdWJ0YXNrKTtcbiAgICB0aGlzLnN1YnRhc2tSZW5kZXJlci5yZW5kZXJTdWJ0YXNrKG5ld1N1YnRhc2spO1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJhci51cGRhdGVJZHMoKTtcbiAgfVxuXG4gIGdldERhdGEoKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLmFwcGx5RGF0YSgpO1xuICAgIHJldHVybiB0aGlzLnN1YnRhc2tSZWdpc3RyYXIuZ2V0U3VidGFza3ModGhpcy5zdWJ0YXNrU2VjdGlvbik7XG4gIH1cblxuICByZXNldCgpIHtcbiAgICBjb25zdCByZWdpc3RyeSA9IHRoaXMuc3VidGFza1JlZ2lzdHJhci5nZXRTdWJ0YXNrcygpO1xuICAgIHRoaXMuc3VidGFza1JlbmRlcmVyLnN0b3BSZW5kZXJpbmdTdWJ0YXNrc0lubmVyRWxlbWVudHMocmVnaXN0cnkpO1xuXG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLnJlc2V0UmVnaXN0cnkoKTtcbiAgICB0aGlzLnN1YnRhc2tTZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XG4gICAgdGhpcy5zdWJ0YXNrU2VjdGlvbi5yZW1vdmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IFwiLi9saXN0LWNyZWF0b3JcIjtcbmltcG9ydCBcIi4vbGlzdC1yZWdpc3RyYXJcIjtcbmltcG9ydCBcIi4vbGlzdC1yZW5kZXJlclwiO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IHNldHVwQnV0dG9uIH0gZnJvbSBcIi4uL3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgTGlzdCB9IGZyb20gXCIuL2xpc3RcIjtcblxuZnVuY3Rpb24gY3JlYXRlRGVmYXVsdExpc3QoKSB7XG4gIGNvbnN0IGNyZWF0aW9uRGF0YSA9IHsgbmFtZTogXCJEZWZhdWx0XCIsIGNvbG9yOiBcIiNjY2NcIiB9O1xuICBjb25zdCBkZWZhdWx0TGlzdCA9IG5ldyBMaXN0KGNyZWF0aW9uRGF0YSk7XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFBlbmRpbmdcIiwgZGVmYXVsdExpc3QpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOZXdMaXN0KG5ld0RhdGEpIHtcbiAgY29uc3QgbGlzdCA9IG5ldyBMaXN0KG5ld0RhdGEpO1xuICBhZGROb25EZWZhdWx0TGlzdEJ1dHRvbnMobGlzdCk7XG4gIFB1YlN1Yi5lbWl0KFwiTGlzdFBlbmRpbmdcIiwgbGlzdCk7XG59XG5cbmZ1bmN0aW9uIGFkZE5vbkRlZmF1bHRMaXN0QnV0dG9ucyhsaXN0KSB7XG4gIGxpc3QuRWRpdExpc3RCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICBcImVkaXRcIixcbiAgICBcImVkaXQtYnV0dG9uXCIsXG4gICAgbGlzdCxcbiAgICBcIkVkaXRMaXN0QnV0dG9uXCJcbiAgKTtcbiAgbGlzdC5FZGl0TGlzdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0TGlzdFwiLCB7XG4gICAgICBlbnRpdHk6IGxpc3QsXG4gICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5MaXN0LFxuICAgIH0pO1xuICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbiAgfSk7XG5cbiAgbGlzdC5SZW1vdmVMaXN0QnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgXCJ4XCIsXG4gICAgXCJyZW1vdmUtYnV0dG9uXCIsXG4gICAgbGlzdCxcbiAgICBcIlJlbW92ZUxpc3RCdXR0b25cIlxuICApO1xuICBsaXN0LlJlbW92ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBQdWJTdWIuZW1pdChcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgbGlzdCk7XG4gIH0pO1xufVxuXG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckNyZWF0aW9uXCIsIGNyZWF0ZU5ld0xpc3QpO1xuUHViU3ViLm9uKFwiQ3JlYXRlRGVmYXVsdExpc3RcIiwgY3JlYXRlRGVmYXVsdExpc3QpO1xuIiwiY29uc3QgeyBQdWJTdWIgfSA9IHJlcXVpcmUoXCIuLi9QdWJTdWJcIik7XG5cbmNvbnN0IExJU1RfUkVHSVNUUlkgPSBbXTtcblxuZnVuY3Rpb24gYWRkTGlzdFRvUmVnaXN0cnkobGlzdCkge1xuICBMSVNUX1JFR0lTVFJZLnB1c2gobGlzdCk7XG4gIGxpc3QuaWQgPSBMSVNUX1JFR0lTVFJZLmxlbmd0aCAtIDE7XG4gIGNvbnN0IGxpc3REYXRhID0geyBsaXN0LCBsaXN0SWQ6IExJU1RfUkVHSVNUUlkubGVuZ3RoIC0gMSB9O1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RlcmVkXCIsIGxpc3REYXRhKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGlzdElkcygpIHtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBMSVNUX1JFR0lTVFJZLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgbGlzdCA9IExJU1RfUkVHSVNUUllbaV07XG4gICAgbGlzdC5pZCA9IGk7XG4gICAgbGlzdC5kaXYuZGF0YXNldC5saXN0SWQgPSBpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUxpc3RGcm9tUmVnaXN0cnkobGlzdCkge1xuICBMSVNUX1JFR0lTVFJZLnNwbGljZShsaXN0LmlkLCAxKTtcbiAgdXBkYXRlTGlzdElkcygpO1xufVxuXG5mdW5jdGlvbiBlZGl0TGlzdChsaXN0RGF0YSkge1xuICBjb25zdCBlZGl0YWJsZUxpc3QgPSBMSVNUX1JFR0lTVFJZW2xpc3REYXRhLnBhdGgubGlzdElkXTtcbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobGlzdERhdGEuZGF0YSkpIHtcbiAgICBlZGl0YWJsZUxpc3Rba2V5XSA9IHZhbHVlO1xuICB9XG4gIFB1YlN1Yi5lbWl0KFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCB7XG4gICAgbGlzdDogZWRpdGFibGVMaXN0LFxuICAgIGxpc3RJZDogZWRpdGFibGVMaXN0LmlkLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZ2V0TGlzdFJlZ2lzdHJ5KCkge1xuICBQdWJTdWIuZW1pdChcIkxpc3RSZWdpc3RyeUdldHNSZXR1cm5lZFwiLCBMSVNUX1JFR0lTVFJZKTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdFBlbmRpbmdcIiwgYWRkTGlzdFRvUmVnaXN0cnkpO1xuUHViU3ViLm9uKFwiTGlzdFNob3VsZEJlUmVtb3ZlZFwiLCByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RJc1JlYWR5Rm9yRWRpdGluZ1wiLCBlZGl0TGlzdCk7XG5QdWJTdWIub24oXCJHZXRMaXN0UmVnaXN0cnlcIiwgZ2V0TGlzdFJlZ2lzdHJ5KTtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IGFwcGVuZEVudGl0eSwgcmVtb3ZlRW50aXR5RGl2IH0gZnJvbSBcIi4uL3V0aWxpdGllc1wiO1xuXG5jb25zdCBsaXN0RGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGlzdHNcIik7XG5cbmZ1bmN0aW9uIHJlbmRlckxpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgbGlzdCA9IGxpc3REYXRhLmxpc3Q7XG5cbiAgY29uc3QgbGlzdERpdiA9IGxpc3QuZGl2O1xuICBsaXN0RGl2LmRhdGFzZXQubGlzdElkID0gbGlzdERhdGEubGlzdElkO1xuICBsaXN0RGl2LmNsYXNzTGlzdC5hZGQoXCJsaXN0XCIpO1xuICBsaXN0RGl2LnN0eWxlLmJvcmRlckNvbG9yID0gbGlzdC5jb2xvcjtcblxuICBhcHBlbmRFbnRpdHkobGlzdERpc3BsYXksIFwibGlzdFwiLCBsaXN0LCBsaXN0RGl2KTtcblxuICBjb25zdCBsaXN0Um93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgbGlzdFJvdy5jbGFzc0xpc3QuYWRkKFwibGlzdC1yb3dcIik7XG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQobGlzdFJvdyk7XG5cbiAgY29uc3QgbGlzdE5hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGxpc3ROYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpO1xuICBsaXN0TmFtZVRleHQudGV4dENvbnRlbnQgPSBsaXN0Lm5hbWU7XG4gIGxpc3RSb3cuYXBwZW5kQ2hpbGQobGlzdE5hbWVUZXh0KTtcblxuICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9ucy1yb3dcIik7XG4gIGxpc3RSb3cuYXBwZW5kQ2hpbGQoYnV0dG9uc0Rpdik7XG5cbiAgcmVuZGVyQWxsTGlzdEJ1dHRvbnMobGlzdCwgYnV0dG9uc0Rpdik7XG5cbiAgY29uc3QgaHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaHJcIik7XG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQoaHIpO1xuXG4gIGNvbnN0IHRhc2tTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgdGFza1NlY3Rpb24uY2xhc3NMaXN0LmFkZChcInRhc2stc2VjdGlvblwiKTtcbiAgbGlzdERpdi5hcHBlbmRDaGlsZCh0YXNrU2VjdGlvbik7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpIHtcbiAgT2JqZWN0LnZhbHVlcyhsaXN0LmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbnNEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHN0b3BSZW5kZXJpbmdMaXN0KGxpc3QpIHtcbiAgcmVtb3ZlRW50aXR5RGl2KGxpc3QpO1xufVxuXG5mdW5jdGlvbiByZXJlbmRlckxpc3QobGlzdERhdGEpIHtcbiAgc3RvcFJlbmRlcmluZ0xpc3QobGlzdERhdGEubGlzdCk7XG4gIHJlbmRlckxpc3QobGlzdERhdGEpO1xufVxuXG5QdWJTdWIub24oXCJEZWZhdWx0TGlzdFBlbmRpbmdcIiwgcmVuZGVyTGlzdCk7XG5QdWJTdWIub24oXCJMaXN0UmVnaXN0ZXJlZFwiLCByZW5kZXJMaXN0KTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgc3RvcFJlbmRlcmluZ0xpc3QpO1xuUHViU3ViLm9uKFwibGlzdFNob3VsZEJlUmVyZW5kZXJlZFwiLCByZXJlbmRlckxpc3QpO1xuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgVGFza0NyZWF0b3IgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1jcmVhdG9yXCI7XG5pbXBvcnQgeyBUYXNrUmVnaXN0cmFyIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVnaXN0cmFyXCI7XG5pbXBvcnQgeyBUYXNrUmVuZGVyZXIgfSBmcm9tIFwiLi4vdGFza01hbmFnZW1lbnQvdGFzay1yZW5kZXJlclwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2V0dXBUYXNrSGVscGVycyhsaXN0KSB7XG4gIGxpc3QudGFza0NyZWF0b3IgPSBuZXcgVGFza0NyZWF0b3IoKTtcbiAgbGlzdC50YXNrUmVnaXN0cmFyID0gbmV3IFRhc2tSZWdpc3RyYXIoKTtcbiAgbGlzdC50YXNrUmVuZGVyZXIgPSBuZXcgVGFza1JlbmRlcmVyKGxpc3QuZGl2KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVzdGFibGlzaE5ld1Rhc2sodGFza0RhdGEpIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrRGF0YS5wYXJlbnRMaXN0LCB0aGlzLmlkKSkge1xuICAgIGNvbnN0IHRhc2sgPSB0aGlzLnRhc2tDcmVhdG9yLmNyZWF0ZVRhc2sodGFza0RhdGEpO1xuICAgIHRoaXMudGFza1JlZ2lzdHJhci5yZWdpc3RlclRhc2sodGFzayk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVuZGVyVGFzayh0aGlzLmRpdiwgdGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVkaXRUYXNrKHRhc2tEYXRhKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFza0RhdGEucGF0aC5saXN0SWQsIHRoaXMuaWQpKSB7XG4gICAgY29uc3QgZWRpdGVkVGFzayA9IHRoaXMudGFza1JlZ2lzdHJhci5lZGl0VGFzayh0YXNrRGF0YSk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVyZW5kZXJUYXNrKHRoaXMuZGl2LCBlZGl0ZWRUYXNrKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFzay5wYXJlbnRMaXN0LCB0aGlzLmlkKSkge1xuICAgIHRoaXMudGFza1JlZ2lzdHJhci5kZWxldGVUYXNrKHRhc2spO1xuICAgIHRoaXMudGFza1JlbmRlcmVyLnN0b3BSZW5kZXJpbmdUYXNrKHRhc2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Rhc2sodGFzaykge1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2sucGFyZW50TGlzdCwgdGhpcy5pZCkpIHtcbiAgICB0aGlzLnRhc2tSZWdpc3RyYXIuc2V0VGFza0ZpbmlzaGVkKHsgdGFzaywgZmluaXNoZWQ6IHRydWUgfSk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVuZGVyVGFza0FzQ2hlY2tlZCh0YXNrLmRpdik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVuY2hlY2tUYXNrKHRhc2spIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLnNldFRhc2tGaW5pc2hlZCh7IHRhc2ssIGZpbmlzaGVkOiBmYWxzZSB9KTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5yZW5kZXJUYXNrQXNVbmNoZWNrZWQodGFzay5kaXYpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHRhc2tCZWxvbmdzVG9UaGlzTGlzdChsaXN0TmFtZVRhc2tJc0xvb2tpbmdGb3IsIGN1cnJlbnRMaXN0TmFtZSkge1xuICByZXR1cm4gbGlzdE5hbWVUYXNrSXNMb29raW5nRm9yID09IGN1cnJlbnRMaXN0TmFtZTtcbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBzZXR1cEJ1dHRvbiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcbmltcG9ydCAqIGFzIGxpc3RVdGlscyBmcm9tIFwiLi9saXN0LXV0aWxpdGllc1wiO1xuXG5leHBvcnQgY2xhc3MgTGlzdCB7XG4gIGlkID0gbnVsbDtcbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgYnV0dG9ucyA9IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGRhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSBkYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5jb2xvciA9IGRhdGEuY29sb3I7XG5cbiAgICB0aGlzLlNvcnRMaXN0QnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgICBcInNvcnRcIixcbiAgICAgIFwic29ydC1idXR0b25cIixcbiAgICAgIHRoaXMsXG4gICAgICBcIlNvcnRMaXN0QnV0dG9uXCJcbiAgICApO1xuICAgIHRoaXMuQWRkVGFza0J1dHRvbiA9IHNldHVwQnV0dG9uKFwiK1wiLCBcImFkZC1idXR0b25cIiwgdGhpcywgXCJBZGRUYXNrQnV0dG9uXCIpO1xuICAgIHRoaXMuQWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJPcGVuRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xuICAgICAgUHViU3ViLmVtaXQoXCJMaXN0SWRHZXRzUmV0dXJuZWRcIiwgdGhpcy5pZCk7XG4gICAgfSk7XG5cbiAgICBsaXN0VXRpbHMuc2V0dXBUYXNrSGVscGVycyh0aGlzKTtcbiAgICBQdWJTdWIub24oXCJUYXNrSXNSZWFkeUZvckNyZWF0aW9uXCIsIGxpc3RVdGlscy5lc3RhYmxpc2hOZXdUYXNrLmJpbmQodGhpcykpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tJc1JlYWR5Rm9yRWRpdGluZ1wiLCBsaXN0VXRpbHMuZWRpdFRhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFwiVXNlcldhbnRzVG9EZWxldGVUYXNrXCIsIGxpc3RVdGlscy5kZWxldGVUYXNrLmJpbmQodGhpcykpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tDaGVja2VkXCIsIGxpc3RVdGlscy5jaGVja1Rhc2suYmluZCh0aGlzKSk7XG4gICAgUHViU3ViLm9uKFwiVGFza1VuY2hlY2tlZFwiLCBsaXN0VXRpbHMudW5jaGVja1Rhc2suYmluZCh0aGlzKSk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFN1YnRhc2sgfSBmcm9tIFwiLi9zdWJ0YXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBTdWJ0YXNrQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVTdWJ0YXNrKCkge1xuICAgIHJldHVybiBuZXcgU3VidGFzaygpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU3VidGFza1JlZ2lzdHJhciB7XG4gIHN1YnRhc2tSZWdpc3RyeSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHBhcmVudERpdikge1xuICAgIHRoaXMucGFyZW50RGl2ID0gcGFyZW50RGl2O1xuICB9XG5cbiAgcmVnaXN0ZXJTdWJ0YXNrKHN1YnRhc2spIHtcbiAgICB0aGlzLnN1YnRhc2tSZWdpc3RyeS5wdXNoKHN1YnRhc2spO1xuICB9XG5cbiAgdXBkYXRlSWRzKCkge1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJ5LmZvckVhY2goKHN1YnRhc2ssIGluZGV4KSA9PiB7XG4gICAgICBzdWJ0YXNrLmlkID0gaW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBhcHBseURhdGEoKSB7XG4gICAgY29uc3QgcXVlcnlGb3JJbnB1dEVsZW1lbnRzID0gXCJpbnB1dDpub3QoW3R5cGU9J2NoZWNrYm94J10pXCI7XG4gICAgY29uc3QgaW5wdXRzID0gdGhpcy5wYXJlbnREaXYucXVlcnlTZWxlY3RvckFsbChxdWVyeUZvcklucHV0RWxlbWVudHMpO1xuXG4gICAgaW5wdXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdWJ0YXNrID0gdGhpcy5zdWJ0YXNrUmVnaXN0cnlbaW5kZXhdO1xuICAgICAgY29uc29sZS5sb2coc3VidGFzaywgc3VidGFzay5jb250ZW50LCBpdGVtLCBpdGVtLnZhbHVlKTtcbiAgICAgIHN1YnRhc2suY29udGVudCA9IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTdWJ0YXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJ0YXNrUmVnaXN0cnk7XG4gIH1cblxuICByZW1vdmVTdWJ0YXNrQnlJZChpZCkge1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJ5LnNwbGljZShpZCwgMSk7XG4gIH1cblxuICByZXNldFJlZ2lzdHJ5KCkge1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJ5ID0gW107XG4gIH1cblxuICBzZXRDaGVja2VkT3JPdGhlcndpc2Uoc3VidGFzaykge1xuICAgIGNvbnN0IGNoZWNrZWQgPSBzdWJ0YXNrLmZpbmlzaFN1YnRhc2tDaGVja2JveC5jaGVja2VkO1xuICAgIHN1YnRhc2suY2hlY2tlZCA9IGNoZWNrZWQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBTdWJ0YXNrUmVuZGVyZXIge1xuICBjb25zdHJ1Y3RvcihwYXJlbnREaXYpIHtcbiAgICB0aGlzLnBhcmVudERpdiA9IHBhcmVudERpdjtcbiAgfVxuXG4gIHJlbmRlclN1YnRhc2soc3VidGFzaykge1xuICAgIGNvbnN0IHN1YnRhc2tEaXYgPSBzdWJ0YXNrLmRpdjtcbiAgICBzdWJ0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJzdWJ0YXNrLWRpdlwiKTtcbiAgICB0aGlzLnBhcmVudERpdi5hcHBlbmRDaGlsZChzdWJ0YXNrRGl2KTtcblxuICAgIE9iamVjdC52YWx1ZXMoc3VidGFzay5idXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICAgIHN1YnRhc2tEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGNvbnRlbnRJbnB1dCA9IHN1YnRhc2suY29udGVudElucHV0O1xuICAgIGNvbnRlbnRJbnB1dC52YWx1ZSA9IHN1YnRhc2suY29udGVudDtcbiAgICBzdWJ0YXNrRGl2LmFwcGVuZENoaWxkKGNvbnRlbnRJbnB1dCk7XG5cbiAgICBjb25zdCBzdWJ0YXNrQ2hlY2tib3ggPSBzdWJ0YXNrLmZpbmlzaFN1YnRhc2tDaGVja2JveDtcbiAgICBzdWJ0YXNrRGl2LmFwcGVuZENoaWxkKHN1YnRhc2tDaGVja2JveCk7XG4gIH1cblxuICBzdG9wUmVuZGVyaW5nU3VidGFza3NJbm5lckVsZW1lbnRzKHN1YnRhc2tzUmVnaXN0cnkpIHtcbiAgICBzdWJ0YXNrc1JlZ2lzdHJ5LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0uZGl2LmlubmVySFRNTCA9IFwiXCI7XG4gICAgfSk7XG4gIH1cblxuICBzdG9wUmVuZGVyaW5nU3VidGFzayhzdWJ0YXNrRGl2KSB7XG4gICAgc3VidGFza0Rpdi5yZW1vdmUoKTtcbiAgfVxuXG4gIHJlbmRlckNoZWNrZWRPck90aGVyd2lzZShzdWJ0YXNrKSB7XG4gICAgaWYgKHN1YnRhc2suY2hlY2tlZCkge1xuICAgICAgc3VidGFzay5kaXYuY2xhc3NMaXN0LmFkZChcImNoZWNrZWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1YnRhc2suZGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJjaGVja2VkXCIpO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4vLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBzZXR1cEJ1dHRvbiB9IGZyb20gXCIuLy4uL3V0aWxpdGllc1wiO1xuXG5leHBvcnQgY2xhc3MgU3VidGFzayB7XG4gIGJ1dHRvbnMgPSB7fTtcbiAgX2NvbnRlbnQgPSBcIlwiO1xuICBjaGVja2VkID0gZmFsc2U7XG4gIGlkID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgdGhpcy5kaXYuY2xhc3NMaXN0LmFkZChcInVuY2hlY2tlZFwiKTtcblxuICAgIHRoaXMuY29udGVudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRoaXMuY29udGVudElucHV0LmNsYXNzTGlzdC5hZGQoXCJzdWJ0YXNrLWNvbnRlbnRcIik7XG5cbiAgICB0aGlzLmZpbmlzaFN1YnRhc2tDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLmZpbmlzaFN1YnRhc2tDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5maW5pc2hTdWJ0YXNrQ2hlY2tib3guY2xhc3NMaXN0LmFkZChcImZpbmlzaC1jaGVja2JveFwiKTtcbiAgICB0aGlzLmZpbmlzaFN1YnRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0NoZWNrU3VidGFza1wiLCB0aGlzKTtcbiAgICB9KTtcblxuICAgIHRoaXMucmVtb3ZlU3VidGFza0J1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJ4XCIsXG4gICAgICBcInJlbW92ZS1idXR0b25cIixcbiAgICAgIHRoaXMsXG4gICAgICBcInJlbW92ZVN1YnRhc2tCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5yZW1vdmVTdWJ0YXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvUmVtb3ZlU3VidGFza1wiLCB0aGlzKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBjb250ZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9jb250ZW50O1xuICB9XG5cbiAgc2V0IGNvbnRlbnQodmFsdWUpIHtcbiAgICB0aGlzLl9jb250ZW50ID0gdmFsdWU7XG4gIH1cbn1cbiIsImltcG9ydCB7IFRhc2sgfSBmcm9tIFwiLi90YXNrXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrQ3JlYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBjcmVhdGVUYXNrKHRhc2tEYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBUYXNrKHRhc2tEYXRhKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFRhc2tSZWdpc3RyYXIge1xuICBUQVNLX1JFR0lTVFJZID0gW107XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHJlZ2lzdGVyVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnB1c2godGFzayk7XG4gICAgdGFzay5pZCA9IHRoaXMuVEFTS19SRUdJU1RSWS5sZW5ndGggLSAxO1xuICB9XG5cbiAgdXBkYXRlSWRzKCkge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgdGFzay5pZCA9IGluZGV4O1xuICAgIH0pO1xuICB9XG5cbiAgZWRpdFRhc2sodGFza0RhdGEpIHtcbiAgICBjb25zdCBlZGl0YWJsZVRhc2sgPSB0aGlzLlRBU0tfUkVHSVNUUllbdGFza0RhdGEucGF0aC50YXNrSWRdO1xuICAgIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKHRhc2tEYXRhLmRhdGEpKSB7XG4gICAgICBlZGl0YWJsZVRhc2tba2V5XSA9IHZhbHVlO1xuICAgIH1cbiAgICByZXR1cm4gZWRpdGFibGVUYXNrO1xuICB9XG5cbiAgc2V0VGFza0ZpbmlzaGVkKGRhdGEpIHtcbiAgICBkYXRhLnRhc2suZmluaXNoZWQgPSBkYXRhLmZpbmlzaGVkO1xuICB9XG5cbiAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgdGhpcy5UQVNLX1JFR0lTVFJZLnNwbGljZSh0YXNrLmlkLCAxKTtcbiAgICB0aGlzLnVwZGF0ZUlkcygpO1xuICB9XG59XG4iLCJpbXBvcnQgaXNQYXN0IGZyb20gXCJkYXRlLWZucy9pc1Bhc3RcIjtcbmltcG9ydCBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0IGZyb20gXCJkYXRlLWZucy9mb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0XCI7XG5pbXBvcnQgeyBhcHBlbmRFbnRpdHksIHJlbW92ZUVudGl0eURpdiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2tSZW5kZXJlciB7XG4gIGNvbnN0cnVjdCgpIHt9XG5cbiAgcmVuZGVyVGFzayhwYXJlbnRMaXN0RGl2LCB0YXNrKSB7XG4gICAgY29uc3QgcGFyZW50TGlzdFRhc2tTZWN0aW9uID0gcGFyZW50TGlzdERpdi5xdWVyeVNlbGVjdG9yKFwiLnRhc2stc2VjdGlvblwiKTtcblxuICAgIGNvbnN0IHRhc2tEaXYgPSB0YXNrLmRpdjtcbiAgICB0YXNrRGl2LmNsYXNzTGlzdC5hZGQoXCJ0YXNrXCIpO1xuICAgIGFwcGVuZEVudGl0eShwYXJlbnRMaXN0VGFza1NlY3Rpb24sIFwidGFza1wiLCB0YXNrLCB0YXNrRGl2KTtcblxuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFzay5maW5pc2hUYXNrQ2hlY2tib3gpO1xuXG4gICAgY29uc3QgdGFza05hbWVUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza05hbWVUZXh0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW5hbWVcIik7XG4gICAgdGFza05hbWVUZXh0LnRleHRDb250ZW50ID0gdGFzay5uYW1lO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza05hbWVUZXh0KTtcblxuICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgdGFza0R1ZURhdGUuY2xhc3NMaXN0LmFkZChcImR1ZS1kYXRlXCIpO1xuICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdCh0YXNrLmR1ZURhdGUpO1xuICAgIHNldHVwUG9zdHBvbmVkQ2xhc3ModGFzay5kdWVEYXRlLCB0YXNrRHVlRGF0ZSk7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG5cbiAgICBjb25zdCBidXR0b25zRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBidXR0b25zRGl2LmNsYXNzTGlzdC5hZGQoXCJidXR0b25zLXJvd1wiKTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xuXG4gICAgdGhpcy5yZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKTtcbiAgICB0aGlzLnJlbmRlclRhc2tBc1VuY2hlY2tlZCh0YXNrRGl2KTtcbiAgfVxuXG4gIHJlbmRlclRhc2tCdXR0b25zKGJ1dHRvbnNEaXYsIHRhc2spIHtcbiAgICBPYmplY3QudmFsdWVzKHRhc2suYnV0dG9ucykuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgfSk7XG4gIH1cblxuICByZXJlbmRlclRhc2socGFyZW50TGlzdERpdiwgdGFzaykge1xuICAgIHRoaXMuc3RvcFJlbmRlcmluZ1Rhc2sodGFzayk7XG4gICAgdGhpcy5yZW5kZXJUYXNrKHBhcmVudExpc3REaXYsIHRhc2spO1xuICB9XG5cbiAgcmVuZGVyVGFza0FzQ2hlY2tlZCh0YXNrRGl2KSB7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwiY2hlY2tlZFwiKTtcbiAgfVxuXG4gIHJlbmRlclRhc2tBc1VuY2hlY2tlZCh0YXNrRGl2KSB7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZFwiKTtcbiAgfVxuXG4gIHN0b3BSZW5kZXJpbmdUYXNrKHRhc2spIHtcbiAgICByZW1vdmVFbnRpdHlEaXYodGFzayk7XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0dXBQb3N0cG9uZWRDbGFzcyhkdWVEYXRlVmFsdWUsIHRhc2tEdWVEYXRlRWxlbWVudCkge1xuICBpZiAoaXNQb3N0cG9uZWQoZHVlRGF0ZVZhbHVlKSkge1xuICAgIHRhc2tEdWVEYXRlRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwicG9zdHBvbmVkXCIpO1xuICB9IGVsc2Uge1xuICAgIHRhc2tEdWVEYXRlRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwicG9zdHBvbmVkXCIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGlzUG9zdHBvbmVkKGR1ZURhdGVWYWx1ZSkge1xuICByZXR1cm4gaXNQYXN0KGR1ZURhdGVWYWx1ZSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2V0dXBEdWVEYXRlKGR1ZURhdGVTdHJpbmcpIHtcbiAgaWYgKGR1ZURhdGVTdHJpbmcpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoZHVlRGF0ZVN0cmluZyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKCk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBzZXR1cEJ1dHRvbiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcbmltcG9ydCB7IHNldHVwRHVlRGF0ZSB9IGZyb20gXCIuL3Rhc2stdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrIHtcbiAgaWQgPSBudWxsO1xuICBmaW5pc2hlZCA9IGZhbHNlO1xuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBidXR0b25zID0ge307XG5cbiAgY29uc3RydWN0b3IodGFza0RhdGEpIHtcbiAgICB0aGlzLm5hbWUgPSB0YXNrRGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb24gPSB0YXNrRGF0YS5kZXNjcmlwdGlvbjtcbiAgICB0aGlzLl9kdWVEYXRlID0gc2V0dXBEdWVEYXRlKHRhc2tEYXRhLmR1ZURhdGUpO1xuICAgIHRoaXMuc3VidGFza3MgPSB0YXNrRGF0YS5zdWJ0YXNrcztcbiAgICB0aGlzLnByaW9yaXR5ID0gdGFza0RhdGEucHJpb3JpdHk7XG4gICAgdGhpcy5wYXJlbnRMaXN0ID0gdGFza0RhdGEucGFyZW50TGlzdDtcblxuICAgIHRoaXMuZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRhc2tcIikgfHwgZS50YXJnZXQubm9kZU5hbWUgPT09IFwiUFwiKSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVXNlcldhbnRzVG9FZGl0VGFza1wiLCB7XG4gICAgICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuVGFzayxcbiAgICAgICAgICBlbnRpdHk6IHRoaXMsXG4gICAgICAgIH0pO1xuICAgICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XG4gICAgdGhpcy5maW5pc2hUYXNrQ2hlY2tib3guY2xhc3NMaXN0LmFkZChcImZpbmlzaC1jaGVja2JveFwiKTtcbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJUYXNrQ2hlY2tlZFwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVGFza1VuY2hlY2tlZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuRWRpdFRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwiZWRpdFwiLFxuICAgICAgXCJlZGl0LWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiRWRpdFRhc2tCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHtcbiAgICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuVGFzayxcbiAgICAgICAgZW50aXR5OiB0aGlzLFxuICAgICAgfSk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgfSk7XG5cbiAgICB0aGlzLkRlbGV0ZVRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwieFwiLFxuICAgICAgXCJkZWxldGUtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJEZWxldGVUYXNrQnV0dG9uXCJcbiAgICApO1xuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIiwgdGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEaXYoKSB7XG4gICAgdGhpcy5kaXYucmVtb3ZlKCk7XG4gICAgdGhpcy5kaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgZ2V0IGR1ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2R1ZURhdGU7XG4gIH1cblxuICBzZXQgZHVlRGF0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2R1ZURhdGUgPSBzZXR1cER1ZURhdGUodmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JtT3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1vcGVuLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1PcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1DbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1jbG9zZS1idXR0b25cIlxuKTtcbmxpc3RGb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluaXNoLWxpc3QtYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0YXNrRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwidGFzay1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xudGFza0Zvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5pc2gtdGFzay1idXR0b25cIik7XG5maW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG59KTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzZXR1cEJ1dHRvbihuYW1lLCBjbGFzc05hbWUsIHBhcmVudCwgYnV0dG9uQXJyYXlOYW1lKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IG5hbWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiYnV0dG9uXCIpO1xuICBwYXJlbnQuYnV0dG9uc1tidXR0b25BcnJheU5hbWVdID0gYnV0dG9uO1xuICByZXR1cm4gYnV0dG9uO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlRW50aXR5RGl2KGVudGl0eSkge1xuICBlbnRpdHkuZGl2LnJlbW92ZSgpO1xuICBlbnRpdHkuZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGFwcGVuZEVudGl0eShwYXJlbnQsIGNsYXNzTmFtZSwgZW50aXR5LCBlbnRpdHlEaXYpIHtcbiAgY29uc3Qgc2libGluZ0VudGl0eVRvUHV0QWZ0ZXIgPVxuICAgIHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSlbZW50aXR5LmlkIC0gMV07XG4gIGlmIChzaWJsaW5nRW50aXR5VG9QdXRBZnRlcikge1xuICAgIGluc2VydEFmdGVyKHNpYmxpbmdFbnRpdHlUb1B1dEFmdGVyLCBlbnRpdHlEaXYpO1xuICB9IGVsc2Uge1xuICAgIHBhcmVudC5wcmVwZW5kKGVudGl0eURpdik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIobm9kZVRvUHV0QWZ0ZXIsIG5ld05vZGUpIHtcbiAgbm9kZVRvUHV0QWZ0ZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3Tm9kZSwgbm9kZVRvUHV0QWZ0ZXIubmV4dFNpYmxpbmcpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi8uLi9jc3Mvc3R5bGVzLmNzc1wiO1xuaW1wb3J0IFwiLi91bmlxdWUtYnV0dG9uLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgXCIuL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlXCI7XG5pbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcblxuUHViU3ViLmVtaXQoXCJDcmVhdGVEZWZhdWx0TGlzdFwiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==