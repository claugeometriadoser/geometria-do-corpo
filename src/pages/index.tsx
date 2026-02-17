import { useEffect, useState } from "react";

const diasDaSemana = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];
const ciclo = ["A", "HIIT", "B", "HIIT", "C", "Descanso", "Descanso"];

export default function Home() {
  const [semana, setSemana] = useState(1);
  const [diaIndex, setDiaIndex] = useState(0);

  useEffect(() => {
    const savedWeek = localStorage.getItem("semanaAtual");
    const savedDay = localStorage.getItem("diaAtual");

    if (savedWeek) setSemana(parseInt(savedWeek));
    if (savedDay) setDiaIndex(parseInt(savedDay));
  }, []);

  const reiniciar = () => {
    localStorage.setItem("semanaAtual", "1");
    localStorage.setItem("diaAtual", "0");
    setSemana(1);
    setDiaIndex(0);
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-[#5A4637] flex flex-col gap-6">

      <h1 className="text-3xl font-semibold text-center">Geometria do Corpo</h1>

      <div className="bg-[#F5EFE9] rounded-xl shadow-sm p-6 flex flex-col gap-3">
        <p className="text-lg">
          <span className="font-semibold text-[#674B3A]">Semana: </span>{semana}
        </p>

        <p className="text-lg">
          <span className="font-semibold text-[#674B3A]">Dia: </span>{diasDaSemana[diaIndex]}
        </p>

        <p className="text-lg">
          <span className="font-semibold text-[#674B3A]">Treino: </span>{ciclo[diaIndex]}
        </p>
      </div>

      <button
        onClick={() => (window.location.href = "/treino-do-dia")}
        className="w-full py-3 rounded-lg bg-[#C46A4A] text-white text-lg shadow hover:bg-[#B15D40] transition"
      >
        Ir para o Treino do Dia
      </button>

      <button
        onClick={reiniciar}
        className="w-full py-3 rounded-lg bg-[#94735A] text-white text-lg shadow hover:bg-[#81634F] transition"
      >
        Reiniciar ciclo
      </button>
    </div>
  );
}
