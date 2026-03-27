import { useState } from 'react'

function App() {
  // Estados para capturar as escolhas do artista
  const [personagens, setPersonagens] = useState(1)
  const [finalizacao, setFinalizacao] = useState(1) // 1: Rascunho, 2: Cagada, 3: Finalizado
  const [tamanho, setTamanho] = useState(1) // 1: Icon, 2: Meio, 3: Inteiro
  const [fundo, setFundo] = useState(0) // 0: Branco, 1: Pobre, 2: Decente, 3: Excelente

  //REGRA: (Tamanho * Finalização * Personagens) + Fundo
  const total = (tamanho * finalizacao * personagens) + fundo

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans">
      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 w-full max-w-md">
        <h1 className="text-3xl font-black text-center mb-8 text-cyan-400 uppercase tracking-tighter italic">
          ARTFIGHT ODV EDITION
        </h1>

        <div className="space-y-6">
          {/* Campo de Personagens */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Quantidade de Personagens</label> //antes qtd
            <input 
              type="number" 
              min="1"
              value={personagens}
              onChange={(e) => setPersonagens(Math.max(1, Number(e.target.value)))}
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-cyan-500 outline-none"
            />
          </div>

          {/* Grid de Selects para economizar espaço */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Finalização</label>
              <select value={finalizacao} onChange={(e) => setFinalizacao(Number(e.target.value))} className="bg-slate-900 border border-slate-700 p-3 rounded-lg">
                <option value={1}>Rascunho (1)</option>
                <option value={2}>Básica (2)</option>
                <option value={3}>Finalizada (3)</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-400 uppercase">Tamanho</label>
              <select value={tamanho} onChange={(e) => setTamanho(Number(e.target.value))} className="bg-slate-900 border border-slate-700 p-3 rounded-lg">
                <option value={1}>Icon (1)</option>
                <option value={2}>Meio (2)</option>
                <option value={3}>Inteiro (3)</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase">Cenário/Fundo</label>
            <select value={fundo} onChange={(e) => setFundo(Number(e.target.value))} className="bg-slate-900 border border-slate-700 p-3 rounded-lg">
              <option value={0}>Branco (0)</option>
              <option value={1}>Básico (1)</option>
              <option value={2}>Decente (2)</option>
              <option value={3}>Avançado (3)</option>
            </select>
          </div>
        </div>

        {/* O RESULTADO FINAL */}
        <div className="mt-10 pt-8 border-t border-slate-700 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">Pontuação Total</p>
          <div className="text-7xl font-black text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            {total}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
