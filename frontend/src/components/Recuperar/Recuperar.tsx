import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import style from './Recuperar.module.css'
import Swal from 'sweetalert2';
import { NavLink } from 'react-router-dom';

const Recuperar = () => {
  const [email, setEmail] = useState('');


  const handleChange = (e : any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      Swal.fire({
        title: 'Contraseña restablecida',
        text: 'Se te ha enviado un correo electrónico para restablecer tu contraseña. Por favor, revisa tu correo electrónico.',
        icon: 'success',
        confirmButtonText: 'Entendido'
      }).then(() => {
        window.location.href = "/";
      });
    } catch (error) {
      console.error('Error al enviar el correo electrónico de restablecimiento de contraseña:', error);
    }
  };

  return (
    <div className={style.todo}>
      <div className={style.todo3}>
        <h2 className={style.titulo}>Restablecer Tu Contraseña</h2>
        <p className={style.titulo2}>¿Has olvidado tu contraseña?
        No te preocupes, a todos nos pasa a veces.
        Déjanos tu mail y te lo solucionaremos.</p>
        <div className={style.form}>
           <form onSubmit={handleSubmit}>
             <div className={style.form}>
                <input name='email' type="email"value={email} onChange={handleChange} placeholder='Correro Electronico' className={style.input}/>
            </div>
            <button type="submit" className={style.boton}>Enviar</button>
           </form>
        </div>
        <div>
        <NavLink to='/Login'><p className={style.boton3}>No hace falta! recorde mi contraseña</p></NavLink>
        </div>
        <NavLink to='/Register'><button type="submit" className={style.boton2}>Crear cuenta nueva</button></NavLink>
      </div>
    </div>
  );
};

export default Recuperar;