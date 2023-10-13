/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vhFunc_1 = __webpack_require__(1);
const actionText_1 = __webpack_require__(2);
const common = __importStar(__webpack_require__(3));
const sharedIntervals_1 = __webpack_require__(4);
const timer_1 = __webpack_require__(5);
const reset_1 = __webpack_require__(6);
function animateBreathing() {
    const inhaleDuration = parseInt(common.breathTimeInput.value);
    const holdInDuration = parseInt(common.holdTimeInput.value);
    const exhaleDuration = parseInt(common.breathTimeInput.value);
    const holdOutDuration = parseInt(common.holdTimeInput.value);
    // Inhale (up)
    sharedIntervals_1.SharedIntervals.inhaleCountdownInterval = (0, actionText_1.startCountdownDecrement)(common.INHALE, inhaleDuration);
    common.action.style.transitionDuration = `${inhaleDuration}s`;
    common.action.style.transitionTimingFunction = `${common.BREATH_CURVE}`;
    common.action.style.fontSize = `${common.INHALE_SIZE}vh`;
    common.action.style.color = common.INHALE_COLOR;
    common.circle.style.transitionProperty =
        'height width background-color left bottom';
    common.circle.style.transitionDuration = `${inhaleDuration}s`;
    common.circle.style.transitionTimingFunction = `${common.BREATH_CURVE}`;
    common.circle.style.backgroundColor = common.INHALE_COLOR;
    common.circle.style.height = `${common.LARGE_CIRCLE_SIZE}vh`;
    common.circle.style.width = `${common.LARGE_CIRCLE_SIZE}vh`;
    common.circle.style.bottom = `${common.box.clientHeight - (0, vhFunc_1.vhToPx)(common.LARGE_CIRCLE_SIZE) / 2}px`;
    common.circle.style.left = `-${common.LARGE_CIRCLE_SIZE / 2}vh`;
    // Hold In (right)
    sharedIntervals_1.SharedIntervals.holdInAnimation = setTimeout(() => {
        sharedIntervals_1.SharedIntervals.holdInCountdownInterval = (0, actionText_1.startCountdownDecrement)(common.HOLD, holdInDuration);
        common.circle.style.transitionDuration = `${holdInDuration}s`;
        common.circle.style.transitionTimingFunction = 'linear';
        common.circle.style.left = `${common.box.clientWidth - (0, vhFunc_1.vhToPx)(common.LARGE_CIRCLE_SIZE) / 2}px`;
        // Exhale (down)
        sharedIntervals_1.SharedIntervals.exhaleAnimation = setTimeout(() => {
            sharedIntervals_1.SharedIntervals.exhaleCountdownInterval = (0, actionText_1.startCountdownDecrement)(common.EXHALE, exhaleDuration);
            common.action.style.fontSize = `${common.EXHALE_SIZE}vh`;
            common.action.style.color = common.EXHALE_COLOR;
            common.circle.style.transitionProperty = 'height width color left bottom';
            common.circle.style.transitionDuration = `${exhaleDuration}s`;
            common.circle.style.transitionTimingFunction = `${common.BREATH_CURVE}`;
            common.circle.style.backgroundColor = common.EXHALE_COLOR;
            common.circle.style.height = `${common.SMALL_CIRCLE_SIZE}vh`;
            common.circle.style.width = `${common.SMALL_CIRCLE_SIZE}vh`;
            common.circle.style.bottom = `-${common.SMALL_CIRCLE_SIZE / 2}vh`;
            common.circle.style.left = `${common.box.clientWidth - (0, vhFunc_1.vhToPx)(common.SMALL_CIRCLE_SIZE) / 2}px`;
            // Hold out (left)
            sharedIntervals_1.SharedIntervals.holdOutAnimation = setTimeout(() => {
                sharedIntervals_1.SharedIntervals.holdOutCountdownInterval = (0, actionText_1.startCountdownDecrement)(common.HOLD, holdOutDuration);
                common.circle.style.transitionDuration = `${holdInDuration}s`;
                common.circle.style.transitionTimingFunction = 'linear';
                common.circle.style.bottom = `-${common.SMALL_CIRCLE_SIZE / 2}vh`;
                common.circle.style.left = `-${common.SMALL_CIRCLE_SIZE / 2}vh`;
                sharedIntervals_1.SharedIntervals.inhaleAnimation = setTimeout(() => {
                    animateBreathing(); // Restart the cycle
                }, holdOutDuration * common.SMOOTH_PATH_TIMING);
            }, exhaleDuration * common.SMOOTH_PATH_TIMING);
        }, holdInDuration * common.SMOOTH_PATH_TIMING);
    }, inhaleDuration * common.SMOOTH_PATH_TIMING);
}
function validInputs() {
    let valid = true;
    if ((common.timerMinutesInput.value === '' ||
        common.timerMinutesInput.value === '0') &&
        (common.timerSecondsInput.value === '' ||
            common.timerSecondsInput.value === '0')) {
        common.timerMinutesInput.classList.add('red');
        common.timerSecondsInput.classList.add('red');
        valid = false;
    }
    else {
        common.timerMinutesInput.classList.remove('red');
        common.timerSecondsInput.classList.remove('red');
    }
    if (common.breathTimeInput.value === '' ||
        common.breathTimeInput.value === '0') {
        common.breathTimeInput.classList.add('red');
        valid = false;
    }
    else {
        common.breathTimeInput.classList.remove('red');
    }
    if (common.holdTimeInput.value === '' || common.holdTimeInput.value === '0') {
        common.holdTimeInput.classList.add('red');
        valid = false;
    }
    else {
        common.holdTimeInput.classList.remove('red');
    }
    return valid;
}
let started = false;
let checkTimerInterval;
function startBreathBox() {
    if (!validInputs() || started) {
        return;
    }
    common.config.classList.add('hidden');
    common.controlBar.classList.add('top-buffer');
    started = true;
    timer_1.Timer.startTimer();
    checkTimerInterval = setInterval(checkTimer, 1000);
    timer_1.Timer.addPauseButton();
    timer_1.Timer.addStopButton();
    (0, reset_1.resetActionText)('');
    (0, reset_1.resetCircle)();
    animateBreathing();
}
const tone = new Audio('audio/tone.mp3');
function checkTimer() {
    if (started && timer_1.Timer.reachedTime()) {
        void tone.play();
        setTimeout(() => { alert('You have reached your target!'); }, 50);
        stopBreathBox();
    }
}
function stopBreathBox() {
    started = false;
    timer_1.Timer.reset();
    clearTimeout(checkTimerInterval);
    (0, reset_1.resetAnimations)();
    (0, reset_1.resetActionText)('');
    (0, reset_1.resetCircle)();
    (0, reset_1.resetStartButton)();
    common.stopButton.style.display = 'none';
    common.pauseButton.style.display = 'none';
    common.config.classList.remove('hidden');
    common.controlBar.classList.remove('top-buffer');
}
function pauseBreathBox() {
    started = false;
    (0, reset_1.resetAnimations)();
    (0, reset_1.resetActionText)('Paused');
    common.action.style.color = '#ff8c00'; // dark orange
    (0, reset_1.resetCircle)();
    common.pauseButton.style.color = 'green';
    common.pauseButton.textContent = '▶';
    common.pauseButton.onclick = resumeBreathBox;
}
function resumeBreathBox() {
    common.pauseButton.style.color = common.RESET_ORANGE;
    common.pauseButton.textContent = '||';
    common.pauseButton.onclick = pauseBreathBox;
    startBreathBox();
}
function flipArrow() {
    if (common.timerDirection.classList.contains('point-up')) {
        common.timerDirection.classList.replace('point-up', 'point-down');
    }
    else {
        common.timerDirection.classList.replace('point-down', 'point-up');
    }
    timer_1.Timer.switchDirection();
}
common.timerDirection.onclick = flipArrow;
common.start.onclick = startBreathBox;
common.stopButton.onclick = stopBreathBox;
common.pauseButton.onclick = pauseBreathBox;


/***/ }),
/* 1 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.vmax = exports.vmin = exports.pxToVw = exports.pxToVh = exports.vwToPx = exports.vhToPx = void 0;
function vhToPx(percent) {
    var _a;
    const h = Math.max(document.documentElement.clientHeight, (_a = window.innerHeight) !== null && _a !== void 0 ? _a : 0);
    return (percent * h) / 100;
}
exports.vhToPx = vhToPx;
function vwToPx(percent) {
    var _a;
    const w = Math.max(document.documentElement.clientWidth, (_a = window.innerWidth) !== null && _a !== void 0 ? _a : 0);
    return (percent * w) / 100;
}
exports.vwToPx = vwToPx;
function pxToVh(px) {
    var _a;
    const h = Math.max(document.documentElement.clientHeight, (_a = window.innerHeight) !== null && _a !== void 0 ? _a : 0);
    return (px / h) * 100;
}
exports.pxToVh = pxToVh;
function pxToVw(px) {
    var _a;
    const w = Math.max(document.documentElement.clientWidth, (_a = window.innerWidth) !== null && _a !== void 0 ? _a : 0);
    return (px / w) * 100;
}
exports.pxToVw = pxToVw;
function vmin(percent) {
    return Math.min(pxToVh(percent), pxToVw(percent));
}
exports.vmin = vmin;
function vmax(percent) {
    return Math.max(pxToVh(percent), pxToVw(percent));
}
exports.vmax = vmax;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startCountdownDecrement = void 0;
// We have to do this each time because the window can be resized
const common_1 = __webpack_require__(3);
function startCountdownDecrement(text, time) {
    let countdownInterval;
    countdownInterval = setInterval(() => {
        --time;
        if (time !== 0) {
            common_1.action.textContent = text + '\r\n' + time;
        }
        else {
            common_1.action.textContent = text;
            // It cancels itself
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }, 1000);
    // Do it the first time
    common_1.action.textContent = text + '\r\n' + time;
    return countdownInterval;
}
exports.startCountdownDecrement = startCountdownDecrement;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DEFAULT_ACTION_FONT_SIZE = exports.DEFAULT_ACTION_TEXT = exports.EXHALE_SIZE = exports.INHALE_SIZE = exports.HOLD = exports.EXHALE = exports.INHALE = exports.BREATH_CURVE = exports.SMOOTH_PATH_TIMING = exports.SMALL_CIRCLE_SIZE = exports.LARGE_CIRCLE_SIZE = exports.RESET_ORANGE = exports.EXHALE_COLOR = exports.INHALE_COLOR = exports.DEFAULT_BACKGROUND_COLOR = exports.controlBar = exports.config = exports.timerDirection = exports.timerSecondsInput = exports.timerMinutesInput = exports.holdTimeInput = exports.breathTimeInput = exports.pauseButton = exports.stopButton = exports.start = exports.invisible = exports.action = exports.circle = exports.boxRect = exports.box = void 0;
exports.box = document.querySelector('.breath-box');
exports.boxRect = exports.box.getBoundingClientRect();
exports.circle = document.querySelector('.circle');
exports.action = document.querySelector('.action');
exports.invisible = document.querySelector('.invisible');
exports.start = document.querySelector('.timer-start');
exports.stopButton = document.querySelector('.stop');
exports.pauseButton = document.querySelector('.pause');
exports.breathTimeInput = document.querySelector('#breath-time');
exports.holdTimeInput = document.querySelector('#hold-time');
exports.timerMinutesInput = document.querySelector('#countdown-minutes');
exports.timerSecondsInput = document.querySelector('#countdown-seconds');
exports.timerDirection = document.querySelector('#time-arrow');
exports.config = document.querySelector('.config');
exports.controlBar = document.querySelector('.control-bar');
exports.DEFAULT_BACKGROUND_COLOR = '#1e3250';
exports.INHALE_COLOR = '#0f5362';
exports.EXHALE_COLOR = '#c08845';
exports.RESET_ORANGE = '#f6786e';
exports.LARGE_CIRCLE_SIZE = 6;
exports.SMALL_CIRCLE_SIZE = 2;
exports.SMOOTH_PATH_TIMING = 1000;
exports.BREATH_CURVE = 'cubic-bezier(.13,.38,.48,1.02)';
exports.INHALE = 'INHALE';
exports.EXHALE = 'EXHALE';
exports.HOLD = 'HOLD';
exports.INHALE_SIZE = 8;
exports.EXHALE_SIZE = 4;
exports.DEFAULT_ACTION_TEXT = 'Breath Box';
exports.DEFAULT_ACTION_FONT_SIZE = '5vh';


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SharedIntervals = void 0;
class Timeouts {
    constructor() {
        this.inhaleAnimation = null;
        this.inhaleCountdownInterval = null;
        this.holdInAnimation = null;
        this.holdInCountdownInterval = null;
        this.exhaleAnimation = null;
        this.exhaleCountdownInterval = null;
        this.holdOutAnimation = null;
        this.holdOutCountdownInterval = null;
    }
}
exports.SharedIntervals = new Timeouts();


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timer = void 0;
const common_1 = __webpack_require__(3);
class TimerClass {
    constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.internalTimer = 0;
        this.targetTime = 600;
        this.timerInterval = null;
        this.ascending = true;
    }
    getMinuteInput() {
        return common_1.timerMinutesInput.value === '' ? 0 : parseInt(common_1.timerMinutesInput.value);
    }
    getSecondInput() {
        return common_1.timerSecondsInput.value === '' ? 0 : parseInt(common_1.timerSecondsInput.value);
    }
    startTimer() {
        this.reset();
        this.timerFn();
        this.targetTime = this.getMinuteInput() * 60 + this.getSecondInput();
        common_1.start.style.backgroundColor = 'transparent';
        common_1.start.style.border = 'none';
        common_1.start.classList.remove('button');
        this.timerInterval = setInterval(this.timerFn.bind(this), 1000);
    }
    timerFn() {
        this.ascending ? this.incrementTimer() : this.decrementTimer();
    }
    incrementTimer() {
        ++this.seconds;
        if (this.seconds === 60) {
            ++this.minutes;
            this.seconds = 0;
        }
        common_1.start.textContent =
            '' +
                this.minutes +
                ':' +
                (this.seconds < 10 ? '0' + this.seconds : this.seconds);
        ++this.internalTimer;
    }
    decrementTimer() {
        if (this.seconds <= 0) {
            --this.minutes;
            this.seconds = 60;
        }
        --this.seconds;
        common_1.start.textContent =
            '' +
                this.minutes +
                ':' +
                (this.seconds < 10 ? '0' + this.seconds : this.seconds);
        ++this.internalTimer;
    }
    updateMinutesAndSeconds(seconds) {
        this.minutes = Math.floor(seconds / 60);
        this.seconds = seconds % 60;
    }
    addPauseButton() {
        common_1.pauseButton.style.display = 'flex';
    }
    addStopButton() {
        common_1.stopButton.style.display = 'flex';
    }
    reset() {
        this.minutes = this.ascending ? 0 : this.getMinuteInput();
        this.seconds = this.ascending ? 0 : this.getSecondInput();
        this.internalTimer = 0;
        clearInterval(this.timerInterval);
    }
    reachedTime() {
        return this.internalTimer >= this.targetTime;
    }
    switchDirection() {
        this.ascending = !this.ascending;
    }
    clearInterval() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
    }
}
exports.Timer = new TimerClass();


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.resetAnimations = exports.resetActionText = exports.resetStartButton = exports.resetCircle = void 0;
const common = __importStar(__webpack_require__(3));
const sharedIntervals_1 = __webpack_require__(4);
const timer_1 = __webpack_require__(5);
function resetCircle() {
    common.circle.style.width = common.SMALL_CIRCLE_SIZE + 'vh';
    common.circle.style.height = common.SMALL_CIRCLE_SIZE + 'vh';
    common.circle.style.backgroundColor = common.RESET_ORANGE;
    common.circle.style.transitionProperty = '';
    common.circle.style.transitionDuration = '';
    common.circle.style.transitionTimingFunction = '';
    common.circle.style.bottom = '-1vh';
    common.circle.style.left = '-1vh';
}
exports.resetCircle = resetCircle;
function resetStartButton() {
    common.start.style.color = 'white';
    common.start.style.border = '4px solid green';
    common.start.style.backgroundColor = 'lightgreen';
    common.start.style.borderRadius = '5vw';
    common.start.textContent = 'Start';
    common.start.classList.add('button');
}
exports.resetStartButton = resetStartButton;
function resetActionText(text) {
    text = text !== null && text !== void 0 ? text : common.DEFAULT_ACTION_TEXT;
    common.action.textContent = text;
    common.action.style.fontSize = common.DEFAULT_ACTION_FONT_SIZE;
    common.action.style.color = common.RESET_ORANGE;
}
exports.resetActionText = resetActionText;
resetActionText('');
function resetAnimations() {
    clearTimeout(sharedIntervals_1.SharedIntervals.inhaleAnimation);
    sharedIntervals_1.SharedIntervals.inhaleAnimation = null;
    clearInterval(sharedIntervals_1.SharedIntervals.inhaleCountdownInterval);
    sharedIntervals_1.SharedIntervals.inhaleCountdownInterval = null;
    clearTimeout(sharedIntervals_1.SharedIntervals.holdInAnimation);
    sharedIntervals_1.SharedIntervals.holdInAnimation = null;
    clearInterval(sharedIntervals_1.SharedIntervals.holdInCountdownInterval);
    sharedIntervals_1.SharedIntervals.holdInCountdownInterval = null;
    clearTimeout(sharedIntervals_1.SharedIntervals.exhaleAnimation);
    sharedIntervals_1.SharedIntervals.exhaleAnimation = null;
    clearInterval(sharedIntervals_1.SharedIntervals.exhaleCountdownInterval);
    sharedIntervals_1.SharedIntervals.exhaleCountdownInterval = null;
    clearTimeout(sharedIntervals_1.SharedIntervals.holdOutAnimation);
    sharedIntervals_1.SharedIntervals.holdOutAnimation = null;
    clearInterval(sharedIntervals_1.SharedIntervals.holdOutCountdownInterval);
    sharedIntervals_1.SharedIntervals.holdOutCountdownInterval = null;
    timer_1.Timer.clearInterval();
}
exports.resetAnimations = resetAnimations;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	
/******/ })()
;