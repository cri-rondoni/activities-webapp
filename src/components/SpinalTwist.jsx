//import React, { useState, useEffect } from "react";
import twistImg from "../stretch/twist.png"; // immagine dentro src/stretch

export default function SpinalTwist() {
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
          <h1>🪑 Spinal Twist</h1>
          <img
            src={twistImg}
            alt="Spinal Twist"
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
            <p>• Sit sideways in your chair or sit upright with feet grounded.</p>
            <p>• Place your right hand on the backrest or side of the chair.</p>
            <p>
              • Inhale to lengthen the spine, exhale, and gently twist to the
              right from your waist.
            </p>
            <p>• Hold for 5 breaths, then switch sides.</p>
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
