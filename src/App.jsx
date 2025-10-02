import SpotDiff from "./components/SpotDiff";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/walk" element={<Walk />} />
        <Route path="/breath" element={<Breath />} />
        <Route path="/stretch" element={<Stretch />} />
        <Route path="/spotdiff" element={<SpotDiff />} /> {/* 👈 nuova route */}
      </Routes>
    </BrowserRouter>
  );
}
