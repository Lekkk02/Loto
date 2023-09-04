import connect from "@/utils/db";
import apuestaModel from "@/models/apuestaModel";
async function getData() {
  try {
    await connect();
    const apuestas = await apuestaModel.find().sort({ _id: -1 }).limit(7);
    if (!apuestas) {
      return false;
    }
    return apuestas;
  } catch (err) {
    return err;
  }
}

export default async function Factura() {
  const data = await getData();
  console.log(data);
  return (
    <>
      {data.map((apuesta) => (
        <>
          <div className="flex m-2">
            <h1 key={apuesta.hipodromo} className="mx-1">
              {apuesta.hipodromo}
            </h1>
            <h1 key={apuesta.createdAt}>{apuesta.createdAt.toString()}</h1>
            <button>Descargar reporte</button>
          </div>
          <hr className="border border-black"></hr>
        </>
      ))}
    </>
  );
}

/* Crear client component como botón que reciba como props la ID de la apuesta y genere un PDF */
