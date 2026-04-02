import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";



function Galeria() {
  const navigate = useNavigate();
  const [selectedArt, setSelectedArt] = useState(null); 
  const [ataques, setAtaques] = useState([]);

useEffect(() => {
  async function fetchAtaques() {
    const { data, error } = await supabase
      .from("ataques")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setAtaques(data);
  }

  fetchAtaques();
}, []);


  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };
  const antonStyle = { fontFamily: "'Anton', sans-serif" };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">
      {/* ⬅️ BOTÃO VOLTAR */}
      <button 
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition-all border border-white/10"
      >
        ← Voltar
      </button>

      {/* 🏆 TÍTULO PRINCIPAL */}
      <header className="text-center mb-12">
        <h1 className="text-[48px] tracking-wider uppercase" style={antonStyle}>
          Histórico de Ataques & Ranking
        </h1>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* 🖼️ COLUNA 1: GALERIA DETALHADA (GRID) */}
        <section className="lg:col-span-4 flex flex-col items-center">
          <h2 className="text-[28px] mb-4 uppercase" style={bebasStyle}>Galeria Detalhada</h2>
          <div className="bg-[#181825] border border-white/5 p-6 rounded-3xl w-full">
            <h3 className="text-center text-gray-400 text-sm mb-4 tracking-widest uppercase">Grid de Miniaturas</h3>
            
            {/* O Grid com Scroll */}
            <div className="grid grid-cols-3 gap-3 max-h-125 overflow-y-auto pr-2 custom-scrollbar">
              {/* Exemplo de item */}
              {ataques.map((ataque) => (
  <div
    key={ataque.id}
    onClick={() => setSelectedArt(ataque)}
    className="aspect-square bg-[#0a0a14] border border-white/10 rounded-xl hover:border-purple-500 cursor-pointer transition-all overflow-hidden"
  >
    <img
      src={ataque.imagem_url}
      className="w-full h-full object-cover"
    />
  </div>
))}
            </div>
          </div>
        </section>

        {/* 🔍 COLUNA 2: ATAQUE SELECIONADO (PREVIEW) */}
        <section className="lg:col-span-4 flex flex-col items-center">
          <h2 className="text-[28px] mb-4 uppercase" style={bebasStyle}>Ataque Selecionado</h2>
          <div className="bg-[#181825] border border-white/5 p-8 rounded-3xl w-full flex flex-col items-center shadow-2xl">
            
            {/* Moldura da Imagem */}
            <div className="w-full aspect-square bg-[#0a0a14] border border-white/10 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
              {selectedArt ? (
  <img
    src={selectedArt.imagem_url}
    className="w-full h-full object-contain"
  />
) : (
  <span className="text-gray-700 text-xs">Selecione uma arte</span>
)}

            </div>

            {/* Info do Ataque */}
{selectedArt && (
  <div className="text-center space-y-2 mb-8 text-[12px] text-gray-400 font-mono">
    <p>| Atacante | Atacado | Pontos |</p>
    <p className="text-white">
      | {selectedArt.atacante} | {selectedArt.atacado} | {selectedArt.pontos} |
    </p>
  </div>
)}

            <button className="w-full bg-[#6355ff] hover:bg-[#5244e0] py-4 rounded-xl text-[20px] transition-all uppercase shadow-lg shadow-purple-500/20" style={bebasStyle}>
              Visualizar Arte Completa
            </button>
          </div>
        </section>

        {/* 📊 COLUNA 3: RANKING GLOBAL */}
        <section className="lg:col-span-4 flex flex-col items-center">
          <h2 className="text-[28px] mb-4 uppercase" style={bebasStyle}>Ranking Global</h2>
          
          {/* Tabela de Ranking */}
          <div className="bg-[#181825] border border-white/5 p-6 rounded-3xl w-full mb-6">
            <table className="w-full text-center text-sm">
              <thead className="text-gray-500 uppercase text-[10px] tracking-widest">
                <tr className="border-b border-white/5">
                  <th className="pb-4">Posição</th>
                  <th className="pb-4">Artistas</th>
                  <th className="pb-4">Pontos</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[1, 2, 3].map((pos) => (
                  <tr key={pos} className="border-b border-white/5 last:border-0">
                    <td className="py-4 font-bold">{pos}</td>
                    <td className="py-4 text-gray-400">Artista{pos}</td>
                    <td className="py-4 font-mono">455</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Últimos Pontos */}
          <div className="bg-[#181825] border border-white/5 p-6 rounded-3xl w-full">
            <h3 className="text-center text-gray-400 text-[10px] tracking-widest uppercase mb-4">Últimos Pontos Registrados</h3>
            <div className="space-y-2 font-mono text-[10px] text-gray-500 text-center">
              {[...Array(6)].map((_, i) => (
                <p key={i}>[ @artista1: SELECIONAR + ] → +2 pontos</p>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Galeria;