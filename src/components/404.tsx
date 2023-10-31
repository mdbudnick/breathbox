import React, { type FC, type PropsWithChildren } from 'react'
import Header from './Header'

const FourOFour: FC = (prop: PropsWithChildren) => {
  return (
    <html lang="en">
      <Header />
      <body>
        <h1>404 not found!</h1>

        <p>
          Are you sure you didn't mean to go to{' '}
          <a href="/index.html">this page??</a>
        </p>
      </body>
    </html>
  )
}

export default FourOFour
