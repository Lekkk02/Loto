"use client";
import useSWR from "swr";
import { useEffect, useState } from "react";
const Listado = ({ data2 }) => {
  const [ticketActual, setTicketActual] = useState([]);

  const opciones = { year: "2-digit", month: "2-digit", day: "2-digit" };

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const generate = (id) => {
    fetch(`/api/reporte/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTicketActual(data);
      });
    if (ticketActual !== []) {
      console.log(ticketActual);
    }
  };

  /*   Para evitar este problema, puedes generar el PDF dentro del segundo .then después de llamar a setTicketActual. 
  De esta manera, puedes asegurarte de que estás generando el PDF con el valor actualizado de ticketActual. 
  Aquí tienes un ejemplo de cómo podrías modificar tu código:
   */ console.log(data2);
  return (
    <>
      <h1 className="text-center font-bold text-4xl m-12">
        Historial de apuestas
      </h1>{" "}
      {Object.keys(data2).map((apuesta) => (
        <>
          <div className="flex justify-end my-2  ">
            <h1 key={apuesta.hipodromo} className="mx-1 font-bold self-center ">
              HIP:{" "}
              <span className="font-bold text-green-700">
                {data2[apuesta].hipodromo}
              </span>
            </h1>
            <h1 key={apuesta.createdAt} className="mx-1 text-lg self-center ">
              {data2[apuesta].createdAt.toLocaleDateString("es-VE", opciones)}
            </h1>
            <button
              className="text-white ml-auto mr-24 bg-blue-500 rounded-md p-2"
              onClick={() => {
                generate(data2[apuesta]._id);
              }}
            >
              Descargar reporte
            </button>
          </div>
          <hr className="border border-black"></hr>
        </>
      ))}{" "}
    </>
  );
};

export default Listado;
