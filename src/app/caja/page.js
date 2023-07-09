"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const cajero = "CarlosTest";

  const getApuestas = () => {
    const { data, error, isLoading } = useSWR("/api/active", fetcher);
    return data;
  };

  const getTickets = (id) => {
    const { data, error, isLoading } = useSWR(`/api/tickets/${id}`, fetcher);
    return data;
  };

  const apuestaActiva = getApuestas();
  const tickets = getTickets(apuestaActiva?._id);

  if (tickets == undefined || tickets == null)
    return (
      <h1 className="font-bold text-2xl text-center py-24">Cargando...</h1>
    );
  console.log(apuestaActiva);

  console.log(tickets);
  let arrTickets = [];
  tickets.map((ticket) => {
    if (ticket["cajero"] == cajero) {
      arrTickets.push(ticket);
    }
  });
  console.log(arrTickets);
  const totalPollas = arrTickets.length;
  const totalDinero = totalPollas * 2 * 0.2;
  return (
    <div>
      <div className="text-center my-52">
        <p className="font-bold text-xl my-2">
          Cajero: <span className="font-light">{cajero} </span>
        </p>
        <p className="font-bold text-xl my-2">
          Pollas vendidas: <span className="font-light">{totalPollas}</span>
        </p>
        <p className="font-bold text-xl my-2">
          Total a recibir: <span className="font-light">{totalDinero}$</span>
        </p>
      </div>
    </div>
  );
};

export default Home;
