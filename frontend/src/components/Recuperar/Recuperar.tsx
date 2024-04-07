import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import style from './Recuperar.module.css'
import Swal from 'sweetalert2';

const Recuperar = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false); 

  const handleChange = (e : any) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e : any) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      setIsSent(true);
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
      <h2>Restablecer Contraseña</h2>
      {isSent ? (
        <p>Se ha enviado un correo electrónico para restablecer tu contraseña.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Correo Electrónico:
            <input type="email" value={email} onChange={handleChange} required />
          </label>
          <button type="submit">Enviar Correo</button>
        </form>
      )}
    </div>
  );
};

export default Recuperar;