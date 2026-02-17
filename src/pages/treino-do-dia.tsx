import { useEffect, useState } from "react";

const diasDaSemana = [
  "segunda",
  "terca",
  "quarta",
  "quinta",
  "sexta",
  "sabado",
  "domingo"
];

const cicloDias = {
  segunda: "A",
  terca: "HIIT",
  quarta: "B",
  quinta: "HIIT",
  sexta: "C",
  sabado: "DESCANSO",
  domingo: "DESCANSO"
};

// -----------------------------------------------------
// 🔥 PROTOCOLO COMPLETO DAS 4 SEMANAS
// -----------------------------------------------------
const protocolo = {
  1: {
    A: [
      "Agachamento sumô com peso – 3×6",
      "Deadlift romeno – 3×6",
      "Step-up controlado – 2×8 por perna",
      "Glúteo ponte – 3×8"
    ],
    B: [
      "Supino com halteres – 3×6",
      "Remada baixa ou cavalinho – 3×6",
      "Desenvolvimento sentado – 2×8",
      "Face pull – 2×12"
    ],
    C: [
      "Goblet squat pesado – 3×6",
      "Remada unilateral – 3×6",
      "Flexão inclinada – 3×8",
      "Kettlebell deadlift – 3×6"
    ],
    HIIT: [
      "Bike: 20s forte / 40s leve × 10",
      "ou Remo: 30s forte / 2 min leve × 6",
      "Neuromuscular: marcha rápida, caminhada lateral, sit‑to‑stand explosivo"
    ]
  },

  2: {
    A: [
      "Agachamento frontal – 3×5",
      "Deadlift tradicional – 3×4",
      "Avanço para trás – 2×8 por perna",
      "Panturrilha sem impacto – 2×12"
    ],
    B: [
      "Supino inclinado – 3×6",
      "Remada no TRX – 3×6",
      "Elevação lateral pesada – 2×6",
      "Pulldown – 2×8"
    ],
    C: [
      "Terra sumô – 3×4",
      "Push press leve-moderado – 3×5",
      "Remada curvada – 3×6",
      "Farmer carry – 2×40s"
    ],
    HIIT: [
      "Elíptico: 15s sprint / 45s leve ×12",
      "ou Caminhada inclinada forte: 1 min forte / 2 min leve × 6",
      "Neuromuscular: deslocamento lateral, mini agachamento explosivo"
    ]
  },

  3: {
    A: [
      "Agachamento com pausa – 3×4",
      "Deadlift pesado – 3×3",
      "Búlgaro – 2×5",
      "Ponte de glúteo com carga – 3×6"
    ],
    B: [
      "Supino pesado – 3×4",
      "Remada cavalinho – 3×5",
      "Militar estrito – 2×5",
      "Pull-up assistido – 2×5"
    ],
    C: [
      "Thruster moderado – 3×5",
      "Deadlift romeno – 3×5",
      "Renegade row – 2×6",
      "Farmer carry – 2×50s"
    ],
    HIIT: [
      "Bike: 10s sprint total / 50s descanso × 10–12",
      "ou Remo: 30s forte / 2 min leve × 8",
      "Neuromuscular: passos rápidos curtos, skips no chão"
    ]
  },

  4: {
    A: [
      "Agachamento leve – 2×6",
      "Deadlift romeno leve – 2×6",
      "Step lateral – 2×10",
      "Glúteo ponte leve – 2×10"
    ],
    B: [
      "Supino leve – 2×6",
      "Remada sentada – 2×8",
      "Elevação lateral – 2×10",
      "Pulldown leve – 2×8"
    ],
    C: [
      "Clean leve com halteres – 2×6",
      "Push press leve – 2×5",
      "Remada unilateral – 2×8",
      "Carry leve – 2×30s"
    ],
    HIIT: [
      "HIIT leve: 20s moderado / 40s leve × 8",
      "ou Fartlek leve – 10 minutos",
      "Neuromuscular: marcha rápida, mobilidade dinâmica, aberturas de quadril"
    ]
  }
};

// -----------------------------------------------------
// 🔥 COMPONENTE PRINCIPAL
// -----------------------------------------------------
export default function TreinoDoDia() {
  const [semana, setSemana] = useState(1);
  const [diaIndex, setDiaIndex] = useState(0);

  // Carrega progresso salvo
  useEffect(() => {
    const savedWeek = localStorage.getItem("semanaAtual");
    const savedDay = localStorage.getItem("diaAtual");

    if (savedWeek) setSemana(parseInt(savedWeek));
    if (savedDay) setDiaIndex(parseInt(savedDay));
  }, []);

  const dia = diasDaSemana[diaIndex];
  const tipoTreino = cicloDias[dia];

  // -----------------------------------------------------
  // 🔥 Função de concluir + avançar automático
  // -----------------------------------------------------
  const concluir = () => {
    let nextDay = diaIndex + 1;
    let nextWeek = semana;

    // Domingo → passa pra próxima semana
    if (nextDay > 6) {
      nextDay = 0;
      nextWeek = semana + 1;

      if (nextWeek > 4) nextWeek = 1; // reinicia ciclo
    }

    localStorage.setItem("semanaAtual", nextWeek.toString());
    localStorage.setItem("diaAtual", nextDay.toString());

    setSemana(nextWeek);
    setDiaIndex(nextDay);
  };

  // -----------------------------------------------------
  // 🔥 UI / Estilo Terra
  // -----------------------------------------------------
  return (
    <div className="p-6 max-w-lg mx-auto text-[#5A4637] flex flex-col gap-6">

      <h1 className="text-3xl font-semibold text-center">Treino do Dia</h1>

      {/* CARD PRINCIPAL */}
      <div className="bg-[#F5EFE9] rounded-xl shadow-sm p-6 flex flex-col gap-3">
        <p><b>Semana:</b> {semana}</p>
        <p><b>Dia:</b> {dia.charAt(0).toUpperCase() + dia.slice(1)}</p>
        <p><b>Treino:</b> {tipoTreino}</p>
      </div>

      {/* TREINO OU DESCANSO */}
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

      {/* BOTÃO CONCLUIR */}
      <button
        onClick={concluir}
        className="w-full py-3 rounded-lg bg-[#C46A4A] text-white text-lg shadow hover:bg-[#B15D40] transition"
      >
        Concluir
      </button>

      {/* BOTÃO VOLTAR */}
      <button
        onClick={() => (window.location.href = "/")}
        className="w-full py-3 rounded-lg bg-[#94735A] text-white text-lg shadow hover:bg-[#81634F] transition"
      >
        Voltar ao início
      </button>
    </div>
  );
}
