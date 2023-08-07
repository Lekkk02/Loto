import { useEffect, useState } from "react";
import useSWR from "swr";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Estado = (props) => {
  const { id_ticket } = props;
  const [ticketEstado, setEstado] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [apuestas, setApuestas] = useState([]);

  useEffect(() => {
    fetch(`/api/estado/${id_ticket}`)
      .then((response) => response.json())
      .then((data) => {
        setEstado(data);
        fetch(`/api/apuestas/${data.apuesta}`)
          .then((response) => response.json())
          .then((data2) => {
            setApuestas(data2);
            fetch(`/api/tickets/${data2?._id}`)
              .then((response2) => response2.json())
              .then((data3) => {
                setTickets(data3);
              });
          });
      });
  }, []);

  if (!ticketEstado || !tickets || !apuestas) {
    return <h1>Cargando...</h1>;
  }
  console.log(ticketEstado);
  console.log(apuestas);
  console.log(tickets);
};

export default Estado;
