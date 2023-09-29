import * as common from './common'
import { SharedIntervals } from './sharedIntervals'
import { Timer } from './timer'

export function resetCircle() {
  common.circle.style.width = common.SMALL_CIRCLE_SIZE + "vh";
  common.circle.style.height = common.SMALL_CIRCLE_SIZE + "vh";
  common.circle.style.backgroundColor = common.RESET_ORANGE;
  common.circle.style.transitionProperty = "";
  common.circle.style.transitionDuration = "";
  common.circle.style.transitionTimingFunction = "";
  common.circle.style.bottom = "-1vh";
  common.circle.style.left = "-1vh";
}

export function resetStartButton() {
  common.start.style.color = "white";
  common.start.style.border = "4px solid green";
  common.start.style.backgroundColor = "lightgreen";
  common.start.style.borderRadius = "5vw";
  common.start.textContent = "Start";
  common.start.classList.add("button");
}

export function resetActionText(text: string) {
  text = text || common.DEFAULT_ACTION_TEXT;
  common.action.textContent = text;
  common.action.style.fontSize = common.DEFAULT_ACTION_FONT_SIZE;
  common.action.style.color = common.RESET_ORANGE;
}
resetActionText("");

export function resetAnimations() {
  clearTimeout(SharedIntervals.inhaleAnimation!);
  SharedIntervals.inhaleAnimation = null;
  clearInterval(SharedIntervals.inhaleCountdownInterval!);
  SharedIntervals.inhaleCountdownInterval = null;
  clearTimeout(SharedIntervals.holdInAnimation!);
  SharedIntervals.holdInAnimation = null;
  clearInterval(SharedIntervals.holdInCountdownInterval!);
  SharedIntervals.holdInCountdownInterval = null;
  clearTimeout(SharedIntervals.exhaleAnimation!);
  SharedIntervals.exhaleAnimation = null;
  clearInterval(SharedIntervals.exhaleCountdownInterval!);
  SharedIntervals.exhaleCountdownInterval = null;
  clearTimeout(SharedIntervals.holdOutAnimation!);
  SharedIntervals.holdOutAnimation = null;
  clearInterval(SharedIntervals.holdOutCountdownInterval!);
  SharedIntervals.holdOutCountdownInterval = null;
  clearInterval(Timer.timerInterval!);
  Timer.timerInterval = null;
}
