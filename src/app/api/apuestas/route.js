import { NextResponse } from "next/server";
import connect from "@/utils/db";
import apuestaModel from "@/models/apuestaModel";

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
    /*     const apuesta = await apuestaModel.find({
      createdAt: { $gte: today, $lt: new Date(tomorrow) },
      status: "ACTIVE",
    }); */

    const apuesta = await apuestaModel
      .findOne()
      .sort({ field: "asc", _id: -1 })
      .limit(1);

    return new NextResponse(JSON.stringify(apuesta), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const POST = async (request) => {
  const body = await request.json();
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
};
