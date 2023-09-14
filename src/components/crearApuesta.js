"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

function FormularioCarrera() {
  const [bcarreras, setCarreras] = useState([]);
  const [hipodromoInput, setHipodromo] = useState("");
  const router = useRouter();

  const agregarCarrera = () => {
    setCarreras([...bcarreras, { id: "", caballos: "" }]);
  };

  const handleIdChange = (e, index) => {
    const carrerasActualizadas = [...bcarreras];
    carrerasActualizadas[index].id = e.target.value;
    setCarreras(carrerasActualizadas);
  };

  const handleCaballosChange = (e, index) => {
    const carrerasActualizadas = [...bcarreras];
    carrerasActualizadas[index].caballos = e.target.value;
    setCarreras(carrerasActualizadas);
  };

  const enviarFormulario = async (ev) => {
    ev.preventDefault();

    const data = {};
    let caballos = [];
    bcarreras.forEach((carrera) => {
      const caballosT = carrera.caballos
        .split(",")
        .map((caballo) => caballo.trim())
        .filter(
          (caballo, i, arr) => caballo !== "" && arr.indexOf(caballo) === i
        );
      caballos = caballosT;
      data[`carrera${carrera.id}`] = {
        primero: "",
        segundo: "",
        tercero: "",
        retirados: "",
        fav_Gaceta: "",
        caballos: caballos,
      };
    });
    let status;
    const carreras = data;
    let check = false;

    if (bcarreras.length > 0) {
      check = true;
    }
    if (check) {
      try {
        await fetch("/api/apuestas", {
          method: "POST",
          body: JSON.stringify({
            hipodromo: hipodromoInput,
            carreras: data,
            status,
          }),
        });
      } catch (err) {
        console.log(err);
      }
      router.push("/");
    }
  };

  return (
    <main>
      <div className="flex flex-col items-center p-56">
        <form
          onSubmit={enviarFormulario}
          className="flex flex-col bg-transparent border-2 w-[500px] shadow-2xl text-center border-black p-16 rounded-lg
        "
        >
          <p className="relative -top-10 text-lg font-bold ">Abrir apuesta</p>
          <label htmlFor="txtCedula">Hipódromo </label>
          <input
            type="text"
            name="hipodromo"
            id="txtHipodromo"
            value={hipodromoInput == null ? "" : hipodromoInput}
            onChange={(e) => setHipodromo(e.target.value)}
            placeholder="Hipódromo de las carreras"
            className="rounded-md p-1 my-2"
            required
          ></input>

          {bcarreras.map((carrera, index) => (
            <div key={index} className="flex flex-row my-2">
              <input
                type="text"
                placeholder="N° carrera"
                className="w-1/2 mx-1 h-8 rounded-md "
                value={carrera.id}
                title="No ingrese espacios en el campo"
                pattern="^[^ ]*$"
                required
                onChange={(e) => handleIdChange(e, index)}
              />
              <input
                type="text"
                placeholder="Caballos - EJ:1,2,3,4,5,6,7,8,9"
                className="w-full mx-1 h-8 rounded-md"
                value={carrera.caballos}
                title="No ingrese espacios en el campo"
                pattern="^[^ ]*$"
                required
                onChange={(e) => handleCaballosChange(e, index)}
              />
            </div>
          ))}
          <button
            onClick={agregarCarrera}
            type="button"
            className="font-bold bg-blue-500 rounded-lg p-1 mt-4 mb-6"
          >
            Agregar Carrera
          </button>
          <button
            type="submit"
            className="m-4 justify-center bg-green-500 rounded-lg font-bold p-1"
          >
            Crear Apuesta
          </button>
        </form>
      </div>
    </main>
  );
}

export default FormularioCarrera;
