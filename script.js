const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');

function animateBreathing() {
  const animationDuration = 4000; // in milliseconds
  const inhaleDuration = 1000;
  const exhaleDuration = 1000;

  circle.style.margin = `0 0 0 ${box.clientWidth}px`
  circle.style.transition = `margin 4s`;

  setTimeout(() => {
    circle.style.margin = `${box.clientHeight}px 0 0 ${box.clientHeight}px`
    circle.style.transition = `margin 4s`;
    
    setTimeout(() => {
      circle.style.margin = `${box.clientHeight}px ${box.clientHeight}px 0 0`
      circle.style.transition = `margin 4s`;

      setTimeout(() => {
        circle.style.margin = `0 ${box.clientHeight}px ${box.clientHeight}px 0`
        circle.style.transition = `margin 4s`;

        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        }, inhaleDuration);
      }, exhaleDuration);
    }, inhaleDuration);
  }, exhaleDuration);
}

animateBreathing();

