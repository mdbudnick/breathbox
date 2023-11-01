/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pxToVh: () => (/* binding */ pxToVh),
/* harmony export */   pxToVw: () => (/* binding */ pxToVw),
/* harmony export */   vhToPx: () => (/* binding */ vhToPx),
/* harmony export */   vmax: () => (/* binding */ vmax),
/* harmony export */   vmin: () => (/* binding */ vmin),
/* harmony export */   vwToPx: () => (/* binding */ vwToPx)
/* harmony export */ });
function vhToPx(percent) {
  var _window$innerHeight;
  var h = Math.max(document.documentElement.clientHeight, (_window$innerHeight = window.innerHeight) !== null && _window$innerHeight !== void 0 ? _window$innerHeight : 0);
  return percent * h / 100;
}
function vwToPx(percent) {
  var _window$innerWidth;
  var w = Math.max(document.documentElement.clientWidth, (_window$innerWidth = window.innerWidth) !== null && _window$innerWidth !== void 0 ? _window$innerWidth : 0);
  return percent * w / 100;
}
function pxToVh(px) {
  var _window$innerHeight2;
  var h = Math.max(document.documentElement.clientHeight, (_window$innerHeight2 = window.innerHeight) !== null && _window$innerHeight2 !== void 0 ? _window$innerHeight2 : 0);
  return px / h * 100;
}
function pxToVw(px) {
  var _window$innerWidth2;
  var w = Math.max(document.documentElement.clientWidth, (_window$innerWidth2 = window.innerWidth) !== null && _window$innerWidth2 !== void 0 ? _window$innerWidth2 : 0);
  return px / w * 100;
}
function vmin(percent) {
  return Math.min(pxToVh(percent), pxToVw(percent));
}
function vmax(percent) {
  return Math.max(pxToVh(percent), pxToVw(percent));
}

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startCountdownDecrement: () => (/* binding */ startCountdownDecrement)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
// We have to do this each time because the window can be resized

function startCountdownDecrement(text, time) {
  var countdownInterval;
  countdownInterval = setInterval(function () {
    --time;
    if (time !== 0) {
      _common__WEBPACK_IMPORTED_MODULE_0__.action.textContent = text + '\r\n' + time;
    } else {
      _common__WEBPACK_IMPORTED_MODULE_0__.action.textContent = text;
      // It cancels itself
      clearInterval(countdownInterval);
      countdownInterval = null;
    }
  }, 1000);
  // Do it the first time
  _common__WEBPACK_IMPORTED_MODULE_0__.action.textContent = text + '\r\n' + time;
  return countdownInterval;
}

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BREATH_CURVE: () => (/* binding */ BREATH_CURVE),
/* harmony export */   DEFAULT_ACTION_FONT_SIZE: () => (/* binding */ DEFAULT_ACTION_FONT_SIZE),
/* harmony export */   DEFAULT_ACTION_TEXT: () => (/* binding */ DEFAULT_ACTION_TEXT),
/* harmony export */   DEFAULT_BACKGROUND_COLOR: () => (/* binding */ DEFAULT_BACKGROUND_COLOR),
/* harmony export */   EXHALE: () => (/* binding */ EXHALE),
/* harmony export */   EXHALE_COLOR: () => (/* binding */ EXHALE_COLOR),
/* harmony export */   EXHALE_SIZE: () => (/* binding */ EXHALE_SIZE),
/* harmony export */   HOLD: () => (/* binding */ HOLD),
/* harmony export */   INHALE: () => (/* binding */ INHALE),
/* harmony export */   INHALE_COLOR: () => (/* binding */ INHALE_COLOR),
/* harmony export */   INHALE_SIZE: () => (/* binding */ INHALE_SIZE),
/* harmony export */   LARGE_CIRCLE_SIZE: () => (/* binding */ LARGE_CIRCLE_SIZE),
/* harmony export */   RESET_ORANGE: () => (/* binding */ RESET_ORANGE),
/* harmony export */   SMALL_CIRCLE_SIZE: () => (/* binding */ SMALL_CIRCLE_SIZE),
/* harmony export */   SMOOTH_PATH_TIMING: () => (/* binding */ SMOOTH_PATH_TIMING),
/* harmony export */   action: () => (/* binding */ action),
/* harmony export */   box: () => (/* binding */ box),
/* harmony export */   boxRect: () => (/* binding */ boxRect),
/* harmony export */   breathTimeInput: () => (/* binding */ breathTimeInput),
/* harmony export */   circle: () => (/* binding */ circle),
/* harmony export */   config: () => (/* binding */ config),
/* harmony export */   controlBar: () => (/* binding */ controlBar),
/* harmony export */   holdTimeInput: () => (/* binding */ holdTimeInput),
/* harmony export */   pauseButton: () => (/* binding */ pauseButton),
/* harmony export */   start: () => (/* binding */ start),
/* harmony export */   stopButton: () => (/* binding */ stopButton),
/* harmony export */   timerDirection: () => (/* binding */ timerDirection),
/* harmony export */   timerMinutesInput: () => (/* binding */ timerMinutesInput),
/* harmony export */   timerSecondsInput: () => (/* binding */ timerSecondsInput)
/* harmony export */ });
var box = document.querySelector('.breath-box');
var boxRect = box.getBoundingClientRect();
var circle = document.querySelector('.circle');
var action = document.querySelector('.action');
var start = document.querySelector('.timer-start');
var stopButton = document.querySelector('.stop');
var pauseButton = document.querySelector('.pause');
var breathTimeInput = document.querySelector('#breath-time');
var holdTimeInput = document.querySelector('#hold-time');
var timerMinutesInput = document.querySelector('#countdown-minutes');
var timerSecondsInput = document.querySelector('#countdown-seconds');
var timerDirection = document.querySelector('#time-arrow');
var config = document.querySelector('.config');
var controlBar = document.querySelector('.control-bar');
var DEFAULT_BACKGROUND_COLOR = '#1e3250';
var INHALE_COLOR = '#0f5362';
var EXHALE_COLOR = '#c08845';
var RESET_ORANGE = '#f6786e';
var LARGE_CIRCLE_SIZE = 6;
var SMALL_CIRCLE_SIZE = 2;
var SMOOTH_PATH_TIMING = 1000;
var BREATH_CURVE = 'cubic-bezier(.13,.38,.48,1.02)';
var INHALE = 'INHALE';
var EXHALE = 'EXHALE';
var HOLD = 'HOLD';
var INHALE_SIZE = 8;
var EXHALE_SIZE = 4;
var DEFAULT_ACTION_TEXT = 'Breath Box';
var DEFAULT_ACTION_FONT_SIZE = '5vh';

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SharedIntervals: () => (/* binding */ SharedIntervals)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Timeouts = /*#__PURE__*/_createClass(function Timeouts() {
  _classCallCheck(this, Timeouts);
  _defineProperty(this, "inhaleAnimation", void 0);
  _defineProperty(this, "inhaleCountdownInterval", void 0);
  _defineProperty(this, "holdInAnimation", void 0);
  _defineProperty(this, "holdInCountdownInterval", void 0);
  _defineProperty(this, "exhaleAnimation", void 0);
  _defineProperty(this, "exhaleCountdownInterval", void 0);
  _defineProperty(this, "holdOutAnimation", void 0);
  _defineProperty(this, "holdOutCountdownInterval", void 0);
  this.inhaleAnimation = null;
  this.inhaleCountdownInterval = null;
  this.holdInAnimation = null;
  this.holdInCountdownInterval = null;
  this.exhaleAnimation = null;
  this.exhaleCountdownInterval = null;
  this.holdOutAnimation = null;
  this.holdOutCountdownInterval = null;
});
var SharedIntervals = new Timeouts();

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timer: () => (/* binding */ Timer)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

var TimerClass = /*#__PURE__*/function () {
  function TimerClass() {
    _classCallCheck(this, TimerClass);
    _defineProperty(this, "minutes", void 0);
    _defineProperty(this, "seconds", void 0);
    _defineProperty(this, "timerInterval", void 0);
    _defineProperty(this, "targetTime", void 0);
    _defineProperty(this, "internalTimer", void 0);
    _defineProperty(this, "ascending", void 0);
    this.minutes = 0;
    this.seconds = 0;
    this.internalTimer = 0;
    this.targetTime = 600;
    this.timerInterval = null;
    this.ascending = true;
  }
  _createClass(TimerClass, [{
    key: "getMinuteInput",
    value: function getMinuteInput() {
      return _common__WEBPACK_IMPORTED_MODULE_0__.timerMinutesInput.value === '' ? 0 : parseInt(_common__WEBPACK_IMPORTED_MODULE_0__.timerMinutesInput.value);
    }
  }, {
    key: "getSecondInput",
    value: function getSecondInput() {
      return _common__WEBPACK_IMPORTED_MODULE_0__.timerSecondsInput.value === '' ? 0 : parseInt(_common__WEBPACK_IMPORTED_MODULE_0__.timerSecondsInput.value);
    }
  }, {
    key: "startTimer",
    value: function startTimer() {
      this.reset();
      this.timerFn();
      this.targetTime = this.getMinuteInput() * 60 + this.getSecondInput();
      _common__WEBPACK_IMPORTED_MODULE_0__.start.style.backgroundColor = 'transparent';
      _common__WEBPACK_IMPORTED_MODULE_0__.start.style.border = 'none';
      _common__WEBPACK_IMPORTED_MODULE_0__.start.classList.remove('button');
      this.timerInterval = setInterval(this.timerFn.bind(this), 1000);
    }
  }, {
    key: "timerFn",
    value: function timerFn() {
      this.ascending ? this.incrementTimer() : this.decrementTimer();
    }
  }, {
    key: "incrementTimer",
    value: function incrementTimer() {
      ++this.seconds;
      if (this.seconds === 60) {
        ++this.minutes;
        this.seconds = 0;
      }
      _common__WEBPACK_IMPORTED_MODULE_0__.start.textContent = '' + this.minutes + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
      ++this.internalTimer;
    }
  }, {
    key: "decrementTimer",
    value: function decrementTimer() {
      if (this.seconds <= 0) {
        --this.minutes;
        this.seconds = 60;
      }
      --this.seconds;
      _common__WEBPACK_IMPORTED_MODULE_0__.start.textContent = '' + this.minutes + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
      ++this.internalTimer;
    }
  }, {
    key: "updateMinutesAndSeconds",
    value: function updateMinutesAndSeconds(seconds) {
      this.minutes = Math.floor(seconds / 60);
      this.seconds = seconds % 60;
    }
  }, {
    key: "addPauseButton",
    value: function addPauseButton() {
      _common__WEBPACK_IMPORTED_MODULE_0__.pauseButton.style.display = 'flex';
    }
  }, {
    key: "addStopButton",
    value: function addStopButton() {
      _common__WEBPACK_IMPORTED_MODULE_0__.stopButton.style.display = 'flex';
    }
  }, {
    key: "reset",
    value: function reset() {
      this.minutes = this.ascending ? 0 : this.getMinuteInput();
      this.seconds = this.ascending ? 0 : this.getSecondInput();
      this.internalTimer = 0;
      clearInterval(this.timerInterval);
    }
  }, {
    key: "reachedTime",
    value: function reachedTime() {
      return this.internalTimer >= this.targetTime;
    }
  }, {
    key: "switchDirection",
    value: function switchDirection() {
      this.ascending = !this.ascending;
    }
  }, {
    key: "clearInterval",
    value: function (_clearInterval) {
      function clearInterval() {
        return _clearInterval.apply(this, arguments);
      }
      clearInterval.toString = function () {
        return _clearInterval.toString();
      };
      return clearInterval;
    }(function () {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    })
  }]);
  return TimerClass;
}();
var Timer = new TimerClass();

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resetActionText: () => (/* binding */ resetActionText),
/* harmony export */   resetAnimations: () => (/* binding */ resetAnimations),
/* harmony export */   resetCircle: () => (/* binding */ resetCircle),
/* harmony export */   resetStartButton: () => (/* binding */ resetStartButton)
/* harmony export */ });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);



function resetCircle() {
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.width = _common__WEBPACK_IMPORTED_MODULE_0__.SMALL_CIRCLE_SIZE + 'vh';
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.height = _common__WEBPACK_IMPORTED_MODULE_0__.SMALL_CIRCLE_SIZE + 'vh';
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.backgroundColor = _common__WEBPACK_IMPORTED_MODULE_0__.RESET_ORANGE;
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.transitionProperty = '';
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.transitionDuration = '';
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.transitionTimingFunction = '';
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.bottom = '-1vh';
  _common__WEBPACK_IMPORTED_MODULE_0__.circle.style.left = '-1vh';
}
function resetStartButton() {
  _common__WEBPACK_IMPORTED_MODULE_0__.start.style.color = 'white';
  _common__WEBPACK_IMPORTED_MODULE_0__.start.style.border = '4px solid green';
  _common__WEBPACK_IMPORTED_MODULE_0__.start.style.backgroundColor = 'lightgreen';
  _common__WEBPACK_IMPORTED_MODULE_0__.start.style.borderRadius = '5vw';
  _common__WEBPACK_IMPORTED_MODULE_0__.start.textContent = 'Start';
  _common__WEBPACK_IMPORTED_MODULE_0__.start.classList.add('button');
}
function resetActionText(text) {
  var _text;
  text = (_text = text) !== null && _text !== void 0 ? _text : _common__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ACTION_TEXT;
  _common__WEBPACK_IMPORTED_MODULE_0__.action.textContent = text;
  _common__WEBPACK_IMPORTED_MODULE_0__.action.style.fontSize = _common__WEBPACK_IMPORTED_MODULE_0__.DEFAULT_ACTION_FONT_SIZE;
  _common__WEBPACK_IMPORTED_MODULE_0__.action.style.color = _common__WEBPACK_IMPORTED_MODULE_0__.RESET_ORANGE;
}
resetActionText('');
function resetAnimations() {
  clearTimeout(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.inhaleAnimation);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.inhaleAnimation = null;
  clearInterval(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.inhaleCountdownInterval);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.inhaleCountdownInterval = null;
  clearTimeout(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdInAnimation);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdInAnimation = null;
  clearInterval(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdInCountdownInterval);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdInCountdownInterval = null;
  clearTimeout(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.exhaleAnimation);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.exhaleAnimation = null;
  clearInterval(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.exhaleCountdownInterval);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.exhaleCountdownInterval = null;
  clearTimeout(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdOutAnimation);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdOutAnimation = null;
  clearInterval(_sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdOutCountdownInterval);
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_1__.SharedIntervals.holdOutCountdownInterval = null;
  _timer__WEBPACK_IMPORTED_MODULE_2__.Timer.clearInterval();
}

/***/ })
/******/ 	]);
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vhFunc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _actionText__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5);
/* harmony import */ var _reset__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6);






function animateBreathing() {
  var inhaleDuration = parseInt(_common__WEBPACK_IMPORTED_MODULE_2__.breathTimeInput.value);
  var holdInDuration = parseInt(_common__WEBPACK_IMPORTED_MODULE_2__.holdTimeInput.value);
  var exhaleDuration = parseInt(_common__WEBPACK_IMPORTED_MODULE_2__.breathTimeInput.value);
  var holdOutDuration = parseInt(_common__WEBPACK_IMPORTED_MODULE_2__.holdTimeInput.value);

  // Inhale (up)
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.inhaleCountdownInterval = (0,_actionText__WEBPACK_IMPORTED_MODULE_1__.startCountdownDecrement)(_common__WEBPACK_IMPORTED_MODULE_2__.INHALE, inhaleDuration);
  _common__WEBPACK_IMPORTED_MODULE_2__.action.style.transitionDuration = "".concat(inhaleDuration, "s");
  _common__WEBPACK_IMPORTED_MODULE_2__.action.style.transitionTimingFunction = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.BREATH_CURVE);
  _common__WEBPACK_IMPORTED_MODULE_2__.action.style.fontSize = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.INHALE_SIZE, "vh");
  _common__WEBPACK_IMPORTED_MODULE_2__.action.style.color = _common__WEBPACK_IMPORTED_MODULE_2__.INHALE_COLOR;
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionProperty = 'height width background-color left bottom';
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionDuration = "".concat(inhaleDuration, "s");
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionTimingFunction = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.BREATH_CURVE);
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.backgroundColor = _common__WEBPACK_IMPORTED_MODULE_2__.INHALE_COLOR;
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.height = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.LARGE_CIRCLE_SIZE, "vh");
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.width = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.LARGE_CIRCLE_SIZE, "vh");
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.bottom = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.box.clientHeight - (0,_vhFunc__WEBPACK_IMPORTED_MODULE_0__.vhToPx)(_common__WEBPACK_IMPORTED_MODULE_2__.LARGE_CIRCLE_SIZE) / 2, "px");
  _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.left = "-".concat(_common__WEBPACK_IMPORTED_MODULE_2__.LARGE_CIRCLE_SIZE / 2, "vh");

  // Hold In (right)
  _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.holdInAnimation = setTimeout(function () {
    _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.holdInCountdownInterval = (0,_actionText__WEBPACK_IMPORTED_MODULE_1__.startCountdownDecrement)(_common__WEBPACK_IMPORTED_MODULE_2__.HOLD, holdInDuration);
    _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionDuration = "".concat(holdInDuration, "s");
    _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionTimingFunction = 'linear';
    _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.left = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.box.clientWidth - (0,_vhFunc__WEBPACK_IMPORTED_MODULE_0__.vhToPx)(_common__WEBPACK_IMPORTED_MODULE_2__.LARGE_CIRCLE_SIZE) / 2, "px");

    // Exhale (down)
    _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.exhaleAnimation = setTimeout(function () {
      _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.exhaleCountdownInterval = (0,_actionText__WEBPACK_IMPORTED_MODULE_1__.startCountdownDecrement)(_common__WEBPACK_IMPORTED_MODULE_2__.EXHALE, exhaleDuration);
      _common__WEBPACK_IMPORTED_MODULE_2__.action.style.fontSize = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.EXHALE_SIZE, "vh");
      _common__WEBPACK_IMPORTED_MODULE_2__.action.style.color = _common__WEBPACK_IMPORTED_MODULE_2__.EXHALE_COLOR;
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionProperty = 'height width color left bottom';
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionDuration = "".concat(exhaleDuration, "s");
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionTimingFunction = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.BREATH_CURVE);
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.backgroundColor = _common__WEBPACK_IMPORTED_MODULE_2__.EXHALE_COLOR;
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.height = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.SMALL_CIRCLE_SIZE, "vh");
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.width = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.SMALL_CIRCLE_SIZE, "vh");
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.bottom = "-".concat(_common__WEBPACK_IMPORTED_MODULE_2__.SMALL_CIRCLE_SIZE / 2, "vh");
      _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.left = "".concat(_common__WEBPACK_IMPORTED_MODULE_2__.box.clientWidth - (0,_vhFunc__WEBPACK_IMPORTED_MODULE_0__.vhToPx)(_common__WEBPACK_IMPORTED_MODULE_2__.SMALL_CIRCLE_SIZE) / 2, "px");

      // Hold out (left)
      _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.holdOutAnimation = setTimeout(function () {
        _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.holdOutCountdownInterval = (0,_actionText__WEBPACK_IMPORTED_MODULE_1__.startCountdownDecrement)(_common__WEBPACK_IMPORTED_MODULE_2__.HOLD, holdOutDuration);
        _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionDuration = "".concat(holdInDuration, "s");
        _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.transitionTimingFunction = 'linear';
        _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.bottom = "-".concat(_common__WEBPACK_IMPORTED_MODULE_2__.SMALL_CIRCLE_SIZE / 2, "vh");
        _common__WEBPACK_IMPORTED_MODULE_2__.circle.style.left = "-".concat(_common__WEBPACK_IMPORTED_MODULE_2__.SMALL_CIRCLE_SIZE / 2, "vh");
        _sharedIntervals__WEBPACK_IMPORTED_MODULE_3__.SharedIntervals.inhaleAnimation = setTimeout(function () {
          animateBreathing(); // Restart the cycle
        }, holdOutDuration * _common__WEBPACK_IMPORTED_MODULE_2__.SMOOTH_PATH_TIMING);
      }, exhaleDuration * _common__WEBPACK_IMPORTED_MODULE_2__.SMOOTH_PATH_TIMING);
    }, holdInDuration * _common__WEBPACK_IMPORTED_MODULE_2__.SMOOTH_PATH_TIMING);
  }, inhaleDuration * _common__WEBPACK_IMPORTED_MODULE_2__.SMOOTH_PATH_TIMING);
}
function validInputs() {
  var valid = true;
  if ((_common__WEBPACK_IMPORTED_MODULE_2__.timerMinutesInput.value === '' || _common__WEBPACK_IMPORTED_MODULE_2__.timerMinutesInput.value === '0') && (_common__WEBPACK_IMPORTED_MODULE_2__.timerSecondsInput.value === '' || _common__WEBPACK_IMPORTED_MODULE_2__.timerSecondsInput.value === '0')) {
    _common__WEBPACK_IMPORTED_MODULE_2__.timerMinutesInput.classList.add('red');
    _common__WEBPACK_IMPORTED_MODULE_2__.timerSecondsInput.classList.add('red');
    valid = false;
  } else {
    _common__WEBPACK_IMPORTED_MODULE_2__.timerMinutesInput.classList.remove('red');
    _common__WEBPACK_IMPORTED_MODULE_2__.timerSecondsInput.classList.remove('red');
  }
  if (_common__WEBPACK_IMPORTED_MODULE_2__.breathTimeInput.value === '' || _common__WEBPACK_IMPORTED_MODULE_2__.breathTimeInput.value === '0') {
    _common__WEBPACK_IMPORTED_MODULE_2__.breathTimeInput.classList.add('red');
    valid = false;
  } else {
    _common__WEBPACK_IMPORTED_MODULE_2__.breathTimeInput.classList.remove('red');
  }
  if (_common__WEBPACK_IMPORTED_MODULE_2__.holdTimeInput.value === '' || _common__WEBPACK_IMPORTED_MODULE_2__.holdTimeInput.value === '0') {
    _common__WEBPACK_IMPORTED_MODULE_2__.holdTimeInput.classList.add('red');
    valid = false;
  } else {
    _common__WEBPACK_IMPORTED_MODULE_2__.holdTimeInput.classList.remove('red');
  }
  return valid;
}
var started = false;
var checkTimerInterval;
function startBreathBox() {
  if (!validInputs() || started) {
    return;
  }
  _common__WEBPACK_IMPORTED_MODULE_2__.config.classList.add('hidden');
  _common__WEBPACK_IMPORTED_MODULE_2__.controlBar.classList.add('top-buffer');
  started = true;
  _timer__WEBPACK_IMPORTED_MODULE_4__.Timer.startTimer();
  checkTimerInterval = setInterval(checkTimer, 1000);
  _timer__WEBPACK_IMPORTED_MODULE_4__.Timer.addPauseButton();
  _timer__WEBPACK_IMPORTED_MODULE_4__.Timer.addStopButton();
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetActionText)('');
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetCircle)();
  animateBreathing();
}
var tone = new Audio('assets/audio/tone.mp3');
function checkTimer() {
  if (started && _timer__WEBPACK_IMPORTED_MODULE_4__.Timer.reachedTime()) {
    void tone.play();
    setTimeout(function () {
      alert('You have reached your target!');
    }, 50);
    stopBreathBox();
  }
}
function stopBreathBox() {
  started = false;
  _timer__WEBPACK_IMPORTED_MODULE_4__.Timer.reset();
  clearTimeout(checkTimerInterval);
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetAnimations)();
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetActionText)('');
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetCircle)();
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetStartButton)();
  _common__WEBPACK_IMPORTED_MODULE_2__.stopButton.style.display = 'none';
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.style.display = 'none';
  _common__WEBPACK_IMPORTED_MODULE_2__.config.classList.remove('hidden');
  _common__WEBPACK_IMPORTED_MODULE_2__.controlBar.classList.remove('top-buffer');
}
function pauseBreathBox() {
  started = false;
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetAnimations)();
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetActionText)('Paused');
  _common__WEBPACK_IMPORTED_MODULE_2__.action.style.color = '#ff8c00'; // dark orange
  (0,_reset__WEBPACK_IMPORTED_MODULE_5__.resetCircle)();
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.style.color = 'green';
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.textContent = '▶';
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.onclick = resumeBreathBox;
}
function resumeBreathBox() {
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.style.color = _common__WEBPACK_IMPORTED_MODULE_2__.RESET_ORANGE;
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.textContent = '||';
  _common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.onclick = pauseBreathBox;
  startBreathBox();
}
function flipArrow() {
  if (_common__WEBPACK_IMPORTED_MODULE_2__.timerDirection.classList.contains('point-up')) {
    _common__WEBPACK_IMPORTED_MODULE_2__.timerDirection.classList.replace('point-up', 'point-down');
  } else {
    _common__WEBPACK_IMPORTED_MODULE_2__.timerDirection.classList.replace('point-down', 'point-up');
  }
  _timer__WEBPACK_IMPORTED_MODULE_4__.Timer.switchDirection();
}
_common__WEBPACK_IMPORTED_MODULE_2__.timerDirection.onclick = flipArrow;
_common__WEBPACK_IMPORTED_MODULE_2__.start.onclick = startBreathBox;
_common__WEBPACK_IMPORTED_MODULE_2__.stopButton.onclick = stopBreathBox;
_common__WEBPACK_IMPORTED_MODULE_2__.pauseButton.onclick = pauseBreathBox;
})();

/******/ })()
;