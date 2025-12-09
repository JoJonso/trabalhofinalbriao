import { useEffect, useState } from "react";
import { getGames } from "../services/gameApi";
import { createReview } from "../services/reviewApi";

export default function CreateReview({ onReviewCreated }) {
  const [games, setGames] = useState([]);
  const [selectedGameId, setSelectedGameId] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const loadGames = async () => {
      const data = await getGames();
      setGames(data);
    };
    loadGames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGameId || !reviewText || rating < 0 || rating > 5) return;

    const selectedGame = games.find(g => g.id === Number(selectedGameId));

    await createReview({
      gameThumb: selectedGame.cover_image,
      gameName: selectedGame.title,
      review: reviewText,
      rating
    });

    setReviewText("");
    setRating(0);
    setSelectedGameId("");

    if (onReviewCreated) onReviewCreated(); // Atualiza a lista
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "20px" }}>
      <h2>Criar Review</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedGameId} onChange={(e) => setSelectedGameId(e.target.value)}>
          <option value="">Selecione um jogo</option>
          {games.map(g => (
            <option key={g.id} value={g.id}>{g.title}</option>
          ))}
        </select>

        <br /><br />

        <textarea
          placeholder="Escreva sua review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={3}
          style={{ width: "100%" }}
        />

        <br /><br />

        <input
          type="number"
          min="0"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="Nota (0-5)"
        />

        <br /><br />

        <button type="submit">Enviar Review</button>
      </form>
    </div>
  );
}
