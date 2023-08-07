import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Estado = (props) => {
  const { id_ticket } = props;

  const getEstado = () => {
    const { data, error, isLoading } = useSWR(
      `/api/estado/${id_ticket}`,
      fetcher
    );
    return data;
  };

  const getApuestas = (id) => {
    const { data, error, isLoading } = useSWR(`/api/apuestas/${id}`, fetcher);
    return data;
  };
  const getTickets = (id) => {
    const { data, error, isLoading } = useSWR(`/api/reporte/${id}`, fetcher);
    return data;
  };
  const ticketEstado = getEstado();
  const apuestas = getApuestas(ticketEstado?.apuesta);
  const tickets = getTickets(apuestas?._id);

  if (!ticketEstado || !tickets || !apuestas) {
    return <h1 className="text-center p-64 font-bold text-2xl">Cargando...</h1>;
  }

  console.log(apuestas);
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

  console.log(ticketEstado);
  console.log(apuestas);
  console.log(tickets);

  const selected = tickets.find((ticket) => ticket.ticketSerial == id_ticket);
  console.log(selected);
  console.log(selected.apuesta);
  if (selected.posicion != "N°1" && selected.posicion != "N°2") {
    selected.posicion = "TICKET PERDEDOR";
  }

  const dineroTotal = tickets?.length * 2 * 0.6;
  console.log(dineroTotal);
  return (
    <div className="m-8">
      <h1 className="text-center font-medium text-xl">DATOS DEL TICKET</h1>
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
      <p className="font-bold text-lg">
        Puntaje: <span className="text-lg font-normal">{selected.puntos} </span>{" "}
      </p>
      <p className="font-bold text-lg">
        Posición:{" "}
        <span className="text-lg font-normal">{selected.posicion} </span>{" "}
      </p>
      {selected.posicion == "N°1" || selected.posicion == "N°2" ? (
        <p className="font-bold text-lg">
          PREMIO CORRESPONDIDO:{" "}
          <span className="text-lg font-normal">{selected.puntos} </span>{" "}
        </p>
      ) : (
        <p>No aplica</p>
      )}
    </div>
  );

  /*   console.log(
    tickets.filter((ticket) => {
      return ticket.ticketSerial == id_ticket;
    })
  ); */
};

export default Estado;
