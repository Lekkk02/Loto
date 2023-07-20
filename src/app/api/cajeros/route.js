import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cajero from "@/models/cajeroModel";
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
      const cajero = await Cajero.find();
      return new NextResponse(JSON.stringify(cajero), { status: 200 });
    } catch (err) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};
