"use client";
import Estado from "@/components/estadoTicket";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home({ params }) {
  const { id } = params;

  const { data: session, status: status } = useSession();
  const router = useRouter();
  if (!session) {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }

  if (session) {
    if (status == "authenticated") {
      return <Estado id_ticket={id} />;
    }
  }
}
