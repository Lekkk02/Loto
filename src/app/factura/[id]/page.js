import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";
import Imprimir from "@/components/imprimir";

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
  if (!data) {
    return (
      <h1 className="p-64 text-2xl font-bold text-center">
        Serial de ticket inválido
      </h1>
    );
  }

  /*  doc.text(`${cajero}`, 5, 10);
  doc.text(`${formatDate(today)} - ${hours}`, 5, 17);
  doc.text(`CI: ${cedula}`, 5, 24);
  doc.text(`Nombre:${nombre}`, 5, 31);
  doc.text(`SERIAL: ${respuesta}`, 5, 38);
  doc.text(`-------------------------------`, 5, 45);
  doc.text(`POLLA X PUNTOS`, 5, 52);
  doc.text(`-------------------------------`, 5, 59);
  doc.text(`HIP: ${apuestas.hipodromo}`, 5, 66);
  doc.text("-------------------------------", 5, 73);
 */
  const ticket = data.toJSON();
  console.log(ticket);

  const date = ticket.createdAt;
  function formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().substr(-2);
    return `${day}/${month}/${year}`;
  }
  const hours = date.toLocaleTimeString("en-US", {
    hour12: true,
    timeZone: "UTC",
  });
  const { carreras } = ticket;
  console.log(carreras.carrera1);
  return (
    <div className="font-sans font-normal mt-2 ml-2">
      <p>{ticket.cajero}</p>
      <p>{formatDate(date) + " - " + hours}</p>
      <p>CI: {ticket.cedula}</p>
      <p>NOMBRE: {ticket.nombre}</p>
      <p>SERIAL: {ticket.ticketSerial}</p>
      <p>-------------------------------</p>
      <p> POLLA X PUNTOS</p>
      <p>-------------------------------</p>
      <p>HIP: {ticket.hipodromo}</p>
      <p>-------------------------------</p>
      {Object.keys(carreras).map((carrera) => (
        <p>
          Carr.{carrera.substring(7)} - Caballo {carreras[carrera].primer}
        </p>
      ))}
      <p>-------------------------------</p>
      <p>VALOR POLLA: 2$</p>
      <Imprimir />
    </div>
  );
}
