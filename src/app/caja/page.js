"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Session } from "next-auth";
import useSWR from "swr";
import bcrypt from "bcryptjs";

import { useSession } from "next-auth/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

const Home = () => {
  const { data: session, status: status } = useSession();
  console.log(session, status);
  const cajero = "CarlosTest";

  const generate = async () => {
    const password = "contraseña";

    const hashedPassword = await bcrypt.hash(password, 12);

    console.log(hashedPassword);
  };

  console.log("Hashed Password: " + generate());
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

  let arrTickets = [];
  tickets.map((ticket) => {
    if (ticket["cajero"] == cajero) {
      arrTickets.push(ticket);
    }
  });
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
