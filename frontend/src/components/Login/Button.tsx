import { MouseEventHandler, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  handleClick: MouseEventHandler<HTMLButtonElement>;
  className?: string; // Agrega la propiedad className opcional
}

const Button = ({ children, handleClick, className }: ButtonProps) => {
  return (
    <button 
      onClick={handleClick}
      className={className ? `button is-primary ${className}` : 'button is-primary'} // Corregido el uso de template literals
    >
      {children}
    </button>
  );
}

export default Button;