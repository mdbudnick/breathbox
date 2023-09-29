"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedIntervals = void 0;
class Timeouts {
    constructor() {
        this.inhaleAnimation = null;
        this.inhaleCountdownInterval = null;
        this.holdInAnimation = null;
        this.holdInCountdownInterval = null;
        this.exhaleAnimation = null;
        this.exhaleCountdownInterval = null;
        this.holdOutAnimation = null;
        this.holdOutCountdownInterval = null;
    }
}
exports.SharedIntervals = new Timeouts();
//# sourceMappingURL=sharedIntervals.js.map