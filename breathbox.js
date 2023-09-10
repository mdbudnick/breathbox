const box = document.querySelector('.breath-box');
const boxRect = box.getBoundingClientRect();
const circle = document.querySelector('.circle');
const action = document.querySelector('.action');
const invisible = document.querySelector('.invisible');
const start = document.querySelector('.timer');
const stop = document.querySelector('.stop');

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

function resetActionText() {
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

function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;

  // Inhale (up)
  action.textContent = INHALE
  action.style.transitionDuration = `${inhaleDuration}s`
  action.style.transitionTimingFunction = `${BREATH_CURVE}`
  action.style.fontSize = `${INHALE_SIZE}vh`
  action.style.color = '#4B0082'
  action.style.left = `${50 - pxToVw(calculateTextWidth(INHALE, INHALE_SIZE))/2}vw`
  action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(INHALE, INHALE_SIZE)/1.5)}vh`

  circle.style.transitionProperty = 'height width background-color left bottom'
  circle.style.transitionDuration = `${inhaleDuration}s`
  circle.style.transitionTimingFunction = `${BREATH_CURVE}`
  circle.style.backgroundColor = '#4B0082'
  circle.style.height = `${LARGE_CIRCLE_SIZE}vh`
  circle.style.width = `${LARGE_CIRCLE_SIZE}vh`
  circle.style.bottom = `${box.clientHeight - vhToPx(LARGE_CIRCLE_SIZE)/2}px`
  circle.style.left = `-${LARGE_CIRCLE_SIZE/2}vh`


  // Hold In (right)
  setTimeout(() => {
    action.textContent = HOLD
    action.style.left = `${50 - pxToVw(calculateTextWidth(HOLD, INHALE_SIZE)/2)}vw`
    action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(HOLD, INHALE_SIZE)/1.5)}vh`

    circle.style.transitionDuration = `${holdInDuration}s`;
    circle.style.transitionTimingFunction = 'linear'
    circle.style.left = `${box.clientWidth - (vhToPx(LARGE_CIRCLE_SIZE)/2)}px`
    
    // Exhale (down)
    setTimeout(() => {
      action.textContent = EXHALE
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
      setTimeout(() => {
        action.textContent = HOLD
        action.style.left = `${50 - pxToVw(calculateTextWidth(HOLD, EXHALE_SIZE)/2)}vw`
        action.style.top = `${pxToVh(boxRect.top) + pxToVh(box.clientHeight)/2 - pxToVw(calculateTextHeight(HOLD, EXHALE_SIZE)*1.5)}vh`

        circle.style.transitionDuration = `${holdInDuration}s`;
        circle.style.transitionTimingFunction = 'linear'
        circle.style.bottom = `-${SMALL_CIRCLE_SIZE/2}vh`
        circle.style.left = `-${SMALL_CIRCLE_SIZE/2}vh`
        
        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        },  holdOutDuration * SMOOTH_PATH_TIMING);
      }, exhaleDuration * SMOOTH_PATH_TIMING);
    }, holdInDuration * SMOOTH_PATH_TIMING);
  }, inhaleDuration * SMOOTH_PATH_TIMING);
}

let minutes = 0;
let seconds = 0;
function startTimer() {
  minutes = 0;
  seconds = 0;
  start.textContent = "0:00";
  start.style.backgroundColor = "#f0f0f0";
  start.style.color = "black";
  start.style.border = "none";
  start.style.marginBottom = "6vh"
  setInterval(incrementTimer, 1000);
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

}

function addStopButton() {
  stop.style.display = "flex";
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

function stopBreathBox() {
  started = false;
  minutes = 0;
  seconds = 0;
  resetActionText();
  resetCircle();
}

start.onclick = startBreathBox;
stop.onclick = stopBreathBox;
