import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchMetrics() {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch("http://localhost:3333/meals/metrics", {
        headers: {
          "user-id": userId,
        },
      });

      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      console.error("Erro ao carregar métricas:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMetrics();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "60px auto", textAlign: "center" }}>
      <h1>Olá, {localStorage.getItem("userName")} 👋</h1>
      <p>Resumo da sua dieta</p>

      {metrics && (
        <div style={{ marginTop: 30 }}>
          <p><strong>Total de refeições:</strong> {metrics.totalMeals}</p>
          <p><strong>Dentro da dieta:</strong> {metrics.mealsInsideDiet}</p>
          <p><strong>Fora da dieta:</strong> {metrics.mealsOutsideDiet}</p>
          <p><strong>Melhor sequência:</strong> {metrics.bestInsideDietSequence}</p>
        </div>
      )}

      <div style={{ marginTop: 40, display: "flex", gap: 20, justifyContent: "center" }}>
        <button
          onClick={() => navigate("/meals/create")}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Nova Refeição
        </button>

        <button
          onClick={() => navigate("/meals")}
          style={{ padding: "10px 20px", cursor: "pointer" }}
        >
          Minhas Refeições
        </button>
      </div>
    </div>
  );
}
