"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

const Table = () => {
  const getApuestas = () => {
    const { data, error, isLoading } = useSWR("/api/apuestas", fetcher);
    return data;
  };

  const getTickets = () => {
    const { data, error, isLoading } = useSWR("/api/tickets", fetcher);
    return data;
  };
  const data = getTickets();
  const data2 = getApuestas();

  /* const [data, setData] = useState([
    {
      nombre: "Juan",
      apellido: "Pérez",
      edad: {
        item1: { campo1: "20", campo2: "30", campo3: "40" },
        item2: { campo1: "25", campo2: "35", campo3: "45" },
      },
    },
    {
      nombre: "María",
      apellido: "González",
      edad: {
        item1: { campo1: "30", campo2: "40", campo3: "50" },
        item2: { campo1: "35", campo2: "45", campo3: "55" },
      },
    },
  ]);
 */

  const renderTableHeader = () => {
    if (!data) return null;
    let header = Object.keys(data[0].carreras);
    return (
      <>
        <th className="border border-black">Pos°</th>
        <th className="border border-black">Ticket</th>

        {header.map((key, index) => {
          return (
            <th key={index} className="border border-black">
              {key[0] + key[key.length - 1]}
            </th>
          );
        })}
        <th>Puntos</th>
      </>
    );
  };

  const renderTableData = () => {
    console.log(data2);
    console.log(data);
    Object.keys(data2?.carreras).map((apuesta, index) => {
      data?.map((ticket) => {
        const { carreras } = ticket;
        Object.keys(carreras).map((carrera) => {
          if (
            ticket.carreras[carrera].primer.valueOf() ==
            data2?.carreras[apuesta].primero.valueOf()
          ) {
            console.log("Primera carrera acertada por: ", ticket.nombre);
            ticket["puntos"] += 5;
            return;
          } else if (
            ticket.carreras[carrera].primer.valueOf() ==
            data2?.carreras[apuesta].segundo.valueOf()
          ) {
            console.log("Segunda carrera acertada");
            ticket["puntos"] += 3;
            return;
          } else if (
            ticket.carreras[carrera].primer.valueOf() ==
            data2?.carreras[apuesta].tercero.valueOf()
          ) {
            console.log("Tercera carrera acertada");
            ticket["puntos"] += 1;
            return;
          }
        });
      });
    });
    return data?.map((item, index) => {
      console.log(data);
      return (
        <>
          <tr>
            <td key={item.nombre}>{item.nombre}</td>
            <td key={item.puntos}>{item.puntos}</td>{" "}
          </tr>
          {/*  {Object.keys(carreras).map((key) => (
            <tr key={index}>
              <td className="border border-black text-lg">
                Carrera {key.substring(7)}
              </td>
              <td className="border border-black text-lg">
                {carreras[key].retirados}
              </td>
              <td className="border border-black text-lg">
                {carreras[key].favGaceta}
              </td>
              <td key={key} className="border border-black">
                <p className="font-bold">
                  N°1:{" "}
                  <span className="font-light">{carreras[key].primero}</span>
                </p>
                <p className="font-bold">
                  N°2:
                  <span className="font-light"> {carreras[key].segundo} </span>
                </p>
                <p className="font-bold">
                  N°3:{" "}
                  <span className="font-light"> {carreras[key].tercero}</span>
                </p>
              </td>
            </tr>
          ))} */}
        </>
      );
    });
  };

  if (data2 == undefined || data2 == null) {
    return (
      <h1 className="text-center font-bold text-2xl py-64">Cargando...</h1>
    );
  } else {
    return (
      <div className="text-center">
        <h1 className="font-medium text-2xl">Estado de las carreras</h1>
        <table id="students" className="w-full">
          <tbody>
            <tr className="border border-black">{renderTableHeader()}</tr>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
};

export default Table;
