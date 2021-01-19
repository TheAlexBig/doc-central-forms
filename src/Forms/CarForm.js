import React, { useState } from "react";
import DefaultForm from "./DefaultForm";

const CarForm = (props) => {
  const [carState, setCarState] = useState(
    props.dataCar
  );

  const [defaultCarState, setDefaultCarState] = useState(
    props.dataCar  
  );


  const changeHandler = (event, atributo) => {
    const cars = {
      ...carState,
    };
    cars[atributo] = event.target.value;
    setCarState(cars);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDefaultCarState(carState);
    
  };

  const style = {
    container: {
      display: "flex",
      alignItems: 'center',
      justifyContent: "center",
      marginTop: 20,
    },
    forms:{
      width: '50%',
    }
  };

  return (
    <div style={style.container}>
      <form style={style.forms} onSubmit={handleSubmit}>
        <DefaultForm
          id="placa"
          text="Placa: "
          type="text"
          changed={(event) => changeHandler(event, "placa")}
        />

        <DefaultForm
          id="marca"
          text="Marca: "
          type="text"
          changed={(event) => changeHandler(event, "marca")}
        />

        <DefaultForm
          id="modelo"
          text="Modelo: "
          type="text"
          changed={(event) => changeHandler(event, "modelo")}
        />
        <DefaultForm
          id="color"
          text="Color: "
          type="text"
          changed={(event) => changeHandler(event, "color")}
        />
        <DefaultForm
          id="fabricado"
          text="Fabricado:  "
          type="text"
          changed={(event) => changeHandler(event, "fabricado")}
        />
        <DefaultForm
          id="capacidad"
          text="Capacidad: "
          type="text"
          changed={(event) => changeHandler(event, "capacidad")}
        />
        <DefaultForm
          id="clase"
          text="Clase: "
          type="text"
          changed={(event) => changeHandler(event, "clase")}
        />
        <DefaultForm
          id="numMotor"
          text="Numero de motor: "
          type="text"
          changed={(event) => changeHandler(event, "num_motor")}
        />
        <DefaultForm
          id="numChasis"
          text="Numero de chasis: "
          type="text"
          changed={(event) => changeHandler(event, "num_chasis")}
        />
                <DefaultForm
          id="numVin"
          text="Numero de vin: "
          type="text"
          changed={(event) => changeHandler(event, "num_vin")}
        />
        <button type="submit">Guardar</button>
      </form>

      {/* PRUEBAS */}
      <div style={style.forms}>
        <p> PRUEBA CARRO</p>
        <div>
          <p>id: {defaultCarState.id}</p>
          <p>placa: {defaultCarState.placa}</p>
          <p>marca: {defaultCarState.marca}</p>
          <p>modelo: {defaultCarState.modelo}</p>
          <p>color: {defaultCarState.color}</p>
          <p>fabricado: {defaultCarState.fabricado}</p>
          <p>capacidad: {defaultCarState.capacidad}</p>
          <p>dominio: {defaultCarState.dominio}</p>
          <p>clase: {defaultCarState.clase}</p>
          <p>numero de motor: {defaultCarState.num_motor}</p>
          <p>numero de chasis: {defaultCarState.num_chasis}</p>
          <p>numero de vin: {defaultCarState.num_vin}</p>
        </div>
      </div>
    </div>
  );
};

export default CarForm;