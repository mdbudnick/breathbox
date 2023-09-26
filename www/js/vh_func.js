"use strict";
function vhToPx(percent) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
function vwToPx(percent) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}
function pxToVh(px) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (px / h) * 100;
}
function pxToVw(px) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (px / w) * 100;
}
function vmin(percent) {
    return Math.min(pxToVh(percent), pxToVw(percent));
}
function vmax(percent) {
    return Math.max(pxToVh(percent), pxToVw(percent));
}
//# sourceMappingURL=vh_func.js.map