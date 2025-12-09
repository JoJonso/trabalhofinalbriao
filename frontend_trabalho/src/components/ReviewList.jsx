import { useEffect, useState } from "react";
import { getReviews, updateReview, deleteReview } from "../services/reviewApi";

export default function ReviewList({ refreshTrigger }) {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedReview, setEditedReview] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  // Carrega todas as reviews
  const loadReviews = async () => {
    const data = await getReviews();
    setReviews(data);
    setEditingId(null);
  };

  useEffect(() => {
    loadReviews();
  }, [refreshTrigger]);

  // Começar edição
  const startEdit = (review) => {
    setEditingId(review.id);
    setEditedReview(review.review);
    setEditedRating(review.rating);
  };

  // Cancelar edição
  const cancelEdit = () => {
    setEditingId(null);
    setEditedReview("");
    setEditedRating(0);
  };

  // Salvar edição
  const saveEdit = async (id) => {
    if (!editedReview || editedRating < 0 || editedRating > 5) return;

    await updateReview(Number(id), { review: editedReview, rating: editedRating });
    loadReviews(); // Atualiza lista
  };

  
  const handleDelete = async (id) => {
    if (confirm("Deseja realmente deletar esta review?")) {
      await deleteReview(Number(id));
      loadReviews(); // Atualiza lista
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px" }}>
      <h2>Minhas Reviews</h2>
      {reviews.length === 0 ? <p>Nenhuma review ainda.</p> :
        reviews.map(r => (
          <div key={r.id} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
            <img
              src={r.gameThumb}
              width={50}
              alt={r.gameName}
              style={{ verticalAlign: "middle", marginRight: "10px" }}
            />
            <strong>{r.gameName}</strong>

            {editingId === r.id ? (
              <>
                <div style={{ marginTop: "5px" }}>
                  <textarea
                    value={editedReview}
                    onChange={(e) => setEditedReview(e.target.value)}
                    rows={2}
                    style={{ width: "100%" }}
                  />
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={editedRating}
                    onChange={(e) => setEditedRating(Number(e.target.value))}
                    style={{ width: "50px", marginTop: "5px" }}
                  />
                  <div style={{ marginTop: "5px" }}>
                    <button onClick={() => saveEdit(r.id)}>Salvar</button>
                    <button onClick={cancelEdit} style={{ marginLeft: "5px" }}>Cancelar</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p>{r.review}</p>
                <p>Nota: {r.rating}/5</p>
                <button onClick={() => startEdit(r)}>Editar</button>
                <button onClick={() => handleDelete(r.id)} style={{ marginLeft: "5px" }}>Excluir</button>
              </>
            )}
          </div>
        ))
      }
    </div>
  );
}
