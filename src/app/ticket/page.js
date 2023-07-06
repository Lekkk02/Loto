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
  const [apuestas, setApuestas] = useState([]);
  const [objCarreras, setCarreras] = useState([]);
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [caballos, setCaballos] = useState(null);

  useEffect(() => {
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => {
        setApuestas(data);
        setCaballos(data.caballos);
        const carrerasObj = {};
        Object.keys(data.carreras).forEach((key) => {
          carrerasObj[key] = { primer: data.carreras[key].primer };
        });
        setCarreras(carrerasObj);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/apuestas")
        .then((response) => response.json())
        .then((data) => {
          setApuestas(data);
        });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const carrerasKeys = Object.keys(objCarreras);
    let check = true;
    for (let i = 0; i < carrerasKeys.length; i++) {
      if (
        objCarreras[carrerasKeys[i]].primer == undefined ||
        objCarreras[carrerasKeys[i]].primer == ""
      ) {
        const alert = document.getElementById("alerta");
        alert.textContent = "INGRESE TODOS LOS CAMPOS...";
        check = false;
        console.log("Check is false");
        break;
      }
    }
    if (
      nombre == undefined ||
      nombre == "" ||
      cedula == undefined ||
      cedula == "" ||
      telefono == undefined ||
      telefono == ""
    ) {
      check = false;
    }
    if (check) {
      const carreras = objCarreras;
      let apuesta = apuestas._id;
      let puntos;
      let cajero = "MaikelTest";
      let serialTicket;
      console.log("Check is true");
      try {
        const ticket = await fetch("/api/tickets", {
          method: "POST",
          body: JSON.stringify({
            nombre,
            cedula,
            telefono,
            carreras,
            puntos,
            apuesta,
            cajero,
          }),
        });
        const respuesta = await ticket.json();
        console.log(respuesta);
      } catch (err) {
        console.log(err);
      }
    }
    console.log(objCarreras);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCarreras((prevState) => ({
      ...prevState,
      [name]: { primer: value },
    }));
  };

  if (apuestas?.status == "INACTIVE") {
    return (
      <h1 className="text-2xl text-center py-64 font-bold">
        La apuesta actual está cerrada, no es posible facturar más tickets...
      </h1>
    );
  }

  if (
    apuestas == null ||
    apuestas == undefined ||
    objCarreras == null ||
    objCarreras == undefined ||
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
            <p className="relative -top-8 text-lg font-bold">Facturar ticket</p>
            <p id="alerta" className="font-bold text-red-500 text-lg my-2"></p>
            <label for="txtNombre">Nombre </label>
            <input
              type="text"
              name="nombre"
              id="txtNombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre del comprador"
              className="rounded-md p-1 my-2"
            ></input>
            <label for="txtCedula">Cédula </label>
            <input
              type="text"
              name="cedula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              id="txtCedula"
              placeholder="Cédula del comprador"
              className="rounded-md p-1 my-2"
              maxLength={8}
            ></input>
            {Object.keys(objCarreras).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key}>{key.toUpperCase()}</label>
                <select
                  name={key}
                  id={key}
                  className="rounded-md h-6 my-2"
                  value={objCarreras[key].primer}
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
              name="telefono"
              id="txtTelf"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="EJ: 0414-000-0000"
              className="rounded-md p-1 my-2"
              maxLength={32}
            ></input>

            <button
              type="submit"
              className="rounded-lg border border-black mt-4 hover:scale-105"
            >
              Enviar
            </button>
          </form>
        </div>
      </main>
    );
  }
}
