import React, { useState } from "react";

export default function Rating({ activity }) {
  const [likeability, setLikeability] = useState(4);
  const [relaxation, setRelaxation] = useState(4);
  const [submitted, setSubmitted] = useState(false);

  const ROBOT_IP = "<ROBOT_IP>"; // e.g., 192.168.1.42
  const ROBOT_URL = `http://${ROBOT_IP}:5000/activity_done`;

  // Send data to robot when user submits
  const handleSubmit = async () => {
    try {
      await fetch(ROBOT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          activity: activity,
          likeability: likeability,
          relaxation: relaxation,
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Error sending data:", err);
    }
  };

  if (submitted)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Segoe UI, sans-serif",
          background: "#f5f7fa",
          flexDirection: "column",
        }}
      >
        <h1 style={{ color: "#2ecc71" }}>✅ Thank you for your feedback!</h1>
        <p style={{ fontSize: "20px", color: "#333" }}>
          Your response has been recorded.
        </p>
      </div>
    );

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
          padding: "50px",
          width: "650px",
          textAlign: "center",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ fontSize: "28px", marginBottom: "30px" }}>
          🙌 Thank you! Please rate your experience 👇
        </h1>

        {/* --- Likeability (Godspeed S3) --- */}
        <div style={{ marginBottom: "50px" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
            How friendly / pleasant did the robot seem during the activity?
          </h2>

          <input
            type="range"
            min="1"
            max="7"
            value={likeability}
            onChange={(e) => setLikeability(parseInt(e.target.value))}
            style={{ width: "80%", accentColor: "#4a90e2" }}
          />

          {/* Likert scale labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
              fontSize: "18px",
            }}
          >
            <span>😠 1</span>
            <span>😕 2</span>
            <span>😐 3</span>
            <span>🙂 4</span>
            <span>😀 5</span>
            <span>😊 6</span>
            <span>🤗 7</span>
          </div>

          <p style={{ fontSize: "16px", color: "#555", marginTop: "5px" }}>
            1 = Very unfriendly, 7 = Very friendly
          </p>
        </div>

        {/* --- User affective state --- */}
        <div style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "22px", marginBottom: "10px" }}>
            How do you feel right now?
          </h2>

          <input
            type="range"
            min="1"
            max="7"
            value={relaxation}
            onChange={(e) => setRelaxation(parseInt(e.target.value))}
            style={{ width: "80%", accentColor: "#4a90e2" }}
          />

          {/* Likert scale labels */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "5px",
              fontSize: "18px",
            }}
          >
            <span>😣 1</span>
            <span>😕 2</span>
            <span>😐 3</span>
            <span>🙂 4</span>
            <span>😌 5</span>
            <span>😊 6</span>
            <span>😄 7</span>
          </div>

          <p style={{ fontSize: "16px", color: "#555", marginTop: "5px" }}>
            1 = Very tense / uncomfortable, 7 = Very relaxed / happy
          </p>
        </div>

        <button
          onClick={handleSubmit}
          style={{
            padding: "14px 30px",
            fontSize: "20px",
            background: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            transition: "0.3s",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
