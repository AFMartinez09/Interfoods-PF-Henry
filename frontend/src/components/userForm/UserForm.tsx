import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './UserForm.module.css';
import validateUser from './UserValidate';
import { useNavigate } from 'react-router-dom';
import { signUpNewUser } from '../../redux/actions/Actions';
import { useDispatch } from 'react-redux';

interface FormValues {
  profilePictureName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: File | null;
  country: string;
  city: string;
  address: string;
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profilePicture: null,
  country: '',
  city: '',
  address: '',
  profilePictureName: ''
};

const UserForm: React.FC = () => {
  const history = useNavigate()
  const dispatch = useDispatch();
  
  const handleSubmit = async (values: FormValues) => {
    try {
      await signUp(values, dispatch);
      history('/');
    } catch (error) {
      console.error("Error al crear la cuenta:", error);
    }
  };
  
 const signUp = async (values: FormValues, dispatch: any) => {
  try {
    console.log(values.email, values.password, values.firstName, values.lastName, values.profilePicture?.name, values.city, values.country, values.address, false, true );
    
    
    await dispatch(signUpNewUser(values.email, values.password, values.firstName, values.lastName, values.profilePictureName, values.city, values.country, values.address, false, true )); 
    console.log("Cuenta creada");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }
};
  return (
    <div className={styles.container}>
      <Formik
        initialValues={initialValues}
        validationSchema={validateUser}
        onSubmit={handleSubmit}
        >
        {({ setFieldValue, isValid, dirty }) => (
          <Form className={styles.form}>
            <h1>Crear cuenta de interfood</h1>
            <div>
              <label htmlFor="firstName">Nombre*:</label>
              <br />
              <Field type="text" id="firstName" name="firstName" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="firstName" /></p>
            </div>

            <div>
              <label htmlFor="lastName">Apellido*:</label>
              <br />
              <Field type="text" id="lastName" name="lastName" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="lastName" /></p>
            </div>

            <div>
              <label htmlFor="email">Email*:</label>
              <br />
              <Field type="email" id="email" name="email" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="email" /></p>
            </div>

            <div>
              <label htmlFor="password">Contraseña*:</label>
              <br />
              <Field type="password" id="password" name="password" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="password" /></p>
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirma contraseña*:</label>
              <br />
              <Field type="password" id="confirmPassword" name="confirmPassword" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="confirmPassword" /></p>
            </div>

            <div>
              <label htmlFor="profilePicture">Foto de perfil: (formatos en .jpg, .jpeg ó .png)</label>
              <br />
              <input
                className={styles.field}
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(event) =>
                setFieldValue('profilePicture', event.currentTarget.files?.[0])
                }
              />
              <br />
              <p className={styles.error}><ErrorMessage name="profilePicture" /></p>
            </div>

            <div>
              <label htmlFor="country">País*:</label>
              <br />
              <Field type="text" id="country" name="country" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="country" /></p>
            </div>

            <div>
              <label htmlFor="city">Ciudad*:</label>
              <br />
              <Field type="text" id="city" name="city" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="city" /></p>
            </div>

            <div>
              <label htmlFor="address">Direccion*:</label>
              <br />
              <Field type="text" id="address" name="address" className={styles.field} />
              <br />
              <p className={styles.error}><ErrorMessage name="address" /></p>
            </div>

            <button type="submit" className={styles.send} disabled={!isValid || !dirty}>REGISTRARME</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UserForm;
