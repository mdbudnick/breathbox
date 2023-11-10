import React, { type FC } from 'react'

interface CongratsProps {
  timeReached: boolean
  setTimeReached: (b: boolean) => void
  inputMinutes: number
  inputSeconds: number
}

const tone = new Audio('assets/audio/tone.mp3')

const Congrats: FC<CongratsProps> = (props) => {
  function closeWindow (): void {
    props.setTimeReached(false)
  }

  void tone.play()
  return <div className="congratulations"><p>Congratulations!<br/>You breathed for {props.inputMinutes} minutes and {props.inputSeconds} seconds!</p>
        <br/><span className='close-congrats' onClick={closeWindow}>Close</span></div>
}

export default Congrats
