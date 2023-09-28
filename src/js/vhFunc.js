"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmax = exports.vmin = exports.pxToVw = exports.pxToVh = exports.vwToPx = exports.vhToPx = void 0;
function vhToPx(percent) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
exports.vhToPx = vhToPx;
function vwToPx(percent) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}
exports.vwToPx = vwToPx;
function pxToVh(px) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (px / h) * 100;
}
exports.pxToVh = pxToVh;
function pxToVw(px) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (px / w) * 100;
}
exports.pxToVw = pxToVw;
function vmin(percent) {
    return Math.min(pxToVh(percent), pxToVw(percent));
}
exports.vmin = vmin;
function vmax(percent) {
    return Math.max(pxToVh(percent), pxToVw(percent));
}
exports.vmax = vmax;
//# sourceMappingURL=vhFunc.js.map