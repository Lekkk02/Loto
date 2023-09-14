import { useState, useEffect } from "react";

const Gaceta = () => {
  const [carreras, setCarreras] = useState({});

  useEffect(() => {
    // Reemplaza esta URL con la URL de tu API
    fetch("/api/apuestas")
      .then((response) => response.json())
      .then((data) => setCarreras(data.carreras));
  }, []);

  const handleChange = (event, carrera, field) => {
    setCarreras({
      ...carreras,
      [carrera]: {
        ...carreras[carrera],
        [field]: event.target.value,
      },
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/apuestas", {
        method: "PUT",
        body: JSON.stringify({
          carreras: carreras,
        }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }

    console.log(carreras);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-center font-bold text-2xl my-12">
        ACTUALIZAR RETIRADOS Y FAV.GACETA
      </h1>
      {Object.keys(carreras).map((carrera) => (
        <div key={carrera} className="flex flex-col my-4 ">
          <label className="text-center font-bold text-lg">
            Carrera {carrera.substring(7)}
          </label>

          <div className="flex justify-center">
            <div className="flex flex-col mx-2 my-4">
              <label className="text-center">Retirados</label>
              <input
                type="text"
                className="p-2 rounded-md"
                value={carreras[carrera].retirados}
                onChange={(event) => handleChange(event, carrera, "retirados")}
              />
            </div>
            <div className="flex flex-col mx-2 my-4">
              <label className="text-center">Fav. Gaceta</label>
              <input
                type="text"
                className="p-2 rounded-md"
                value={carreras[carrera].fav_Gaceta}
                onChange={(event) => handleChange(event, carrera, "fav_Gaceta")}
              />
            </div>
          </div>
          <hr className=" m-4 border-gray-400"></hr>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          type="submit"
          className="font-bold text-lg my-8 mb-14 bg-green-500 rounded-md p-4 cursor-pointer hover:bg-green-600"
        >
          ACTUALIZAR
        </button>
      </div>
    </form>
  );
};

export default Gaceta;
