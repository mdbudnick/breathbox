"use strict";
const box = document.querySelector('.breath-box');
const boxRect = box.getBoundingClientRect();
const circle = document.querySelector('.circle');
const action = document.querySelector('.action');
const invisible = document.querySelector('.invisible');
const start = document.querySelector('.timer-start');
const stopButton = document.querySelector('.stop');
const pauseButton = document.querySelector('.pause');
const DEFAULT_BACKGROUND_COLOR = "#1e3250";
const INHALE_COLOR = "#0f5362";
const EXHALE_COLOR = "#c08845";
const RESET_ORANGE = "#f6786e";
const LARGE_CIRCLE_SIZE = 6;
const SMALL_CIRCLE_SIZE = 2;
//# sourceMappingURL=consts.js.map