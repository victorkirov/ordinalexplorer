import css from './Attribute.module.scss'

type Props = {
  title: string
  value: string
}

const Attribute = ({ title, value }: Props) => {
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
        <div className={css.truncatable}>{valueStart}</div>
        <div>{valueEnd}</div>
      </div>
    </div>
  )
}

export default Attribute
