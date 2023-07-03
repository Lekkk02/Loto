"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { set } from "mongoose";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const [carreras, setCarreras] = useState(null);
  const [caballos, setCaballos] = useState(null);

  useEffect(() => {
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => {
        setCaballos(data.caballos);
        const carrerasObj = {};
        Object.keys(data.carreras).forEach((key) => {
          carrerasObj[key] = { primer: data.carreras[key].primer };
        });
        setCarreras(carrerasObj);
      });
  }, []);

  const getTickets = (id) => {
    const { data, error, isLoading } = useSWR(`/api/tickets/${id}`, fetcher);
    return data;
  };

  const getApuestas = () => {
    const { data, error, isLoading } = useSWR(`/api/apuestas`, fetcher);
    return data;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const carrerasKeys = Object.keys(carreras);
    for (let i = 0; i < carrerasKeys.length; i++) {
      if (
        carreras[carrerasKeys[i]].primer == undefined ||
        carreras[carrerasKeys[i]].primer == ""
      ) {
        const alert = document.getElementById("alerta");

        alert.textContent = "INGRESE TODOS LOS CAMPOS...";
        break;
      }
    }
    console.log(carreras);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarreras((prevState) => ({
      ...prevState,
      [name]: { primer: value },
    }));
  };

  if (
    carreras == null ||
    carreras == undefined ||
    caballos == undefined ||
    caballos == null
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
            <p className="relative -top-8 text-lg font-bold ">
              Facturar ticket
            </p>
            <p id="alerta" className="font-bold text-red-500 text-lg my-4"></p>
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
            {Object.keys(carreras).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key}>{key.toUpperCase()}</label>
                <select
                  name={key}
                  id={key}
                  className="rounded-md h-6 my-2"
                  value={carreras[key].primer}
                  onChange={handleChange}
                >
                  <option value="" disabled selected>
                    Seleccione caballo
                  </option>

                  {caballos.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
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

            <button type="submit">Enviar</button>
          </form>
        </div>
      </main>
    );
  }
}
