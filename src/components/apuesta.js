"use client";
import useSWR from "swr";
import Table from "@/components/tabla";
import { useState, useEffect } from "react";
/* const getData = async () => {
  const data = await fetch("/api/tickets");
  return data.json();
}; */
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [ticketsPrimer, setPrimer] = useState(0);
  const [ticketsSegundo, setSegundo] = useState(0);

  const {
    data: data2,
    error: errorApuesta,
    isLoading: cargandoApuesta,
  } = useSWR("/api/apuestas", fetcher);

  const { data, error, isLoading } = useSWR(
    data2 ? `/api/tickets/${data2?._id}` : null,
    fetcher
  );
  useEffect(() => {
    if (data) {
      const totalPrimer = data.filter((ticket) => {
        return ticket.posicion == "N°1";
      });
      const totalSegundo = data.filter((ticket) => {
        return ticket.posicion == "N°2";
      });

      setPrimer(totalPrimer.length);
      setSegundo(totalSegundo.length);
    }
  });

  /*   let dineroTotal;
  let dineroPrimerLugar
  let dineroSegundoLugar
  let totalPrimer
  let totalSegundo
  let primerLugar_Ganador
  let segundoLugar_Ganador */
  const stat = (data) => {
    if (data == null || data == undefined) {
      return false;
    } else {
      return Object.keys(data).length;
    }
  };

  if (cargandoApuesta || isLoading) {
    return (
      <h1 className="font-bold text-2xl text-center py-64 min-w-[400px]">
        ¡Bienvenido a SellaTuPolla.com!
      </h1>
    );
  }
  if (errorApuesta || error) {
    return (
      <h1 className="font-bold text-2xl text-center py-64 min-w-[400px]">
        ¡Estamos procesando tu solicitud, recarga la página!
      </h1>
    );
  }

  const dineroTotal = data.length * 2 * 0.6;
  const dineroPrimerLugar = dineroTotal * 0.7;
  const dineroSegundoLugar = dineroTotal * 0.3;
  const totalPrimer = data.filter((ticket) => {
    return ticket.posicion == "N°1";
  }).length;
  const totalSegundo = data.filter((ticket) => {
    return ticket.posicion == "N°2";
  }).length;
  console.log(totalSegundo);
  const primerLugar_Ganador = (dineroPrimerLugar / ticketsPrimer).toFixed(2);
  const segundoLugar_Ganador = (dineroSegundoLugar / totalSegundo).toFixed(2);
  console.log(primerLugar_Ganador);
  console.log(segundoLugar_Ganador);
  return (
    <div>
      <div>
        <div className="text-center mt-4 mb-12">
          <h1 className="text-2xl font-bold ml-4">
            {data2.hipodromo}
            <span className="ml-2 font-normal">
              {new Date(data2.createdAt).toLocaleDateString().split(",")[0]}
            </span>
          </h1>
          <h1 className="text-2xl font-bold ml-4">
            Pollas jugadas:
            <span className="ml-2 border font-normal rounded-xl px-4 bg-green-500  ">
              {stat(data)} Pollas
            </span>
          </h1>
          {data2?.mensaje == "" ? (
            <p></p>
          ) : (
            <h1 className="font-bold text-xl text-red-500 mt-4">
              {data2.mensaje}
            </h1>
          )}
        </div>
      </div>
      <div className="py-6 text-lg items-center flex flex-col  bg-gray-200 border border-gray-300">
        <h1 className="font-bold">
          Total a repartir:
          <span className="font-light ml-2">
            {(stat(data) * 2 * 0.6).toFixed(2)}
            {"$"}
          </span>
        </h1>
        <h1 className="">Primer lugar: {dineroPrimerLugar.toFixed(2)}$</h1>
        <h1 className="">Segundo lugar: {dineroSegundoLugar.toFixed(2)}$</h1>
        <hr className="block border-1 border-black w-full"></hr>
        <h1 className="font-bold">Premios por ganador </h1>
        <h1>
          Primer lugar:{" "}
          <span className=" text-green-800">
            {" "}
            {data2.terminada !== "N"
              ? primerLugar_Ganador
              : "SE MOSTRARÁ AL FINALIZAR LAS CARRERAS"}
            $
          </span>
        </h1>
        <h1>
          Segundo lugar:
          <span className=" text-green-800">
            {" "}
            {data2.terminada !== "N"
              ? segundoLugar_Ganador
              : "SE MOSTRARÁ AL FINALIZAR LAS CARRERAS"}
            $
          </span>
        </h1>
      </div>

      <div className="mt-12" key="TablaCarrerasApuesta">
        <Table />
      </div>
    </div>
  );
}
