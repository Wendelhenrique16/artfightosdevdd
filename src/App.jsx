import { useEffect, useState } from "react";

function App() {
  const [personagens, setPersonagens] = useState(1);
  const [finalizacao, setFinalizacao] = useState(1);
  const [tamanho, setTamanho] = useState(1);

  const total = personagens * finalizacao * tamanho;

  // 🔥 PARALLAX
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;

      document.querySelector(".bg-layer")?.style.setProperty(
        "transform",
        `translateY(${y * 0.2}px)`
      );

      document.querySelector(".mid-layer")?.style.setProperty(
        "transform",
        `translateY(${y * 0.5}px)`
      );

      document.querySelector(".front-layer")?.style.setProperty(
        "transform",
        `translateY(${y * 0.9}px)`
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#000000] text-white overflow-x-hidden">

      {/* 🌌 GALAXIA */}
      <div className="fixed inset-0 -z-20 bg-[url('/galaxy.png')] bg-cover bg-center opacity-40" />

      {/* 🔥 HERO */}
      <section className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-widest uppercase mb-4">
          Bem vindo ao Artfight (ODV Edition)
        </h1>

        <div className="flex gap-4">
          <a href="#registro">
            <button className="bg-white/10 hover:bg-white/20 px-6 py-2 border border-white/20 text-sm">
              Registrar Ataque
            </button>
          </a>

          <button className="bg-white/10 hover:bg-white/20 px-6 py-2 border border-white/20 text-sm">
            Ver Ataques
          </button>
        </div>
      </section>

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

        {/* FRENTE (SUAS ARTES) */}
        <div className="front-layer absolute inset-0">

          <div className="absolute top-20 left-10 rotate-[-10deg]">
            <img src="/art1.png" className="w-32" />
          </div>

          <div className="absolute top-40 right-10 rotate-[10deg]">
            <img src="/art2.png" className="w-36" />
          </div>

          <div className="absolute bottom-20 left-20 rotate-[-5deg]">
            <img src="/art3.png" className="w-40" />
          </div>

          <div className="absolute bottom-10 right-10 rotate-[15deg]">
            <img src="/art4.png" className="w-28" />
          </div>

        </div>
      </section>

      {/* 🧾 REGISTRO (AGORA IGUAL AO SEU) */}
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
    </div>
  );
}

export default App;