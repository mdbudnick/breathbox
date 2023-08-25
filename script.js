const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');
const action = document.querySelector('.action');

const SMOOTH_PATH_TIMING = 1000
const BREATH_RATIO = 5
const BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)"
const HOLD_RATIO = 2


function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;

  // Inhale (up)
  circle.style.transition = `bottom ${inhaleDuration}s ${BREATH_CURVE}`;
  circle.style.bottom = `${box.clientHeight - circle.clientHeight/2}px`
  circle.style.left = `-${circle.clientWidth/2}px`
  action.textContent = "INHALE"

  // Hold In (right)
  setTimeout(() => {
    action.textContent = "HOLD"
    circle.style.transition = `left ${holdInDuration}s linear`;
    circle.style.bottom = `${box.clientHeight - circle.clientHeight/2}px`
    circle.style.left = `${box.clientWidth - (circle.clientWidth/2)}px`
    
    // Exhale (down)
    setTimeout(() => {
      action.textContent = "EXHALE"
      circle.style.transition = `bottom ${exhaleDuration}s  ${BREATH_CURVE}`;
      circle.style.bottom = `-${circle.clientHeight/2}px`
      circle.style.left = `${box.clientWidth - (circle.clientWidth/2)}px`
      
      // Hold out (left)
      setTimeout(() => {
        action.textContent = "HOLD"
        circle.style.transition = `left ${holdOutDuration}s linear`;
        circle.style.bottom = `-${circle.clientHeight/2}px`
        circle.style.left = `-${circle.clientWidth/2}px`
        
        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        },  holdOutDuration * SMOOTH_PATH_TIMING);
      }, exhaleDuration * SMOOTH_PATH_TIMING);
    }, holdInDuration * SMOOTH_PATH_TIMING);
  }, inhaleDuration * SMOOTH_PATH_TIMING);
}

animateBreathing();

