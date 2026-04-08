# Art Fight - ODV Edition 🎨⚔️

O **Art Fight (ODV Edition)** é uma plataforma web gamificada para competição artística entre amigos. O sistema automatiza o cálculo de pontos de "ataques" (artes enviadas) e gerencia a disputa entre duas equipes rivais.

## 🔗 Links do Projeto
* **Design (Figma):** [ArtFightODV-EDITION](https://www.figma.com/design/SEiTWjGIn6w7YF1G63VCgK/ArtFightODV-EDITION?node-id=0-1&p=f&t=PSWNL8auQvuKYrNw-0)
* **Documentação Técnica:** `docs/ART FIGHT (ODV EDITION).pdf`

---

## 🚀 Funcionalidades (Requisitos)

### Requisitos Funcionais (RF)
* **RF01 - Autenticação & Onboarding:** Login/Cadastro via Supabase. No primeiro acesso, o usuário deve escolher seu time obrigatoriamente.
* **RF02 - Registro de Ataque:** Formulário para envio de arte (upload, alvo, tipo de pintura, cenário, quantidade de personagens e fogo amigo).
* **RF03 - Motor de Pontos:** Cálculo automático baseado nos critérios técnicos.
* **RF04 - Galeria Tripartite:** Interface com Grid de miniaturas (esquerda), Preview ampliado (centro) e Ranking/Leaderboard (direita).

### Requisitos Não Funcionais (RNF)
* **RNF01 - Usabilidade:** Interface *clean* otimizada para o fluxo de artistas.
* **RNF02 - Performance:** Entrega de imagens otimizada via Supabase Storage.

---

## 🛠️ Stack Tecnológica
* **Frontend:** React.js (Vite).
* **Estilização:** Tailwind CSS.
* **Backend/Database:** Supabase (PostgreSQL).
* **Hospedagem:** Vercel.

---

## 📊 Regra de Negócio (Pontuação)
O cálculo segue a ordem de precedência técnica:  
**Total = [(Pintura × Tamanho) × Qtd_Personagens] + Pontos_Fundo + Doodles**

---

## 📂 Estrutura de Pastas
```text
.
├── docs/               # Documentação técnica e requisitos
├── public/             # Ativos estáticos (favicons, etc)
├── src/                # Código-fonte React
│   ├── assets/         # Imagens e estilos globais
│   └── pages/          # Páginas separadas
│   └── app.jsx/        # Rotas
│   └── ...
├── .gitignore          # Arquivos ignorados pelo Git
├── README.md           # Este arquivo
└── tailwind.config.js  # Configuração do Tailwind
