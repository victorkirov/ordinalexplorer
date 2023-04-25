import css from './CenterDiv.module.scss'

type Props = {
  children: React.ReactNode
}
const CenterDiv = ({ children }: Props) => <div className={css.center}>{children}</div>

export default CenterDiv
