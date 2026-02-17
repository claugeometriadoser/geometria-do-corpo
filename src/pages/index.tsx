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

export default function Home() {
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

  const reiniciar = () => {
    localStorage.setItem("semanaAtual", "1");
    localStorage.setItem("diaAtual", "0");
    setSemana(1);
    setDiaIndex(0);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Geometria do Corpo</h1>

      <h2>Status Atual</h2>
      <p><b>Semana:</b> {semana}</p>
      <p><b>Dia:</b> {dia.charAt(0).toUpperCase() + dia.slice(1)}</p>

      <p>
        <b>Treino de Hoje:</b>{" "}
        {tipoTreino === "DESCANSO" ? "Descanso" : `Treino ${tipoTreino}`}
      </p>

      <button
        onClick={() => (window.location.href = "/treino-do-dia")}
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
        Ir para o Treino do Dia
      </button>

      <button
        onClick={reiniciar}
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
        Reiniciar Ciclo
      </button>
    </div>
  );
}
