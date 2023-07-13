import mongoose from "mongoose";
const { Schema } = mongoose;

let Cajero;

if (mongoose.models["Cajeros"]) {
  Cajero = mongoose.model("Cajeros");
} else {
  const cajeroSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      sede: {
        type: String,
        default: "A FIJAR",
      },
      rol: {
        type: String,
        default: "CAJA",
      },
    },
    { timestamps: true }
  );
  Cajero = mongoose.model("Cajeros", cajeroSchema);
}

export default Cajero;
