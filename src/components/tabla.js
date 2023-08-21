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

  const renderTableHeader = () => {
    return (
      <>
        <th key="headerApuestaCarrera">Carrera</th>
        <th key="headerApuestaRetirados">Retirados</th>
        <th key="headerApuestaFav">Fav. Gaceta</th>
        <th key="headerApuestaLlegada">Llegada</th>
      </>
    );
  };

  const renderTableData = () => {
    const { hipodromo, carreras, status } = data;
    return (
      <>
        {Object.keys(carreras).map((key, index) => (
          <tr key={data.hipodromo + index}>
            <td className="border border-black text-lg" key={key}>
              Carrera {key.substring(7)}
            </td>
            <td
              className="border border-black text-lg"
              key={key + "retirados" + index}
            >
              {carreras[key].retirados}
            </td>
            <td
              className="border border-black text-lg"
              key={key + "favGaceta" + index}
            >
              {carreras[key].favGaceta}
            </td>
            <td key={"llegada" + index} className="border border-black">
              <p className="font-bold" key={"Num1" + index}>
                N°1:{" "}
                <span className="font-light" key={"Span1" + index}>
                  {carreras[key].primero}
                </span>
              </p>
              <p className="font-bold" key={"Num2" + index}>
                N°2:{" "}
                <span className="font-light " key={"Span2" + index}>
                  {carreras[key].segundo}
                </span>
              </p>
              <p className="font-bold" key={"Num3" + index}>
                N°3:{" "}
                <span className="font-light " key={"Span3" + index}>
                  {carreras[key].tercero}
                </span>
              </p>
            </td>
          </tr>
        ))}
      </>
    );
  };

  return (
    <div className="text-center">
      <h1 className="font-medium text-2xl">Estado de las carreras</h1>
      <table id="students" className="w-full">
        <tbody>
          <tr key="header">{renderTableHeader()}</tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
