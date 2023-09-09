"use client";
import ActComp from "@/components/actualizarApuesta";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Actualizar = () => {
  const router = useRouter();
  const { data: session, status: status } = useSession();
  if (status == "unauthenticated") {
    router.push("/login");
  }
  if (session?.user?.rol == "CAJA") {
    router.push("/");
  }
  if (session) {
    if (session.user.rol == "ADMIN") {
      return <ActComp />;
    }
  }
};

export default Actualizar;
