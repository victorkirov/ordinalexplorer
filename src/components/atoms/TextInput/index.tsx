import css from './TextInput.module.scss'

type Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  onEnter?: () => void
}

const TextInput = ({ value, onChange, disabled, onEnter }: Props) => {
  const handleEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!onEnter) return

    if (e.key === 'Enter') {
      e.preventDefault()
      onEnter!()
    }
  }

  return (
    <input
      className={css.input}
      type="text"
      value={value}
      onChange={onChange}
      disabled={disabled}
      onKeyDown={handleEnterPressed}
    />
  )
}

export default TextInput
