import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Cajero from "@/models/cajeroModel";
export const GET = async (request) => {
  //fetch
  try {
    await connect();
    const cajero = await Cajero.find();
    return new NextResponse(JSON.stringify(cajero), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
