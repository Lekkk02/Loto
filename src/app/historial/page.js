import connect from "@/utils/db";
import apuestaModel from "@/models/apuestaModel";
import Listado from "@/components/historial";

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
  const opciones = { year: "2-digit", month: "2-digit", day: "2-digit" };
  let nuevoJSON = {};

  data.forEach((obj, index) => {
    nuevoJSON[index + 1] = {
      _id: obj._id.toString(),
      hipodromo: obj.hipodromo,
      carreras: obj.carreras,
      createdAt: obj.createdAt,
    };
  });
  console.log(nuevoJSON);
  return (
    <>
      <Listado data2={nuevoJSON} />
    </>
  );
}

/* 05/09

Transformar los datos obtenidos de la llamada a la base de datos,
conservar solamente las propiedades importantes y lanzarlas a un nuevo JSON
que pasare como prop al componente del cliente */

/* Crear client component como botón que reciba como props la ID de la apuesta y genere un PDF */
