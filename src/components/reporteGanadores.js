"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());
const Reporte = () => {
  const {
    data: data2,
    error: errorApuesta,
    isLoading: cargandoApuesta,
  } = useSWR("/api/apuestas", fetcher);

  const { data, error, isLoading } = useSWR(
    data2 ? `/api/reporte/${data2?._id}` : null,
    fetcher
  );

  if (cargandoApuesta || isLoading) {
    return <h1>Cargando...</h1>;
  }

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

  const generate = async () => {
    const doc = new jsPDF();
    const tableColumn = ["Posicion", "Serial", "Cedula", "Telefono"];
    const tableRows = [];

    data
      .filter((ticket) => {
        return (
          (ticket.posicion == "N°1" && ticket.puntos != 0) ||
          (ticket.posicion == "N°2" && ticket.puntos != 0)
        );
      })
      .forEach((ticket) => {
        const posicion = ticket.posicion;
        const serial = ticket.ticketSerial;
        const cedula = ticket.cedula;
        const telefono = ticket.telefono;
        tableRows.push([posicion, serial, cedula, telefono]);
      });

    const totalPages = Math.ceil(tableRows.length / 20);
    const dineroTotal = data?.length * 2 * 0.6;
    const dineroPrimerLugar = dineroTotal * 0.7;
    const dineroSegundoLugar = dineroTotal * 0.3;
    const fecha = data2.createdAt.substring(0, 10);
    const hora = data2.createdAt.substring(11, 19);
    doc.text(
      `Fecha: ${fecha} | ${hora}\nHipodromo: ${
        data2.hipodromo
      }\nPollas totales vendidas: ${
        data.length
      }\nDinero total a repartir ${dineroTotal.toFixed(
        2
      )}$\nDinero total primer lugar: ${dineroPrimerLugar.toFixed(
        2
      )}$\nDinero total segundo lugar: ${dineroSegundoLugar.toFixed(2)}$`,
      10,
      10
    );

    for (let i = 1; i <= totalPages; i++) {
      doc.addPage();
      doc.autoTable(tableColumn, tableRows.slice((i - 1) * 20, i * 20), {
        startY: 20,
      });
      doc.text(
        `Página ${i} de ${totalPages}`,
        14,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`Reporte_Apuesta_${fecha}.pdf`);
  };
  return (
    <>
      {data2.terminada !== "N" ? (
        <button
          onClick={generate}
          className="text-center text-lg font-bold border border-black bg-green-500 p-2 rounded-md"
        >
          Generar reporte de ganadores
        </button>
      ) : (
        <h1 className="text-center font-bold text-2xl">
          EL REPORTE ESTARÁ DISPONIBLE CUANDO TERMINEN LAS CARRERAS
        </h1>
      )}
    </>
  );
};

export default Reporte;
