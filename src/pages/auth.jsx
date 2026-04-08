import { useState } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";
import lorax from "../assets/images/lorax.png";
import noah from "../assets/images/noah.png";

function Auth() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [time, setTime] = useState("");

  const [loading, setLoading] = useState(false);

  const bebasStyle = { fontFamily: "'Bebas Neue', sans-serif" };

  async function handleAuth() {
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { username, time },
          },
        });

        if (error) throw error;

        alert("Conta criada 🔥");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center text-white px-4 overflow-hidden">

      {/*  ESTRELAS */}
      <div className="absolute inset-0 pointer-events-none opacity-70 sm:opacity-100">
        <div className="absolute top-[10vh] left-[15vw] w-2 h-2 bg-white rotate-45 shadow-[0_0_10px_white]" />
        <div className="absolute top-[30vh] right-[10vw] w-1 h-1 bg-white/60 rotate-45" />
        <div className="absolute bottom-[20vh] left-[20vw] w-2 h-2 bg-purple-300/40 rotate-45 blur-[1px]" />
        <div className="absolute bottom-[10vh] right-[25vw] w-1 h-1 bg-white/40 rotate-45" />
      </div>

      {/*  CONTAINER CENTRAL */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 relative w-full max-w-5xl">

        {/*  ESQUERDA */}
        <div className="flex justify-center md:justify-end w-full md:w-auto">
          <img
            src={noah}
            className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] opacity-50 sm:opacity-70 md:opacity-100 rotate-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-transform hover:scale-110"
          />
        </div>

        {/*  CARD */}
        <div className="relative w-full max-w-md bg-[#181825]/90 backdrop-blur-sm p-5 sm:p-6 md:p-8 rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-center mb-6 uppercase tracking-widest"
            style={bebasStyle}
          >
            {isLogin ? "Login" : "Registro"}
          </h1>

          <div className="space-y-4">

            {!isLogin && (
              <input
                placeholder="SEU NOME"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 sm:p-3 rounded text-white text-center placeholder:opacity-30 focus:border-purple-500 outline-none"
              />
            )}

            <input
              placeholder="SEU EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 sm:p-3 rounded text-white text-center placeholder:opacity-30 focus:border-purple-500 outline-none"
            />

            <input
              type="password"
              placeholder="SENHA"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 sm:p-3 rounded text-white text-center placeholder:opacity-30 focus:border-purple-500 outline-none"
            />

            {!isLogin && (
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-[#0a0a14] border border-[#3f3f5a] p-2.5 sm:p-3 rounded text-white text-center focus:border-purple-500 outline-none"
              >
                <option value="ODV"> Tsundere-chan(>///<)</option>
                <option value="RIVAL"> Alfa intimidador </option>
              </select>
            )}

            <button
              onClick={handleAuth}
              disabled={loading}
              className={`w-full py-2.5 sm:py-3 rounded-xl text-base sm:text-lg md:text-xl lg:text-[22px] uppercase transition-all
              ${loading
                ? "bg-gray-600"
                : "bg-[#8b7df0] hover:bg-[#7a6ce0] active:scale-95"}`}
              style={bebasStyle}
            >
              {loading
                ? "PROCESSANDO..."
                : isLogin
                ? "Entrar"
                : "Criar Conta"}
            </button>

            <p
              className="text-center text-sm sm:text-base text-gray-400 cursor-pointer hover:text-white transition-all"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Não tem conta? Registrar"
                : "Já tem conta? Login"}
            </p>
          </div>
        </div>

        {/* 🧍 DIREITA */}
        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <img
            src={lorax}
            className="w-[120px] sm:w-[150px] md:w-[180px] lg:w-[200px] opacity-50 sm:opacity-70 md:opacity-100 -rotate-6 drop-shadow-[0_0_20px_rgba(0,0,0,0.7)] transition-transform hover:scale-110"
          />
        </div>

      </div>
    </div>
  );
}

export default Auth;
