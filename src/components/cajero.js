"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status: status } = useSession();
  const [apuestas, setApuestas] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [buscado, setBuscado] = useState("");
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
    }
  });
  const totalPollas = arrTickets?.length;
  const totalDinero = totalPollas * 2 * 0.2;
  const onSubmit = (ev) => {
    ev.preventDefault();
    router.push(`/factura/${buscado}`);
  };
  return (
    <div className=" py-16 justify-evenly">
      <div className="text-center  my-8">
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
      <hr className="border-1 border-black"></hr>
      <div className="mt-8 text-center  rounded py-2 ">
        <p className="text-lg my-1">Ingrese serial del ticket a imprimir</p>
        <form className="flex flex-col items-center " onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Serial del ticket"
            value={buscado}
            onChange={(e) => setBuscado(e.target.value)}
            className=" border border-black rounded-md p-1 text-center w-1/3"
          ></input>
          <button
            type="submit"
            className="border border-black bg-green-500 rounded-sm  mt-2 p-2"
          >
            Buscar
          </button>
        </form>
      </div>
    </div>
  );
}
