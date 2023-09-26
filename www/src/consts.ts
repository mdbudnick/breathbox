const box = document.querySelector('.breath-box') as HTMLElement;
const boxRect = box.getBoundingClientRect();
const circle = document.querySelector('.circle') as HTMLElement;
const action = document.querySelector('.action') as HTMLElement;
const invisible = document.querySelector('.invisible') as HTMLElement;
const start = document.querySelector('.timer-start') as HTMLElement;
const stopButton = document.querySelector('.stop') as HTMLElement;
const pauseButton = document.querySelector('.pause') as HTMLElement;

const DEFAULT_BACKGROUND_COLOR = "#1e3250";
const INHALE_COLOR = "#0f5362";
const EXHALE_COLOR = "#c08845";
const RESET_ORANGE = "#f6786e";

const LARGE_CIRCLE_SIZE = 6;
const SMALL_CIRCLE_SIZE = 2;