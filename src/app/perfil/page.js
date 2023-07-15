"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status: status } = useSession();
  const [apuestas, setApuestas] = useState([]);
  const [tickets, setTickets] = useState([]);

  const router = useRouter();
  if (!session) {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }
  let cajero;
  if (status == "authenticated") cajero = session.user.username;

  useEffect(() => {
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => {
        setApuestas(data);
        fetch(`/api/tickets/${data?._id}`)
          .then((response2) => response2.json())
          .then((data2) => {
            setTickets(data2);
          });
      });
  }, []);

  if (!apuestas || !tickets || !cajero)
    return (
      <h1 className="font-bold text-2xl text-center py-24">Cargando...</h1>
    );
  let arrTickets = [];

  tickets.map((ticket) => {
    if (ticket["cajero"] == cajero) {
      arrTickets?.push(ticket);
      console.log("Uno más");
    }
  });
  const totalPollas = arrTickets?.length;
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
          Total a recibir:{" "}
          <span className="font-light">{totalDinero.toFixed(2)}$</span>
        </p>
      </div>
    </div>
  );
}
