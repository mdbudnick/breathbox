import React, { type FC } from 'react'
import Header from './Header'
import BreathBox from './BreathBox'

const Index: FC = (prop: PropTypes) => {
  return (
    <html lang="en">
      <Header />
      <body>
        <div className="central"></div>
        <BreathBox />
        <script src="assets/js/bundle.js"></script>
      </body>
    </html>
  )
}

export default Index
