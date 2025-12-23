// ===== DOM Elements =====
const chatContainer = document.getElementById('chat-container');
const messagesContainer = document.getElementById('messages');
const welcomeMessage = document.getElementById('welcome-message');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const clearChatBtn = document.getElementById('clear-chat-btn');
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings');
const apiKeyInput = document.getElementById('api-key-input');
const toggleApiKeyBtn = document.getElementById('toggle-api-key');
const modelSelect = document.getElementById('model-select');
const saveSettingsBtn = document.getElementById('save-settings');
const loadingTemplate = document.getElementById('loading-template');
const suggestionChips = document.querySelectorAll('.chip');

// ===== State =====
let conversationHistory = [];
let isLoading = false;

// ===== System Prompt for Minverso =====
const SYSTEM_PROMPT = `Prompt Maestro: Generador de Contenido de Alta Conversión para Minverso

Contexto del Rol: Actúa como un Estratega de Contenido Senior especializado en LinkedIn B2B y algoritmos de Social Selling. Tu objetivo no es la viralidad vacía (impresiones), sino maximizar el "Ratio de Curiosidad" (visitas a la página de empresa). Te basarás en datos históricos que demuestran que en Minverso, los comentarios orgánicos tienen un impacto de 0.57 en la conversión, frente al 0.03 de los likes.

Información del Producto/Marca:
- Empresa: Minverso
- Sector: Transformación digital para la industria minera
- Propósito: Potenciar la transformación digital minera con soluciones inmersivas de realidad virtual, BIM e inteligencia artificial. Optimizar la capacitación y operación minera.
- Especialidades:
  * Realidad Virtual (VR)
  * Realidad Aumentada (AR)
  * Realidad Mixta (MR)
  * Inteligencia Artificial aplicada a minería
  * BIM (Building Information Modeling)
  * Capacitación y Academia inmersiva
  * Marketing y Comunicaciones con tecnologías inmersivas
- Valor diferencial: Expertos en crear experiencias inmersivas que permiten la interacción detallada con procedimientos y objetos, conectando personas desde cualquier ubicación geográfica
- Tono: Profesional, innovador, técnico pero accesible, conector de expertos de la industria minera y líder de opinión en tecnologías inmersivas

ADN del Post Exitoso (Basado en Datos): Cada post que generes DEBE cumplir con estos 4 pilares detectados en la auditoría:

1. Factor "Social Proof" (Validación): Debe incluir espacio para etiquetar a referentes o expertos de la industria minera y tecnológica. No hablamos solos, hablamos con la industria.

2. Gancho Inverso: No empieces con "Estamos felices de...", empieza con una pregunta disruptiva o una afirmación que desafíe el status quo del sector minero o tecnológico.

3. Estructura de "Micro-Conversación": El texto debe invitar a que la gente deje su opinión. Necesitamos comentarios para que el algoritmo trabaje 48 horas seguidas.

4. CTA de Curiosidad: El cierre no debe ser "Venta Directa", sino una invitación a explorar una solución tecnológica o un perfil que genere la visita a la página de empresa.

Instrucciones de Escritura:
- Prohibido: Usar lenguaje corporativo genérico, usar demasiados emojis o párrafos largos.
- Obligatorio: Uso de espacios en blanco (aire) entre líneas, lenguaje directo (tú/nosotros) y "Storytelling de Valor".
- Contexto técnico: Siempre conectar las soluciones inmersivas con resultados medibles en minería (seguridad, eficiencia, capacitación, reducción de costos)

Formato de Salida Requerido cuando el usuario solicite crear un post:

1. **Propuesta de Gancho (3 opciones):** Diferentes ángulos para atrapar al usuario en los primeros 3 segundos. Considera perspectivas desde: innovación minera, transformación digital, casos de éxito, desafíos de la industria.

2. **Cuerpo del Post:** Aplicando la técnica de "Humanización sobre Institucionalidad". Conecta la tecnología con impacto real en personas y operaciones.

3. **Estrategia de Etiquetado:** Sugerencia de a quién mencionar (expertos en minería, líderes de innovación, clientes, partners tecnológicos, influencers del sector).

4. **Pregunta de Cierre (Engagement):** Diseñada específicamente para disparar el número de comentarios. Relacionada con experiencias, opiniones o desafíos del sector.

5. **Primer Comentario Estratégico:** Sugerencia de qué debemos escribir nosotros mismos como primer comentario para romper el hielo y aportar valor adicional.

Recuerda: Eres un experto en contenido B2B para LinkedIn enfocado en la industria minera y tecnologías inmersivas. Ayuda al usuario a crear posts de alto engagement que posicionen a Minverso como líder de innovación en transformación digital minera.`;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
    adjustTextareaHeight();
});

// ===== Event Listeners =====
function setupEventListeners() {
    // Send message
    sendBtn.addEventListener('click', handleSendMessage);

    // Input handling
    messageInput.addEventListener('input', () => {
        adjustTextareaHeight();
        updateSendButtonState();
    });

    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    // Clear chat
    clearChatBtn.addEventListener('click', clearChat);

    // Settings modal
    settingsBtn.addEventListener('click', () => openModal(settingsModal));
    closeSettingsBtn.addEventListener('click', () => closeModal(settingsModal));
    settingsModal.addEventListener('click', (e) => {
        if (e.target === settingsModal) closeModal(settingsModal);
    });

    // Toggle API key visibility
    toggleApiKeyBtn.addEventListener('click', toggleApiKeyVisibility);

    // Save settings
    saveSettingsBtn.addEventListener('click', saveSettings);

    // Suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', () => {
            const suggestion = chip.dataset.suggestion;
            messageInput.value = suggestion;
            adjustTextareaHeight();
            updateSendButtonState();
            messageInput.focus();
        });
    });

    // Close modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(settingsModal);
        }
    });
}

// ===== Message Handling =====
async function handleSendMessage() {
    const message = messageInput.value.trim();

    if (!message || isLoading) return;

    const apiKey = localStorage.getItem('gemini_api_key');

    if (!apiKey) {
        openModal(settingsModal);
        showNotification('Por favor, ingresa tu API Key de Gemini', 'warning');
        return;
    }

    // Hide welcome message
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }

    // Add user message
    addMessage(message, 'user');
    messageInput.value = '';
    adjustTextareaHeight();
    updateSendButtonState();

    // Show loading indicator
    isLoading = true;
    const loadingElement = showLoadingIndicator();

    try {
        const response = await sendToGemini(message, apiKey);
        loadingElement.remove();
        addMessage(response, 'ai');
    } catch (error) {
        loadingElement.remove();
        addMessage(`Error: ${error.message}`, 'ai', true);
    } finally {
        isLoading = false;
    }
}

function addMessage(content, sender, isError = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;

    const avatarSvg = sender === 'user'
        ? `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>
           </svg>`
        : `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>`;

    const formattedContent = sender === 'ai' ? formatMarkdown(content) : escapeHtml(content);

    messageDiv.innerHTML = `
        <div class="message-avatar">
            ${avatarSvg}
        </div>
        <div class="message-content ${isError ? 'error-message' : ''}">
            ${formattedContent}
        </div>
    `;

    messagesContainer.appendChild(messageDiv);
    scrollToBottom();

    // Add to conversation history
    conversationHistory.push({
        role: sender === 'user' ? 'user' : 'model',
        parts: [{ text: content }]
    });
}

function showLoadingIndicator() {
    const loadingClone = loadingTemplate.content.cloneNode(true);
    messagesContainer.appendChild(loadingClone);
    scrollToBottom();
    return messagesContainer.querySelector('.loading-message');
}

// ===== Gemini API =====
async function sendToGemini(message, apiKey) {
    const model = localStorage.getItem('gemini_model') || 'gemini-2.0-flash';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    // Build the contents array with conversation history
    const contents = [...conversationHistory, {
        role: 'user',
        parts: [{ text: message }]
    }];

    const requestBody = {
        contents: contents,
        systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
        },
        safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
        ]
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || `Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
            return data.candidates[0].content.parts[0].text;
        } else if (data.promptFeedback?.blockReason) {
            throw new Error(`Contenido bloqueado: ${data.promptFeedback.blockReason}`);
        } else {
            throw new Error('No se recibió respuesta válida de la API');
        }
    } catch (error) {
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Error de conexión. Verifica tu conexión a internet.');
        }
        throw error;
    }
}

// ===== Utility Functions =====
function formatMarkdown(text) {
    // Escape HTML first
    let formatted = escapeHtml(text);

    // Code blocks
    formatted = formatted.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
        return `<pre><code class="language-${lang}">${code.trim()}</code></pre>`;
    });

    // Inline code
    formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    formatted = formatted.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    formatted = formatted.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Headers
    formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Blockquotes
    formatted = formatted.replace(/^&gt; (.+)$/gm, '<blockquote>$1</blockquote>');

    // Unordered lists
    formatted = formatted.replace(/^[•\-\*] (.+)$/gm, '<li>$1</li>');
    formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Ordered lists
    formatted = formatted.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Links
    formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Line breaks
    formatted = formatted.replace(/\n\n/g, '</p><p>');
    formatted = formatted.replace(/\n/g, '<br>');

    // Wrap in paragraph
    formatted = `<p>${formatted}</p>`;

    // Clean up empty paragraphs
    formatted = formatted.replace(/<p><\/p>/g, '');
    formatted = formatted.replace(/<p>(<h[1-3]>)/g, '$1');
    formatted = formatted.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<pre>)/g, '$1');
    formatted = formatted.replace(/(<\/pre>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<ul>)/g, '$1');
    formatted = formatted.replace(/(<\/ul>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<blockquote>)/g, '$1');
    formatted = formatted.replace(/(<\/blockquote>)<\/p>/g, '$1');

    return formatted;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function adjustTextareaHeight() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + 'px';
}

function updateSendButtonState() {
    sendBtn.disabled = !messageInput.value.trim() || isLoading;
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function clearChat() {
    messagesContainer.innerHTML = '';
    conversationHistory = [];

    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
    }

    showNotification('Chat limpiado', 'success');
}

// ===== Modal Functions =====
function openModal(modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== Settings =====
function loadSettings() {
    const apiKey = localStorage.getItem('gemini_api_key') || '';
    const model = localStorage.getItem('gemini_model') || 'gemini-2.0-flash';

    apiKeyInput.value = apiKey;
    modelSelect.value = model;
}

function saveSettings() {
    const apiKey = apiKeyInput.value.trim();
    const model = modelSelect.value;

    if (!apiKey) {
        showNotification('Por favor, ingresa una API Key válida', 'warning');
        return;
    }

    localStorage.setItem('gemini_api_key', apiKey);
    localStorage.setItem('gemini_model', model);

    closeModal(settingsModal);
    showNotification('Configuración guardada', 'success');
}

function toggleApiKeyVisibility() {
    const isPassword = apiKeyInput.type === 'password';
    apiKeyInput.type = isPassword ? 'text' : 'password';

    const eyeOpen = toggleApiKeyBtn.querySelector('.eye-open');
    const eyeClosed = toggleApiKeyBtn.querySelector('.eye-closed');

    eyeOpen.classList.toggle('hidden', !isPassword);
    eyeClosed.classList.toggle('hidden', isPassword);
}

// ===== Notifications =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
    `;

    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? 'rgba(34, 197, 94, 0.9)' :
            type === 'warning' ? 'rgba(234, 179, 8, 0.9)' :
                'rgba(59, 130, 246, 0.9)'};
        color: white;
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        animation: slideUp 0.3s ease;
    `;

    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideUp {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes slideDown {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(20px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
