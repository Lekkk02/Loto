"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

/* const getData = async () => {
  const data = await fetch("/api/tickets");
  return data.json();
}; */
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const getApuestas = () => {
    const { data, error, isLoading } = useSWR("/api/apuestas", fetcher);
    return data;
  };

  const getTickets = () => {
    const { data, error, isLoading } = useSWR("/api/tickets", fetcher);
    return data;
  };
  const data = getTickets();
  const data2 = getApuestas();

  console.log(data);
  console.log(data2);

  /*   if (error) return <div>Error al cargar tickets...</div>;
  if (!data) return <div>Cargando tickets...</div>; */

  return (
    <div>
      {data2?.map((item) => {
        let date = new Date(item.createdAt).toLocaleDateString().split(",")[0];
        return (
          <div className="text-center mt-4">
            <h1 className="text-2xl font-bold ml-4">
              {item.hipodromo} <span className="ml-2 font-normal"> {date}</span>
            </h1>
            <h1 className="text-2xl font-bold ml-4">
              Pollas jugadas:
              <span className="ml-2 border font-normal rounded-xl px-4 bg-green-500  ">
                {Object.keys(data2).length + 1000} Pollas
              </span>
            </h1>

            <h1 key={item.createdAt}>{item.carreras.carrera1.primero}</h1>
          </div>
        );
      })}
      <h1 className="pb-96" key={"a"}>
        a
      </h1>
    </div>
  );
}
