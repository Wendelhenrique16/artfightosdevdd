import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth.jsx";
import Home from "./pages/home.jsx";
import Galeria from "./pages/galeria.jsx";
import Perfil from "./pages/perfil.jsx";
import Artistas from "./pages/Artistas";
import PerfilPublico from "./pages/PerfilPublico";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/perfil/:id" element={<PerfilPublico />} />
        <Route path="/artistas" element={<Artistas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;