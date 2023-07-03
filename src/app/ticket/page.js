"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [carreras, setCarreras] = useState(null);
  useEffect(() => {
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => setCarreras(data.carreras));
  }, []);
  const getApuestas = () => {
    const { data, error, isLoading } = useSWR("/api/apuestas", fetcher);
    return data;
  };

  const getTickets = (id) => {
    const { data, error, isLoading } = useSWR(`/api/tickets/${id}`, fetcher);
    return data;
  };

  const data2 = getApuestas();
  console.log(data2);
  const data = getTickets(data2?._id);
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(carreras);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const [carrera, field] = name.split(".");
    setCarreras((prevState) => ({
      ...prevState,
      [carrera]: {
        ...prevState[carrera],
        [field]: value,
      },
    }));
  };
  if (
    data2 == null ||
    data2 == undefined ||
    data == undefined ||
    data == null
  ) {
    return (
      <h1 className="text-2xl text-center py-64 font-bold">Cargando...</h1>
    );
  } else {
    return (
      <main>
        <div className="flex flex-col items-center p-56">
          <form
            onSubmit={handleSubmit}
            id="form-ticket"
            className="flex flex-col bg-transparent border-2 w-96 shadow-2xl text-center border-black p-16 rounded-lg
              "
          >
            <p className="relative -top-10 text-lg font-bold ">
              Facturar ticket
            </p>
            <label for="txtNombre">Nombre </label>
            <input
              type="text"
              name="cedula"
              id="txtNombre"
              placeholder="Nombre del comprador"
              className="rounded-md p-1 my-2"
              maxLength={8}
            ></input>
            <label for="txtCedula">Cédula </label>
            <input
              type="text"
              name="cedula"
              id="txtCedula"
              placeholder="Cédula del comprador"
              className="rounded-md p-1 my-2"
              maxLength={8}
            ></input>
            {Object.entries(carreras).map(([carrera, valores]) => (
              <div key={carrera}>
                <label htmlFor={carrera}>{carrera}</label>
                <input
                  type="text"
                  id={carrera}
                  name={`${carrera}.primero`}
                  value={valores.primero}
                  onChange={handleInputChange}
                />
              </div>
            ))}
            <label for="txtTelf">Teléfono</label>
            <input
              type="text"
              name="cedula"
              id="txtTelf"
              placeholder="EJ: 1,2,3,4,5,6,7"
              className="rounded-md p-1 my-2"
              maxLength={32}
            ></input>
            <label for="txtCedula"></label>
            <input
              type="text"
              name="cedula"
              id="txtCedula"
              placeholder="EJ: 1,2,3,4,5,6,7"
              className="rounded-md p-1 my-2"
              maxLength={32}
            ></input>

            <button type="submit">Enviar</button>
          </form>
        </div>
      </main>
    );
  }
}
