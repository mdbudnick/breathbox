(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startCountdownDecrement = void 0;
// We have to do this each time because the window can be resized
const common_1 = require("./common");
function calculateTextWidth(text, size) {
    common_1.invisible.style.fontSize = `${size}vh`;
    common_1.invisible.textContent = text;
    let width = common_1.invisible.clientWidth;
    common_1.invisible.textContent = "";
    return width;
}
function calculateTextHeight(text, size) {
    common_1.invisible.style.fontSize = `${size}vh`;
    common_1.invisible.textContent = text;
    let height = common_1.invisible.clientHeight;
    common_1.invisible.textContent = "";
    return height;
}
function calculateCountdown(countdown) {
    return countdown - 1;
}
function startCountdownDecrement(text, time) {
    let countdownInterval;
    countdownInterval = setInterval(() => {
        --time;
        let countdownNs = Date.now();
        if (time) {
            common_1.action.textContent = text + "\r\n" + time;
        }
        else {
            common_1.action.textContent = text;
            // It cancels itself
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }, 1000);
    // Do it the first time
    common_1.action.textContent = text + "\r\n" + time;
    return countdownInterval;
}
exports.startCountdownDecrement = startCountdownDecrement;

},{"./common":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_ACTION_FONT_SIZE = exports.DEFAULT_ACTION_TEXT = exports.EXHALE_SIZE = exports.INHALE_SIZE = exports.HOLD = exports.EXHALE = exports.INHALE = exports.HOLD_RATIO = exports.BREATH_CURVE = exports.BREATH_RATIO = exports.SMOOTH_PATH_TIMING = exports.SMALL_CIRCLE_SIZE = exports.LARGE_CIRCLE_SIZE = exports.RESET_ORANGE = exports.EXHALE_COLOR = exports.INHALE_COLOR = exports.DEFAULT_BACKGROUND_COLOR = exports.pauseButton = exports.stopButton = exports.start = exports.invisible = exports.action = exports.circle = exports.boxRect = exports.box = void 0;
exports.box = document.querySelector('.breath-box');
exports.boxRect = exports.box.getBoundingClientRect();
exports.circle = document.querySelector('.circle');
exports.action = document.querySelector('.action');
exports.invisible = document.querySelector('.invisible');
exports.start = document.querySelector('.timer-start');
exports.stopButton = document.querySelector('.stop');
exports.pauseButton = document.querySelector('.pause');
exports.DEFAULT_BACKGROUND_COLOR = "#1e3250";
exports.INHALE_COLOR = "#0f5362";
exports.EXHALE_COLOR = "#c08845";
exports.RESET_ORANGE = "#f6786e";
exports.LARGE_CIRCLE_SIZE = 6;
exports.SMALL_CIRCLE_SIZE = 2;
exports.SMOOTH_PATH_TIMING = 1000;
exports.BREATH_RATIO = 6;
exports.BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)";
exports.HOLD_RATIO = 3;
exports.INHALE = "INHALE";
exports.EXHALE = "EXHALE";
exports.HOLD = "HOLD";
exports.INHALE_SIZE = 8;
exports.EXHALE_SIZE = 4;
exports.DEFAULT_ACTION_TEXT = "Breath Box";
exports.DEFAULT_ACTION_FONT_SIZE = "5vh";

},{}],3:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const vhFunc_1 = require("./vhFunc");
const actionText_1 = require("./actionText");
const common = __importStar(require("./common"));
const sharedIntervals_1 = require("./sharedIntervals");
const timer_1 = require("./timer");
const reset_1 = require("./reset");
function animateBreathing() {
    const inhaleDuration = common.BREATH_RATIO;
    const holdInDuration = common.HOLD_RATIO;
    const exhaleDuration = common.BREATH_RATIO;
    const holdOutDuration = common.HOLD_RATIO;
    // Inhale (up)
    sharedIntervals_1.SharedIntervals.inhaleCountdownInterval = (0, actionText_1.startCountdownDecrement)(common.INHALE, inhaleDuration);
    common.action.style.transitionDuration = `${inhaleDuration}s`;
    common.action.style.transitionTimingFunction = `${common.BREATH_CURVE}`;
    common.action.style.fontSize = `${common.INHALE_SIZE}vh`;
    common.action.style.color = common.INHALE_COLOR;
    common.circle.style.transitionProperty = 'height width background-color left bottom';
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
        common.circle.style.left = `${common.box.clientWidth - ((0, vhFunc_1.vhToPx)(common.LARGE_CIRCLE_SIZE) / 2)}px`;
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
let started = false;
function startBreathBox() {
    if (started) {
        return;
    }
    started = true;
    timer_1.Timer.startTimer();
    timer_1.Timer.addPauseButton();
    timer_1.Timer.addStopButton();
    (0, reset_1.resetActionText)("");
    (0, reset_1.resetCircle)();
    animateBreathing();
}
function stopBreathBox() {
    started = false;
    timer_1.Timer.reset();
    (0, reset_1.resetAnimations)();
    (0, reset_1.resetActionText)("");
    (0, reset_1.resetCircle)();
    (0, reset_1.resetStartButton)();
    common.stopButton.style.display = "none";
    common.pauseButton.style.display = "none";
}
function pauseBreathBox() {
    started = false;
    (0, reset_1.resetAnimations)();
    (0, reset_1.resetActionText)("Paused");
    common.action.style.color = "#ff8c00"; // dark orange
    (0, reset_1.resetCircle)();
    common.pauseButton.style.color = "green";
    common.pauseButton.textContent = "▶";
    common.pauseButton.onclick = resumeBreathBox;
}
function resumeBreathBox() {
    common.pauseButton.style.color = common.RESET_ORANGE;
    common.pauseButton.textContent = "||";
    common.pauseButton.onclick = pauseBreathBox;
    startBreathBox();
}
common.start.onclick = startBreathBox;
common.stopButton.onclick = stopBreathBox;
common.pauseButton.onclick = pauseBreathBox;

},{"./actionText":1,"./common":2,"./reset":4,"./sharedIntervals":5,"./timer":6,"./vhFunc":7}],4:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetAnimations = exports.resetActionText = exports.resetStartButton = exports.resetCircle = void 0;
const common = __importStar(require("./common"));
const sharedIntervals_1 = require("./sharedIntervals");
const timer_1 = require("./timer");
function resetCircle() {
    common.circle.style.width = common.SMALL_CIRCLE_SIZE + "vh";
    common.circle.style.height = common.SMALL_CIRCLE_SIZE + "vh";
    common.circle.style.backgroundColor = common.RESET_ORANGE;
    common.circle.style.transitionProperty = "";
    common.circle.style.transitionDuration = "";
    common.circle.style.transitionTimingFunction = "";
    common.circle.style.bottom = "-1vh";
    common.circle.style.left = "-1vh";
}
exports.resetCircle = resetCircle;
function resetStartButton() {
    common.start.style.color = "white";
    common.start.style.border = "4px solid green";
    common.start.style.backgroundColor = "lightgreen";
    common.start.style.borderRadius = "5vw";
    common.start.textContent = "Start";
    common.start.classList.add("button");
}
exports.resetStartButton = resetStartButton;
function resetActionText(text) {
    text = text || common.DEFAULT_ACTION_TEXT;
    common.action.textContent = text;
    common.action.style.fontSize = common.DEFAULT_ACTION_FONT_SIZE;
    common.action.style.color = common.RESET_ORANGE;
}
exports.resetActionText = resetActionText;
resetActionText("");
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
    clearInterval(timer_1.Timer.timerInterval);
    timer_1.Timer.timerInterval = null;
}
exports.resetAnimations = resetAnimations;

},{"./common":2,"./sharedIntervals":5,"./timer":6}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const common_1 = require("./common");
class TimerClass {
    constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.timerInterval = null;
    }
    startTimer() {
        this.incrementTimer();
        common_1.start.style.backgroundColor = "transparent";
        common_1.start.style.border = "none";
        common_1.start.classList.remove("button");
        this.timerInterval = setInterval(this.incrementTimer.bind(this), 1000);
    }
    incrementTimer() {
        ++this.seconds;
        if (this.seconds == 60) {
            ++this.minutes;
            this.seconds = 0;
        }
        common_1.start.textContent =
            "" + this.minutes + ":" + (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    }
    addPauseButton() {
        common_1.pauseButton.style.display = "flex";
    }
    addStopButton() {
        common_1.stopButton.style.display = "flex";
    }
    reset() {
        this.minutes = 0;
        this.seconds = 0;
    }
}
exports.Timer = new TimerClass();

},{"./common":2}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmax = exports.vmin = exports.pxToVw = exports.pxToVh = exports.vwToPx = exports.vhToPx = void 0;
function vhToPx(percent) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
exports.vhToPx = vhToPx;
function vwToPx(percent) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}
exports.vwToPx = vwToPx;
function pxToVh(px) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (px / h) * 100;
}
exports.pxToVh = pxToVh;
function pxToVw(px) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
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

},{}]},{},[2,7,1,6,4,3]);
