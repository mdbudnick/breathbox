class Timeouts {
  constructor() {
    this.inhaleAnimation = null
    this.inhaleCountdownInterval = null
    this.holdInAnimation = null
    this.holdInCountdownInterval = null
    this.exhaleAnimation = null
    this.exhaleCountdownInterval = null
    this.holdOutAnimation = null
    this.holdOutCountdownInterval = null
  }

  inhaleAnimation: ReturnType<typeof setTimeout> | null
  inhaleCountdownInterval: ReturnType<typeof setInterval> | null
  holdInAnimation: ReturnType<typeof setTimeout> | null
  holdInCountdownInterval: ReturnType<typeof setInterval> | null
  exhaleAnimation: ReturnType<typeof setTimeout> | null
  exhaleCountdownInterval: ReturnType<typeof setInterval> | null
  holdOutAnimation: ReturnType<typeof setTimeout> | null
  holdOutCountdownInterval: ReturnType<typeof setInterval> | null
}
export const SharedIntervals = new Timeouts()
