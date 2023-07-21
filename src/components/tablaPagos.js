"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status: status } = useSession();
  const [apuestas, setApuestas] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cajeros, setCajeros] = useState([]);
  const router = useRouter();

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
    fetch(`/api/cajeros`)
      .then((response3) => response3.json())
      .then((data3) => {
        setCajeros(data3);
      });
  }, []);

  useEffect(() => {
    const updatedCajeros = cajeros.map((cajero) => {
      const pollas = tickets.filter(
        (ticket) => ticket.cajero === cajero.username
      ).length;
      return { ...cajero, pollas };
    });
    setCajeros(updatedCajeros);
  }, [tickets]);

  if (!apuestas || !tickets || !cajeros)
    return (
      <h1 className="font-bold text-2xl text-center py-24">Cargando...</h1>
    );

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
