const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');

const SMOOTH_PATH_TIMING = 1000
const BREATH_RATIO = 2
const HOLD_RATIO = 2


function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;

  // Inhale (up)
  circle.style.transition = `bottom ${inhaleDuration}s`;
  circle.style.bottom = `${box.clientHeight - circle.clientHeight/2}px`
  circle.style.left = `-${circle.clientWidth/2}px`

  // Hold In (right)
  setTimeout(() => {
    circle.style.transition = `left ${holdInDuration}s`;
    circle.style.bottom = `${box.clientHeight - circle.clientHeight/2}px`
    circle.style.left = `${box.clientWidth - (circle.clientWidth/2)}px`
    
    // Exhale (down)
    setTimeout(() => {
      circle.style.transition = `bottom ${exhaleDuration}s`;
      circle.style.bottom = `-${circle.clientHeight/2}px`
      circle.style.left = `${box.clientWidth - (circle.clientWidth/2)}px`
      
      // Hold out (left)
      setTimeout(() => {
        circle.style.transition = `left ${holdOutDuration}s`;
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

