import mongoose from "mongoose";
const { Schema } = mongoose;

let Ticket;

if (mongoose.models["Ticket"]) {
  Ticket = mongoose.model("Ticket");
} else {
  const ticketSchema = new Schema(
    {
      name: {
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
  Ticket = mongoose.model("Ticket", ticketSchema);
}

export default Ticket;
