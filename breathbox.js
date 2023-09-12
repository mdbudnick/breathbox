const box = document.querySelector('.breath-box');
const boxRect = box.getBoundingClientRect();
const circle = document.querySelector('.circle');
const action = document.querySelector('.action');
const invisible = document.querySelector('.invisible');
const start = document.querySelector('.timer-start');
const stopButton = document.querySelector('.stop');
const pauseButton = document.querySelector('.pause');

const DEFAULT_BACKGROUND_COLOR = "#f0f0f0";

const RESET_BLUE = "#007bff";
const LARGE_CIRCLE_SIZE = 6;
const SMALL_CIRCLE_SIZE = 2;
function resetCircle() {
  circle.style.width = SMALL_CIRCLE_SIZE + "vh";
  circle.style.height = SMALL_CIRCLE_SIZE + "vh";
  circle.style.backgroundColor = RESET_BLUE;
  circle.style.bottom = "-1vh";
  circle.style.left = "-1vh";
}

function resetStartButton() {
  start.style.color = "white";
  start.style.border = "4px solid green";
  start.style.backgroundColor = "lightgreen";
  start.style.borderRadius = "5vw";
  start.textContent = "Start";
}

const SMOOTH_PATH_TIMING = 1000;
const BREATH_RATIO = 5;
const BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)"
const HOLD_RATIO = 2;

const INHALE = "INHALE";
const EXHALE = "EXHALE";
const HOLD = "HOLD";
const INHALE_SIZE = 15;
const EXHALE_SIZE = 5;
const DEFAULT_ACTION_TEXT = "Breath Box";
const DEFAULT_ACTION_FONT_SIZE = "5vh";

function resetActionText(text) {
  text = text || DEFAULT_ACTION_TEXT;
  action.textContent = text;
  action.style.fontSize = DEFAULT_ACTION_FONT_SIZE;
  action.style.left = `${50 - pxToVw(calculateTextWidth(DEFAULT_ACTION_TEXT, EXHALE_SIZE))/2}vw`
  action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(DEFAULT_ACTION_TEXT, EXHALE_SIZE)*1.5)}vh`
  action.style.color = RESET_BLUE;
}
resetActionText();

// We have to do this each time because the window can be resized
function calculateTextWidth(text, size) {
  invisible.style.fontSize = `${size}vh`
  invisible.textContent = text;
  let width = invisible.clientWidth;
  invisible.textContent = "";
  
  return width;
}

function calculateTextHeight(text, size) {
  invisible.style.fontSize = `${size}vh`
  invisible.textContent = text;
  let height = invisible.clientHeight;
  invisible.textContent = "";
  
  return height;
}

function calculateCountdown(countdown) {
  return countdown - 1;
}

function startCountdownDecrement(text, time) {
    let countdownInterval = setInterval(() => {
        --time;
        countdownNs = Date.now();
        if (time > 1) {
          action.textContent = text + ' ' + time;
        } else {
          action.textContent = text;
          // It cancels itself
          clearInterval(countdownInterval);
          countdownInterval = null;
        }
    }, 1000);
    // Do it the first time
    action.textContent = text + ' ' + --time;

    return countdownInterval;
}

let inhaleAnimation;
let inhaleCountdownInterval;
let holdInAnimation;
let holdInCountdownInterval;
let exhaleAnimation;
let exhaleCountdownInterval;
let holdOutAnimation;
let holdOutCountdownInterval;
function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;


  // Inhale (up)
  inhaleCountdownInterval = startCountdownDecrement(INHALE, inhaleDuration + 1);
  action.style.transitionDuration = `${inhaleDuration}s`
  action.style.transitionTimingFunction = `${BREATH_CURVE}`
  action.style.fontSize = `${INHALE_SIZE}vh`
  action.style.color = '#4B0082'
  action.style.left = `${50 - pxToVw(calculateTextWidth(INHALE, INHALE_SIZE))/2}vw`
  action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(INHALE, INHALE_SIZE))}vh`

  circle.style.transitionProperty = 'height width background-color left bottom'
  circle.style.transitionDuration = `${inhaleDuration}s`
  circle.style.transitionTimingFunction = `${BREATH_CURVE}`
  circle.style.backgroundColor = '#4B0082'
  circle.style.height = `${LARGE_CIRCLE_SIZE}vh`
  circle.style.width = `${LARGE_CIRCLE_SIZE}vh`
  circle.style.bottom = `${box.clientHeight - vhToPx(LARGE_CIRCLE_SIZE)/2}px`
  circle.style.left = `-${LARGE_CIRCLE_SIZE/2}vh`


  // Hold In (right)
  holdInAnimation = setTimeout(() => {
    holdInCountdownInterval = startCountdownDecrement(HOLD, holdInDuration + 1);
    action.style.left = `${50 - pxToVw(calculateTextWidth(HOLD, INHALE_SIZE)/2)}vw`
    action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(HOLD, INHALE_SIZE))}vh`

    circle.style.transitionDuration = `${holdInDuration}s`;
    circle.style.transitionTimingFunction = 'linear'
    circle.style.left = `${box.clientWidth - (vhToPx(LARGE_CIRCLE_SIZE)/2)}px`
    
    // Exhale (down)
    exhaleAnimation = setTimeout(() => {
      exhaleCountdownInterval = startCountdownDecrement(EXHALE, exhaleDuration + 1);
      action.style.fontSize = `${EXHALE_SIZE}vh`
      action.style.color = '#FFA07A'
      action.style.left = `${50 - pxToVw(calculateTextWidth(EXHALE, EXHALE_SIZE)/2)}vw`
      action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(EXHALE, EXHALE_SIZE)*1.5)}vh`
      
      circle.style.transitionProperty = 'height width color left bottom'
      circle.style.transitionDuration = `${exhaleDuration}s`
      circle.style.transitionTimingFunction = `${BREATH_CURVE}`
      circle.style.backgroundColor = '#FFA07A'
      circle.style.height = `${SMALL_CIRCLE_SIZE}vh`
      circle.style.width = `${SMALL_CIRCLE_SIZE}vh`
      circle.style.bottom = `-${SMALL_CIRCLE_SIZE/2}vh`
      circle.style.left = `${box.clientWidth - vhToPx(SMALL_CIRCLE_SIZE)/2}px`
      
      // Hold out (left)
      holdOutAnimation = setTimeout(() => {
        holdOutCountdownInterval = startCountdownDecrement(HOLD, holdOutDuration + 1);
        action.style.left = `${50 - pxToVw(calculateTextWidth(HOLD, EXHALE_SIZE)/2)}vw`
        action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(HOLD, EXHALE_SIZE)*1.5)}vh`

        circle.style.transitionDuration = `${holdInDuration}s`;
        circle.style.transitionTimingFunction = 'linear'
        circle.style.bottom = `-${SMALL_CIRCLE_SIZE/2}vh`
        circle.style.left = `-${SMALL_CIRCLE_SIZE/2}vh`
        
        inhaleAnimation = setTimeout(() => {
          animateBreathing(); // Restart the cycle
        },  holdOutDuration * SMOOTH_PATH_TIMING);
      }, exhaleDuration * SMOOTH_PATH_TIMING);
    }, holdInDuration * SMOOTH_PATH_TIMING);
  }, inhaleDuration * SMOOTH_PATH_TIMING);
}

let minutes = 0;
let seconds = 0;
let timerInterval;
function startTimer() {
  incrementTimer();
  start.style.backgroundColor = DEFAULT_BACKGROUND_COLOR;
  start.style.color = "black";
  start.style.border = "none";
  timerInterval = setInterval(incrementTimer, 1000);
}

function incrementTimer() {
  ++seconds;
  if (seconds == 60) {
    ++minutes;
    seconds = 0;
  }
  start.textContent = "" + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

function addPauseButton() {
  pauseButton.style.display = "flex";
}

function addStopButton() {
  stopButton.style.display = "flex";
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
  resetActionText();
  animateBreathing();
}

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

function stopBreathBox() {
  started = false;
  minutes = 0;
  seconds = 0;

  resetAnimations();
  resetActionText();
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
  pauseButton.style.color = RESET_BLUE;
  pauseButton.textContent = "||";

  pauseButton.onclick = pauseBreathBox;

  startBreathBox();
}

start.onclick = startBreathBox;
stopButton.onclick = stopBreathBox;
pauseButton.onclick = pauseBreathBox;
