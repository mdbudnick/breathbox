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

const SMOOTH_PATH_TIMING = 1000;
const BREATH_RATIO = 6;
const BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)"
const HOLD_RATIO = 3;

const INHALE = "INHALE";
const EXHALE = "EXHALE";
const HOLD = "HOLD";
const INHALE_SIZE = 8;
const EXHALE_SIZE = 4;
const DEFAULT_ACTION_TEXT = "Breath Box";
const DEFAULT_ACTION_FONT_SIZE = "5vh";