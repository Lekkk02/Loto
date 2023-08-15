"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

const Table = () => {
  const [recordsToShow, setRecordsToShow] = useState(10);
  const [buscado, setBuscado] = useState("");
  const getApuestas = () => {
    return data;
  };
  const {
    data: data2,
    error: errorApuesta,
    isLoading: cargandoApuesta,
  } = useSWR("/api/apuestas", fetcher);

  const { data, error, isLoading } = useSWR(
    data2 ? `/api/tickets/${data2?._id}` : null,
    fetcher
  );
  const renderTableHeader = () => {
    if (!data) return null;
    let header = Object.keys(data2.carreras);
    return (
      <tr className="border border-black" key="headerListado">
        <th className="border border-black text-lg " key="PosHeader">
          Pos°
        </th>
        <th className="border border-black text-lg  " key="TicketHeader">
          Ticket
        </th>
        <th className="" key="CaballosHeader"></th>
        {header.map((key, index) => {
          return (
            <th
              key={"header" + key + index}
              className="border border-black text-lg "
            >
              {key[0].toUpperCase() + key.substring(7)}
            </th>
          );
        })}
        <th className="text-lg" key="PuntosHeader">
          Puntos
        </th>
      </tr>
    );
  };

  const renderTableData = (id) => {
    Object.keys(data2?.carreras).map((apuesta, index) => {
      let primerLugar = data2?.carreras[apuesta].primero;
      let segundoLugar = data2?.carreras[apuesta].segundo;
      let tercerLugar = data2?.carreras[apuesta].tercero;
      data?.map((ticket) => {
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
    data?.sort((a, b) => {
      if (a.puntos > b.puntos) {
        return -1;
      }
      if (a.puntos < b.puntos) {
        return 1;
      }
      return 0;
    });

    for (var i = 0; i < data?.length; i++) {
      if (i == 0) {
        data[i].posicion = "N°1";
      } else if (i == 1 && data[i].puntos == data[i - 1].puntos) {
        data[i].posicion = "N°1";
      } else if (i == 1 && data[i].puntos != data[i - 1].puntos) {
        data[i].posicion = "N°2";
      } else if (i > 1 && data[i].puntos == data[i - 1].puntos) {
        data[i].posicion = data[i - 1].posicion;
      } else if (i > 1 && data[i].puntos != data[i - 1].puntos) {
        if (data[i - 1].posicion == "N°1") {
          data[i].posicion = "N°2";
        } else {
          data[i].posicion = "";
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
    const records = data?.slice(0, recordsToShow);
    if (buscado == null || buscado == undefined || buscado == "") {
      return records?.map((item, index) => {
        const carrerasArray = Object.entries(item.carreras);
        carrerasArray.sort((a, b) => {
          const aNumber = parseInt(a[0].replace("carrera", ""));
          const bNumber = parseInt(b[0].replace("carrera", ""));
          return aNumber - bNumber;
        });
        const carrerasOrdenadas = Object.fromEntries(carrerasArray);
        if (
          (item.posicion == "N°2" && item.puntos == 0) ||
          (item.posicion == "N°1" && item.puntos == 0)
        ) {
          item.posicion = "";
        }
        return (
          <tr key={"record" + item.ticketSerial + index}>
            {getPos(item, index) == "N°1" ? (
              <td
                key={item.posicion + index + "POSICION"}
                className="border-b border-black bg-yellow-500 font-bold"
              >
                {getPos(item, index)}
              </td>
            ) : getPos(item, index) == "N°2" ? (
              <td
                key={item.posicion + index + "POSICION"}
                className="border-b border-black bg-blue-500 font-bold"
              >
                {getPos(item, index)}
              </td>
            ) : (
              <td
                key={item.posicion + index + "POSICION"}
                className="border-b border-black"
              >
                {getPos(item, index)}
              </td>
            )}
            <td
              key={item.ticketSerial + index}
              className="border-b border-black"
            >
              {item.ticketSerial}
            </td>
            <td
              key={`Caballo${index}` + index}
              className="border-b border-black"
            >
              CABALLO:
            </td>
            {Object.keys(carrerasOrdenadas).map((i, contadore) => {
              return (
                <td
                  className="border-b border-black"
                  key={i + index + contadore}
                >
                  {carrerasOrdenadas[i].primer}
                </td>
              );
            })}
            <td
              key={`puntos${index}` + "POSI"}
              className="border-b border-black"
            >
              {item.puntos}
            </td>
          </tr>
        );
      });
    } else {
      return data
        ?.filter((element) => element.ticketSerial == id)
        .map((item, index) => {
          const carrerasArray = Object.entries(item.carreras);
          carrerasArray.sort((a, b) => {
            const aNumber = parseInt(a[0].replace("carrera", ""));
            const bNumber = parseInt(b[0].replace("carrera", ""));
            return aNumber - bNumber;
          });
          const carrerasOrdenadas = Object.fromEntries(carrerasArray);
          if (
            (item.posicion == "N°2" && item.puntos == 0) ||
            (item.posicion == "N°1" && item.puntos == 0)
          ) {
            item.posicion = "";
          }
          return (
            <>
              <tr key={index + "ALL"}>
                {getPos(item, index) == "N°1" ? (
                  <td
                    key={item.posicion + index + "POSICION"}
                    className="border-b border-black bg-yellow-500 font-bold"
                  >
                    {getPos(item, index)}
                  </td>
                ) : getPos(item, index) == "N°2" ? (
                  <td
                    key={item.posicion + index + "POSICION"}
                    className="border-b border-black bg-blue-500 font-bold"
                  >
                    {getPos(item, index)}
                  </td>
                ) : (
                  <td
                    key={item.posicion + index + "POSICION"}
                    className="border-b border-black"
                  >
                    {getPos(item, index)}
                  </td>
                )}
                <td
                  key={item.ticketSerial + index}
                  className="border-b border-black"
                >
                  {item.ticketSerial}
                </td>
                <td
                  key={`Caballo${index}` + "CAB"}
                  className="border-b border-black"
                >
                  CABALLO:
                </td>
                {Object.keys(carrerasOrdenadas).map((i, contadore) => {
                  return (
                    <td
                      className="border-b border-black"
                      key={i + index + contadore}
                    >
                      {carrerasOrdenadas[i].primer}
                    </td>
                  );
                })}
                <td
                  key={`puntos${item + index}`}
                  className="border-b border-black"
                >
                  {item.puntos}
                </td>
              </tr>
            </>
          );
        });
    }
  };

  if (!data2 || !data) {
    return (
      <h2 className="text-center font-bold text-2xl py-64">Cargando...</h2>
    );
  }
  return (
    <div className="text-center my-14">
      <hr></hr>

      <h1 className="font-medium text-xl mb-2">¡Busca tu ticket!</h1>
      <form className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Serial del ticket"
          value={buscado}
          onChange={(e) => setBuscado(e.target.value)}
          className=" border border-black rounded-md p-1 text-center w-1/3"
        ></input>
      </form>

      <hr className="my-4"></hr>
      <h1 className="font-medium text-2xl mt-8">Listado de tickets</h1>
      <table id="students" className="w-full" key="ticketTable">
        <tbody>
          {renderTableHeader()}
          {renderTableData(buscado)}
        </tbody>
      </table>
      {recordsToShow < data?.length && (
        <button
          className="rounded-lg bg-green-500 w-24 h-10 my-4"
          onClick={() => setRecordsToShow(recordsToShow + 10)}
        >
          Cargar más
        </button>
      )}
    </div>
  );
};

export default Table;
