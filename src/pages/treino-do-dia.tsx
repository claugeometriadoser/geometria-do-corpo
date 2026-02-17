import { useEffect, useState } from "react";

const diasDaSemana = ["segunda", "terca", "quarta", "quinta", "sexta", "sabado", "domingo"];

// Protocolo de treinos por semana
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
      "ou Remos: 30s forte / 2 min leve × 6",
      "Neuromuscular diário: marcha rápida, caminhada lateral, sit-to-stand explosivo"
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
      "Push press leve‑moderado – 3×5",
      "Remada curvada – 3×6",
      "Farmer carry – 2×40s"
    ],
    HIIT: [
      "Elíptico: 15s sprint / 45s leve ×12",
      "ou Caminhada inclinada: 1 min forte / 2 min leve × 6",
      "Neuromuscular diário: deslocamento lateral, mini agachamento explosivo"
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
      "ou Remos: 30s forte / 2 min leve × 8",
      "Neuromuscular diário: passos rápidos curtos, skips no chão"
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
      "Neuromuscular diário: marcha rápida, mobilidade dinâmica, aberturas de quadril"
    ]
  }
};

// Mapeamento do ciclo semanal
const cicloDias = {
  segunda: "A",
  terca: "HIIT",
  quarta: "B",
  quinta: "HIIT",
  sexta: "C",
  sabado: "DESCANSO",
  domingo: "DESCANSO"
};

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

  // Avança automaticamente ao concluir
  const concluir = () => {
    let nextDay = diaIndex + 1;
    let nextWeek = semana;

    // Se acabou a semana → passa para a próxima
    if (nextDay > 6) {
      nextDay = 0;
      nextWeek = semana + 1;

      // Se passou da semana 4 → reinicia
      if (nextWeek > 4) nextWeek = 1;
    }

    // Salva o progresso
    localStorage.setItem("semanaAtual", nextWeek.toString());
    localStorage.setItem("diaAtual", nextDay.toString());

    setSemana(nextWeek);
    setDiaIndex(nextDay);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Treino do Dia</h1>

      <p><b>Semana:</b> {semana}</p>
      <p><b>Dia:</b> {dia.charAt(0).toUpperCase() + dia.slice(1)}</p>

      {tipoTreino === "DESCANSO" ? (
        <div>
          <h2>Hoje é descanso</h2>
        </div>
      ) : (
        <div>
          <h2>Treino {tipoTreino}</h2>
          <ul>
            {protocolo[semana][tipoTreino].map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={concluir}
        style={{
          marginTop: 20,
          padding: "12px 20px",
          background: "#C46A4A",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 16
        }}
      >
        Concluir
      </button>

      <button
        onClick={() => (window.location.href = "/")}
        style={{
          marginTop: 12,
          padding: "10px 16px",
          background: "#94735A",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          fontSize: 14
        }}
      >
        Voltar ao Início
      </button>
    </div>
  );
}
