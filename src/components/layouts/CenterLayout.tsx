import { Outlet } from 'react-router-dom'

import css from './CenterLayout.module.scss'

const CenterLayout = () => {
  return (
    <div className={css.container}>
      <div className={css.innerContainer}>
        <Outlet />
      </div>
    </div>
  )
}

export default CenterLayout
