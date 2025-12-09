import axios from "axios";

const reviewAPI = axios.create({ baseURL: "http://localhost:3000/reviews" });

export const getReviews = async () => {
  const res = await reviewAPI.get("/");
  return res.data;
};

export const createReview = async (review) => {
  const res = await reviewAPI.post("/", review);
  return res.data;
};

export const updateReview = async (id, review) => {
  const res = await reviewAPI.put(`/${Number(id)}`, review);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await reviewAPI.delete(`/${Number(id)}`);
  return res.data;
};