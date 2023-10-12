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
        "height width background-color left bottom";
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
        common.circle.style.transitionTimingFunction = "linear";
        common.circle.style.left = `${common.box.clientWidth - (0, vhFunc_1.vhToPx)(common.LARGE_CIRCLE_SIZE) / 2}px`;
        // Exhale (down)
        sharedIntervals_1.SharedIntervals.exhaleAnimation = setTimeout(() => {
            sharedIntervals_1.SharedIntervals.exhaleCountdownInterval = (0, actionText_1.startCountdownDecrement)(common.EXHALE, exhaleDuration);
            common.action.style.fontSize = `${common.EXHALE_SIZE}vh`;
            common.action.style.color = common.EXHALE_COLOR;
            common.circle.style.transitionProperty = "height width color left bottom";
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
                common.circle.style.transitionTimingFunction = "linear";
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
let checkTimerInterval;
function startBreathBox() {
    if ((common.timerMinutesInput.value == "" ||
        common.timerMinutesInput.value === "0") &&
        (common.timerSecondsInput.value == "" ||
            common.timerSecondsInput.value === "0")) {
        common.timerMinutesInput.classList.add("red");
        common.timerSecondsInput.classList.add("red");
        return;
    }
    if (started) {
        return;
    }
    common.timerMinutesInput.classList.remove("red");
    common.timerSecondsInput.classList.remove("red");
    common.config.classList.add("hidden");
    common.controlBar.classList.add("top-buffer");
    started = true;
    timer_1.Timer.startTimer();
    checkTimerInterval = setInterval(checkTimer, 1000);
    timer_1.Timer.addPauseButton();
    timer_1.Timer.addStopButton();
    (0, reset_1.resetActionText)("");
    (0, reset_1.resetCircle)();
    animateBreathing();
}
let tone = new Audio("audio/tone.mp3");
function checkTimer() {
    if (started && timer_1.Timer.reachedTime()) {
        tone.play();
        setTimeout(() => alert("You have reached your target!"), 50);
        stopBreathBox();
    }
}
function stopBreathBox() {
    started = false;
    timer_1.Timer.reset();
    clearTimeout(checkTimerInterval);
    (0, reset_1.resetAnimations)();
    (0, reset_1.resetActionText)("");
    (0, reset_1.resetCircle)();
    (0, reset_1.resetStartButton)();
    common.stopButton.style.display = "none";
    common.pauseButton.style.display = "none";
    common.config.classList.remove("hidden");
    common.controlBar.classList.remove("top-buffer");
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
function flipArrow() {
    if (common.timerDirection.classList.contains("point-up")) {
        common.timerDirection.classList.replace("point-up", "point-down");
    }
    else {
        common.timerDirection.classList.replace("point-down", "point-up");
    }
    timer_1.Timer.ascending = !timer_1.Timer.ascending;
}
common.timerDirection.onclick = flipArrow;
common.start.onclick = startBreathBox;
common.stopButton.onclick = stopBreathBox;
common.pauseButton.onclick = pauseBreathBox;
//# sourceMappingURL=main.js.map