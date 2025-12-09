import axios from "axios";

const gameAPI = axios.create({ baseURL: "http://localhost:3000/games" });

export const getGames = async () => {
  const res = await gameAPI.get("/");
  return res.data;
};
