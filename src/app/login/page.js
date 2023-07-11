"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
const LoginPage = () => {
  const [usernameInput, setUsername] = useState("");
  const [passwordInput, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting...");

    const username = usernameInput;
    const password = passwordInput;
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.error) {
      return setError(error);
    }
    if (res?.ok) return router.push("/");
    console.log(res);
    console.log(error);
  };
  return (
    <main>
      <div className="flex flex-col items-center p-56">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-transparent border-2 w-96 shadow-2xl text-center border-black p-16 rounded-lg
        "
        >
          <p className="relative -top-10 text-lg font-bold ">
            Inicio de Sesión
          </p>
          {error && (
            <div className="bg-red-500 text-white p-2 mb-2">{error}</div>
          )}

          <label htmlFor="txtUsuario">Usuario</label>
          <input
            type="text"
            name="usuario"
            id="txtUsuario"
            placeholder="Nombre de cajero"
            value={usernameInput}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            className="rounded-md p-1 my-2 text-center"
          ></input>

          <label htmlFor="txtContraseña">Contraseña</label>
          <input
            type="password"
            name="contraseña"
            id="txtContraseña"
            value={passwordInput}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="off"
            className="rounded-md p-1 my-2 text-center"
          ></input>

          <button
            type="submit"
            name="button"
            className="border border-black mt-6 py-1 rounded-md cursor-pointer hover:bg-gray-200"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
