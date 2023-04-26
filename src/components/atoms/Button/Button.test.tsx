import { fireEvent, render } from '@testing-library/react'

import Button from '.'

describe('Button', () => {
  it('renders children', () => {
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>)
    expect(getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    const { getByText } = render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(getByText('Click me'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn()
    const { getByText } = render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>,
    )
    fireEvent.click(getByText('Click me'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
