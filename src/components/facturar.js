"use client";
import Imprimir from "@/components/imprimir";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DatosFactura = (props) => {
  const router = useRouter();
  const { data: session, status: status } = useSession();
  if (!session) {
    if (status == "loading") {
      return (
        <h1 className="font-bold text-2xl text-center py-56">
          Cargando factura...
        </h1>
      );
    }
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }
  if (session) {
    if (status == "authenticated") {
      const { cedula, nombre, carreras, fecha, cajero, serial, hipodromo } =
        props;
      const date = fecha;
      function formatDate(date) {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().substr(-2);
        return `${day}/${month}/${year}`;
      }
      const hours = date.toLocaleTimeString("en-US", {
        hour12: true,
        timeZone: "UTC",
      });
      const trueDate = formatDate(date) + " - " + hours;
      return (
        <div className="ml-2">
          <br></br>
          {cajero}
          <br></br>
          {formatDate(date) + " - " + hours}
          <br></br>
          CI: {cedula}
          <br></br>
          NOMBRE: {nombre}
          <br></br>
          SERIAL: {serial}
          <br></br>
          -------------------------------
          <br></br>
          POLLA X PUNTOS
          <br></br>
          -------------------------------
          <br></br>
          HIP: {hipodromo}
          <br></br>
          -------------------------------
          <br></br>
          {Object.keys(carreras).map((carrera) => {
            return (
              <>
                {"Carr." +
                  carrera.substring(7) +
                  "- Caballo " +
                  carreras[carrera].primer}
                <br></br>{" "}
              </>
            );
          })}
          -------------------------------
          <br></br>
          VALOR POLLA: 2$
          <br></br>
          <Imprimir
            cajero={cajero}
            nombre={nombre}
            fecha={trueDate}
            cedula={cedula}
            serial={serial}
            hipodromo={hipodromo}
            carreras={carreras}
          />
        </div>
      );
    }
  }
};
export default DatosFactura;
