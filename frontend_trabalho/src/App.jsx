import { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import CreateReview from "./components/CreateReview";
import ReviewList from "./components/ReviewList";
import GameReview from "./components/GameReview";
import "./index.css";

function AppShell() {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((p) => p + 1);
  const location = useLocation();

  return (
    <div className="container">
      <header className="site-header">
        <div className="site-header-top">
          <div className="brand">Jonso Reviews</div>
          <div className="tagline">Trabalho de Back-End</div>
        </div>

        <div className="site-header-search">
          <CreateReview />
        </div>
      </header>

      <main className="main-content">
        <div className="card">
          <Routes location={location}>
            <Route
              index
              element={
                <div style={{ padding: 12 }}>
                  <p style={{ color: "var(--txt-muted)", marginTop: 0 }}>
                    Use o campo de pesquisa para achar um jogo.
                  </p>
                </div>
              }
            />
            <Route path="/games/:id" element={<GameReview onReviewCreated={triggerRefresh} />} />
          </Routes>
        </div>
      </main>

      <aside className="right-column">
        <div className="card right-card">
          <ReviewList refreshTrigger={refreshKey} />
        </div>
      </aside>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
