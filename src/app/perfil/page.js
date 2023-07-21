"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cajero from "@/components/cajero";
import TablaPagos from "@/components/tablaPagos";
import Reporte from "@/components/reporteGanadores";

export default function Home() {
  const { data: session, status: status } = useSession();
  if (session) {
    if (session.user.rol == "ADMIN") {
      return (
        <div className="text-center my-24">
          <Reporte />
          <hr className=" my-8 border border-gray-400"></hr>
          <TablaPagos />
        </div>
      );
    }
  }

  return <Cajero />;
}
