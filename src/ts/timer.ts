import {
  pauseButton,
  start,
  stopButton,
  timerMinutesInput,
  timerSecondsInput,
  timerDirection,
} from "./common";

class TimerClass {
  minutes: number;
  seconds: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  targetTime: number;

  constructor() {
    this.minutes = 0;
    this.seconds = 0;
    this.targetTime = 600;
    this.timerInterval = null;
  }

  startTimer() {
    let timerFn = timerDirection.classList.contains("point-up")
      ? this.incrementTimer
      : this.decrementTimer;
    timerFn.bind(this)();
    this.targetTime =
      parseInt(timerMinutesInput.value) * 60 +
      parseInt(timerSecondsInput.value);
    start.style.backgroundColor = "transparent";
    start.style.border = "none";
    start.classList.remove("button");
    this.timerInterval = setInterval(timerFn.bind(this), 1000);
  }

  incrementTimer() {
    ++this.seconds;
    if (this.seconds == 60) {
      ++this.minutes;
      this.seconds = 0;
    }
    start.textContent =
      "" +
      this.minutes +
      ":" +
      (this.seconds < 10 ? "0" + this.seconds : this.seconds);
  }

  decrementTimer() {
    --this.seconds;
    if (this.seconds == 0) {
      --this.minutes;
      this.seconds = 60;
    }
    start.textContent =
      "" +
      this.minutes +
      ":" +
      (this.seconds < 10 ? "0" + this.seconds : this.seconds);
  }

  addPauseButton() {
    pauseButton.style.display = "flex";
  }

  addStopButton() {
    stopButton.style.display = "flex";
  }

  reset() {
    this.minutes = timerDirection.classList.contains("point-up")
      ? 0
      : parseInt(timerMinutesInput.value);
    this.seconds = timerDirection.classList.contains("point-up")
      ? 0
      : parseInt(timerSecondsInput.value);
  }

  reachedTime() {
    return this.minutes * 60 + this.seconds >= this.targetTime;
  }
}

export const Timer = new TimerClass();
