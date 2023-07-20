import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  //fetch
  if (token) {
    try {
      await connect();
      var offset = -4;
      const today = new Date(new Date().getTime() + offset * 3600 * 1000);
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);
      const ticket = await ticketsModel
        .find(/* { createdAt: { $gte: today, $lt: tomorrow } } */)
        .select("ticketSerial cajero createdAt -_id");
      return new NextResponse(JSON.stringify(ticket), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};
