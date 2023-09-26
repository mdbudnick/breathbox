"use strict";
function animateBreathing() {
    const inhaleDuration = BREATH_RATIO;
    const holdInDuration = HOLD_RATIO;
    const exhaleDuration = BREATH_RATIO;
    const holdOutDuration = HOLD_RATIO;
    // Inhale (up)
    inhaleCountdownInterval = startCountdownDecrement(INHALE, inhaleDuration);
    action.style.transitionDuration = `${inhaleDuration}s`;
    action.style.transitionTimingFunction = `${BREATH_CURVE}`;
    action.style.fontSize = `${INHALE_SIZE}vh`;
    action.style.color = INHALE_COLOR;
    circle.style.transitionProperty = 'height width background-color left bottom';
    circle.style.transitionDuration = `${inhaleDuration}s`;
    circle.style.transitionTimingFunction = `${BREATH_CURVE}`;
    circle.style.backgroundColor = INHALE_COLOR;
    circle.style.height = `${LARGE_CIRCLE_SIZE}vh`;
    circle.style.width = `${LARGE_CIRCLE_SIZE}vh`;
    circle.style.bottom = `${box.clientHeight - vhToPx(LARGE_CIRCLE_SIZE) / 2}px`;
    circle.style.left = `-${LARGE_CIRCLE_SIZE / 2}vh`;
    // Hold In (right)
    holdInAnimation = setTimeout(() => {
        holdInCountdownInterval = startCountdownDecrement(HOLD, holdInDuration);
        circle.style.transitionDuration = `${holdInDuration}s`;
        circle.style.transitionTimingFunction = 'linear';
        circle.style.left = `${box.clientWidth - (vhToPx(LARGE_CIRCLE_SIZE) / 2)}px`;
        // Exhale (down)
        exhaleAnimation = setTimeout(() => {
            exhaleCountdownInterval = startCountdownDecrement(EXHALE, exhaleDuration);
            action.style.fontSize = `${EXHALE_SIZE}vh`;
            action.style.color = EXHALE_COLOR;
            circle.style.transitionProperty = 'height width color left bottom';
            circle.style.transitionDuration = `${exhaleDuration}s`;
            circle.style.transitionTimingFunction = `${BREATH_CURVE}`;
            circle.style.backgroundColor = EXHALE_COLOR;
            circle.style.height = `${SMALL_CIRCLE_SIZE}vh`;
            circle.style.width = `${SMALL_CIRCLE_SIZE}vh`;
            circle.style.bottom = `-${SMALL_CIRCLE_SIZE / 2}vh`;
            circle.style.left = `${box.clientWidth - vhToPx(SMALL_CIRCLE_SIZE) / 2}px`;
            // Hold out (left)
            holdOutAnimation = setTimeout(() => {
                holdOutCountdownInterval = startCountdownDecrement(HOLD, holdOutDuration);
                circle.style.transitionDuration = `${holdInDuration}s`;
                circle.style.transitionTimingFunction = 'linear';
                circle.style.bottom = `-${SMALL_CIRCLE_SIZE / 2}vh`;
                circle.style.left = `-${SMALL_CIRCLE_SIZE / 2}vh`;
                inhaleAnimation = setTimeout(() => {
                    animateBreathing(); // Restart the cycle
                }, holdOutDuration * SMOOTH_PATH_TIMING);
            }, exhaleDuration * SMOOTH_PATH_TIMING);
        }, holdInDuration * SMOOTH_PATH_TIMING);
    }, inhaleDuration * SMOOTH_PATH_TIMING);
}
let started = false;
function startBreathBox() {
    if (started) {
        return;
    }
    started = true;
    startTimer();
    addPauseButton();
    addStopButton();
    resetActionText("");
    resetCircle();
    animateBreathing();
}
function stopBreathBox() {
    started = false;
    minutes = 0;
    seconds = 0;
    resetAnimations();
    resetActionText("");
    resetCircle();
    resetStartButton();
    stopButton.style.display = "none";
    pauseButton.style.display = "none";
}
function pauseBreathBox() {
    started = false;
    resetAnimations();
    resetActionText("Paused");
    action.style.color = "#ff8c00"; // dark orange
    resetCircle();
    pauseButton.style.color = "green";
    pauseButton.textContent = "▶";
    pauseButton.onclick = resumeBreathBox;
}
function resumeBreathBox() {
    pauseButton.style.color = RESET_ORANGE;
    pauseButton.textContent = "||";
    pauseButton.onclick = pauseBreathBox;
    startBreathBox();
}
start.onclick = startBreathBox;
stopButton.onclick = stopBreathBox;
pauseButton.onclick = pauseBreathBox;
//# sourceMappingURL=main.js.map