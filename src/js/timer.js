"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timer = void 0;
const common_1 = require("./common");
class TimerClass {
    constructor() {
        this.minutes = 0;
        this.seconds = 0;
        this.targetTime = 600;
        this.timerInterval = null;
    }
    startTimer() {
        this.incrementTimer();
        this.targetTime = (parseInt(common_1.timerMinutesInput.value) * 60) + parseInt(common_1.timerSecondsInput.value);
        common_1.start.style.backgroundColor = "transparent";
        common_1.start.style.border = "none";
        common_1.start.classList.remove("button");
        this.timerInterval = setInterval(this.incrementTimer.bind(this), 1000);
    }
    incrementTimer() {
        ++this.seconds;
        if (this.seconds == 60) {
            ++this.minutes;
            this.seconds = 0;
        }
        common_1.start.textContent =
            "" + this.minutes + ":" + (this.seconds < 10 ? "0" + this.seconds : this.seconds);
    }
    addPauseButton() {
        common_1.pauseButton.style.display = "flex";
    }
    addStopButton() {
        common_1.stopButton.style.display = "flex";
    }
    reset() {
        this.minutes = 0;
        this.seconds = 0;
    }
    reachedTime() {
        return (this.minutes * 60) + this.seconds >= this.targetTime;
    }
}
exports.Timer = new TimerClass();
//# sourceMappingURL=timer.js.map