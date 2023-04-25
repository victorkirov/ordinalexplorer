import css from './Button.module.scss'

type Props = {
  children: React.ReactNode
  disabled?: boolean
  onClick: () => void
}

const Button = ({ children, disabled, onClick }: Props) => {
  const classes = [css.container]
  if (disabled) classes.push(css.disabled)

  const handleClick = () => {
    if (disabled) return

    onClick()
  }

  return (
    <div onClick={handleClick} className={classes.join(' ')}>
      {children}
    </div>
  )
}

export default Button
