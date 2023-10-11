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
  internalTimer: number;
  started: boolean;

  constructor() {
    this.minutes = 0;
    this.seconds = 0;
    this.internalTimer = 0;
    this.targetTime = 600;
    this.timerInterval = null;

    this.started = false;
  }

  startTimer() {
    if (this.started) {
      return;
    }
    this.started = true;
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

      ++this.internalTimer;
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

      ++this.internalTimer;
  }

  addPauseButton() {
    pauseButton.style.display = "flex";
  }

  addStopButton() {
    stopButton.style.display = "flex";
  }

  reset() {
    if (!this.started) {
      return;
    }
    this.started = false;

    this.minutes = timerDirection.classList.contains("point-up")
      ? 0
      : parseInt(timerMinutesInput.value);
    this.seconds = timerDirection.classList.contains("point-up")
      ? 0
      : parseInt(timerSecondsInput.value);

      this.internalTimer = 0;

      clearInterval(this.timerInterval!);
  }

  reachedTime() {
    return this.internalTimer >= this.targetTime;
  }
}

export const Timer = new TimerClass();
