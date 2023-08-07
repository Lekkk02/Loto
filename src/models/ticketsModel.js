import mongoose from "mongoose";
const { Schema } = mongoose;

const AutoIncrementFactory = require("mongoose-sequence");
const connection = await mongoose.createConnection(process.env.MONGO);
const AutoIncrement = AutoIncrementFactory(connection);

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
      cajero: {
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
      apuesta: {
        type: Schema.Types.ObjectId,
        ref: "apuestas",
      },
    },
    { timestamps: true }
  );
  ticketSchema.plugin(AutoIncrement, { inc_field: "ticketSerial" });
  Ticket = mongoose.model("Ticket", ticketSchema);
}

Ticket.schema.add({
  hipodromo: {
    type: String,
    required: true,
  },
  reclamado: {
    type: String,
    default: "NO",
  },
  cobrado_por: {
    type: String,
    default: "NO",
  },
});

export default Ticket;
