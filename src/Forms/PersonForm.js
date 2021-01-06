import React from 'react';

const PersonForm = (props)=>{
    return(
        <div>
            <p></p>
            <p for= "nombre">Nombre</p>
            <input id="nombre" type="text" onChange={props.changed} />
        </div>
    )
};

export default PersonForm;