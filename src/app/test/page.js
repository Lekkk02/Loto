"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [nombre, setName] = useState("");

  const handleSubmit = async (event) => {
    /*     const carreras = {
      carrera1: {
        primer: "2",
        segundo: "3",
        retirados: "5, 7, 9",
      },
      carrera2: {
        primer: "12",
        segundo: "1",
        retirados: "15, 6, 8",
      },
    }; */
    const cedula = "cedulaTest";
    const telefono = "telefonoTest";

    try {
      await fetch("/api/tickets", {
        method: "POST",
        body: JSON.stringify({
          nombre,
          cedula,
          telefono,
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your name:
        <input
          type="text"
          value={nombre}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
  );
}
