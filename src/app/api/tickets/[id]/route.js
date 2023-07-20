import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  const { id } = params;
  //fetch
  try {
    await connect();

    const ticket = await ticketsModel
      .find({ apuesta: { _id: id } })
      .select("ticketSerial carreras cajero puntos -_id");
    return new NextResponse(JSON.stringify(ticket), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
