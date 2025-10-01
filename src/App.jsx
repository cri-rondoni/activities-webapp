import { BrowserRouter, Routes, Route } from "react-router-dom";
import Walk from "./components/Walk.jsx";
import Breath from "./components/Breath.jsx";
import NeckStretch from "./components/NeckStretch.jsx";
import SpinalTwist from "./components/SpinalTwist.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/walk" element={<Walk />} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/neck-stretch" element={<NeckStretch />} />
        <Route path="/spinal-twist" element={<SpinalTwist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
