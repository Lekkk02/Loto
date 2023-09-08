import useSWR from "swr";
import { useSession } from "next-auth/react";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Estado = (props) => {
  const { data: session, status: status } = useSession();
  let cajero;
  if (session) cajero = session.user?.username;

  const { id_ticket } = props;

  const {
    data: ticketEstado,
    error: errorEstado,
    isLoading: cargandoEstado,
  } = useSWR(`/api/estado/${id_ticket}`, fetcher);

  const {
    data: apuestas,
    error: errorApuesta,
    isLoading: cargandoApuesta,
  } = useSWR(
    ticketEstado ? `/api/apuestas/${ticketEstado?.apuesta}` : null,
    fetcher
  );

  const {
    data: tickets,
    error: errorTickets,
    isLoading: cargandoTickets,
  } = useSWR(apuestas ? `/api/reporte/${apuestas?._id}` : null, fetcher);

  if (cargandoEstado || cargandoApuesta || cargandoTickets) {
    return <h1 className="text-center p-64 font-bold text-2xl">Cargando...</h1>;
  }

  if (!ticketEstado) {
    return (
      <>
        {" "}
        <h1 className="text-center pt-64 font-bold text-2xl">
          Serial de ticket inválido
        </h1>
        <p className="pb-64 text-center text-blue-500 underline">
          <span>
            <a href="/estado">
              {" "}
              Haz click aquí para volver a la página de verificar t
            </a>
            ickets
          </span>
        </p>
      </>
    );
  }

  Object.keys(apuestas?.carreras).map((apuesta, index) => {
    let primerLugar = apuestas?.carreras[apuesta].primero;
    let segundoLugar = apuestas?.carreras[apuesta].segundo;
    let tercerLugar = apuestas?.carreras[apuesta].tercero;
    tickets?.map((ticket) => {
      if (
        ticket.carreras[apuesta].primer == primerLugar &&
        !ticket.carreras[apuesta].addedPoints
      ) {
        ticket["puntos"] += 5;
        ticket.carreras[apuesta].addedPoints = true;
      } else if (
        ticket.carreras[apuesta].primer == segundoLugar &&
        !ticket.carreras[apuesta].addedPoints
      ) {
        ticket["puntos"] += 3;
        ticket.carreras[apuesta].addedPoints = true;
      } else if (
        ticket.carreras[apuesta].primer == tercerLugar &&
        !ticket.carreras[apuesta].addedPoints
      ) {
        ticket["puntos"] += 1;
        ticket.carreras[apuesta].addedPoints = true;
      }
    });
  });

  tickets?.sort((a, b) => {
    if (a.puntos > b.puntos) {
      return -1;
    }
    if (a.puntos < b.puntos) {
      return 1;
    }
    return 0;
  });

  for (var i = 0; i < tickets?.length; i++) {
    if (i == 0) {
      tickets[i].posicion = "N°1";
    } else if (i == 1 && tickets[i].puntos == tickets[i - 1].puntos) {
      tickets[i].posicion = "N°1";
    } else if (i == 1 && tickets[i].puntos != tickets[i - 1].puntos) {
      tickets[i].posicion = "N°2";
    } else if (i > 1 && tickets[i].puntos == tickets[i - 1].puntos) {
      tickets[i].posicion = tickets[i - 1].posicion;
    } else if (i > 1 && tickets[i].puntos != tickets[i - 1].puntos) {
      if (tickets[i - 1].posicion == "N°1") {
        tickets[i].posicion = "N°2";
      } else {
        tickets[i].posicion = "";
      }
    }
  }
  const getPos = (item, index) => {
    if (item.posicion != "N°1" && item.posicion != "N°2") {
      return index;
    } else {
      return item.posicion;
    }
  };

  /*   console.log(
    tickets.filter((ticket) => {
      return ticket.posicion == "N°1" || ticket.posicion == "N°2";
    })
  ); */

  const selected = tickets.find((ticket) => ticket.ticketSerial == id_ticket);
  if (selected.posicion != "N°1" && selected.posicion != "N°2") {
    selected.posicion = "TICKET PERDEDOR";
  }

  if (selected.puntos == 0) {
    selected.posicion = "TICKET PERDEDOR";
  }

  const dineroTotal = tickets?.length * 2 * 0.6;
  const dineroPrimerLugar = dineroTotal * 0.7;
  const dineroSegundoLugar = dineroTotal * 0.3;
  const totalPrimer = tickets.filter((ticket) => {
    return ticket.posicion == "N°1";
  }).length;
  const totalSegundo = tickets.filter((ticket) => {
    return ticket.posicion == "N°2";
  }).length;

  const primerLugar_Ganador = (dineroPrimerLugar / totalPrimer).toFixed(2);
  const segundoLugar_Ganador = (dineroSegundoLugar / totalSegundo).toFixed(2);

  const handleClick = async () => {
    const ticketSerial = selected.ticketSerial;
    try {
      const res = await fetch(`/api/estado/${ticketSerial}`, {
        method: "PUT",
        body: JSON.stringify({
          reclamado: "SI",
          cobrado_por: cajero,
        }),
      });
      if (res.ok) {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(selected);
  if (apuestas.status == "ACTIVE") {
    return (
      <div className="m-8">
        <h1 className="text-center font-medium text-xl my-3">
          DATOS DEL TICKET
        </h1>
        <p className="font-bold text-lg ">
          Fecha de compra:{" "}
          <span className="text-lg font-normal">
            {selected.createdAt.substring(0, 10) +
              " | " +
              selected.createdAt.substring(11, 19)}
          </span>
        </p>
        <p className="font-bold text-lg ">
          Serial:{" "}
          <span className="text-lg font-normal">{selected.ticketSerial} </span>{" "}
        </p>
        <p className="font-bold text-lg">
          Nombre del comprador:{" "}
          <span className="text-lg font-normal">{selected.nombre} </span>{" "}
        </p>
        <p className="font-bold text-lg">
          Cédula del comprador:{" "}
          <span className="text-lg font-normal">{selected.cedula} </span>{" "}
        </p>
        <p className="font-bold text-lg">
          Telefono del comprador:{" "}
          <span className="text-lg font-normal">{selected.telefono} </span>{" "}
        </p>
        <p className="text-center font-medium text-base my-3">
          CABALLOS APOSTADOS
        </p>
        <hr className="border-gray-400 my-1"></hr>
        <div>
          {Object.keys(selected.carreras).map((carrera) => (
            <h1 className="m-2 font-bold">
              Carrera {carrera.substring(7)}:{" "}
              <span className="font-normal">
                Caballo {selected.carreras[carrera].primer}
              </span>
            </h1>
          ))}
        </div>
        <hr className="border-gray-400 my-1"></hr>

        <h1 className="mt-8 font-bold text-2xl text-center text-red-700">
          LA APUESTA SIGUE ACTIVA
        </h1>
      </div>
    );
  }
  return (
    <div className="m-8">
      <h1 className="text-center font-medium text-xl my-3">DATOS DEL TICKET</h1>
      <p className="font-bold text-lg ">
        Fecha de compra:{" "}
        <span className="text-lg font-normal">
          {selected.createdAt.substring(0, 10) +
            " | " +
            selected.createdAt.substring(11, 19)}
        </span>
      </p>
      <p className="font-bold text-lg ">
        Serial:{" "}
        <span className="text-lg font-normal">{selected.ticketSerial} </span>{" "}
      </p>
      <p className="font-bold text-lg">
        Nombre del comprador:{" "}
        <span className="text-lg font-normal">{selected.nombre} </span>{" "}
      </p>
      <p className="font-bold text-lg">
        Cédula del comprador:{" "}
        <span className="text-lg font-normal">{selected.cedula} </span>{" "}
      </p>
      <p className="font-bold text-lg">
        Telefono del comprador:{" "}
        <span className="text-lg font-normal">{selected.telefono} </span>{" "}
      </p>
      <p className="text-center font-medium text-base my-3">
        CABALLOS APOSTADOS
      </p>
      <hr className="border-gray-400 my-1"></hr>
      <div>
        {Object.keys(selected.carreras).map((carrera) => (
          <h1 className="m-2 font-bold">
            Carrera {carrera.substring(7)}:{" "}
            <span className="font-normal">
              Caballo {selected.carreras[carrera].primer}
            </span>
          </h1>
        ))}
      </div>
      <hr className="border-gray-400 my-1"></hr>

      {apuestas.terminada !== "N" ? (
        <>
          <p className="text-center font-medium text-base my-3">
            ESTADO DEL TICKET
          </p>
          <p className="font-bold text-lg">
            Hipodromo:{" "}
            <span className="text-lg font-normal">{selected.hipodromo} </span>{" "}
          </p>
          <p className="font-bold text-lg">
            Pollas totales de la apuesta:{" "}
            <span className="text-lg font-normal">{tickets.length} </span>{" "}
          </p>
          <p className="font-bold text-lg">
            Puntaje:{" "}
            <span className="text-lg font-normal">{selected.puntos} </span>{" "}
          </p>
          {selected.posicion != "N°1" && selected.posicion != "N°2" ? (
            <p className="font-bold text-lg">
              Estado:
              <span className="text-lg font-normal"> TICKET PERDEDOR</span>{" "}
            </p>
          ) : selected.posicion == "N°1" ? (
            <>
              <p className="font-bold text-lg">
                Estado:
                <span className="text-lg font-normal">
                  {" "}
                  TICKET GANADOR
                </span>{" "}
              </p>
              <p className="font-bold text-lg">
                Posición:{" "}
                <span className="text-lg font-normal">{selected.posicion}</span>{" "}
              </p>
              <p className="font-bold text-lg">
                PREMIO CORRESPONDIDO:{" "}
                <span className="text-lg font-normal">
                  {primerLugar_Ganador}${" "}
                </span>{" "}
              </p>
              {selected.reclamado != "NO" ? (
                <>
                  <p className="font-bold text-2xl my-2 text-center text-green-700">
                    TICKET COBRADO
                  </p>
                  <p className="font-bold text-lg my-2 text-center text-green-700">
                    PROCESADO POR CAJERO:{" "}
                    <span className="text-lg font-normal text-black">
                      {selected.cobrado_por}
                    </span>{" "}
                  </p>{" "}
                </>
              ) : (
                <div className="flex flex-col my-6">
                  <button
                    className="  bg-green-500 p-2 font-bold text-2xl rounded-2xl  hover:bg-green-600"
                    onClick={handleClick}
                  >
                    MARCAR COMO COBRADO
                  </button>
                </div>
              )}
            </>
          ) : selected.posicion == "N°2" ? (
            <>
              <p className="font-bold text-lg">
                Estado:
                <span className="text-lg font-normal">
                  {" "}
                  TICKET GANADOR
                </span>{" "}
              </p>
              <p className="font-bold text-lg">
                Posición:{" "}
                <span className="text-lg font-normal">{selected.posicion}</span>{" "}
              </p>
              <p className="font-bold text-lg">
                PREMIO CORRESPONDIDO:{" "}
                <span className="text-lg font-normal">
                  {segundoLugar_Ganador}${" "}
                </span>{" "}
              </p>
              {selected.reclamado != "NO" ? (
                <>
                  <p className="font-bold text-2xl my-2 text-center text-green-600">
                    TICKET COBRADO
                  </p>
                  <p className="font-bold text-lg my-2 text-center text-green-600">
                    PROCESADO POR CAJERO:{" "}
                    <span className="text-lg font-normal text-black">
                      {selected.cobrado_por}
                    </span>
                    {+" "}
                  </p>{" "}
                </>
              ) : (
                <div className="flex flex-col my-6">
                  <button
                    className="  bg-green-500 p-2 font-bold text-2xl rounded-2xl  hover:bg-green-600"
                    onClick={handleClick}
                  >
                    MARCAR COMO COBRADO
                  </button>
                </div>
              )}
            </>
          ) : null}{" "}
        </>
      ) : (
        <h1 className="text-lg font-medium text-red-900">
          LAS CARRERAS SIGUEN EN CURSO, REVISAR NUEVAMENTE AL TERMINAR TODAS LAS
          CARRERAS
        </h1>
      )}

      <hr className="border-gray-300 my-1"></hr>
    </div>
  );

  /*   console.log(
    tickets.filter((ticket) => {
      return ticket.ticketSerial == id_ticket;
    })
  ); */
};

export default Estado;
