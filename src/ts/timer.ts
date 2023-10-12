import {
  pauseButton,
  start,
  stopButton,
  timerMinutesInput,
  timerSecondsInput,
} from "./common";

class TimerClass {
  minutes: number;
  seconds: number;
  timerInterval: ReturnType<typeof setInterval> | null;
  targetTime: number;
  internalTimer: number;
  ascending: boolean;

  constructor() {
    this.minutes = 0;
    this.seconds = 0;
    this.internalTimer = 0;
    this.targetTime = 600;
    this.timerInterval = null;
    this.ascending = true;
  }

  startTimer() {
    this.reset();
    this.timerFn();
    this.targetTime =
      parseInt(timerMinutesInput.value) * 60 +
      parseInt(timerSecondsInput.value);
    start.style.backgroundColor = "transparent";
    start.style.border = "none";
    start.classList.remove("button");
    this.timerInterval = setInterval(this.timerFn.bind(this), 1000);
  }

  timerFn() {
    this.ascending ? this.incrementTimer() : this.decrementTimer();
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
    if (this.seconds <= 0) {
      --this.minutes;
      this.seconds = 60;
    }
    --this.seconds;
    start.textContent =
      "" +
      this.minutes +
      ":" +
      (this.seconds < 10 ? "0" + this.seconds : this.seconds);

    ++this.internalTimer;
  }

  updateMinutesAndSeconds(seconds: number) {
    this.minutes = Math.floor(seconds / 60);
    this.seconds = seconds % 60;
  }

  addPauseButton() {
    pauseButton.style.display = "flex";
  }

  addStopButton() {
    stopButton.style.display = "flex";
  }

  reset() {
    this.minutes = this.ascending ? 0 : parseInt(timerMinutesInput.value);
    this.seconds = this.ascending ? 0 : parseInt(timerSecondsInput.value);

    this.internalTimer = 0;

    clearInterval(this.timerInterval!);
  }

  reachedTime() {
    return this.internalTimer >= this.targetTime;
  }
}

export const Timer = new TimerClass();
