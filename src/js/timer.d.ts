declare class TimerClass {
    minutes: number;
    seconds: number;
    timerInterval: ReturnType<typeof setInterval> | null;
    targetTime: number;
    internalTimer: number;
    ascending: boolean;
    constructor();
    startTimer(): void;
    timerFn(): void;
    incrementTimer(): void;
    decrementTimer(): void;
    updateMinutesAndSeconds(seconds: number): void;
    addPauseButton(): void;
    addStopButton(): void;
    reset(): void;
    reachedTime(): boolean;
}
export declare const Timer: TimerClass;
export {};
