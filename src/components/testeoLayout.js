import Head from "next/head";
export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <title>Factura</title>
      </Head>
      <div>{children}</div>
    </>
  );
}
