import React, { type FC, type PropsWithChildren } from 'react'

const PageNotFound: FC = (prop: PropsWithChildren) => {
  return (
    <div>
      <h1>404 not found!</h1>

      <p>
        Are you sure you didn't mean to go to{' '}
        <a href="/index.html">this page??</a>
      </p>
    </div>
  )
}

export default PageNotFound
