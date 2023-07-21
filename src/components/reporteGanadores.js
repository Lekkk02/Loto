"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());
const Reporte = () => {
  const getApuestas = () => {
    const { data, error, isLoading } = useSWR("/api/apuestas", fetcher);
    return data;
  };

  const getTickets = (id) => {
    const { data, error, isLoading } = useSWR(`/api/tickets/${id}`, fetcher);
    return data;
  };
  const data2 = getApuestas();
  const data = getTickets(data2?._id);

  if (!data) {
    return <h1>Cargando...</h1>;
  }
  if (!data2) {
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

  console.log(
    data.filter((ticket) => {
      return ticket.posicion == "N°1" || ticket.posicion == "N°2";
    })
  );

  const generate = async () => {
    const doc = new jsPDF();
    const tableColumn = ["Carrera", "Primer"];
    const tableRows = [];

    data
      .filter((ticket) => {
        return ticket.posicion == "N°1" || ticket.posicion == "N°2";
      })
      .forEach((ticket) => {
        const carrera = Object.keys(ticket.carreras)[0];
        const primer = ticket.carreras[carrera].primer;
        tableRows.push([carrera, primer]);
      });

    const totalPages = Math.ceil(tableRows.length / 20);

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

    doc.save("tickets.pdf");
    /*  const doc = new jsPDF();

    doc.text("Tickets", 14, 20);

    let y = 30;

    // encabezado
    doc.text("Ticket#", 10, y);
    doc.text("Carrera 6", 50, y);
    doc.text("Carrera 7", 70, y);
    // etc para las otras columnas

    y += 10;

    // filas
    data.forEach((ticket) => {
      doc.text(String(ticket.ticketSerial), 10, y);
      doc.text(String(ticket.carreras.carrera1.primer) || "", 50, y);
      doc.text(String(ticket.carreras.carrera2.primer) || "", 70, y);
      // etc para las otras columnas

      y += 10; // próxima fila
    });

    doc.save("tickets.pdf"); */
  };
  return (
    <>
      <button
        onClick={generate}
        className="text-center text-lg font-bold border border-black bg-green-500 p-2 rounded-md"
      >
        Generar reporte de ganadores
      </button>
    </>
  );
};

export default Reporte;
