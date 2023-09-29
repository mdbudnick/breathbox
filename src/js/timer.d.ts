declare class TimerClass {
    minutes: number;
    seconds: number;
    timerInterval: ReturnType<typeof setInterval> | null;
    constructor();
    startTimer(): void;
    incrementTimer(): void;
    addPauseButton(): void;
    addStopButton(): void;
    reset(): void;
}
export declare const Timer: TimerClass;
export {};
