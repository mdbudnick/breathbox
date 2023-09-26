declare function calculateTextWidth(text: string, size: number): number;
declare function calculateTextHeight(text: string, size: number): number;
declare function calculateCountdown(countdown: number): number;
declare function startCountdownDecrement(text: string, time: number): number;
declare let inhaleAnimation: number;
declare let inhaleCountdownInterval: number;
declare let holdInAnimation: number;
declare let holdInCountdownInterval: number;
declare let exhaleAnimation: number;
declare let exhaleCountdownInterval: number;
declare let holdOutAnimation: number;
declare let holdOutCountdownInterval: number;
declare function animateBreathing(): void;
declare let minutes: number;
declare let seconds: number;
declare let timerInterval: number;
declare function startTimer(): void;
declare function incrementTimer(): void;
declare function addPauseButton(): void;
declare function addStopButton(): void;
declare let started: boolean;
declare function startBreathBox(): void;
declare function resetAnimations(): void;
declare function stopBreathBox(): void;
declare function pauseBreathBox(): void;
declare function resumeBreathBox(): void;
