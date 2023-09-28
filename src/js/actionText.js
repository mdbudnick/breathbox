"use strict";
// We have to do this each time because the window can be resized
function calculateTextWidth(text, size) {
    invisible.style.fontSize = `${size}vh`;
    invisible.textContent = text;
    let width = invisible.clientWidth;
    invisible.textContent = "";
    return width;
}
function calculateTextHeight(text, size) {
    invisible.style.fontSize = `${size}vh`;
    invisible.textContent = text;
    let height = invisible.clientHeight;
    invisible.textContent = "";
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
            action.textContent = text + "\r\n" + time;
        }
        else {
            action.textContent = text;
            // It cancels itself
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }, 1000);
    // Do it the first time
    action.textContent = text + "\r\n" + time;
    return countdownInterval;
}
//# sourceMappingURL=actionText.js.map