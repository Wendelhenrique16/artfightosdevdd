# Art Fight - ODV Edition

O **Art Fight (ODV Edition)** é uma plataforma web gamificada para competição artística entre amigos. A aplicação permite registrar ataques artísticos, calcular pontos automaticamente, acompanhar rankings e visualizar a disputa entre duas equipes.

O projeto foi desenvolvido com foco em uma experiência visual temática, com galeria, perfil customizável, dashboard de competição e integração com Supabase.

## Links do Projeto

- **Design (Figma):** ArtFightODV-EDITION
- **Documentação Técnica:** `docs/ART FIGHT (ODV EDITION).pdf`

## Funcionalidades

- Autenticação de usuários com Supabase Auth.
- Cadastro com escolha de time.
- Perfil de artista customizável.
- Upload de foto de perfil via Supabase Storage.
- Registro de ataques artísticos com imagem.
- Cálculo automático de pontos.
- Dashboard com placar por time, ranking e informações principais.
- Galeria de ataques com grid, preview ampliado e ranking global.
- CRUD de ataques:
  - criar ataque;
  - editar ataques próprios;
  - apagar ataques próprios;
  - proteger ações por autenticação e RLS.
- Exibição de ataques feitos pelo usuário.
- Exibição de ataques recebidos pelo usuário.
- Suporte em desenvolvimento para animações via YouTube.

## Requisitos Funcionais

### RF01 - Autenticação

O sistema deve permitir login e cadastro de usuários usando Supabase Auth.

### RF02 - Escolha de Time

Durante o cadastro, o usuário deve escolher um time para participar da competição.

### RF03 - Perfil do Artista

O usuário deve conseguir editar seu perfil, incluindo nome, descrição e foto de perfil.

### RF04 - Registro de Ataque

O usuário deve conseguir registrar um ataque artístico informando:

- arte enviada;
- alvo atacado;
- quantidade de personagens;
- tipo de finalização;
- tamanho;
- cenário;
- quantidade de personagens em fogo amigo;
- doodles, quando aplicável.

### RF05 - Cálculo de Pontos

O sistema deve calcular automaticamente a pontuação do ataque com base nos critérios definidos.

### RF06 - Galeria de Ataques

O sistema deve exibir os ataques enviados em uma galeria com miniaturas, preview ampliado e informações do ataque.

### RF07 - Ranking

O sistema deve exibir ranking global de artistas com base na soma dos pontos dos ataques.

### RF08 - Competição por Times

O sistema deve somar os pontos de cada time e indicar visualmente qual equipe está vencendo.

### RF09 - Edição e Exclusão

O usuário deve conseguir editar e apagar apenas os ataques criados por ele.

### RF10 - Ataques Recebidos

O perfil deve exibir ataques direcionados ao usuário, quando o nome do alvo corresponder ao nome do artista.

## Requisitos Não Funcionais

### RNF01 - Usabilidade

A interface deve ser visual, direta e adequada ao fluxo de artistas durante o evento.

### RNF02 - Segurança

As ações sensíveis devem ser protegidas por autenticação e políticas de Row Level Security (RLS) no Supabase.

### RNF03 - Performance

Imagens e avatares devem ser armazenados no Supabase Storage e carregados por URL pública.

### RNF04 - Responsividade

A aplicação deve funcionar em telas desktop e mobile.

## Stack Tecnológica

- **Frontend:** React.js com Vite
- **Estilização:** Tailwind CSS
- **Backend/Database:** Supabase PostgreSQL
- **Autenticação:** Supabase Auth
- **Storage:** Supabase Storage
- **Hospedagem:** Vercel

## Regra de Pontuação

A pontuação considera finalização, tamanho, cenário, quantidade de personagens, fogo amigo e doodles.

Base simplificada:

```txt
Base = Finalização × Tamanho + Cenário
Total = (Personagens Normais × Base) + (Personagens Fogo Amigo × Base / 2) + Doodles
