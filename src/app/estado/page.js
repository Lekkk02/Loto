"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { data: session, status: status } = useSession();
  const [buscado, setBuscado] = useState("");
  const router = useRouter();
  if (!session) {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }
  const onSubmit = (ev) => {
    ev.preventDefault();
    router.push(`/estado/${buscado}`);
  };
  if (session) {
    if (status == "authenticated") {
      return (
        <div className="p-12 m-4">
          <h1 className="text-center font-medium text-xl my-3">
            Estado de tickets
          </h1>
          <p className="m-2 text-center">
            Verificar estado del ticket y si es ganador marcarlo como cobrado
            cuando el comprador quiera retirar el dinero.
          </p>
          <form className="flex flex-col items-center " onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Serial del ticket"
              value={buscado}
              onChange={(e) => setBuscado(e.target.value)}
              className=" border border-black rounded-md p-1 text-center w-1/3"
            ></input>
            <button
              type="submit"
              className="border border-black bg-green-500 rounded-md mt-2 p-2"
            >
              Buscar
            </button>
          </form>
        </div>
      );
    }
  }
}
