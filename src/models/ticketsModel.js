import { Int32 } from "mongodb";
import mongoose from "mongoose";
const { Schema } = mongoose;

let Ticket;

if (mongoose.models["Ticket"]) {
  Ticket = mongoose.model("Ticket");
} else {
  const ticketSchema = new Schema(
    {
      cedula: {
        type: String,
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
      telefono: {
        type: String,
        required: true,
      },
      carreras: {
        type: Object,
        required: true,
      },
      puntos: {
        type: Number,
        default: 0,
      },
    },
    { timestamps: true }
  );
  Ticket = mongoose.model("Ticket", ticketSchema);
}

export default Ticket;
