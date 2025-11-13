import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchMeals() {
    try {
      const userId = localStorage.getItem("userId");

      const response = await fetch("http://localhost:3333/meals", {
        headers: {
          "user-id": userId,
        },
      });

      const data = await response.json();
      setMeals(data);
    } catch (err) {
      console.error("Erro ao carregar refeições:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: 50 }}>Carregando...</p>;
  }

  return (
    <div style={{ maxWidth: 600, margin: "60px auto" }}>
      <h1 style={{ textAlign: "center" }}>Minhas Refeições</h1>

      <button
        onClick={() => navigate("/meals/create")}
        style={{
          padding: "10px 15px",
          marginBottom: 20,
          cursor: "pointer",
        }}
      >
        Nova Refeição
      </button>

      {meals.length === 0 ? (
        <p>Nenhuma refeição cadastrada ainda.</p>
      ) : (
        meals.map((meal) => (
          <div
            key={meal.id}
            onClick={() => navigate(`/meals/${meal.id}`)}
            style={{
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            <strong>{meal.name}</strong>
            <br />
            <small>{new Date(meal.dateTime).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}
