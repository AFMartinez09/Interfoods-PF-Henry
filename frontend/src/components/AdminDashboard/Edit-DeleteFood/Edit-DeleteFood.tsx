import React, { Dispatch, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../../redux/reducer/Reducer";
import { useLocation } from "react-router-dom";
import Card from "./CardAdmin/CardAdmin";
import Style from "../../Cards/Cards.module.css";
import SearchBar from "../../SearchBar/SearchBar";
import Styled from "./Edit-Delete.module.css";
import Error404 from "../../Error/error";

interface Food {
  id: number;
  nombre: string;
  ingredientes: string[];
  kilocalorias: number;
  carbohidratos: number;
  grasas: number;
  peso: number;
  precio: number;
  imagen: string;
  stock: string;
  tipo: string;
  activo: boolean;
  inventario: number;
}

interface CardsProps {
  numberOfCards?: number;
  setChanges: Dispatch<SetStateAction<boolean>>;
}

const EditDeleteFood: React.FC<CardsProps> = ({ numberOfCards }) => {
  const location = useLocation();
  const foodState = useSelector((state: StoreState) => state.filtros);
  const foodAllState = useSelector((state: StoreState) => state.platos);
  const isAdmin = useSelector((state: StoreState) => state.admin);

  const loading = foodState.length === 0;

  const foods: Food[] =
    location.pathname === "/admindashboard" ? foodAllState : foodState;

  const limitedFoods = numberOfCards ? foods.slice(0, numberOfCards) : foods;
  console.log(foods);

  // Style => viene de Cards
  // styled => es de Edit-DeleteFood
  return (
    <div className={Styled.home}>
      {isAdmin === false ? (
        <Error404 />
      ) : (

    <div className={Styled.container}>
      <div className={Styled.filter} >
        <SearchBar />
       </div>
      {loading ? (
        <div className="containerLoading">
          <div className={Styled.noexiste}>Lo sentimos mucho, No existen platos disponibles con estos criterios.</div>
        </div>
      ) : (
        <div className={Style.cards}>
          {limitedFoods.map((food) => (
            <Card
              activo={food.activo}
              tipo={food.tipo}
              stock={food.stock}
              key={food.id}
              name={food.nombre}
              img={food.imagen}
              weight={food.peso}
              price={food.precio}
              id={food.id}
              kilocalorias={food.kilocalorias}
              carbohidratos={food.carbohidratos}
              inventario={food.inventario}
              />
            ))}

        <div className={Styled.container}>
          <div className={Styled.filter}>
            <SearchBar />
          </div>
          {loading ? (
            <div className="containerLoading">
              <div className={Styled.noexiste}>
                Lo sentimos mucho, No existen platos disponibles con estos
                criterios.
              </div>
            </div>
          ) : (
            <div className={Style.cards}>
              {limitedFoods.map((food) => (
                <Card
                  activo={food.activo}
                  tipo={food.tipo}
                  stock={food.stock}
                  key={food.id}
                  name={food.nombre}
                  img={food.imagen}
                  weight={food.peso}
                  price={food.precio}
                  id={food.id}
                  kilocalorias={food.kilocalorias}
                  carbohidratos={food.carbohidratos}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditDeleteFood;
