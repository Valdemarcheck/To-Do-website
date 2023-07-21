/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ "./node_modules/date-fns/esm/_lib/assign/index.js":
      /*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/assign/index.js ***!
  \********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ assign,
          /* harmony export */
        });
        function assign(target, object) {
          if (target == null) {
            throw new TypeError(
              "assign requires that input parameter not be null or undefined"
            );
          }
          for (var property in object) {
            if (Object.prototype.hasOwnProperty.call(object, property)) {
              target[property] = object[property];
            }
          }
          return target;
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/_lib/cloneObject/index.js":
      /*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/cloneObject/index.js ***!
  \*************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ cloneObject,
          /* harmony export */
        });
        /* harmony import */ var _assign_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../assign/index.js */ "./node_modules/date-fns/esm/_lib/assign/index.js"
          );

        function cloneObject(object) {
          return (0, _assign_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
            {},
            object
          );
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js":
      /*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultLocale/index.js ***!
  \***************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../../locale/en-US/index.js */ "./node_modules/date-fns/esm/locale/en-US/index.js"
          );

        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_0__["default"];

        /***/
      },

    /***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
      /*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getDefaultOptions: () =>
            /* binding */ getDefaultOptions,
          /* harmony export */ setDefaultOptions: () =>
            /* binding */ setDefaultOptions,
          /* harmony export */
        });
        var defaultOptions = {};
        function getDefaultOptions() {
          return defaultOptions;
        }
        function setDefaultOptions(newOptions) {
          defaultOptions = newOptions;
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
      /*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () =>
            /* binding */ getTimezoneOffsetInMilliseconds,
          /* harmony export */
        });
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
          var utcDate = new Date(
            Date.UTC(
              date.getFullYear(),
              date.getMonth(),
              date.getDate(),
              date.getHours(),
              date.getMinutes(),
              date.getSeconds(),
              date.getMilliseconds()
            )
          );
          utcDate.setUTCFullYear(date.getFullYear());
          return date.getTime() - utcDate.getTime();
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
      /*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ requiredArgs,
          /* harmony export */
        });
        function requiredArgs(required, args) {
          if (args.length < required) {
            throw new TypeError(
              required +
                " argument" +
                (required > 1 ? "s" : "") +
                " required, but only " +
                args.length +
                " present"
            );
          }
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/compareAsc/index.js":
      /*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/compareAsc/index.js ***!
  \*******************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ compareAsc,
          /* harmony export */
        });
        /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js"
          );
        /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js"
          );

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
          (0,
          _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
            2,
            arguments
          );
          var dateLeft = (0,
          _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
            dirtyDateLeft
          );
          var dateRight = (0,
          _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
            dirtyDateRight
          );
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

        /***/
      },

    /***/ "./node_modules/date-fns/esm/formatDistanceStrict/index.js":
      /*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/formatDistanceStrict/index.js ***!
  \*****************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () =>
            /* binding */ formatDistanceStrict,
          /* harmony export */
        });
        /* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js"
          );
        /* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__ =
          __webpack_require__(
            /*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js"
          );
        /* harmony import */ var _compareAsc_index_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ../compareAsc/index.js */ "./node_modules/date-fns/esm/compareAsc/index.js"
          );
        /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__ =
          __webpack_require__(
            /*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js"
          );
        /* harmony import */ var _lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_5__ =
          __webpack_require__(
            /*! ../_lib/cloneObject/index.js */ "./node_modules/date-fns/esm/_lib/cloneObject/index.js"
          );
        /* harmony import */ var _lib_assign_index_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ../_lib/assign/index.js */ "./node_modules/date-fns/esm/_lib/assign/index.js"
          );
        /* harmony import */ var _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../_lib/defaultLocale/index.js */ "./node_modules/date-fns/esm/_lib/defaultLocale/index.js"
          );
        /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js"
          );

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
          (0,
          _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
            2,
            arguments
          );
          var defaultOptions = (0,
          _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
          var locale =
            (_ref =
              (_options$locale =
                options === null || options === void 0
                  ? void 0
                  : options.locale) !== null && _options$locale !== void 0
                ? _options$locale
                : defaultOptions.locale) !== null && _ref !== void 0
              ? _ref
              : _lib_defaultLocale_index_js__WEBPACK_IMPORTED_MODULE_2__[
                  "default"
                ];
          if (!locale.formatDistance) {
            throw new RangeError(
              "locale must contain localize.formatDistance property"
            );
          }
          var comparison = (0,
          _compareAsc_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
            dirtyDate,
            dirtyBaseDate
          );
          if (isNaN(comparison)) {
            throw new RangeError("Invalid time value");
          }
          var localizeOptions = (0,
          _lib_assign_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(
            (0,
            _lib_cloneObject_index_js__WEBPACK_IMPORTED_MODULE_5__["default"])(
              options
            ),
            {
              addSuffix: Boolean(
                options === null || options === void 0
                  ? void 0
                  : options.addSuffix
              ),
              comparison: comparison,
            }
          );
          var dateLeft;
          var dateRight;
          if (comparison > 0) {
            dateLeft = (0,
            _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(
              dirtyBaseDate
            );
            dateRight = (0,
            _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(
              dirtyDate
            );
          } else {
            dateLeft = (0,
            _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(
              dirtyDate
            );
            dateRight = (0,
            _toDate_index_js__WEBPACK_IMPORTED_MODULE_6__["default"])(
              dirtyBaseDate
            );
          }
          var roundingMethod = String(
            (_options$roundingMeth =
              options === null || options === void 0
                ? void 0
                : options.roundingMethod) !== null &&
              _options$roundingMeth !== void 0
              ? _options$roundingMeth
              : "round"
          );
          var roundingMethodFn;
          if (roundingMethod === "floor") {
            roundingMethodFn = Math.floor;
          } else if (roundingMethod === "ceil") {
            roundingMethodFn = Math.ceil;
          } else if (roundingMethod === "round") {
            roundingMethodFn = Math.round;
          } else {
            throw new RangeError(
              "roundingMethod must be 'floor', 'ceil' or 'round'"
            );
          }
          var milliseconds = dateRight.getTime() - dateLeft.getTime();
          var minutes = milliseconds / MILLISECONDS_IN_MINUTE;
          var timezoneOffset =
            (0,
            _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__[
              "default"
            ])(dateRight) -
            (0,
            _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_7__[
              "default"
            ])(dateLeft);

          // Use DST-normalized difference in minutes for years, months and days;
          // use regular difference in minutes for hours, minutes and seconds.
          var dstNormalizedMinutes =
            (milliseconds - timezoneOffset) / MILLISECONDS_IN_MINUTE;
          var defaultUnit =
            options === null || options === void 0 ? void 0 : options.unit;
          var unit;
          if (!defaultUnit) {
            if (minutes < 1) {
              unit = "second";
            } else if (minutes < 60) {
              unit = "minute";
            } else if (minutes < MINUTES_IN_DAY) {
              unit = "hour";
            } else if (dstNormalizedMinutes < MINUTES_IN_MONTH) {
              unit = "day";
            } else if (dstNormalizedMinutes < MINUTES_IN_YEAR) {
              unit = "month";
            } else {
              unit = "year";
            }
          } else {
            unit = String(defaultUnit);
          }

          // 0 up to 60 seconds
          if (unit === "second") {
            var seconds = roundingMethodFn(milliseconds / 1000);
            return locale.formatDistance("xSeconds", seconds, localizeOptions);

            // 1 up to 60 mins
          } else if (unit === "minute") {
            var roundedMinutes = roundingMethodFn(minutes);
            return locale.formatDistance(
              "xMinutes",
              roundedMinutes,
              localizeOptions
            );

            // 1 up to 24 hours
          } else if (unit === "hour") {
            var hours = roundingMethodFn(minutes / 60);
            return locale.formatDistance("xHours", hours, localizeOptions);

            // 1 up to 30 days
          } else if (unit === "day") {
            var days = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_DAY);
            return locale.formatDistance("xDays", days, localizeOptions);

            // 1 up to 12 months
          } else if (unit === "month") {
            var months = roundingMethodFn(
              dstNormalizedMinutes / MINUTES_IN_MONTH
            );
            return months === 12 && defaultUnit !== "month"
              ? locale.formatDistance("xYears", 1, localizeOptions)
              : locale.formatDistance("xMonths", months, localizeOptions);

            // 1 year up to max Date
          } else if (unit === "year") {
            var years = roundingMethodFn(
              dstNormalizedMinutes / MINUTES_IN_YEAR
            );
            return locale.formatDistance("xYears", years, localizeOptions);
          }
          throw new RangeError(
            "unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'"
          );
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js":
      /*!**********************************************************************!*\
  !*** ./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js ***!
  \**********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () =>
            /* binding */ formatDistanceToNowStrict,
          /* harmony export */
        });
        /* harmony import */ var _formatDistanceStrict_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../formatDistanceStrict/index.js */ "./node_modules/date-fns/esm/formatDistanceStrict/index.js"
          );
        /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js"
          );

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
          (0,
          _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
            1,
            arguments
          );
          return (0,
          _formatDistanceStrict_index_js__WEBPACK_IMPORTED_MODULE_1__[
            "default"
          ])(dirtyDate, Date.now(), options);
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/isPast/index.js":
      /*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/isPast/index.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ isPast,
          /* harmony export */
        });
        /* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js"
          );
        /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js"
          );

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
          (0,
          _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
            1,
            arguments
          );
          return (
            (0, _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
              dirtyDate
            ).getTime() < Date.now()
          );
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
      /*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ buildFormatLongFn,
          /* harmony export */
        });
        function buildFormatLongFn(args) {
          return function () {
            var options =
              arguments.length > 0 && arguments[0] !== undefined
                ? arguments[0]
                : {};
            // TODO: Remove String()
            var width = options.width
              ? String(options.width)
              : args.defaultWidth;
            var format = args.formats[width] || args.formats[args.defaultWidth];
            return format;
          };
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
      /*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ buildLocalizeFn,
          /* harmony export */
        });
        function buildLocalizeFn(args) {
          return function (dirtyIndex, options) {
            var context =
              options !== null && options !== void 0 && options.context
                ? String(options.context)
                : "standalone";
            var valuesArray;
            if (context === "formatting" && args.formattingValues) {
              var defaultWidth =
                args.defaultFormattingWidth || args.defaultWidth;
              var width =
                options !== null && options !== void 0 && options.width
                  ? String(options.width)
                  : defaultWidth;
              valuesArray =
                args.formattingValues[width] ||
                args.formattingValues[defaultWidth];
            } else {
              var _defaultWidth = args.defaultWidth;
              var _width =
                options !== null && options !== void 0 && options.width
                  ? String(options.width)
                  : args.defaultWidth;
              valuesArray = args.values[_width] || args.values[_defaultWidth];
            }
            var index = args.argumentCallback
              ? args.argumentCallback(dirtyIndex)
              : dirtyIndex;
            // @ts-ignore: For some reason TypeScript just don't want to match it, no matter how hard we try. I challenge you to try to remove it!
            return valuesArray[index];
          };
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
      /*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ buildMatchFn,
          /* harmony export */
        });
        function buildMatchFn(args) {
          return function (string) {
            var options =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            var width = options.width;
            var matchPattern =
              (width && args.matchPatterns[width]) ||
              args.matchPatterns[args.defaultMatchWidth];
            var matchResult = string.match(matchPattern);
            if (!matchResult) {
              return null;
            }
            var matchedString = matchResult[0];
            var parsePatterns =
              (width && args.parsePatterns[width]) ||
              args.parsePatterns[args.defaultParseWidth];
            var key = Array.isArray(parsePatterns)
              ? findIndex(parsePatterns, function (pattern) {
                  return pattern.test(matchedString);
                })
              : findKey(parsePatterns, function (pattern) {
                  return pattern.test(matchedString);
                });
            var value;
            value = args.valueCallback ? args.valueCallback(key) : key;
            value = options.valueCallback
              ? options.valueCallback(value)
              : value;
            var rest = string.slice(matchedString.length);
            return {
              value: value,
              rest: rest,
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

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
      /*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ buildMatchPatternFn,
          /* harmony export */
        });
        function buildMatchPatternFn(args) {
          return function (string) {
            var options =
              arguments.length > 1 && arguments[1] !== undefined
                ? arguments[1]
                : {};
            var matchResult = string.match(args.matchPattern);
            if (!matchResult) return null;
            var matchedString = matchResult[0];
            var parseResult = string.match(args.parsePattern);
            if (!parseResult) return null;
            var value = args.valueCallback
              ? args.valueCallback(parseResult[0])
              : parseResult[0];
            value = options.valueCallback
              ? options.valueCallback(value)
              : value;
            var rest = string.slice(matchedString.length);
            return {
              value: value,
              rest: rest,
            };
          };
        }

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
      /*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        var formatDistanceLocale = {
          lessThanXSeconds: {
            one: "less than a second",
            other: "less than {{count}} seconds",
          },
          xSeconds: {
            one: "1 second",
            other: "{{count}} seconds",
          },
          halfAMinute: "half a minute",
          lessThanXMinutes: {
            one: "less than a minute",
            other: "less than {{count}} minutes",
          },
          xMinutes: {
            one: "1 minute",
            other: "{{count}} minutes",
          },
          aboutXHours: {
            one: "about 1 hour",
            other: "about {{count}} hours",
          },
          xHours: {
            one: "1 hour",
            other: "{{count}} hours",
          },
          xDays: {
            one: "1 day",
            other: "{{count}} days",
          },
          aboutXWeeks: {
            one: "about 1 week",
            other: "about {{count}} weeks",
          },
          xWeeks: {
            one: "1 week",
            other: "{{count}} weeks",
          },
          aboutXMonths: {
            one: "about 1 month",
            other: "about {{count}} months",
          },
          xMonths: {
            one: "1 month",
            other: "{{count}} months",
          },
          aboutXYears: {
            one: "about 1 year",
            other: "about {{count}} years",
          },
          xYears: {
            one: "1 year",
            other: "{{count}} years",
          },
          overXYears: {
            one: "over 1 year",
            other: "over {{count}} years",
          },
          almostXYears: {
            one: "almost 1 year",
            other: "almost {{count}} years",
          },
        };
        var formatDistance = function formatDistance(token, count, options) {
          var result;
          var tokenValue = formatDistanceLocale[token];
          if (typeof tokenValue === "string") {
            result = tokenValue;
          } else if (count === 1) {
            result = tokenValue.one;
          } else {
            result = tokenValue.other.replace("{{count}}", count.toString());
          }
          if (options !== null && options !== void 0 && options.addSuffix) {
            if (options.comparison && options.comparison > 0) {
              return "in " + result;
            } else {
              return result + " ago";
            }
          }
          return result;
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          formatDistance;

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
      /*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../../../_lib/buildFormatLongFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js"
          );

        var dateFormats = {
          full: "EEEE, MMMM do, y",
          long: "MMMM do, y",
          medium: "MMM d, y",
          short: "MM/dd/yyyy",
        };
        var timeFormats = {
          full: "h:mm:ss a zzzz",
          long: "h:mm:ss a z",
          medium: "h:mm:ss a",
          short: "h:mm a",
        };
        var dateTimeFormats = {
          full: "{{date}} 'at' {{time}}",
          long: "{{date}} 'at' {{time}}",
          medium: "{{date}}, {{time}}",
          short: "{{date}}, {{time}}",
        };
        var formatLong = {
          date: (0,
          _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            formats: dateFormats,
            defaultWidth: "full",
          }),
          time: (0,
          _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            formats: timeFormats,
            defaultWidth: "full",
          }),
          dateTime: (0,
          _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            formats: dateTimeFormats,
            defaultWidth: "full",
          }),
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          formatLong;

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
      /*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        var formatRelativeLocale = {
          lastWeek: "'last' eeee 'at' p",
          yesterday: "'yesterday at' p",
          today: "'today at' p",
          tomorrow: "'tomorrow at' p",
          nextWeek: "eeee 'at' p",
          other: "P",
        };
        var formatRelative = function formatRelative(
          token,
          _date,
          _baseDate,
          _options
        ) {
          return formatRelativeLocale[token];
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          formatRelative;

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
      /*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../../../_lib/buildLocalizeFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js"
          );

        var eraValues = {
          narrow: ["B", "A"],
          abbreviated: ["BC", "AD"],
          wide: ["Before Christ", "Anno Domini"],
        };
        var quarterValues = {
          narrow: ["1", "2", "3", "4"],
          abbreviated: ["Q1", "Q2", "Q3", "Q4"],
          wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"],
        };

        // Note: in English, the names of days of the week and months are capitalized.
        // If you are making a new locale based on this one, check if the same is true for the language you're working on.
        // Generally, formatted dates should look like they are in the middle of a sentence,
        // e.g. in Spanish language the weekdays and months should be in the lowercase.
        var monthValues = {
          narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
          abbreviated: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          wide: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ],
        };
        var dayValues = {
          narrow: ["S", "M", "T", "W", "T", "F", "S"],
          short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
          abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
          wide: [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
        };
        var dayPeriodValues = {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "morning",
            afternoon: "afternoon",
            evening: "evening",
            night: "night",
          },
        };
        var formattingDayPeriodValues = {
          narrow: {
            am: "a",
            pm: "p",
            midnight: "mi",
            noon: "n",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          abbreviated: {
            am: "AM",
            pm: "PM",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
          wide: {
            am: "a.m.",
            pm: "p.m.",
            midnight: "midnight",
            noon: "noon",
            morning: "in the morning",
            afternoon: "in the afternoon",
            evening: "in the evening",
            night: "at night",
          },
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
                return number + "st";
              case 2:
                return number + "nd";
              case 3:
                return number + "rd";
            }
          }
          return number + "th";
        };
        var localize = {
          ordinalNumber: ordinalNumber,
          era: (0,
          _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            values: eraValues,
            defaultWidth: "wide",
          }),
          quarter: (0,
          _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            values: quarterValues,
            defaultWidth: "wide",
            argumentCallback: function argumentCallback(quarter) {
              return quarter - 1;
            },
          }),
          month: (0,
          _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            values: monthValues,
            defaultWidth: "wide",
          }),
          day: (0,
          _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            values: dayValues,
            defaultWidth: "wide",
          }),
          dayPeriod: (0,
          _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            values: dayPeriodValues,
            defaultWidth: "wide",
            formattingValues: formattingDayPeriodValues,
            defaultFormattingWidth: "wide",
          }),
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
          localize;

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
      /*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../../../_lib/buildMatchFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js"
          );
        /* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../../../_lib/buildMatchPatternFn/index.js */ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js"
          );

        var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
        var parseOrdinalNumberPattern = /\d+/i;
        var matchEraPatterns = {
          narrow: /^(b|a)/i,
          abbreviated:
            /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
          wide: /^(before christ|before common era|anno domini|common era)/i,
        };
        var parseEraPatterns = {
          any: [/^b/i, /^(a|c)/i],
        };
        var matchQuarterPatterns = {
          narrow: /^[1234]/i,
          abbreviated: /^q[1234]/i,
          wide: /^[1234](th|st|nd|rd)? quarter/i,
        };
        var parseQuarterPatterns = {
          any: [/1/i, /2/i, /3/i, /4/i],
        };
        var matchMonthPatterns = {
          narrow: /^[jfmasond]/i,
          abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
          wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i,
        };
        var parseMonthPatterns = {
          narrow: [
            /^j/i,
            /^f/i,
            /^m/i,
            /^a/i,
            /^m/i,
            /^j/i,
            /^j/i,
            /^a/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
          any: [
            /^ja/i,
            /^f/i,
            /^mar/i,
            /^ap/i,
            /^may/i,
            /^jun/i,
            /^jul/i,
            /^au/i,
            /^s/i,
            /^o/i,
            /^n/i,
            /^d/i,
          ],
        };
        var matchDayPatterns = {
          narrow: /^[smtwf]/i,
          short: /^(su|mo|tu|we|th|fr|sa)/i,
          abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
          wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i,
        };
        var parseDayPatterns = {
          narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
          any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i],
        };
        var matchDayPeriodPatterns = {
          narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
          any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i,
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
            night: /night/i,
          },
        };
        var match = {
          ordinalNumber: (0,
          _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__[
            "default"
          ])({
            matchPattern: matchOrdinalNumberPattern,
            parsePattern: parseOrdinalNumberPattern,
            valueCallback: function valueCallback(value) {
              return parseInt(value, 10);
            },
          }),
          era: (0,
          _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            matchPatterns: matchEraPatterns,
            defaultMatchWidth: "wide",
            parsePatterns: parseEraPatterns,
            defaultParseWidth: "any",
          }),
          quarter: (0,
          _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            matchPatterns: matchQuarterPatterns,
            defaultMatchWidth: "wide",
            parsePatterns: parseQuarterPatterns,
            defaultParseWidth: "any",
            valueCallback: function valueCallback(index) {
              return index + 1;
            },
          }),
          month: (0,
          _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            matchPatterns: matchMonthPatterns,
            defaultMatchWidth: "wide",
            parsePatterns: parseMonthPatterns,
            defaultParseWidth: "any",
          }),
          day: (0,
          _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            matchPatterns: matchDayPatterns,
            defaultMatchWidth: "wide",
            parsePatterns: parseDayPatterns,
            defaultParseWidth: "any",
          }),
          dayPeriod: (0,
          _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])({
            matchPatterns: matchDayPeriodPatterns,
            defaultMatchWidth: "any",
            parsePatterns: parseDayPeriodPatterns,
            defaultParseWidth: "any",
          }),
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = match;

        /***/
      },

    /***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
      /*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
          /* harmony export */
        });
        /* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./_lib/formatDistance/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js"
          );
        /* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./_lib/formatLong/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js"
          );
        /* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./_lib/formatRelative/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js"
          );
        /* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./_lib/localize/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js"
          );
        /* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ =
          __webpack_require__(
            /*! ./_lib/match/index.js */ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js"
          );

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
          code: "en-US",
          formatDistance:
            _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__[
              "default"
            ],
          formatLong:
            _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__["default"],
          formatRelative:
            _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__[
              "default"
            ],
          localize:
            _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__["default"],
          match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__["default"],
          options: {
            weekStartsOn: 0 /* Sunday */,
            firstWeekContainsDate: 1,
          },
        };
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = locale;

        /***/
      },

    /***/ "./node_modules/date-fns/esm/toDate/index.js":
      /*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ toDate,
          /* harmony export */
        });
        /* harmony import */ var _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! @babel/runtime/helpers/esm/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js"
          );
        /* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js"
          );

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
          (0,
          _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(
            1,
            arguments
          );
          var argStr = Object.prototype.toString.call(argument);

          // Clone the date
          if (
            argument instanceof Date ||
            ((0,
            _babel_runtime_helpers_esm_typeof__WEBPACK_IMPORTED_MODULE_0__[
              "default"
            ])(argument) === "object" &&
              argStr === "[object Date]")
          ) {
            // Prevent the date to lose the milliseconds when passed to new Date() in IE10
            return new Date(argument.getTime());
          } else if (
            typeof argument === "number" ||
            argStr === "[object Number]"
          ) {
            return new Date(argument);
          } else {
            if (
              (typeof argument === "string" || argStr === "[object String]") &&
              typeof console !== "undefined"
            ) {
              // eslint-disable-next-line no-console
              console.warn(
                "Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"
              );
              // eslint-disable-next-line no-console
              console.warn(new Error().stack);
            }
            return new Date(NaN);
          }
        }

        /***/
      },

    /***/ "./src/PubSub.js":
      /*!***********************!*\
  !*** ./src/PubSub.js ***!
  \***********************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ PubSub: () => /* binding */ PubSub,
          /* harmony export */
        });
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

        /***/
      },

    /***/ "./src/formManagement/form-manager.js":
      /*!********************************************!*\
  !*** ./src/formManagement/form-manager.js ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ FORM_REGISTRY: () => /* binding */ FORM_REGISTRY,
          /* harmony export */
        });
        /* harmony import */ var _form_utilities__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./form-utilities */ "./src/formManagement/form-utilities.js"
          );
        /* harmony import */ var _managers_subtask_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./managers/subtask-manager */ "./src/formManagement/managers/subtask-manager.js"
          );
        const { PubSub } = __webpack_require__(
          /*! ../PubSub */ "./src/PubSub.js"
        );

        const FORM_REGISTRY = {};
        const MODES = { CREATION: 0, EDITING: 1, INFORMATION: 2 };

        const createSubtaskButton = document.getElementById(
          "create-subtask-button"
        );
        createSubtaskButton.addEventListener("click", createSubtask);

        const listForm = registerForm("list-form-background", "List");
        const taskForm = registerForm("task-form-background", "Task");
        const parentList = document.getElementById("parentList");
        registerManager(
          taskForm,
          new _managers_subtask_manager__WEBPACK_IMPORTED_MODULE_1__.SubtaskManager(
            taskForm
          ),
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
          const subtaskManagerReference =
            taskForm.managers.subtaskManager.reference;
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
              formInputData[inputContentType] =
                _form_utilities__WEBPACK_IMPORTED_MODULE_0__.trimInput(
                  current.value
                );
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
            path = _form_utilities__WEBPACK_IMPORTED_MODULE_0__.getEntityPath(
              workingForm,
              formType
            );
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
            manager.reference.setup({
              entity,
              nodeBeforeWhichToPutSection: lastRow,
            });
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

        /***/
      },

    /***/ "./src/formManagement/form-utilities.js":
      /*!**********************************************!*\
  !*** ./src/formManagement/form-utilities.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ getEntityPath: () => /* binding */ getEntityPath,
          /* harmony export */ trimInput: () => /* binding */ trimInput,
          /* harmony export */
        });
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

        /***/
      },

    /***/ "./src/formManagement/managers/subtask-manager.js":
      /*!********************************************************!*\
  !*** ./src/formManagement/managers/subtask-manager.js ***!
  \********************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SubtaskManager: () =>
            /* binding */ SubtaskManager,
          /* harmony export */
        });
        /* harmony import */ var _subtaskManagement_subtask_creator__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../../subtaskManagement/subtask-creator */ "./src/subtaskManagement/subtask-creator.js"
          );
        /* harmony import */ var _subtaskManagement_subtask_registrar__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../../subtaskManagement/subtask-registrar */ "./src/subtaskManagement/subtask-registrar.js"
          );
        /* harmony import */ var _subtaskManagement_subtask_renderer__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../../subtaskManagement/subtask-renderer */ "./src/subtaskManagement/subtask-renderer.js"
          );

        class SubtaskManager {
          constructor(parentForm) {
            this.parentForm = parentForm;
            this.subtaskSection = document.createElement("div");
            this.subtaskSection.id = "subtask-section";

            this.subtaskCreator =
              new _subtaskManagement_subtask_creator__WEBPACK_IMPORTED_MODULE_0__.SubtaskCreator();
            this.subtaskRegistrar =
              new _subtaskManagement_subtask_registrar__WEBPACK_IMPORTED_MODULE_1__.SubtaskRegistrar(
                this.subtaskSection
              );
            this.subtaskRenderer =
              new _subtaskManagement_subtask_renderer__WEBPACK_IMPORTED_MODULE_2__.SubtaskRenderer(
                this.subtaskSection
              );
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
            const newSubtask = subtask
              ? subtask
              : this.subtaskCreator.createSubtask();
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

        /***/
      },

    /***/ "./src/listManagement/list-bundle.js":
      /*!*******************************************!*\
  !*** ./src/listManagement/list-bundle.js ***!
  \*******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _list_creator__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./list-creator */ "./src/listManagement/list-creator.js"
          );
        /* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./list-registrar */ "./src/listManagement/list-registrar.js"
          );
        /* harmony import */ var _list_registrar__WEBPACK_IMPORTED_MODULE_1___default =
          /*#__PURE__*/ __webpack_require__.n(
            _list_registrar__WEBPACK_IMPORTED_MODULE_1__
          );
        /* harmony import */ var _list_renderer__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ./list-renderer */ "./src/listManagement/list-renderer.js"
          );

        /***/
      },

    /***/ "./src/listManagement/list-creator.js":
      /*!********************************************!*\
  !*** ./src/listManagement/list-creator.js ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../formManagement/form-manager */ "./src/formManagement/form-manager.js"
          );
        /* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ../utilities */ "./src/utilities.js");
        /* harmony import */ var _list__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(/*! ./list */ "./src/listManagement/list.js");

        function createDefaultList() {
          const creationData = { name: "Default", color: "#ccc" };
          const defaultList = new _list__WEBPACK_IMPORTED_MODULE_3__.List(
            creationData
          );
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "ListPending",
            defaultList
          );
        }

        function createNewList(newData) {
          const list = new _list__WEBPACK_IMPORTED_MODULE_3__.List(newData);
          addNonDefaultListButtons(list);
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit("ListPending", list);
        }

        function addNonDefaultListButtons(list) {
          list.EditListButton = (0,
          _utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
            "edit",
            "edit-button",
            list,
            "EditListButton"
          );
          list.EditListButton.addEventListener("click", () => {
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
              "UserWantsToEditList",
              {
                entity: list,
                formType:
                  _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                    .FORM_REGISTRY.List,
              }
            );
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
              "OpenForm",
              _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                .FORM_REGISTRY.List
            );
          });

          list.RemoveListButton = (0,
          _utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
            "x",
            "remove-button",
            list,
            "RemoveListButton"
          );
          list.RemoveListButton.addEventListener("click", () => {
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
              "ListShouldBeRemoved",
              list
            );
          });
        }

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListIsReadyForCreation",
          createNewList
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "CreateDefaultList",
          createDefaultList
        );

        /***/
      },

    /***/ "./src/listManagement/list-registrar.js":
      /*!**********************************************!*\
  !*** ./src/listManagement/list-registrar.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __unused_webpack_exports,
        __webpack_require__
      ) => {
        const { PubSub } = __webpack_require__(
          /*! ../PubSub */ "./src/PubSub.js"
        );

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

        /***/
      },

    /***/ "./src/listManagement/list-renderer.js":
      /*!*********************************************!*\
  !*** ./src/listManagement/list-renderer.js ***!
  \*********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(/*! ../utilities */ "./src/utilities.js");

        const listDisplay = document.getElementById("lists");

        function renderList(listData) {
          const list = listData.list;

          const listDiv = list.div;
          listDiv.dataset.listId = listData.listId;
          listDiv.classList.add("list");
          listDiv.style.borderColor = list.color;

          (0, _utilities__WEBPACK_IMPORTED_MODULE_1__.appendEntity)(
            listDisplay,
            "list",
            list,
            listDiv
          );

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
          (0, _utilities__WEBPACK_IMPORTED_MODULE_1__.removeEntityDiv)(list);
        }

        function rerenderList(listData) {
          stopRenderingList(listData.list);
          renderList(listData);
        }

        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "DefaultListPending",
          renderList
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListRegistered",
          renderList
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "ListShouldBeRemoved",
          stopRenderingList
        );
        _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
          "listShouldBeRerendered",
          rerenderList
        );

        /***/
      },

    /***/ "./src/listManagement/list-utilities.js":
      /*!**********************************************!*\
  !*** ./src/listManagement/list-utilities.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ checkTask: () => /* binding */ checkTask,
          /* harmony export */ deleteTask: () => /* binding */ deleteTask,
          /* harmony export */ editTask: () => /* binding */ editTask,
          /* harmony export */ establishNewTask: () =>
            /* binding */ establishNewTask,
          /* harmony export */ setupTaskHelpers: () =>
            /* binding */ setupTaskHelpers,
          /* harmony export */ uncheckTask: () => /* binding */ uncheckTask,
          /* harmony export */
        });
        /* harmony import */ var _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ../taskManagement/task-creator */ "./src/taskManagement/task-creator.js"
          );
        /* harmony import */ var _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../taskManagement/task-registrar */ "./src/taskManagement/task-registrar.js"
          );
        /* harmony import */ var _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! ../taskManagement/task-renderer */ "./src/taskManagement/task-renderer.js"
          );

        function setupTaskHelpers(list) {
          list.taskCreator =
            new _taskManagement_task_creator__WEBPACK_IMPORTED_MODULE_0__.TaskCreator();
          list.taskRegistrar =
            new _taskManagement_task_registrar__WEBPACK_IMPORTED_MODULE_1__.TaskRegistrar();
          list.taskRenderer =
            new _taskManagement_task_renderer__WEBPACK_IMPORTED_MODULE_2__.TaskRenderer(
              list.div
            );
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

        function taskBelongsToThisList(
          listNameTaskIsLookingFor,
          currentListName
        ) {
          return listNameTaskIsLookingFor == currentListName;
        }

        /***/
      },

    /***/ "./src/listManagement/list.js":
      /*!************************************!*\
  !*** ./src/listManagement/list.js ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ List: () => /* binding */ List,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../formManagement/form-manager */ "./src/formManagement/form-manager.js"
          );
        /* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ../utilities */ "./src/utilities.js");
        /* harmony import */ var _list_utilities__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./list-utilities */ "./src/listManagement/list-utilities.js"
          );

        class List {
          id = null;
          div = document.createElement("div");
          buttons = {};

          constructor(data) {
            this.name = data.name || "Unnamed";
            this.color = data.color;

            this.SortListButton = (0,
            _utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
              "sort",
              "sort-button",
              this,
              "SortListButton"
            );
            this.AddTaskButton = (0,
            _utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
              "+",
              "add-button",
              this,
              "AddTaskButton"
            );
            this.AddTaskButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "OpenForm",
                _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                  .FORM_REGISTRY.Task
              );
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "ListIdGetsReturned",
                this.id
              );
            });

            _list_utilities__WEBPACK_IMPORTED_MODULE_3__.setupTaskHelpers(this);
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
              "TaskIsReadyForCreation",
              _list_utilities__WEBPACK_IMPORTED_MODULE_3__.establishNewTask.bind(
                this
              )
            );
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
              "TaskIsReadyForEditing",
              _list_utilities__WEBPACK_IMPORTED_MODULE_3__.editTask.bind(this)
            );
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
              "UserWantsToDeleteTask",
              _list_utilities__WEBPACK_IMPORTED_MODULE_3__.deleteTask.bind(this)
            );
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
              "TaskChecked",
              _list_utilities__WEBPACK_IMPORTED_MODULE_3__.checkTask.bind(this)
            );
            _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.on(
              "TaskUnchecked",
              _list_utilities__WEBPACK_IMPORTED_MODULE_3__.uncheckTask.bind(
                this
              )
            );
          }
        }

        /***/
      },

    /***/ "./src/subtaskManagement/subtask-creator.js":
      /*!**************************************************!*\
  !*** ./src/subtaskManagement/subtask-creator.js ***!
  \**************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SubtaskCreator: () =>
            /* binding */ SubtaskCreator,
          /* harmony export */
        });
        /* harmony import */ var _subtask__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(
            /*! ./subtask */ "./src/subtaskManagement/subtask.js"
          );

        class SubtaskCreator {
          constructor() {}

          createSubtask() {
            return new _subtask__WEBPACK_IMPORTED_MODULE_0__.Subtask();
          }
        }

        /***/
      },

    /***/ "./src/subtaskManagement/subtask-registrar.js":
      /*!****************************************************!*\
  !*** ./src/subtaskManagement/subtask-registrar.js ***!
  \****************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SubtaskRegistrar: () =>
            /* binding */ SubtaskRegistrar,
          /* harmony export */
        });
        class SubtaskRegistrar {
          subtaskRegistry = [];

          constructor(parentDiv) {
            this.parentDiv = parentDiv;
          }

          registerSubtask(subtask) {
            this.subtaskRegistry.push(subtask);
            console.log(this.subtaskRegistry);
          }

          updateIds() {
            this.subtaskRegistry.forEach((subtask, index) => {
              subtask.id = index;
            });
          }

          applyData() {
            const inputs = this.parentDiv.querySelectorAll("input");
            inputs.forEach((item, index) => {
              const subtask = this.subtaskRegistry[index];
              console.log(subtask, subtask.content, item, item.value);
              subtask.content = item.value;
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

        /***/
      },

    /***/ "./src/subtaskManagement/subtask-renderer.js":
      /*!***************************************************!*\
  !*** ./src/subtaskManagement/subtask-renderer.js ***!
  \***************************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ SubtaskRenderer: () =>
            /* binding */ SubtaskRenderer,
          /* harmony export */
        });
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
              subtaskContentInput.value = subtask.content;
            }
          }

          stopRenderingSubtasksInnerElements(subtasksRegistry) {
            subtasksRegistry.forEach((item) => {
              item.div.innerHTML = "";
            });
          }
        }

        /***/
      },

    /***/ "./src/subtaskManagement/subtask.js":
      /*!******************************************!*\
  !*** ./src/subtaskManagement/subtask.js ***!
  \******************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Subtask: () => /* binding */ Subtask,
          /* harmony export */
        });
        class Subtask {
          div = document.createElement("div");
          _content = "";
          id = null;

          constructor() {}

          get content() {
            return this._content;
          }

          set content(value) {
            this._content = value;
          }
        }

        /***/
      },

    /***/ "./src/taskManagement/task-creator.js":
      /*!********************************************!*\
  !*** ./src/taskManagement/task-creator.js ***!
  \********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TaskCreator: () => /* binding */ TaskCreator,
          /* harmony export */
        });
        /* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./task */ "./src/taskManagement/task.js");

        class TaskCreator {
          constructor() {}

          createTask(taskData) {
            return new _task__WEBPACK_IMPORTED_MODULE_0__.Task(taskData);
          }
        }

        /***/
      },

    /***/ "./src/taskManagement/task-registrar.js":
      /*!**********************************************!*\
  !*** ./src/taskManagement/task-registrar.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TaskRegistrar: () => /* binding */ TaskRegistrar,
          /* harmony export */
        });
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

        /***/
      },

    /***/ "./src/taskManagement/task-renderer.js":
      /*!*********************************************!*\
  !*** ./src/taskManagement/task-renderer.js ***!
  \*********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ TaskRenderer: () => /* binding */ TaskRenderer,
          /* harmony export */
        });
        /* harmony import */ var date_fns_isPast__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(
            /*! date-fns/isPast */ "./node_modules/date-fns/esm/isPast/index.js"
          );
        /* harmony import */ var date_fns_formatDistanceToNowStrict__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! date-fns/formatDistanceToNowStrict */ "./node_modules/date-fns/esm/formatDistanceToNowStrict/index.js"
          );
        /* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../utilities */ "./src/utilities.js");

        class TaskRenderer {
          construct() {}

          renderTask(parentListDiv, task) {
            const parentListTaskSection =
              parentListDiv.querySelector(".task-section");

            const taskDiv = task.div;
            taskDiv.classList.add("task");
            (0, _utilities__WEBPACK_IMPORTED_MODULE_0__.appendEntity)(
              parentListTaskSection,
              "task",
              task,
              taskDiv
            );

            taskDiv.appendChild(task.finishTaskCheckbox);

            const taskNameText = document.createElement("p");
            taskNameText.classList.add("task-name");
            taskNameText.textContent = task.name;
            taskDiv.appendChild(taskNameText);

            const taskDueDate = document.createElement("p");
            taskDueDate.classList.add("due-date");
            taskDueDate.textContent = (0,
            date_fns_formatDistanceToNowStrict__WEBPACK_IMPORTED_MODULE_1__[
              "default"
            ])(task.dueDate);
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
            taskDiv.classList.remove("unchecked");
            taskDiv.classList.add("checked");
          }

          renderTaskAsUnchecked(taskDiv) {
            taskDiv.classList.remove("checked");
            taskDiv.classList.add("unchecked");
          }

          stopRenderingTask(task) {
            (0, _utilities__WEBPACK_IMPORTED_MODULE_0__.removeEntityDiv)(task);
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
          return (0, date_fns_isPast__WEBPACK_IMPORTED_MODULE_2__["default"])(
            dueDateValue
          );
        }

        /***/
      },

    /***/ "./src/taskManagement/task-utilities.js":
      /*!**********************************************!*\
  !*** ./src/taskManagement/task-utilities.js ***!
  \**********************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ setupDueDate: () => /* binding */ setupDueDate,
          /* harmony export */
        });
        function setupDueDate(dueDateString) {
          if (dueDateString) {
            return new Date(dueDateString);
          } else {
            return new Date();
          }
        }

        /***/
      },

    /***/ "./src/taskManagement/task.js":
      /*!************************************!*\
  !*** ./src/taskManagement/task.js ***!
  \************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ Task: () => /* binding */ Task,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ../PubSub */ "./src/PubSub.js");
        /* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ../formManagement/form-manager */ "./src/formManagement/form-manager.js"
          );
        /* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_2__ =
          __webpack_require__(/*! ../utilities */ "./src/utilities.js");
        /* harmony import */ var _task_utilities__WEBPACK_IMPORTED_MODULE_3__ =
          __webpack_require__(
            /*! ./task-utilities */ "./src/taskManagement/task-utilities.js"
          );

        class Task {
          id = null;
          finished = false;
          div = document.createElement("div");
          buttons = {};

          constructor(taskData) {
            this.name = taskData.name || "Unnamed";
            this.description = taskData.description;
            this._dueDate = (0,
            _task_utilities__WEBPACK_IMPORTED_MODULE_3__.setupDueDate)(
              taskData.dueDate
            );
            this.subtasks = taskData.subtasks;
            this.priority = taskData.priority;
            this.parentList = taskData.parentList;

            this.div.addEventListener("click", (e) => {
              if (
                e.target.classList.contains("task") ||
                e.target.nodeName === "P"
              ) {
                _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                  "UserWantsToEditTask",
                  {
                    formType:
                      _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                        .FORM_REGISTRY.Task,
                    entity: this,
                  }
                );
                _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                  "OpenForm",
                  _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                    .FORM_REGISTRY.Task
                );
              }
            });

            this.finishTaskCheckbox = document.createElement("input");
            this.finishTaskCheckbox.setAttribute("type", "checkbox");
            this.finishTaskCheckbox.addEventListener("change", (e) => {
              if (e.currentTarget.checked) {
                _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                  "TaskChecked",
                  this
                );
              } else {
                _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                  "TaskUnchecked",
                  this
                );
              }
            });

            this.EditTaskButton = (0,
            _utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
              "edit",
              "edit-button",
              this,
              "EditTaskButton"
            );
            this.EditTaskButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "UserWantsToEditTask",
                {
                  formType:
                    _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                      .FORM_REGISTRY.Task,
                  entity: this,
                }
              );
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "OpenForm",
                _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
                  .FORM_REGISTRY.Task
              );
            });

            this.DeleteTaskButton = (0,
            _utilities__WEBPACK_IMPORTED_MODULE_2__.setupButton)(
              "x",
              "delete-button",
              this,
              "DeleteTaskButton"
            );
            this.DeleteTaskButton.addEventListener("click", () => {
              _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
                "UserWantsToDeleteTask",
                this
              );
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
            this._dueDate = (0,
            _task_utilities__WEBPACK_IMPORTED_MODULE_3__.setupDueDate)(value);
          }
        }

        /***/
      },

    /***/ "./src/unique-button-manager.js":
      /*!**************************************!*\
  !*** ./src/unique-button-manager.js ***!
  \**************************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ finishUsingListFormButton: () =>
            /* binding */ finishUsingListFormButton,
          /* harmony export */ finishUsingTaskFormButton: () =>
            /* binding */ finishUsingTaskFormButton,
          /* harmony export */ listFormCloseButton: () =>
            /* binding */ listFormCloseButton,
          /* harmony export */ listFormOpenButton: () =>
            /* binding */ listFormOpenButton,
          /* harmony export */ taskFormCloseButton: () =>
            /* binding */ taskFormCloseButton,
          /* harmony export */
        });
        /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_0__ =
          __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");
        /* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ =
          __webpack_require__(
            /*! ./formManagement/form-manager */ "./src/formManagement/form-manager.js"
          );

        const listFormOpenButton = document.getElementById(
          "list-form-open-button"
        );
        listFormOpenButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "OpenForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.List
          );
        });

        const listFormCloseButton = document.getElementById(
          "list-form-close-button"
        );
        listFormCloseButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.List
          );
        });

        const finishUsingListFormButton =
          document.getElementById("finish-list-button");
        finishUsingListFormButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "UserFinishedUsingForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.List
          );
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.List
          );
        });

        const taskFormCloseButton = document.getElementById(
          "task-form-close-button"
        );
        taskFormCloseButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.Task
          );
        });

        const finishUsingTaskFormButton =
          document.getElementById("finish-task-button");
        finishUsingTaskFormButton.addEventListener("click", () => {
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "UserFinishedUsingForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.Task
          );
          _PubSub__WEBPACK_IMPORTED_MODULE_0__.PubSub.emit(
            "CloseForm",
            _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__
              .FORM_REGISTRY.Task
          );
        });

        /***/
      },

    /***/ "./src/utilities.js":
      /*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
      /***/ (
        __unused_webpack_module,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ appendEntity: () => /* binding */ appendEntity,
          /* harmony export */ removeEntityDiv: () =>
            /* binding */ removeEntityDiv,
          /* harmony export */ setupButton: () => /* binding */ setupButton,
          /* harmony export */
        });
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
          nodeToPutAfter.parentNode.insertBefore(
            newNode,
            nodeToPutAfter.nextSibling
          );
        }

        /***/
      },

    /***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
      /*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
      /***/ (
        __unused_webpack___webpack_module__,
        __webpack_exports__,
        __webpack_require__
      ) => {
        "use strict";
        __webpack_require__.r(__webpack_exports__);
        /* harmony export */ __webpack_require__.d(__webpack_exports__, {
          /* harmony export */ default: () => /* binding */ _typeof,
          /* harmony export */
        });
        function _typeof(obj) {
          "@babel/helpers - typeof";

          return (
            (_typeof =
              "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                ? function (obj) {
                    return typeof obj;
                  }
                : function (obj) {
                    return obj &&
                      "function" == typeof Symbol &&
                      obj.constructor === Symbol &&
                      obj !== Symbol.prototype
                      ? "symbol"
                      : typeof obj;
                  }),
            _typeof(obj)
          );
        }

        /***/
      },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be in strict mode.
  (() => {
    "use strict";
    /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _unique_button_manager__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(
        /*! ./unique-button-manager */ "./src/unique-button-manager.js"
      );
    /* harmony import */ var _formManagement_form_manager__WEBPACK_IMPORTED_MODULE_1__ =
      __webpack_require__(
        /*! ./formManagement/form-manager */ "./src/formManagement/form-manager.js"
      );
    /* harmony import */ var _listManagement_list_bundle__WEBPACK_IMPORTED_MODULE_2__ =
      __webpack_require__(
        /*! ./listManagement/list-bundle */ "./src/listManagement/list-bundle.js"
      );
    /* harmony import */ var _PubSub__WEBPACK_IMPORTED_MODULE_3__ =
      __webpack_require__(/*! ./PubSub */ "./src/PubSub.js");

    _PubSub__WEBPACK_IMPORTED_MODULE_3__.PubSub.emit("CreateDefaultList");
  })();

  /******/
})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05pQztBQUNNO0FBQ0Q7QUFDSjs7QUFFbEMsMkNBQU0iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Fzc2lnbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2Nsb25lT2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL2RlZmF1bHRPcHRpb25zL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9jb21wYXJlQXNjL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2Zvcm1hdERpc3RhbmNlU3RyaWN0L2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2Zvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vaXNQYXN0L2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkRm9ybWF0TG9uZ0ZuL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9fbGliL2J1aWxkTG9jYWxpemVGbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvX2xpYi9idWlsZE1hdGNoRm4vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9kYXRlLWZucy9lc20vbG9jYWxlL19saWIvYnVpbGRNYXRjaFBhdHRlcm5Gbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXREaXN0YW5jZS9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS9sb2NhbGUvZW4tVVMvX2xpYi9mb3JtYXRMb25nL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2Zvcm1hdFJlbGF0aXZlL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL2xvY2FsaXplL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9fbGliL21hdGNoL2luZGV4LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZGF0ZS1mbnMvZXNtL2xvY2FsZS9lbi1VUy9pbmRleC5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2RhdGUtZm5zL2VzbS90b0RhdGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9QdWJTdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9mb3JtTWFuYWdlbWVudC9mb3JtLXV0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2Zvcm1NYW5hZ2VtZW50L21hbmFnZXJzL3N1YnRhc2stbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2xpc3RNYW5hZ2VtZW50L2xpc3QtYnVuZGxlLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvbGlzdE1hbmFnZW1lbnQvbGlzdC11dGlsaXRpZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9saXN0TWFuYWdlbWVudC9saXN0LmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1jcmVhdG9yLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1yZWdpc3RyYXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS8uL3NyYy9zdWJ0YXNrTWFuYWdlbWVudC9zdWJ0YXNrLXJlbmRlcmVyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvc3VidGFza01hbmFnZW1lbnQvc3VidGFzay5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stY3JlYXRvci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVnaXN0cmFyLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay1yZW5kZXJlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3Rhc2tNYW5hZ2VtZW50L3Rhc2stdXRpbGl0aWVzLmpzIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvLi9zcmMvdGFza01hbmFnZW1lbnQvdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3VuaXF1ZS1idXR0b24tbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL3V0aWxpdGllcy5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZi5qcyIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8td2Vic2l0ZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLXdlYnNpdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby13ZWJzaXRlLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIG9iamVjdCkge1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdhc3NpZ24gcmVxdWlyZXMgdGhhdCBpbnB1dCBwYXJhbWV0ZXIgbm90IGJlIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gIH1cbiAgZm9yICh2YXIgcHJvcGVydHkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KSkge1xuICAgICAgO1xuICAgICAgdGFyZ2V0W3Byb3BlcnR5XSA9IG9iamVjdFtwcm9wZXJ0eV07XG4gICAgfVxuICB9XG4gIHJldHVybiB0YXJnZXQ7XG59IiwiaW1wb3J0IGFzc2lnbiBmcm9tIFwiLi4vYXNzaWduL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuIGFzc2lnbih7fSwgb2JqZWN0KTtcbn0iLCJpbXBvcnQgZGVmYXVsdExvY2FsZSBmcm9tIFwiLi4vLi4vbG9jYWxlL2VuLVVTL2luZGV4LmpzXCI7XG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0TG9jYWxlOyIsInZhciBkZWZhdWx0T3B0aW9ucyA9IHt9O1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlZmF1bHRPcHRpb25zKCkge1xuICByZXR1cm4gZGVmYXVsdE9wdGlvbnM7XG59XG5leHBvcnQgZnVuY3Rpb24gc2V0RGVmYXVsdE9wdGlvbnMobmV3T3B0aW9ucykge1xuICBkZWZhdWx0T3B0aW9ucyA9IG5ld09wdGlvbnM7XG59IiwiLyoqXG4gKiBHb29nbGUgQ2hyb21lIGFzIG9mIDY3LjAuMzM5Ni44NyBpbnRyb2R1Y2VkIHRpbWV6b25lcyB3aXRoIG9mZnNldCB0aGF0IGluY2x1ZGVzIHNlY29uZHMuXG4gKiBUaGV5IHVzdWFsbHkgYXBwZWFyIGZvciBkYXRlcyB0aGF0IGRlbm90ZSB0aW1lIGJlZm9yZSB0aGUgdGltZXpvbmVzIHdlcmUgaW50cm9kdWNlZFxuICogKGUuZy4gZm9yICdFdXJvcGUvUHJhZ3VlJyB0aW1lem9uZSB0aGUgb2Zmc2V0IGlzIEdNVCswMDo1Nzo0NCBiZWZvcmUgMSBPY3RvYmVyIDE4OTFcbiAqIGFuZCBHTVQrMDE6MDA6MDAgYWZ0ZXIgdGhhdCBkYXRlKVxuICpcbiAqIERhdGUjZ2V0VGltZXpvbmVPZmZzZXQgcmV0dXJucyB0aGUgb2Zmc2V0IGluIG1pbnV0ZXMgYW5kIHdvdWxkIHJldHVybiA1NyBmb3IgdGhlIGV4YW1wbGUgYWJvdmUsXG4gKiB3aGljaCB3b3VsZCBsZWFkIHRvIGluY29ycmVjdCBjYWxjdWxhdGlvbnMuXG4gKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHRoZSB0aW1lem9uZSBvZmZzZXQgaW4gbWlsbGlzZWNvbmRzIHRoYXQgdGFrZXMgc2Vjb25kcyBpbiBhY2NvdW50LlxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRUaW1lem9uZU9mZnNldEluTWlsbGlzZWNvbmRzKGRhdGUpIHtcbiAgdmFyIHV0Y0RhdGUgPSBuZXcgRGF0ZShEYXRlLlVUQyhkYXRlLmdldEZ1bGxZZWFyKCksIGRhdGUuZ2V0TW9udGgoKSwgZGF0ZS5nZXREYXRlKCksIGRhdGUuZ2V0SG91cnMoKSwgZGF0ZS5nZXRNaW51dGVzKCksIGRhdGUuZ2V0U2Vjb25kcygpLCBkYXRlLmdldE1pbGxpc2Vjb25kcygpKSk7XG4gIHV0Y0RhdGUuc2V0VVRDRnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIC0gdXRjRGF0ZS5nZXRUaW1lKCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmVxdWlyZWRBcmdzKHJlcXVpcmVkLCBhcmdzKSB7XG4gIGlmIChhcmdzLmxlbmd0aCA8IHJlcXVpcmVkKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihyZXF1aXJlZCArICcgYXJndW1lbnQnICsgKHJlcXVpcmVkID4gMSA/ICdzJyA6ICcnKSArICcgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmdzLmxlbmd0aCArICcgcHJlc2VudCcpO1xuICB9XG59IiwiaW1wb3J0IHRvRGF0ZSBmcm9tIFwiLi4vdG9EYXRlL2luZGV4LmpzXCI7XG5pbXBvcnQgcmVxdWlyZWRBcmdzIGZyb20gXCIuLi9fbGliL3JlcXVpcmVkQXJncy9pbmRleC5qc1wiO1xuLyoqXG4gKiBAbmFtZSBjb21wYXJlQXNjXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbXBhcmUgdGhlIHR3byBkYXRlcyBhbmQgcmV0dXJuIC0xLCAwIG9yIDEuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb21wYXJlIHRoZSB0d28gZGF0ZXMgYW5kIHJldHVybiAxIGlmIHRoZSBmaXJzdCBkYXRlIGlzIGFmdGVyIHRoZSBzZWNvbmQsXG4gKiAtMSBpZiB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBvciAwIGlmIGRhdGVzIGFyZSBlcXVhbC5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGRhdGVSaWdodCAtIHRoZSBzZWNvbmQgZGF0ZSB0byBjb21wYXJlXG4gKiBAcmV0dXJucyB7TnVtYmVyfSB0aGUgcmVzdWx0IG9mIHRoZSBjb21wYXJpc29uXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbXBhcmUgMTEgRmVicnVhcnkgMTk4NyBhbmQgMTAgSnVseSAxOTg5OlxuICogY29uc3QgcmVzdWx0ID0gY29tcGFyZUFzYyhuZXcgRGF0ZSgxOTg3LCAxLCAxMSksIG5ldyBEYXRlKDE5ODksIDYsIDEwKSlcbiAqIC8vPT4gLTFcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU29ydCB0aGUgYXJyYXkgb2YgZGF0ZXM6XG4gKiBjb25zdCByZXN1bHQgPSBbXG4gKiAgIG5ldyBEYXRlKDE5OTUsIDYsIDIpLFxuICogICBuZXcgRGF0ZSgxOTg3LCAxLCAxMSksXG4gKiAgIG5ldyBEYXRlKDE5ODksIDYsIDEwKVxuICogXS5zb3J0KGNvbXBhcmVBc2MpXG4gKiAvLz0+IFtcbiAqIC8vICAgV2VkIEZlYiAxMSAxOTg3IDAwOjAwOjAwLFxuICogLy8gICBNb24gSnVsIDEwIDE5ODkgMDA6MDA6MDAsXG4gKiAvLyAgIFN1biBKdWwgMDIgMTk5NSAwMDowMDowMFxuICogLy8gXVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjb21wYXJlQXNjKGRpcnR5RGF0ZUxlZnQsIGRpcnR5RGF0ZVJpZ2h0KSB7XG4gIHJlcXVpcmVkQXJncygyLCBhcmd1bWVudHMpO1xuICB2YXIgZGF0ZUxlZnQgPSB0b0RhdGUoZGlydHlEYXRlTGVmdCk7XG4gIHZhciBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlEYXRlUmlnaHQpO1xuICB2YXIgZGlmZiA9IGRhdGVMZWZ0LmdldFRpbWUoKSAtIGRhdGVSaWdodC5nZXRUaW1lKCk7XG4gIGlmIChkaWZmIDwgMCkge1xuICAgIHJldHVybiAtMTtcbiAgfSBlbHNlIGlmIChkaWZmID4gMCkge1xuICAgIHJldHVybiAxO1xuICAgIC8vIFJldHVybiAwIGlmIGRpZmYgaXMgMDsgcmV0dXJuIE5hTiBpZiBkaWZmIGlzIE5hTlxuICB9IGVsc2Uge1xuICAgIHJldHVybiBkaWZmO1xuICB9XG59IiwiaW1wb3J0IHsgZ2V0RGVmYXVsdE9wdGlvbnMgfSBmcm9tIFwiLi4vX2xpYi9kZWZhdWx0T3B0aW9ucy9pbmRleC5qc1wiO1xuaW1wb3J0IGdldFRpbWV6b25lT2Zmc2V0SW5NaWxsaXNlY29uZHMgZnJvbSBcIi4uL19saWIvZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcy9pbmRleC5qc1wiO1xuaW1wb3J0IGNvbXBhcmVBc2MgZnJvbSBcIi4uL2NvbXBhcmVBc2MvaW5kZXguanNcIjtcbmltcG9ydCB0b0RhdGUgZnJvbSBcIi4uL3RvRGF0ZS9pbmRleC5qc1wiO1xuaW1wb3J0IGNsb25lT2JqZWN0IGZyb20gXCIuLi9fbGliL2Nsb25lT2JqZWN0L2luZGV4LmpzXCI7XG5pbXBvcnQgYXNzaWduIGZyb20gXCIuLi9fbGliL2Fzc2lnbi9pbmRleC5qc1wiO1xuaW1wb3J0IGRlZmF1bHRMb2NhbGUgZnJvbSBcIi4uL19saWIvZGVmYXVsdExvY2FsZS9pbmRleC5qc1wiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbnZhciBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFID0gMTAwMCAqIDYwO1xudmFyIE1JTlVURVNfSU5fREFZID0gNjAgKiAyNDtcbnZhciBNSU5VVEVTX0lOX01PTlRIID0gTUlOVVRFU19JTl9EQVkgKiAzMDtcbnZhciBNSU5VVEVTX0lOX1lFQVIgPSBNSU5VVEVTX0lOX0RBWSAqIDM2NTtcblxuLyoqXG4gKiBAbmFtZSBmb3JtYXREaXN0YW5jZVN0cmljdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBSZXR1cm4gdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGdpdmVuIGRhdGVzIGluIHdvcmRzLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3JkcywgdXNpbmcgc3RyaWN0IHVuaXRzLlxuICogVGhpcyBpcyBsaWtlIGBmb3JtYXREaXN0YW5jZWAsIGJ1dCBkb2VzIG5vdCB1c2UgaGVscGVycyBsaWtlICdhbG1vc3QnLCAnb3ZlcicsXG4gKiAnbGVzcyB0aGFuJyBhbmQgdGhlIGxpa2UuXG4gKlxuICogfCBEaXN0YW5jZSBiZXR3ZWVuIGRhdGVzIHwgUmVzdWx0ICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCAuLi4gNTkgc2VjcyAgICAgICAgICB8IFswLi41OV0gc2Vjb25kcyAgICAgfFxuICogfCAxIC4uLiA1OSBtaW5zICAgICAgICAgIHwgWzEuLjU5XSBtaW51dGVzICAgICB8XG4gKiB8IDEgLi4uIDIzIGhycyAgICAgICAgICAgfCBbMS4uMjNdIGhvdXJzICAgICAgIHxcbiAqIHwgMSAuLi4gMjkgZGF5cyAgICAgICAgICB8IFsxLi4yOV0gZGF5cyAgICAgICAgfFxuICogfCAxIC4uLiAxMSBtb250aHMgICAgICAgIHwgWzEuLjExXSBtb250aHMgICAgICB8XG4gKiB8IDEgLi4uIE4geWVhcnMgICAgICAgICAgfCBbMS4uTl0gIHllYXJzICAgICAgIHxcbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGVcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGJhc2VEYXRlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gYW4gb2JqZWN0IHdpdGggb3B0aW9ucy5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gW29wdGlvbnMuYWRkU3VmZml4PWZhbHNlXSAtIHJlc3VsdCBpbmRpY2F0ZXMgaWYgdGhlIHNlY29uZCBkYXRlIGlzIGVhcmxpZXIgb3IgbGF0ZXIgdGhhbiB0aGUgZmlyc3RcbiAqIEBwYXJhbSB7J3NlY29uZCd8J21pbnV0ZSd8J2hvdXInfCdkYXknfCdtb250aCd8J3llYXInfSBbb3B0aW9ucy51bml0XSAtIGlmIHNwZWNpZmllZCwgd2lsbCBmb3JjZSBhIHVuaXRcbiAqIEBwYXJhbSB7J2Zsb29yJ3wnY2VpbCd8J3JvdW5kJ30gW29wdGlvbnMucm91bmRpbmdNZXRob2Q9J3JvdW5kJ10gLSB3aGljaCB3YXkgdG8gcm91bmQgcGFydGlhbCB1bml0c1xuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZGlzdGFuY2UgaW4gd29yZHNcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBkYXRlYCBtdXN0IG5vdCBiZSBJbnZhbGlkIERhdGVcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBiYXNlRGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5yb3VuZGluZ01ldGhvZGAgbXVzdCBiZSAnZmxvb3InLCAnY2VpbCcgb3IgJ3JvdW5kJ1xuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMudW5pdGAgbXVzdCBiZSAnc2Vjb25kJywgJ21pbnV0ZScsICdob3VyJywgJ2RheScsICdtb250aCcgb3IgJ3llYXInXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0RGlzdGFuY2VgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMiBKdWx5IDIwMTQgYW5kIDEgSmFudWFyeSAyMDE1P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VTdHJpY3QobmV3IERhdGUoMjAxNCwgNiwgMiksIG5ldyBEYXRlKDIwMTUsIDAsIDIpKVxuICogLy89PiAnNiBtb250aHMnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTVcbiAqIC8vIGFuZCAxIEphbnVhcnkgMjAxNSAwMDowMDowMD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE1LCAwLCAxLCAwLCAwLCAxNSksXG4gKiAgIG5ldyBEYXRlKDIwMTUsIDAsIDEsIDAsIDAsIDApXG4gKiApXG4gKiAvLz0+ICcxNSBzZWNvbmRzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIDEgSmFudWFyeSAyMDE2XG4gKiAvLyB0byAxIEphbnVhcnkgMjAxNSwgd2l0aCBhIHN1ZmZpeD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KG5ldyBEYXRlKDIwMTUsIDAsIDEpLCBuZXcgRGF0ZSgyMDE2LCAwLCAxKSwge1xuICogICBhZGRTdWZmaXg6IHRydWVcbiAqIH0pXG4gKiAvLz0+ICcxIHllYXIgYWdvJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIDEgSmFudWFyeSAyMDE2XG4gKiAvLyB0byAxIEphbnVhcnkgMjAxNSwgaW4gbWludXRlcz9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KG5ldyBEYXRlKDIwMTYsIDAsIDEpLCBuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICB1bml0OiAnbWludXRlJ1xuICogfSlcbiAqIC8vPT4gJzUyNTYwMCBtaW51dGVzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBXaGF0IGlzIHRoZSBkaXN0YW5jZSBmcm9tIDEgSmFudWFyeSAyMDE1XG4gKiAvLyB0byAyOCBKYW51YXJ5IDIwMTUsIGluIG1vbnRocywgcm91bmRlZCB1cD9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlU3RyaWN0KG5ldyBEYXRlKDIwMTUsIDAsIDI4KSwgbmV3IERhdGUoMjAxNSwgMCwgMSksIHtcbiAqICAgdW5pdDogJ21vbnRoJyxcbiAqICAgcm91bmRpbmdNZXRob2Q6ICdjZWlsJ1xuICogfSlcbiAqIC8vPT4gJzEgbW9udGgnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFdoYXQgaXMgdGhlIGRpc3RhbmNlIGJldHdlZW4gMSBBdWd1c3QgMjAxNiBhbmQgMSBKYW51YXJ5IDIwMTUgaW4gRXNwZXJhbnRvP1xuICogaW1wb3J0IHsgZW9Mb2NhbGUgfSBmcm9tICdkYXRlLWZucy9sb2NhbGUvZW8nXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVN0cmljdChuZXcgRGF0ZSgyMDE2LCA3LCAxKSwgbmV3IERhdGUoMjAxNSwgMCwgMSksIHtcbiAqICAgbG9jYWxlOiBlb0xvY2FsZVxuICogfSlcbiAqIC8vPT4gJzEgamFybydcbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBmb3JtYXREaXN0YW5jZVN0cmljdChkaXJ0eURhdGUsIGRpcnR5QmFzZURhdGUsIG9wdGlvbnMpIHtcbiAgdmFyIF9yZWYsIF9vcHRpb25zJGxvY2FsZSwgX29wdGlvbnMkcm91bmRpbmdNZXRoO1xuICByZXF1aXJlZEFyZ3MoMiwgYXJndW1lbnRzKTtcbiAgdmFyIGRlZmF1bHRPcHRpb25zID0gZ2V0RGVmYXVsdE9wdGlvbnMoKTtcbiAgdmFyIGxvY2FsZSA9IChfcmVmID0gKF9vcHRpb25zJGxvY2FsZSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5sb2NhbGUpICE9PSBudWxsICYmIF9vcHRpb25zJGxvY2FsZSAhPT0gdm9pZCAwID8gX29wdGlvbnMkbG9jYWxlIDogZGVmYXVsdE9wdGlvbnMubG9jYWxlKSAhPT0gbnVsbCAmJiBfcmVmICE9PSB2b2lkIDAgPyBfcmVmIDogZGVmYXVsdExvY2FsZTtcbiAgaWYgKCFsb2NhbGUuZm9ybWF0RGlzdGFuY2UpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBsb2NhbGl6ZS5mb3JtYXREaXN0YW5jZSBwcm9wZXJ0eScpO1xuICB9XG4gIHZhciBjb21wYXJpc29uID0gY29tcGFyZUFzYyhkaXJ0eURhdGUsIGRpcnR5QmFzZURhdGUpO1xuICBpZiAoaXNOYU4oY29tcGFyaXNvbikpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0aW1lIHZhbHVlJyk7XG4gIH1cbiAgdmFyIGxvY2FsaXplT3B0aW9ucyA9IGFzc2lnbihjbG9uZU9iamVjdChvcHRpb25zKSwge1xuICAgIGFkZFN1ZmZpeDogQm9vbGVhbihvcHRpb25zID09PSBudWxsIHx8IG9wdGlvbnMgPT09IHZvaWQgMCA/IHZvaWQgMCA6IG9wdGlvbnMuYWRkU3VmZml4KSxcbiAgICBjb21wYXJpc29uOiBjb21wYXJpc29uXG4gIH0pO1xuICB2YXIgZGF0ZUxlZnQ7XG4gIHZhciBkYXRlUmlnaHQ7XG4gIGlmIChjb21wYXJpc29uID4gMCkge1xuICAgIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5QmFzZURhdGUpO1xuICAgIGRhdGVSaWdodCA9IHRvRGF0ZShkaXJ0eURhdGUpO1xuICB9IGVsc2Uge1xuICAgIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5RGF0ZSk7XG4gICAgZGF0ZVJpZ2h0ID0gdG9EYXRlKGRpcnR5QmFzZURhdGUpO1xuICB9XG4gIHZhciByb3VuZGluZ01ldGhvZCA9IFN0cmluZygoX29wdGlvbnMkcm91bmRpbmdNZXRoID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJvdW5kaW5nTWV0aG9kKSAhPT0gbnVsbCAmJiBfb3B0aW9ucyRyb3VuZGluZ01ldGggIT09IHZvaWQgMCA/IF9vcHRpb25zJHJvdW5kaW5nTWV0aCA6ICdyb3VuZCcpO1xuICB2YXIgcm91bmRpbmdNZXRob2RGbjtcbiAgaWYgKHJvdW5kaW5nTWV0aG9kID09PSAnZmxvb3InKSB7XG4gICAgcm91bmRpbmdNZXRob2RGbiA9IE1hdGguZmxvb3I7XG4gIH0gZWxzZSBpZiAocm91bmRpbmdNZXRob2QgPT09ICdjZWlsJykge1xuICAgIHJvdW5kaW5nTWV0aG9kRm4gPSBNYXRoLmNlaWw7XG4gIH0gZWxzZSBpZiAocm91bmRpbmdNZXRob2QgPT09ICdyb3VuZCcpIHtcbiAgICByb3VuZGluZ01ldGhvZEZuID0gTWF0aC5yb3VuZDtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInJvdW5kaW5nTWV0aG9kIG11c3QgYmUgJ2Zsb29yJywgJ2NlaWwnIG9yICdyb3VuZCdcIik7XG4gIH1cbiAgdmFyIG1pbGxpc2Vjb25kcyA9IGRhdGVSaWdodC5nZXRUaW1lKCkgLSBkYXRlTGVmdC5nZXRUaW1lKCk7XG4gIHZhciBtaW51dGVzID0gbWlsbGlzZWNvbmRzIC8gTUlMTElTRUNPTkRTX0lOX01JTlVURTtcbiAgdmFyIHRpbWV6b25lT2Zmc2V0ID0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlUmlnaHQpIC0gZ2V0VGltZXpvbmVPZmZzZXRJbk1pbGxpc2Vjb25kcyhkYXRlTGVmdCk7XG5cbiAgLy8gVXNlIERTVC1ub3JtYWxpemVkIGRpZmZlcmVuY2UgaW4gbWludXRlcyBmb3IgeWVhcnMsIG1vbnRocyBhbmQgZGF5cztcbiAgLy8gdXNlIHJlZ3VsYXIgZGlmZmVyZW5jZSBpbiBtaW51dGVzIGZvciBob3VycywgbWludXRlcyBhbmQgc2Vjb25kcy5cbiAgdmFyIGRzdE5vcm1hbGl6ZWRNaW51dGVzID0gKG1pbGxpc2Vjb25kcyAtIHRpbWV6b25lT2Zmc2V0KSAvIE1JTExJU0VDT05EU19JTl9NSU5VVEU7XG4gIHZhciBkZWZhdWx0VW5pdCA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy51bml0O1xuICB2YXIgdW5pdDtcbiAgaWYgKCFkZWZhdWx0VW5pdCkge1xuICAgIGlmIChtaW51dGVzIDwgMSkge1xuICAgICAgdW5pdCA9ICdzZWNvbmQnO1xuICAgIH0gZWxzZSBpZiAobWludXRlcyA8IDYwKSB7XG4gICAgICB1bml0ID0gJ21pbnV0ZSc7XG4gICAgfSBlbHNlIGlmIChtaW51dGVzIDwgTUlOVVRFU19JTl9EQVkpIHtcbiAgICAgIHVuaXQgPSAnaG91cic7XG4gICAgfSBlbHNlIGlmIChkc3ROb3JtYWxpemVkTWludXRlcyA8IE1JTlVURVNfSU5fTU9OVEgpIHtcbiAgICAgIHVuaXQgPSAnZGF5JztcbiAgICB9IGVsc2UgaWYgKGRzdE5vcm1hbGl6ZWRNaW51dGVzIDwgTUlOVVRFU19JTl9ZRUFSKSB7XG4gICAgICB1bml0ID0gJ21vbnRoJztcbiAgICB9IGVsc2Uge1xuICAgICAgdW5pdCA9ICd5ZWFyJztcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdW5pdCA9IFN0cmluZyhkZWZhdWx0VW5pdCk7XG4gIH1cblxuICAvLyAwIHVwIHRvIDYwIHNlY29uZHNcbiAgaWYgKHVuaXQgPT09ICdzZWNvbmQnKSB7XG4gICAgdmFyIHNlY29uZHMgPSByb3VuZGluZ01ldGhvZEZuKG1pbGxpc2Vjb25kcyAvIDEwMDApO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hTZWNvbmRzJywgc2Vjb25kcywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgdXAgdG8gNjAgbWluc1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdtaW51dGUnKSB7XG4gICAgdmFyIHJvdW5kZWRNaW51dGVzID0gcm91bmRpbmdNZXRob2RGbihtaW51dGVzKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4TWludXRlcycsIHJvdW5kZWRNaW51dGVzLCBsb2NhbGl6ZU9wdGlvbnMpO1xuXG4gICAgLy8gMSB1cCB0byAyNCBob3Vyc1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdob3VyJykge1xuICAgIHZhciBob3VycyA9IHJvdW5kaW5nTWV0aG9kRm4obWludXRlcyAvIDYwKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4SG91cnMnLCBob3VycywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgdXAgdG8gMzAgZGF5c1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICdkYXknKSB7XG4gICAgdmFyIGRheXMgPSByb3VuZGluZ01ldGhvZEZuKGRzdE5vcm1hbGl6ZWRNaW51dGVzIC8gTUlOVVRFU19JTl9EQVkpO1xuICAgIHJldHVybiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hEYXlzJywgZGF5cywgbG9jYWxpemVPcHRpb25zKTtcblxuICAgIC8vIDEgdXAgdG8gMTIgbW9udGhzXG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ21vbnRoJykge1xuICAgIHZhciBtb250aHMgPSByb3VuZGluZ01ldGhvZEZuKGRzdE5vcm1hbGl6ZWRNaW51dGVzIC8gTUlOVVRFU19JTl9NT05USCk7XG4gICAgcmV0dXJuIG1vbnRocyA9PT0gMTIgJiYgZGVmYXVsdFVuaXQgIT09ICdtb250aCcgPyBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hZZWFycycsIDEsIGxvY2FsaXplT3B0aW9ucykgOiBsb2NhbGUuZm9ybWF0RGlzdGFuY2UoJ3hNb250aHMnLCBtb250aHMsIGxvY2FsaXplT3B0aW9ucyk7XG5cbiAgICAvLyAxIHllYXIgdXAgdG8gbWF4IERhdGVcbiAgfSBlbHNlIGlmICh1bml0ID09PSAneWVhcicpIHtcbiAgICB2YXIgeWVhcnMgPSByb3VuZGluZ01ldGhvZEZuKGRzdE5vcm1hbGl6ZWRNaW51dGVzIC8gTUlOVVRFU19JTl9ZRUFSKTtcbiAgICByZXR1cm4gbG9jYWxlLmZvcm1hdERpc3RhbmNlKCd4WWVhcnMnLCB5ZWFycywgbG9jYWxpemVPcHRpb25zKTtcbiAgfVxuICB0aHJvdyBuZXcgUmFuZ2VFcnJvcihcInVuaXQgbXVzdCBiZSAnc2Vjb25kJywgJ21pbnV0ZScsICdob3VyJywgJ2RheScsICdtb250aCcgb3IgJ3llYXInXCIpO1xufSIsImltcG9ydCBmb3JtYXREaXN0YW5jZVN0cmljdCBmcm9tIFwiLi4vZm9ybWF0RGlzdGFuY2VTdHJpY3QvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3RcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlIGFuZCBub3cgaW4gd29yZHMuXG4gKiBAcHVyZSBmYWxzZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBnaXZlbiBkYXRlcyBpbiB3b3JkcywgdXNpbmcgc3RyaWN0IHVuaXRzLlxuICogVGhpcyBpcyBsaWtlIGBmb3JtYXREaXN0YW5jZWAsIGJ1dCBkb2VzIG5vdCB1c2UgaGVscGVycyBsaWtlICdhbG1vc3QnLCAnb3ZlcicsXG4gKiAnbGVzcyB0aGFuJyBhbmQgdGhlIGxpa2UuXG4gKlxuICogfCBEaXN0YW5jZSBiZXR3ZWVuIGRhdGVzIHwgUmVzdWx0ICAgICAgICAgICAgICB8XG4gKiB8LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgMCAuLi4gNTkgc2VjcyAgICAgICAgICB8IFswLi41OV0gc2Vjb25kcyAgICAgfFxuICogfCAxIC4uLiA1OSBtaW5zICAgICAgICAgIHwgWzEuLjU5XSBtaW51dGVzICAgICB8XG4gKiB8IDEgLi4uIDIzIGhycyAgICAgICAgICAgfCBbMS4uMjNdIGhvdXJzICAgICAgIHxcbiAqIHwgMSAuLi4gMjkgZGF5cyAgICAgICAgICB8IFsxLi4yOV0gZGF5cyAgICAgICAgfFxuICogfCAxIC4uLiAxMSBtb250aHMgICAgICAgIHwgWzEuLjExXSBtb250aHMgICAgICB8XG4gKiB8IDEgLi4uIE4geWVhcnMgICAgICAgICAgfCBbMS4uTl0gIHllYXJzICAgICAgIHxcbiAqXG4gKiBAcGFyYW0ge0RhdGV8TnVtYmVyfSBkYXRlIC0gdGhlIGdpdmVuIGRhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBhbiBvYmplY3Qgd2l0aCBvcHRpb25zLlxuICogQHBhcmFtIHtCb29sZWFufSBbb3B0aW9ucy5hZGRTdWZmaXg9ZmFsc2VdIC0gcmVzdWx0IGluZGljYXRlcyBpZiB0aGUgc2Vjb25kIGRhdGUgaXMgZWFybGllciBvciBsYXRlciB0aGFuIHRoZSBmaXJzdFxuICogQHBhcmFtIHsnc2Vjb25kJ3wnbWludXRlJ3wnaG91cid8J2RheSd8J21vbnRoJ3wneWVhcid9IFtvcHRpb25zLnVuaXRdIC0gaWYgc3BlY2lmaWVkLCB3aWxsIGZvcmNlIGEgdW5pdFxuICogQHBhcmFtIHsnZmxvb3InfCdjZWlsJ3wncm91bmQnfSBbb3B0aW9ucy5yb3VuZGluZ01ldGhvZD0ncm91bmQnXSAtIHdoaWNoIHdheSB0byByb3VuZCBwYXJ0aWFsIHVuaXRzXG4gKiBAcGFyYW0ge0xvY2FsZX0gW29wdGlvbnMubG9jYWxlPWRlZmF1bHRMb2NhbGVdIC0gdGhlIGxvY2FsZSBvYmplY3QuIFNlZSBbTG9jYWxlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL0xvY2FsZX1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IHRoZSBkaXN0YW5jZSBpbiB3b3Jkc1xuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgZGF0ZWAgbXVzdCBub3QgYmUgSW52YWxpZCBEYXRlXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0RGlzdGFuY2VgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDEgSmFudWFyeSAyMDE1LCB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAyIEp1bHkgMjAxND9cbiAqIGNvbnN0IHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpXG4gKiApXG4gKiAvLz0+ICc2IG1vbnRocydcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgbm93IGlzIDEgSmFudWFyeSAyMDE1IDAwOjAwOjAwLFxuICogLy8gd2hhdCBpcyB0aGUgZGlzdGFuY2UgdG8gMSBKYW51YXJ5IDIwMTUgMDA6MDA6MTUsIGluY2x1ZGluZyBzZWNvbmRzP1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNSwgMCwgMSwgMCwgMCwgMTUpXG4gKiApXG4gKiAvLz0+ICcxNSBzZWNvbmRzJ1xuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyAxIEphbnVhcnkgMjAxNSxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE2LCB3aXRoIGEgc3VmZml4P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChcbiAqICAgbmV3IERhdGUoMjAxNiwgMCwgMSksXG4gKiAgIHthZGRTdWZmaXg6IHRydWV9XG4gKiApXG4gKiAvLz0+ICdpbiAxIHllYXInXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElmIHRvZGF5IGlzIDI4IEphbnVhcnkgMjAxNSxcbiAqIC8vIHdoYXQgaXMgdGhlIGRpc3RhbmNlIHRvIDEgSmFudWFyeSAyMDE1LCBpbiBtb250aHMsIHJvdW5kZWQgdXA/P1xuICogY29uc3QgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdChuZXcgRGF0ZSgyMDE1LCAwLCAxKSwge1xuICogICB1bml0OiAnbW9udGgnLFxuICogICByb3VuZGluZ01ldGhvZDogJ2NlaWwnXG4gKiB9KVxuICogLy89PiAnMSBtb250aCdcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gSWYgdG9kYXkgaXMgMSBKYW51YXJ5IDIwMTUsXG4gKiAvLyB3aGF0IGlzIHRoZSBkaXN0YW5jZSB0byAxIEphbnVhcnkgMjAxNiBpbiBFc3BlcmFudG8/XG4gKiBjb25zdCBlb0xvY2FsZSA9IHJlcXVpcmUoJ2RhdGUtZm5zL2xvY2FsZS9lbycpXG4gKiBjb25zdCByZXN1bHQgPSBmb3JtYXREaXN0YW5jZVRvTm93U3RyaWN0KFxuICogICBuZXcgRGF0ZSgyMDE2LCAwLCAxKSxcbiAqICAge2xvY2FsZTogZW9Mb2NhbGV9XG4gKiApXG4gKiAvLz0+ICcxIGphcm8nXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QoZGlydHlEYXRlLCBvcHRpb25zKSB7XG4gIHJlcXVpcmVkQXJncygxLCBhcmd1bWVudHMpO1xuICByZXR1cm4gZm9ybWF0RGlzdGFuY2VTdHJpY3QoZGlydHlEYXRlLCBEYXRlLm5vdygpLCBvcHRpb25zKTtcbn0iLCJpbXBvcnQgdG9EYXRlIGZyb20gXCIuLi90b0RhdGUvaW5kZXguanNcIjtcbmltcG9ydCByZXF1aXJlZEFyZ3MgZnJvbSBcIi4uL19saWIvcmVxdWlyZWRBcmdzL2luZGV4LmpzXCI7XG4vKipcbiAqIEBuYW1lIGlzUGFzdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgcGFzdD9cbiAqIEBwdXJlIGZhbHNlXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZ2l2ZW4gZGF0ZSBpbiB0aGUgcGFzdD9cbiAqXG4gKiA+IOKaoO+4jyBQbGVhc2Ugbm90ZSB0aGF0IHRoaXMgZnVuY3Rpb24gaXMgbm90IHByZXNlbnQgaW4gdGhlIEZQIHN1Ym1vZHVsZSBhc1xuICogPiBpdCB1c2VzIGBEYXRlLm5vdygpYCBpbnRlcm5hbGx5IGhlbmNlIGltcHVyZSBhbmQgY2FuJ3QgYmUgc2FmZWx5IGN1cnJpZWQuXG4gKlxuICogQHBhcmFtIHtEYXRlfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGUgaXMgaW4gdGhlIHBhc3RcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMSBhcmd1bWVudCByZXF1aXJlZFxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJZiB0b2RheSBpcyA2IE9jdG9iZXIgMjAxNCwgaXMgMiBKdWx5IDIwMTQgaW4gdGhlIHBhc3Q/XG4gKiBjb25zdCByZXN1bHQgPSBpc1Bhc3QobmV3IERhdGUoMjAxNCwgNiwgMikpXG4gKiAvLz0+IHRydWVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gaXNQYXN0KGRpcnR5RGF0ZSkge1xuICByZXF1aXJlZEFyZ3MoMSwgYXJndW1lbnRzKTtcbiAgcmV0dXJuIHRvRGF0ZShkaXJ0eURhdGUpLmdldFRpbWUoKSA8IERhdGUubm93KCk7XG59IiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fTtcbiAgICAvLyBUT0RPOiBSZW1vdmUgU3RyaW5nKClcbiAgICB2YXIgd2lkdGggPSBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgdmFyIGZvcm1hdCA9IGFyZ3MuZm9ybWF0c1t3aWR0aF0gfHwgYXJncy5mb3JtYXRzW2FyZ3MuZGVmYXVsdFdpZHRoXTtcbiAgICByZXR1cm4gZm9ybWF0O1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlJbmRleCwgb3B0aW9ucykge1xuICAgIHZhciBjb250ZXh0ID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy5jb250ZXh0ID8gU3RyaW5nKG9wdGlvbnMuY29udGV4dCkgOiAnc3RhbmRhbG9uZSc7XG4gICAgdmFyIHZhbHVlc0FycmF5O1xuICAgIGlmIChjb250ZXh0ID09PSAnZm9ybWF0dGluZycgJiYgYXJncy5mb3JtYXR0aW5nVmFsdWVzKSB7XG4gICAgICB2YXIgZGVmYXVsdFdpZHRoID0gYXJncy5kZWZhdWx0Rm9ybWF0dGluZ1dpZHRoIHx8IGFyZ3MuZGVmYXVsdFdpZHRoO1xuICAgICAgdmFyIHdpZHRoID0gb3B0aW9ucyAhPT0gbnVsbCAmJiBvcHRpb25zICE9PSB2b2lkIDAgJiYgb3B0aW9ucy53aWR0aCA/IFN0cmluZyhvcHRpb25zLndpZHRoKSA6IGRlZmF1bHRXaWR0aDtcbiAgICAgIHZhbHVlc0FycmF5ID0gYXJncy5mb3JtYXR0aW5nVmFsdWVzW3dpZHRoXSB8fCBhcmdzLmZvcm1hdHRpbmdWYWx1ZXNbZGVmYXVsdFdpZHRoXTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIF9kZWZhdWx0V2lkdGggPSBhcmdzLmRlZmF1bHRXaWR0aDtcbiAgICAgIHZhciBfd2lkdGggPSBvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLndpZHRoID8gU3RyaW5nKG9wdGlvbnMud2lkdGgpIDogYXJncy5kZWZhdWx0V2lkdGg7XG4gICAgICB2YWx1ZXNBcnJheSA9IGFyZ3MudmFsdWVzW193aWR0aF0gfHwgYXJncy52YWx1ZXNbX2RlZmF1bHRXaWR0aF07XG4gICAgfVxuICAgIHZhciBpbmRleCA9IGFyZ3MuYXJndW1lbnRDYWxsYmFjayA/IGFyZ3MuYXJndW1lbnRDYWxsYmFjayhkaXJ0eUluZGV4KSA6IGRpcnR5SW5kZXg7XG4gICAgLy8gQHRzLWlnbm9yZTogRm9yIHNvbWUgcmVhc29uIFR5cGVTY3JpcHQganVzdCBkb24ndCB3YW50IHRvIG1hdGNoIGl0LCBubyBtYXR0ZXIgaG93IGhhcmQgd2UgdHJ5LiBJIGNoYWxsZW5nZSB5b3UgdG8gdHJ5IHRvIHJlbW92ZSBpdCFcbiAgICByZXR1cm4gdmFsdWVzQXJyYXlbaW5kZXhdO1xuICB9O1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hGbihhcmdzKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuICAgIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgdmFyIG1hdGNoUGF0dGVybiA9IHdpZHRoICYmIGFyZ3MubWF0Y2hQYXR0ZXJuc1t3aWR0aF0gfHwgYXJncy5tYXRjaFBhdHRlcm5zW2FyZ3MuZGVmYXVsdE1hdGNoV2lkdGhdO1xuICAgIHZhciBtYXRjaFJlc3VsdCA9IHN0cmluZy5tYXRjaChtYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWF0Y2hlZFN0cmluZyA9IG1hdGNoUmVzdWx0WzBdO1xuICAgIHZhciBwYXJzZVBhdHRlcm5zID0gd2lkdGggJiYgYXJncy5wYXJzZVBhdHRlcm5zW3dpZHRoXSB8fCBhcmdzLnBhcnNlUGF0dGVybnNbYXJncy5kZWZhdWx0UGFyc2VXaWR0aF07XG4gICAgdmFyIGtleSA9IEFycmF5LmlzQXJyYXkocGFyc2VQYXR0ZXJucykgPyBmaW5kSW5kZXgocGFyc2VQYXR0ZXJucywgZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3QobWF0Y2hlZFN0cmluZyk7XG4gICAgfSkgOiBmaW5kS2V5KHBhcnNlUGF0dGVybnMsIGZ1bmN0aW9uIChwYXR0ZXJuKSB7XG4gICAgICByZXR1cm4gcGF0dGVybi50ZXN0KG1hdGNoZWRTdHJpbmcpO1xuICAgIH0pO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IGFyZ3MudmFsdWVDYWxsYmFjayA/IGFyZ3MudmFsdWVDYWxsYmFjayhrZXkpIDoga2V5O1xuICAgIHZhbHVlID0gb3B0aW9ucy52YWx1ZUNhbGxiYWNrID8gb3B0aW9ucy52YWx1ZUNhbGxiYWNrKHZhbHVlKSA6IHZhbHVlO1xuICAgIHZhciByZXN0ID0gc3RyaW5nLnNsaWNlKG1hdGNoZWRTdHJpbmcubGVuZ3RoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgcmVzdDogcmVzdFxuICAgIH07XG4gIH07XG59XG5mdW5jdGlvbiBmaW5kS2V5KG9iamVjdCwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KGtleSkgJiYgcHJlZGljYXRlKG9iamVjdFtrZXldKSkge1xuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGZpbmRJbmRleChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGZvciAodmFyIGtleSA9IDA7IGtleSA8IGFycmF5Lmxlbmd0aDsga2V5KyspIHtcbiAgICBpZiAocHJlZGljYXRlKGFycmF5W2tleV0pKSB7XG4gICAgICByZXR1cm4ga2V5O1xuICAgIH1cbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGJ1aWxkTWF0Y2hQYXR0ZXJuRm4oYXJncykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcbiAgICB2YXIgbWF0Y2hSZXN1bHQgPSBzdHJpbmcubWF0Y2goYXJncy5tYXRjaFBhdHRlcm4pO1xuICAgIGlmICghbWF0Y2hSZXN1bHQpIHJldHVybiBudWxsO1xuICAgIHZhciBtYXRjaGVkU3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgdmFyIHBhcnNlUmVzdWx0ID0gc3RyaW5nLm1hdGNoKGFyZ3MucGFyc2VQYXR0ZXJuKTtcbiAgICBpZiAoIXBhcnNlUmVzdWx0KSByZXR1cm4gbnVsbDtcbiAgICB2YXIgdmFsdWUgPSBhcmdzLnZhbHVlQ2FsbGJhY2sgPyBhcmdzLnZhbHVlQ2FsbGJhY2socGFyc2VSZXN1bHRbMF0pIDogcGFyc2VSZXN1bHRbMF07XG4gICAgdmFsdWUgPSBvcHRpb25zLnZhbHVlQ2FsbGJhY2sgPyBvcHRpb25zLnZhbHVlQ2FsbGJhY2sodmFsdWUpIDogdmFsdWU7XG4gICAgdmFyIHJlc3QgPSBzdHJpbmcuc2xpY2UobWF0Y2hlZFN0cmluZy5sZW5ndGgpO1xuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICByZXN0OiByZXN0XG4gICAgfTtcbiAgfTtcbn0iLCJ2YXIgZm9ybWF0RGlzdGFuY2VMb2NhbGUgPSB7XG4gIGxlc3NUaGFuWFNlY29uZHM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBzZWNvbmQnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICB4U2Vjb25kczoge1xuICAgIG9uZTogJzEgc2Vjb25kJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBzZWNvbmRzJ1xuICB9LFxuICBoYWxmQU1pbnV0ZTogJ2hhbGYgYSBtaW51dGUnLFxuICBsZXNzVGhhblhNaW51dGVzOiB7XG4gICAgb25lOiAnbGVzcyB0aGFuIGEgbWludXRlJyxcbiAgICBvdGhlcjogJ2xlc3MgdGhhbiB7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgeE1pbnV0ZXM6IHtcbiAgICBvbmU6ICcxIG1pbnV0ZScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gbWludXRlcydcbiAgfSxcbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4SG91cnM6IHtcbiAgICBvbmU6ICcxIGhvdXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IGhvdXJzJ1xuICB9LFxuICB4RGF5czoge1xuICAgIG9uZTogJzEgZGF5JyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSBkYXlzJ1xuICB9LFxuICBhYm91dFhXZWVrczoge1xuICAgIG9uZTogJ2Fib3V0IDEgd2VlaycsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIHhXZWVrczoge1xuICAgIG9uZTogJzEgd2VlaycsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gd2Vla3MnXG4gIH0sXG4gIGFib3V0WE1vbnRoczoge1xuICAgIG9uZTogJ2Fib3V0IDEgbW9udGgnLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgeE1vbnRoczoge1xuICAgIG9uZTogJzEgbW9udGgnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1vbnRocydcbiAgfSxcbiAgYWJvdXRYWWVhcnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIHllYXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IHllYXJzJ1xuICB9LFxuICB4WWVhcnM6IHtcbiAgICBvbmU6ICcxIHllYXInLFxuICAgIG90aGVyOiAne3tjb3VudH19IHllYXJzJ1xuICB9LFxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgIG90aGVyOiAnb3ZlciB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG4gIGFsbW9zdFhZZWFyczoge1xuICAgIG9uZTogJ2FsbW9zdCAxIHllYXInLFxuICAgIG90aGVyOiAnYWxtb3N0IHt7Y291bnR9fSB5ZWFycydcbiAgfVxufTtcbnZhciBmb3JtYXREaXN0YW5jZSA9IGZ1bmN0aW9uIGZvcm1hdERpc3RhbmNlKHRva2VuLCBjb3VudCwgb3B0aW9ucykge1xuICB2YXIgcmVzdWx0O1xuICB2YXIgdG9rZW5WYWx1ZSA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgaWYgKHR5cGVvZiB0b2tlblZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IHRva2VuVmFsdWU7XG4gIH0gZWxzZSBpZiAoY291bnQgPT09IDEpIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm9uZTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSB0b2tlblZhbHVlLm90aGVyLnJlcGxhY2UoJ3t7Y291bnR9fScsIGNvdW50LnRvU3RyaW5nKCkpO1xuICB9XG4gIGlmIChvcHRpb25zICE9PSBudWxsICYmIG9wdGlvbnMgIT09IHZvaWQgMCAmJiBvcHRpb25zLmFkZFN1ZmZpeCkge1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gJiYgb3B0aW9ucy5jb21wYXJpc29uID4gMCkge1xuICAgICAgcmV0dXJuICdpbiAnICsgcmVzdWx0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzdWx0ICsgJyBhZ28nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdERpc3RhbmNlOyIsImltcG9ydCBidWlsZEZvcm1hdExvbmdGbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZEZvcm1hdExvbmdGbi9pbmRleC5qc1wiO1xudmFyIGRhdGVGb3JtYXRzID0ge1xuICBmdWxsOiAnRUVFRSwgTU1NTSBkbywgeScsXG4gIGxvbmc6ICdNTU1NIGRvLCB5JyxcbiAgbWVkaXVtOiAnTU1NIGQsIHknLFxuICBzaG9ydDogJ01NL2RkL3l5eXknXG59O1xudmFyIHRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiAnaDptbTpzcyBhIHp6enonLFxuICBsb25nOiAnaDptbTpzcyBhIHonLFxuICBtZWRpdW06ICdoOm1tOnNzIGEnLFxuICBzaG9ydDogJ2g6bW0gYSdcbn07XG52YXIgZGF0ZVRpbWVGb3JtYXRzID0ge1xuICBmdWxsOiBcInt7ZGF0ZX19ICdhdCcge3t0aW1lfX1cIixcbiAgbG9uZzogXCJ7e2RhdGV9fSAnYXQnIHt7dGltZX19XCIsXG4gIG1lZGl1bTogJ3t7ZGF0ZX19LCB7e3RpbWV9fScsXG4gIHNob3J0OiAne3tkYXRlfX0sIHt7dGltZX19J1xufTtcbnZhciBmb3JtYXRMb25nID0ge1xuICBkYXRlOiBidWlsZEZvcm1hdExvbmdGbih7XG4gICAgZm9ybWF0czogZGF0ZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSksXG4gIHRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiB0aW1lRm9ybWF0cyxcbiAgICBkZWZhdWx0V2lkdGg6ICdmdWxsJ1xuICB9KSxcbiAgZGF0ZVRpbWU6IGJ1aWxkRm9ybWF0TG9uZ0ZuKHtcbiAgICBmb3JtYXRzOiBkYXRlVGltZUZvcm1hdHMsXG4gICAgZGVmYXVsdFdpZHRoOiAnZnVsbCdcbiAgfSlcbn07XG5leHBvcnQgZGVmYXVsdCBmb3JtYXRMb25nOyIsInZhciBmb3JtYXRSZWxhdGl2ZUxvY2FsZSA9IHtcbiAgbGFzdFdlZWs6IFwiJ2xhc3QnIGVlZWUgJ2F0JyBwXCIsXG4gIHllc3RlcmRheTogXCIneWVzdGVyZGF5IGF0JyBwXCIsXG4gIHRvZGF5OiBcIid0b2RheSBhdCcgcFwiLFxuICB0b21vcnJvdzogXCIndG9tb3Jyb3cgYXQnIHBcIixcbiAgbmV4dFdlZWs6IFwiZWVlZSAnYXQnIHBcIixcbiAgb3RoZXI6ICdQJ1xufTtcbnZhciBmb3JtYXRSZWxhdGl2ZSA9IGZ1bmN0aW9uIGZvcm1hdFJlbGF0aXZlKHRva2VuLCBfZGF0ZSwgX2Jhc2VEYXRlLCBfb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dO1xufTtcbmV4cG9ydCBkZWZhdWx0IGZvcm1hdFJlbGF0aXZlOyIsImltcG9ydCBidWlsZExvY2FsaXplRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRMb2NhbGl6ZUZuL2luZGV4LmpzXCI7XG52YXIgZXJhVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnQicsICdBJ10sXG4gIGFiYnJldmlhdGVkOiBbJ0JDJywgJ0FEJ10sXG4gIHdpZGU6IFsnQmVmb3JlIENocmlzdCcsICdBbm5vIERvbWluaSddXG59O1xudmFyIHF1YXJ0ZXJWYWx1ZXMgPSB7XG4gIG5hcnJvdzogWycxJywgJzInLCAnMycsICc0J10sXG4gIGFiYnJldmlhdGVkOiBbJ1ExJywgJ1EyJywgJ1EzJywgJ1E0J10sXG4gIHdpZGU6IFsnMXN0IHF1YXJ0ZXInLCAnMm5kIHF1YXJ0ZXInLCAnM3JkIHF1YXJ0ZXInLCAnNHRoIHF1YXJ0ZXInXVxufTtcblxuLy8gTm90ZTogaW4gRW5nbGlzaCwgdGhlIG5hbWVzIG9mIGRheXMgb2YgdGhlIHdlZWsgYW5kIG1vbnRocyBhcmUgY2FwaXRhbGl6ZWQuXG4vLyBJZiB5b3UgYXJlIG1ha2luZyBhIG5ldyBsb2NhbGUgYmFzZWQgb24gdGhpcyBvbmUsIGNoZWNrIGlmIHRoZSBzYW1lIGlzIHRydWUgZm9yIHRoZSBsYW5ndWFnZSB5b3UncmUgd29ya2luZyBvbi5cbi8vIEdlbmVyYWxseSwgZm9ybWF0dGVkIGRhdGVzIHNob3VsZCBsb29rIGxpa2UgdGhleSBhcmUgaW4gdGhlIG1pZGRsZSBvZiBhIHNlbnRlbmNlLFxuLy8gZS5nLiBpbiBTcGFuaXNoIGxhbmd1YWdlIHRoZSB3ZWVrZGF5cyBhbmQgbW9udGhzIHNob3VsZCBiZSBpbiB0aGUgbG93ZXJjYXNlLlxudmFyIG1vbnRoVmFsdWVzID0ge1xuICBuYXJyb3c6IFsnSicsICdGJywgJ00nLCAnQScsICdNJywgJ0onLCAnSicsICdBJywgJ1MnLCAnTycsICdOJywgJ0QnXSxcbiAgYWJicmV2aWF0ZWQ6IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXSxcbiAgd2lkZTogWydKYW51YXJ5JywgJ0ZlYnJ1YXJ5JywgJ01hcmNoJywgJ0FwcmlsJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPY3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlY2VtYmVyJ11cbn07XG52YXIgZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFsnUycsICdNJywgJ1QnLCAnVycsICdUJywgJ0YnLCAnUyddLFxuICBzaG9ydDogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICBhYmJyZXZpYXRlZDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAgd2lkZTogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG59O1xudmFyIGRheVBlcmlvZFZhbHVlcyA9IHtcbiAgbmFycm93OiB7XG4gICAgYW06ICdhJyxcbiAgICBwbTogJ3AnLFxuICAgIG1pZG5pZ2h0OiAnbWknLFxuICAgIG5vb246ICduJyxcbiAgICBtb3JuaW5nOiAnbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnZXZlbmluZycsXG4gICAgbmlnaHQ6ICduaWdodCdcbiAgfSxcbiAgYWJicmV2aWF0ZWQ6IHtcbiAgICBhbTogJ0FNJyxcbiAgICBwbTogJ1BNJyxcbiAgICBtaWRuaWdodDogJ21pZG5pZ2h0JyxcbiAgICBub29uOiAnbm9vbicsXG4gICAgbW9ybmluZzogJ21vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2FmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2V2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnbmlnaHQnXG4gIH0sXG4gIHdpZGU6IHtcbiAgICBhbTogJ2EubS4nLFxuICAgIHBtOiAncC5tLicsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdldmVuaW5nJyxcbiAgICBuaWdodDogJ25pZ2h0J1xuICB9XG59O1xudmFyIGZvcm1hdHRpbmdEYXlQZXJpb2RWYWx1ZXMgPSB7XG4gIG5hcnJvdzoge1xuICAgIGFtOiAnYScsXG4gICAgcG06ICdwJyxcbiAgICBtaWRuaWdodDogJ21pJyxcbiAgICBub29uOiAnbicsXG4gICAgbW9ybmluZzogJ2luIHRoZSBtb3JuaW5nJyxcbiAgICBhZnRlcm5vb246ICdpbiB0aGUgYWZ0ZXJub29uJyxcbiAgICBldmVuaW5nOiAnaW4gdGhlIGV2ZW5pbmcnLFxuICAgIG5pZ2h0OiAnYXQgbmlnaHQnXG4gIH0sXG4gIGFiYnJldmlhdGVkOiB7XG4gICAgYW06ICdBTScsXG4gICAgcG06ICdQTScsXG4gICAgbWlkbmlnaHQ6ICdtaWRuaWdodCcsXG4gICAgbm9vbjogJ25vb24nLFxuICAgIG1vcm5pbmc6ICdpbiB0aGUgbW9ybmluZycsXG4gICAgYWZ0ZXJub29uOiAnaW4gdGhlIGFmdGVybm9vbicsXG4gICAgZXZlbmluZzogJ2luIHRoZSBldmVuaW5nJyxcbiAgICBuaWdodDogJ2F0IG5pZ2h0J1xuICB9LFxuICB3aWRlOiB7XG4gICAgYW06ICdhLm0uJyxcbiAgICBwbTogJ3AubS4nLFxuICAgIG1pZG5pZ2h0OiAnbWlkbmlnaHQnLFxuICAgIG5vb246ICdub29uJyxcbiAgICBtb3JuaW5nOiAnaW4gdGhlIG1vcm5pbmcnLFxuICAgIGFmdGVybm9vbjogJ2luIHRoZSBhZnRlcm5vb24nLFxuICAgIGV2ZW5pbmc6ICdpbiB0aGUgZXZlbmluZycsXG4gICAgbmlnaHQ6ICdhdCBuaWdodCdcbiAgfVxufTtcbnZhciBvcmRpbmFsTnVtYmVyID0gZnVuY3Rpb24gb3JkaW5hbE51bWJlcihkaXJ0eU51bWJlciwgX29wdGlvbnMpIHtcbiAgdmFyIG51bWJlciA9IE51bWJlcihkaXJ0eU51bWJlcik7XG5cbiAgLy8gSWYgb3JkaW5hbCBudW1iZXJzIGRlcGVuZCBvbiBjb250ZXh0LCBmb3IgZXhhbXBsZSxcbiAgLy8gaWYgdGhleSBhcmUgZGlmZmVyZW50IGZvciBkaWZmZXJlbnQgZ3JhbW1hdGljYWwgZ2VuZGVycyxcbiAgLy8gdXNlIGBvcHRpb25zLnVuaXRgLlxuICAvL1xuICAvLyBgdW5pdGAgY2FuIGJlICd5ZWFyJywgJ3F1YXJ0ZXInLCAnbW9udGgnLCAnd2VlaycsICdkYXRlJywgJ2RheU9mWWVhcicsXG4gIC8vICdkYXknLCAnaG91cicsICdtaW51dGUnLCAnc2Vjb25kJy5cblxuICB2YXIgcmVtMTAwID0gbnVtYmVyICUgMTAwO1xuICBpZiAocmVtMTAwID4gMjAgfHwgcmVtMTAwIDwgMTApIHtcbiAgICBzd2l0Y2ggKHJlbTEwMCAlIDEwKSB7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBudW1iZXIgKyAnc3QnO1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgcmV0dXJuIG51bWJlciArICdyZCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBudW1iZXIgKyAndGgnO1xufTtcbnZhciBsb2NhbGl6ZSA9IHtcbiAgb3JkaW5hbE51bWJlcjogb3JkaW5hbE51bWJlcixcbiAgZXJhOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogZXJhVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZExvY2FsaXplRm4oe1xuICAgIHZhbHVlczogcXVhcnRlclZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBhcmd1bWVudENhbGxiYWNrOiBmdW5jdGlvbiBhcmd1bWVudENhbGxiYWNrKHF1YXJ0ZXIpIHtcbiAgICAgIHJldHVybiBxdWFydGVyIC0gMTtcbiAgICB9XG4gIH0pLFxuICBtb250aDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IG1vbnRoVmFsdWVzLFxuICAgIGRlZmF1bHRXaWR0aDogJ3dpZGUnXG4gIH0pLFxuICBkYXk6IGJ1aWxkTG9jYWxpemVGbih7XG4gICAgdmFsdWVzOiBkYXlWYWx1ZXMsXG4gICAgZGVmYXVsdFdpZHRoOiAnd2lkZSdcbiAgfSksXG4gIGRheVBlcmlvZDogYnVpbGRMb2NhbGl6ZUZuKHtcbiAgICB2YWx1ZXM6IGRheVBlcmlvZFZhbHVlcyxcbiAgICBkZWZhdWx0V2lkdGg6ICd3aWRlJyxcbiAgICBmb3JtYXR0aW5nVmFsdWVzOiBmb3JtYXR0aW5nRGF5UGVyaW9kVmFsdWVzLFxuICAgIGRlZmF1bHRGb3JtYXR0aW5nV2lkdGg6ICd3aWRlJ1xuICB9KVxufTtcbmV4cG9ydCBkZWZhdWx0IGxvY2FsaXplOyIsImltcG9ydCBidWlsZE1hdGNoRm4gZnJvbSBcIi4uLy4uLy4uL19saWIvYnVpbGRNYXRjaEZuL2luZGV4LmpzXCI7XG5pbXBvcnQgYnVpbGRNYXRjaFBhdHRlcm5GbiBmcm9tIFwiLi4vLi4vLi4vX2xpYi9idWlsZE1hdGNoUGF0dGVybkZuL2luZGV4LmpzXCI7XG52YXIgbWF0Y2hPcmRpbmFsTnVtYmVyUGF0dGVybiA9IC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaTtcbnZhciBwYXJzZU9yZGluYWxOdW1iZXJQYXR0ZXJuID0gL1xcZCsvaTtcbnZhciBtYXRjaEVyYVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGJ8YSkvaSxcbiAgYWJicmV2aWF0ZWQ6IC9eKGJcXC4/XFxzP2NcXC4/fGJcXC4/XFxzP2NcXC4/XFxzP2VcXC4/fGFcXC4/XFxzP2RcXC4/fGNcXC4/XFxzP2VcXC4/KS9pLFxuICB3aWRlOiAvXihiZWZvcmUgY2hyaXN0fGJlZm9yZSBjb21tb24gZXJhfGFubm8gZG9taW5pfGNvbW1vbiBlcmEpL2lcbn07XG52YXIgcGFyc2VFcmFQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15iL2ksIC9eKGF8YykvaV1cbn07XG52YXIgbWF0Y2hRdWFydGVyUGF0dGVybnMgPSB7XG4gIG5hcnJvdzogL15bMTIzNF0vaSxcbiAgYWJicmV2aWF0ZWQ6IC9ecVsxMjM0XS9pLFxuICB3aWRlOiAvXlsxMjM0XSh0aHxzdHxuZHxyZCk/IHF1YXJ0ZXIvaVxufTtcbnZhciBwYXJzZVF1YXJ0ZXJQYXR0ZXJucyA9IHtcbiAgYW55OiBbLzEvaSwgLzIvaSwgLzMvaSwgLzQvaV1cbn07XG52YXIgbWF0Y2hNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW2pmbWFzb25kXS9pLFxuICBhYmJyZXZpYXRlZDogL14oamFufGZlYnxtYXJ8YXByfG1heXxqdW58anVsfGF1Z3xzZXB8b2N0fG5vdnxkZWMpL2ksXG4gIHdpZGU6IC9eKGphbnVhcnl8ZmVicnVhcnl8bWFyY2h8YXByaWx8bWF5fGp1bmV8anVseXxhdWd1c3R8c2VwdGVtYmVyfG9jdG9iZXJ8bm92ZW1iZXJ8ZGVjZW1iZXIpL2lcbn07XG52YXIgcGFyc2VNb250aFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IFsvXmovaSwgL15mL2ksIC9ebS9pLCAvXmEvaSwgL15tL2ksIC9eai9pLCAvXmovaSwgL15hL2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXSxcbiAgYW55OiBbL15qYS9pLCAvXmYvaSwgL15tYXIvaSwgL15hcC9pLCAvXm1heS9pLCAvXmp1bi9pLCAvXmp1bC9pLCAvXmF1L2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXVxufTtcbnZhciBtYXRjaERheVBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eW3NtdHdmXS9pLFxuICBzaG9ydDogL14oc3V8bW98dHV8d2V8dGh8ZnJ8c2EpL2ksXG4gIGFiYnJldmlhdGVkOiAvXihzdW58bW9ufHR1ZXx3ZWR8dGh1fGZyaXxzYXQpL2ksXG4gIHdpZGU6IC9eKHN1bmRheXxtb25kYXl8dHVlc2RheXx3ZWRuZXNkYXl8dGh1cnNkYXl8ZnJpZGF5fHNhdHVyZGF5KS9pXG59O1xudmFyIHBhcnNlRGF5UGF0dGVybnMgPSB7XG4gIG5hcnJvdzogWy9ecy9pLCAvXm0vaSwgL150L2ksIC9edy9pLCAvXnQvaSwgL15mL2ksIC9ecy9pXSxcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXVxufTtcbnZhciBtYXRjaERheVBlcmlvZFBhdHRlcm5zID0ge1xuICBuYXJyb3c6IC9eKGF8cHxtaXxufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaSxcbiAgYW55OiAvXihbYXBdXFwuP1xccz9tXFwuP3xtaWRuaWdodHxub29ufChpbiB0aGV8YXQpIChtb3JuaW5nfGFmdGVybm9vbnxldmVuaW5nfG5pZ2h0KSkvaVxufTtcbnZhciBwYXJzZURheVBlcmlvZFBhdHRlcm5zID0ge1xuICBhbnk6IHtcbiAgICBhbTogL15hL2ksXG4gICAgcG06IC9ecC9pLFxuICAgIG1pZG5pZ2h0OiAvXm1pL2ksXG4gICAgbm9vbjogL15uby9pLFxuICAgIG1vcm5pbmc6IC9tb3JuaW5nL2ksXG4gICAgYWZ0ZXJub29uOiAvYWZ0ZXJub29uL2ksXG4gICAgZXZlbmluZzogL2V2ZW5pbmcvaSxcbiAgICBuaWdodDogL25pZ2h0L2lcbiAgfVxufTtcbnZhciBtYXRjaCA9IHtcbiAgb3JkaW5hbE51bWJlcjogYnVpbGRNYXRjaFBhdHRlcm5Gbih7XG4gICAgbWF0Y2hQYXR0ZXJuOiBtYXRjaE9yZGluYWxOdW1iZXJQYXR0ZXJuLFxuICAgIHBhcnNlUGF0dGVybjogcGFyc2VPcmRpbmFsTnVtYmVyUGF0dGVybixcbiAgICB2YWx1ZUNhbGxiYWNrOiBmdW5jdGlvbiB2YWx1ZUNhbGxiYWNrKHZhbHVlKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcbiAgICB9XG4gIH0pLFxuICBlcmE6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hFcmFQYXR0ZXJucyxcbiAgICBkZWZhdWx0TWF0Y2hXaWR0aDogJ3dpZGUnLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRXJhUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pLFxuICBxdWFydGVyOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoUXVhcnRlclBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VRdWFydGVyUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknLFxuICAgIHZhbHVlQ2FsbGJhY2s6IGZ1bmN0aW9uIHZhbHVlQ2FsbGJhY2soaW5kZXgpIHtcbiAgICAgIHJldHVybiBpbmRleCArIDE7XG4gICAgfVxuICB9KSxcbiAgbW9udGg6IGJ1aWxkTWF0Y2hGbih7XG4gICAgbWF0Y2hQYXR0ZXJuczogbWF0Y2hNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRNYXRjaFdpZHRoOiAnd2lkZScsXG4gICAgcGFyc2VQYXR0ZXJuczogcGFyc2VNb250aFBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgZGF5OiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICd3aWRlJyxcbiAgICBwYXJzZVBhdHRlcm5zOiBwYXJzZURheVBhdHRlcm5zLFxuICAgIGRlZmF1bHRQYXJzZVdpZHRoOiAnYW55J1xuICB9KSxcbiAgZGF5UGVyaW9kOiBidWlsZE1hdGNoRm4oe1xuICAgIG1hdGNoUGF0dGVybnM6IG1hdGNoRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdE1hdGNoV2lkdGg6ICdhbnknLFxuICAgIHBhcnNlUGF0dGVybnM6IHBhcnNlRGF5UGVyaW9kUGF0dGVybnMsXG4gICAgZGVmYXVsdFBhcnNlV2lkdGg6ICdhbnknXG4gIH0pXG59O1xuZXhwb3J0IGRlZmF1bHQgbWF0Y2g7IiwiaW1wb3J0IGZvcm1hdERpc3RhbmNlIGZyb20gXCIuL19saWIvZm9ybWF0RGlzdGFuY2UvaW5kZXguanNcIjtcbmltcG9ydCBmb3JtYXRMb25nIGZyb20gXCIuL19saWIvZm9ybWF0TG9uZy9pbmRleC5qc1wiO1xuaW1wb3J0IGZvcm1hdFJlbGF0aXZlIGZyb20gXCIuL19saWIvZm9ybWF0UmVsYXRpdmUvaW5kZXguanNcIjtcbmltcG9ydCBsb2NhbGl6ZSBmcm9tIFwiLi9fbGliL2xvY2FsaXplL2luZGV4LmpzXCI7XG5pbXBvcnQgbWF0Y2ggZnJvbSBcIi4vX2xpYi9tYXRjaC9pbmRleC5qc1wiO1xuLyoqXG4gKiBAdHlwZSB7TG9jYWxlfVxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICogQGF1dGhvciBTYXNoYSBLb3NzIFtAa29zc25vY29ycF17QGxpbmsgaHR0cHM6Ly9naXRodWIuY29tL2tvc3Nub2NvcnB9XG4gKiBAYXV0aG9yIExlc2hhIEtvc3MgW0BsZXNoYWtvc3Nde0BsaW5rIGh0dHBzOi8vZ2l0aHViLmNvbS9sZXNoYWtvc3N9XG4gKi9cbnZhciBsb2NhbGUgPSB7XG4gIGNvZGU6ICdlbi1VUycsXG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxXG4gIH1cbn07XG5leHBvcnQgZGVmYXVsdCBsb2NhbGU7IiwiaW1wb3J0IF90eXBlb2YgZnJvbSBcIkBiYWJlbC9ydW50aW1lL2hlbHBlcnMvZXNtL3R5cGVvZlwiO1xuaW1wb3J0IHJlcXVpcmVkQXJncyBmcm9tIFwiLi4vX2xpYi9yZXF1aXJlZEFyZ3MvaW5kZXguanNcIjtcbi8qKlxuICogQG5hbWUgdG9EYXRlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IENvbnZlcnQgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIGFuIGluc3RhbmNlIG9mIERhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhbiBpbnN0YW5jZSBvZiBEYXRlLCB0aGUgZnVuY3Rpb24gcmV0dXJucyBpdHMgY2xvbmUuXG4gKlxuICogSWYgdGhlIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBpdCBpcyB0cmVhdGVkIGFzIGEgdGltZXN0YW1wLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBub25lIG9mIHRoZSBhYm92ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgSW52YWxpZCBEYXRlLlxuICpcbiAqICoqTm90ZSoqOiAqYWxsKiBEYXRlIGFyZ3VtZW50cyBwYXNzZWQgdG8gYW55ICpkYXRlLWZucyogZnVuY3Rpb24gaXMgcHJvY2Vzc2VkIGJ5IGB0b0RhdGVgLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxOdW1iZXJ9IGFyZ3VtZW50IC0gdGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENsb25lIHRoZSBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKG5ldyBEYXRlKDIwMTQsIDEsIDExLCAxMSwgMzAsIDMwKSlcbiAqIC8vPT4gVHVlIEZlYiAxMSAyMDE0IDExOjMwOjMwXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENvbnZlcnQgdGhlIHRpbWVzdGFtcCB0byBkYXRlOlxuICogY29uc3QgcmVzdWx0ID0gdG9EYXRlKDEzOTIwOTg0MzAwMDApXG4gKiAvLz0+IFR1ZSBGZWIgMTEgMjAxNCAxMTozMDozMFxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0b0RhdGUoYXJndW1lbnQpIHtcbiAgcmVxdWlyZWRBcmdzKDEsIGFyZ3VtZW50cyk7XG4gIHZhciBhcmdTdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJndW1lbnQpO1xuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUgfHwgX3R5cGVvZihhcmd1bWVudCkgPT09ICdvYmplY3QnICYmIGFyZ1N0ciA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgLy8gUHJldmVudCB0aGUgZGF0ZSB0byBsb3NlIHRoZSBtaWxsaXNlY29uZHMgd2hlbiBwYXNzZWQgdG8gbmV3IERhdGUoKSBpbiBJRTEwXG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50LmdldFRpbWUoKSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGFyZ3VtZW50ID09PSAnbnVtYmVyJyB8fCBhcmdTdHIgPT09ICdbb2JqZWN0IE51bWJlcl0nKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKGFyZ3VtZW50KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoKHR5cGVvZiBhcmd1bWVudCA9PT0gJ3N0cmluZycgfHwgYXJnU3RyID09PSAnW29iamVjdCBTdHJpbmddJykgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgICAgY29uc29sZS53YXJuKFwiU3RhcnRpbmcgd2l0aCB2Mi4wLjAtYmV0YS4xIGRhdGUtZm5zIGRvZXNuJ3QgYWNjZXB0IHN0cmluZ3MgYXMgZGF0ZSBhcmd1bWVudHMuIFBsZWFzZSB1c2UgYHBhcnNlSVNPYCB0byBwYXJzZSBzdHJpbmdzLiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9ibG9iL21hc3Rlci9kb2NzL3VwZ3JhZGVHdWlkZS5tZCNzdHJpbmctYXJndW1lbnRzXCIpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihuZXcgRXJyb3IoKS5zdGFjayk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRGF0ZShOYU4pO1xuICB9XG59IiwiZXhwb3J0IGNvbnN0IFB1YlN1YiA9ICgoKSA9PiB7XG4gIGNvbnN0IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSA9IC0xO1xuICBjb25zdCBldmVudHMgPSB7fTtcblxuICBmdW5jdGlvbiBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpIHtcbiAgICBjb25zb2xlLmxvZyhgW2RlYnVnXSBFVkVOVCAke2V2ZW50fSBJUyBDQUxMRURgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVtaXQoZXZlbnQsIHBhcmFtID0gbnVsbCkge1xuICAgIGlmIChldmVudHNbZXZlbnRdKSB7XG4gICAgICBkZWJ1Z0V2ZW50QW5ub3VuY2UoZXZlbnQpO1xuICAgICAgZm9yIChsZXQgZnVuYyBvZiBldmVudHNbZXZlbnRdKSB7XG4gICAgICAgIGZ1bmMocGFyYW0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydChgVGhlcmUgaXMgbm8gZXZlbnQgd2l0aCBhIG5hbWUgJyR7ZXZlbnR9J2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50LCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50c1tldmVudF0pIHtcbiAgICAgIGV2ZW50c1tldmVudF0ucHVzaChmdW5jKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzW2V2ZW50XSA9IFtmdW5jXTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvZmYoZXZlbnQsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnRzW2V2ZW50XSkge1xuICAgICAgY29uc3QgaW5kZXhPZkdpdmVuRnVuY3Rpb24gPSBldmVudHNbZXZlbnRdLmluZGV4T2YoZnVuYyk7XG4gICAgICBpZiAoaW5kZXhPZkdpdmVuRnVuY3Rpb24gIT09IE5PVF9QUkVTRU5UX0lOX1RIRV9BUlJBWSkge1xuICAgICAgICBldmVudHNbZXZlbnRdLnNwbGljZShpbmRleE9mR2l2ZW5GdW5jdGlvbiwgMSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsZXJ0KFxuICAgICAgICBgVGhlcmUgaXMgZWl0aGVyIG5vIHN1Y2ggZXZlbnQgKCR7ZXZlbnR9KSByZWdpc3RlcmVkLCBvciB5b3VyIGZ1bmN0aW9uIGlzbid0IHByZXNlbnQgdGhlcmVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGVtaXQsIG9uLCBvZmYgfTtcbn0pKCk7XG4iLCJjb25zdCB7IFB1YlN1YiB9ID0gcmVxdWlyZShcIi4uL1B1YlN1YlwiKTtcbmltcG9ydCAqIGFzIGZvcm1VdGlscyBmcm9tIFwiLi9mb3JtLXV0aWxpdGllc1wiO1xuaW1wb3J0IHsgU3VidGFza01hbmFnZXIgfSBmcm9tIFwiLi9tYW5hZ2Vycy9zdWJ0YXNrLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IEZPUk1fUkVHSVNUUlkgPSB7fTtcbmNvbnN0IE1PREVTID0geyBDUkVBVElPTjogMCwgRURJVElORzogMSwgSU5GT1JNQVRJT046IDIgfTtcblxuY29uc3QgY3JlYXRlU3VidGFza0J1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY3JlYXRlLXN1YnRhc2stYnV0dG9uXCIpO1xuY3JlYXRlU3VidGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY3JlYXRlU3VidGFzayk7XG5cbmNvbnN0IGxpc3RGb3JtID0gcmVnaXN0ZXJGb3JtKFwibGlzdC1mb3JtLWJhY2tncm91bmRcIiwgXCJMaXN0XCIpO1xuY29uc3QgdGFza0Zvcm0gPSByZWdpc3RlckZvcm0oXCJ0YXNrLWZvcm0tYmFja2dyb3VuZFwiLCBcIlRhc2tcIik7XG5jb25zdCBwYXJlbnRMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwYXJlbnRMaXN0XCIpO1xucmVnaXN0ZXJNYW5hZ2VyKFxuICB0YXNrRm9ybSxcbiAgbmV3IFN1YnRhc2tNYW5hZ2VyKHRhc2tGb3JtKSxcbiAgXCJzdWJ0YXNrTWFuYWdlclwiLFxuICBcInN1YnRhc2tzXCJcbik7XG5cbmZ1bmN0aW9uIHJlZ2lzdGVyTWFuYWdlcihcbiAgd29ya2luZ0Zvcm0sXG4gIG1hbmFnZXJSZWZlcmVuY2UsXG4gIG1hbmFnZXJOYW1lLFxuICBpbnB1dFByb3BlcnR5TmFtZVxuKSB7XG4gIHdvcmtpbmdGb3JtLm1hbmFnZXJzW21hbmFnZXJOYW1lXSA9IHtcbiAgICByZWZlcmVuY2U6IG1hbmFnZXJSZWZlcmVuY2UsXG4gICAgbmFtZTogaW5wdXRQcm9wZXJ0eU5hbWUsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVN1YnRhc2soKSB7XG4gIGNvbnN0IHN1YnRhc2tNYW5hZ2VyUmVmZXJlbmNlID0gdGFza0Zvcm0ubWFuYWdlcnMuc3VidGFza01hbmFnZXIucmVmZXJlbmNlO1xuICBpZiAoIXN1YnRhc2tNYW5hZ2VyUmVmZXJlbmNlLmlzSW5zaWRlUGFyZW50Rm9ybSgpKSB7XG4gICAgY29uc3Qgcm93cyA9IHRhc2tGb3JtLmZvcm0ucXVlcnlTZWxlY3RvckFsbChcIi5yb3dcIik7XG4gICAgY29uc3QgbGFzdFJvdyA9IHJvd3Nbcm93cy5sZW5ndGggLSAxXTtcbiAgICBzdWJ0YXNrTWFuYWdlclJlZmVyZW5jZS5zZXR1cCh7XG4gICAgICBub2RlQmVmb3JlV2hpY2hUb1B1dFNlY3Rpb246IGxhc3RSb3csXG4gICAgfSk7XG4gIH1cbiAgc3VidGFza01hbmFnZXJSZWZlcmVuY2UuYWRkU3VidGFzaygpO1xufVxuXG5mdW5jdGlvbiByZWdpc3RlckZvcm0oYmFja2dyb3VuZElkLCBjb2RlbmFtZSkge1xuICBGT1JNX1JFR0lTVFJZW2NvZGVuYW1lXSA9IGNvZGVuYW1lO1xuICBjb25zdCBmb3JtQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGJhY2tncm91bmRJZCk7XG4gIHJldHVybiB7XG4gICAgYmFja2dyb3VuZDogZm9ybUJhY2tncm91bmQsXG4gICAgZm9ybTogZm9ybUJhY2tncm91bmQucXVlcnlTZWxlY3RvcihcImZvcm1cIiksXG4gICAgdGl0bGU6IGZvcm1CYWNrZ3JvdW5kLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJmb3JtLXRpdGxlXCIpWzBdLFxuICAgIG1vZGU6IE1PREVTLkNSRUFUSU9OLFxuICAgIG1hbmFnZXJzOiB7fSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybURhdGEoZm9ybVR5cGUpIHtcbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG5cbiAgY29uc3QgZm9ybUlucHV0RGF0YSA9IHt9O1xuICBBcnJheS5mcm9tKHdvcmtpbmdGb3JtLmZvcm0uZWxlbWVudHMpLmZvckVhY2goKGN1cnJlbnQpID0+IHtcbiAgICBpZiAoY3VycmVudC5ub2RlTmFtZSAhPT0gXCJCVVRUT05cIikge1xuICAgICAgY29uc3QgaW5wdXRDb250ZW50VHlwZSA9IGN1cnJlbnQuaWQ7XG4gICAgICBmb3JtSW5wdXREYXRhW2lucHV0Q29udGVudFR5cGVdID0gZm9ybVV0aWxzLnRyaW1JbnB1dChjdXJyZW50LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuICBpZiAod29ya2luZ0Zvcm0ubWFuYWdlcnMpIHtcbiAgICBmb3IgKGxldCBtYW5hZ2VyIG9mIE9iamVjdC52YWx1ZXMod29ya2luZ0Zvcm0ubWFuYWdlcnMpKSB7XG4gICAgICBjb25zdCBkYXRhID0gbWFuYWdlci5yZWZlcmVuY2UuZ2V0RGF0YSgpO1xuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICBmb3JtSW5wdXREYXRhW21hbmFnZXIubmFtZV0gPSBkYXRhO1xuICAgICAgbWFuYWdlci5yZWZlcmVuY2UucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBsZXQgcGF0aCA9IG51bGw7XG4gIGlmICh3b3JraW5nRm9ybS5tb2RlID09PSBNT0RFUy5FRElUSU5HKSB7XG4gICAgcGF0aCA9IGZvcm1VdGlscy5nZXRFbnRpdHlQYXRoKHdvcmtpbmdGb3JtLCBmb3JtVHlwZSk7XG4gIH1cblxuICBpZiAod29ya2luZ0Zvcm0ubW9kZSA9PT0gTU9ERVMuQ1JFQVRJT04pIHtcbiAgICBQdWJTdWIuZW1pdChmb3JtVHlwZSArIFwiSXNSZWFkeUZvckNyZWF0aW9uXCIsIGZvcm1JbnB1dERhdGEpO1xuICB9IGVsc2UgaWYgKHdvcmtpbmdGb3JtLm1vZGUgPT09IE1PREVTLkVESVRJTkcpIHtcbiAgICBQdWJTdWIuZW1pdChmb3JtVHlwZSArIFwiSXNSZWFkeUZvckVkaXRpbmdcIiwge1xuICAgICAgZGF0YTogZm9ybUlucHV0RGF0YSxcbiAgICAgIHBhdGgsXG4gICAgfSk7XG4gIH1cbiAgcmVzZXRGb3JtKGZvcm1UeXBlKTtcbn1cblxuZnVuY3Rpb24gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpIHtcbiAgc3dpdGNoIChmb3JtVHlwZSkge1xuICAgIGNhc2UgRk9STV9SRUdJU1RSWS5MaXN0OlxuICAgICAgcmV0dXJuIGxpc3RGb3JtO1xuICAgIGNhc2UgRk9STV9SRUdJU1RSWS5UYXNrOlxuICAgICAgcmV0dXJuIHRhc2tGb3JtO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlc2V0Rm9ybShmb3JtVHlwZSkge1xuICBjb25zdCB3b3JraW5nRm9ybSA9IGdldFdvcmtpbmdGb3JtKGZvcm1UeXBlKTtcbiAgd29ya2luZ0Zvcm0uZm9ybS5yZXNldCgpO1xuICB3b3JraW5nRm9ybS5mb3JtLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtJHtmb3JtVHlwZX0tbGlzdC1pZFwiKTtcblxuICB3b3JraW5nRm9ybS50aXRsZS50ZXh0Q29udGVudCA9IGBDcmVhdGUgYSBuZXcgJHtmb3JtVHlwZX1gO1xuICB3b3JraW5nRm9ybS5tb2RlID0gTU9ERVMuQ1JFQVRJT047XG5cbiAgY29uc3QgZmluaXNoVXNpbmdGb3JtQnV0dG9uID1cbiAgICB3b3JraW5nRm9ybS5mb3JtLnF1ZXJ5U2VsZWN0b3IoXCIuZmluaXNoLWJ1dHRvblwiKTtcbiAgZmluaXNoVXNpbmdGb3JtQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuXG4gIGZvciAobGV0IG1hbmFnZXIgb2YgT2JqZWN0LnZhbHVlcyh3b3JraW5nRm9ybS5tYW5hZ2VycykpIHtcbiAgICBtYW5hZ2VyLnJlZmVyZW5jZS5yZXNldCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9wZW5Gb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIjtcblxuICBpZiAod29ya2luZ0Zvcm0gPT09IHRhc2tGb3JtKSB7XG4gICAgUHViU3ViLmVtaXQoXCJHZXRMaXN0UmVnaXN0cnlcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xvc2VGb3JtKGZvcm1UeXBlKSB7XG4gIGNvbnN0IHdvcmtpbmdGb3JtID0gZ2V0V29ya2luZ0Zvcm0oZm9ybVR5cGUpO1xuICB3b3JraW5nRm9ybS5iYWNrZ3JvdW5kLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcblxuICBpZiAod29ya2luZ0Zvcm0ubW9kZSAhPT0gTU9ERVMuQ1JFQVRJT04pIHtcbiAgICByZXNldEZvcm0oZm9ybVR5cGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwUGFyZW50TGlzdFNlbGVjdGlvbihyZWdpc3RyeSkge1xuICBsZXQgcGFyZW50TGlzdENvbnRlbnQgPSBcIlwiO1xuICByZWdpc3RyeS5mb3JFYWNoKChsaXN0KSA9PiB7XG4gICAgcGFyZW50TGlzdENvbnRlbnQgKz0gYDxvcHRpb24gdmFsdWU9XCIke2xpc3QuaWR9XCI+JHtsaXN0Lm5hbWV9PC9vcHRpb24+YDtcbiAgfSk7XG4gIHBhcmVudExpc3QuaW5uZXJIVE1MID0gcGFyZW50TGlzdENvbnRlbnQ7XG59XG5cbmZ1bmN0aW9uIHNldFBhcmVudExpc3RTZWxlY3Rpb25Ub1ZhbHVlKGlkKSB7XG4gIHBhcmVudExpc3QudmFsdWUgPSBpZDtcbn1cblxuZnVuY3Rpb24gcHJlcGFyZUZvcm1Gb3JFZGl0aW5nTW9kZShkYXRhKSB7XG4gIGNvbnN0IGZvcm1UeXBlID0gZGF0YS5mb3JtVHlwZTtcbiAgY29uc3QgZW50aXR5ID0gZGF0YS5lbnRpdHk7XG5cbiAgY29uc3Qgd29ya2luZ0Zvcm0gPSBnZXRXb3JraW5nRm9ybShmb3JtVHlwZSk7XG4gIGNvbnN0IGRhdGFzZXRQcm9wZXJ0eU5hbWUgPSBgZWRpdGFibGUke2Zvcm1UeXBlfUlkYDtcblxuICB3b3JraW5nRm9ybS50aXRsZS50ZXh0Q29udGVudCA9IGBFZGl0IGEgJHtkYXRhLmZvcm1UeXBlfWA7XG4gIHdvcmtpbmdGb3JtLm1vZGUgPSBNT0RFUy5FRElUSU5HO1xuXG4gIEFycmF5LmZyb20od29ya2luZ0Zvcm0uZm9ybS5lbGVtZW50cykuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgIGlmIChub2RlLm5vZGVOYW1lICE9PSBcIkJVVFRPTlwiKSB7XG4gICAgICBub2RlLnZhbHVlID0gZW50aXR5W25vZGUuaWRdO1xuICAgIH1cbiAgfSk7XG4gIGZvciAobGV0IG1hbmFnZXIgb2YgT2JqZWN0LnZhbHVlcyh3b3JraW5nRm9ybS5tYW5hZ2VycykpIHtcbiAgICBjb25zdCByb3dzID0gd29ya2luZ0Zvcm0uZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLnJvd1wiKTtcbiAgICBjb25zdCBsYXN0Um93ID0gcm93c1tyb3dzLmxlbmd0aCAtIDFdO1xuICAgIGNvbnNvbGUubG9nKG1hbmFnZXIsIGVudGl0eSk7XG4gICAgbWFuYWdlci5yZWZlcmVuY2Uuc2V0dXAoeyBlbnRpdHksIG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvbjogbGFzdFJvdyB9KTtcbiAgfVxuXG4gIGlmIChmb3JtVHlwZSA9PT0gRk9STV9SRUdJU1RSWS5MaXN0KSB7XG4gICAgd29ya2luZ0Zvcm0uZm9ybS5kYXRhc2V0W2RhdGFzZXRQcm9wZXJ0eU5hbWVdID0gZW50aXR5LmlkO1xuICB9IGVsc2UgaWYgKGZvcm1UeXBlID09PSBGT1JNX1JFR0lTVFJZLlRhc2spIHtcbiAgICB3b3JraW5nRm9ybS5mb3JtLmRhdGFzZXRbXG4gICAgICBkYXRhc2V0UHJvcGVydHlOYW1lXG4gICAgXSA9IGAke2VudGl0eS5wYXJlbnRMaXN0fToke2VudGl0eS5pZH1gO1xuICB9XG59XG5cblB1YlN1Yi5vbihcIk9wZW5Gb3JtXCIsIG9wZW5Gb3JtKTtcblB1YlN1Yi5vbihcIkNsb3NlRm9ybVwiLCBjbG9zZUZvcm0pO1xuXG5QdWJTdWIub24oXCJVc2VyRmluaXNoZWRVc2luZ0Zvcm1cIiwgZ2V0Rm9ybURhdGEpO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdHJ5R2V0c1JldHVybmVkXCIsIHNldHVwUGFyZW50TGlzdFNlbGVjdGlvbik7XG5QdWJTdWIub24oXCJMaXN0SWRHZXRzUmV0dXJuZWRcIiwgc2V0UGFyZW50TGlzdFNlbGVjdGlvblRvVmFsdWUpO1xuXG5QdWJTdWIub24oXCJVc2VyV2FudHNUb0VkaXRMaXN0XCIsIHByZXBhcmVGb3JtRm9yRWRpdGluZ01vZGUpO1xuUHViU3ViLm9uKFwiVXNlcldhbnRzVG9FZGl0VGFza1wiLCBwcmVwYXJlRm9ybUZvckVkaXRpbmdNb2RlKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmltSW5wdXQoaW5wdXRWYWx1ZSkge1xuICByZXR1cm4gaW5wdXRWYWx1ZS50cmltKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnRpdHlQYXRoKHdvcmtpbmdGb3JtLCBmb3JtVHlwZSkge1xuICBjb25zdCBkYXRhc2V0UXVlcnkgPSBgZWRpdGFibGUke2Zvcm1UeXBlfUlkYDtcbiAgY29uc3QgZWRpdGFibGVFbnRpdHlJZCA9IHdvcmtpbmdGb3JtLmZvcm0uZGF0YXNldFtkYXRhc2V0UXVlcnldO1xuICBjb25zdCBwYXRoQXJyYXkgPSBlZGl0YWJsZUVudGl0eUlkLnNwbGl0KFwiOlwiKTtcbiAgY29uc3QgcGF0aCA9IHsgbGlzdElkOiBwYXRoQXJyYXlbMF0sIHRhc2tJZDogcGF0aEFycmF5WzFdIH07XG4gIHJldHVybiBwYXRoO1xufVxuIiwiaW1wb3J0IHsgU3VidGFza0NyZWF0b3IgfSBmcm9tIFwiLi4vLi4vc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1jcmVhdG9yXCI7XG5pbXBvcnQgeyBTdWJ0YXNrUmVnaXN0cmFyIH0gZnJvbSBcIi4uLy4uL3N1YnRhc2tNYW5hZ2VtZW50L3N1YnRhc2stcmVnaXN0cmFyXCI7XG5pbXBvcnQgeyBTdWJ0YXNrUmVuZGVyZXIgfSBmcm9tIFwiLi4vLi4vc3VidGFza01hbmFnZW1lbnQvc3VidGFzay1yZW5kZXJlclwiO1xuXG5leHBvcnQgY2xhc3MgU3VidGFza01hbmFnZXIge1xuICBjb25zdHJ1Y3RvcihwYXJlbnRGb3JtKSB7XG4gICAgdGhpcy5wYXJlbnRGb3JtID0gcGFyZW50Rm9ybTtcbiAgICB0aGlzLnN1YnRhc2tTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB0aGlzLnN1YnRhc2tTZWN0aW9uLmlkID0gXCJzdWJ0YXNrLXNlY3Rpb25cIjtcblxuICAgIHRoaXMuc3VidGFza0NyZWF0b3IgPSBuZXcgU3VidGFza0NyZWF0b3IoKTtcbiAgICB0aGlzLnN1YnRhc2tSZWdpc3RyYXIgPSBuZXcgU3VidGFza1JlZ2lzdHJhcih0aGlzLnN1YnRhc2tTZWN0aW9uKTtcbiAgICB0aGlzLnN1YnRhc2tSZW5kZXJlciA9IG5ldyBTdWJ0YXNrUmVuZGVyZXIodGhpcy5zdWJ0YXNrU2VjdGlvbik7XG4gIH1cblxuICBpc0luc2lkZVBhcmVudEZvcm0oKSB7XG4gICAgcmV0dXJuIHRoaXMucGFyZW50Rm9ybS5mb3JtLmNvbnRhaW5zKHRoaXMuc3VidGFza1NlY3Rpb24pO1xuICB9XG5cbiAgc2V0dXAoeyBub2RlQmVmb3JlV2hpY2hUb1B1dFNlY3Rpb24gPSBudWxsLCBlbnRpdHkgPSBudWxsIH0pIHtcbiAgICBpZiAoZW50aXR5KSB7XG4gICAgICBlbnRpdHkuc3VidGFza3MuZm9yRWFjaCgoc3VidGFzaykgPT4ge1xuICAgICAgICB0aGlzLmFkZFN1YnRhc2soc3VidGFzayk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKG5vZGVCZWZvcmVXaGljaFRvUHV0U2VjdGlvbikge1xuICAgICAgdGhpcy5wYXJlbnRGb3JtLmZvcm0uaW5zZXJ0QmVmb3JlKFxuICAgICAgICB0aGlzLnN1YnRhc2tTZWN0aW9uLFxuICAgICAgICBub2RlQmVmb3JlV2hpY2hUb1B1dFNlY3Rpb25cbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGFyZW50Rm9ybS5mb3JtLmFwcGVuZENoaWxkKHRoaXMuc3VidGFza1NlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIGFkZFN1YnRhc2soc3VidGFzaykge1xuICAgIGNvbnN0IG5ld1N1YnRhc2sgPSBzdWJ0YXNrID8gc3VidGFzayA6IHRoaXMuc3VidGFza0NyZWF0b3IuY3JlYXRlU3VidGFzaygpO1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJhci5yZWdpc3RlclN1YnRhc2sobmV3U3VidGFzayk7XG4gICAgdGhpcy5zdWJ0YXNrUmVuZGVyZXIucmVuZGVyU3VidGFzayhuZXdTdWJ0YXNrKTtcbiAgICB0aGlzLnN1YnRhc2tSZWdpc3RyYXIudXBkYXRlSWRzKCk7XG4gIH1cblxuICBnZXREYXRhKCkge1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJhci5hcHBseURhdGEoKTtcbiAgICByZXR1cm4gdGhpcy5zdWJ0YXNrUmVnaXN0cmFyLmdldFN1YnRhc2tzKHRoaXMuc3VidGFza1NlY3Rpb24pO1xuICB9XG5cbiAgcmVzZXQoKSB7XG4gICAgY29uc3QgcmVnaXN0cnkgPSB0aGlzLnN1YnRhc2tSZWdpc3RyYXIuZ2V0U3VidGFza3MoKTtcbiAgICB0aGlzLnN1YnRhc2tSZW5kZXJlci5zdG9wUmVuZGVyaW5nU3VidGFza3NJbm5lckVsZW1lbnRzKHJlZ2lzdHJ5KTtcblxuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJhci5yZXNldFJlZ2lzdHJ5KCk7XG4gICAgdGhpcy5zdWJ0YXNrU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIHRoaXMuc3VidGFza1NlY3Rpb24ucmVtb3ZlKCk7XG4gIH1cbn1cbiIsImltcG9ydCBcIi4vbGlzdC1jcmVhdG9yXCI7XG5pbXBvcnQgXCIuL2xpc3QtcmVnaXN0cmFyXCI7XG5pbXBvcnQgXCIuL2xpc3QtcmVuZGVyZXJcIjtcbiIsImltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi4vZm9ybU1hbmFnZW1lbnQvZm9ybS1tYW5hZ2VyXCI7XG5pbXBvcnQgeyBzZXR1cEJ1dHRvbiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcbmltcG9ydCB7IExpc3QgfSBmcm9tIFwiLi9saXN0XCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZURlZmF1bHRMaXN0KCkge1xuICBjb25zdCBjcmVhdGlvbkRhdGEgPSB7IG5hbWU6IFwiRGVmYXVsdFwiLCBjb2xvcjogXCIjY2NjXCIgfTtcbiAgY29uc3QgZGVmYXVsdExpc3QgPSBuZXcgTGlzdChjcmVhdGlvbkRhdGEpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGRlZmF1bHRMaXN0KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTmV3TGlzdChuZXdEYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBuZXcgTGlzdChuZXdEYXRhKTtcbiAgYWRkTm9uRGVmYXVsdExpc3RCdXR0b25zKGxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkxpc3RQZW5kaW5nXCIsIGxpc3QpO1xufVxuXG5mdW5jdGlvbiBhZGROb25EZWZhdWx0TGlzdEJ1dHRvbnMobGlzdCkge1xuICBsaXN0LkVkaXRMaXN0QnV0dG9uID0gc2V0dXBCdXR0b24oXG4gICAgXCJlZGl0XCIsXG4gICAgXCJlZGl0LWJ1dHRvblwiLFxuICAgIGxpc3QsXG4gICAgXCJFZGl0TGlzdEJ1dHRvblwiXG4gICk7XG4gIGxpc3QuRWRpdExpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICBQdWJTdWIuZW1pdChcIlVzZXJXYW50c1RvRWRpdExpc3RcIiwge1xuICAgICAgZW50aXR5OiBsaXN0LFxuICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuTGlzdCxcbiAgICB9KTtcbiAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuTGlzdCk7XG4gIH0pO1xuXG4gIGxpc3QuUmVtb3ZlTGlzdEJ1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgIFwieFwiLFxuICAgIFwicmVtb3ZlLWJ1dHRvblwiLFxuICAgIGxpc3QsXG4gICAgXCJSZW1vdmVMaXN0QnV0dG9uXCJcbiAgKTtcbiAgbGlzdC5SZW1vdmVMaXN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgUHViU3ViLmVtaXQoXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIGxpc3QpO1xuICB9KTtcbn1cblxuUHViU3ViLm9uKFwiTGlzdElzUmVhZHlGb3JDcmVhdGlvblwiLCBjcmVhdGVOZXdMaXN0KTtcblB1YlN1Yi5vbihcIkNyZWF0ZURlZmF1bHRMaXN0XCIsIGNyZWF0ZURlZmF1bHRMaXN0KTtcbiIsImNvbnN0IHsgUHViU3ViIH0gPSByZXF1aXJlKFwiLi4vUHViU3ViXCIpO1xuXG5jb25zdCBMSVNUX1JFR0lTVFJZID0gW107XG5cbmZ1bmN0aW9uIGFkZExpc3RUb1JlZ2lzdHJ5KGxpc3QpIHtcbiAgTElTVF9SRUdJU1RSWS5wdXNoKGxpc3QpO1xuICBsaXN0LmlkID0gTElTVF9SRUdJU1RSWS5sZW5ndGggLSAxO1xuICBjb25zdCBsaXN0RGF0YSA9IHsgbGlzdCwgbGlzdElkOiBMSVNUX1JFR0lTVFJZLmxlbmd0aCAtIDEgfTtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0ZXJlZFwiLCBsaXN0RGF0YSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpc3RJZHMoKSB7XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgTElTVF9SRUdJU1RSWS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGxpc3QgPSBMSVNUX1JFR0lTVFJZW2ldO1xuICAgIGxpc3QuaWQgPSBpO1xuICAgIGxpc3QuZGl2LmRhdGFzZXQubGlzdElkID0gaTtcbiAgfVxufVxuXG5mdW5jdGlvbiByZW1vdmVMaXN0RnJvbVJlZ2lzdHJ5KGxpc3QpIHtcbiAgTElTVF9SRUdJU1RSWS5zcGxpY2UobGlzdC5pZCwgMSk7XG4gIHVwZGF0ZUxpc3RJZHMoKTtcbn1cblxuZnVuY3Rpb24gZWRpdExpc3QobGlzdERhdGEpIHtcbiAgY29uc3QgZWRpdGFibGVMaXN0ID0gTElTVF9SRUdJU1RSWVtsaXN0RGF0YS5wYXRoLmxpc3RJZF07XG4gIGZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGxpc3REYXRhLmRhdGEpKSB7XG4gICAgZWRpdGFibGVMaXN0W2tleV0gPSB2YWx1ZTtcbiAgfVxuICBQdWJTdWIuZW1pdChcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwge1xuICAgIGxpc3Q6IGVkaXRhYmxlTGlzdCxcbiAgICBsaXN0SWQ6IGVkaXRhYmxlTGlzdC5pZCxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldExpc3RSZWdpc3RyeSgpIHtcbiAgUHViU3ViLmVtaXQoXCJMaXN0UmVnaXN0cnlHZXRzUmV0dXJuZWRcIiwgTElTVF9SRUdJU1RSWSk7XG59XG5cblB1YlN1Yi5vbihcIkxpc3RQZW5kaW5nXCIsIGFkZExpc3RUb1JlZ2lzdHJ5KTtcblB1YlN1Yi5vbihcIkxpc3RTaG91bGRCZVJlbW92ZWRcIiwgcmVtb3ZlTGlzdEZyb21SZWdpc3RyeSk7XG5QdWJTdWIub24oXCJMaXN0SXNSZWFkeUZvckVkaXRpbmdcIiwgZWRpdExpc3QpO1xuUHViU3ViLm9uKFwiR2V0TGlzdFJlZ2lzdHJ5XCIsIGdldExpc3RSZWdpc3RyeSk7XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBhcHBlbmRFbnRpdHksIHJlbW92ZUVudGl0eURpdiB9IGZyb20gXCIuLi91dGlsaXRpZXNcIjtcblxuY29uc3QgbGlzdERpc3BsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpc3RzXCIpO1xuXG5mdW5jdGlvbiByZW5kZXJMaXN0KGxpc3REYXRhKSB7XG4gIGNvbnN0IGxpc3QgPSBsaXN0RGF0YS5saXN0O1xuXG4gIGNvbnN0IGxpc3REaXYgPSBsaXN0LmRpdjtcbiAgbGlzdERpdi5kYXRhc2V0Lmxpc3RJZCA9IGxpc3REYXRhLmxpc3RJZDtcbiAgbGlzdERpdi5jbGFzc0xpc3QuYWRkKFwibGlzdFwiKTtcbiAgbGlzdERpdi5zdHlsZS5ib3JkZXJDb2xvciA9IGxpc3QuY29sb3I7XG5cbiAgYXBwZW5kRW50aXR5KGxpc3REaXNwbGF5LCBcImxpc3RcIiwgbGlzdCwgbGlzdERpdik7XG5cbiAgY29uc3QgbGlzdFJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGxpc3RSb3cuY2xhc3NMaXN0LmFkZChcImxpc3Qtcm93XCIpO1xuICBsaXN0RGl2LmFwcGVuZENoaWxkKGxpc3RSb3cpO1xuXG4gIGNvbnN0IGxpc3ROYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBsaXN0TmFtZVRleHQuY2xhc3NMaXN0LmFkZChcImxpc3QtbmFtZVwiKTtcbiAgbGlzdE5hbWVUZXh0LnRleHRDb250ZW50ID0gbGlzdC5uYW1lO1xuICBsaXN0Um93LmFwcGVuZENoaWxkKGxpc3ROYW1lVGV4dCk7XG5cbiAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnNEaXYuY2xhc3NMaXN0LmFkZChcImJ1dHRvbnMtcm93XCIpO1xuICBsaXN0Um93LmFwcGVuZENoaWxkKGJ1dHRvbnNEaXYpO1xuXG4gIHJlbmRlckFsbExpc3RCdXR0b25zKGxpc3QsIGJ1dHRvbnNEaXYpO1xuXG4gIGNvbnN0IGhyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImhyXCIpO1xuICBsaXN0RGl2LmFwcGVuZENoaWxkKGhyKTtcblxuICBjb25zdCB0YXNrU2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tTZWN0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLXNlY3Rpb25cIik7XG4gIGxpc3REaXYuYXBwZW5kQ2hpbGQodGFza1NlY3Rpb24pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJBbGxMaXN0QnV0dG9ucyhsaXN0LCBidXR0b25zRGl2KSB7XG4gIE9iamVjdC52YWx1ZXMobGlzdC5idXR0b25zKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b25zRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdG9wUmVuZGVyaW5nTGlzdChsaXN0KSB7XG4gIHJlbW92ZUVudGl0eURpdihsaXN0KTtcbn1cblxuZnVuY3Rpb24gcmVyZW5kZXJMaXN0KGxpc3REYXRhKSB7XG4gIHN0b3BSZW5kZXJpbmdMaXN0KGxpc3REYXRhLmxpc3QpO1xuICByZW5kZXJMaXN0KGxpc3REYXRhKTtcbn1cblxuUHViU3ViLm9uKFwiRGVmYXVsdExpc3RQZW5kaW5nXCIsIHJlbmRlckxpc3QpO1xuUHViU3ViLm9uKFwiTGlzdFJlZ2lzdGVyZWRcIiwgcmVuZGVyTGlzdCk7XG5QdWJTdWIub24oXCJMaXN0U2hvdWxkQmVSZW1vdmVkXCIsIHN0b3BSZW5kZXJpbmdMaXN0KTtcblB1YlN1Yi5vbihcImxpc3RTaG91bGRCZVJlcmVuZGVyZWRcIiwgcmVyZW5kZXJMaXN0KTtcbiIsImltcG9ydCB7IFRhc2tDcmVhdG9yIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stY3JlYXRvclwiO1xuaW1wb3J0IHsgVGFza1JlZ2lzdHJhciB9IGZyb20gXCIuLi90YXNrTWFuYWdlbWVudC90YXNrLXJlZ2lzdHJhclwiO1xuaW1wb3J0IHsgVGFza1JlbmRlcmVyIH0gZnJvbSBcIi4uL3Rhc2tNYW5hZ2VtZW50L3Rhc2stcmVuZGVyZXJcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldHVwVGFza0hlbHBlcnMobGlzdCkge1xuICBsaXN0LnRhc2tDcmVhdG9yID0gbmV3IFRhc2tDcmVhdG9yKCk7XG4gIGxpc3QudGFza1JlZ2lzdHJhciA9IG5ldyBUYXNrUmVnaXN0cmFyKCk7XG4gIGxpc3QudGFza1JlbmRlcmVyID0gbmV3IFRhc2tSZW5kZXJlcihsaXN0LmRpdik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlc3RhYmxpc2hOZXdUYXNrKHRhc2tEYXRhKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFza0RhdGEucGFyZW50TGlzdCwgdGhpcy5pZCkpIHtcbiAgICBjb25zdCB0YXNrID0gdGhpcy50YXNrQ3JlYXRvci5jcmVhdGVUYXNrKHRhc2tEYXRhKTtcbiAgICB0aGlzLnRhc2tSZWdpc3RyYXIucmVnaXN0ZXJUYXNrKHRhc2spO1xuICAgIHRoaXMudGFza1JlbmRlcmVyLnJlbmRlclRhc2sodGhpcy5kaXYsIHRhc2spO1xuICAgIGNvbnNvbGUubG9nKHRhc2spO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlZGl0VGFzayh0YXNrRGF0YSkge1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2tEYXRhLnBhdGgubGlzdElkLCB0aGlzLmlkKSkge1xuICAgIGNvbnN0IGVkaXRlZFRhc2sgPSB0aGlzLnRhc2tSZWdpc3RyYXIuZWRpdFRhc2sodGFza0RhdGEpO1xuICAgIHRoaXMudGFza1JlbmRlcmVyLnJlcmVuZGVyVGFzayh0aGlzLmRpdiwgZWRpdGVkVGFzayk7XG4gICAgY29uc29sZS5sb2codGFzayk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFzaykge1xuICBpZiAodGFza0JlbG9uZ3NUb1RoaXNMaXN0KHRhc2sucGFyZW50TGlzdCwgdGhpcy5pZCkpIHtcbiAgICB0aGlzLnRhc2tSZWdpc3RyYXIuZGVsZXRlVGFzayh0YXNrKTtcbiAgICB0aGlzLnRhc2tSZW5kZXJlci5zdG9wUmVuZGVyaW5nVGFzayh0YXNrKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tUYXNrKHRhc2spIHtcbiAgaWYgKHRhc2tCZWxvbmdzVG9UaGlzTGlzdCh0YXNrLnBhcmVudExpc3QsIHRoaXMuaWQpKSB7XG4gICAgdGhpcy50YXNrUmVnaXN0cmFyLnNldFRhc2tGaW5pc2hlZCh7IHRhc2ssIGZpbmlzaGVkOiB0cnVlIH0pO1xuICAgIHRoaXMudGFza1JlbmRlcmVyLnJlbmRlclRhc2tBc0NoZWNrZWQodGFzay5kaXYpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1bmNoZWNrVGFzayh0YXNrKSB7XG4gIGlmICh0YXNrQmVsb25nc1RvVGhpc0xpc3QodGFzay5wYXJlbnRMaXN0LCB0aGlzLmlkKSkge1xuICAgIHRoaXMudGFza1JlZ2lzdHJhci5zZXRUYXNrRmluaXNoZWQoeyB0YXNrLCBmaW5pc2hlZDogZmFsc2UgfSk7XG4gICAgdGhpcy50YXNrUmVuZGVyZXIucmVuZGVyVGFza0FzVW5jaGVja2VkKHRhc2suZGl2KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB0YXNrQmVsb25nc1RvVGhpc0xpc3QobGlzdE5hbWVUYXNrSXNMb29raW5nRm9yLCBjdXJyZW50TGlzdE5hbWUpIHtcbiAgcmV0dXJuIGxpc3ROYW1lVGFza0lzTG9va2luZ0ZvciA9PSBjdXJyZW50TGlzdE5hbWU7XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi4vUHViU3ViXCI7XG5pbXBvcnQgeyBGT1JNX1JFR0lTVFJZIH0gZnJvbSBcIi4uL2Zvcm1NYW5hZ2VtZW50L2Zvcm0tbWFuYWdlclwiO1xuaW1wb3J0IHsgc2V0dXBCdXR0b24gfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5pbXBvcnQgKiBhcyBsaXN0VXRpbHMgZnJvbSBcIi4vbGlzdC11dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIExpc3Qge1xuICBpZCA9IG51bGw7XG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnMgPSB7fTtcblxuICBjb25zdHJ1Y3RvcihkYXRhKSB7XG4gICAgdGhpcy5uYW1lID0gZGF0YS5uYW1lIHx8IFwiVW5uYW1lZFwiO1xuICAgIHRoaXMuY29sb3IgPSBkYXRhLmNvbG9yO1xuXG4gICAgdGhpcy5Tb3J0TGlzdEJ1dHRvbiA9IHNldHVwQnV0dG9uKFxuICAgICAgXCJzb3J0XCIsXG4gICAgICBcInNvcnQtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJTb3J0TGlzdEJ1dHRvblwiXG4gICAgKTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcIitcIiwgXCJhZGQtYnV0dG9uXCIsIHRoaXMsIFwiQWRkVGFza0J1dHRvblwiKTtcbiAgICB0aGlzLkFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgICAgIFB1YlN1Yi5lbWl0KFwiTGlzdElkR2V0c1JldHVybmVkXCIsIHRoaXMuaWQpO1xuICAgIH0pO1xuXG4gICAgbGlzdFV0aWxzLnNldHVwVGFza0hlbHBlcnModGhpcyk7XG4gICAgUHViU3ViLm9uKFwiVGFza0lzUmVhZHlGb3JDcmVhdGlvblwiLCBsaXN0VXRpbHMuZXN0YWJsaXNoTmV3VGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJUYXNrSXNSZWFkeUZvckVkaXRpbmdcIiwgbGlzdFV0aWxzLmVkaXRUYXNrLmJpbmQodGhpcykpO1xuICAgIFB1YlN1Yi5vbihcIlVzZXJXYW50c1RvRGVsZXRlVGFza1wiLCBsaXN0VXRpbHMuZGVsZXRlVGFzay5iaW5kKHRoaXMpKTtcbiAgICBQdWJTdWIub24oXCJUYXNrQ2hlY2tlZFwiLCBsaXN0VXRpbHMuY2hlY2tUYXNrLmJpbmQodGhpcykpO1xuICAgIFB1YlN1Yi5vbihcIlRhc2tVbmNoZWNrZWRcIiwgbGlzdFV0aWxzLnVuY2hlY2tUYXNrLmJpbmQodGhpcykpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBTdWJ0YXNrIH0gZnJvbSBcIi4vc3VidGFza1wiO1xuXG5leHBvcnQgY2xhc3MgU3VidGFza0NyZWF0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgY3JlYXRlU3VidGFzaygpIHtcbiAgICByZXR1cm4gbmV3IFN1YnRhc2soKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIFN1YnRhc2tSZWdpc3RyYXIge1xuICBzdWJ0YXNrUmVnaXN0cnkgPSBbXTtcblxuICBjb25zdHJ1Y3RvcihwYXJlbnREaXYpIHtcbiAgICB0aGlzLnBhcmVudERpdiA9IHBhcmVudERpdjtcbiAgfVxuXG4gIHJlZ2lzdGVyU3VidGFzayhzdWJ0YXNrKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cnkucHVzaChzdWJ0YXNrKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLnN1YnRhc2tSZWdpc3RyeSk7XG4gIH1cblxuICB1cGRhdGVJZHMoKSB7XG4gICAgdGhpcy5zdWJ0YXNrUmVnaXN0cnkuZm9yRWFjaCgoc3VidGFzaywgaW5kZXgpID0+IHtcbiAgICAgIHN1YnRhc2suaWQgPSBpbmRleDtcbiAgICB9KTtcbiAgfVxuXG4gIGFwcGx5RGF0YSgpIHtcbiAgICBjb25zdCBpbnB1dHMgPSB0aGlzLnBhcmVudERpdi5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXRcIik7XG4gICAgaW5wdXRzLmZvckVhY2goKGl0ZW0sIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBzdWJ0YXNrID0gdGhpcy5zdWJ0YXNrUmVnaXN0cnlbaW5kZXhdO1xuICAgICAgY29uc29sZS5sb2coc3VidGFzaywgc3VidGFzay5jb250ZW50LCBpdGVtLCBpdGVtLnZhbHVlKTtcbiAgICAgIHN1YnRhc2suY29udGVudCA9IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRTdWJ0YXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy5zdWJ0YXNrUmVnaXN0cnk7XG4gIH1cblxuICByZXNldFJlZ2lzdHJ5KCkge1xuICAgIHRoaXMuc3VidGFza1JlZ2lzdHJ5ID0gW107XG4gICAgY29uc29sZS5sb2codGhpcy5zdWJ0YXNrUmVnaXN0cnkpO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU3VidGFza1JlbmRlcmVyIHtcbiAgY29uc3RydWN0b3IocGFyZW50RGl2KSB7XG4gICAgdGhpcy5wYXJlbnREaXYgPSBwYXJlbnREaXY7XG4gIH1cblxuICByZW5kZXJTdWJ0YXNrKHN1YnRhc2spIHtcbiAgICBjb25zdCBzdWJ0YXNrRGl2ID0gc3VidGFzay5kaXY7XG4gICAgc3VidGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwic3VidGFzay1kaXZcIik7XG4gICAgdGhpcy5wYXJlbnREaXYuYXBwZW5kQ2hpbGQoc3VidGFza0Rpdik7XG5cbiAgICBjb25zdCBzdWJ0YXNrQ29udGVudElucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHN1YnRhc2tDb250ZW50SW5wdXQuY2xhc3NMaXN0LmFkZChcInN1YnRhc2stY29udGVudFwiKTtcblxuICAgIHN1YnRhc2tEaXYuYXBwZW5kQ2hpbGQoc3VidGFza0NvbnRlbnRJbnB1dCk7XG4gICAgaWYgKHN1YnRhc2spIHtcbiAgICAgIHN1YnRhc2tDb250ZW50SW5wdXQudmFsdWUgPSBzdWJ0YXNrLmNvbnRlbnQ7XG4gICAgfVxuICB9XG5cbiAgc3RvcFJlbmRlcmluZ1N1YnRhc2tzSW5uZXJFbGVtZW50cyhzdWJ0YXNrc1JlZ2lzdHJ5KSB7XG4gICAgc3VidGFza3NSZWdpc3RyeS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBpdGVtLmRpdi5pbm5lckhUTUwgPSBcIlwiO1xuICAgIH0pO1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgU3VidGFzayB7XG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIF9jb250ZW50ID0gXCJcIjtcbiAgaWQgPSBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBnZXQgY29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY29udGVudDtcbiAgfVxuXG4gIHNldCBjb250ZW50KHZhbHVlKSB7XG4gICAgdGhpcy5fY29udGVudCA9IHZhbHVlO1xuICB9XG59XG4iLCJpbXBvcnQgeyBUYXNrIH0gZnJvbSBcIi4vdGFza1wiO1xuXG5leHBvcnQgY2xhc3MgVGFza0NyZWF0b3Ige1xuICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgY3JlYXRlVGFzayh0YXNrRGF0YSkge1xuICAgIHJldHVybiBuZXcgVGFzayh0YXNrRGF0YSk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBUYXNrUmVnaXN0cmFyIHtcbiAgVEFTS19SRUdJU1RSWSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICByZWdpc3RlclRhc2sodGFzaykge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5wdXNoKHRhc2spO1xuICAgIHRhc2suaWQgPSB0aGlzLlRBU0tfUkVHSVNUUlkubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHVwZGF0ZUlkcygpIHtcbiAgICB0aGlzLlRBU0tfUkVHSVNUUlkuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgIHRhc2suaWQgPSBpbmRleDtcbiAgICB9KTtcbiAgfVxuXG4gIGVkaXRUYXNrKHRhc2tEYXRhKSB7XG4gICAgY29uc3QgZWRpdGFibGVUYXNrID0gdGhpcy5UQVNLX1JFR0lTVFJZW3Rhc2tEYXRhLnBhdGgudGFza0lkXTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyh0YXNrRGF0YS5kYXRhKSkge1xuICAgICAgZWRpdGFibGVUYXNrW2tleV0gPSB2YWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGVkaXRhYmxlVGFzaztcbiAgfVxuXG4gIHNldFRhc2tGaW5pc2hlZChkYXRhKSB7XG4gICAgZGF0YS50YXNrLmZpbmlzaGVkID0gZGF0YS5maW5pc2hlZDtcbiAgfVxuXG4gIGRlbGV0ZVRhc2sodGFzaykge1xuICAgIHRoaXMuVEFTS19SRUdJU1RSWS5zcGxpY2UodGFzay5pZCwgMSk7XG4gICAgdGhpcy51cGRhdGVJZHMoKTtcbiAgfVxufVxuIiwiaW1wb3J0IGlzUGFzdCBmcm9tIFwiZGF0ZS1mbnMvaXNQYXN0XCI7XG5pbXBvcnQgZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdCBmcm9tIFwiZGF0ZS1mbnMvZm9ybWF0RGlzdGFuY2VUb05vd1N0cmljdFwiO1xuaW1wb3J0IHsgYXBwZW5kRW50aXR5LCByZW1vdmVFbnRpdHlEaXYgfSBmcm9tIFwiLi4vdXRpbGl0aWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBUYXNrUmVuZGVyZXIge1xuICBjb25zdHJ1Y3QoKSB7fVxuXG4gIHJlbmRlclRhc2socGFyZW50TGlzdERpdiwgdGFzaykge1xuICAgIGNvbnN0IHBhcmVudExpc3RUYXNrU2VjdGlvbiA9IHBhcmVudExpc3REaXYucXVlcnlTZWxlY3RvcihcIi50YXNrLXNlY3Rpb25cIik7XG5cbiAgICBjb25zdCB0YXNrRGl2ID0gdGFzay5kaXY7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QuYWRkKFwidGFza1wiKTtcbiAgICBhcHBlbmRFbnRpdHkocGFyZW50TGlzdFRhc2tTZWN0aW9uLCBcInRhc2tcIiwgdGFzaywgdGFza0Rpdik7XG5cbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2suZmluaXNoVGFza0NoZWNrYm94KTtcblxuICAgIGNvbnN0IHRhc2tOYW1lVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tOYW1lVGV4dC5jbGFzc0xpc3QuYWRkKFwidGFzay1uYW1lXCIpO1xuICAgIHRhc2tOYW1lVGV4dC50ZXh0Q29udGVudCA9IHRhc2submFtZTtcbiAgICB0YXNrRGl2LmFwcGVuZENoaWxkKHRhc2tOYW1lVGV4dCk7XG5cbiAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgIHRhc2tEdWVEYXRlLmNsYXNzTGlzdC5hZGQoXCJkdWUtZGF0ZVwiKTtcbiAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IGZvcm1hdERpc3RhbmNlVG9Ob3dTdHJpY3QodGFzay5kdWVEYXRlKTtcbiAgICBzZXR1cFBvc3Rwb25lZENsYXNzKHRhc2suZHVlRGF0ZSwgdGFza0R1ZURhdGUpO1xuICAgIHRhc2tEaXYuYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuXG4gICAgY29uc3QgYnV0dG9uc0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYnV0dG9uc0Rpdi5jbGFzc0xpc3QuYWRkKFwiYnV0dG9ucy1yb3dcIik7XG4gICAgdGFza0Rpdi5hcHBlbmRDaGlsZChidXR0b25zRGl2KTtcblxuICAgIHRoaXMucmVuZGVyVGFza0J1dHRvbnMoYnV0dG9uc0RpdiwgdGFzayk7XG4gICAgdGhpcy5yZW5kZXJUYXNrQXNVbmNoZWNrZWQodGFza0Rpdik7XG4gIH1cblxuICByZW5kZXJUYXNrQnV0dG9ucyhidXR0b25zRGl2LCB0YXNrKSB7XG4gICAgT2JqZWN0LnZhbHVlcyh0YXNrLmJ1dHRvbnMpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgICAgYnV0dG9uc0Rpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVyZW5kZXJUYXNrKHBhcmVudExpc3REaXYsIHRhc2spIHtcbiAgICB0aGlzLnN0b3BSZW5kZXJpbmdUYXNrKHRhc2spO1xuICAgIHRoaXMucmVuZGVyVGFzayhwYXJlbnRMaXN0RGl2LCB0YXNrKTtcbiAgfVxuXG4gIHJlbmRlclRhc2tBc0NoZWNrZWQodGFza0Rpdikge1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LnJlbW92ZShcInVuY2hlY2tlZC10YXNrXCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcImNoZWNrZWQtdGFza1wiKTtcbiAgfVxuXG4gIHJlbmRlclRhc2tBc1VuY2hlY2tlZCh0YXNrRGl2KSB7XG4gICAgdGFza0Rpdi5jbGFzc0xpc3QucmVtb3ZlKFwiY2hlY2tlZC10YXNrXCIpO1xuICAgIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInVuY2hlY2tlZC10YXNrXCIpO1xuICB9XG5cbiAgc3RvcFJlbmRlcmluZ1Rhc2sodGFzaykge1xuICAgIHJlbW92ZUVudGl0eURpdih0YXNrKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cFBvc3Rwb25lZENsYXNzKGR1ZURhdGVWYWx1ZSwgdGFza0R1ZURhdGVFbGVtZW50KSB7XG4gIGlmIChpc1Bvc3Rwb25lZChkdWVEYXRlVmFsdWUpKSB7XG4gICAgdGFza0R1ZURhdGVFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJwb3N0cG9uZWRcIik7XG4gIH0gZWxzZSB7XG4gICAgdGFza0R1ZURhdGVFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwb3N0cG9uZWRcIik7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNQb3N0cG9uZWQoZHVlRGF0ZVZhbHVlKSB7XG4gIHJldHVybiBpc1Bhc3QoZHVlRGF0ZVZhbHVlKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzZXR1cER1ZURhdGUoZHVlRGF0ZVN0cmluZykge1xuICBpZiAoZHVlRGF0ZVN0cmluZykge1xuICAgIHJldHVybiBuZXcgRGF0ZShkdWVEYXRlU3RyaW5nKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUHViU3ViIH0gZnJvbSBcIi4uL1B1YlN1YlwiO1xuaW1wb3J0IHsgRk9STV9SRUdJU1RSWSB9IGZyb20gXCIuLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCB7IHNldHVwQnV0dG9uIH0gZnJvbSBcIi4uL3V0aWxpdGllc1wiO1xuaW1wb3J0IHsgc2V0dXBEdWVEYXRlIH0gZnJvbSBcIi4vdGFzay11dGlsaXRpZXNcIjtcblxuZXhwb3J0IGNsYXNzIFRhc2sge1xuICBpZCA9IG51bGw7XG4gIGZpbmlzaGVkID0gZmFsc2U7XG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIGJ1dHRvbnMgPSB7fTtcblxuICBjb25zdHJ1Y3Rvcih0YXNrRGF0YSkge1xuICAgIHRoaXMubmFtZSA9IHRhc2tEYXRhLm5hbWUgfHwgXCJVbm5hbWVkXCI7XG4gICAgdGhpcy5kZXNjcmlwdGlvbiA9IHRhc2tEYXRhLmRlc2NyaXB0aW9uO1xuICAgIHRoaXMuX2R1ZURhdGUgPSBzZXR1cER1ZURhdGUodGFza0RhdGEuZHVlRGF0ZSk7XG4gICAgdGhpcy5zdWJ0YXNrcyA9IHRhc2tEYXRhLnN1YnRhc2tzO1xuICAgIHRoaXMucHJpb3JpdHkgPSB0YXNrRGF0YS5wcmlvcml0eTtcbiAgICB0aGlzLnBhcmVudExpc3QgPSB0YXNrRGF0YS5wYXJlbnRMaXN0O1xuXG4gICAgdGhpcy5kaXYuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGFza1wiKSB8fCBlLnRhcmdldC5ub2RlTmFtZSA9PT0gXCJQXCIpIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHtcbiAgICAgICAgICBmb3JtVHlwZTogRk9STV9SRUdJU1RSWS5UYXNrLFxuICAgICAgICAgIGVudGl0eTogdGhpcyxcbiAgICAgICAgfSk7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5UYXNrKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuZmluaXNoVGFza0NoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIHRoaXMuZmluaXNoVGFza0NoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcbiAgICB0aGlzLmZpbmlzaFRhc2tDaGVja2JveC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XG4gICAgICBpZiAoZS5jdXJyZW50VGFyZ2V0LmNoZWNrZWQpIHtcbiAgICAgICAgUHViU3ViLmVtaXQoXCJUYXNrQ2hlY2tlZFwiLCB0aGlzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFB1YlN1Yi5lbWl0KFwiVGFza1VuY2hlY2tlZFwiLCB0aGlzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuRWRpdFRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwiZWRpdFwiLFxuICAgICAgXCJlZGl0LWJ1dHRvblwiLFxuICAgICAgdGhpcyxcbiAgICAgIFwiRWRpdFRhc2tCdXR0b25cIlxuICAgICk7XG4gICAgdGhpcy5FZGl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0VkaXRUYXNrXCIsIHtcbiAgICAgICAgZm9ybVR5cGU6IEZPUk1fUkVHSVNUUlkuVGFzayxcbiAgICAgICAgZW50aXR5OiB0aGlzLFxuICAgICAgfSk7XG4gICAgICBQdWJTdWIuZW1pdChcIk9wZW5Gb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gICAgfSk7XG5cbiAgICB0aGlzLkRlbGV0ZVRhc2tCdXR0b24gPSBzZXR1cEJ1dHRvbihcbiAgICAgIFwieFwiLFxuICAgICAgXCJkZWxldGUtYnV0dG9uXCIsXG4gICAgICB0aGlzLFxuICAgICAgXCJEZWxldGVUYXNrQnV0dG9uXCJcbiAgICApO1xuICAgIHRoaXMuRGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgUHViU3ViLmVtaXQoXCJVc2VyV2FudHNUb0RlbGV0ZVRhc2tcIiwgdGhpcyk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVEaXYoKSB7XG4gICAgdGhpcy5kaXYucmVtb3ZlKCk7XG4gICAgdGhpcy5kaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICB9XG5cbiAgZ2V0IGR1ZURhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2R1ZURhdGU7XG4gIH1cblxuICBzZXQgZHVlRGF0ZSh2YWx1ZSkge1xuICAgIHRoaXMuX2R1ZURhdGUgPSBzZXR1cER1ZURhdGUodmFsdWUpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQdWJTdWIgfSBmcm9tIFwiLi9QdWJTdWJcIjtcbmltcG9ydCB7IEZPUk1fUkVHSVNUUlkgfSBmcm9tIFwiLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcblxuZXhwb3J0IGNvbnN0IGxpc3RGb3JtT3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1vcGVuLWJ1dHRvblwiXG4pO1xubGlzdEZvcm1PcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiT3BlbkZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgbGlzdEZvcm1DbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICBcImxpc3QtZm9ybS1jbG9zZS1idXR0b25cIlxuKTtcbmxpc3RGb3JtQ2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgUHViU3ViLmVtaXQoXCJDbG9zZUZvcm1cIiwgRk9STV9SRUdJU1RSWS5MaXN0KTtcbn0pO1xuXG5leHBvcnQgY29uc3QgZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbiA9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluaXNoLWxpc3QtYnV0dG9uXCIpO1xuZmluaXNoVXNpbmdMaXN0Rm9ybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIlVzZXJGaW5pc2hlZFVzaW5nRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLkxpc3QpO1xufSk7XG5cbmV4cG9ydCBjb25zdCB0YXNrRm9ybUNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXG4gIFwidGFzay1mb3JtLWNsb3NlLWJ1dHRvblwiXG4pO1xudGFza0Zvcm1DbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBQdWJTdWIuZW1pdChcIkNsb3NlRm9ybVwiLCBGT1JNX1JFR0lTVFJZLlRhc2spO1xufSk7XG5cbmV4cG9ydCBjb25zdCBmaW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uID1cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5pc2gtdGFzay1idXR0b25cIik7XG5maW5pc2hVc2luZ1Rhc2tGb3JtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIFB1YlN1Yi5lbWl0KFwiVXNlckZpbmlzaGVkVXNpbmdGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG4gIFB1YlN1Yi5lbWl0KFwiQ2xvc2VGb3JtXCIsIEZPUk1fUkVHSVNUUlkuVGFzayk7XG59KTtcbiIsImV4cG9ydCBmdW5jdGlvbiBzZXR1cEJ1dHRvbihuYW1lLCBjbGFzc05hbWUsIHBhcmVudCwgYnV0dG9uQXJyYXlOYW1lKSB7XG4gIGNvbnN0IGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG4gIGJ1dHRvbi50ZXh0Q29udGVudCA9IG5hbWU7XG4gIGJ1dHRvbi5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIHBhcmVudC5idXR0b25zW2J1dHRvbkFycmF5TmFtZV0gPSBidXR0b247XG4gIHJldHVybiBidXR0b247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVFbnRpdHlEaXYoZW50aXR5KSB7XG4gIGVudGl0eS5kaXYucmVtb3ZlKCk7XG4gIGVudGl0eS5kaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwZW5kRW50aXR5KHBhcmVudCwgY2xhc3NOYW1lLCBlbnRpdHksIGVudGl0eURpdikge1xuICBjb25zdCBzaWJsaW5nRW50aXR5VG9QdXRBZnRlciA9XG4gICAgcGFyZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVtlbnRpdHkuaWQgLSAxXTtcbiAgaWYgKHNpYmxpbmdFbnRpdHlUb1B1dEFmdGVyKSB7XG4gICAgaW5zZXJ0QWZ0ZXIoc2libGluZ0VudGl0eVRvUHV0QWZ0ZXIsIGVudGl0eURpdik7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LnByZXBlbmQoZW50aXR5RGl2KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbnNlcnRBZnRlcihub2RlVG9QdXRBZnRlciwgbmV3Tm9kZSkge1xuICBub2RlVG9QdXRBZnRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShuZXdOb2RlLCBub2RlVG9QdXRBZnRlci5uZXh0U2libGluZyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBfdHlwZW9mKG9iaikge1xuICBcIkBiYWJlbC9oZWxwZXJzIC0gdHlwZW9mXCI7XG5cbiAgcmV0dXJuIF90eXBlb2YgPSBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBcInN5bWJvbFwiID09IHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPyBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmo7XG4gIH0gOiBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBcImZ1bmN0aW9uXCIgPT0gdHlwZW9mIFN5bWJvbCAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajtcbiAgfSwgX3R5cGVvZihvYmopO1xufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCIuL3VuaXF1ZS1idXR0b24tbWFuYWdlclwiO1xuaW1wb3J0IFwiLi9mb3JtTWFuYWdlbWVudC9mb3JtLW1hbmFnZXJcIjtcbmltcG9ydCBcIi4vbGlzdE1hbmFnZW1lbnQvbGlzdC1idW5kbGVcIjtcbmltcG9ydCB7IFB1YlN1YiB9IGZyb20gXCIuL1B1YlN1YlwiO1xuXG5QdWJTdWIuZW1pdChcIkNyZWF0ZURlZmF1bHRMaXN0XCIpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
