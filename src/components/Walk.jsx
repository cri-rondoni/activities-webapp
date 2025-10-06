import React, { useState, useEffect } from "react";
import Rating from "./Rating";

export default function Walk() {
  const DURATION = 120; // total activity duration in seconds
  const [seconds, setSeconds] = useState(0);
  const [steps, setSteps] = useState(0);
  const [completed, setCompleted] = useState(false);

  // 🔗 Replace with your robot's real IP address
  const ROBOT_IP = "<ROBOT_IP>"; // e.g. 192.168.1.42
  const STEPS_URL = `http://${ROBOT_IP}:5000/get_steps`;

  // ------------------------------
  // 🕒 Main timer logic
  // ------------------------------
  useEffect(() => {
    if (completed) return;

    const interval = setInterval(async () => {
      // Increment seconds every second
      setSeconds((s) => s + 1);

      // Fetch the number of steps from robot’s API
      try {
        const res = await fetch(STEPS_URL);
        const data = await res.json();
        setSteps(data.steps);
      } catch (err) {
        console.warn("Error fetching steps:", err);
      }
    }, 1000);

    // When time is up → mark as completed
    if (seconds >= DURATION) {
      clearInterval(interval);
      setCompleted(true);
    }

    return () => clearInterval(interval);
  }, [seconds, completed]);

  // Calculate progress bar percentage
  const progress = (seconds / DURATION) * 100;

  // ------------------------------
  // 🏁 When activity is completed
  // ------------------------------
  // Show the Godspeed + Affect Grid rating component
  if (completed) return <Rating activity="walk" />;

  // ------------------------------
  // 🏃 Guided Walk UI
  // ------------------------------
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
          width: "480px",
          textAlign: "center",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "10px" }}>🚶 Guided Walk</h1>

        {/* Time counter */}
        <p style={{ fontSize: "18px", color: "#444" }}>
          Time: <b>{seconds}</b> / {DURATION} s
        </p>

        {/* Progress bar */}
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

        {/* Step counter */}
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Step counter: <b>{steps}</b>
        </p>

        {/* Manual completion button */}
        <button
          onClick={() => setCompleted(true)}
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
          ✅ Completed
        </button>
      </div>
    </div>
  );
}
