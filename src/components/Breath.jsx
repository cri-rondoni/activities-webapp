import React, { useEffect, useState } from "react";

export default function Breath() {
  const DURATION = 120; // secondi (2 minuti)
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState("inhale"); // inhale o exhale
  const [scale, setScale] = useState(1);
  const [done, setDone] = useState(false);

  // URL del server ROS Flask
  const ROBOT_URL = "http://<ROBOT_IP>:5000/activity_done"; 
  // in locale: const ROBOT_URL = "http://localhost:5000/activity_done";

  // Timer principale
  useEffect(() => {
    if (done) return;

    if (seconds < DURATION) {
      const interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleComplete();
    }
  }, [seconds, done]);

  // Cambio fase ogni 3 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev === "inhale" ? "exhale" : "inhale"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Gestione animazione cerchio
  useEffect(() => {
    if (phase === "inhale") {
      setScale(1.5);
    } else {
      setScale(1.0);
    }
  }, [phase]);

  // Notifica a ROS che l’attività è completata
  const handleComplete = async () => {
    setDone(true);
    try {
      await fetch(ROBOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: "breath" }),
      });
      console.log("✅ Attività 'breath' completata, notificato al robot.");
    } catch (err) {
      console.error("Errore invio al robot:", err);
    }
  };

  return (
    <div
      style={{
        background: "#0a0a3c",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {!done ? (
        <>
          <div
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              backgroundColor: "skyblue",
              transform: `scale(${scale})`,
              transition: "transform 3s linear",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#001",
            }}
          >
            {phase === "inhale" ? "inhale" : "exhale"}
          </div>
          <h3 style={{ marginTop: "20px" }}>
            Tempo: {seconds}/{DURATION} s
          </h3>
        </>
      ) : (
        <h2>✅ Ben fatto! Attività completata.</h2>
      )}
    </div>
  );
}
