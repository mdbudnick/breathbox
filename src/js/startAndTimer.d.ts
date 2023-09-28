declare let minutes: number;
declare let seconds: number;
declare let timerInterval: ReturnType<typeof setInterval> | null;
declare function startTimer(): void;
declare function incrementTimer(): void;
declare function addPauseButton(): void;
declare function addStopButton(): void;
