// We have to do this each time because the window can be resized
function calculateTextWidth(text: string, size: number): number {
    invisible.style.fontSize = `${size}vh`;
    invisible.textContent = text;
    let width = invisible.clientWidth;
    invisible.textContent = "";
    return width;
  }
  
  function calculateTextHeight(text: string, size: number): number {
    invisible.style.fontSize = `${size}vh`;
    invisible.textContent = text;
    let height = invisible.clientHeight;
    invisible.textContent = "";
    return height;
  }
  
  function calculateCountdown(countdown: number): number {
    return countdown - 1;
  }
  
  function startCountdownDecrement(text: string, time: number): ReturnType<typeof setInterval> {
    let countdownInterval: ReturnType<typeof setInterval> | null;
    countdownInterval = setInterval(() => {
      --time;
      let countdownNs = Date.now();
      if (time) {
        action.textContent = text + "\r\n" + time;
      } else {
        action.textContent = text;
        // It cancels itself
        clearInterval(countdownInterval!);
        countdownInterval = null;
      }
    }, 1000);
    // Do it the first time
    action.textContent = text + "\r\n" + time;
  
    return countdownInterval;
  }