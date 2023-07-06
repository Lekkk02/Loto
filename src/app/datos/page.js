import { useRouter } from "next/router";
import { useEffect } from "react";

const PaginaDeDestino = () => {
  const router = useRouter();

  useEffect(() => {
    const { nombre, apellido } = router.query;

    // Verificamos que la variable `path` sea de tipo `string` antes de usar la función `startsWith`
    if (
      typeof window !== "undefined" &&
      typeof router.asPath === "string" &&
      router.asPath.startsWith("/pagina-de-destino")
    ) {
      // Aquí podrías escribir el código para imprimir los datos de la página.
      console.log(`Nombre: ${nombre}, Apellido: ${apellido}`);
    }
  }, [router]);

  return (
    <div>
      <p>Página de destino</p>
    </div>
  );
};

export default PaginaDeDestino;
