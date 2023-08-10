"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data: session, status: status } = useSession();

  const router = useRouter();

  const {
    data: apuestas,
    error: errorApuesta,
    isLoading: cargandoApuesta,
  } = useSWR("/api/apuestas", fetcher);

  const {
    data: tickets,
    error: errorTickets,
    isLoading: cargandoTickets,
  } = useSWR(apuestas ? `/api/tickets/${apuestas._id}` : null, fetcher);

  const {
    data: cajerosRAW,
    error: errorCajeros,
    isLoading: cargandoCajeros,
  } = useSWR(`/api/cajeros`, fetcher);

  if (cargandoApuesta || cargandoTickets || cargandoCajeros) {
    return (
      <h1 className="font-bold text-2xl text-center py-24">Cargando...</h1>
    );
  }
  if (errorApuesta || errorTickets || errorCajeros) {
    return (
      <h1 className="font-bold text-2xl text-center py-64 min-w-[400px]">
        ¡Estamos procesando tu solicitud, recarga la página!
      </h1>
    );
  }
  let cajeros = cajerosRAW;

  const updatedCajeros = cajeros.map((cajero) => {
    const pollas = tickets.filter(
      (ticket) => ticket.cajero === cajero.username
    ).length;
    return { ...cajero, pollas };
  });
  cajeros = updatedCajeros;

  return (
    <>
      <table className="w-full my-8">
        <tbody>
          <tr className="border border-black">
            <th className="border border-black text-md">CAJERO</th>
            <th className="border border-black text-md">SEDE</th>
            <th className="border border-black text-md">POLLAS VENDIDAS</th>
            <th className="border border-black text-md">TOTAL A PAGAR</th>
          </tr>

          {cajeros.map((cajero, index) => {
            return (
              <tr className="text-center" key={`cajero${index}`}>
                <td className="border border-black text-md">
                  {cajero.username}
                </td>
                <td className="border border-black text-md">{cajero.sede}</td>
                <td className="border border-black text-md">{cajero.pollas}</td>
                <td className="border border-black text-md">
                  {(cajero.pollas * 2 * 0.2).toFixed(2)}$
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
