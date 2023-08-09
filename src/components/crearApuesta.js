"use client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
export default function Home() {
  const [hipodromoInput, setHipodromo] = useState("");
  const [carrerasInput, setCarreras] = useState(null);
  const [caballosInput, setCaballos] = useState(null);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let check = true;
    if (
      hipodromoInput == undefined ||
      hipodromoInput == "" ||
      carrerasInput == undefined ||
      carrerasInput == "" ||
      caballosInput == undefined ||
      caballosInput == ""
    ) {
      check = false;
    }
    if (check) {
      let status;

      let carrerasFiltradas = carrerasInput
        .split(",")
        .filter((element) => element !== "");
      let caballos = caballosInput
        .split(",")
        .filter((element) => element !== "");

      carrerasFiltradas = carrerasFiltradas.filter((item, index) => {
        return carrerasFiltradas.indexOf(item) === index;
      });

      caballos = caballos.filter((item, index) => {
        return caballos.indexOf(item) === index;
      });

      let carreras = {};
      for (let i = 0; i < carrerasFiltradas.length; i++) {
        let carrera = "carrera" + carrerasFiltradas[i];
        carreras[carrera] = {
          primero: "",
          segundo: "",
          tercero: "",
          retirados: "",
        };
      }
      const hipodromo = hipodromoInput;

      try {
        await fetch("/api/apuestas", {
          method: "POST",
          body: JSON.stringify({
            hipodromo,
            carreras,
            caballos,
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
          onSubmit={handleSubmit}
          className="flex flex-col bg-transparent border-2 w-96 shadow-2xl text-center border-black p-16 rounded-lg
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
          ></input>
          <label htmlFor="txtCedula">Carreras</label>
          <input
            type="text"
            name="carreras"
            id="txtCarreras"
            value={carrerasInput == null ? "" : carrerasInput}
            onChange={(e) => setCarreras(e.target.value)}
            placeholder="EJ: 1,2,3,4,5,6,7"
            className="rounded-md p-1 my-2"
            pattern="^\d+(,\d+)*$"
          ></input>
          <label htmlFor="txtCedula">Caballos a participar</label>
          <input
            type="text"
            name="caballos"
            id="txtCaballos"
            value={caballosInput == null ? "" : caballosInput}
            onChange={(e) => setCaballos(e.target.value)}
            placeholder="EJ: 1,2,3,4,5,6,7"
            className="rounded-md p-1 my-2"
            pattern="^([a-zA-Z0-9]+,)*[a-zA-Z0-9]+$"
          ></input>

          <button className="cursor-pointer" type="submit" name="button">
            Crear Apuesta
          </button>
        </form>
      </div>
    </main>
  );
}
