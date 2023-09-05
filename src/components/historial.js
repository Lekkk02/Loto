const Listado = ({ data2 }) => {
  const opciones = { year: "2-digit", month: "2-digit", day: "2-digit" };
  return (
    <>
      <h1 className="text-center font-bold text-4xl m-12">
        Historial de apuestas
      </h1>{" "}
      {data2.map((apuesta) => (
        <>
          <div className="flex justify-end my-2">
            <h1 key={apuesta.hipodromo} className="mx-1 font-bold">
              HIP:{" "}
              <span className="font-bold text-green-700">
                {apuesta.hipodromo}
              </span>
            </h1>
            <h1 key={apuesta.createdAt} className="mx-1 text-lg">
              {apuesta.createdAt.toLocaleDateString("es-VE", opciones)}
            </h1>
            <button className="text-blue-500 ml-auto mr-24">
              Descargar reporte
            </button>
          </div>
          <hr className="border border-black"></hr>
        </>
      ))}{" "}
    </>
  );
};

export default Listado;
