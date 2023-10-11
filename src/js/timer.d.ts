declare class TimerClass {
    minutes: number;
    seconds: number;
    timerInterval: ReturnType<typeof setInterval> | null;
    targetTime: number;
    constructor();
    startTimer(): void;
    incrementTimer(): void;
    decrementTimer(): void;
    addPauseButton(): void;
    addStopButton(): void;
    reset(): void;
    reachedTime(): boolean;
}
export declare const Timer: TimerClass;
export {};
