"use client";
import useSWR from "swr";
import Table from "@/components/tabla";
/* const getData = async () => {
  const data = await fetch("/api/tickets");
  return data.json();
}; */
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const fetcher2 = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const getApuestas = () => {
    const { data, error, isLoading } = useSWR("/api/apuestas", fetcher);
    return data;
  };

  const getTickets = (id) => {
    const { data, error, isLoading } = useSWR(`/api/tickets/${id}`, fetcher);
    return data;
  };
  const data2 = getApuestas();
  console.log(data2);
  const data = getTickets(data2?._id);

  const stat = (data) => {
    if (data == null || data == undefined) {
      return false;
    } else {
      return Object.keys(data).length;
    }
  };

  if (stat(data2) == false) {
    return (
      <div>
        <h1 className="font-bold text-2xl text-center py-64 min-w-[400px] tex">
          Cargando apuesta....
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <div className="text-center mt-4 mb-12">
            <h1 className="text-2xl font-bold ml-4">
              {data2.hipodromo}{" "}
              <span className="ml-2 font-normal">
                {" "}
                {new Date(data2.createdAt).toLocaleDateString().split(",")[0]}
              </span>
            </h1>
            <h1 className="text-2xl font-bold ml-4">
              Pollas jugadas:
              <span className="ml-2 border font-normal rounded-xl px-4 bg-green-500  ">
                {stat(data)} Pollas
              </span>
            </h1>
            {/*               <h1 key={item.createdAt}>{item.carreras.carrera1.primero}</h1>
             */}{" "}
          </div>
          <div></div>
        </div>
        <div className="py-6 text-lg items-center flex flex-col  bg-gray-200 border border-gray-300">
          <h1 className="font-bold">
            Total a repartir:{""}
            <span className="font-light s  ml-2">
              {stat(data) * 2 * 0.6}
              {"$)"}
            </span>
          </h1>
          <h1 className="font-l">Primer lugar:</h1>
          <h1 className="font-medium">Segundo lugar:</h1>
          <hr className="block border-1 border-black w-full"></hr>
          <h1 className="font-bold">Premios por jugador </h1>
          <h1>Primer lugar:</h1>
          <h1>Segundo lugar:</h1>
        </div>

        <div className="mt-12">
          <Table />
        </div>
      </div>
    );
  }
}
