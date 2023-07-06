"use client";
import { useState } from "react";
import jsPDF from "jspdf";
const Formulario = () => {
  const [datosFormulario, setDatosFormulario] = useState({});

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(datosFormulario);
    const pdf = new jsPDF();
    pdf.text(`FECHA DE IMPRESIÓN: ${datosFormulario.nombre}`, 10, 10);
    pdf.text(`Nombre: ${datosFormulario.nombre}`, 10, 15);
    pdf.text(`Apellido: ${datosFormulario.apellido}`, 10, 30);
    pdf.save("formulario.pdf");

    const file = new Blob([pdf.output()], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);

    pdfjsLib.getDocument(fileURL).promise.then((pdf) => {
      const printPDF = () => {
        window.print();
      };
      pdf.getMetadata().then((metadata) => {
        console.log(metadata);
        printPDF();
      });
    });
  };

  const handleInputChange = (event) => {
    setDatosFormulario({
      ...datosFormulario,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" name="nombre" onChange={handleInputChange} />
      </label>
      <label>
        Apellido:
        <input type="text" name="apellido" onChange={handleInputChange} />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Formulario;
