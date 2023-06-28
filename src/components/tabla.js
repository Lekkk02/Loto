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
  const data2 = getTickets();
  const data = getApuestas();

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
    /*     if (!data) return null;
    let header = Object.keys(data[0].carreras);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    }); */
    return (
      <>
        <th>Carrera</th>
        <th>Retirados</th>
        <th>Fav. Gaceta</th>
        <th>Llegada</th>{" "}
      </>
    );
  };

  const renderTableData = () => {
    return data?.map((item, index) => {
      const { hipodromo, carreras, status } = item;
      return (
        <>
          {Object.keys(carreras).map((key) => (
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
          ))}
        </>
      );
    });
  };

  return (
    <div className="text-center">
      <h1 className="font-medium text-2xl">Estado de las carreras</h1>
      <table id="students" className="w-full">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
