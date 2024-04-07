type ValidationProps = {
  email: string,
  password: string,
}

export type ValidationErrors = {
  email?: string,
  password?: string,
}

const Validation = ({email, password}: ValidationProps) => {
  const regexEmail: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const regexPassword: RegExp = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/  
  const errors: ValidationErrors = {}

  if(!regexEmail.test(email) && email != ''){
    errors.email = 'Debe ser un email valido'
  }

  
   if(!regexPassword.test(password) && password != ''){
    errors.password = 'La contraseña debe contener una letra mayuscula, una minuscula y entre 8-16 caracteres'
  }


  return errors
}

export default Validation