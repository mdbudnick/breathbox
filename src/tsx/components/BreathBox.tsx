import React, { type FC } from 'react'

const BreathBox: FC = (prop: PropTypes) => {
  return (
    <div className="breath-box">
      <div className="breath-box-inner">
        <div className="action">Breath Box</div>
      </div>
      <div className="circle"></div>
    </div>
  )
}

export default BreathBox
