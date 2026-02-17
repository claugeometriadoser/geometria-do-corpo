import { useState, useEffect } from "react";

// ----------------------------
// 1) TABELAS DE TREINOS
// ----------------------------
const treinos = {
  1: {
    A: [
      "Agachamento sumô com peso – 3×6",
      "Deadlift romeno – 3×6",
      "Step-up controlado (plataforma baixa) – 2×8 por perna",
      "Glúteo ponte – 3×8",
    ],
    B: [
      "Supino com halteres – 3×6",
      "Remada baixa ou cavalinho – 3×6",
      "Desenvolvimento sentado – 2×8",
      "Face pull – 2×12",
    ],
    C: [
      "Goblet squat pesado – 3×6",
      "Remada unilateral – 3×6",
      "Flexão inclinada – 3×8",
      "Kettlebell deadlift – 3×6",
    ],
    HIIT: [
      "Bike: 20s forte / 40s leve × 10",
      "OU Rower: 30s forte / 2 min leve × 6",
    ],
  },

  2: {
    A: [
      "Agachamento frontal – 3×5",
      "Deadlift tradicional – 3×4",
      "Avanço para trás – 2×8 por perna",
      "Panturrilha sem impacto – 2×12",
    ],
    B: [
      "Supino inclinado – 3×6",
      "Remada no TRX – 3×6",
      "Elevação lateral pesada – 2×6",
      "Pulldown – 2×8",
    ],
    C: [
      "Terra sumô – 3×4",
      "Push press leve‑moderado – 3×5",
      "Remada curvada – 3×6",
      "Farmer carry – 2×40s",
    ],
    HIIT: [
      "Elíptico: 15s sprint / 45s leve × 12",
      "OU Caminhada inclinada forte: 1 min forte / 2 min leve × 6",
    ],
  },

  3: {
    A: [
      "Agachamento com pausa – 3×4",
      "Deadlift pesado – 3×3",
      "Búlgaro – 2×5",
      "Ponte de glúteo com carga – 3×6",
    ],
    B: [
      "Supino pesado – 3×4",
      "Remada cavalinho – 3×5",
      "Militar estrito – 2×5",
      "Pull-up assistido – 2×5",
    ],
    C: [
      "Thruster moderado – 3×5",
      "Deadlift romeno – 3×5",
      "Renegade row – 2×6",
      "Farmer carry – 2×50s",
    ],
    HIIT: [
      "Bike: 10s sprint total / 50s descanso × 10–12",
      "OU Rower: 30s forte / 2 min leve × 8",
    ],
  },

  4: {
    A: [
      "Agachamento leve – 2×6",
      "Deadlift romeno leve – 2×6",
      "Step lateral – 2×10",
      "Glúteo ponte leve – 2×10",
    ],
    B: [
      "Supino leve – 2×6",
      "Remada sentada – 2×8",
      "Elevação lateral – 2×10",
      "Pulldown leve – 2×8",
    ],
    C: [
      "Clean leve com halteres – 2×6",
      "Push press leve – 2×5",
      "Remada unilateral – 2×8",
      "Carry leve – 2×30s",
    ],
    HIIT: [
      "HIIT leve: 20s moderado / 40s leve × 8",
      "OU fartlek leve 10 minutos",
    ],
  },
};

// ----------------------------
// 2) MAPA DO DIA → A/B/C/HIIT/Descanso
// ----------------------------
const rotinaSemana = {
  1: "A",
  2: "HIIT",
  3: "B",
  4: "HIIT",
  5: "C",
  6: "Descanso",
  0: "Descanso",
};

// ----------------------------
// 3) COMPONENTE PRINCIPAL
// ----------------------------
export default function TreinoDoDia() {
  const [dia, setDia] = useState("");
  const [semana, setSemana] = useState(1);
  const [treino, setTreino] = useState([]);

  useEffect(() => {
    const hoje = new Date();
    const diaSemana = hoje.getDay();
    const tipo = rotinaSemana[diaSemana];

    setDia(tipo);

    if (tipo === "Descanso") {
      setTreino(["Hoje é dia de descanso"]);
      return;
    }

    setTreino(treinos[semana][tipo]);
  }, [semana]);

  return (
    <div style={{ padding: 24 }}>
      <h1>Treino do Dia</h1>

      <label>Semana do ciclo:</label>
      <select
        value={semana}
        onChange={(e) => setSemana(Number(e.target.value))}
      >
        <option value={1}>Semana 1</option>
        <option value={2}>Semana 2</option>
        <option value={3}>Semana 3</option>
        <option value={4}>Semana 4</option>
      </select>

      <h2 style={{ marginTop: 24 }}>Dia: {dia}</h2>

      <ul>
        {treino.map((t, idx) => (
          <li key={idx}>{t}</li>
        ))}
      </ul>
    </div>
  );
}
