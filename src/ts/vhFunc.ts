function vhToPx(percent: number): number {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
}

function vwToPx(percent: number): number {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
}

function pxToVh(px: number): number {
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (px / h) * 100;
}

function pxToVw(px: number): number {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (px / w) * 100;
}

function vmin(percent: number): number {
    return Math.min(pxToVh(percent), pxToVw(percent));
}

function vmax(percent: number): number {
    return Math.max(pxToVh(percent), pxToVw(percent));
}
