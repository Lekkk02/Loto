import { NextResponse } from "next/server";
import connect from "@/utils/db";
import apuestaModel from "@/models/apuestaModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req, { params }) => {
  const { id } = params;
  try {
    await connect();
    const apuesta = await apuestaModel
      .findOne({ _id: id })
      .sort({ field: "asc", _id: -1 })
      .limit(1);

    return new NextResponse(JSON.stringify(apuesta), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};
