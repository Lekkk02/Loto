import mongoose from "mongoose";
const { Schema } = mongoose;

let Apuesta;

if (mongoose.models["Apuesta"]) {
  Ticket = mongoose.model("Apuesta");
} else {
  const apuestaSchema = new Schema(
    {
      hipodromo: {
        type: String,
        required: true,
      },
      caballos: {
        type: Array,
        default: undefined,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      carreras: {
        type: Object,
        required: true,
      },
    },
    { timestamps: true }
  );
  Ticket = mongoose.model("Apuesta", apuestaSchema);
}

export default Ticket;
