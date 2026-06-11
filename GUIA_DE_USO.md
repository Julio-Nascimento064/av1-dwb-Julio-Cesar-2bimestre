# 🎮 GUIA DE USO - God of War Characters Browser v2.0

## 🚀 Como Executar a Aplicação

### Opção 1: Python (Recomendado)

```bash
# 1. Abra o terminal na pasta do projeto
cd c:\Users\julio\Documents\av1-dwb-Julio-Cesar-2bimestre

# 2. Inicie servidor Python
python -m http.server 8000

# 3. Abra no navegador
http://localhost:8000
```

### Opção 2: Node.js

```bash
# 1. Instale http-server globalmente
npm install -g http-server

# 2. Execute na pasta do projeto
http-server

# 3. Abra no navegador (geralmente porta 8080)
http://localhost:8080
```

### Opção 3: VS Code (Live Server)

```
1. Instale extensão "Live Server"
2. Clique direito em index.html
3. Selecione "Open with Live Server"
4. Navegador abre automaticamente
```

---

## 📋 Funcionalidades

### 1️⃣ PÁGINA PRINCIPAL (index.html)

#### Elemento: HEADER
```
├── Logo "GOD OF WAR" com ícone de coroa
├── Link para navegação
└── Responsivo (menu collapsa em mobile)
```

#### Elemento: HERO SECTION
```
├── Título grande: "PERSONAGENS"
├── Subtítulo: "Explore os mitos e lendas..."
└── Efeito shimmer animado
```

#### Elemento: SEARCH SECTION
```
├── Campo de busca (🔍)
│  └── Busca em tempo real
│  └── Debounce de 300ms
│  └── Placeholder: "Procure por um personagem..."
│
└── Botão "Limpar Filtro"
   └── Reset da busca
   └── Volta a exibir todos
```

#### Elemento: CHARACTERS GRID
```
├── Cards responsivos (1-3 colunas)
│  ├── Imagem do personagem (300px)
│  ├── Nome em destaque (ouro)
│  ├── Preview da descrição (150 chars)
│  ├── Info: Origem, Raça, Idade, Gênero
│  └── Botão "Ver Detalhes" (destaque)
│
└── Animações ao hover
   ├── Card sobe 8px
   ├── Aura dourada
   ├── Imagem zoom 1.08x
   └── Overlay com gradiente
```

#### Elemento: LOADING SPINNER
```
├── Exibido ao carregar personagens
├── Spinner animado
├── Texto: "Carregando personagens..."
└── Desaparece quando tudo carrega
```

#### Elemento: ERROR MESSAGE
```
├── Exibido se houver erro na API
├── Ícone de exclamação
├── Mensagem amigável
└── Botão "Tentar Novamente"
```

#### Elemento: FOOTER
```
├── Créditos da API
├── Link para repositório
└── Informação de desenvolvimento escolar
```

---

### 2️⃣ PÁGINA DE DETALHES (detalhes.html)

#### Elemento: HEADER (mesmo que principal)
```
├── Logo "GOD OF WAR"
└── Link "Voltar" para index.html
```

#### Elemento: HERO SECTION (Cinematográfico)
```
├── Imagem grande (500px altura, desktop)
├── Nome grande em gradiente de ouro
├── Info curta: "Raça • Origem"
└── Filtro de escuridão na imagem
```

#### Elemento: DESCRIÇÃO COMPLETA
```
├── Seção dedicada
├── Descrição full formatada
└── Quebras de linha preservadas
```

#### Elemento: INFORMAÇÕES BIOGRÁFICAS
```
├── Grid 4 colunas (2 em tablet, 1 em mobile)
│
├── Card 1: Origem
│  ├── Ícone de mapa
│  └── Texto: Birthplace
│
├── Card 2: Nacionalidade
│  ├── Ícone de globo
│  └── Texto: Nationality
│
├── Card 3: Idade
│  ├── Ícone de calendário
│  └── Texto: Age
│
└── Card 4: Status
   ├── Ícone de coração
   └── Badge colorido (Alive/Dead/Unknown)
```

#### Elemento: INFORMAÇÕES FÍSICAS
```
├── Grid 4 colunas (2 em tablet, 1 em mobile)
│
├── Card 1: Raça
├── Card 2: Gênero
├── Card 3: Altura (ou múltiplas se houver)
└── Card 4: Cor da Pele
```

#### Elemento: LOCALIZAÇÕES
```
├── Seção: "Localização"
├── Lista de itens dinâmica
│  ├── Ícone de mapa
│  └── Nome do local
└── Hover effect com animação
```

#### Elemento: LOCAIS DE MORTE (se houver)
```
├── Seção: "Locais de Morte" (se aplicável)
├── Lista de itens com X vermelho
├── Styling diferente (red theme)
└── Hover effect diferente
```

#### Elemento: BOTÃO VOLTAR
```
├── Seção actions
├── Botão grande em destaque
└── Leva de volta para index.html
```

---

## 🎯 COMO USAR - Passo a Passo

### Uso Básico

```
1. Página carrega
   └─ Loading spinner aparece
   └─ Requisições à API começam
   └─ TODOS os personagens são carregados

2. Spinner desaparece
   └─ Cards dos personagens aparecem
   └─ 100+ cards visíveis

3. Digite na barra de busca
   └─ Resultado filtra em tempo real
   └─ Busca por nome, descrição, origem, raça

4. Clique em "Ver Detalhes"
   └─ Navega para detalhes.html
   └─ URL muda para: detalhes.html?id=kratos
   └─ Página de detalhes carrega

5. Veja as informações completas
   └─ Descrição full
   └─ Todas as informações biográficas
   └─ Todos os dados físicos
   └─ Localizações

6. Clique "Voltar"
   └─ Volta para index.html
```

---

## 🔍 EXEMPLOS DE BUSCA

### Exemplos Funcionam

```
Digitando: "kratos"
├─ Encontra: Kratos (nome)
└─ Resultado: 1 card

Digitando: "sparta"
├─ Encontra: Kratos (nasceu em Sparta)
├─ Encontra: Qualquer outro de Sparta
└─ Resultado: múltiplos cards

Digitando: "god"
├─ Encontra: "God of War" nas descrições
├─ Encontra: Raça "God"
└─ Resultado: vários cards

Digitando: "atreus"
├─ Encontra: Atreus (nome exato)
├─ Encontra: Menções em outras descrições
└─ Resultado: múltiplos cards

Digitando: ""
├─ Campo vazio
└─ Exibe TODOS os personagens (reset)

Clique "Limpar Filtro"
├─ Limpa o campo de busca
└─ Exibe TODOS os personagens
```

---

## 🎨 Experiência Visual

### Desktop (>1200px)
```
┌─────────────────────────────────┐
│         NAVBAR                  │
├─────────────────────────────────┤
│         HERO SECTION            │
├─────────────────────────────────┤
│         SEARCH                  │
├─────────────────────────────────┤
│  [Card]  [Card]  [Card]         │
│  [Card]  [Card]  [Card]         │
│  [Card]  [Card]  [Card]         │
├─────────────────────────────────┤
│         FOOTER                  │
└─────────────────────────────────┘

Grid: 3 colunas
```

### Tablet (768px - 1200px)
```
┌──────────────────────────┐
│      NAVBAR              │
├──────────────────────────┤
│    HERO SECTION          │
├──────────────────────────┤
│    SEARCH                │
├──────────────────────────┤
│  [Card]  [Card]          │
│  [Card]  [Card]          │
│  [Card]  [Card]          │
├──────────────────────────┤
│      FOOTER              │
└──────────────────────────┘

Grid: 2 colunas
```

### Mobile (<768px)
```
┌──────────────┐
│    NAVBAR    │
├──────────────┤
│ HERO SECTION │
├──────────────┤
│   SEARCH     │
├──────────────┤
│   [Card]     │
│   [Card]     │
│   [Card]     │
├──────────────┤
│   FOOTER     │
└──────────────┘

Grid: 1 coluna
```

---

## ⚙️ Configurações Técnicas

### Variáveis CSS (theme)
```css
--primary-dark: #0a0e27       /* Fundo escuro */
--accent-gold: #d4af37        /* Ouro (destaque) */
--accent-red: #dc2626         /* Vermelho (status) */
--text-light: #e5e7eb         /* Texto claro */
--text-muted: #9ca3af         /* Texto muted */
--border-color: #374151       /* Bordas */
--transition: all 0.3s ease   /* Animações */
```

### Constantes JavaScript
```javascript
const API_BASE_URL = 'https://god-of-war-api.onrender.com'
const CHARACTERS_ENDPOINT = '/characters'
const DEBOUNCE_DELAY = 300 // ms
```

---

## 🐛 Troubleshooting

### Problema: "Personagens não carregam"

```
Verificar:
1. Conexão com internet ✓
2. URL da API acessível (https://god-of-war-api.onrender.com/characters)
3. Console do navegador (F12)
   └─ Ver se há erros específicos
4. Aguardar 5 segundos (API pode ser lenta)
5. Clicar em "Tentar Novamente"
```

### Problema: "Busca não funciona"

```
Verificar:
1. Aguardar 300ms após digitar (debounce)
2. Buscar por termos que existem:
   └─ Nome do personagem
   └─ Parte da descrição
   └─ Origem (Ex: "Sparta")
   └─ Raça (Ex: "God")
3. Console para ver resultados (scripts roda?)
```

### Problema: "Página de detalhes branca"

```
Verificar:
1. URL contém ?id=kratos (por exemplo)
2. ID do personagem existe na API
3. Console (F12) para erros
4. Voltar e tentar novamente
```

### Problema: "Animações não funcionam"

```
Verificar:
1. CSS carregou (verificar em DevTools)
2. Navegador suporta CSS3 moderno
3. Hardware aceleração habilitada
   └─ Chrome: chrome://flags
```

---

## 📊 Dados Exibidos

### Por Personagem

```
Página Principal:
├── Nome
├── Imagem (preview)
├── Descrição (150 chars)
├── Origem
├── Raça
├── Idade
└── Gênero

Página Detalhes:
├── Nome (grande)
├── Imagem (grande)
├── Descrição (completa)
├── Origem
├── Nacionalidade
├── Idade
├── Status (com badge)
├── Raça
├── Gênero
├── Altura
├── Cor da pele
├── Localizações (lista)
└── Locais de morte (se houver)
```

---

## 🚀 Performance

### Otimizações Implementadas

```
1. Promise.allSettled()
   └─ Requisições em paralelo
   └─ Não aguarda as lentas

2. Debounce de busca
   └─ Aguarda 300ms antes de filtrar
   └─ Reduz processamento

3. Lazy loading (possível expansão)
   └─ Carregar mais ao scroll

4. Cache da API (futuro)
   └─ localStorage para dados

5. Minificação (produção)
   └─ Arquivos menores
```

### Tempo de Carregamento

```
Ideal (conexão boa):
├─ 0-2s: DOM renderiza
├─ 1-3s: API carrega personagens
├─ 2-5s: Cards aparecem
└─ 5-10s: Todos os personagens

Conexão lenta:
├─ 5-10s: DOM
├─ 10-30s: API
└─ 15-40s: Cards

Ações do user:
├─ Busca: < 300ms
├─ Clique detalhes: instantâneo (navegar)
└─ Página detalhes carrega: 1-3s
```

---

## ✅ Checklist Para Apresentação

```
Antes de apresentar, verificar:

□ Aplicação abre sem erros
□ Todos os personagens carregam (100+)
□ Busca funciona por:
  □ Nome
  □ Descrição
  □ Origem
  □ Raça
  □ Nacionalidade
□ Botão "Limpar Filtro" reseta
□ Clique em "Ver Detalhes" navega
□ Página de detalhes exibe dados completos
□ Botão "Voltar" funciona
□ Layout responsivo em mobile
□ Animações funcionam suavemente
□ Mensagens de erro aparecem (se houver erro)
□ Console não tem erros (F12)
□ Código comentado e legível
□ README atualizado
```

---

## 🎓 Conceitos Para Explicar

Ao apresentar, esteja pronto para explicar:

1. **Promise.allSettled()** - Por que usar em vez de Promise.all()
2. **URLSearchParams** - Como navegar entre páginas com parâmetros
3. **Fetch API** - Fluxo de requisição e tratamento de erros
4. **Debounce** - Otimização de eventos de digitação
5. **DOM Manipulation** - Criar e renderizar elementos dinamicamente
6. **Sanitização HTML** - Prevenção de XSS
7. **CSS Avançado** - Gradientes, animações, transições
8. **Responsividade** - Media queries e adaptação

---

**Pronto para usar e apresentar! 🚀✨**
