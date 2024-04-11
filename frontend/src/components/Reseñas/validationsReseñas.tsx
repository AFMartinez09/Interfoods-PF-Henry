import * as Yup from 'yup';

// Validación del formulario con Yup
const ReviewValidationSchema = Yup.object({
    review: Yup.string()
        .min(10, 'El comentario debe tener al menos 10 caracteres')
        .max(200, 'El comentario no puede exceder los 200 caracteres')
        .required('El comentario es requerido'),
});

export default ReviewValidationSchema;
