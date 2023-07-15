"use client";

import { useState, useEffect } from "react";
import Apuesta from "@/components/crearApuesta";
import CerrarApuesta from "@/components/cerrarApuesta";
export default function Home() {
  const [apuesta, setApuesta] = useState([]);
  const [status, setStatus] = useState([]);
  useEffect(() => {
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => {
        setApuesta(data);
        setStatus(data.status);
      });
  }, []);
  if (!apuesta) {
    return (
      <h1 className="font-bold text-2xl text-center py-64 min-w-[400px] tex">
        Cargando apuesta....
      </h1>
    );
  }
  return status == "ACTIVE" ? <CerrarApuesta /> : <Apuesta />;
}
