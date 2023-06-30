"use client";
import { useState } from "react";

const Formulario = () => {
  const [campos, setCampos] = useState([
    { nombre: "Nombre", valor: "" },
    { nombre: "Apellido", valor: "" },
    { nombre: "Sexo", valor: "" },
  ]);

  const agregarCampo = () => {
    const personasFiltradas = campos.filter((persona) =>
      persona.nombre.startsWith("Carrera")
    );

    let cont = personasFiltradas.length + 1;
    setCampos([...campos, { nombre: `Carreras`, valor: "" }]);
  };

  const eliminarCampo = (index) => {
    const nuevosCampos = [...campos];
    nuevosCampos.splice(index, 1);
    setCampos(nuevosCampos);
  };

  const actualizarCampo = (index, event) => {
    const nuevosCampos = [...campos];
    nuevosCampos[index].valor = event.target.value;
    setCampos(nuevosCampos);
  };

  const enviarFormulario = (event) => {
    event.preventDefault();
    console.log(campos);
  };

  return (
    <form onSubmit={enviarFormulario}>
      {campos.map((campo, index) => (
        <div key={index}>
          <label>{campo.nombre}</label>
          <input
            type="text"
            value={campo.valor}
            onChange={(event) => actualizarCampo(index, event)}
          />
          <button type="button" onClick={() => eliminarCampo(index)}>
            Eliminar
          </button>
        </div>
      ))}
      <button type="button" onClick={agregarCampo}>
        Agregar campo
      </button>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
