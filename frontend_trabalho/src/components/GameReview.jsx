import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGames } from "../services/gameApi";
import { createReview, getReviews } from "../services/reviewApi";

export default function GameReview({ onReviewCreated }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState(null);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [gameReviews, setGameReviews] = useState([]);

  useEffect(() => {
    let mounted = true;
    getGames().then((data) => {
      if (!mounted) return;
      const found = (data || []).find((g) => Number(g.id) === Number(id));
      setGame(found || null);
    });
    return () => (mounted = false);
  }, [id]);

  useEffect(() => {
    let mounted = true;
    getReviews().then((data) => {
      if (!mounted) return;
      const all = data || [];
      if (game && game.title) setGameReviews(all.filter((r) => r.gameName === game.title));
      else setGameReviews([]);
    });
    return () => (mounted = false);
  }, [game]);

  const submit = async (e) => {
    e.preventDefault();
    if (!game || rating < 0 || rating > 5) return;
    await createReview({ gameThumb: game.cover_image, gameName: game.title, review: text, rating });
    setText("");
    setRating(0);
    if (onReviewCreated) onReviewCreated();
    navigate("/");
  };

  if (!game) return <div style={{ padding: 20, color: "var(--txt-muted)" }}>Carregando jogo...</div>;

  const toggleRating = (i) => setRating((prev) => (prev === i ? 0 : i));

  return (
    <div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 12 }}>
        <img src={game.cover_image} alt={game.title} style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 8 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, fontSize: 18 }}>{game.title}</div>
          <div style={{ color: "var(--txt-muted)", marginTop: 6 }}>{game.genre} {game.release_date ? "• " + new Date(game.release_date).toLocaleDateString() : ""}</div>
        </div>
      </div>

      <form onSubmit={submit}>
        <textarea className="input" rows={5} placeholder="Escreva sua review sobre este jogo" value={text} onChange={(e) => setText(e.target.value)} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i} type="button" className={i <= rating ? "star filled" : "star"} onClick={() => toggleRating(i)} aria-pressed={i <= rating} style={{ background: "transparent", border: "none", fontSize: 20, width: 28, height: 28 }} title={i === rating ? "Clicar zera a avaliação" : `Dar ${i} estrela(s)`}>★</button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="button" className="ghost" onClick={() => navigate("/")} style={{ padding: "8px 12px" }}>Voltar</button>
            <button type="submit" className="btn">Enviar Review</button>
          </div>
        </div>
      </form>

      <div style={{ marginTop: 20 }}>
        <h3 style={{ margin: "8px 0" }}>Reviews deste jogo ({gameReviews.length})</h3>
        {gameReviews.length === 0 && <div style={{ color: "var(--txt-muted)", padding: 12 }}>Ainda não há reviews para este jogo.</div>}
        {gameReviews.map((r) => (
          <div key={r.id} className="review-item" style={{ marginBottom: 12 }}>
            <img className="review-thumb" src={r.gameThumb} alt={r.gameName} />
            <div className="review-meta">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong>{r.gameName}</strong>
                <div style={{ color: "var(--txt-muted)", fontSize: 12 }}>{new Date(r.created_at || r.createdAt || Date.now()).toLocaleString()}</div>
              </div>
              <p className="review-text" style={{ marginTop: 8 }}>{r.review}</p>
              <div style={{ marginTop: 8 }}>
                <div className="stars" aria-hidden>
                  {[1,2,3,4,5].map(i => <span key={i} className={`star ${i <= r.rating ? "filled" : ""}`}>★</span>)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
