import React, { useState, useEffect } from "react";
import img1 from "../assets/differences/aladdin.png"; // immagine caricata

// Differenze con coordinate e raggio 20
const differences = [
  { id: 1, x: 264, y: 135, r: 20 },
  { id: 2, x: 456, y: 321, r: 20 },
  { id: 3, x: 153, y: 476, r: 20 },
  { id: 4, x: 231, y: 198, r: 20 },
  { id: 5, x: 438, y: 211, r: 20 },
];

export default function SpotDiff() {
  const [scores, setScores] = useState({ p1: 0, p2: 0 });
  const [turn, setTurn] = useState(1);
  const [found, setFound] = useState([]);
  const [done, setDone] = useState(false);

  const ROBOT_URL = "http://<ROBOT_IP>:5000/activity_done";

  const handleClick = (e) => {
    if (done) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const diff = differences.find(
      (d) =>
        !found.includes(d.id) &&
        Math.hypot(d.x - x, d.y - y) < d.r
    );

    if (diff) {
      setFound([...found, diff.id]);
      setScores((prev) => ({
        ...prev,
        [`p${turn}`]: prev[`p${turn}`] + 1,
      }));
    }

    // cambio turno
    setTurn(turn === 1 ? 2 : 1);
  };

  useEffect(() => {
    if (found.length === differences.length) {
      setDone(true);
      notifyComplete();
    }
  }, [found]);

  const notifyComplete = async () => {
    try {
      await fetch(ROBOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: "spot_diff" }),
      });
    } catch (err) {
      console.error("Errore invio al robot:", err);
    }
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: 40 }}>
        <h2>🎉 Partita finita!</h2>
        <p>
          Player 1: {scores.p1} | Player 2: {scores.p2}
        </p>
        <h3>
          Vincitore:{" "}
          {scores.p1 > scores.p2
            ? "Player 1"
            : scores.p2 > scores.p1
            ? "Player 2"
            : "Pareggio!"}
        </h3>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      <h1>🔍 Trova le differenze</h1>
      <p>
        Turno: Player {turn} | Player 1: {scores.p1} | Player 2: {scores.p2}
      </p>

      {/* Mostro la stessa immagine due volte (versione sopra e sotto) */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <img
          src={img1}
          alt="Immagine Spot the Difference"
          style={{ maxWidth: "600px", cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
