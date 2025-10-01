//import React, { useEffect, useState } from "react";

export default function Breath() {
  const DURATION = 120;             // durata attività complessiva (sec)
  const INHALE_MS = 4000;
  const HOLD_MS   = 4000;
  const EXHALE_MS = 4000;

  const [seconds, setSeconds] = useState(0);
  const [phase, setPhase] = useState("hold2"); // parto piccolo ma vado SUBITO a inhale
  const [scale, setScale] = useState(1.0);     // 1.0 = piccolo, 1.5 = grande
  const [transitionMs, setTransitionMs] = useState(0);
  const [done, setDone] = useState(false);

  // Endpoint ROS (sostituisci IP quando provi su robot)
  const ROBOT_URL = "http://<ROBOT_IP>:5000/activity_done";
  // per test locale: const ROBOT_URL = "http://localhost:5000/activity_done";

  // Timer complessivo attività
  useEffect(() => {
    if (done) return;
    if (seconds < DURATION) {
      const id = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(id);
    } else {
      handleComplete();
    }
  }, [seconds, done]);

  // Ciclo respirazione: inhale → hold1 → exhale → hold2 → loop
  useEffect(() => {
    if (done) return;

    let cancelled = false;
    const timers = [];

    const startCycle = () => {
      if (cancelled) return;

      // INHALE: parto piccolo e cresco SUBITO
      setPhase("inhale");
      setTransitionMs(INHALE_MS);
      setScale(1.0);                      // assicuro stato piccolo...
      requestAnimationFrame(() => {       // ...poi faccio partire la transizione a grande
        setScale(1.5);
      });

      // HOLD1: resta grande, nessuna transizione
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase("hold1");
        setTransitionMs(0);
        setScale(1.5); // fermo grande
      }, INHALE_MS));

      // EXHALE: torna piccolo con transizione
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase("exhale");
        setTransitionMs(EXHALE_MS);
        setScale(1.0);
      }, INHALE_MS + HOLD_MS));

      // HOLD2: resta piccolo, nessuna transizione
      timers.push(setTimeout(() => {
        if (cancelled) return;
        setPhase("hold2");
        setTransitionMs(0);
        setScale(1.0); // fermo piccolo
      }, INHALE_MS + HOLD_MS + EXHALE_MS));

      // Ricomincia il ciclo
      timers.push(setTimeout(() => {
        if (cancelled || done) return;
        startCycle();
      }, INHALE_MS + HOLD_MS + EXHALE_MS + HOLD_MS));
    };

    startCycle();
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [done]);

  const handleComplete = async () => {
    setDone(true);
    try {
      await fetch(ROBOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: "breath" }),
      });
    } catch (err) {
      console.error("Errore invio al robot:", err);
    }
  };

  const circleStyle = {
    transform: `scale(${scale})`,
    transition: transitionMs ? `transform ${transitionMs}ms ease-in-out` : "none",
  };

  const phaseLabel =
    phase === "inhale" ? "Inhale" : phase === "exhale" ? "Exhale" : "Hold";

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
          <div style={{ position: "relative", width: 250, height: 250 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  margin: "auto",
                  width: 200 - i * 40,
                  height: 200 - i * 40,
                  borderRadius: "50%",
                  backgroundColor: "rgba(135,206,250,0.6)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: i === 0 ? 28 : 0, // testo solo al centro
                  fontWeight: "bold",
                  color: "#001",
                  ...circleStyle,
                }}
              >
                {i === 0 && phaseLabel}
              </div>
            ))}
          </div>

          <h3 style={{ marginTop: 20 }}>
            Time: {seconds}/{DURATION} s
          </h3>
        </>
      ) : (
        <h2>✅ Well done! Activity completed.</h2>
      )}
    </div>
  );
}
