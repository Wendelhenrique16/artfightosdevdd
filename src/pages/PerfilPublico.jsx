import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { isVideoAttack } from "../utils/youtube";

export default function PerfilPublico() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [ataques, setAtaques] = useState([]);
  const [recebidos, setRecebidos] = useState([]);
  const [loading, setLoading] = useState(true);


  const bebasStyle = {
    fontFamily: "'Bebas Neue', sans-serif"
  };

  const antonStyle = {
    fontFamily: "'Anton', sans-serif"
  };


  useEffect(() => {

    async function carregarPerfil() {

      const { data: perfilData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();


      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }


      setProfile(perfilData);



      // ataques feitos pelo artista

      const { data: feitos } = await supabase
        .from("ataques")
        .select("*")
        .eq("user_id", id)
        .order("created_at", { ascending: false });


      setAtaques(feitos || []);



      // ataques recebidos

      const { data: recebidosData } = await supabase
        .from("ataques")
        .select("*")
        .ilike("atacado", perfilData.username)
        .order("created_at", { ascending: false });


      setRecebidos(recebidosData || []);



      setLoading(false);

    }


    carregarPerfil();

  }, [id]);



  if (loading) {

    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
        Carregando perfil...
      </div>
    );

  }



  if (!profile) {

    return (
      <div className="min-h-screen bg-[#0a0a0c] text-white flex flex-col items-center justify-center">

        <p>Perfil não encontrado.</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-white/10 px-4 py-2 rounded-lg"
        >
          Voltar
        </button>

      </div>
    );

  }



  const pontos = ataques.reduce(
    (total, atk) => total + atk.pontos,
    0
  );



  return (

    <div className="min-h-screen bg-[#0a0a0c] text-white p-6 md:p-10">


      <button
        onClick={() => navigate(-1)}
        className="bg-[#181825] border border-white/10 px-5 py-2 rounded-lg hover:bg-white/10 transition"
      >
        ← Voltar
      </button>



      <main className="max-w-6xl mx-auto mt-10">



        {/* CABEÇALHO DO ARTISTA */}

        <section className="bg-[#181825] border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center">


          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-purple-500 bg-purple-500/20">


            {profile.avatar_url ? (

              <img
                src={profile.avatar_url}
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="w-full h-full flex items-center justify-center text-5xl">
                {profile.username?.[0]}
              </div>

            )}


          </div>



          <h1
            className="text-5xl mt-5 uppercase"
            style={antonStyle}
          >
            {profile.username}
          </h1>



          <p className={`mt-2 uppercase ${
            profile.time === "alfa"
              ? "text-purple-400"
              : "text-pink-400"
          }`}>
            Time {profile.time || "Sem time"}
          </p>




          <p className="text-gray-400 max-w-xl mt-5">
            {profile.bio || "Esse artista ainda não escreveu uma descrição."}
          </p>




          <div className="flex gap-10 mt-8">


            <div>
              <p className="text-xs text-gray-500">
                PONTOS
              </p>

              <p
                className="text-3xl text-purple-400"
                style={bebasStyle}
              >
                {pontos}
              </p>
            </div>



            <div>
              <p className="text-xs text-gray-500">
                ATAQUES
              </p>

              <p
                className="text-3xl"
                style={bebasStyle}
              >
                {ataques.length}
              </p>
            </div>



            <div>
              <p className="text-xs text-gray-500">
                RECEBIDOS
              </p>

              <p
                className="text-3xl"
                style={bebasStyle}
              >
                {recebidos.length}
              </p>
            </div>


          </div>


        </section>





        {/* PORTFÓLIO */}

        <section className="mt-12">


          <h2
            className="text-3xl uppercase mb-6"
            style={bebasStyle}
          >
            Portfólio de Ataques
          </h2>



          {
            ataques.length > 0 ? (

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

                {ataques.map((atk)=>(

                  <div
                    key={atk.id}
                    className="aspect-square bg-[#181825] rounded-2xl overflow-hidden border border-white/10"
                  >

                    <img
                      src={atk.thumbnail_url || atk.imagem_url}
                      className="w-full h-full object-cover"
                    />


                    {isVideoAttack(atk) && (

                      <div className="absolute">
                        ▶
                      </div>

                    )}

                  </div>

                ))}

              </div>


            ) : (

              <p className="text-gray-500">
                Nenhum ataque realizado ainda.
              </p>

            )
          }


        </section>






        {/* ATAQUES RECEBIDOS */}


        <section className="mt-12">


          <h2
            className="text-3xl uppercase mb-6"
            style={bebasStyle}
          >
            Ataques Recebidos
          </h2>




          {
            recebidos.length > 0 ? (

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">


                {recebidos.map((atk)=>(

                  <div
                    key={atk.id}
                    className="aspect-square bg-[#181825] rounded-2xl overflow-hidden border border-white/10"
                  >

                    <img
                      src={atk.thumbnail_url || atk.imagem_url}
                      className="w-full h-full object-cover"
                    />


                  </div>


                ))}


              </div>


            ) : (

              <p className="text-gray-500">
                Nenhum ataque recebido ainda.
              </p>

            )


          }



        </section>




      </main>


    </div>

  );

}