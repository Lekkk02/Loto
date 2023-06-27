"use client";
import useSWR from "swr";
import ReactTable from "react-table";
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

  const getTickets = () => {
    const { data, error, isLoading } = useSWR("/api/tickets", fetcher);
    return data;
  };
  const data = getTickets();
  const data2 = getApuestas();

  console.log(data);
  console.log(data2);

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
        <h1 className="font-medium text-2xl text-center py-64 min-w-[400px] tex">
          ¡Todavía no se han abierto apuestas!<br></br>Compra tu ticket en tu
          sede más cercana
        </h1>
      </div>
    );
  } else {
    return (
      <div>
        {data2?.map((item) => {
          console.log(Object.keys(item.carreras));
          let keys = Object.keys(item.carreras);
          let asd = keys[0];
          console.log(item.carreras[asd].primero);
          let date = new Date(item.createdAt)
            .toLocaleDateString()
            .split(",")[0];
          return (
            <div>
              <div className="text-center mt-4 mb-12">
                <h1 className="text-2xl font-bold ml-4">
                  {item.hipodromo}{" "}
                  <span className="ml-2 font-normal"> {date}</span>
                </h1>
                <h1 className="text-2xl font-bold ml-4">
                  Pollas jugadas:
                  <span className="ml-2 border font-normal rounded-xl px-4 bg-green-500  ">
                    {stat(data) + 100} Pollas
                  </span>
                </h1>
                {/*               <h1 key={item.createdAt}>{item.carreras.carrera1.primero}</h1>
                 */}{" "}
              </div>
              <div></div>
            </div>
          );
        })}
        <h1 className="pb-96" key={"a"}></h1>
      </div>
    );
  }
}
