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
    },
    { timestamps: true }
  );
  ticketSchema.add({
    carreras: {
      type: Object,
      required: true,
    },
  });
  Ticket = mongoose.model("Ticket", ticketSchema);
}
Ticket.schema.add({
  carreras: {
    type: Object,
    required: true,
  },
});

export default Ticket;
