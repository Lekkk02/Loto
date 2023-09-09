import { NextResponse } from "next/server";
import connect from "@/utils/db";
import apuestaModel from "@/models/apuestaModel";
import { getToken } from "next-auth/jwt";

export const GET = async (req) => {
  //fetch
  try {
    await connect();
    /*       var offset = -4;
      const today = new Date(new Date().getTime() + offset * 3600 * 1000);
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); */
    const apuesta = await apuestaModel
      .findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);

    return new NextResponse(JSON.stringify(apuesta), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (req) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) {
    const body = await req.json();
    var offset = -4;

    const today = new Date(new Date().getTime() + offset * 3600 * 1000);
    body.createdAt = today;
    /*   body.carreras = carreras;
  console.log(JSON.stringify(carreras)); */
    const newApuesta = new apuestaModel(body);
    try {
      await connect();
      await newApuesta.save();
      return new NextResponse("Apuesta created", { status: 201 });
    } catch (error) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};

export const PUT = async (req) => {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (token) {
    const fieldtoUpdate = await req.json();
    console.log(fieldtoUpdate);
    try {
      await connect();
      const updatedApuesta = await apuestaModel.findOneAndUpdate(
        {},
        { $set: fieldtoUpdate },
        {
          new: true,
          sort: { _id: -1 },
        }
      );
      return new NextResponse("Apuesta created", { status: 201 });
    } catch (error) {
      return new NextResponse("Database Error", { status: 500 });
    }
  } else {
    return new NextResponse("Unauthorized ", { status: 401 });
  }
};
