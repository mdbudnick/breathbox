"use strict";
function resetCircle() {
    circle.style.width = SMALL_CIRCLE_SIZE + "vh";
    circle.style.height = SMALL_CIRCLE_SIZE + "vh";
    circle.style.backgroundColor = RESET_ORANGE;
    circle.style.transitionProperty = "";
    circle.style.transitionDuration = "";
    circle.style.transitionTimingFunction = "";
    circle.style.bottom = "-1vh";
    circle.style.left = "-1vh";
}
function resetStartButton() {
    start.style.color = "white";
    start.style.border = "4px solid green";
    start.style.backgroundColor = "lightgreen";
    start.style.borderRadius = "5vw";
    start.textContent = "Start";
    start.classList.add("button");
}
function resetActionText(text) {
    text = text || DEFAULT_ACTION_TEXT;
    action.textContent = text;
    action.style.fontSize = DEFAULT_ACTION_FONT_SIZE;
    action.style.color = RESET_ORANGE;
}
resetActionText("");
let inhaleAnimation;
let inhaleCountdownInterval;
let holdInAnimation;
let holdInCountdownInterval;
let exhaleAnimation;
let exhaleCountdownInterval;
let holdOutAnimation;
let holdOutCountdownInterval;
function resetAnimations() {
    clearTimeout(inhaleAnimation);
    inhaleAnimation = null;
    clearInterval(inhaleCountdownInterval);
    inhaleCountdownInterval = null;
    clearTimeout(holdInAnimation);
    holdInAnimation = null;
    clearInterval(holdInCountdownInterval);
    holdInCountdownInterval = null;
    clearTimeout(exhaleAnimation);
    exhaleAnimation = null;
    clearInterval(exhaleCountdownInterval);
    exhaleCountdownInterval = null;
    clearTimeout(holdOutAnimation);
    holdOutAnimation = null;
    clearInterval(holdOutCountdownInterval);
    holdOutCountdownInterval = null;
    clearInterval(timerInterval);
    timerInterval = null;
}
//# sourceMappingURL=reset.js.map