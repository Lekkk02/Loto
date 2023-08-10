"use client";
import { useState } from "react";

function FormularioCarrera() {
  const [carreras, setCarreras] = useState([]);

  const agregarCarrera = () => {
    setCarreras([...carreras, { id: "", caballos: "" }]);
  };

  const handleIdChange = (e, index) => {
    const carrerasActualizadas = [...carreras];
    carrerasActualizadas[index].id = e.target.value;
    setCarreras(carrerasActualizadas);
  };

  const handleCaballosChange = (e, index) => {
    const carrerasActualizadas = [...carreras];
    carrerasActualizadas[index].caballos = e.target.value;
    setCarreras(carrerasActualizadas);
  };

  const enviarFormulario = (ev) => {
    ev.preventDefault();
    const data = {};
    carreras.forEach((carrera) => {
      data[`carrera${carrera.id}`] = {
        primero: {},
        segundo: {},
        tercero: {},
        retirados: {},
        caballos: carrera.caballos.split(",").reduce((acc, curr, index) => {
          acc[index] = curr;
          return acc;
        }, {}),
      };
    });
    console.log(data);
  };

  return (
    <div>
      {carreras.map((carrera, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="ID de carrera"
            value={carrera.id}
            onChange={(e) => handleIdChange(e, index)}
          />
          <input
            type="text"
            placeholder="Caballos"
            value={carrera.caballos}
            onChange={(e) => handleCaballosChange(e, index)}
          />
        </div>
      ))}
      <button onClick={agregarCarrera}>Agregar Carrera</button>
      <button onClick={enviarFormulario}>Enviar</button>
    </div>
  );
}

export default FormularioCarrera;
