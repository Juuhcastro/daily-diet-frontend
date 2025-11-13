import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewMeal() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function fetchMeal() {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(`http://localhost:3333/meals/${id}`, {
        headers: {
          "user-id": userId,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao carregar refeição.");
      }

      const data = await response.json();
      setMeal(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    const confirmar = window.confirm("Tem certeza que deseja excluir esta refeição?");
    if (!confirmar) return;

    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch(`http://localhost:3333/meals/${id}`, {
        method: "DELETE",
        headers: {
          "user-id": userId,
        },
      });

      if (!response.ok && response.status !== 204) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao excluir refeição.");
      }

      navigate("/meals");
    } catch (err) {
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchMeal();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center", marginTop: 50, color: "red" }}>{error}</p>;
  }

  if (!meal) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Refeição não encontrada.</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "60px auto" }}>
      <h1>Detalhes da Refeição</h1>

      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <p><strong>Nome:</strong> {meal.name}</p>
        <p><strong>Descrição:</strong> {meal.description || "-"}</p>
        <p>
          <strong>Data e Hora:</strong>{" "}
          {new Date(meal.dateTime).toLocaleString()}
        </p>
        <p>
          <strong>Dentro da dieta:</strong>{" "}
          {meal.isInsideDiet ? "Sim" : "Não"}
        </p>
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={() => navigate(`/meals/${id}/edit`)}
          style={{ flex: 1, padding: 10, cursor: "pointer" }}
        >
          Editar
        </button>

        <button
          onClick={handleDelete}
          style={{
            flex: 1,
            padding: 10,
            cursor: "pointer",
            backgroundColor: "#ff4d4d",
            color: "#fff",
            border: "none",
          }}
        >
          Excluir
        </button>
      </div>

      <button
        onClick={() => navigate("/meals")}
        style={{
          marginTop: 20,
          padding: 10,
          width: "100%",
          cursor: "pointer",
        }}
      >
        Voltar para lista
      </button>
    </div>
  );
}
