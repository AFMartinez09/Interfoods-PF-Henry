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
  
    if(!regexEmail.test(email)){
      errors.email = 'Might be an email'
    }
    if(!email){
      errors.email = 'This field is required'
    }
  
    if(!regexPassword.test(password)){
      errors.password = 'Password must contain between 8-16 characters long'
    }
    if(!password){
      errors.password = 'This field is required'
    }
  
    return errors
  }
  
  export default Validation