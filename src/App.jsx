import { useEffect, useState, useRef } from "react";
import gilmara from "./assets/images/gilmara.png";
import ocnalb from "./assets/images/ocnalb.png";  
import hopeSerin from "./assets/images/hopeSerin.png";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

function App() {
  const [personagens, setPersonagens] = useState(1);
  const [finalizacao, setFinalizacao] = useState(1);
  const [tamanho, setTamanho] = useState(1);
  const parallaxRef = useRef(null);
  const total = personagens * finalizacao * tamanho;

  // Definição de estilos para facilitar o reuso
  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };
  const crimsonStyle = { fontFamily: "'Crimson Pro', serif" };
  const antonStyle = { fontFamily: "'Anton', sans-serif" };

  return (
    <Parallax pages={3} ref={parallaxRef}>
      
      <div className="fixed inset-0 -z-20 bg-[#0a0a0c]" />

      {/* 🔥 HERO SECTION */}
      <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: 10 }}>
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 
            className="text-[64px] tracking-widest uppercase mb-4 text-white"
            style={antonStyle}
          >
            Bem vindo ao Artfight (ODV Edition)
          </h1>

          <p 
            className="text-[24px] text-gray-400 mb-[21px] max-w-2xl"
            style={crimsonStyle}
          >
            Onde os de verdade se reunem para desenhar os personagens uns dos outros.
          </p>  

          <div className="flex gap-4">
            <button
              onClick={() => parallaxRef.current?.scrollTo(2)}
              className="bg-[#444444] hover:bg-[#555555] w-[196px] h-[48px] text-[24px] rounded-[12px] text-white transition-all"
              style={bebasStyle}
            >
              Registrar Ataque
            </button>

            <button
              className="bg-[#201E27] hover:bg-[#2a2833] border border-white/25 w-[255px] h-[48px] text-[24px] rounded-[12px] text-white transition-all"
              style={bebasStyle}
            >
              Visualizar últimos ataques
            </button>
          </div>
        </section>
      </ParallaxLayer>

      {/* 🌌 DECORATIVE ELEMENTS (Layer 0) */}
      <ParallaxLayer offset={0} speed={0.2} style={{ zIndex: 1 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/10 rotate-45 blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rotate-45 blur-xl" />
          <div className="absolute top-40 left-[20%] w-20 h-20 bg-white/10 rotate-45" />
        </div>
      </ParallaxLayer>

      {/* 🎮 GALLERY SECTION (Layer 1) */}
      <ParallaxLayer offset={1} speed={0.3}>
        <section className="relative h-screen flex items-center justify-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-20 left-10 rotate-[-10deg] opacity-80 hover:opacity-100 transition-opacity">
              <img src={gilmara} className="w-48" alt="Arte Gilmara" />
            </div>
            <div className="absolute top-40 right-10 rotate-[10deg] opacity-80 hover:opacity-100 transition-opacity">
              <img src={ocnalb} className="w-52" alt="Arte Ocnalb" />
            </div>
            <div className="absolute bottom-20 left-20 rotate-[-5deg] opacity-80 hover:opacity-100 transition-opacity">
              <img src={hopeSerin} className="w-56" alt="Arte Hope Serin" />
            </div>
          </div>
          <h2 className="text-white text-4xl opacity-20 uppercase tracking-[2em]" style={bebasStyle}>Galeria</h2>
        </section>
      </ParallaxLayer>

      {/* 📌 REGISTRO SECTION (Layer 2) */}
      <ParallaxLayer offset={2} speed={0.3}>
        <section id="registro" className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
          
          <h1 
            className="text-[86px] text-[#EAEAF0] mb-10 text-center leading-tight" 
            style={bebasStyle}
          >
            ART FIGHT ODV EDITION
          </h1>

          <div className="flex flex-col md:flex-row gap-6 bg-[#181825] p-8 rounded-3xl border border-[#2a2a3a] shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-5xl w-full">

            {/* ÁREA DE UPLOAD */}
            <div className="flex-[1.5] bg-[#11111d] rounded-2xl border-2 border-dashed border-[#2a2a40] flex flex-col items-center justify-center p-10 cursor-pointer hover:border-purple-500/50 transition-colors">
              <span className="text-xs text-gray-400 mb-6 tracking-widest uppercase" style={bebasStyle}>
                [ ARRASTE OU CLIQUE AQUI PARA ENVIAR SUA ARTE ]
              </span>
              {/* Substitua pelo preview real se tiver */}
              <img src={hopeSerin} className="w-64 drop-shadow-2xl" alt="Preview" />
            </div>

            {/* PAINEL DE PONTOS */}
            <div className="flex-1 flex flex-col items-center justify-between py-2">
              <div className="text-center">
                <span className="text-xs text-gray-500 uppercase tracking-widest block mb-2">Registrar novo ataque</span>
                <span className="text-[100px] leading-none font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {total}
                </span>
                <span className="text-xl text-gray-400 uppercase block" style={bebasStyle}>Pontos</span>
              </div>

              <div className="w-full space-y-4 mt-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 block text-center">Quem está sendo atacado?</label>
                  <input
                    placeholder="NOME DO PERSONAGEM"
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-3 text-white text-center text-xs rounded-md focus:border-purple-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 block text-center" style={bebasStyle}>Cenário</label>
                  <select
                    value={finalizacao}
                    onChange={(e) => setFinalizacao(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-3 text-white text-center text-xs rounded-md focus:border-purple-900 shadow-[0_0_10px_rgba(88,28,135,0.1)] outline-none"
                  >
                    <option value={10}>Fundo Simples (+10)</option>
                    <option value={50}>Cenário Completo (+50)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-gray-500 block text-center" style={bebasStyle}>Pintura</label>
                  <select
                    value={tamanho}
                    onChange={(e) => setTamanho(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-3 text-white text-center text-xs rounded-md focus:border-purple-500 outline-none"
                  >
                    <option value={1}>Flat Color (x1)</option>
                    <option value={2}>Renderizado (x2)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <button 
            className="mt-12 bg-[#8b7df0] hover:bg-[#7a6ce0] text-[#111] text-[42px] px-20 py-3 rounded-2xl transition-all shadow-[0_0_30px_rgba(139,125,240,0.4)] active:scale-95"
            style={bebasStyle}
          >
            ENVIAR ATAQUE
          </button>
        </section>
      </ParallaxLayer>

    </Parallax>
  );
}

export default App;