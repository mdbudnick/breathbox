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
//# sourceMappingURL=reset.js.map