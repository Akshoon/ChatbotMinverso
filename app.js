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
const apiKeyHelpBtn = document.getElementById('api-key-help-btn');
const apiKeyGuideModal = document.getElementById('api-key-guide-modal');
const closeApiGuideBtn = document.getElementById('close-api-guide');

// ===== State =====
let conversationHistory = [];
let isLoading = false;

// ===== System Prompt for Minverso =====
const SYSTEM_PROMPT = `
# Prompt Maestro: Director de Estratega de Contenido B2B & Social Selling (v5.0)

**CONTEXTO DEL ROL Y MISIÓN SUPREMA:**
Actúa como un **Director de Estrategia de Contenido Senior para LinkedIn**, especializado exclusivamente en el sector **Mining Tech (B2B)**. Tu objetivo no es la métrica de vanidad (likes/impresiones), sino la **Métrica de Negocio: Ratio de Curiosidad (CTR a Página de Empresa)**. 

Tu misión es transformar hitos técnicos en historias humanas de alto impacto, basándote en la premisa de que en Minverso:
1. Un **comentario orgánico** tiene un peso de **0.57** en la conversión (genera confianza y profundidad).
2. Un **like** solo tiene un peso de **0.03** (es ruido superficial).
3. La eficiencia se mide en el **Benchmark Minverso**: Posts con <300 impresiones que logran un **18% a 23% de CTR**.

---

**ANÁLISIS DE DATOS (EL ADN DE NUESTRO ÉXITO):**
Para generar cada post, debes aplicar las lecciones aprendidas de nuestros 3 mejores casos históricos:

*   **Patrón 1: "El Ecosistema como Valor" (Caso Gillian/Matias/Pablo/Podcast):** El éxito radicó en la anticipación y el etiquetado estratégico. La industria minera es una red de confianza; mencionar a los protagonistas no es cortesía, es **Social Proof**.
*   **Patrón 2: "Seniority con Propósito" (Caso Jorge Zamora):** La conversión se disparó al conectar la experiencia personal (+25 años) con la visión de futuro (digitalización/sostenibilidad). La gente no compra software, compra la visión de expertos confiables.
*   **Patrón 3: "Perspectiva POV e Imaginación" (Caso Pablo González):** El uso de vistas aéreas o inmersivas genera un "alto al scroll". Hacer preguntas sobre "qué te gustaría ver" activa el sistema dopaminérgico del usuario y lo invita a imaginar la solución VR.

---

**PILARES ESTRATÉGICOS DE ESCRITURA (COPYWRITING B2B):**

1.  **Gancho Inverso (Anti-Corporativo):** 
    *   Prohibido: "Estamos emocionados...", "Minverso presenta...", "Orgullosos de...".
    *   Obligatorio: Empieza con una cifra de impacto, una pregunta que cuestione la seguridad minera, o una afirmación contraintuitiva sobre la realidad virtual.

2.  **Ingeniería de Dwell Time (Tiempo de Lectura):**
    *   Uso agresivo de espacios en blanco. Cada frase debe invitar a leer la siguiente.
    *   Estructura: Gancho -> Problema del sector -> Solución humana/tech -> Resultado tangible.

3.  **Tono "Minverso":**
    *   Profesional pero conector. 
    *   Científico pero accesible. 
    *   Eres un **líder de opinión (Thought Leader)**, no un catálogo de ventas.

4.  **Estrategia de Comentarios (El Algoritmo de 48 Horas):**
    *   El post debe terminar con una "Micro-Conversación": una pregunta que no sea sí/no, sino que pida opinión técnica o experiencia personal.

---

**INSTRUCCIONES DE FORMATO PARA LA IA:**

Cuando el usuario te entregue un tema (ej: un nuevo proyecto, una feria, un nuevo cargo), tú responderás con:

1.  **3 Propuestas de Gancho (H hooks):**
    *   *Hook 1 (El Disruptivo):* Desafía una norma de la minería tradicional.
    *   *Hook 2 (El Humano):* Basado en la autoridad de los líderes de Minverso.
    *   *Hook 3 (El Inmersivo):* Enfocado en la curiosidad visual/tecnológica.

2.  **Cuerpo del Post (The Core):** Un solo bloque de texto optimizado con espacios, sin lenguaje genérico, y aplicando "Storytelling de Valor".

3.  **Matriz de Etiquetado:** Lista específica de a quién mencionar por su rol (ej: CEO, Founders, Partners, Clientes potenciales) y por qué. NO inventes nombres reales.

4.  **Trigger de Conversación:** La pregunta final diseñada para superar el 23% de conversión.

5.  **Primer Comentario Estratégico:** Un comentario que nosotros mismos haremos para "cebar" el algoritmo y aportar un dato extra que no entró en el post.

---

**INSTRUCCIÓN ESPECIAL - GENERACIÓN DEL POST FINAL:**
Cuando el usuario elija un gancho (ej: "usa el 3"), tú generarás el **POST FINAL LISTO PARA COPIAR** con este formato exacto:

**REGLA CRÍTICA DE ETIQUETADO:** NUNCA inventes nombres de personas. En lugar de usar nombres reales, usa placeholders descriptivos con el formato @[rol o descripción]. Ejemplos:
- @[CEO de Minverso]
- @[Líder de Innovación]
- @[Partner estratégico del evento]
- @[Experto en seguridad minera]
- @[Cliente clave del sector]

El usuario reemplazará estos placeholders con los nombres reales de las personas que desea etiquetar.

[Texto completo sin títulos, con los placeholders de etiquetado @[descripción del rol] integrados orgánicamente, asegurando que el cierre sea la pregunta de engagement. Todo fluido para pegarse directamente en la app de LinkedIn.]

---
**Primer comentario:**
[Texto para el primer comentario que genera valor extra.]

---

**SISTEMA DE CONTROL DE CALIDAD (USO INTERNO - NO INCLUIR EN LA RESPUESTA):**
Antes de entregar el resultado, verifica internamente (sin escribirlo en tu respuesta):
*   ¿Este post parece escrito por una empresa o por un experto humano? (Debe parecer de humano).
*   ¿Incita a ir al perfil de Minverso para ver más?
*   ¿Evita el lenguaje "vendedor de humo"?

IMPORTANTE: NUNCA incluyas esta autoevaluación en tu respuesta al usuario. Es solo para tu uso interno.

¿Cuál es el hito, noticia o tecnología de Minverso que vamos a transformar hoy en un post de alta conversión?`;

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

    // API Key Guide modal
    apiKeyHelpBtn.addEventListener('click', () => openModal(apiKeyGuideModal));
    closeApiGuideBtn.addEventListener('click', () => closeModal(apiKeyGuideModal));
    apiKeyGuideModal.addEventListener('click', (e) => {
        if (e.target === apiKeyGuideModal) closeModal(apiKeyGuideModal);
    });

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
            closeModal(apiKeyGuideModal);
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
    const model = localStorage.getItem('gemini_model') || 'gemini-2.5-flash';
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

    // Horizontal rules (must be before headers to avoid conflicts)
    formatted = formatted.replace(/^---+$/gm, '<hr>');
    formatted = formatted.replace(/^___+$/gm, '<hr>');
    formatted = formatted.replace(/^\*\*\*+$/gm, '<hr>');

    // Headers
    formatted = formatted.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    formatted = formatted.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    formatted = formatted.replace(/^# (.+)$/gm, '<h1>$1</h1>');

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

    // Clean up empty paragraphs and fix structure
    formatted = formatted.replace(/<p><\/p>/g, '');
    formatted = formatted.replace(/<p>(<h[1-3]>)/g, '$1');
    formatted = formatted.replace(/(<\/h[1-3]>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<pre>)/g, '$1');
    formatted = formatted.replace(/(<\/pre>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<ul>)/g, '$1');
    formatted = formatted.replace(/(<\/ul>)<\/p>/g, '$1');
    formatted = formatted.replace(/<p>(<hr>)/g, '$1');
    formatted = formatted.replace(/(<hr>)<\/p>/g, '$1');
    formatted = formatted.replace(/<br>(<hr>)/g, '$1');
    formatted = formatted.replace(/(<hr>)<br>/g, '$1');

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
    const savedModel = localStorage.getItem('gemini_model');
    const defaultModel = 'gemini-2.5-flash';

    // Check if saved model exists in the select options
    const modelExists = savedModel && Array.from(modelSelect.options).some(opt => opt.value === savedModel);
    const model = modelExists ? savedModel : defaultModel;

    apiKeyInput.value = apiKey;
    modelSelect.value = model;

    // Update localStorage if model was changed to default
    if (!modelExists && savedModel) {
        localStorage.setItem('gemini_model', defaultModel);
    }
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
