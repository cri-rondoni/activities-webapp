//import React, { useState, useEffect } from "react";
import neckImg from "../stretch/neck_side.png"; // immagine dentro src/stretch

export default function NeckStretch() {
  const DURATION = 60; 
  const [seconds, setSeconds] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    if (seconds < DURATION) {
      const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(interval);
    } else {
      setDone(true);
    }
  }, [seconds, done]);

  return (
    <div
      style={{
        background: "#f9f9f9",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
        padding: "20px",
        textAlign: "center",
      }}
    >
      {!done ? (
        <>
          <h1>🧘 Neck Side Stretch</h1>
          <img
            src={neckImg}
            alt="Neck Side Stretch"
            style={{ maxWidth: "300px", margin: "20px 0" }}
          />
          <div
            style={{
              maxWidth: "500px",
              fontSize: "18px",
              lineHeight: "1.6",
              textAlign: "left",
            }}
          >
            <p>• Sit upright in your chair, shoulders relaxed.</p>
            <p>• Gently tilt your right ear toward your right shoulder.</p>
            <p>
              • For a deeper stretch, place your right hand lightly on the left
              side of your head — no pulling, just the weight.
            </p>
            <p>• Hold for 5–8 breaths, then switch sides.</p>
          </div>
          <h3 style={{ marginTop: "20px" }}>
            Time: {seconds}/{DURATION} s
          </h3>
        </>
      ) : (
        <h2>✅ Well done! Stretch completed.</h2>
      )}
    </div>
  );
}
