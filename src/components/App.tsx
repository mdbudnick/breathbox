import React, { type FC, type PropsWithChildren } from 'react'
import BreathBox from './BreathBox'

const App: FC = (prop: PropsWithChildren) => {
  return (
    <div className="central">
      <BreathBox />
      <script src="assets/js/bundle.js"></script>
    </div>
  )
}

export default App
