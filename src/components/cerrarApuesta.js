import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from "react";
import connect from "@/utils/db";
export default function CerrarApuesta() {
  const [apuestaActiva, setApuesta] = useState([]);
  useEffect(() => {
    fetch("/api/active")
      .then((response) => response.json())
      .then((data) => {
        setApuesta(data);
      });
  }, []);

  if (!apuestaActiva) {
    return (
      <h1 className="text-2xl text-center py-64 font-bold">Cargando...</h1>
    );
  }

  const handleUpdate = async () => {
    try {
      const res = await fetch("/api/apuestas", {
        method: "PUT",
        body: JSON.stringify({
          status: "INACTIVE",
        }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="text-center mt-4 mb-12 p-36">
        <h1 className="text-2xl font-bold ml-4">{apuestaActiva.hipodromo}</h1>
        <h1 className="text-md  ml-4 my-6">
          Estado:
          <span className="ml-2 border font-normal rounded-xl px-4 bg-green-500  ">
            ACTIVA
          </span>
        </h1>
        <h1 className="text-md  ml-4">
          Fecha:
          <span className=" font-normal rounded-xl px-4 my-10">
            {apuestaActiva.createdAt
              ? apuestaActiva.createdAt.substring(0, 10)
              : apuestaActiva.createdAt}
          </span>
        </h1>
        <button
          onClick={handleUpdate}
          className="mt-4 border font-bold border-black p-2 rounded-md bg-red-500"
        >
          CERRAR APUESTA
        </button>
      </div>
    </div>
  );
}
