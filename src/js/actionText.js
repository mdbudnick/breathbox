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
//# sourceMappingURL=actionText.js.map