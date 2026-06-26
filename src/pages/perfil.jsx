import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import { isVideoAttack } from "../utils/youtube";

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meusAtaques, setMeusAtaques] = useState([]);
  const [loading, setLoading] = useState(true);
const [profile, setProfile] = useState(null);
const [editProfile, setEditProfile] = useState({
  username: "",
  bio: "",
  avatar_url: "",
});
const [avatarFile, setAvatarFile] = useState(null);
const [savingProfile, setSavingProfile] = useState(false);
const [ataquesRecebidos, setAtaquesRecebidos] = useState([]);
  // Estilos globais do projeto
  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };
  const antonStyle = { fontFamily: "'Anton', sans-serif" };

useEffect(() => {
  async function getProfileData() {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      navigate("/auth");
      return;
    }

    setUser(user);

    const username = user.user_metadata?.username || "Artista";
    const time = user.user_metadata?.time || null;

    let { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (!profileData) {
      const { data: newProfile, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          username,
          time,
          bio: "Um artista dedicado ao Art Fight ODV Edition. Pronto para desenhar e ser atacado!",
        })
        .select()
        .single();

      if (profileError) {
        console.error(profileError);
        alert("Não foi possível carregar/criar seu perfil.");
        setLoading(false);
        return;
      }

      profileData = newProfile;
    }

    setProfile(profileData);

    setEditProfile({
      username: profileData?.username || username,
      bio: profileData?.bio || "",
      avatar_url: profileData?.avatar_url || "",
    });

    const { data: ataques } = await supabase
      .from("ataques")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setMeusAtaques(ataques || []);

    const nomeBusca = profileData?.username || username;

    const { data: recebidos } = await supabase
      .from("ataques")
      .select("*")
      .ilike("atacado", nomeBusca)
      .order("created_at", { ascending: false });

    setAtaquesRecebidos(recebidos || []);
    setLoading(false);
  }

  getProfileData();
}, [navigate]);
  async function handleSaveProfile() {
  if (!user) return;

  setSavingProfile(true);

  try {
    let avatarUrl = editProfile.avatar_url;

    if (avatarFile) {
      const fileExt = avatarFile.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, avatarFile, {
          upsert: true,
        });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      avatarUrl = data.publicUrl;
    }

    const { data, error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        username: editProfile.username,
        bio: editProfile.bio,
        avatar_url: avatarUrl,
        time: user.user_metadata?.time || profile?.time || null,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    setProfile(data);
    setEditProfile({
      username: data.username || "",
      bio: data.bio || "",
      avatar_url: data.avatar_url || "",
    });
    setAvatarFile(null);

    alert("Perfil atualizado!");
  } catch (err) {
    console.error(err);
    alert("Não foi possível salvar o perfil.");
  } finally {
    setSavingProfile(false);
  }
}
  /// if pra mostrar loading enquanto busca os dados, pra evitar renderização com user null ou array vazio
  if (loading) return <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white">Carregando...</div>;
  /// Cálculo do total de pontos somando os pontos de cada ataque
  const totalPontos = meusAtaques.reduce((acc, atk) => acc + atk.pontos, 0);
  /// O return principal da página, com estrutura de header, main dividido em duas colunas (perfil e galeria de ataques)
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white p-4 md:p-10">
      {/* HEADER / VOLTAR */}

      <div className="max-w-6xl mx-auto flex justify-between items-center mb-10">
        {/* BOTÃO VOLTAR */}
        <button
          onClick={() => navigate("/")}
          className="bg-[#181825] px-4 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-all text-sm"
        >
          ← Voltar ao Home
        </button>
        <span style={bebasStyle} className="text-purple-500 tracking-widest uppercase">
          Perfil do Artista
        </span>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
<div className="bg-[#181825] border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
  <label className="w-32 h-32 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full mb-4 border-4 border-[#0a0a0c] shadow-xl flex items-center justify-center overflow-hidden cursor-pointer">
    {editProfile.avatar_url || avatarFile ? (
      <img
        src={avatarFile ? URL.createObjectURL(avatarFile) : editProfile.avatar_url}
        alt="Foto de perfil"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-4xl font-bold">
        {editProfile.username?.[0]?.toUpperCase() || "A"}
      </span>
    )}

    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => setAvatarFile(e.target.files[0])}
    />
  </label>

  <input
    value={editProfile.username}
    onChange={(e) => setEditProfile({ ...editProfile, username: e.target.value })}
    className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 text-center text-white outline-none focus:border-purple-500 mb-3"
  />

  <p className={`text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 ${
    user.user_metadata?.time === "alfa"
      ? "bg-purple-500/20 text-purple-400"
      : "bg-pink-500/20 text-pink-400"
  }`}>
    Time {user.user_metadata?.time || "Sem Time"}
  </p>

  <textarea
    value={editProfile.bio}
    onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
    rows={4}
    placeholder="Escreva sua descrição..."
    className="w-full bg-[#0a0a14] border border-white/10 rounded-lg p-3 text-sm text-gray-300 outline-none focus:border-purple-500 resize-none"
  />

  <button
    onClick={handleSaveProfile}
    disabled={savingProfile}
    className="mt-4 w-full bg-[#6355ff] hover:bg-[#5244e0] disabled:opacity-50 rounded-xl py-3 uppercase"
    style={bebasStyle}
  >
    {savingProfile ? "Salvando..." : "Salvar Perfil"}
  </button>

  <div className="w-full grid grid-cols-3 gap-4 mt-6 border-t border-white/5 pt-6">
    <div>
      <p className="text-[10px] text-gray-500 uppercase">Feitos</p>
      <p style={bebasStyle} className="text-2xl">{meusAtaques.length}</p>
    </div>

    <div>
      <p className="text-[10px] text-gray-500 uppercase">Recebidos</p>
      <p style={bebasStyle} className="text-2xl">{ataquesRecebidos.length}</p>
    </div>

    <div>
      <p className="text-[10px] text-gray-500 uppercase">Pontos</p>
      <p style={bebasStyle} className="text-2xl text-purple-400">{totalPontos}</p>
    </div>
  </div>
</div>
        {/* COLUNA DIREITA: SUA GALERIA */}
        <div className="lg:col-span-8">
          <h3 style={bebasStyle} className="text-2xl mb-6 flex items-center gap-3">
            Seu Portfólio de Ataques
            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">{meusAtaques.length}</span>
          </h3>

          {meusAtaques.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {meusAtaques.map((atk) => (
                <div key={atk.id} className="group relative aspect-square bg-[#11111d] rounded-2xl border border-white/5 overflow-hidden hover:border-purple-500/50 transition-all">
                  <div className="relative w-full h-full">
                    <img
                      src={atk.thumbnail_url || atk.imagem_url}
                      alt={isVideoAttack(atk) ? "Animação" : "Ataque"}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />

                    {isVideoAttack(atk) && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center text-lg">
                          ▶
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="text-[10px] text-white uppercase truncate">Alvo: {atk.atacado}</p>
                    <p className="text-[10px] text-purple-400 font-bold">+{atk.pontos} PTS</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-gray-600">
              <p>Você ainda não realizou nenhum ataque.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 text-purple-400 hover:underline text-sm"
              >
                Ir para o campo de batalha
              </button>
            </div>
          )}
        </div>
        <div className="mt-10">
  <h3 style={bebasStyle} className="text-2xl mb-6 flex items-center gap-3">
    Ataques Recebidos
    <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-400">
      {ataquesRecebidos.length}
    </span>
  </h3>

  {ataquesRecebidos.length > 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {ataquesRecebidos.map((atk) => (
        <div
          key={atk.id}
          className="group relative aspect-square bg-[#11111d] rounded-2xl border border-white/5 overflow-hidden hover:border-pink-500/50 transition-all"
        >
          <img
            src={atk.thumbnail_url || atk.imagem_url}
            alt={isVideoAttack(atk) ? "Animação recebida" : "Ataque recebido"}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />

          {isVideoAttack(atk) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35">
              <span className="w-10 h-10 rounded-full bg-white/90 text-black flex items-center justify-center text-lg">
                ▶
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
            <p className="text-[10px] text-white uppercase truncate">
              Por: {atk.atacante || "Anônimo"}
            </p>
            <p className="text-[10px] text-pink-400 font-bold">
              +{atk.pontos} PTS
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="h-40 flex items-center justify-center border-2 border-dashed border-white/5 rounded-3xl text-gray-600">
      <p>Ninguém te atacou ainda.</p>
    </div>
  )}
</div>
      </main>
    </div>
  );
}