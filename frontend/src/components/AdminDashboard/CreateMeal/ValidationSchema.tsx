import * as Yup from 'yup';

// mixed = para poder manejar File
// se decide que formatos se van a aceptar
  // Validación del formulario con Yup
  const ValidationSchema = Yup.object({
    nombre: Yup.string().required('Nombre del plato es requerido'),
    origen: Yup.string().required('País del plato es requerido'),
    ingredientes: Yup.array()
      .of(Yup.string().required('Un ingrediente es requerido'))
      .required('Debes ingresar al menos un ingrediente'),
    carbohidratos: Yup.number().required('Carbohidratos es requerido'),
    grasas: Yup.number().required('Grasas es requerido'),
    peso: Yup.number().min(1,'La cantidad mínima es de 1').required('Peso es requerido'),
    precio: Yup.number().min(1,'La cantidad mínima es de 1').required('Precio es requerido'),
    tipo: Yup.string().required('Seleccione qué tipo de plato es'),
    image: Yup.mixed()
    .test('fileFormat', 
    'Unsupported file format', 
    (value) => {
    if (!value) return true;
    const file = value as File;
    const supportedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
    return supportedFormats.includes(file.type);
  }).required('Imagen del plato es requerida'),
    stock: Yup.number().min(1,'La cantidad mínima es de 1').required('Cantidad es requerida'),
    descripcion: Yup.string()
      .min(10, 'La descripción debe tener al menos 10 caracteres')
      .max(1000, 'La descripción no puede exceder los 1000 caracteres')
      .required('La descripción del plato es requerida'),
  });


export default ValidationSchema