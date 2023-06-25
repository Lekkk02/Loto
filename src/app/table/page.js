"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

/* const getData = async () => {
  const data = await fetch("/api/tickets");
  return data.json();
}; */
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR("/api/tickets", fetcher);
  console.log(data);
  if (error) return <div>Error al cargar tickets...</div>;
  if (!data) return <div>Cargando tickets...</div>;

  return (
    <div>
      <h1>hea</h1>
      {data.map((item) => {
        return <h1 key={item.name}>{item.carreras.carrera1.segundo}</h1>;
      })}
    </div>
  );
}
