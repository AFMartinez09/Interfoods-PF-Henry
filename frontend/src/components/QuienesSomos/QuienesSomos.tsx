import React from 'react';
import quienesSomosStyles from './QuienesSomos.module.css';
import imagenCocina from '../../assets/img/_2b7b3cb0-fe4d-41bd-9640-0aeea3057fc2.jpg';
import Carousel from '../Carrousel/Carrousel';

interface QuienesSomosProps {}

const QuienesSomos: React.FC<QuienesSomosProps> = () => {
  const images : any = [
    'https://avatars.githubusercontent.com/u/116928445?v=4',
    'https://avatars.githubusercontent.com/u/102487252?v=4',
    'https://avatars.githubusercontent.com/u/123500246?v=4',
    'https://avatars.githubusercontent.com/u/134454433?v=4',
    'https://avatars.githubusercontent.com/u/108027704?v=4',
    'https://avatars.githubusercontent.com/u/122408865?v=4',
  ];
  const nombres : any = [
    'Gaston Vergagni',
    'Luis Defago',
    'Andrez Martinez',
    'Mirko Miler',
    'Joel Fernandez',
    'Aurelio Cabello',
  ];
  return (
    <div>
      <div className={quienesSomosStyles['qs-margin']}>
        <br />
        <br />
        <br />
        <div><h1>¿Quiénes somos?</h1></div>
       <div><p>Te hablamos un poco de nosotros</p></div> 
       <div>         
         <Carousel images={images} nombres={nombres}/>
       </div>
      </div>

      <div className={`${quienesSomosStyles['qs-section']}`}>
        <div className={quienesSomosStyles['qs-textContainer']}>
          <h1>De dónde venimos</h1>
         <p>
  Somos un equipo compuesto por seis individuos de diversas nacionalidades:<br></br>
  <strong><br></br>Mirko, Luis, Gastón, Aurelio, Joel y Andrés</strong>.
  Estamos unidos por el objetivo común de promover la exploración gastronómica de distintas culturas y tradiciones culinarias.
</p>
          <p>
            Nuestra misión consiste en reunirnos para estudiar y promover las comidas más
            emblemáticas de cada país, con el propósito de fomentar el entendimiento intercultural a
            través de la gastronomía.
          </p>
        </div>
      </div>

      <div className={`${quienesSomosStyles['qs-section']} ${quienesSomosStyles['left']}`}>
        <div className={quienesSomosStyles['qs-imageContainers']}>
          <img src={imagenCocina} alt="Imagen" className={quienesSomosStyles['qs-image']} />
        </div>
        <div className={quienesSomosStyles['qs-textContainer']}>
          <h1>¿Cuál es nuestro objetivo?</h1>
          <p>
            Nuestro principal objetivo es permitir que las personas{' '}
            <strong>disfruten de la autenticidad de cada sabor culinario de diferentes países</strong>
            , proporcionándoles una experiencia completa y enriquecedora que capture el 100% de la
            esencia de cada plato.
          </p>
        </div>
      </div>

      <div className={`${quienesSomosStyles['qs-section']} ${quienesSomosStyles['right']}`}>
        <div className={quienesSomosStyles['qs-textContainer']}>
          <h1>Nuestras instalaciones</h1>
          <p>
            Nuestras cocinas están situadas en{' '}
            <strong>Argentina(Entre Ríos, Córdoba), México(Monterrey), Ecuador(Quito) y Colombia(Medellín)</strong>. Aquí se
            cocinan todos los platos y se envían cada lunes a cualquier punto que se solicite.
          </p>
        </div>
        <div className={quienesSomosStyles['qs-imageContainers']}>
          <img
            src="https://i.pinimg.com/originals/d9/8f/8d/d98f8d22fee4d702d612656af3f56726.jpg"
            alt="Imagen"
            className={quienesSomosStyles['qs-images']}
          />
        </div>
    </div>
    
      </div>
   
  );
};

export default QuienesSomos;

