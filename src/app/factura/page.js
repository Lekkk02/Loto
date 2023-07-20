"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const FacturaPrinc = () => {
  const router = useRouter();

  const { data: session, status: status } = useSession();
  if (!session) {
    if (status == "unauthenticated") {
      router.push("/login");
    }
  }
  if (status == "authenticated") {
    return (
      <h1 className="py-52 text-center font-bold text-2xl">
        No ingresó el serial de una factura...
      </h1>
    );
  }
};

export default FacturaPrinc;
