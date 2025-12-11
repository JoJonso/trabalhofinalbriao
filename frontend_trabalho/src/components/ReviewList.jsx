import { useEffect, useState } from "react";
import { getReviews, updateReview, deleteReview } from "../services/reviewApi";

export default function ReviewList({ refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [editing, setEditing] = useState({ id: null, text: "", rating: 0 });

  const load = async () => {
    const data = await getReviews();
    setReviews(data || []);
    setEditing({ id: null, text: "", rating: 0 });
  };

  useEffect(() => {
    load();
  }, [refreshTrigger]);

  const startEdit = (r) => setEditing({ id: r.id, text: r.review, rating: r.rating ?? 0 });
  const cancelEdit = () => setEditing({ id: null, text: "", rating: 0 });

  const saveEdit = async (id) => {
    if (!editing.text || editing.rating < 0 || editing.rating > 5) return;
    await updateReview(Number(id), { review: editing.text, rating: editing.rating });
    load();
  };

  const handleDelete = async (id) => {
    if (confirm("Deseja realmente deletar esta review?")) {
      await deleteReview(Number(id));
      load();
    }
  };

  const toggleEditingRating = (i) => setEditing((prev) => ({ ...prev, rating: prev.rating === i ? 0 : i }));

  return (
    <div className="recent-reviews">
      <h2 style={{ marginTop: 0 }}>Suas reviews recentes</h2>
      {reviews.length === 0 && <div className="list-empty">Nenhuma review ainda.</div>}
      <div className="recent-list">
        {reviews.map((r) => (
          <div key={r.id} className="review-item" style={{ marginBottom: 12 }}>
            <img className="review-thumb" src={r.gameThumb} alt={r.gameName} />
            
            <div className="review-meta">
              <div className="review-title" style={{ alignItems: "flex-start" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minWidth: 0 }}>
                  <strong style={{ fontSize: 14, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.gameName}</strong>
                  <span style={{ color: "var(--txt-muted)", fontSize: 12 }}>{new Date(r.created_at || r.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", marginLeft: 8 }}>
                  <button className="ghost" onClick={() => startEdit(r)} aria-label={`Editar review ${r.id}`}>Editar</button>
                  <button className="ghost" onClick={() => handleDelete(r.id)} aria-label={`Excluir review ${r.id}`}>Excluir</button>
                </div>
              </div>

              {editing.id === r.id ? (
                <>
                  <textarea className="input" rows={3} value={editing.text} onChange={(e) => setEditing((prev) => ({ ...prev, text: e.target.value }))} style={{ marginTop: 8, width: "100%", boxSizing: "border-box" }} />
                  <div className="stars editing-stars" style={{ margin: "8px 0", alignItems: "center" }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button key={i} type="button" className={`star ${i <= editing.rating ? "filled" : ""}`} onClick={() => toggleEditingRating(i)} style={{ background: "transparent", border: "none", fontSize: 18, width: 28, height: 28 }} aria-label={`Dar ${i} estrela(s)`}>★</button>
                    ))}
                  </div>
                  <div className="controls" style={{ marginTop: 8 }}>
                    <button className="btn" onClick={() => saveEdit(r.id)}>Salvar</button>
                    <button className="ghost" onClick={cancelEdit} style={{ marginLeft: 8 }}>Cancelar</button>
                  </div>
                </>
              ) : (
                <>
                  <p className="review-text">{r.review}</p>
                  <div className="review-footer" style={{ display: "flex", alignItems: "center", marginTop: 8 }}>
                    <div className="stars" aria-hidden>
                      {[1, 2, 3, 4, 5].map((i) => <span key={i} className={`star ${i <= r.rating ? "filled" : ""}`}>★</span>)}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
