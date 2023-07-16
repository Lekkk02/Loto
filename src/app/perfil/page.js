"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cajero from "@/components/cajero";
import TablaPagos from "@/components/tablaPagos";

export default function Home() {
  const { data: session, status: status } = useSession();
  if (session) {
    if (session.user.rol == "ADMIN") {
      return <TablaPagos />;
    }
  }

  return <Cajero />;
}
