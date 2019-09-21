import React from 'react'
import normalize from 'normalize.css/normalize.css'
import spectre from 'spectre.css/dist/spectre.min.css'

const Layout = ({ children }) => (
  <div className="fill">
    {children}

    <style jsx global>
      {normalize}
    </style>
    <style jsx global>
      {spectre}
    </style>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }

      html,
      body,
      .fill {
        width: 100vw;
        height: 100vh;
        color: #000000;
        overflow-y: auto;
        overflow-x: hidden;
        background: #f6f6f6;
        font-family: -apple-system, BlinkMacSystemFont, Roboto, 'Segoe UI',
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      a,
      a:hover,
      a:focus {
        cursor: pointer;
        color: #039be5;
        text-decoration: none;
      }
    `}</style>
  </div>
)

export default Layout
