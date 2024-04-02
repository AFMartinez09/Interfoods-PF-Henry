import { ChangeEventHandler, FocusEventHandler } from 'react'

interface InputProps {
  type: string,
  value: string,
  name: string,
  placeholder: string,
  handleChange: ChangeEventHandler<HTMLInputElement>,
  onBlur?: FocusEventHandler<HTMLInputElement>,
  required: boolean
}

const Input = ({type, value,  name, placeholder, handleChange, onBlur, required }: InputProps) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={onBlur} 
      required={required}
      />
  )
}

export default Input