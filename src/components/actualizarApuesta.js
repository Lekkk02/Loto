"use client";
import useSWR from "swr";
import { useState, useEffect } from "react";

const ActComp = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading } = useSWR(`/api/apuestas`, fetcher);

  const [formState, setFormState] = useState({});

  useEffect(() => {
    if (data) {
      const { carreras } = data;
      const valoresIniciales = Object.keys(carreras).reduce((acc, carrera) => {
        acc[carrera] = {
          primero: carreras[carrera].primero || "",
          segundo: carreras[carrera].segundo || "",
          tercero: carreras[carrera].tercero || "",
          caballos: carreras[carrera].caballos,
        };
        return acc;
      }, {});
      setFormState(valoresIniciales);
    }
  }, [data]);

  if (isLoading) return <h1>Cargando...</h1>;

  if (error) return <h1>Error </h1>;

  const handleChange = (e, carrera) => {
    setFormState({
      ...formState,
      [carrera]: {
        ...formState[carrera],
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/apuestas", {
        method: "PUT",
        body: JSON.stringify({
          carreras: formState,
        }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompletada = async () => {
    try {
      const res = await fetch("/api/apuestas", {
        method: "PUT",
        body: JSON.stringify({
          terminada: "S",
        }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  if (!data) return null;

  const { carreras } = data;

  return (
    <>
      <h1 className="font-bold text-center m-12 text-2xl">
        ACTUALIZAR CARRERAS
      </h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(carreras).map((carrera) => (
          <div key={carrera} className="flex flex-col">
            <label className="text-center font-bold text-lg m-2">
              Carrera {carrera.substring(7)}
            </label>
            <hr className="m-2 border-black"></hr>
            <label className="text-center">Primer lugar</label>
            <select
              name="primero"
              onChange={(e) => handleChange(e, carrera)}
              value={formState[carrera]?.primero || ""}
              className="text-center"
            >
              <option value="" disabled>
                Seleccione caballo
              </option>
              {carreras[carrera].caballos.map((caballo) => (
                <option key={caballo} value={caballo}>
                  {caballo}
                </option>
              ))}
            </select>
            <label className="text-center">Segundo lugar</label>
            <select
              name="segundo"
              onChange={(e) => handleChange(e, carrera)}
              value={formState[carrera]?.segundo || ""}
              className="text-center"
            >
              <option value="" disabled>
                Seleccione caballo
              </option>
              {carreras[carrera].caballos.map((caballo) => (
                <option key={caballo} value={caballo}>
                  {caballo}
                </option>
              ))}
            </select>
            <label className="text-center">Tercer lugar</label>
            <select
              name="tercero"
              onChange={(e) => handleChange(e, carrera)}
              value={formState[carrera]?.tercero || ""}
              className="text-center"
            >
              <option value="" disabled>
                Seleccione caballo
              </option>
              {carreras[carrera].caballos.map((caballo) => (
                <option key={caballo} value={caballo}>
                  {caballo}
                </option>
              ))}
            </select>
            <hr className="m-2 border-black"></hr>
          </div>
        ))}
        <div className="flex">
          <button
            type="submit"
            className="text-center p-4 font-bold bg-green-500 rounded-md my-8 m-auto hover:bg-green-600"
          >
            ACTUALIZAR CARRERAS
          </button>

          <a
            className="text-center p-4 font-bold cursor-pointer bg-blue-500 rounded-md my-8 m-auto hover:bg-blue-600"
            onClick={handleCompletada}
          >
            MARCAR COMO COMPLETADA
          </a>
        </div>
      </form>
    </>
  );
};

export default ActComp;
