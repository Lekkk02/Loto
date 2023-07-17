"use client";
const Imprimir = () => {
  const handleClick = () => {
    window.print();
  };
  return (
    <button
      onClick={handleClick}
      className="border border-black rounded-md p-1 my-14"
    >
      Imprimir
    </button>
  );
};

export default Imprimir;
