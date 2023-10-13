import { vhToPx } from './vhFunc'
import { startCountdownDecrement } from './actionText'
import * as common from './common'
import { SharedIntervals } from './sharedIntervals'
import { Timer } from './timer'
import {
    resetActionText,
    resetAnimations,
    resetCircle,
    resetStartButton,
} from './reset'

function animateBreathing() {
    const inhaleDuration = parseInt(common.breathTimeInput.value)
    const holdInDuration = parseInt(common.holdTimeInput.value)
    const exhaleDuration = parseInt(common.breathTimeInput.value)
    const holdOutDuration = parseInt(common.holdTimeInput.value)

    // Inhale (up)
    SharedIntervals.inhaleCountdownInterval = startCountdownDecrement(
        common.INHALE,
        inhaleDuration
    )
    common.action.style.transitionDuration = `${inhaleDuration}s`
    common.action.style.transitionTimingFunction = `${common.BREATH_CURVE}`
    common.action.style.fontSize = `${common.INHALE_SIZE}vh`
    common.action.style.color = common.INHALE_COLOR

    common.circle.style.transitionProperty =
        'height width background-color left bottom'
    common.circle.style.transitionDuration = `${inhaleDuration}s`
    common.circle.style.transitionTimingFunction = `${common.BREATH_CURVE}`
    common.circle.style.backgroundColor = common.INHALE_COLOR
    common.circle.style.height = `${common.LARGE_CIRCLE_SIZE}vh`
    common.circle.style.width = `${common.LARGE_CIRCLE_SIZE}vh`
    common.circle.style.bottom = `${
        common.box.clientHeight - vhToPx(common.LARGE_CIRCLE_SIZE) / 2
    }px`
    common.circle.style.left = `-${common.LARGE_CIRCLE_SIZE / 2}vh`

    // Hold In (right)
    SharedIntervals.holdInAnimation = setTimeout(() => {
        SharedIntervals.holdInCountdownInterval = startCountdownDecrement(
            common.HOLD,
            holdInDuration
        )

        common.circle.style.transitionDuration = `${holdInDuration}s`
        common.circle.style.transitionTimingFunction = 'linear'
        common.circle.style.left = `${
            common.box.clientWidth - vhToPx(common.LARGE_CIRCLE_SIZE) / 2
        }px`

        // Exhale (down)
        SharedIntervals.exhaleAnimation = setTimeout(() => {
            SharedIntervals.exhaleCountdownInterval = startCountdownDecrement(
                common.EXHALE,
                exhaleDuration
            )
            common.action.style.fontSize = `${common.EXHALE_SIZE}vh`
            common.action.style.color = common.EXHALE_COLOR

            common.circle.style.transitionProperty =
                'height width color left bottom'
            common.circle.style.transitionDuration = `${exhaleDuration}s`
            common.circle.style.transitionTimingFunction = `${common.BREATH_CURVE}`
            common.circle.style.backgroundColor = common.EXHALE_COLOR
            common.circle.style.height = `${common.SMALL_CIRCLE_SIZE}vh`
            common.circle.style.width = `${common.SMALL_CIRCLE_SIZE}vh`
            common.circle.style.bottom = `-${common.SMALL_CIRCLE_SIZE / 2}vh`
            common.circle.style.left = `${
                common.box.clientWidth - vhToPx(common.SMALL_CIRCLE_SIZE) / 2
            }px`

            // Hold out (left)
            SharedIntervals.holdOutAnimation = setTimeout(() => {
                SharedIntervals.holdOutCountdownInterval =
                    startCountdownDecrement(common.HOLD, holdOutDuration)

                common.circle.style.transitionDuration = `${holdInDuration}s`
                common.circle.style.transitionTimingFunction = 'linear'
                common.circle.style.bottom = `-${
                    common.SMALL_CIRCLE_SIZE / 2
                }vh`
                common.circle.style.left = `-${common.SMALL_CIRCLE_SIZE / 2}vh`

                SharedIntervals.inhaleAnimation = setTimeout(() => {
                    animateBreathing() // Restart the cycle
                }, holdOutDuration * common.SMOOTH_PATH_TIMING)
            }, exhaleDuration * common.SMOOTH_PATH_TIMING)
        }, holdInDuration * common.SMOOTH_PATH_TIMING)
    }, inhaleDuration * common.SMOOTH_PATH_TIMING)
}

function validInputs(): boolean {
    let valid = true
    if (
        (common.timerMinutesInput.value === '' ||
            common.timerMinutesInput.value === '0') &&
        (common.timerSecondsInput.value === '' ||
            common.timerSecondsInput.value === '0')
    ) {
        common.timerMinutesInput.classList.add('red')
        common.timerSecondsInput.classList.add('red')
        valid = false
    } else {
        common.timerMinutesInput.classList.remove('red')
        common.timerSecondsInput.classList.remove('red')
    }

    if (
        common.breathTimeInput.value === '' ||
        common.breathTimeInput.value === '0'
    ) {
        common.breathTimeInput.classList.add('red')
        valid = false
    } else {
        common.breathTimeInput.classList.remove('red')
    }

    if (
        common.holdTimeInput.value === '' ||
        common.holdTimeInput.value === '0'
    ) {
        common.holdTimeInput.classList.add('red')
        valid = false
    } else {
        common.holdTimeInput.classList.remove('red')
    }

    return valid
}

let started = false
let checkTimerInterval: ReturnType<typeof setInterval> | null
function startBreathBox() {
    if (!validInputs() || started) {
        return
    }
    common.config.classList.add('hidden')
    common.controlBar.classList.add('top-buffer')

    started = true
    Timer.startTimer()
    checkTimerInterval = setInterval(checkTimer, 1000)
    Timer.addPauseButton()
    Timer.addStopButton()
    resetActionText('')
    resetCircle()
    animateBreathing()
}

let tone = new Audio('audio/tone.mp3')
function checkTimer() {
    if (started && Timer.reachedTime()) {
        tone.play()
        setTimeout(() => alert('You have reached your target!'), 50)
        stopBreathBox()
    }
}

function stopBreathBox() {
    started = false

    Timer.reset()
    clearTimeout(checkTimerInterval!)
    resetAnimations()
    resetActionText('')
    resetCircle()
    resetStartButton()
    common.stopButton.style.display = 'none'
    common.pauseButton.style.display = 'none'
    common.config.classList.remove('hidden')
    common.controlBar.classList.remove('top-buffer')
}

function pauseBreathBox() {
    started = false

    resetAnimations()
    resetActionText('Paused')
    common.action.style.color = '#ff8c00' // dark orange
    resetCircle()

    common.pauseButton.style.color = 'green'
    common.pauseButton.textContent = '▶'

    common.pauseButton.onclick = resumeBreathBox
}

function resumeBreathBox() {
    common.pauseButton.style.color = common.RESET_ORANGE
    common.pauseButton.textContent = '||'

    common.pauseButton.onclick = pauseBreathBox

    startBreathBox()
}

function flipArrow() {
    if (common.timerDirection.classList.contains('point-up')) {
        common.timerDirection.classList.replace('point-up', 'point-down')
    } else {
        common.timerDirection.classList.replace('point-down', 'point-up')
    }
    Timer.switchDirection()
}

common.timerDirection.onclick = flipArrow

common.start.onclick = startBreathBox
common.stopButton.onclick = stopBreathBox
common.pauseButton.onclick = pauseBreathBox
