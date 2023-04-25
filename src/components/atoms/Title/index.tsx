import css from './Title.module.scss'

type Props = {
  children: React.ReactNode
  onBack?: () => void
}

const Title = ({ children, onBack }: Props) => {
  const handleClick = () => {
    if (onBack) {
      onBack()
    }
  }

  const containerClass = [css.container]

  if (onBack) {
    containerClass.push(css.clickable)
  }

  return (
    <div className={containerClass.join(' ')} onClick={handleClick}>
      {onBack && <div className={css.back} />}
      {children}
    </div>
  )
}

export default Title
