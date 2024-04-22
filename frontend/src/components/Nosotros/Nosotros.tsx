import React from "react";
import Styles from './Nosotros.module.css';

interface Persona {
    nombre: string;
    imagen: string;
    linked: string;
    git: string;
}

const Nosotros: React.FC = () => {

    
const datos: Persona[] = [
    {nombre: 'Gaston Vergagni', imagen: 'https://avatars.githubusercontent.com/u/116928445?v=4', linked: 'https://www.linkedin.com/in/gaston-vergagni-a87b3b29b/', git: 'https://github.com/Gastonvg'},
    {nombre: 'Luis Defago', imagen: 'https://avatars.githubusercontent.com/u/102487252?v=4', linked: 'https://www.linkedin.com/in/luis-defago-005840252/', git: 'https://github.com/luisdefago'},
    {nombre: 'Andrez Martinez', imagen: 'https://avatars.githubusercontent.com/u/123500246?v=4', linked: 'https://www.linkedin.com/in/andres-martinez-12437b275/', git: 'https://github.com/AFMartinez09'},
    {nombre: 'Mirko Miler', imagen: 'https://avatars.githubusercontent.com/u/134454433?v=4', linked: 'https://www.linkedin.com/in/mirko-miler-290bb3295/', git: 'https://github.com/Mirko1523'},
    {nombre: 'Joel Fernandez', imagen: 'https://avatars.githubusercontent.com/u/108027704?v=4', linked: 'https://www.linkedin.com/in/eric-joel-fern%C3%A1ndez/', git: 'https://github.com/ejoelf'},
    {nombre: 'Aurelio Cabello', imagen: 'https://avatars.githubusercontent.com/u/122408865?v=4', linked: 'https://www.linkedin.com/in/aurelio-cabello-medellin-2254a72a1/', git: 'https://github.com/AurelioCabelloM'},

];

return (
    <div className={Styles.container}>
        {datos.map((persona, index) => (
            <div className={Styles.container2}>
            <div key={index} className={Styles.persona}>
                <img src={persona.imagen} className={Styles.imagen}></img>
                <h3 className={Styles.nombre}>{persona.nombre}</h3>
                <div className={Styles.links}>
                   <a href={persona.linked}><img src="https://cdn-icons-png.flaticon.com/128/13670/13670384.png" className={Styles.git}></img></a>
                   <a href={persona.git}><img src="https://cdn-icons-png.flaticon.com/128/25/25657.png"className={Styles.git}></img></a>
                </div>
            </div>
            </div>
        ))}
    </div>
);

}

export default Nosotros;