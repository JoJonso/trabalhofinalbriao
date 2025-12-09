import { useState } from "react";
import CreateReview from "./components/CreateReview";
import ReviewList from "./components/ReviewList";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <CreateReview onReviewCreated={triggerRefresh} />
      <ReviewList refreshTrigger={refreshKey} />
    </div>
  );
}
