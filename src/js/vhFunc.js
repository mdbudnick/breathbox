export function vhToPx(percent) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}
export function vwToPx(percent) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}
export function pxToVh(px) {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (px / h) * 100;
}
export function pxToVw(px) {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (px / w) * 100;
}
export function vmin(percent) {
    return Math.min(pxToVh(percent), pxToVw(percent));
}
export function vmax(percent) {
    return Math.max(pxToVh(percent), pxToVw(percent));
}
//# sourceMappingURL=vhFunc.js.map