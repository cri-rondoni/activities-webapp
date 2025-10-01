import React, { useState } from "react";
import Walk from "./components/Walk";

// 👉 in futuro aggiungerai qui altre attività
export default function App() {
  const [activity, setActivity] = useState("walk"); // default: walk

  return (
    <div>
      {activity === "walk" && <Walk />}
      {/* es. {activity === "stretch" && <Stretch />} */}
    </div>
  );
}
