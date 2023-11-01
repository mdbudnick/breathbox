import React, { type FC, type PropsWithChildren } from 'react'
import BreathBox from './BreathBox'
import '../css/central.css'

const App: FC = (prop: PropsWithChildren) => {
  return (
    <div className="central">
      <BreathBox />
      <script src="assets/js/bundle.js"></script>
    </div>
  )
}

export default App
