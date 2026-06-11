# God of War - Characters Browser (Versão Profissional 2.0)

Aplicação web **completa e profissional** para explorar personagens do universo God of War utilizando uma API pública. **Versão evoluída com página de detalhes, navegação entre páginas e carregamento de TODOS os personagens.**

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como atividade escolar de Desenvolvimento Web (2º Bimestre). A aplicação foi **evoluída para uma versão profissional e completa** que consome dados da [God of War API](https://god-of-war-api.onrender.com/) e exibe os personagens em uma interface cinematográfica e responsiva.

**Status:** ✅ Versão 2.0 - Completa e Profissional

## 🎨 Características

### ✨ Novidades da Versão 2.0
- ✅ **Carregamento de TODOS os personagens** (sem limitação)
- ✅ **Página de detalhes do personagem** (detalhes.html)
- ✅ **Navegação via URLSearchParams** (dinâmica e segura)
- ✅ **Layout cinematográfico** na página de detalhes
- ✅ **Informações completas:** origem, raça, gênero, idade, status, localizações
- ✅ **Animações suaves** e transições elegantes
- ✅ **Botão "Ver Detalhes"** em cada card
- ✅ **Busca em tempo real** otimizada para todos os personagens
- ✅ **Estrutura totalmente profissional**

### ✅ Base (Versão 1.0)
- ✅ Listagem de personagens
- ✅ Barra de pesquisa funcional
- ✅ Design temático (escuro e elegante)
- ✅ Loading spinner e tratamento de erros
- ✅ Responsividade total
- ✅ Código bem documentado

## 🚀 Como Usar

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Conexão com a internet

### Executar Localmente

1. **Clone ou baixe o projeto**
```bash
git clone <url-do-repositorio>
cd av1-dwb-seu-nome-sobrenome-2bimestre
```

2. **Abra no navegador**
```bash
# Opção 1: Duplo clique em index.html
# Opção 2: Usar um servidor local (recomendado)
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

## 📁 Estrutura do Projeto

```
av1-dwb-Julio-Cesar-2bimestre/
├── index.html              # Página principal (listagem)
├── detalhes.html          # Página de detalhes (NEW)
├── css/
│   └── style.css          # Estilos completos (atualizado)
├── js/
│   ├── script.js          # Lógica página principal (atualizado)
│   └── detalhes.js        # Lógica página detalhes (NEW)
└── README.md              # Documentação
```

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos avançados com gradientes e animações
- **JavaScript Puro** - Sem frameworks frontend
- **Bootstrap 5** - Responsividade via CDN
- **Font Awesome 6** - Ícones
- **Fetch API** - Requisições HTTP
- **Async/Await** - Programação assíncrona
- **Promise.allSettled()** - Requisições paralelas robustas
- **URLSearchParams** - Navegação entre páginas
- **God of War API** - Dados dos personagens

## 📖 Documentação Técnica - Versão 2.0

### 1️⃣ CARREGAMENTO DE TODOS OS PERSONAGENS

#### Antes (Limitado)
```javascript
const charactersToFetch = characterPaths.slice(0, 20);
```

#### Depois (TODOS)
```javascript
async function loadAllCharacters() {
    const characterPaths = await fetchCharactersList();
    
    const characterPromises = characterPaths.map(path => 
        fetchCharacterDetails(path)
    );
    
    // Requisições em paralelo - robustas
    const results = await Promise.allSettled(characterPromises);
    
    allCharacters = results
        .filter(r => r.status === 'fulfilled' && r.value !== null)
        .map(r => r.value);
}
```

**Por que Promise.allSettled()?**
- ✅ Tenta TODAS as requisições em paralelo
- ✅ Continua mesmo se algumas falharem
- ✅ Não quebra a aplicação
- ✅ Mais robusto que Promise.all()

---

### 2️⃣ NAVEGAÇÃO COM URLSearchParams

#### Enviar para página de detalhes (script.js)
```javascript
function navigateToDetails(characterId) {
    // Cria URLSearchParams
    const params = new URLSearchParams();
    params.append('id', characterId);
    
    // Resultado: detalhes.html?id=kratos
    window.location.href = `detalhes.html?${params.toString()}`;
}
```

#### Receber na página de detalhes (detalhes.js)
```javascript
function getCharacterIdFromURL() {
    // URLSearchParams lê ?id=kratos automaticamente
    const params = new URLSearchParams(window.location.search);
    
    // Extrai valor de 'id'
    const id = params.get('id');
    
    return id;
}
```

**Fluxo completo:**
```
1. User clica em "Ver Detalhes" de Kratos
2. navigateToDetails('kratos') chamado
3. URL muda para: detalhes.html?id=kratos
4. Página carrega, detalhes.js executa
5. getCharacterIdFromURL() → 'kratos'
6. Requisição: /characters/kratos
7. Exibe informações completas
```

---

### 3️⃣ PÁGINA DE DETALHES (NOVA)

#### Estrutura (detalhes.html)
```html
<!-- Hero section -->
<section class="details-hero">
    <img id="heroImage" src="">
    <h1 id="characterName"></h1>
</section>

<!-- Descrição -->
<section class="details-section">
    <p id="characterDescription"></p>
</section>

<!-- Info grid -->
<div class="info-grid">
    <div class="info-card">
        <span id="info-birthplace"></span>
    </div>
</div>

<!-- Localizações dinâmicas -->
<div id="locationList"></div>

<!-- Locais de morte -->
<div id="deathplaceList"></div>
```

#### Renderização (detalhes.js)
```javascript
async function loadCharacterDetails() {
    showLoading();
    
    const characterId = getCharacterIdFromURL();
    const character = await fetchCharacterFromAPI(characterId);
    
    renderCharacterDetails(character);
    showDetails();
}

function renderCharacterDetails(character) {
    // Imagem
    elementsDOM.heroImage.src = character.image;
    
    // Nome
    elementsDOM.characterName.textContent = character.name;
    
    // Descrição (sanitizada)
    elementsDOM.characterDescription.innerHTML = 
        sanitizeHTML(character.description);
    
    // Informações biográficas
    elementsDOM.infoBirthplace.textContent = 
        character.biographicalInformation?.birthplace;
    
    // Listas dinâmicas
    renderLocationList(character.biographicalInformation?.location);
    renderDeathplaceList(character.biographicalInformation?.deathplace);
}
```

---

### 4️⃣ BUSCA OTIMIZADA

Busca em **TODOS** os personagens carregados:

```javascript
function filterCharacters(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    filteredCharacters = allCharacters.filter(char => {
        return (
            char.name.toLowerCase().includes(term) ||
            char.description.toLowerCase().includes(term) ||
            char.biographicalInformation?.birthplace.toLowerCase().includes(term) ||
            char.biographicalInformation?.nationality.toLowerCase().includes(term) ||
            char.physicalInformation?.race.toLowerCase().includes(term)
        );
    });
    
    renderCharacters(filteredCharacters);
}
```

**Com Debounce (otimização):**
```javascript
let searchTimeout;
elementsDOM.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        filterCharacters(e.target.value);
    }, 300); // Aguarda 300ms após última digitação
});
```

---

### 5️⃣ TRATAMENTO DE ERROS

```javascript
async function loadCharacterDetails() {
    try {
        showLoading();
        
        const characterId = getCharacterIdFromURL();
        if (!characterId) throw new Error('ID não fornecido');
        
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erro ${response.status}`);
        
        const character = await response.json();
        renderCharacterDetails(character);
        
        hideLoading();
        showDetails();
    } catch (error) {
        console.error('Erro:', error);
        showError(error.message);
    }
}
```

---

### 6️⃣ DESIGN CINEMATOGRÁFICO

**Cards com hover avançado:**
```css
.character-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 48px rgba(212, 175, 55, 0.25);
}

.character-card:hover .character-image {
    transform: scale(1.08);
}
```

**Hero Detalhes:**
```css
.character-hero-name {
    background: linear-gradient(90deg, var(--accent-gold), #fbbf24);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
```

**Info Cards:**
```css
.info-card {
    border-left: 3px solid var(--accent-gold);
    transition: all 0.3s ease;
}

.info-card:hover {
    border-left-color: #fbbf24;
    background: rgba(212, 175, 55, 0.1);
}
```

### JavaScript (`script.js`)

O JavaScript é estruturado em seções lógicas:

#### 1. **Constantes e Configuração**
```javascript
const API_BASE_URL = 'https://god-of-war-api.onrender.com';
const CHARACTERS_ENDPOINT = '/characters';
const elementsDOM = { /* Referências DOM */ };
let allCharacters = [];
let filteredCharacters = [];
```

#### 2. **Fetch API - Async/Await**

**`fetchCharactersList()`** - Busca lista de paths
```javascript
async function fetchCharactersList() {
    try {
        const response = await fetch(`${API_BASE_URL}${CHARACTERS_ENDPOINT}`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}
```

**`fetchCharacterDetails(characterPath)`** - Busca dados de um personagem
```javascript
async function fetchCharacterDetails(characterPath) {
    try {
        const response = await fetch(`${API_BASE_URL}/${characterPath}`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Erro ao buscar ${characterPath}:`, error);
        return null; // Retorna null em caso de erro
    }
}
```

### JavaScript (`script.js` + `detalhes.js`)

O JavaScript é estruturado em seções lógicas, profissionais e bem documentadas.

#### Arquivos:
- **script.js** - Página principal (lista de personagens)
- **detalhes.js** - Página de detalhes (informações completas)

---

## 🔄 Fluxo de Navegação

```
┌──────────────────────────┐
│     index.html          │
│  Listagem de TODOS      │
│  os personagens         │
│  - Cards interativos    │
│  - Barra de pesquisa    │
│  - "Ver Detalhes"       │
└─────────┬────────────────┘
          │
          │ User clica "Ver Detalhes"
          │
          ▼
┌──────────────────────────────┐
│  detalhes.html?id=kratos    │
│  Informações Completas      │
│  - Hero image grande        │
│  - Descrição completa       │
│  - Biográficas              │
│  - Físicas                  │
│  - Localizações             │
│  - Locais de morte          │
└──────────────────────────────┘
```

---

## 📊 Dados da API

```json
{
  "name": "Kratos",
  "description": "...",
  "image": "...",
  "biographicalInformation": {
    "birthplace": "Sparta",
    "nationality": "Greek",
    "age": "1,055",
    "status": "Alive",
    "location": ["Sparta", "Olympus", "Midgard"],
    "deathplace": ["Charon's Ferry", "Pandora's Temple"]
  },
  "physicalInformation": {
    "race": "God",
    "gender": "Male",
    "height": ["234 cm", "194 cm"],
    "skin_colour": "Olive"
  }
}
```

---

## 📱 Responsividade

### Desktop (>768px)
- Grid: 3 colunas
- Hero detalhes: 500px
- Font sizes: 100%

### Tablet (480px - 768px)
- Grid: 1-2 colunas
- Hero detalhes: 350px
- Font sizes: 95%

### Mobile (<480px)
- Grid: 1 coluna
- Hero detalhes: 250px
- Font sizes: 90%

---

## 🔐 Segurança

### XSS Prevention
```javascript
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text; // Escapa HTML
    return div.innerHTML;
}
```

### Validações
```javascript
if (!characterId) throw new Error('ID não fornecido');
if (!response.ok) throw new Error(`Erro ${response.status}`);
character.image || 'placeholder.jpg';
```

---

## 💡 Conceitos Avançados Aplicados

| Conceito | Implementação |
|----------|--------------|
| **Promise.allSettled()** | Carregamento paralelo robusto |
| **URLSearchParams** | Navegação entre páginas |
| **Async/Await** | Requisições assíncronas |
| **Fetch API** | Comunicação com API |
| **Debounce** | Otimização de pesquisa |
| **Gradient Text** | Efeito visual avançado |
| **CSS Grid** | Layout responsivo |
| **Event Listeners** | Interatividade |
| **Array Methods** | Map, filter, find |
| **Optional Chaining** | `?.` para segurança |

---

## 🚀 Futuras Melhorias

- [ ] Filtros avançados (raça, origem, status)
- [ ] Ordenação (A-Z, idade, nacionalidade)
- [ ] Favoritos com localStorage
- [ ] Comparador de personagens
- [ ] Timeline interativa
- [ ] Paginação infinita
- [ ] PWA (modo offline)
- [ ] Modo noturno/claro toggle
- [ ] Testes unitários (Jest)
- [ ] Documentação Swagger

---

## 📝 Autor

Desenvolvido como atividade escolar - **DWB 2º Bimestre (Versão 2.0 Profissional)**

**Data:** Maio de 2025

---

## 📄 Licença

Livre para uso educacional

---

**Última atualização:** Maio de 2025 - ✅ Versão 2.0 completa e profissional
