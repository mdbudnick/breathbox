const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');
const action = document.querySelector('.action');
const invisible = document.querySelector('.invisible');

const LARGE_CIRCLE_SIZE = 6;
const SMALL_CIRCLE_SIZE = 2;

const SMOOTH_PATH_TIMING = 1000;
const BREATH_RATIO = 5;
const BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)"
const HOLD_RATIO = 2;

const INHALE = "INHALE";
const EXHALE = "EXHALE";
const HOLD = "HOLD";

// We have to do this each time because the window can be resized
function calculateTextWidth(text) {
  invisible.textContent = text;
  let width = invisible.clientWidth;
  invisible.textContent = "";
  
  return width;
}

function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;

  // Inhale (up)
  action.textContent = INHALE
  action.style.transitionProperty = 'font-size color left'
  action.style.transitionDuration = `${inhaleDuration}s`
  action.style.transitionTimingFunction = `${BREATH_CURVE}`
  action.style.fontSize = '15vh'
  action.style.color = '#4B0082'
  action.style.left = `${50 - pxToVw(calculateTextWidth(INHALE))/2}vw`

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
    action.style.left = `${50 - pxToVw(calculateTextWidth(HOLD))}vw`

    circle.style.transitionDuration = `${holdInDuration}s`;
    circle.style.transitionTimingFunction = 'linear'
    circle.style.left = `${box.clientWidth - (vhToPx(LARGE_CIRCLE_SIZE)/2)}px`
    
    // Exhale (down)
    setTimeout(() => {
      action.textContent = EXHALE
      action.style.fontSize = '5vh'
      action.style.color = '#FFA07A'
      action.style.left = `${50 - pxToVw(calculateTextWidth(EXHALE))}vw`
      

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
        action.style.left = `${50 - pxToVw(calculateTextWidth(HOLD))}vw`

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

animateBreathing();

