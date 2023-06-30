"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Formulario() {
  const [campos, setCampos] = useState([
    { nombre: "Nombre", valor: "" },
    { nombre: "Apellido", valor: "" },
    { nombre: "Sexo", valor: "" },
  ]);

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const agregarCampo = () => {
    setCampos([...campos, { nombre: "", valor: "" }]);
  };

  const actualizarCampo = (index, event) => {
    const nuevosCampos = [...campos];
    nuevosCampos[index].nombre = event.target.value;
    nuevosCampos[index].valor = event.target.value;
    setCampos(nuevosCampos);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {campos.map((campo, index) => (
        <div key={index}>
          <label htmlFor={campo.nombre}>{campo.nombre}</label>
          <input
            type="text"
            id={campo.nombre}
            name={campo.nombre}
            value={campo.valor}
            onChange={(event) => actualizarCampo(index, event)}
            {...register(campo.nombre)}
          />
        </div>
      ))}
      <button type="button" onClick={agregarCampo}>
        Agregar campo
      </button>
      <button type="submit">Enviar</button>
    </form>
  );
}
