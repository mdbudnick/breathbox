const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');

const SMOOTH_PATH_TIMING = 700
const BREATH_RATIO = 2
const HOLD_RATIO = 2


function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;

  // Inhale (up)
  circle.style.top = `-${circle.clientHeight}px`
  circle.style.right = ""
  circle.style.bottom = ""
  circle.style.left = `-${circle.clientHeight}px`
  circle.style.transition = `top ${inhaleDuration}s`;

  // Hold In (right)
  setTimeout(() => {
    circle.style.margin = `0 0 0 ${box.clientWidth}px`
    circle.style.transition = `margin ${holdInDuration}s`;
    
    // Exhale (down)
    setTimeout(() => {
      circle.style.margin = `${box.clientHeight}px 0 0 ${box.clientWidth}px`
      circle.style.transition = `margin ${exhaleDuration}s`;
      
      // Hold out (left)
      setTimeout(() => {
        circle.style.margin = `${box.clientHeight}px ${box.clientWidth}px 0 0`
        circle.style.transition = `margin ${holdOutDuration}s`;
        
        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        },  holdOutDuration * SMOOTH_PATH_TIMING);
      }, exhaleDuration * SMOOTH_PATH_TIMING);
    }, holdInDuration * SMOOTH_PATH_TIMING);
  }, inhaleDuration * SMOOTH_PATH_TIMING);
}

animateBreathing();

