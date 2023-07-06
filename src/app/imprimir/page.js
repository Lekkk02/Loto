import { useRouter } from "next/navigation";
import React from "react";
import { ReactComponentElement } from "react";
const Imprimir = ({ props }) => {
  const { nombre, apellido, edad } = props;

  return (
    <div>
      <p>Nombre: {nombre}</p>
      <p>Apellido: {apellido}</p>
      <p>Edad: {edad}</p>
    </div>
  );
};

export default Imprimir;
