import { NextResponse } from "next/server";
import connect from "@/utils/db";
import ticketsModel from "@/models/ticketsModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  const { id } = params;
  //fetch
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token) {
    try {
      await connect();

      const ticket = await ticketsModel.find({ apuesta: { _id: id } });
      return new NextResponse(JSON.stringify(ticket), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};
