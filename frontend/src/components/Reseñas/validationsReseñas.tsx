import * as Yup from 'yup';

const badWords = [
    'boludo', 'puto', 'pelotudo', 'coger', 'concha', 'pija', 'orto',
    'hpta', 'marica', 'guevon', 'malparido', 'perra', 'mierda', 'verga',
    'pendejo', 'chinga tu madre', 'cabrón', 'pinche', 'culero', 'huevón',
    'joder', 'coño', 'hostia', 'puta', 'madre', 'chingada',
    'mamada', 'pendejada', 'maldito',
    'cagada', 'vete a la mierda', 'idiota', 'imbécil', 'estúpido', 'carajo',
    'joputa', 'gilipollas', 'picha', 'me cago en', 'polla', 'jodido',
    'maldita sea', 'putamadre', 'pichula', 'hijo de puta', 'cabronazo',
    'desgraciado', 'pelmazo', 'cabestro', 'zorra', 'capullo',
    'hijueputa', 'tonto', 'tarado', 'inútil', 'baboso', 'cretino', 'gilipuertas',
    'chupapollas', 'coñazo', 'cojonudo', 'retrasado', 'pajero', 'mamahuevo',
    'manfloro', 'manflora', 'mamaverga', 'maricón', 'mariposón',
    'mierdera', 'mierdero', 'mierdica', 'mierdoso', 'putazo',
    'puteador', 'puteadora', 'puteado', 'putero', 'putesco', 'putón',
    'putrefacto', 'putrefacción', 'putrefacta', 'putrefacte', 'putísimo',
    'putear', 'putañero', 'puticirujano', 'puticlub', 'putipandi', 'putivuelta', 'putilla',
    'putaño', 'putatitular', 'reputísimo', 'reputear', 'reputero',
    'reputillo', 'zorrear', 'zorrera', 'zorrería', 'zorrerío', 'zorreo',
    'zorrillo', 'zorrizano', 'zorrón', 'zorrónido', 'zorrupia'
];
const ReviewValidationSchema = Yup.object({
    review: Yup.string()
        .min(10, 'El comentario debe tener al menos 10 caracteres')
        .max(200, 'El comentario no puede exceder los 200 caracteres')
        .test('bad-words', 'El comentario contiene palabras no permitidas', value => {
            if (value !== undefined) {
                const words = value.toLowerCase().split(/\b/);
                return !words.some(word => badWords.includes(word));
            }
            return true; // Devuelve true en caso de que value sea undefined
        })
        .required('El comentario es requerido'),
});

export default ReviewValidationSchema;
