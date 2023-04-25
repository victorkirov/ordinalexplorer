import css from './SubTitle.module.scss'

type Props = {
  children: React.ReactNode
  bold?: boolean
}

const SubTitle = ({ children, bold }: Props) => {
  const classes = [css.container]

  if (bold) {
    classes.push(css.bold)
  }

  return <div className={classes.join(' ')}>{children}</div>
}

export default SubTitle
