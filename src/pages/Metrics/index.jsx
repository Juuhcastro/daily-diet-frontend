import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Metrics() {
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
      <h1>Métricas da Dieta</h1>

      {metrics && (
        <div style={{ marginTop: 30 }}>
          <p><strong>Total de refeições:</strong> {metrics.totalMeals}</p>
          <p><strong>Dentro da dieta:</strong> {metrics.mealsInsideDiet}</p>
          <p><strong>Fora da dieta:</strong> {metrics.mealsOutsideDiet}</p>
          <p><strong>Melhor sequência dentro da dieta:</strong> {metrics.bestInsideDietSequence}</p>
        </div>
      )}

      <button
        onClick={() => navigate("/home")}
        style={{ marginTop: 30, padding: 10, cursor: "pointer" }}
      >
        Voltar para Home
      </button>
    </div>
  );
}
