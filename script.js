const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');

function animateBreathing() {
  const inhaleDuration = 1;
  const holdInDuration = 1;
  const exhaleDuration = 1;
  const holdOutDuration = 1;

  // Inhale (up)
  circle.style.margin = `0 0 ${box.clientHeight}px 0`
  circle.style.transition = `margin ${inhaleDuration}s`;

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
          // 675 gives smooth pathing
        },  holdOutDuration * 675);
      }, exhaleDuration * 675);
    }, holdInDuration * 675);
  }, inhaleDuration * 675);
}

animateBreathing();

