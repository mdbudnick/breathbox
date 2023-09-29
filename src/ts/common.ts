export const box = document.querySelector('.breath-box') as HTMLElement;
export const boxRect = box.getBoundingClientRect();
export const circle = document.querySelector('.circle') as HTMLElement;
export const action = document.querySelector('.action') as HTMLElement;
export const invisible = document.querySelector('.invisible') as HTMLElement;
export const start = document.querySelector('.timer-start') as HTMLElement;
export const stopButton = document.querySelector('.stop') as HTMLElement;
export const pauseButton = document.querySelector('.pause') as HTMLElement;

export const DEFAULT_BACKGROUND_COLOR = "#1e3250";
export const INHALE_COLOR = "#0f5362";
export const EXHALE_COLOR = "#c08845";
export const RESET_ORANGE = "#f6786e";

export const LARGE_CIRCLE_SIZE = 6;
export const SMALL_CIRCLE_SIZE = 2;

export const SMOOTH_PATH_TIMING = 1000;
export const BREATH_RATIO = 6;
export const BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)"
export const HOLD_RATIO = 3;

export const INHALE = "INHALE";
export const EXHALE = "EXHALE";
export const HOLD = "HOLD";
export const INHALE_SIZE = 8;
export const EXHALE_SIZE = 4;
export const DEFAULT_ACTION_TEXT = "Breath Box";
export const DEFAULT_ACTION_FONT_SIZE = "5vh";