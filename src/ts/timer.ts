import { pauseButton, start, stopButton, timerMinutesInput, timerSecondsInput } from "./common";

class TimerClass {
  minutes: number;
  seconds: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  targetTime: number;

  constructor() {
    this.minutes = 0;
    this.seconds = 0;
    this.targetTime = 600;
    this.timerInterval = null
  }

  startTimer() {
    this.incrementTimer();
    this.targetTime = (parseInt(timerMinutesInput.value) * 60) + parseInt(timerSecondsInput.value)
    start.style.backgroundColor = "transparent";
    start.style.border = "none";
    start.classList.remove("button");
    this.timerInterval = setInterval(this.incrementTimer.bind(this), 1000);
  }
  
  incrementTimer() {
    ++this.seconds;
    if (this.seconds == 60) {
      ++this.minutes;
      this.seconds = 0;
    }
    start.textContent =
      "" + this.minutes + ":" + (this.seconds < 10 ? "0" + this.seconds : this.seconds);
  }
  
  addPauseButton() {
    pauseButton.style.display = "flex";
  }
  
  addStopButton() {
    stopButton.style.display = "flex";
  }

  reset() {
    this.minutes = 0;
    this.seconds = 0;
  }

  reachedTime() {
    return (this.minutes * 60) + this.seconds >= this.targetTime;
  }
}

export const Timer = new TimerClass();
