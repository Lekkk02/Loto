import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";

export const GET = async (request) => {
  //fetch
  try {
    await connect();
    var offset = -4;
    const today = new Date(new Date().getTime() + offset * 3600 * 1000);
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    console.log("Today date", today);
    console.log("Tomorrow Date ", tomorrow);
    /*     const ticket = await ticketsModel.find({ createdAt: { $gte: today } });
     */
    /*     const ticket = await ticketsModel.find({
      createdAt: { $gte: new Date(tomorrow), $lt: new Date(tomorrow) },
    }); */
    const ticket = await ticketsModel
      .find()
      .select("ticketSerial carreras puntos -_id");
    return new NextResponse(JSON.stringify(ticket), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
  var offset = -4;

  const today = new Date(new Date().getTime() + offset * 3600 * 1000);
  body.createdAt = today;
  const newTicket = new ticketsModel(body);
  try {
    await connect();
    await newTicket.save();
    const ticketSerial = newTicket.ticketSerial;
    return new NextResponse(ticketSerial, { status: 201 });
  } catch (error) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
