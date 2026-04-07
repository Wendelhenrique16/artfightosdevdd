import { useEffect, useState, useRef } from "react";
import { supabase } from "../utils/supabase";
import gilmara from "../assets/images/gilmara.png";
import ocnalb from "../assets/images/ocnalb.png";
import hopeSerin from "../assets/images/hopeSerin.png";
import hector from "../assets/images/hector.png";
import chester from "../assets/images/chester.png";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useNavigate } from "react-router-dom";
import siena from "../assets/images/siena.png";
import stevey from "../assets/images/stevey.png";
import satoshi from "../assets/images/satoshisangue.png";
import noah from "../assets/images/noah.png";



function App() {
  const [fogoAmigoQtd, setFogoAmigoQtd] = useState(0);
  const [personagens, setPersonagens] = useState(1);
  const [finalizacao, setFinalizacao] = useState(1);
  const [doodles, setDoodles] = useState(0);
  const [cenario, setCenario] = useState(1);
  const [tamanho, setTamanho] = useState(1);
  const parallaxRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const base = (finalizacao * tamanho) + cenario;
  const [user, setUser] = useState(null);
  const personagensNormais = personagens - fogoAmigoQtd;

  const total =
    (personagensNormais * base) +
    (fogoAmigoQtd * (base / 2)) +
    doodles;
  const [file, setFile] = useState(null);
  const [atacado, setAtacado] = useState("");
  const navigate = useNavigate();
  const fakeTimes = ["ODV", "RIVAL"];
  const time = fakeTimes[Math.floor(Math.random() * fakeTimes.length)];



  // Definição de estilos para facilitar o reuso
  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };
  const crimsonStyle = { fontFamily: "'Crimson Pro', serif" };
  const antonStyle = { fontFamily: "'Anton', sans-serif" };

  // AUTH
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);
  async function signUp(email, password, username, time) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username, time }
      }
    });

    if (error) alert(error.message);
    return data;
  }

  async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) alert(error.message);
    return data;
  }


  async function handleSubmit() {
    if (!user) {
      alert("Você precisa estar logado!");
      return;
    }
    if (!file) {
      alert("Envia uma imagem primeiro");
      return;
    }

    setLoading(true);

    try {
      const fileName = `${Date.now()}-${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from("artworks")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("artworks")
        .getPublicUrl(fileName);

      const imageUrl = data.publicUrl;

      const { error: insertError } = await supabase
        .from("ataques")
        .insert([
          {
            imagem_url: imageUrl,
            atacado: atacado,
            personagens,
            cenario,
            finalizacao,
            tamanho,
            pontos: total,
            fogo_amigo: false,
            atacante: user?.user_metadata?.username || "anonimo",
            time: user?.user_metadata?.time || "??",
            user_id: user?.id,
          }
        ]);

      if (insertError) throw insertError;

      alert("Ataque enviado com sucesso 😎");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Parallax pages={3.2} ref={parallaxRef}>

      <div className="fixed inset-0 -z-20 bg-[#0a0a0c]" />

      {/* HERO SECTION */}
      <ParallaxLayer offset={0} speed={0.5} style={{ zIndex: 10 }}>
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1
            className="text-[64px] tracking-widest uppercase mb-4 text-white"
            style={antonStyle}
          >
            Bem vindo ao Artfight (ODV Edition)
          </h1>
          <button
            onClick={() => navigate("/auth")}
            className="fixed top-4 right-4 bg-white/10 px-3 py-1 rounded"
          >
            Login
          </button>

          <p
            className="text-[24px] text-gray-400 mb-5.25 max-w-2xl"
            style={crimsonStyle}
          >
            Onde os de verdade se reunem para desenhar os personagens uns dos outros.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const startTime = performance.now();
                const duration = 5000; // aumentar se necessário

                const start = parallaxRef.current.current;
                const end = 2;

                const animate = (now) => {
                  const elapsed = now - startTime;
                  const progress = Math.min(elapsed / duration, 1);

                  //  EASE-OUT 
                  const ease = 1 - Math.pow(1 - progress, 2);

                  const value = start + (end - start) * ease;

                  parallaxRef.current.scrollTo(value);

                  if (progress < 1) requestAnimationFrame(animate);
                };

                requestAnimationFrame(animate);
              }}
              className="bg-[#444444] hover:bg-[#555555] w-49 h-12 text-[24px] rounded-xl text-white transition-all"
              style={bebasStyle}
            >
              Registrar Ataque
            </button>

            <button
              onClick={() => navigate("/galeria")}
              className="bg-[#201E27] hover:bg-[#2a2833] border border-white/25 w-63.75 h-12 text-[24px] rounded-xl text-white transition-all"
              style={bebasStyle}
            >
              Visualizar últimos ataques
            </button>
          </div>
        </section>
      </ParallaxLayer>

      {/* ELEMENTOS DECORATIVOS (Layer 0) */}
      <ParallaxLayer offset={0} speed={0.2} style={{ zIndex: 1 }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/10 rotate-45 blur-xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rotate-45 blur-xl" />
          <div className="absolute top-40 left-[20%] w-20 h-20 bg-white/10 rotate-45" />
        </div>
      </ParallaxLayer>
      {/*  GALERIA (Página 1) */}

      {/* FUNDO PROFUNDO (quase infinito) */}
      <ParallaxLayer offset={1} speed={0.05}>
        <div className="absolute inset-0 pointer-events-none">

          {/* LOSANGO GIGANTE  */}
          <div className="absolute left-1/2 top-1/2 
      w-[120vw] h-[120vw] 
      -translate-x-1/2 -translate-y-1/2
      bg-purple-500/5 
      rotate-45 
      blur-[120px] 
      opacity-40"
          />

          {/* LOSANGO SECUNDÁRIO */}
          <div className="absolute top-[20vh] left-[10vw] 
      w-[80vw] h-[80vw] 
      bg-blue-500/5 
      rotate-45 
      blur-[100px] 
      opacity-30"
          />

          {/* IMAGENS DISTANTES (bem sutis) */}
          <img
            src={chester}
            className="absolute top-[10vh] left-[20vw] 
      w-[30vw] opacity-20 blur-sm"
          />


          {/* Satoshi */}

          <img src={satoshi} className="absolute bottom-[15vh] right-[15vw] 
      w-[25vw] opacity-10 blur-sm"
          />


          <img
            src="/bg2.png"
            className="absolute bottom-[15vh] right-[15vw] 
      w-[25vw] opacity-10 blur-sm"
          />

          <img
            src="/bg3.png"
            className="absolute top-[50vh] left-[60vw] 
      w-[20vw] opacity-10 blur-sm"
          />

        </div>
      </ParallaxLayer>


      {/*  TEXTO (velocidade média) */}
      <ParallaxLayer offset={1} speed={0.25}>
        <div className="h-screen flex items-center justify-center pointer-events-none">
          <h2
            className="text-white text-[120px] opacity-5 uppercase tracking-[1.5em] select-none"
            style={bebasStyle}
          >
            GALERIA
          </h2>
        </div>
      </ParallaxLayer>
      {/* ESTRELAS GLOBAIS (camada mais rápida) */}
      <ParallaxLayer offset={0} speed={1.2} factor={3.5}>
        <div className="absolute inset-0 pointer-events-none z-50">

          {/* ⭐ BRILHANTES (principais) */}
          <div className="absolute top-[5vh] left-[10vw] w-2 h-2 bg-white rotate-45 
    shadow-[0_0_10px_rgba(255,255,255,1),0_0_25px_rgba(255,255,255,0.7)]" />

          <div className="absolute top-[15vh] right-[15vw] w-2 h-2 bg-white rotate-45 
    shadow-[0_0_8px_rgba(255,255,255,0.9),0_0_20px_rgba(255,255,255,0.6)]" />

          <div className="absolute bottom-[20vh] left-[20vw] w-3 h-3 bg-white rotate-45 
    shadow-[0_0_12px_rgba(255,255,255,1),0_0_30px_rgba(255,255,255,0.7)]" />


          {/*  MÉDIAS */}
          <div className="absolute top-[30vh] left-[40vw] w-2 h-2 bg-purple-300/40 rotate-45 blur-[1px]" />
          <div className="absolute top-[50vh] right-[30vw] w-3 h-3 bg-blue-300/30 rotate-45 blur-[1px]" />
          <div className="absolute bottom-[10vh] right-[10vw] w-2 h-2 bg-purple-200/40 rotate-45 blur-[1px]" />


          {/* PEQUENAS (profundidade) */}
          <div className="absolute top-[10vh] left-[60vw] w-1 h-1 bg-white/40 rotate-45 blur-[1px]" />
          <div className="absolute top-[70vh] left-[30vw] w-1 h-1 bg-white/30 rotate-45 blur-[1px]" />
          <div className="absolute bottom-[5vh] left-[50vw] w-1 h-1 bg-white/30 rotate-45 blur-[1px]" />


          {/*  EXTRAS (espalhados pra invadir tudo) */}
          <div className="absolute top-[25vh] left-[5vw] w-2 h-2 bg-white/50 rotate-45 blur-[1px]" />
          <div className="absolute top-[60vh] right-[5vw] w-2 h-2 bg-white/40 rotate-45 blur-[1px]" />

          {/* Siena */}
          <div className="absolute top-[275vh] right-[12vw] rotate-12 transition-transform hover:scale-110 duration-500">
            <img src={siena} className="w-[13vw] min-w-60 max-w-120 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] select-none" />
          </div>
          <div className="absolute bottom-[30vh] left-[70vw] w-2 h-2 bg-white/40 rotate-45 blur-[1px]" />

        </div>
      </ParallaxLayer>

      {/*  IMAGENS (rápidas = frente) */}
      <ParallaxLayer offset={1} speed={0.6}>
        <div className="absolute inset-0">

          {/* Gilmara */}
          <div className="absolute top-[10vh] left-[5vw] rotate-10 transition-transform hover:scale-110 duration-500">
            <img src={gilmara} className="w-[12vw] min-w-30 max-w-55 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] select-none" />
          </div>
          <div className="absolute bottom-[10vh] left-[30vw] w-3 h-3 bg-white rotate-45 
    shadow-[0_0_12px_rgba(255,255,255,1),0_0_30px_rgba(255,255,255,0.7)]" />

          {/* Ocnalb */}
          <div className="absolute top-[20vh] right-[5vw] rotate-10 transition-transform hover:scale-110 duration-500">
            <img src={ocnalb} className="w-[14vw] min-w-35 max-w-65 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] select-none" />
          </div>
          {/* Hope */}
          <div className="absolute bottom-[15vh] left-[8vw] rotate-5 transition-transform hover:scale-110 duration-500">
            <img src={hopeSerin} className="w-[16vw] min-w-40 max-w-75 drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] select-none" />
          </div>

          {/* Hector */}
          <div className="absolute bottom-[8vh] right-[5vw] rotate-15 transition-transform hover:scale-110 duration-500">
            <img src={hector} className="w-[10vw] min-w-25 max-w-50 drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] select-none" />
          </div>



          {/* Stevey */}
          <div className="absolute top-[5vh] left-[40vw] rotate-6 transition-transform hover:scale-110 duration-500">
            <img src={stevey} className="w-[10vw] min-w-25 max-w-45 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] select-none" />
          </div>





        </div>
      </ParallaxLayer>
      {/* REGISTRO SECTION (Layer 2) */}
      <ParallaxLayer offset={2} speed={0.3}>
        {/* Container principal com padding no topo para respirar(testar o padding) */}
        <section id="registro" className="relative flex flex-col items-center justify-start min-h-screen pt-12 pb-24 px-4 overflow-visible">

          {/* --- LOSANGOS  --- */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            {/* Losangos de Fundo Esfumaçados */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/10 rotate-45 blur-xl" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-blue-500/10 rotate-45 blur-xl" />

            {/* Losangos Médios Sólidos */}
            <div className="absolute top-40 left-[15%] w-20 h-20 bg-white/5 rotate-45" />
            <div className="absolute bottom-40 right-[25%] w-24 h-24 bg-white/5 rotate-45" />
          </div>

          {/* TÍTULO */}
          <h1
            className="text-[72px] text-[#EAEAF0] mb-8 text-center leading-tight drop-shadow-lg"
            style={bebasStyle}
          >
            ART FIGHT ODV EDITION
          </h1>

          {/* CARD DE REGISTRO */}
          <div className="flex flex-col md:flex-row gap-6 bg-[#181825]/90 backdrop-blur-sm p-8 rounded-3xl border border-[#2a2a3a] shadow-[0_0_50px_rgba(0,0,0,0.6)] max-w-5xl w-full">

            {/* ÁREA DE UPLOAD */}
            <div
              className="flex-[1.5] bg-[#11111d] rounded-2xl border-2 border-dashed border-[#2a2a40] flex flex-col items-center justify-center p-8 cursor-pointer hover:border-purple-500/50 transition-colors group"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />

              <span className="text-[10px] text-gray-400 mb-6 tracking-widest uppercase opacity-60 group-hover:opacity-100" style={bebasStyle}>
                [ CLIQUE AQUI PARA ENVIAR SUA ARTE ]
              </span>

              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  className="w-56 drop-shadow-2xl"
                />
              ) : (
                <img src={hopeSerin} className="w-56 drop-shadow-2xl" />
              )}
            </div>

            {/* PAINEL DE PONTOS */}
            <div className="flex-1 flex flex-col items-center justify-between py-2">
              <div className="text-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-1">Registrar novo ataque</span>
                <span className="text-[90px] leading-none font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {total}
                </span>
                <span className="text-lg text-gray-400 uppercase block tracking-wider" style={bebasStyle}>Pontos</span>
              </div>

              <div className="w-full space-y-4 mt-4">
                <div className="space-y-1 text-center">
                  <label className="text-[16px] uppercase text-gray-500 tracking-tighter" style={bebasStyle}>Quem está sendo atacado?</label>
                  <input
                    value={atacado}
                    onChange={(e) => setAtacado(e.target.value)}
                    placeholder="NOME DO ATACADO"
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-500 outline-none transition-all placeholder:opacity-30"
                  />
                </div>
                <div className="space-y-1 text-center">
                  <label
                    className="text-[16px] uppercase text-gray-500 tracking-tighter"
                    style={bebasStyle}
                  >
                    Nº de Personagens (total)
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={personagens}
                    onChange={(e) => setPersonagens(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-500 outline-none transition-all"
                  />
                </div>

                <div className="space-y-1 text-center">
                  <label className="text-[16px] uppercase text-gray-500 tracking-tighter" style={bebasStyle}>Cenário</label>
                  <select
                    value={cenario}
                    onChange={(e) => setCenario(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-900 outline-none cursor-pointer"
                  >
                    <option value={0}>Fundo Branco (+0)</option>
                    <option value={1}>Fundo Colorido (+1)</option>
                    <option value={2}>Cenário Simples (+2)</option>
                    <option value={3}>Cenário Completo (+3)</option>
                  </select>
                </div>

                <div className="space-y-1 text-center">
                  <label className="text-[16px] uppercase text-gray-500 tracking-tighter" style={bebasStyle}>Finalização</label>
                  <select
                    value={finalizacao}
                    onChange={(e) => setFinalizacao(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-500 outline-none cursor-pointer"
                  >
                    <option value={1}>Rascunho (+1)</option>
                    <option value={2}>Colorido (+2)</option>
                    <option value={3}>Completo (+3)</option>
                    <option value={4}>Renderizado (+4)</option>
                  </select>
                </div>
                <div className="space-y-1 text-center">
                  <label className="text-[16px] uppercase text-gray-500 tracking-tighter" style={bebasStyle}>Tamanho</label>
                  <select
                    value={tamanho}
                    onChange={(e) => setTamanho(Number(e.target.value))}
                    className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-500 outline-none cursor-pointer"
                  >
                    <option value={1}>Icon (+1)</option>
                    <option value={2}>Meio Corpo (+2)</option>
                    <option value={2}>Chibi (+2)</option>
                    <option value={3}>Completo (+3)</option>
                  </select>
                  <div className="space-y-1 text-center">
                    <label
                      className="text-[16px] uppercase text-gray-500 tracking-tighter"
                      style={bebasStyle}
                    >
                      Personagens que são fogo amigo
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={personagens}
                      value={fogoAmigoQtd}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        if (value <= personagens) {
                          setFogoAmigoQtd(value);
                        }
                      }}
                      className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1 text-center">
                    <label
                      className="text-[16px] uppercase text-gray-500 tracking-tighter"
                      style={bebasStyle}
                    >
                      Doodles (+1 cada)
                    </label>

                    <input
                      type="number"
                      min={0}
                      value={doodles}
                      onChange={(e) => {
                        const value = Math.max(0, Number(e.target.value));
                        setDoodles(value);
                      }}
                      className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 text-white text-center text-[11px] rounded-md focus:border-purple-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* BOTÃO ENVIAR  */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`mt-10 mb-20 text-[#111] text-[36px] px-24 py-2.5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(139,125,240,0.3)] 
  ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-[#8b7df0] hover:bg-[#7a6ce0] active:scale-95"}`}
            style={bebasStyle}
          >
            {loading ? "ENVIANDO..." : "ENVIAR ATAQUE"}
          </button>
        </section>

      </ParallaxLayer>

    </Parallax>
  );
}

export default App;
