"use client";
import { useState, useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { saveAs } from "file-saver";

import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status: status } = useSession();
  const router = useRouter();

  if (!session) {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }

  const [apuestas, setApuestas] = useState([]);
  const [carrerasRetirados, setCarrerasRetirados] = useState([]);
  const [objCarreras, setCarreras] = useState([]);
  const [objCaballosEnCarrera, setCaballosEnCarrera] = useState([]);

  const [nombre, setNombre] = useState("");
  const [hipodromo, setHipodromo] = useState("");

  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
  const [caballos, setCaballos] = useState(null);

  useEffect(() => {
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => {
        setApuestas(data);
        const carrerasObj = {};
        Object.keys(data.carreras).forEach((key) => {
          carrerasObj[key] = { primer: data.carreras[key].primero };
        });
        const caballosEnCarrera = {};
        Object.keys(data.carreras).forEach((key) => {
          caballosEnCarrera[key] = { caballos: data.carreras[key].caballos };
        });
        setCaballosEnCarrera(caballosEnCarrera);
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
        break;
      }
    }

    if (hipodromo == undefined || hipodromo == "") {
      const alert = document.getElementById("alerta");
      alert.textContent = "INGRESE TODOS LOS CAMPOS...";
      check = false;
    }

    if (
      nombre == undefined ||
      nombre == "" ||
      cedula == undefined ||
      cedula == "" ||
      telefono == undefined ||
      telefono == "" ||
      hipodromo == undefined ||
      hipodromo == ""
    ) {
      check = false;
    }
    if (check) {
      const carreras = objCarreras;
      let apuesta = apuestas._id;
      let puntos;
      const cajero = session.user?.username;
      let serialTicket;
      const hipodromo = apuestas.hipodromo;
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
            hipodromo,
          }),
        });
        function formatDate(date) {
          const day = date.getDate().toString().padStart(2, "0");
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const year = date.getFullYear().toString().substr(-2);

          return `${day}/${month}/${year}`;
        }
        const today = new Date(new Date().getTime() + 0 * 3600 * 1000);

        const respuesta = await ticket.json();
        var hours = today.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        const fecha = formatDate(today) + " - " + hours;

        const carrerasTexto = Object.keys(carreras)
          .map(
            (key) =>
              `Carr.${key.split("carrera")[1]} - Caballo ${
                carreras[key].primer
              }`
          )
          .join("\n");
        const contenidoArchivo = `\n----------------------\nVENDEDOR: ${cajero}\n${fecha}\nCI: ${cedula}\nNOMBRE: ${nombre}\nSERIAL: ${respuesta}\n----------------------\nSELLATUPOLLA\n----------------------\nHIP: ${apuestas.hipodromo}\n----------------------\n${carrerasTexto}\n----------------------\nVALOR POLLA: 2$\nVISITA SELLATUPOLLA.COM\nPARA VER TU TICKET\n----------------------\n----------------------\n`;
        const archivo = new File(
          [contenidoArchivo],
          `Factura - ${respuesta}.txt`,
          {
            type: "text/plain;charset=utf-8",
          }
        );
        /*     saveAs(archivo);
         */ const url = URL.createObjectURL(archivo);
        const nuevaVentana = window.open(url);

        // Abrir la ventana de impresión del navegador en la misma ventana donde se abrió el archivo de texto
        nuevaVentana.onload = () => {
          nuevaVentana.print();
        };

        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
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

  if (session) {
    if (status == "authenticated") {
      if (
        apuestas == null ||
        apuestas == undefined ||
        objCarreras == null ||
        objCarreras == undefined
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
                <p className="relative -top-8 text-lg font-bold">
                  Facturar ticket
                </p>
                <p
                  id="alerta"
                  className="font-bold text-red-500 text-lg my-2"
                ></p>

                <label htmlFor="txtHipodromo">Hipodromo </label>
                <select
                  name="hipodromoOP"
                  className="rounded-md h-6 my-2"
                  onChange={(e) => setHipodromo(e.target.value)}
                  defaultValue={"selection"}
                >
                  <option value="selection" disabled>
                    Seleccione hipodromo
                  </option>
                  <option>{apuestas.hipodromo}</option>
                </select>

                <label htmlFor="txtNombre">Nombre </label>
                <input
                  type="text"
                  name="nombre"
                  id="txtNombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Nombre del comprador"
                  className="rounded-md p-1 my-2"
                ></input>
                <label htmlFor="txtCedula">Cédula </label>
                <input
                  type="text"
                  name="cedula"
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                  id="txtCedula"
                  placeholder="Cédula del comprador"
                  className="rounded-md p-1 my-2"
                ></input>

                {Object.keys(objCarreras).map((key) => (
                  <div key={key} className="flex flex-col">
                    <label htmlFor={key}>{key.toUpperCase()}</label>
                    <select
                      name={key}
                      id={key}
                      className="rounded-md h-6 my-2"
                      onChange={handleChange}
                      defaultValue={"selection"}
                    >
                      <option value="selection" disabled>
                        Seleccione caballo
                      </option>

                      {objCaballosEnCarrera[key].caballos
                        .filter(
                          (caballo) =>
                            !apuestas.carreras[key].retirados
                              .split(",")
                              .includes(caballo.toString())
                        )
                        .map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                    </select>
                  </div>
                ))}
                <label htmlFor="txtTelf">Teléfono</label>
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
  }
}
