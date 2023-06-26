import mongoose from "mongoose";
const { Schema } = mongoose;

let Apuesta;

if (mongoose.models["Apuesta"]) {
  Apuesta = mongoose.model("Apuesta");
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
      favGaceta: {
        type: String,
        default: "",
      },
    },
    { timestamps: true }
  );
  Apuesta = mongoose.model("Apuesta", apuestaSchema);
}

export default Apuesta;
