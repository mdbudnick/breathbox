import React, { type FC } from 'react'

const Header: FC = (prop: PropTypes) => {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" href="assets/css/style.css" />
      <link rel="stylesheet" href="assets/css/reset.css" />
      <link
        rel="icon"
        type="image/png"
        href="assets/img/favicon.ico"
        sizes="16x16"
      />
      <title>Breath Box Visualization</title>
    </head>
  )
}

export default Header
