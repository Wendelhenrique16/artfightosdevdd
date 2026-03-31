import { useEffect, useState } from "react";
import gilmara from "./assets/images/gilmara.png";
import ocnalb from "./assets/images/ocnalb.png";  
import hopeSerin from "./assets/images/hopeSerin.png";
import galaxy from "./assets/images/galaxy.png";  
import { animate } from "framer-motion";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";


function App() {
  const [personagens, setPersonagens] = useState(1);
  const [finalizacao, setFinalizacao] = useState(1);
  const [tamanho, setTamanho] = useState(1);
  const parallaxRef = useRef();
  const total = personagens * finalizacao * tamanho;

  return (
  <Parallax pages={3} ref={parallaxRef}>
      {/* 🌌 GALAXIA */}
      <div className="fixed inset-0 -z-20 bg-[url('/galaxy.png')] bg-cover bg-center opacity-40" />
<ParallaxLayer offset={0} speed={0.5}>
      {/* 🔥 HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
       <h1 
  className="text-[64px] tracking-widest uppercase mb-4"
  style={{ fontFamily: 'Anton, sans-serif' }}
>
          Bem vindo ao Artfight (ODV Edition)
        </h1>
        <p className="text-[24px] text-gray-400 mb-[21px]"
          style={{ fontFamily: 'Crimson Pro, serif' }}>
          Onde os de verdade se reunem para desenhar os personagens uns dos outros.
        </p>  

        <div className="flex gap-4">
          <a href="#registro">
<button
  onClick={() => {
    const elemento = document.getElementById("registro");
    if (elemento) {
      const top = elemento.offsetTop;
      animate(window.scrollY, top, {
        type: "tween",
        duration: 2, 
        ease: "easeInOut",
        onUpdate: (latest) => window.scrollTo(0, latest),
      });
    }
  }}
  className="bg-[#444444] hover:bg-[#555555] w-[196px] h-[42px] text-[24px] rounded-[12px]"
  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
>
  Registrar Ataque
</button>
          </a>

<button
  className="bg-[#201E27] hover:bg-[#2a2833] 
             border border-white/25 
             w-[255px] h-[42px]
             text-[24px] 
             rounded-[12px]
             flex items-center justify-center
             transition-colors duration-200"
  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
>
  Visualizar ultimos ataques
</button>
        </div>
      </section>
      </ParallaxLayer>
<ParallaxLayer offset={0} speed={0} factor={3}>
  <div className="fixed inset-0 bg-[url('/galaxy.png')] bg-cover opacity-40" />
</ParallaxLayer>
      {/* 🎮 PARALLAX SCROLL */}
      <section className="relative h-[120vh] overflow-hidden">

        {/* FUNDO */}
        <div className="bg-layer absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/10 rotate-45 blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rotate-45 blur-xl" />
        </div>

        {/* MEIO */}
        <div className="mid-layer absolute inset-0">
          <div className="absolute top-40 left-[20%] w-20 h-20 bg-white/10 rotate-45" />
          <div className="absolute bottom-40 right-[30%] w-24 h-24 bg-white/10 rotate-45" />
        </div>

        {/* FRENTE  */}
        <div className="front-layer absolute inset-0">

          <div className="absolute top-20 left-10 rotate-[-10deg]">
            <img src={gilmara} className="w-32" />
          </div>

          <div className="absolute top-40 right-10 rotate-[10deg]">
            <img src={ocnalb} className="w-36" />
          </div>

          <div className="absolute bottom-20 left-20 rotate-[-5deg]">
            <img src={hopeSerin} className="w-40" />
          </div>

          <div className="absolute bottom-10 right-10 rotate-[15deg]">
            <img src="/art4.png" className="w-28" />
          </div>

        </div>
      </section>

  
      <section
        id="registro"
        className="flex flex-col items-center justify-center py-20 px-4"
      >

        <h1 className="text-4xl font-bold tracking-widest mb-10 uppercase">
          Art Fight ODV Edition
        </h1>

        <div className="flex gap-6 bg-[#1B2038] p-6 rounded-2xl border border-white/10 shadow-[0_0_40px_rgba(124,92,255,0.2)] max-w-5xl w-full">

          {/* ESQUERDA */}
          <div className="flex-1 bg-gradient-to-br from-[#1B2038] to-[#14182c] rounded-xl border border-purple-500/20 flex flex-col items-center justify-center p-6">

            <span className="text-xs text-gray-400 mb-4 tracking-widest">
              [ ARRASTE OU CLIQUE AQUI PARA ENVIAR SUA ARTE ]
            </span>

            <img src="/art1.png" className="w-48" />
          </div>

          {/* DIREITA */}
          <div className="w-64 bg-[#14182c] rounded-xl border border-white/10 p-4 flex flex-col items-center">

            <span className="text-xs text-gray-400 uppercase">
              Registrar novo ataque
            </span>

            <span className="text-6xl font-black mt-2">{total}</span>
            <span className="text-sm text-gray-400 mb-4">Pontos</span>

            <div className="w-full space-y-3">

              <input
                placeholder="Quem está sendo atacado?"
                className="w-full bg-black/40 border border-white/10 p-2 text-xs"
              />

              <select
                value={finalizacao}
                onChange={(e) => setFinalizacao(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 p-2 text-xs"
              >
                <option value={1}>Cenário</option>
                <option value={2}>Completo</option>
              </select>

              <select
                value={tamanho}
                onChange={(e) => setTamanho(Number(e.target.value))}
                className="w-full bg-black/40 border border-white/10 p-2 text-xs"
              >
                <option value={1}>Pintura simples</option>
                <option value={2}>Detalhado</option>
              </select>

            </div>
          </div>
        </div>

        <button className="mt-8 bg-[#7C5CFF] hover:bg-[#6a4de0] px-10 py-4 text-xl font-bold rounded-xl">
          ENVIAR ATAQUE
        </button>
      </section>
    </Parallax>
  );
}

export default App;