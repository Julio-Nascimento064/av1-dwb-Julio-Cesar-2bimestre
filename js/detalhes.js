// ========================================
// CONFIGURAÇÕES E CONSTANTES - DETALHES
// ========================================

const API_BASE_URL = 'https://god-of-war-api.onrender.com';

// Elementos DOM
const elementsDOM = {
    loadingSpinner: document.getElementById('loadingSpinner'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    detailsContainer: document.getElementById('detailsContainer'),
    
    // Hero section
    heroImage: document.getElementById('heroImage'),
    characterName: document.getElementById('characterName'),
    characterShortInfo: document.getElementById('characterShortInfo'),
    
    // Seção de descrição
    characterDescription: document.getElementById('characterDescription'),
    
    // Informações biográficas
    infoBirthplace: document.getElementById('info-birthplace'),
    infoNationality: document.getElementById('info-nationality'),
    infoAge: document.getElementById('info-age'),
    infoStatus: document.getElementById('info-status'),
    
    // Informações físicas
    infoRace: document.getElementById('info-race'),
    infoGender: document.getElementById('info-gender'),
    infoHeight: document.getElementById('info-height'),
    infoSkin: document.getElementById('info-skin'),
    
    // Seções dinâmicas
    locationSection: document.getElementById('locationSection'),
    locationList: document.getElementById('locationList'),
    deathplaceSection: document.getElementById('deathplaceSection'),
    deathplaceList: document.getElementById('deathplaceList'),
};

// ========================================
// FUNÇÃO: Obter parâmetros da URL
// ========================================
/**
 * Extrai o parâmetro 'id' da URL usando URLSearchParams
 * @returns {string|null} ID do personagem ou null
 */
function getCharacterIdFromURL() {
    // Cria um objeto URLSearchParams da string de query
    // Exemplo: ?id=kratos → { id: 'kratos' }
    const params = new URLSearchParams(window.location.search);
    
    // Obtém o valor do parâmetro 'id'
    const id = params.get('id');
    
    console.log('Parâmetro URL obtido:', id);
    
    return id;
}

// ========================================
// FUNÇÃO: Buscar personagem da API
// ========================================
/**
 * Busca os detalhes completos de um personagem na API
 * @param {string} characterId - ID do personagem (ex: 'kratos')
 * @returns {Promise<Object>} Dados completos do personagem
 */
async function fetchCharacterFromAPI(characterId) {
    try {
        // Constrói a URL da API: /characters/kratos
        const url = `${API_BASE_URL}/characters/${characterId}`;
        
        console.log(`Buscando personagem em: ${url}`);
        
        const response = await fetch(url);
        
        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro HTTP ${response.status}: Personagem não encontrado`);
        }
        
        // Converte resposta JSON
        const data = await response.json();
        
        console.log('Personagem carregado:', data);
        
        return data;
    } catch (error) {
        console.error('Erro ao buscar personagem:', error);
        throw error;
    }
}

// ========================================
// FUNÇÃO: Renderizar detalhes na página
// ========================================
/**
 * Renderiza todos os detalhes do personagem na página
 * @param {Object} character - Dados completos do personagem
 */
function renderCharacterDetails(character) {
    try {
        // HERO IMAGE E NOME
        const image = character.image || 'https://via.placeholder.com/800x600?text=Sem+Imagem';
        elementsDOM.heroImage.src = image;
        elementsDOM.heroImage.alt = character.name;
        
        // NOME E INFO CURTA
        elementsDOM.characterName.textContent = character.name || 'Desconhecido';
        
        // Cria info curta (raça + origem)
        const race = character.physicalInformation?.race || 'Desconhecido';
        const birthplace = character.biographicalInformation?.birthplace || 'Desconhecido';
        elementsDOM.characterShortInfo.textContent = `${race} • ${birthplace}`;
        
        // DESCRIÇÃO COMPLETA
        const description = character.description || 'Sem descrição disponível.';
        elementsDOM.characterDescription.innerHTML = sanitizeHTML(description);
        
        // ===== INFORMAÇÕES BIOGRÁFICAS =====
        
        elementsDOM.infoBirthplace.textContent = birthplace;
        
        const nationality = character.biographicalInformation?.nationality || 'Desconhecido';
        elementsDOM.infoNationality.textContent = nationality;
        
        const age = character.biographicalInformation?.age || 'Desconhecido';
        elementsDOM.infoAge.textContent = age;
        
        const status = character.biographicalInformation?.status || 'Desconhecido';
        elementsDOM.infoStatus.innerHTML = getStatusBadge(status);
        
        // ===== INFORMAÇÕES FÍSICAS =====
        
        elementsDOM.infoRace.textContent = race;
        
        const gender = character.physicalInformation?.gender || 'Desconhecido';
        elementsDOM.infoGender.textContent = gender;
        
        // Altura (pode ser um array)
        const height = character.physicalInformation?.height;
        let heightText = 'Desconhecido';
        if (height) {
            heightText = Array.isArray(height) ? height.join(' / ') : height;
        }
        elementsDOM.infoHeight.textContent = heightText;
        
        // Cor da pele
        const skinColor = character.physicalInformation?.skin_colour || 'Desconhecido';
        elementsDOM.infoSkin.textContent = skinColor;
        
        // ===== LOCALIZAÇÃO =====
        
        const locations = character.biographicalInformation?.location;
        if (locations && Array.isArray(locations) && locations.length > 0) {
            renderLocationList(locations, elementsDOM.locationList);
        } else {
            elementsDOM.locationSection.classList.add('d-none');
        }
        
        // ===== LUGARES DE MORTE =====
        
        const deathplaces = character.biographicalInformation?.deathplace;
        if (deathplaces && Array.isArray(deathplaces) && deathplaces.length > 0) {
            renderDeathplaceList(deathplaces, elementsDOM.deathplaceList);
        } else {
            elementsDOM.deathplaceSection.classList.add('d-none');
        }
    } catch (error) {
        console.error('Erro ao renderizar detalhes:', error);
        showError('Erro ao exibir informações do personagem.');
    }
}

// ========================================
// FUNÇÃO: Renderizar lista de localizações
// ========================================
/**
 * Renderiza lista de localizações onde o personagem está/esteve
 * @param {Array} locations - Array de localizações
 * @param {HTMLElement} container - Container para inserir items
 */
function renderLocationList(locations, container) {
    container.innerHTML = '';
    
    locations.forEach((location, index) => {
        const item = document.createElement('div');
        item.className = 'location-item';
        item.innerHTML = `
            <div class="location-marker">
                <i class="fas fa-map-pin"></i>
            </div>
            <div class="location-info">
                <span class="location-name">${location}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// ========================================
// FUNÇÃO: Renderizar lista de locais de morte
// ========================================
/**
 * Renderiza lista de locais onde o personagem morreu
 * @param {Array} deathplaces - Array de locais de morte
 * @param {HTMLElement} container - Container para inserir items
 */
function renderDeathplaceList(deathplaces, container) {
    container.innerHTML = '';
    
    // Muda o título da seção
    elementsDOM.deathplaceSection.querySelector('.section-title').textContent = 'Locais de Morte';
    
    deathplaces.forEach((deathplace, index) => {
        const item = document.createElement('div');
        item.className = 'location-item death-location';
        item.innerHTML = `
            <div class="location-marker death-marker">
                <i class="fas fa-cross"></i>
            </div>
            <div class="location-info">
                <span class="location-name">${deathplace}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// ========================================
// FUNÇÃO: Obter badge de status
// ========================================
/**
 * Retorna um HTML com badge colorido baseado no status
 * @param {string} status - Status do personagem
 * @returns {string} HTML do badge
 */
function getStatusBadge(status) {
    const statusLower = status.toLowerCase();
    
    let color = 'secondary';
    let icon = 'fa-question';
    
    if (statusLower.includes('alive') || statusLower.includes('vivo')) {
        color = 'success';
        icon = 'fa-heart';
    } else if (statusLower.includes('dead') || statusLower.includes('morto')) {
        color = 'danger';
        icon = 'fa-skull';
    } else if (statusLower.includes('unknown') || statusLower.includes('desconhecido')) {
        color = 'warning';
        icon = 'fa-question';
    }
    
    return `<span class="badge bg-${color}"><i class="fas ${icon}"></i> ${status}</span>`;
}

// ========================================
// FUNÇÕES AUXILIARES: UI
// ========================================

/**
 * Exibe o container de carregamento
 */
function showLoading() {
    elementsDOM.loadingSpinner.classList.remove('d-none');
    elementsDOM.detailsContainer.classList.add('d-none');
    elementsDOM.errorMessage.classList.add('d-none');
}

/**
 * Esconde o container de carregamento
 */
function hideLoading() {
    elementsDOM.loadingSpinner.classList.add('d-none');
}

/**
 * Exibe mensagem de erro
 * @param {string} message - Mensagem de erro
 */
function showError(message) {
    elementsDOM.errorText.textContent = message;
    elementsDOM.errorMessage.classList.remove('d-none');
    elementsDOM.detailsContainer.classList.add('d-none');
    elementsDOM.loadingSpinner.classList.add('d-none');
}

/**
 * Exibe o container de detalhes
 */
function showDetails() {
    elementsDOM.detailsContainer.classList.remove('d-none');
    elementsDOM.loadingSpinner.classList.add('d-none');
    elementsDOM.errorMessage.classList.add('d-none');
}

// ========================================
// FUNÇÃO AUXILIAR: Sanitizar HTML
// ========================================
/**
 * Sanitiza HTML para evitar XSS
 * Preserva quebras de linha e mantém texto seguro
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
function sanitizeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    let sanitized = div.innerHTML;
    
    // Converte quebras de linha em <br>
    sanitized = sanitized.replace(/\n\n+/g, '</p><p>');
    sanitized = sanitized.replace(/\n/g, '<br>');
    
    return `<p>${sanitized}</p>`;
}

// ========================================
// FUNÇÃO: Carregar e exibir personagem
// ========================================
/**
 * Orquestra todo o processo de carregamento e exibição
 */
async function loadCharacterDetails() {
    try {
        // Exibe loading
        showLoading();
        
        // Obtém ID da URL
        const characterId = getCharacterIdFromURL();
        
        // Valida se ID foi fornecido
        if (!characterId) {
            throw new Error('Nenhum personagem foi especificado na URL');
        }
        
        // Busca dados na API
        const character = await fetchCharacterFromAPI(characterId);
        
        // Renderiza detalhes
        renderCharacterDetails(character);
        
        // Exibe container de detalhes
        hideLoading();
        showDetails();
        
        console.log('Personagem carregado e renderizado com sucesso');
    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        
        const mensagem = error.message || 'Erro desconhecido ao carregar o personagem';
        showError(mensagem);
    }
}

// ========================================
// INICIALIZAÇÃO
// ========================================

/**
 * Inicializa a página quando o DOM está pronto
 */
function initializeDetailsPage() {
    console.log('Página de detalhes inicializada');
    loadCharacterDetails();
}

// Executa quando DOM está pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDetailsPage);
} else {
    initializeDetailsPage();
}
