import { ChangeEventHandler, FocusEventHandler, MouseEventHandler, useState, useEffect } from 'react';
import Input from './Input';
import Button from './Button';
import Swal from 'sweetalert2';
import Validation, { ValidationErrors } from './Validation';
import styles from './Login.module.css';
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword,  signInWithPopup, onAuthStateChanged } from '@firebase/auth';
import { app} from "../../Auth/firebaseConfig";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUser, signUpNewUserDb} from '../../redux/actions/Actions';
import { useDispatch } from 'react-redux';



type UserLoginState = {
  email: string;
  password: string;
};

const InitialValue: UserLoginState = {
  email: '',
  password: '',
};

export const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [login, setLogin] = useState(InitialValue);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof UserLoginState;
    const validateErrors = Validation({ ...login, [name]: e.target.value });
    setErrors(validateErrors);
    setLogin((state) => ({
      ...state,
      [name]: e.target.value,
    }));
  };

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const name = e.target.name as keyof UserLoginState;
    const validateErrors = Validation({ ...login, [name]: e.target.value });
    setErrors(validateErrors);
  };

  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    const validateErrors = Validation(login);
    setErrors(validateErrors);
    console.log(errors);
    
    if (Object.keys(validateErrors).length === 0) {
        try {
            // Iniciar sesión con Firebase
            await signInWithEmailAndPassword(auth, login.email, login.password);
            const userEmail = login.email;

            // Llamar a la función getUser pasando el correo electrónico
            if (userEmail) {
                try {
                    await getUser(userEmail);
                    Swal.fire({
                        title: 'Inicio de sesión exitoso',
                        text: '¡Bienvenido de nuevo!',
                        icon: 'success',
                        confirmButtonText: 'Entendido'
                    }).then(() => {
                        window.location.href = "/";
                    }); 
                } catch (error) {
                    Swal.fire({
                        title: 'Cuenta Bloqueada',
                        text: 'Tu cuenta ha sido bloqueada. Contacta al soporte para más información.',
                        icon: 'error',
                        confirmButtonText: 'Entendido'
                    }).then(() => {
                        window.location.href = "/";
                    }); 
                }
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            // Mostrar mensaje de error
            Swal.fire({
                title: 'Error al iniciar sesión',
                text: 'Hubo un problema al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'Entendido'
            });
        }
    }
};
 
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/');
      } else {
      }
    });
    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);
  const handleGoogleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userGoogleEmail = result.user.email || '';
      const displayName = result.user.displayName || '';
      
      const displayNameParts = displayName.split(' ');
  
      const userGoogleNombre = displayNameParts[0];
      const userGoogleApellido = displayNameParts.slice(1).join(' ');
      
      signUpNewUserDbDispatch(dispatch,userGoogleEmail, userGoogleNombre, userGoogleApellido, '', '', '', '', false, true )

      await getUser(userGoogleEmail);

    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      // Mostrar mensaje de error
      Swal.fire({
        title: 'Error al iniciar sesión',
        text: 'Hubo un problema al intentar iniciar sesión con Google. Por favor, verifica tus credenciales e inténtalo de nuevo.',
        icon: 'error',
        confirmButtonText: 'Entendido'
      });
    }
  };
  
 
  const signUpNewUserDbDispatch = (
    dispatch: any,
    email: string,
    nombre: string,
    apellido: string,
    foto: string,
    pais: string,
    ciudad: string,
    direccion: string,
    admin: boolean,
    habilitado: boolean
  ) => {
    try {
      dispatch(signUpNewUserDb(email, nombre, apellido, foto, pais, ciudad, direccion, admin, habilitado));
    } catch (error) {
      console.error("Error al realizar el dispatch:", error);
    }
  };

  return (
    
    <div className={styles.loginPageContainer}>
      <div className={styles.loginContainer}>
        
        <h2 className={styles.loginHeading}>Inicio de sesión</h2>
        <div className={styles.introText}>
          Introduce tu cuenta de siempre en InterFoods o regístrate si es tu primera vez.
        </div>
        {errors.email && <p className={styles.inputError}>{errors.email}</p>}
        <div className={styles.inputContainer}>
          <Input
            type="email"
            value={login.email}
            name="email"
            placeholder="Email"
            handleChange={handleChange}
            onFocus={handleBlur}
            required
          />
        </div>
        {errors.password && <p className={styles.inputError}>{errors.password}</p>}
        <div className={styles.inputContainer}>
          <Input
            type="password"
            value={login.password}
            name="password"
            placeholder="Password"
            handleChange={handleChange}
            onFocus={handleBlur}
            required
          />
        </div>
        <div className={styles.forgetandcreate}>
          <a href="/Recuperarcontraseña">¿Olvidaste la contraseña?</a>
        </div>
        <div className={styles.buttonSub}>
          <Button className={styles.submitButton} handleClick={handleClick}>
            INICIAR SESION
          </Button>
        </div>
        <div className={styles.buttonSub}>
          <button className={styles.submitButtonGoogle} onClick={handleGoogleClick}>
            INICIAR SESION CON GOOGLE
          </button>
        </div>
        <div className={styles.forgetandcreates}>
          <NavLink to="/Register">Crear cuenta</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
