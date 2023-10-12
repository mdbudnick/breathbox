"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const common_1 = require("./common");
class TimerClass {
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
            parseInt(common_1.timerMinutesInput.value) * 60 +
                parseInt(common_1.timerSecondsInput.value);
        common_1.start.style.backgroundColor = "transparent";
        common_1.start.style.border = "none";
        common_1.start.classList.remove("button");
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
        common_1.start.textContent =
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
        common_1.start.textContent =
            "" +
                this.minutes +
                ":" +
                (this.seconds < 10 ? "0" + this.seconds : this.seconds);
        ++this.internalTimer;
    }
    updateMinutesAndSeconds(seconds) {
        this.minutes = Math.floor(seconds / 60);
        this.seconds = seconds % 60;
    }
    addPauseButton() {
        common_1.pauseButton.style.display = "flex";
    }
    addStopButton() {
        common_1.stopButton.style.display = "flex";
    }
    reset() {
        this.minutes = this.ascending ? 0 : parseInt(common_1.timerMinutesInput.value);
        this.seconds = this.ascending ? 0 : parseInt(common_1.timerSecondsInput.value);
        this.internalTimer = 0;
        clearInterval(this.timerInterval);
    }
    reachedTime() {
        return this.internalTimer >= this.targetTime;
    }
}
exports.Timer = new TimerClass();
//# sourceMappingURL=timer.js.map