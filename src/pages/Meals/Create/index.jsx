import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateMeal() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isInsideDiet, setIsInsideDiet] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !date || !time) {
      setError("Preencha pelo menos nome, data e horário.");
      return;
    }

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("Usuário não encontrado. Faça login novamente.");
      return;
    }

    // monta um datetime juntando data+hora
    const dateTime = new Date(`${date}T${time}`).toISOString();

    try {
      const response = await fetch("http://localhost:3333/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "user-id": userId,
        },
        body: JSON.stringify({
          name,
          description,
          dateTime,
          isInsideDiet,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erro ao cadastrar refeição.");
      }

      // deu certo → volta pra lista de refeições
      navigate("/meals");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <h1 style={{ textAlign: "center" }}>Nova Refeição</h1>

      <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Nome da refeição<br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "100%", padding: 8, fontSize: 14 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Descrição<br />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ width: "100%", padding: 8, fontSize: 14 }}
            />
          </label>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <label style={{ flex: 1 }}>
            Data<br />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ width: "100%", padding: 8, fontSize: 14 }}
            />
          </label>

          <label style={{ flex: 1 }}>
            Horário<br />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              style={{ width: "100%", padding: 8, fontSize: 14 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 16 }}>
          <span>Está dentro da dieta?</span>
          <div style={{ marginTop: 8, display: "flex", gap: 16 }}>
            <label>
              <input
                type="radio"
                checked={isInsideDiet === true}
                onChange={() => setIsInsideDiet(true)}
              />{" "}
              Sim
            </label>

            <label>
              <input
                type="radio"
                checked={isInsideDiet === false}
                onChange={() => setIsInsideDiet(false)}
              />{" "}
              Não
            </label>
          </div>
        </div>

        {error && (
          <p style={{ color: "red", marginBottom: 10 }}>{error}</p>
        )}

        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 10,
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/meals")}
            style={{ flex: 1, padding: 10, cursor: "pointer" }}
          >
            Cancelar
          </button>

          <button
            type="submit"
            style={{ flex: 1, padding: 10, cursor: "pointer" }}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
