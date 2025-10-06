import React, { useState } from "react";

export default function Rating({ activity }) {
  const [like, setLike] = useState(4);
  const [relax, setRelax] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    await fetch("/activity_done", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        activity,
        likeability: like,
        relaxation: relax,
      }),
    });
    setSubmitted(true);
  }

  if (submitted)
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>✅ Grazie per la valutazione!</h2>
      </div>
    );

  return (
    <div
      style={{
        textAlign: "center",
        paddingTop: "50px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>Grazie! Valuta la tua esperienza 👇</h2>

      <div style={{ margin: "40px" }}>
        <p><b>Quanto ti è sembrato simpatico/gradevole il robot durante l’attività?</b></p>
        <input
          type="range"
          min="1"
          max="7"
          value={like}
          onChange={(e) => setLike(Number(e.target.value))}
        />
        <div>😠 1 &nbsp;&nbsp; … &nbsp;&nbsp; 😊 7</div>
      </div>

      <div style={{ margin: "40px" }}>
        <p><b>Come ti senti ora?</b></p>
        <input
          type="range"
          min="1"
          max="7"
          value={relax}
          onChange={(e) => setRelax(Number(e.target.value))}
        />
        <div>😣 1 &nbsp;&nbsp; … &nbsp;&nbsp; 😌 7</div>
      </div>

      <button
        onClick={handleSubmit}
        style={{
          background: "#4CAF50",
          color: "white",
          padding: "12px 30px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Invia
      </button>
    </div>
  );
}
