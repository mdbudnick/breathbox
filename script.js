const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');

function animateBreathing() {
  const inhaleDuration = 1;
  const holdInDuration = 1;
  const exhaleDuration = 1;
  const holdOutDuration = 1;
  let totalDuration = (inhaleDuration + holdInDuration + exhaleDuration + holdOutDuration) * 1000

  // Inhale (up)
  circle.style.margin = `0 0 ${box.clientWidth}px 0`
  circle.style.transition = `margin ${inhaleDuration}s`;
  console.log('up')

  // Hold In (right)
  setTimeout(() => {
    circle.style.margin = `0 0 0 ${box.clientWidth}px`
    circle.style.transition = `margin ${holdInDuration}s`;
    console.log('right')
    // Exhale (down)
    setTimeout(() => {
      circle.style.margin = `${box.clientHeight}px 0 0 ${box.clientHeight}px`
      circle.style.transition = `margin ${exhaleDuration}s`;
      console.log('down')
      // Hold out (left)
      setTimeout(() => {
        circle.style.margin = `${box.clientHeight}px ${box.clientHeight}px 0 0`
        circle.style.transition = `margin ${holdOutDuration}s`;
        console.log('left')
        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        }, totalDuration);
      }, totalDuration);
    }, totalDuration);
  }, totalDuration);
}

animateBreathing();

