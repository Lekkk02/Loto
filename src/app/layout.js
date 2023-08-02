import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import AuthProvider from "@/components/authProvider";
import { useSession } from "next-auth/react";
import NavBar from "@/components/navbar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>SELLATUPOLLA - ¡SELLATUPOLLA.com!</title>
        <meta
          name="description"
          content="Sellatupolla - Sella tu polla ya con nosotros. Apuesta tu polla en SELLATUPOLLA.COM"
        />
      </head>
      <AuthProvider>
        <body className={inter.className}>
          <NavBar />
          {children}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
        </body>
      </AuthProvider>
    </html>
  );
}
