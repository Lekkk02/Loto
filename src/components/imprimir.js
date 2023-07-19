"use client";
import { saveAs } from "file-saver";

const Imprimir = (props) => {
  const { cedula, nombre, carreras, fecha, cajero, serial, hipodromo } = props;
  const carrerasTexto = Object.keys(carreras)
    .map(
      (key) =>
        `Carr.${key.split("carrera")[1]}- Caballo ${carreras[key].primer}`
    )
    .join("\n");
  const contenidoArchivo = `${cajero}\n${fecha}\nCI: ${cedula}\nNOMBRE: ${nombre}\nSERIAL: ${serial}\n----------------------\nPOLLA X PUNTOS\n----------------------\nHIP: ${hipodromo}\n----------------------\n${carrerasTexto}\n----------------------\nVALOR POLLA: 2$\n----------------------\n----------------------\n$`;
  const handleClick = () => {
    const archivo = new File([contenidoArchivo], `Factura - ${serial}.txt`, {
      type: "text/plain;charset=utf-8",
    });
    /*     saveAs(archivo);
     */ const url = URL.createObjectURL(archivo);
    const nuevaVentana = window.open(url);

    // Abrir la ventana de impresión del navegador en la misma ventana donde se abrió el archivo de texto
    nuevaVentana.onload = () => {
      nuevaVentana.print();
    };
  };
  return (
    <button
      onClick={handleClick}
      className="border border-black rounded-md p-1 my-14"
    >
      Imprimir
    </button>
  );
};

export default Imprimir;
