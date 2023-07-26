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
        default: "ACTIVE",
      },
      carreras: {
        type: Object,
        required: true,
      },
    },
    { timestamps: true }
  );
  Apuesta = mongoose.model("Apuesta", apuestaSchema);
}

Apuesta.schema.add({
  mensaje: {
    type: String,
    default: "",
    required: false,
  },
});

export default Apuesta;
