const circle = document.querySelector('.circle');

function animateBreathing() {
  const animationDuration = 4000; // in milliseconds
  const inhaleDuration = 1000;
  const exhaleDuration = 1000;

  circle.style.transition = `transform ${animationDuration}ms linear`;
  circle.style.transform = 'rotate(0deg)';

  setTimeout(() => {
    circle.style.transition = `transform ${inhaleDuration}ms linear`;
    circle.style.transform = 'rotate(90deg)';
    
    setTimeout(() => {
      circle.style.transition = `transform ${exhaleDuration}ms linear`;
      circle.style.transform = 'rotate(180deg)';

      setTimeout(() => {
        circle.style.transition = `transform ${inhaleDuration}ms linear`;
        circle.style.transform = 'rotate(270deg)';

        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        }, inhaleDuration);
      }, exhaleDuration);
    }, inhaleDuration);
  }, exhaleDuration);
}

animateBreathing();

