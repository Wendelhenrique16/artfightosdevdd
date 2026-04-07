import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth.jsx";
import Home from "./pages/home.jsx";
import Galeria from "./pages/galeria.jsx";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;