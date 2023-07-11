import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import AuthProvider from "@/components/authProvider";
const inter = Inter({ subsets: ["latin"] });

let isLogged = true;

const renderOp = (check) => {
  if (check) {
    return (
      <>
        <div>
          <Link href="/caja" className="font-bold text-md">
            Perfil
          </Link>
        </div>
        <div>
          <Link href="/ticket" className="font-bold text-md">
            Crear ticket
          </Link>
        </div>
      </>
    );
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <nav className="flex flex-row justify-evenly p-4 bg-transparent shadow-md">
            <div className="flex flex-row space-x-10 md:space-x-24 self-center text-black backdrop-blur-3xl">
              <div>
                <Link href="/sedes" className="font-bold text-md">
                  Posición
                </Link>
              </div>
              <div>
                <Link href="/" className="font-bold text-md">
                  Inicio
                </Link>
              </div>
              {renderOp(isLogged)}
            </div>
          </nav>
          {children}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.6.5/flowbite.min.js"></script>
        </body>
      </AuthProvider>
    </html>
  );
}
