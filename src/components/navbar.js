"use client";
import useSWR from "swr";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function NavBar() {
  const { data: session, status: status } = useSession();

  let check = false;
  if (session) {
    if (session.user.rol == "ADMIN") {
      check = true;
    }
  }
  if (!session) {
    return (
      <nav className="flex flex-row justify-center p-4 bg-transparent shadow-md">
        <div className="flex flex-row space-x-10 md:space-x-24 self-center text-black backdrop-blur-3xl">
          <div>
            <Link href="/" className="font-bold text-md hover:text-gray-600">
              Inicio
            </Link>
          </div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="flex flex-row justify-between p-4 bg-transparent shadow-md">
      <div className="flex flex-row space-x-10 md:space-x-24 self-center text-black backdrop-blur-3xl">
        <div>
          <Link href="/" className="font-bold text-md hover:text-gray-600">
            Inicio
          </Link>
        </div>
        {session ? (
          <>
            <div>
              <Link
                href="/perfil"
                className="font-bold text-md hover:text-gray-600"
              >
                Perfil
              </Link>
            </div>
            <div>
              <Link
                href="/ticket"
                className="font-bold text-md hover:text-gray-600"
              >
                Crear ticket
              </Link>
            </div>
            <div>
              <Link
                href="/estado"
                className="font-bold text-md hover:text-gray-600"
              >
                Verificar Ticket
              </Link>
            </div>
            {check ? (
              <div>
                <Link
                  href="/apuesta"
                  className="font-bold text-md hover:text-gray-600"
                >
                  Administrar apuesta
                </Link>
              </div>
            ) : (
              <br></br>
            )}
          </>
        ) : (
          <br></br>
        )}
      </div>
      <div>
        {session ? (
          <div>
            <button
              onClick={() => {
                signOut();
              }}
              className="font-bold text-md text-blue-500 hover:text-blue-800"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <br></br>
        )}
      </div>
    </nav>
  );
}
