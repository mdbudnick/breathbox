declare class Timeouts {
    constructor();
    inhaleAnimation: ReturnType<typeof setTimeout> | null;
    inhaleCountdownInterval: ReturnType<typeof setInterval> | null;
    holdInAnimation: ReturnType<typeof setTimeout> | null;
    holdInCountdownInterval: ReturnType<typeof setInterval> | null;
    exhaleAnimation: ReturnType<typeof setTimeout> | null;
    exhaleCountdownInterval: ReturnType<typeof setInterval> | null;
    holdOutAnimation: ReturnType<typeof setTimeout> | null;
    holdOutCountdownInterval: ReturnType<typeof setInterval> | null;
}
export declare const SharedIntervals: Timeouts;
export {};
