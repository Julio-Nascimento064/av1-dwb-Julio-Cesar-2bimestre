// ========================================
// CONFIGURAÇÕES E CONSTANTES
// ========================================

const API_BASE_URL = 'https://god-of-war-api.onrender.com';
const CHARACTERS_ENDPOINT = '/characters';

// Elementos DOM
const elementsDOM = {
    searchInput: document.getElementById('searchInput'),
    resetBtn: document.getElementById('resetBtn'),
    charactersContainer: document.getElementById('charactersContainer'),
    loadingSpinner: document.getElementById('loadingSpinner'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    retryBtn: document.getElementById('retryBtn'),
    charactersSection: document.getElementById('charactersSection'),
    noResultsMessage: document.getElementById('noResultsMessage'),
};

// Estado da aplicação
let allCharacters = [];
let filteredCharacters = [];

// ========================================
// FUNÇÃO: Buscar dados da API
// ========================================
/**
 * Busca a lista de personagens da API
 * @returns {Promise<Array>} Array com dados dos personagens
 */
async function fetchCharactersList() {
    try {
        showLoading(true);
        
        const response = await fetch(`${API_BASE_URL}${CHARACTERS_ENDPOINT}`);
        
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Retorna um array com os nomes/paths dos personagens
        return data;
    } catch (error) {
        console.error('Erro ao buscar lista de personagens:', error);
        throw error;
    }
}

// ========================================
// FUNÇÃO: Buscar detalhes de um personagem
// ========================================
/**
 * Busca os detalhes completos de um personagem específico
 * @param {string} characterPath - Path do personagem (ex: 'characters/kratos')
 * @returns {Promise<Object>} Dados completos do personagem
 */
async function fetchCharacterDetails(characterPath) {
    try {
        const response = await fetch(`${API_BASE_URL}/${characterPath}`);
        
        if (!response.ok) {
            throw new Error(`Erro ao buscar detalhes: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao buscar detalhes de ${characterPath}:`, error);
        return null;
    }
}

// ========================================
// FUNÇÃO: Carregar todos os personagens
// ========================================
/**
 * Carrega a lista completa de personagens com seus detalhes
 * Executa as requisições em paralelo com Promise.allSettled()
 * OTIMIZADO para carregar TODOS os personagens sem travamentos
 */
async function loadAllCharacters() {
    try {
        showLoading(true);
        hideError();
        
        // Busca a lista de paths dos personagens
        const characterPaths = await fetchCharactersList();
        
        console.log(`Total de personagens encontrados na API: ${characterPaths.length}`);
        
        // Cria array de promises para buscar detalhes de TODOS os personagens
        // Promise.allSettled() garante que todas as requisições sejam tentadas
        // mesmo se algumas falharem
        const characterPromises = characterPaths.map(path => 
            fetchCharacterDetails(path)
        );
        
        console.log(`Iniciando carregamento de ${characterPromises.length} personagens...`);
        
        // Aguarda TODAS as requisições em paralelo
        // allSettled() retorna: { status: 'fulfilled'/'rejected', value/reason }
        const results = await Promise.allSettled(characterPromises);
        
        // Filtra apenas os resultados bem-sucedidos e válidos
        allCharacters = results
            .filter(result => result.status === 'fulfilled' && result.value !== null)
            .map(result => result.value);
        
        console.log(`Personagens carregados com sucesso: ${allCharacters.length}`);
        
        // Inicialmente, personagens filtrados = todos os personagens
        filteredCharacters = [...allCharacters];
        
        // Exibe os personagens
        renderCharacters(filteredCharacters);
        
        showLoading(false);
    } catch (error) {
        console.error('Erro ao carregar personagens:', error);
        showError(`Não foi possível carregar os personagens. Erro: ${error.message}`);
        showLoading(false);
    }
}

// ========================================
// FUNÇÃO: Renderizar personagens
// ========================================
/**
 * Renderiza os cards dos personagens na tela
 * @param {Array} characters - Array de personagens para renderizar
 */
function renderCharacters(characters) {
    // Limpa container
    elementsDOM.charactersContainer.innerHTML = '';
    
    // Se não houver personagens, exibe mensagem
    if (characters.length === 0) {
        elementsDOM.noResultsMessage.classList.remove('d-none');
        elementsDOM.charactersSection.classList.add('d-none');
        return;
    }
    
    // Esconde mensagem de "nenhum resultado"
    elementsDOM.noResultsMessage.classList.add('d-none');
    elementsDOM.charactersSection.classList.remove('d-none');
    
    // Cria card para cada personagem
    characters.forEach(character => {
        const card = createCharacterCard(character);
        elementsDOM.charactersContainer.appendChild(card);
    });
}

// ========================================
// FUNÇÃO: Criar card do personagem
// ========================================
/**
 * Cria um elemento DOM para o card de um personagem
 * @param {Object} character - Dados do personagem
 * @returns {HTMLElement} Elemento do card
 */
function createCharacterCard(character) {
    // Extrai informações do personagem
    const name = character.name || 'Desconhecido';
    const description = character.description || 'Sem descrição disponível.';
    const image = character.image || 'https://via.placeholder.com/300x300?text=Sem+Imagem';
    
    // Extrai informações biográficas
    const birthplace = character.biographicalInformation?.birthplace || 'Desconhecido';
    const age = character.biographicalInformation?.age || 'Desconhecido';
    const status = character.biographicalInformation?.status || 'Desconhecido';
    const nationality = character.biographicalInformation?.nationality || 'Desconhecido';
    
    // Extrai informações físicas
    const race = character.physicalInformation?.race || 'Desconhecido';
    const gender = character.physicalInformation?.gender || 'Desconhecido';
    
    // Limita descrição a 150 caracteres para preview
    const descriptionPreview = truncateText(description, 150);
    
    // Cria ID seguro para o personagem (remove caracteres especiais)
    const characterId = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    
    // Cria elemento do card
    const card = document.createElement('div');
    card.className = 'character-card';
    card.innerHTML = `
        <div class="card-image-wrapper">
            <img 
                src="${image}" 
                alt="${name}" 
                class="character-image"
                onerror="this.src='https://via.placeholder.com/300x300?text=${encodeURIComponent(name)}'"
            >
            <div class="card-overlay"></div>
        </div>
        <div class="character-content">
            <h3 class="character-name">${name}</h3>
            <p class="character-description">${sanitizeHTML(descriptionPreview)}</p>
            <div class="character-info">
                <div class="info-item">
                    <span class="info-label">Origem</span>
                    <span class="info-value">${birthplace}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Raça</span>
                    <span class="info-value">${race}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Idade</span>
                    <span class="info-value">${age}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Gênero</span>
                    <span class="info-value">${gender}</span>
                </div>
            </div>
            <button class="btn-details" data-character="${characterId}">
                <i class="fas fa-arrow-right"></i> Ver Detalhes
            </button>
        </div>
    `;
    
    // Adiciona evento de clique para navegar para página de detalhes
    const detailsBtn = card.querySelector('.btn-details');
    detailsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToDetails(characterId);
    });
    
    return card;
}

// ========================================
// FUNÇÃO: Filtrar personagens
// ========================================
/**
 * Filtra personagens com base no termo de busca
 * @param {string} searchTerm - Termo a buscar
 */
function filterCharacters(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (term === '') {
        // Se vazio, mostra todos
        filteredCharacters = [...allCharacters];
    } else {
        // Filtra por nome, descrição ou origem
        filteredCharacters = allCharacters.filter(character => {
            const name = character.name?.toLowerCase() || '';
            const description = character.description?.toLowerCase() || '';
            const birthplace = character.biographicalInformation?.birthplace?.toLowerCase() || '';
            const nationality = character.biographicalInformation?.nationality?.toLowerCase() || '';
            
            return (
                name.includes(term) ||
                description.includes(term) ||
                birthplace.includes(term) ||
                nationality.includes(term)
            );
        });
    }
    
    // Renderiza personagens filtrados
    renderCharacters(filteredCharacters);
}

// ========================================
// FUNÇÃO: Resetar filtro
// ========================================
/**
 * Reseta o campo de pesquisa e exibe todos os personagens
 */
function resetFilter() {
    elementsDOM.searchInput.value = '';
    filteredCharacters = [...allCharacters];
    renderCharacters(filteredCharacters);
}

// ========================================
// FUNÇÕES AUXILIARES: UI
// ========================================

/**
 * Exibe ou esconde o spinner de carregamento
 * @param {boolean} show - true para exibir, false para esconder
 */
function showLoading(show) {
    if (show) {
        elementsDOM.loadingSpinner.classList.remove('d-none');
    } else {
        elementsDOM.loadingSpinner.classList.add('d-none');
    }
}

/**
 * Exibe mensagem de erro
 * @param {string} message - Mensagem de erro
 */
function showError(message) {
    elementsDOM.errorText.textContent = message;
    elementsDOM.errorMessage.classList.remove('d-none');
    elementsDOM.charactersSection.classList.add('d-none');
}

/**
 * Esconde mensagem de erro
 */
function hideError() {
    elementsDOM.errorMessage.classList.add('d-none');
    elementsDOM.charactersSection.classList.remove('d-none');
}

// ========================================
// FUNÇÕES AUXILIARES: TEXTO
// ========================================

/**
 * Trunca texto a um número máximo de caracteres
 * @param {string} text - Texto original
 * @param {number} maxLength - Comprimento máximo
 * @returns {string} Texto truncado com "..."
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
        return text;
    }
    return text.substring(0, maxLength) + '...';
}

/**
 * Sanitiza HTML para evitar XSS
 * Remove quebras de linha e caracteres especiais desnecessários
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    let sanitized = div.innerHTML;
    
    // Remove quebras de linha extras
    sanitized = sanitized.replace(/\n\n+/g, ' ');
    
    return sanitized;
}

// ========================================
// FUNÇÃO: Navegação para página de detalhes
// ========================================
/**
 * Navega para a página de detalhes do personagem
 * Usa URLSearchParams para passar o ID do personagem
 * @param {string} characterId - ID do personagem
 */
function navigateToDetails(characterId) {
    // Encontra o personagem no array
    const character = allCharacters.find(char => {
        const id = char.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
        return id === characterId;
    });
    
    if (!character) {
        console.error('Personagem não encontrado:', characterId);
        return;
    }
    
    // Cria URLSearchParams com o nome do personagem
    const params = new URLSearchParams();
    params.append('id', character.name.toLowerCase().replace(/\s+/g, '_'));
    
    // Navega para página de detalhes
    window.location.href = `detalhes.html?${params.toString()}`;
}

// ========================================
// EVENT LISTENERS
// ========================================

// Evento de digitação no campo de busca (com debounce)
let searchTimeout;
elementsDOM.searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        filterCharacters(e.target.value);
    }, 300);
});

// Evento de clique no botão de reset
elementsDOM.resetBtn.addEventListener('click', resetFilter);

// Evento de clique no botão de retry
elementsDOM.retryBtn.addEventListener('click', loadAllCharacters);

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a aplicação quando o DOM está pronto
 */
function initializeApp() {
    console.log('Aplicação inicializada. Carregando personagens...');
    loadAllCharacters();
}

// Executa inicialização quando DOM está pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}
