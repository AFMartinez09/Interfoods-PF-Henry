import React from 'react';
import quienesSomosStyles from './QuienesSomos.module.css';
import imagenCocina from '../../assets/img/_2b7b3cb0-fe4d-41bd-9640-0aeea3057fc2.jpg';
import Carousel from '../Carrousel/Carrousel';

interface QuienesSomosProps {}

const QuienesSomos: React.FC<QuienesSomosProps> = () => {
  const images : Array <string>  = [
    'https://avatars.githubusercontent.com/u/116928445?v=4',
    'https://avatars.githubusercontent.com/u/102487252?v=4',
    'https://avatars.githubusercontent.com/u/123500246?v=4',
    'https://avatars.githubusercontent.com/u/134454433?v=4',
    'https://avatars.githubusercontent.com/u/108027704?v=4',
    'https://avatars.githubusercontent.com/u/122408865?v=4',
  ];
  
  const linked : Array <string> = [
    'https://www.linkedin.com/in/gaston-vergagni-a87b3b29b/',
    'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAD5qhAUB-NrzSn64rB10YoAoGxuBaBSx5B8&keywords=luis%20defago&origin=RICH_QUERY_SUGGESTION&position=0&searchId=77881187-8e2f-49f2-9aff-ef5b30202a38&sid=13G&spellCorrectionEnabled=false',
    'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAEMm9ewBt49tbjf79_0cfGSipWxg8mppAuU&keywords=andres%20martinez&origin=RICH_QUERY_SUGGESTION&position=0&searchId=ef511386-9260-4908-bbd1-eabd935a3e8c&spellCorrectionEnabled=false',
    'https://www.linkedin.com/search/results/all/?fetchDeterministicClustersOnly=true&heroEntityKey=urn%3Ali%3Afsd_profile%3AACoAAEeL5MwBf--H8rCzzCYlrKoF5i56WRU7jtc&keywords=mirko%20miler&origin=RICH_QUERY_TYPEAHEAD_HISTORY&position=0&searchId=8da57c10-03b1-4bc2-b151-8231e11c94b3&sid=d9_&spellCorrectionEnabled=true',
    'https://www.linkedin.com/in/eric-joel-fern%C3%A1ndez-b1b5b0234/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    'https://www.linkedin.com/in/aurelia-pilipiak/',
  ];
  const nombres : Array <string> = [
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
         <Carousel images={images} nombres={nombres} linked={linked}/>
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

