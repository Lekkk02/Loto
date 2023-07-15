"use client";

import { useState, useEffect } from "react";
import Apuesta from "@/components/crearApuesta";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CerrarApuesta from "@/components/cerrarApuesta";
export default function Home() {
  const [apuesta, setApuesta] = useState([]);
  const [status, setStatus] = useState([]);
  const { data: session, status: estatus } = useSession();

  const router = useRouter();
  if (!session) {
    if (estatus == "unauthenticated") {
      router.push("/login");
    }
  }
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
