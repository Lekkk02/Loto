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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formState);
  };

  if (!data) return null;

  const { carreras } = data;

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.keys(carreras).map((carrera) => (
          <div key={carrera}>
            <label>{carrera}</label>
            <select
              name="primero"
              onChange={(e) => handleChange(e, carrera)}
              value={formState[carrera]?.primero || ""}
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
            <select
              name="segundo"
              onChange={(e) => handleChange(e, carrera)}
              value={formState[carrera]?.segundo || ""}
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
            <select
              name="tercero"
              onChange={(e) => handleChange(e, carrera)}
              value={formState[carrera]?.tercero || ""}
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
          </div>
        ))}
        <button type="submit">Enviar</button>
      </form>
    </>
  );
};

export default ActComp;
