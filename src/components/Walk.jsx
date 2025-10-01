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

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
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
        <h2>✅ Well done! Activity completed.</h2>
      )}
    </div>
  );
}
