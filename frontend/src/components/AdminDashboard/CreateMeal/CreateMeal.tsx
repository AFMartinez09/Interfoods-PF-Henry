import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './FormMeal.module.css';
import ValidationSchema from './ValidationSchema';
import { createMeal } from '../../../redux/actions/Actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import HomeAdmin from '../HomeAdmin/HomeAdmin';

interface PropsCreateMeal {
  id: number;
  nombre: string;
  origen: string;
  ingredientes: string[];
  kilocalorias: number,
  carbohidratos: number;
  grasas: number;
  peso: number;
  precio: number;
  tipo: string;
  imagen: File | null;
  descripcion: string;
  stock: string;
  ingrediente: string;
}

const initialValues: PropsCreateMeal = {
  id: 0,
  nombre: '',
  origen: '',
  ingredientes: [],
  kilocalorias: 0,
  carbohidratos: 0,
  grasas: 0,
  peso: 0,
  precio: 0,
  tipo: '',
  imagen: null,
  descripcion: '',
  stock: '',
  ingrediente: ''
};

const CreateMeal: React.FC = () => {
  const dispatch = useDispatch();
  const history = useNavigate()
  const handleSubmit = async(values: PropsCreateMeal) => {
    try {
      await dispatch(createMeal(
        values.nombre, 
        values.origen,
        values.ingredientes,
        values.kilocalorias,
        values.carbohidratos,
        values.grasas,
        values.peso,
        values.precio,
        values.tipo,
        values.imagen,
        values.descripcion,
        values.stock,
       ))
       console.log(dispatch)
      history('/admindasboard');
    } catch (error) {
      console.error(error)
    };
  };

  return (
    <div>
      <div>
        <HomeAdmin />
      </div>
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isValid, dirty }) => (
        <Form>
          <div className={styles.container}>
            <div className={styles.formContainerL}>
              <label htmlFor='nombre' className={styles.label}>Nombre del plato*:</label>
              <Field placeholder='Nombre del plato' type='text' name='nombre' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='nombre' /></p>

              <label htmlFor='origen' className={styles.label}>País del plato*:</label>
              <Field placeholder='País del plato' type='text' name='origen' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='origen' /></p>

              <div>
                <label htmlFor='ingredientes' className={styles.label}>Ingredientes*:</label>
                <br />
                <Field placeholder='ingredientes' name='ingrediente' className={styles.inputField} />
                <button
                  type='button'

                  className={styles.addButton}
                  onClick={() => {
                    const newIngredient = values.ingrediente.trim();
                    if (typeof newIngredient === 'string' && newIngredient !== '' && !values.ingredientes.includes(newIngredient)) {
                      setFieldValue('ingredientes', [...values.ingredientes, newIngredient]);
                      setFieldValue('ingrediente', '');
                    }
                  }}
                >
                  AGREGAR
                </button>
              </div>
              <ErrorMessage name='ingredientes' component='div' className={styles.error} />
                
              {values.ingredientes.length > 0 && (
                <ul className={styles.ingredientList}>
                  {values.ingredientes.map((ingrediente, index) => (
                    <li key={index} className={styles.ingredientListItem}>
                      {ingrediente}
                      <button
                        type='button'
                        className={styles.deleteButton}
                        onClick={() => {
                          const newIngredients = values.ingredientes.filter((_, i) => i !== index);
                          setFieldValue('ingredientes', newIngredients);
                        }}
                      >
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <label htmlFor='kilocalorias' className={styles.label}>Kilocalorias*:</label>
              <Field placeholder='Kilocalorias' type='number' name='kilocalorias' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='kilocalorias' /></p>

              <label htmlFor='carbohidratos' className={styles.label}>Carbohidratos (gr)*:</label>
              <Field placeholder='Carbohidratos' type='number' name='carbohidratos' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='carbohidratos' /></p>

              <label htmlFor='grasas' className={styles.label}>Grasas (gr)*:</label>
              <Field placeholder='Grasas' type='number' name='grasas' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='grasas' /></p>
            </div>
            <div className={styles.formContainerR}>
              <label htmlFor='peso' className={styles.label}>Peso (gr)*:</label>
              <Field placeholder='Peso' type='number' name='peso' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='peso' /></p>

              <label htmlFor='precio' className={styles.label}>Precio (USD)*:</label>
              <Field placeholder='Precio' type='number' name='precio' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='precio' /></p>

              <label htmlFor='tipo' className={styles.label}>Tipo*:</label>
              <Field as='select' id='tipo' name='tipo' className={styles.inputField}>
                <option value=''>Seleccione un tipo</option>
                <option value='plato fuerte'>Plato fuerte</option>
                <option value='vegano'>Vegano</option>
                <option value='postre'>Postre</option>
              </Field>
              <p className={styles.error}><ErrorMessage name='tipo' /></p>

              <label htmlFor='image' className={styles.label}>Foto del plato*: (formatos en .jpg, .jpeg ó .png)</label>
              <br />
              <input
                className={styles.inputField}
                type='file'
                id='image'
                name='image'
                accept='image/png, image/jpeg, image/jpg'
                onChange={(event) =>
                  setFieldValue('image', event.currentTarget.files?.[0])
                }
              />
              <p className={styles.error}><ErrorMessage name='image' /></p>

              <label htmlFor='descripcion' className={styles.label}>Decripción*:</label>
              <Field placeholder='Descripcion' as='textarea' name='descripcion' 
              className={styles.textArea} />
              <p className={styles.error}><ErrorMessage name='descripcion' /></p>

              <label htmlFor='cantidad' className={styles.label}>Cantidad (unidades)*:</label>
              <Field placeholder='Cantidad' type='text' name='stock' className={styles.inputField} />
              <p className={styles.error}><ErrorMessage name='stock' /></p>

              <button type='submit' className={styles.submitButton} disabled={!isValid || !dirty}>Enviar</button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
    </div>
  );
};

export default CreateMeal;

