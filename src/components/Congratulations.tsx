import React, { type FC } from 'react'
import { type ConfigInput, type ConfigSetters } from 'shared'
import '../css/config.css'

interface CongratsProps {
  timeReached: boolean
  inputMinutes: number
  inputSeconds: number
}

const Congrats: FC<CongratsProps> = (props) => {
  return <div className="congratulations"></div>
}

export default Congrats
