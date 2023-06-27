"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Apuesta from "@/components/apuesta";

/* const getData = async () => {
  const data = await fetch("/api/tickets");
  return data.json();
}; */
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  return (
    <div>
      <Apuesta />
    </div>
  );
}
