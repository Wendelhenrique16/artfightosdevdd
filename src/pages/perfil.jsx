import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [meusAtaques, setMeusAtaques] = useState([]);
  const [loading, setLoading] = useState(true);

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

      // Busca apenas os ataques feitos por este usuário, por enquanto...
      const { data: ataques } = await supabase
        .from("ataques")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setMeusAtaques(ataques || []);
      setLoading(false);
    }

    getProfileData();
  }, [navigate]);
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
        
        {/* COLUNA ESQUERDA: CARD DE PERFIL */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#181825] border border-white/10 p-8 rounded-3xl flex flex-col items-center text-center">
            {/* FOTO DE PERFIL (Placeholder) */}
            <div className="w-32 h-32 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full mb-4 border-4 border-[#0a0a0c] shadow-xl flex items-center justify-center overflow-hidden">
               <span className="text-4xl font-bold">{user.user_metadata?.username?.[0]?.toUpperCase()}</span>
            </div>

            <h2 style={antonStyle} className="text-3xl uppercase tracking-tighter mb-1">
              {user.user_metadata?.username || "Artista"}
            </h2>
            
            <p className={`text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 ${
              user.user_metadata?.time === 'alfa' ? 'bg-purple-500/20 text-purple-400' : 'bg-pink-500/20 text-pink-400'
            }`}>
              Time {user.user_metadata?.time || 'Sem Time'}
            </p>

            <div className="w-full grid grid-cols-2 gap-4 mt-4 border-t border-white/5 pt-6">
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Ataques</p>
                <p style={bebasStyle} className="text-2xl">{meusAtaques.length}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-500 uppercase">Total Pontos</p>
                <p style={bebasStyle} className="text-2xl text-purple-400">{totalPontos}</p>
              </div>
            </div>
          </div>

          {/* SOBRE */}
          <div className="bg-[#181825] border border-white/10 p-6 rounded-3xl">
            <h3 style={bebasStyle} className="text-gray-400 text-sm tracking-widest mb-3 uppercase">Sobre</h3>
            <p className="text-sm text-gray-400 italic">
              "Um artista dedicado ao Art Fight ODV Edition. Pronto para desenhar e ser atacado!"
            </p>
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
                  <img 
                    src={atk.imagem_url} 
                    alt="Ataque" 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
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
      </main>
    </div>
  );
}