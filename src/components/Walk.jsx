import React, { useState, useEffect } from "react";

export default function Walk() {
  const DURATION = 120; // secondi
  const [seconds, setSeconds] = useState(0);
  const [steps, setSteps] = useState(0);
  const [done, setDone] = useState(false);

  const ROBOT_URL = "http://<ROBOT_IP>:5000/activity_done";
  const STEPS_URL = "http://<ROBOT_IP>:5000/get_steps";

  // Timer principale
  useEffect(() => {
    if (done) return;

    if (seconds < DURATION) {
      const interval = setInterval(async () => {
        setSeconds((s) => s + 1);

        try {
          const res = await fetch(STEPS_URL);
          const data = await res.json();
          setSteps(data.steps);
        } catch (err) {
          console.error("Errore fetch steps:", err);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleComplete();
    }
  }, [seconds, done]);

  const handleComplete = async () => {
    setDone(true);
    try {
      await fetch(ROBOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: "walk" }),
      });
      console.log("Notifica inviata al robot");
    } catch (err) {
      console.error("Errore invio al robot:", err);
    }
  };

  // progress %
  const progress = (seconds / DURATION) * 100;

  return (
    <div
      style={{
        background: "#f5f7fa",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "40px",
          maxWidth: "400px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        {!done ? (
          <>
            <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>🚶 Camminata guidata</h1>
            <p style={{ fontSize: "18px", color: "#444" }}>
              Tempo: <b>{seconds}</b> / {DURATION} s
            </p>
            <div
              style={{
                background: "#e0e0e0",
                borderRadius: "10px",
                overflow: "hidden",
                margin: "15px 0",
              }}
            >
              <div
                style={{
                  height: "14px",
                  width: `${progress}%`,
                  background: "#4a90e2",
                  transition: "width 1s linear",
                }}
              />
            </div>
            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              Contapassi: <b>{steps}</b>
            </p>
            <button
              onClick={handleComplete}
              style={{
                padding: "12px 24px",
                fontSize: "18px",
                background: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              ✅ Completato
            </button>
          </>
        ) : (
          <h2 style={{ color: "#2ecc71" }}>🎉 Well done! Activity completed.</h2>
        )}
      </div>
    </div>
  );
}
