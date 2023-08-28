/* Copyright Michael Budnick - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Michael Budnick, August 2023
 */

const box = document.querySelector('.breath-box');
const circle = document.querySelector('.circle');
const action = document.querySelector('.action');

const SMOOTH_PATH_TIMING = 1000
const BREATH_RATIO = 5
const BREATH_CURVE = "cubic-bezier(.13,.38,.48,1.02)"
const HOLD_RATIO = 2


function animateBreathing() {
  const inhaleDuration = BREATH_RATIO;
  const holdInDuration = HOLD_RATIO;
  const exhaleDuration = BREATH_RATIO;
  const holdOutDuration = HOLD_RATIO;

  // Inhale (up)
  action.textContent = "INHALE"
  action.style.transitionProperty = 'font-size color'
  action.style.transitionDuration = `${inhaleDuration}s`
  action.style.transitionTimingFunction = `${BREATH_CURVE}`
  action.style.fontSize = '15vh'
  action.style.color = '#4B0082'

  circle.style.transitionProperty = 'height width background-color left bottom'
  circle.style.transitionDuration = `${inhaleDuration}s`
  circle.style.transitionTimingFunction = `${BREATH_CURVE}`
  circle.style.backgroundColor = '#4B0082'
  circle.style.height = '8vh'
  circle.style.width = '8vh'
  circle.style.bottom = `${box.clientHeight - circle.clientHeight/2}px`
  circle.style.left = `-${circle.clientWidth/2}px`


  // Hold In (right)
  setTimeout(() => {
    action.textContent = "HOLD"

    circle.style.transitionDuration = `${holdInDuration}s`;
    circle.style.transitionTimingFunction = 'linear'
    circle.style.left = `${box.clientWidth - (circle.clientWidth/2)}px`
    
    // Exhale (down)
    setTimeout(() => {
      action.textContent = "EXHALE"
      action.style.fontSize = '5vh'
      action.style.color = '#FFA07A'
      

      circle.style.transitionProperty = 'height width color left bottom'
      circle.style.transitionDuration = `${exhaleDuration}s`
      circle.style.transitionTimingFunction = `${BREATH_CURVE}`
      circle.style.backgroundColor = '#FFA07A'
      circle.style.height = '3vh'
      circle.style.width = '3vh'
      circle.style.bottom = `-${circle.clientHeight/2}px`
      circle.style.left = `${box.clientWidth}px`
      
      // Hold out (left)
      setTimeout(() => {
        action.textContent = "HOLD"

        circle.style.transitionDuration = `${holdInDuration}s`;
        circle.style.transitionTimingFunction = 'linear'
        circle.style.bottom = `-${circle.clientHeight/3}px`
        circle.style.left = `-${circle.clientWidth/3}px`
        
        
        setTimeout(() => {
          animateBreathing(); // Restart the cycle
        },  holdOutDuration * SMOOTH_PATH_TIMING);
      }, exhaleDuration * SMOOTH_PATH_TIMING);
    }, holdInDuration * SMOOTH_PATH_TIMING);
  }, inhaleDuration * SMOOTH_PATH_TIMING);
}

animateBreathing();

