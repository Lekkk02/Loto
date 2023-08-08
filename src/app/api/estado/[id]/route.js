import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  const { id } = params;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  //fetch
  if (token) {
    //fetch
    try {
      await connect();
      const ticket = await ticketsModel.findOne({ ticketSerial: id });
      return new NextResponse(JSON.stringify(ticket), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};

export const PUT = async (req, { params }) => {
  const { id } = params;
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  //fetch
  if (token) {
    //fetch
    const fieldtoUpdate = await req.json();

    try {
      await connect();
      const ticket = await ticketsModel.findOneAndUpdate(
        { ticketSerial: id },
        { $set: fieldtoUpdate },
        { new: true }
      );
      return new NextResponse("Ticket cobrado", { status: 201 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};
