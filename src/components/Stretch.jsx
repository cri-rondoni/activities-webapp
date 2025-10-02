import React, { useState } from "react";
import neckSide from "../assets/neck_stretch.png"; // <-- immagine da caricare

const exercises = [
  {
    id: "neck-side-stretch",
    title: "Neck Side Stretch",
    image: neckSide,
    instructions: `
Sit upright in your chair, shoulders relaxed.
Gently tilt your right ear toward your right shoulder.
For a deeper stretch, place your right hand lightly on the left side of your head — no pulling, just the weight.
Hold for 5–8 breaths, then switch sides.
    `,
    duration: 30, // secondi
  },
  // In futuro puoi aggiungere altri esercizi qui 👇
  // {
  //   id: "shoulder-roll",
  //   title: "Shoulder Roll",
  //   image: shoulderRollImg,
  //   instructions: "...",
  //   duration: 20,
  // },
];

export default function Stretch() {
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);

  const exercise = exercises[current];

  const handleNext = () => {
    if (current < exercises.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setDone(true);
      notifyComplete();
    }
  };

  const notifyComplete = async () => {
    try {
      await fetch("http://<ROBOT_IP>:5000/activity_done", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activity: "stretch" }),
      });
    } catch (err) {
      console.error("Errore invio al robot:", err);
    }
  };

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>✅ Well done! Stretching completed.</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h1>🧘 Stretching Session</h1>
      <h2>{exercise.title}</h2>
      <img
        src={exercise.image}
        alt={exercise.title}
        style={{ maxWidth: "600px", margin: "20px auto", borderRadius: "12px" }}
      />
      <p style={{ whiteSpace: "pre-line", fontSize: "18px" }}>{exercise.instructions}</p>

      <button
        onClick={handleNext}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        {current < exercises.length - 1 ? "Next Exercise ➡️" : "Finish ✅"}
      </button>
    </div>
  );
}
