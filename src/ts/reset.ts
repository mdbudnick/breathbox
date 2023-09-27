function resetCircle() {
  circle.style.width = SMALL_CIRCLE_SIZE + "vh";
  circle.style.height = SMALL_CIRCLE_SIZE + "vh";
  circle.style.backgroundColor = RESET_ORANGE;
  circle.style.transitionProperty = "";
  circle.style.transitionDuration = "";
  circle.style.transitionTimingFunction = "";
  circle.style.bottom = "-1vh";
  circle.style.left = "-1vh";
}

function resetStartButton() {
  start.style.color = "white";
  start.style.border = "4px solid green";
  start.style.backgroundColor = "lightgreen";
  start.style.borderRadius = "5vw";
  start.textContent = "Start";
  start.classList.add("button");
}

function resetActionText(text: string) {
  text = text || DEFAULT_ACTION_TEXT;
  action.textContent = text;
  action.style.fontSize = DEFAULT_ACTION_FONT_SIZE;
  action.style.color = RESET_ORANGE;
}
resetActionText("");

let inhaleAnimation: number;
let inhaleCountdownInterval: number;
let holdInAnimation: number;
let holdInCountdownInterval: number;
let exhaleAnimation: number;
let exhaleCountdownInterval: number;
let holdOutAnimation: number;
let holdOutCountdownInterval: number;
function resetAnimations() {
  clearTimeout(inhaleAnimation);
  inhaleAnimation = -1;
  clearInterval(inhaleCountdownInterval);
  inhaleCountdownInterval = -1;
  clearTimeout(holdInAnimation);
  holdInAnimation = -1;
  clearInterval(holdInCountdownInterval);
  holdInCountdownInterval = -1;
  clearTimeout(exhaleAnimation);
  exhaleAnimation = -1;
  clearInterval(exhaleCountdownInterval);
  exhaleCountdownInterval = -1;
  clearTimeout(holdOutAnimation);
  holdOutAnimation = -1;
  clearInterval(holdOutCountdownInterval);
  holdOutCountdownInterval = -1;
  clearInterval(timerInterval);
  timerInterval = -1;
}
