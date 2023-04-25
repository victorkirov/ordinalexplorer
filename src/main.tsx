import React from 'react'
import ReactDOM from 'react-dom/client'

import Router from './Router'
import './index.css'

const ENABLE_RESPONSIVE = true

const ResponsiveManager = ({ children }: { children: React.ReactNode }) => {
  React.useLayoutEffect(() => {
    if (ENABLE_RESPONSIVE) return
    document.getElementsByTagName('html')[0].style.fontSize = '14px'
  }, [])
  return <>{children}</>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ResponsiveManager>
      <Router />
    </ResponsiveManager>
  </React.StrictMode>,
)
