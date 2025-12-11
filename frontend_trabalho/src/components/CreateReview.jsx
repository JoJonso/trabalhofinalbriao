import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { getGames } from "../services/gameApi";

function normalizeText(s = "") {
  return (s + "")
    .normalize?.("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase() || (s + "").toLowerCase();
}

function isSubsequence(query, text) {
  let i = 0;
  let j = 0;
  while (i < query.length && j < text.length) {
    if (query[i] === text[j]) i++;
    j++;
  }
  return i === query.length;
}

export default function CreateReview() {
  const [games, setGames] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;
    getGames().then((data) => {
      if (mounted) setGames(data || []);
    });
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    if (location.pathname === "/") setInput("");
  }, [location.pathname]);

  const filtered = useMemo(() => {
    const q = normalizeText(input).trim();
    if (!q) return [];
    const tokens = q.split(/\s+/).filter(Boolean);
    return games
      .filter((g) => {
        const t = normalizeText(g.title || "");
        if (t.includes(q)) return true;
        if (isSubsequence(q, t)) return true;
        return tokens.every((tk) => t.includes(tk));
      })
      .slice(0, 8);
  }, [games, input]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    e.preventDefault();
    const q = (input || "").trim();
    if (!q) {
      navigate("/");
      return;
    }
    const exact = filtered.find((g) => normalizeText(g.title || "") === normalizeText(q));
    const pick = exact || filtered[0];
    if (pick && pick.id) navigate(`/games/${pick.id}`);
  };

  return (
    <div style={{ width: "100%" }}>
      <Autocomplete
        options={filtered}
        getOptionLabel={(option) => option.title || ""}
        onChange={(e, value) => {
          if (value && value.id) navigate(`/games/${value.id}`);
        }}
        inputValue={input}
        onInputChange={(e, v) => setInput(v)}
        noOptionsText="Nenhum jogo encontrado"
        openOnFocus={false}
        filterOptions={(opts) => opts}
        renderOption={(props, option) => (
          <li {...props} style={{ display: "flex", gap: 12, alignItems: "center", padding: "6px 8px" }}>
            <img src={option.cover_image} alt={option.title} style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 8, background: "#2a2d34" }} />
            <div style={{ textAlign: "left", minWidth: 0 }}>
              <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{option.title}</div>
              <div style={{ fontSize: 12, color: "var(--txt-muted)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {option.genre} {option.release_date ? "• " + new Date(option.release_date).toLocaleDateString() : ""}
              </div>
            </div>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Procure jogos"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              style: { background: "var(--bg-accent)", color: "var(--txt)", borderRadius: 10, paddingRight: 8 },
            }}
            inputProps={{
              ...params.inputProps,
              style: { color: "var(--txt)" },
            }}
            fullWidth
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        )}
        sx={{ width: "100%" }}
      />
    </div>
  );
}
