import React, { useState, useEffect } from "react";

export default function Walk() {
  const DURATION = 20; // secondi (mock). Metti 120 per 2 minuti
  const [seconds, setSeconds] = useState(0);
  const [steps, setSteps] = useState(0);
  const [done, setDone] = useState(false);

  // 👉 sostituisci con IP del robot (es: http://192.168.1.50:5000/activity_done)
  const ROBOT_URL = "http://<ROBOT_IP>:5000/activity_done";

  // per testare senza robot in locale
  // const ROBOT_URL = "http://localhost:5000/activity_done";

  useEffect(() => {
    if (done) return;

    if (seconds < DURATION) {
      const interval = setInterval(() => {
        setSeconds((s) => s + 1);
        setSteps((st) => st + Math.floor(Math.random() * 3) + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleComplete();
    }
  }, [seconds, done]);

  const handleComplete = async () => {
    setDone(true);
    try {
      await fetch(ROBOT_URL, { // per usarlo senza robot commentare da qui
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: "walk" }),
      });                       // a qui
      console.log("Notifica inviata al robot");
    } catch (err) {
      console.error("Errore invio al robot:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial", padding: "40px" }}>
      <h1>🚶 Camminata guidata</h1>
      {!done ? (
        <>
          <h2>Tempo: {seconds}/{DURATION} s</h2>
          <h3>Contapassi: {steps}</h3>
          <button
            onClick={handleComplete}
            style={{
              padding: "12px 24px",
              fontSize: "18px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            Completato
          </button>
        </>
      ) : (
        <h2>✅ Ben fatto! Attività completata.</h2>
      )}
    </div>
  );
}
