import React, { type FC, type PropsWithChildren } from 'react'
import ControlBar from './ControlBar'
import Config from './Config'

const BreathBox: FC = (prop: PropsWithChildren) => {
  return (
    <div className="breath-box">
      <div className="breath-box-inner">
        <ControlBar />
        <Config />
        <div className="action">Breath Box</div>
      </div>
      <div className="circle"></div>
    </div>
  )
}

export default BreathBox