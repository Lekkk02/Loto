import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col items-center p-56">
        <form
          className="flex flex-col bg-transparent border-2 w-96 shadow-2xl text-center border-black p-16 rounded-lg
          "
        >
          <p className="relative -top-10 text-lg font-bold ">Abrir apuesta</p>
          <label for="txtCedula">Hipódromo </label>
          <input
            type="text"
            name="cedula"
            id="txtCedula"
            placeholder="Hipódromo de las carreras"
            className="rounded-md p-1 my-2"
            maxLength={8}
          ></input>
          <label for="txtCedula">Carreras</label>
          <input
            type="text"
            name="cedula"
            id="txtCedula"
            placeholder="EJ: 1,2,3,4,5,6,7"
            className="rounded-md p-1 my-2"
            maxLength={32}
          ></input>
          <label for="txtCedula">Caballos a participar</label>
          <input
            type="text"
            name="cedula"
            id="txtCedula"
            placeholder="EJ: 1,2,3,4,5,6,7"
            className="rounded-md p-1 my-2"
            maxLength={32}
          ></input>

          <Link
            href="/usuario"
            className="border-2 border-gray p-1 mt-6 bg-white cursor-pointer hover:bg-slate-50"
          >
            <input
              type="submit"
              name="button"
              value="Crear apuesta"
              href="/usuarios"
            />
          </Link>
        </form>
      </div>
    </main>
  );
}
