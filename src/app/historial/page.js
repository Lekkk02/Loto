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
  return (
    <>
      <Listado data2={data} />
    </>
  );
}

/* Crear client component como botón que reciba como props la ID de la apuesta y genere un PDF */
