import React, { useEffect, useState } from "react";

export default function Breath() {
  const DURATION = 120; // secondi (2 minuti)
  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState("inhale"); // inhale | hold1 | exhale | hold2
  const [done, setDone] = useState(false);

  // URL del server ROS Flask
  const ROBOT_URL = "http://<ROBOT_IP>:5000/activity_done";
  // per test: const ROBOT_URL = "http://localhost:5000/activity_done";

  const phases = ["inhale", "hold1", "exhale", "hold2"];
  const phaseDuration = 4000; // 4 secondi per ogni fase

  // Timer principale → durata complessiva attività
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

  // Cambio fase ogni 4 secondi
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % phases.length;
      setPhase(phases[i]);
    }, phaseDuration);
    return () => clearInterval(interval);
  }, []);

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

  // Calcola scala in base alla fase
  const getScale = (phase) => {
    switch (phase) {
      case "inhale":
      case "hold1":
        return 1.5; // grande
      case "exhale":
      case "hold2":
      default:
        return 1.0; // piccolo
    }
  };

  const scale = getScale(phase);

  // Se siamo in inhale o exhale → transizione animata
  // Se siamo in hold → fermo
  const getStyle = (phase, scale) => {
    const base = {
      transform: `scale(${scale})`,
    };

    if (phase === "inhale" || phase === "exhale") {
      return { ...base, transition: "transform 4s ease-in-out" };
    }
    return { ...base, transition: "none" };
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
          {/* Tre cerchi concentrici */}
          <div style={{ position: "relative", width: "250px", height: "250px" }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  margin: "auto",
                  width: `${200 - i * 40}px`,
                  height: `${200 - i * 40}px`,
                  borderRadius: "50%",
                  backgroundColor: "rgba(135,206,250,0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: i === 0 ? "28px" : "0px", // testo solo al centro
                  fontWeight: "bold",
                  color: "#001",
                  ...getStyle(phase, scale),
                }}
              >
                {i === 0 &&
                  (phase === "inhale"
                    ? "Inhale"
                    : phase === "exhale"
                    ? "Exhale"
                    : "Hold")}
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: "20px" }}>
            Time: {seconds}/{DURATION} s
          </h3>
        </>
      ) : (
        <h2>✅ Well done! Activity completed..</h2>
      )}
    </div>
  );
}
