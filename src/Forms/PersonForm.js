import React from 'react';

const PersonForm = (props)=>{
    return(
        <div>
            <p>id: {props.dataPerson.id}</p>
            <p>nombres: {props.dataPerson.nombres} </p>
            <p>apellidos: {props.dataPerson.apellidos} </p>
            <p>departamento: {props.dataPerson.departamento} </p>
            <p>domicilio: {props.dataPerson.domicilio} </p>
            <p>fecha de naciemiento: {props.dataPerson.fecha_nacimiento} </p>
            <p>edad {props.dataPerson.edad} </p>
            <p>NIT: {props.dataPerson.nit} </p>
            <p>genero: {props.dataPerson.genero} </p>

        </div>
    )
};

export default PersonForm;