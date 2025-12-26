## Caracteristicas

- Potenciado por Google Gemini AI (2.5 y 3.0)
- Prompt especializado en contenido B2B para mineria e innovacion
- Diseno premium con paleta de colores Minverso
- Historial de conversacion contextual
- Formato Markdown en respuestas
- Configuracion persistente en localStorage

## Tecnologias

- HTML5
- CSS3 (Vanilla)
- JavaScript (Vanilla)
- Google Gemini API

## Configuracion

1. **Obtener API Key**
   - Visita [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Crea o selecciona un proyecto
   - Copia tu API Key

2. **Configurar en la aplicacion**
   - Abre la aplicacion
   - Haz clic en el icono de configuracion
   - Pega tu API Key
   - Selecciona el modelo deseado (recomendado: Gemini 2.5 Flash)
   - Guarda la configuracion

## Uso Local

```bash
# Simplemente abre index.html en tu navegador
# No requiere instalacion ni servidor
```

## Despliegue en GitHub Pages

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
2. Click en **Settings** (Configuracion)
3. En el menu lateral, click en **Pages**
4. En **Source**, selecciona **main** branch
5. Click en **Save**

**Listo!** Tu chatbot estara disponible en:
```
https://TU-USUARIO.github.io/chatbot-minverso
```

### Paso 4: Actualizar la URL en README

Edita este archivo y reemplaza la URL del demo con tu URL real.

## Uso

### Ejemplos de Prompts

**Para generar un post:**
```
Crea un post sobre el lanzamiento de nuestra nueva solucion 
de capacitacion en VR para operadores de maquinaria pesada
```

**Para reflexiones del sector:**
```
Escribe un post reflexivo sobre como la realidad virtual 
esta transformando la seguridad minera
```

**Para eventos:**
```
Genera contenido para anunciar nuestra participacion 
en ExpoMin 2024
```

### Formato de Salida

El chatbot generara automaticamente:

1. **3 Opciones de Gancho** - Diferentes angulos para captar atencion
2. **Cuerpo del Post** - Contenido humanizado y tecnico
3. **Estrategia de Etiquetado** - Sugerencias de a quien mencionar
4. **Pregunta de Cierre** - Para maximizar comentarios
5. **Primer Comentario** - Para romper el hielo

## Estrategia de Contenido

El chatbot esta optimizado para:

- Maximizar el "Ratio de Curiosidad" (visitas a pagina de empresa)
- Priorizar comentarios organicos (0.57 conversion) vs likes (0.03)
- Aplicar los 4 pilares de contenido exitoso:
  1. Social Proof (validacion)
  2. Gancho Inverso (disruptivo)
  3. Micro-Conversacion (invitar a opinar)
  4. CTA de Curiosidad (no venta directa)

## Seguridad

- Tu API Key se almacena **solo en tu navegador** (localStorage)
- No se envia a ningun servidor excepto Google AI
- Puedes borrar la configuracion en cualquier momento

## Estructura del Proyecto

```
chatbot-minverso/
├── index.html      # Estructura HTML
├── styles.css      # Estilos con paleta Minverso
├── app.js          # Logica + System Prompt
└── README.md       # Este archivo
```

## Personalizacion

### Modificar Prompt del Sistema

Edita `SYSTEM_PROMPT` en `app.js` para ajustar:
- Tono de voz
- Especialidades
- Formato de salida
- Instrucciones de escritura

## Contribuir

Si quieres mejorar el chatbot:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

## Licencia

Proyecto desarrollado para **Minverso** - Transformacion Digital Minera

## Enlaces

- [Minverso](https://minverso.com)
- [Google AI Studio](https://aistudio.google.com)
- [Documentacion Gemini API](https://ai.google.dev/gemini-api/docs)

---

**Desarrollado para Minverso**

