import { ChangeEventHandler, FocusEventHandler } from 'react'

interface InputProps {
  type: string,
  value: string,
  name: string,
  placeholder: string,
  handleChange: ChangeEventHandler<HTMLInputElement>,
  required: boolean
  onFocus?: FocusEventHandler<HTMLInputElement>,
}

const Input = ({type, value,  name, placeholder, handleChange, onFocus, required }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      onFocus={onFocus}
      required={required}
      />
  )
}

export default Input