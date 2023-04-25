import css from './Detail.module.scss'

type Props = {
  title: string
  value: string
}

const Detail = ({ title, value }: Props) => {
  const valueStart = value.slice(0, -15)
  const valueEnd = value.slice(-15)
  console.log(valueStart, valueEnd)
  return (
    <div>
      <div className={css.title}>{title}</div>
      <div
        className={css.value}
        onClick={() => {
          navigator.clipboard.writeText(value)
        }}
      >
        {value}
      </div>
    </div>
  )
}

export default Detail
