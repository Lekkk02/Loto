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
    if (!data) return null;
    let header = Object.keys(data[0]);
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderTableData = () => {
    return data?.map((item, index) => {
      const { hipodromo, carreras, status } = item;
      return (
        <tr key={index}>
          <td>{hipodromo}</td>
          <td>{status}</td>
          {Object.keys(carreras).map((key) => (
            <td key={key}>
              <ul>
                <li>N°1: {carreras[key].primero}</li>
                <li>N°2: {carreras[key].segundo}</li>
                <li>N°3: {carreras[key].tercero}</li>
              </ul>
            </td>
          ))}
        </tr>
      );
    });
  };

  return (
    <div>
      <h1>Tabla Dinámica</h1>
      <table id="students">
        <tbody>
          <tr>{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
