import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";
import Imprimir from "@/components/imprimir";
import DatosFactura from "@/components/facturar";

async function getData(id) {
  try {
    await connect();
    const ticket = await ticketsModel.findOne({ ticketSerial: id });

    if (!ticket) {
      return false;
    }

    return ticket;
  } catch (err) {
    return err;
  }
}

export default async function Factura({ params }) {
  const { id } = params;
  const data = await getData(id);
  const cajero = data.cajero;
  const nombre = data.nombre;
  const fecha = data.createdAt;
  const cedula = data.cedula;
  const serial = data.ticketSerial;
  const hipodromo = data.hipodromo;
  const carreras = data.carreras;
  if (!data) {
    return (
      <h1 className="p-64 text-2xl font-bold text-center">
        Serial de ticket inválido
      </h1>
    );
  }

  return (
    <DatosFactura
      cajero={cajero}
      nombre={nombre}
      fecha={fecha}
      cedula={cedula}
      serial={serial}
      hipodromo={hipodromo}
      carreras={carreras}
    />
  );
}
