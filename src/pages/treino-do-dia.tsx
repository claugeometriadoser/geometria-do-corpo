import { useEffect, useState } from "react";

const diasDaSemana = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

const cicloDias = {
  segunda: "A",
  terca: "HIIT",
  quarta: "B",
  quinta: "HIIT",
  sexta: "C",
  sabado: "DESCANSO",
  domingo: "DESCANSO"
};

// AQUI ENTRA O MESMO PROTOCOLO COMPLETO QUE JÁ TE ENTREGUEI
// (não colo de novo aqui pra evitar poluição — mas mantenha exatamente igual)

export default function TreinoDoDia() {
  const [semana, setSemana] = useState(1);
  const [diaIndex, setDiaIndex] = useState(0);

  useEffect(() => {
    const savedWeek = localStorage.getItem("semanaAtual");
    const savedDay = localStorage.getItem("diaAtual");

    if (savedWeek) setSemana(parseInt(savedWeek));
    if (savedDay) setDiaIndex(parseInt(savedDay));
  }, []);

  const dia = diasDaSemana[diaIndex];
  const tipoTreino = cicloDias[dia];

  const concluir = () => {
    let nextDay = diaIndex + 1;
    let nextWeek = semana;

    if (nextDay > 6) {
      nextDay = 0;
      nextWeek = semana + 1;
      if (nextWeek > 4) nextWeek = 1;
    }

    localStorage.setItem("semanaAtual", nextWeek.toString());
    localStorage.setItem("diaAtual", nextDay.toString());

    setSemana(nextWeek);
    setDiaIndex(nextDay);
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-[#5A4637] flex flex-col gap-6">

      <h1 className="text-3xl font-semibold text-center">Treino do Dia</h1>

      <div className="bg-[#F5EFE9] rounded-xl shadow-sm p-6 flex flex-col gap-3">
        <p><b>Semana:</b> {semana}</p>
        <p><b>Dia:</b> {dia.charAt(0).toUpperCase() + dia.slice(1)}</p>
        <p><b>Treino:</b> {tipoTreino}</p>
      </div>

      {tipoTreino === "DESCANSO" ? (
        <div className="bg-white border border-[#D7C8BC] p-4 rounded-lg text-center">
          <h2 className="text-xl text-[#C46A4A] font-semibold">Hoje é descanso</h2>
        </div>
      ) : (
        <div className="bg-white border border-[#D7C8BC] p-4 rounded-lg">
          <h2 className="text-xl mb-3 text-[#C46A4A] font-semibold">
            Treino {tipoTreino}
          </h2>
          <ul className="flex flex-col gap-2">
            {protocolo[semana][tipoTreino].map((ex, i) => (
              <li key={i}>• {ex}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={concluir}
        className="w-full py-3 rounded-lg bg-[#C46A4A] text-white text-lg shadow hover:bg-[#B15D40] transition"
      >
        Concluir
      </button>

      <button
        onClick={() => (window.location.href = "/")}
        className="w-full py-3 rounded-lg bg-[#94735A] text-white text-lg shadow hover:bg-[#81634F] transition"
      >
        Voltar ao início
      </button>
    </div>
  );
}
