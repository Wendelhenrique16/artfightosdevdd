import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../utils/supabase";
import {
  getYouTubeEmbedUrl,
  isVideoAttack,
} from "../utils/youtube";


function Galeria() {
  const navigate = useNavigate();
  const [selectedArt, setSelectedArt] = useState(null);
  const [ataques, setAtaques] = useState([]);
  const [user, setUser] = useState(null);
  const [editingArt, setEditingArt] = useState(null);
  const [editForm, setEditForm] = useState({
    atacado: "",
    personagens: 1,
    cenario: 1,
    finalizacao: 1,
    tamanho: 1,
    fogo_amigo_qtd: 0,
  });
  const [savingEdit, setSavingEdit] = useState(false);
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
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);


  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };
  const antonStyle = { fontFamily: "'Anton', sans-serif" };
  const ranking = Object.values(
    ataques.reduce((acc, atk) => {
      if (!acc[atk.atacante]) {
        acc[atk.atacante] = {
          atacante: atk.atacante,
          pontos: 0,
          time: atk.time // 
        };
      }
      acc[atk.atacante].pontos += atk.pontos;

      return acc;
    }, {})
  ).sort((a, b) => b.pontos - a.pontos);
  function isOwner(ataque) {
    return user && ataque.user_id === user.id;
  }

  function calcularPontos(form) {
    const personagens = Number(form.personagens) || 1;
    const fogoAmigo = Math.min(
      Number(form.fogo_amigo_qtd) || 0,
      personagens
    );
    const finalizacao = Number(form.finalizacao) || 1;
    const tamanho = Number(form.tamanho) || 1;
    const cenario = Number(form.cenario) || 0;

    const base = finalizacao * tamanho + cenario;
    const personagensNormais = personagens - fogoAmigo;

    return personagensNormais * base + fogoAmigo * (base / 2);
  }

  function openEditModal(ataque) {
    if (!isOwner(ataque)) {
      alert("Você só pode editar ataques enviados por você.");
      return;
    }

    setEditingArt(ataque);
    setEditForm({
      atacado: ataque.atacado || "",
      personagens: ataque.personagens || 1,
      cenario: ataque.cenario || 0,
      finalizacao: ataque.finalizacao || 1,
      tamanho: ataque.tamanho || 1,
      fogo_amigo_qtd: ataque.fogo_amigo_qtd || 0,
    });
  }
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
                  <div className="relative w-full h-full">
                    <img
                      src={ataque.thumbnail_url || ataque.imagem_url}
                      className="w-full h-full object-cover"
                    />

                    {isVideoAttack(ataque) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="w-12 h-12 rounded-full bg-white/90 text-black flex items-center justify-center text-xl">
                          ▶
                        </span>
                      </div>
                    )}
                  </div>
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
                isVideoAttack(selectedArt) ? (
                  <iframe
                    src={getYouTubeEmbedUrl(selectedArt.youtube_video_id)}
                    title={`Animação de ${selectedArt.atacante || "artista"}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedArt.imagem_url}
                    className="w-full h-full object-contain"
                  />
                )
              ) : (
                <span className="text-gray-700 text-xs">Selecione uma arte</span>
              )}

            </div>

            {/* Info do Ataque */}
            {selectedArt && (
              <div className="w-full mb-6 space-y-3 text-center">

                {/* 👤 Atacante */}
                <div className="bg-[#0f0f1a] border border-white/10 rounded-lg py-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Atacante
                  </p>
                  <p className="text-white text-[14px]">
                    @{selectedArt.atacante || "Anônimo"}
                  </p>
                </div>

                {/* 🎯 Atacado */}
                <div className="bg-[#0f0f1a] border border-white/10 rounded-lg py-2">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Alvo
                  </p>
                  <p className="text-white text-[14px]">
                    @{selectedArt.atacado}
                  </p>
                </div>

                {/* 💥 Pontos */}
                <div className="bg-[#0f0f1a] border border-white/10 rounded-lg py-3">
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                    Pontos
                  </p>
                  <p className="text-[28px] text-purple-400 font-bold drop-shadow">
                    +{selectedArt.pontos}
                  </p>
                </div>

              </div>
            )}
            {selectedArt && isOwner(selectedArt) && (
              <div className="w-full flex gap-3 mb-4">
                <button
                  onClick={() => openEditModal(selectedArt)}
                  className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-xl text-sm transition-all uppercase"
                  style={bebasStyle}
                >
                  Editar
                </button>

                <button
                  onClick={async () => {
                    if (!selectedArt) return;

                    if (!isOwner(selectedArt)) {
                      alert("Você só pode apagar ataques enviados por você.");
                      return;
                    }

                    const confirmDelete = confirm("Apagar esse ataque? Essa ação não pode ser desfeita.");
                    if (!confirmDelete) return;

                    const { error } = await supabase
                      .from("ataques")
                      .delete()
                      .eq("id", selectedArt.id)
                      .eq("user_id", user.id);

                    if (error) {
                      console.error(error);
                      alert("Não foi possível apagar esse ataque.");
                      return;
                    }

                    setAtaques((prev) => prev.filter((a) => a.id !== selectedArt.id));
                    setSelectedArt(null);
                  }}
                  className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-300 py-3 rounded-xl text-sm transition-all uppercase"
                  style={bebasStyle}
                >
                  Apagar
                </button>
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
                  <th className="pb-4">Time</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {ranking.slice(0, 10).map((player, index) => (
                  <tr
                    key={player.atacante}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="py-4 font-bold">{index + 1}</td>

                    <td className="py-4 text-gray-400">
                      {player.atacante || "Anônimo"}
                    </td>

                    <td className="py-4 font-mono">
                      {player.pontos}
                    </td>
                    <td className={`py-4 font-bold ${player.time === "alfa" ? "text-purple-400" : "text-pink-400"
                      }`}>
                      {player.time || "??"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Últimos Pontos */}
          <div className="bg-[#181825] border border-white/5 p-6 rounded-3xl w-full">
            <h3 className="text-center text-gray-400 text-[10px] tracking-widest uppercase mb-4">Últimos Pontos Registrados</h3>
            <div className="space-y-2 font-mono text-[10px] text-gray-500 text-center">
              {ataques.slice(0, 6).map((atk) => (
                <p key={atk.id}>
                  [{atk.time}] @{atk.atacante} → @{atk.atacado} → +{atk.pontos} pts
                </p>
              ))}
            </div>
          </div>
        </section>

      </main>
      {editingArt && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#181825] border border-white/10 rounded-3xl p-6 text-white">
            <h2 className="text-3xl uppercase mb-6" style={bebasStyle}>
              Editar Ataque
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs text-gray-500 uppercase">Alvo</label>
                <input
                  value={editForm.atacado}
                  onChange={(e) => setEditForm({ ...editForm, atacado: e.target.value })}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Personagens</label>
                <input
                  type="number"
                  min={1}
                  value={editForm.personagens}
                  onChange={(e) => {
                    const personagens = Math.max(1, Number(e.target.value));

                    setEditForm({
                      ...editForm,
                      personagens,
                      fogo_amigo_qtd: Math.min(Number(editForm.fogo_amigo_qtd) || 0, personagens),
                    });
                  }} />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Fogo amigo</label>
                <input
                  type="number"
                  min={0}
                  max={editForm.personagens}
                  value={editForm.fogo_amigo_qtd}
                  onChange={(e) => {
                    const fogoAmigo = Math.max(0, Number(e.target.value));

                    setEditForm({
                      ...editForm,
                      fogo_amigo_qtd: Math.min(fogoAmigo, Number(editForm.personagens) || 1),
                    });
                  }}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Cenário</label>
                <select
                  value={editForm.cenario}
                  onChange={(e) => setEditForm({ ...editForm, cenario: Number(e.target.value) })}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 outline-none focus:border-purple-500"
                >
                  <option value={0}>Fundo Branco (+0)</option>
                  <option value={1}>Fundo Colorido (+1)</option>
                  <option value={2}>Cenário Simples (+2)</option>
                  <option value={3}>Cenário Completo (+3)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Finalização</label>
                <select
                  value={editForm.finalizacao}
                  onChange={(e) => setEditForm({ ...editForm, finalizacao: Number(e.target.value) })}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 outline-none focus:border-purple-500"
                >
                  <option value={1}>Rascunho (+1)</option>
                  <option value={2}>Colorido (+2)</option>
                  <option value={3}>Completo (+3)</option>
                  <option value={4}>Renderizado (+4)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase">Tamanho</label>
                <select
                  value={editForm.tamanho}
                  onChange={(e) => setEditForm({ ...editForm, tamanho: Number(e.target.value) })}
                  className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 outline-none focus:border-purple-500"
                >
                  <option value={1}>Icon (+1)</option>
                  <option value={2}>Meio Corpo (+2)</option>
                  <option value={2}>Chibi (+2)</option>
                  <option value={3}>Completo (+3)</option>
                </select>
              </div>

              <div className="bg-[#0a0a14] border border-white/10 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase">Nova pontuação</p>
                <p className="text-3xl text-purple-400 font-bold">
                  +{calcularPontos(editForm)}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingArt(null)}
                className="flex-1 bg-white/10 hover:bg-white/20 rounded-xl py-3"
              >
                Cancelar
              </button>

              <button
                disabled={savingEdit}
                onClick={async () => {
                  if (!editingArt || !isOwner(editingArt)) {
                    alert("Você só pode editar ataques enviados por você.");
                    return;
                  }

                  setSavingEdit(true);

                  const pontos = calcularPontos(editForm);

                  const { data, error } = await supabase
                    .from("ataques")
                    .update({
                      atacado: editForm.atacado,
                      personagens: Number(editForm.personagens),
                      cenario: Number(editForm.cenario),
                      finalizacao: Number(editForm.finalizacao),
                      tamanho: Number(editForm.tamanho),
                      fogo_amigo_qtd: Number(editForm.fogo_amigo_qtd),
                      pontos,
                    })
                    .eq("id", editingArt.id)
                    .eq("user_id", user.id)
                    .select()
                    .single();

                  setSavingEdit(false);

                  if (error) {
                    console.error(error);
                    alert("Não foi possível editar esse ataque.");
                    return;
                  }

                  setAtaques((prev) =>
                    prev.map((atk) => (atk.id === data.id ? data : atk))
                  );

                  setSelectedArt(data);
                  setEditingArt(null);
                }}
                className="flex-1 bg-[#6355ff] hover:bg-[#5244e0] rounded-xl py-3 disabled:opacity-50"
              >
                {savingEdit ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Galeria;