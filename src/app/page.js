"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Apuesta from "@/components/apuesta";
import Table from "@/components/tablaTickets";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  try {
    return (
      <div>
        <Apuesta />
        <Table />
      </div>
    );
  } catch (err) {
    return (
      <h1 className="py-52 text-center font-bold text-2xl">
        Error cargando datos...
      </h1>
    );
  }
}
