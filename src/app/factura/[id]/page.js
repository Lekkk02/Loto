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
  const ticket = await getData(id);
  const data = ticket.toJSON();
  if (!data) {
    return (
      <h1 className="p-64 text-2xl font-bold text-center">
        Serial de ticket inválido
      </h1>
    );
  }
  const cajero = data.cajero;
  const nombre = data.nombre;
  const fecha = data.createdAt;
  const cedula = data.cedula;
  const serial = data.ticketSerial;
  const carreras = data.carreras;
  const hipodromo = data.hipodromo;
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
