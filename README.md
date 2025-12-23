## 📋 Características

- 🤖 Potenciado por Google Gemini AI (2.0, 2.5 y 3.0)
- 🎯 Prompt especializado en contenido B2B para minería e innovación
- 🎨 Diseño premium con paleta de colores Minverso
- 💬 Historial de conversación contextual
- 📝 Formato Markdown en respuestas
- ⚙️ Configuración persistente en localStorage

## 🛠️ Tecnologías

- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)
- Google Gemini API

## 🔧 Configuración

1. **Obtener API Key**
   - Visita [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Crea o selecciona un proyecto
   - Copia tu API Key

2. **Configurar en la aplicación**
   - Abre la aplicación
   - Haz clic en el ícono de configuración (⚙️)
   - Pega tu API Key
   - Selecciona el modelo deseado (recomendado: Gemini 2.0 Flash)
   - Guarda la configuración

## 📦 Uso Local

```bash
# Simplemente abre index.html en tu navegador
# No requiere instalación ni servidor
```

## 🌐 Despliegue en GitHub Pages

### Paso 1: Crear Repositorio

```bash
# En la carpeta del proyecto
git init
git add .
git commit -m "Initial commit: Chatbot Minverso"
```

### Paso 2: Subir a GitHub

1. Ve a [GitHub](https://github.com) y crea un nuevo repositorio
2. Nombra el repositorio (ej: `chatbot-minverso`)
3. **NO** inicialices con README (ya tienes uno)

### Paso 3: Activar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona **main** branch
5. Click en **Save**

**¡Listo!** Tu chatbot estará disponible en:
```
https://TU-USUARIO.github.io/chatbot-minverso
```

### Paso 4: Actualizar la URL en README

Edita este archivo y reemplaza la URL del demo con tu URL real.

## 📱 Uso

### Ejemplos de Prompts

**Para generar un post:**
```
Crea un post sobre el lanzamiento de nuestra nueva solución 
de capacitación en VR para operadores de maquinaria pesada
```

**Para reflexiones del sector:**
```
Escribe un post reflexivo sobre cómo la realidad virtual 
está transformando la seguridad minera
```

**Para eventos:**
```
Genera contenido para anunciar nuestra participación 
en ExpoMin 2024
```

### Formato de Salida

El chatbot generará automáticamente:

1. **3 Opciones de Gancho** - Diferentes ángulos para captar atención
2. **Cuerpo del Post** - Contenido humanizado y técnico
3. **Estrategia de Etiquetado** - Sugerencias de a quién mencionar
4. **Pregunta de Cierre** - Para maximizar comentarios
5. **Primer Comentario** - Para romper el hielo

## 🎯 Estrategia de Contenido

El chatbot está optimizado para:

- ✅ Maximizar el "Ratio de Curiosidad" (visitas a página de empresa)
- ✅ Priorizar comentarios orgánicos (0.57 conversión) vs likes (0.03)
- ✅ Aplicar los 4 pilares de contenido exitoso:
  1. Social Proof (validación)
  2. Gancho Inverso (disruptivo)
  3. Micro-Conversación (invitar a opinar)
  4. CTA de Curiosidad (no venta directa)

## 🔒 Seguridad

- Tu API Key se almacena **solo en tu navegador** (localStorage)
- No se envía a ningún servidor excepto Google AI
- Puedes borrar la configuración en cualquier momento

## 🛠️ Estructura del Proyecto

```
chatbot-minverso/
├── index.html      # Estructura HTML
├── styles.css      # Estilos con paleta Minverso
├── app.js          # Lógica + System Prompt
└── README.md       # Este archivo
```

## 📝 Personalización

### Cambiar Colores

Edita las variables CSS en `styles.css`:

```css
:root {
    --bringer-s-accent: #3F6EE9;        /* Azul principal */
    --bringer-s-text-accent: #5C9DFF;   /* Azul claro */
    /* ... más variables */
}
```

### Modificar Prompt del Sistema

Edita `SYSTEM_PROMPT` en `app.js` para ajustar:
- Tono de voz
- Especialidades
- Formato de salida
- Instrucciones de escritura

## 🤝 Contribuir

Si quieres mejorar el chatbot:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## 📄 Licencia

Proyecto desarrollado para **Minverso** - Transformación Digital Minera

## 🔗 Enlaces

- [Minverso](https://minverso.com)
- [Google AI Studio](https://aistudio.google.com)
- [Documentación Gemini API](https://ai.google.dev/gemini-api/docs)

---

**Desarrollado con ❤️ para Minverso**
