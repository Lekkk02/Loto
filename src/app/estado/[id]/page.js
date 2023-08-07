"use client";
import Estado from "@/components/estadoTicket";

export default function Home({ params }) {
  const { id } = params;

  return <Estado id_ticket={id} />;
}
