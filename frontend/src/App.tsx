import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar.tsx';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer.tsx';
import NuestrosPlatos from './components/NuestrosPlatos/Platos.tsx';
import QuienesSomos from './components/QuienesSomos/QuienesSomos.tsx';
import Faqs from './components/FAQ\'S/Faqs.tsx';
import Funciona from './components/ComoFunciona/Funciona.tsx';
import  {useDispatch} from 'react-redux'
import { useEffect, useState } from 'react';
import { getFood } from './redux/actions/Actions.tsx';
import { Dispatch } from 'redux';
import axios from 'axios'
import Detail from './components/Detail/Detail.tsx';
import Login from './components/Login/Login.tsx';
import { useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from '@firebase/auth';
import {app} from './Auth/firebaseConfig.ts'
import Error404 from './components/Error/error.tsx';
import UserForm from './components/userForm/UserForm.tsx';
import HomeAdmin from './components/AdminDashboard/HomeAdmin/HomeAdmin.tsx';
import HomeUser from './components/profileUser/HomeUser.tsx';
import CreateMeal from './components/AdminDashboard/CreateMeal/CreateMeal.tsx';
import MiPerfil from './components/PerfilUser/MiPerfil.tsx';
import EditDeleteFood from './components/AdminDashboard/Edit-DeleteFood/Edit-DeleteFood.tsx';
import UpdateMeal from './components/AdminDashboard/UpdateMeal.tsx/UpdateMeal.tsx';
import StatusPayment from './components/AdminDashboard/Graphics/StatusPayment/SatusPayment.tsx';
import Stock from './components/AdminDashboard/Graphics/Stock/Stock.tsx';
import Income from './components/AdminDashboard/Graphics/Income/Income.tsx';
import Mensual from './components/AdminDashboard/Graphics/Income/Mensual.tsx';
import Principales from './components/AdminDashboard/Graphics/Stock/Principales.tsx';
import Postres from './components/AdminDashboard/Graphics/Stock/Postres.tsx';
import Vegano from './components/AdminDashboard/Graphics/Stock/Vegano.tsx';
import DataUsers from './components/AdminDashboard/Graphics/DataUsers/table/DataUsers.tsx';

function App() {
    const auth = getAuth(app);
    const { pathname } = useLocation();
    const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                console.log('se inicio sesion');
                setUsuarioRegistrado(true);
            } else {
                console.log('no se inicio sesion');
                setUsuarioRegistrado(false);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    const dispatch = useDispatch<Dispatch>();

    useEffect(() => {
        const fetchData2 = async () => {
            try {
                const { data } = await axios.get(`http://127.0.0.1:3000/api/food/`);
                if (data) {
                    dispatch(getFood(data));
                } else {
                    alert('There are no characters with this ID!');
                }
            } catch (error : any) {
                alert(error.message);
            }
        };
        fetchData2();
    }, []);

    const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
      setShowMenu(!showMenu);
  };

  return (
      <>
          <div>
              <NavBar
                  onItemClick={() => {}}
                  toggleMenu={toggleMenu}
                  showMenu={showMenu}
                  auth={usuarioRegistrado}
              />
              <Routes>
                  <Route path="*"  element={<Error404/>}/>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/form" />
                  <Route path="/detail/:id" element={<Detail/>}/>
                  <Route path="/NuestrosPlatos" element={<NuestrosPlatos/>}/>
                  <Route path="/Comofunciona" element={<Funciona/>}/>
                  <Route path="/QuienesSomos" element={<QuienesSomos/>}/>
                  <Route path="/Faqs" element={<Faqs/>}/>
                  <Route path="/Login" element={<Login/>}/>
                  <Route path="/Register" element={<UserForm/>}/>
                  <Route path="/useraccount" element={<HomeUser/>}/>
                  <Route path="useraccount/editarperfil" element={<UserForm/>}/>
                  <Route path="/MiPerfil" element={<MiPerfil/>}/>
                  <Route path="/admindashboard" element={<HomeAdmin/>}/>
                  <Route path="/admindashboard/crearplato" element={<CreateMeal/>}/>
                  <Route path="/admindashboard/editar-eliminar" element={<EditDeleteFood />}/>
                  <Route path="/admindasboard/editar-eliminar/editarComida/" element={<UpdateMeal />}/>
                  <Route path="/admindashboard/statuspayment" element={<StatusPayment />}/>
                  <Route path="/admindashboard/income" element={<Income />}/>
                  <Route path="/admindashboard/income/mensual" element={<Mensual />}/>
                  <Route path="/admindashboard/stock" element={<Stock />}/>
                  <Route path="/admindashboard/stock/principales" element={<Principales />}/>
                  <Route path="/admindashboard/stock/postres" element={<Postres />}/>
                  <Route path="/admindashboard/stock/vegano" element={<Vegano />}/>
                  <Route path="/admindashboard/datausers" element={<DataUsers />}/>
                  <Route path="*" />
              </Routes>
              <Footer/>
          </div>
      </>
  );
}

export default App;


