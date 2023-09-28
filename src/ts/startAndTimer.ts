let minutes = 0;
let seconds = 0;
let timerInterval: ReturnType<typeof setInterval> | null;
function startTimer() {
  incrementTimer();
  start.style.backgroundColor = "transparent";
  start.style.border = "none";
  start.classList.remove('button');
  timerInterval = setInterval(incrementTimer, 1000);
}

function incrementTimer() {
  ++seconds;
  if (seconds == 60) {
    ++minutes;
    seconds = 0;
  }
  start.textContent = "" + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
}

function addPauseButton() {
  pauseButton.style.display = "flex";
}

function addStopButton() {
  stopButton.style.display = "flex";
}