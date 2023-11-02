import React, { type FC, type PropsWithChildren } from 'react'
import BreathBox from './BreathBox'
import '../ts/main'
import '../img/buddha-gnome.jpg'
import '../css/central.css'

const App: FC = (prop: PropsWithChildren) => {
  return (
    <div className="central">
      <BreathBox />
    </div>
  )
}

export default App
