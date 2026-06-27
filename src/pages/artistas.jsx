import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../utils/supabase";


export default function Artistas() {

  const navigate = useNavigate();

  const [artistas, setArtistas] = useState([]);
  const [loading, setLoading] = useState(true);


  const bebasStyle = {
    fontFamily: "'Bebas Neue', sans-serif"
  };


  useEffect(() => {

    async function carregarArtistas() {

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("username");


      if(error){
        console.error(error);
        return;
      }


      setArtistas(data || []);
      setLoading(false);

    }


    carregarArtistas();

  }, []);



  if(loading){

    return(
      <div className="min-h-screen bg-[#0a0a0c] text-white flex items-center justify-center">
        Carregando artistas...
      </div>
    )

  }



  return (

    <div className="min-h-screen bg-[#0a0a0c] text-white p-8">


      <button
        onClick={()=>navigate(-1)}
        className="bg-white/10 px-5 py-2 rounded-lg"
      >
        ← Voltar
      </button>



      <header className="text-center mt-10 mb-12">

        <h1
          className="text-6xl uppercase"
          style={bebasStyle}
        >
          Comunidade
        </h1>


        <p className="text-gray-500 mt-2">
          Conheça todos os artistas participantes
        </p>

      </header>




      <main className="max-w-6xl mx-auto">


        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">


          {artistas.map((artista)=>(


            <div
              key={artista.id}
              onClick={()=>navigate(`/perfil/${artista.id}`)}
              className="
              cursor-pointer
              bg-[#181825]
              border
              border-white/10
              rounded-3xl
              p-6
              text-center
              hover:border-purple-500
              transition
              "
            >



              <div className="
              w-28 h-28
              mx-auto
              rounded-full
              overflow-hidden
              border-4
              border-purple-500
              bg-purple-500/20
              ">


                {
                  artista.avatar_url ?

                  <img
                    src={artista.avatar_url}
                    className="w-full h-full object-cover"
                  />

                  :

                  <div className="
                  w-full h-full
                  flex items-center justify-center
                  text-4xl
                  ">
                    {artista.username?.[0]}
                  </div>

                }


              </div>




              <h2
                className="text-2xl mt-5 uppercase"
                style={bebasStyle}
              >
                {artista.username}
              </h2>



              <p className={`
                text-xs uppercase mt-2
                ${
                  artista.time === "alfa"
                  ? "text-purple-400"
                  : "text-pink-400"
                }
              `}>
                {artista.time || "Sem time"}
              </p>



            </div>


          ))}



        </div>


      </main>



    </div>

  );

}