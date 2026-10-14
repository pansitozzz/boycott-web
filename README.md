# BOYCOTT WEB 2026 — Proyecto organizado (V13)

Este proyecto parte de `BOYCOTT_WEB_2026_V13_DEMO(1).html` y **mantiene su contenido y diseño**, con HTML, CSS, JavaScript e imágenes separados.

## Estructura

```text
BOYCOTT_WEB_ORDENADO/
├── index.html            ← estructura de la web y enlaces a los recursos
├── css/
│   ├── fonts.css         ← tipografías incrustadas (sin archivos de fuentes aparte)
│   ├── foundation.css    ← estilos de base conservados
│   ├── experience.css    ← diseño editorial y responsive
│   └── overrides.css     ← correcciones visuales V10–V13
├── js/
│   ├── data.js           ← PRODUCTOS, PRECIOS, INGREDIENTES y categorías
│   ├── graphics.js       ← ilustraciones SVG de productos
│   ├── characters.js     ← nombres y rutas de los personajes
│   ├── home.js           ← página principal y sección de personajes
│   ├── menu.js           ← carta y página de cada producto
│   ├── pages.js          ← locales, nosotros, eventos y pedir
│   ├── router.js         ← navegación, menú responsive y rutas
│   └── motion.js         ← poses, animaciones y asistente
├── assets/
│   ├── characters/       ← personajes individuales (400/1000 px) y logo
│   └── products/         ← ilustración de portada
└── .nojekyll             ← compatibilidad con GitHub Pages
```

## ¿Dónde hago los cambios?

- **Cambiar precios, productos e ingredientes:** `js/data.js` (arreglo `products`).
- **Cambiar foto/pose de un personaje:** `assets/characters/` y las referencias de `js/characters.js`.
- **Cambiar la portada o el texto principal:** `js/home.js`.
- **Cambiar cómo se muestra la carta:** `js/menu.js` y `css/experience.css`.
- **Cambiar otros textos o páginas:** `js/pages.js`.
- **Cambiar animaciones:** `js/motion.js`.
- **Modificar colores y diseño:** `css/foundation.css`, `css/experience.css`, `css/overrides.css` (revisa la prioridad CSS antes de eliminar reglas).
- **Cambiar enlaces de pedidos o ubicaciones:** `js/data.js`.

**Importante:** Los estilos se conservaron por capas de versiones anteriores para no alterar el resultado visual. No se eliminaron reglas duplicadas automáticamente; la consolidación de CSS sería una optimización posterior que necesita revisar visualmente cada página.

## Probar localmente

Desde la carpeta donde está `index.html`, ejecuta:

```bash
python -m http.server 8000
```

Después entra a `http://localhost:8000`.

Si no tienes Python, también puedes probarlo con la extensión **Live Server** de VS Code. No requiere Node.js, npm, React ni compilación.

## Publicar en GitHub Pages

1. Crea un repositorio GitHub, por ejemplo `boycott-web`.
2. **Sube los archivos y carpetas contenidos en este proyecto** a la raíz del repositorio; deja `index.html` en la raíz.
3. En `Settings → Pages`, selecciona `Deploy from a branch` y la rama `main` con carpeta `/ (root)`.
4. Al terminar, GitHub te dará un enlace `https://TU_USUARIO.github.io/boycott-web/`.

La web sigue siendo una propuesta conceptual, sin base de datos, procesamiento de pedidos ni encuestas conectadas. Para guardar encuestas y estadísticas hará falta un servicio externo adicional.

### Consideraciones

- Mantén el orden de los `<link>` CSS y `<script>` JS en `index.html`. Utiliza scripts clásicos con `defer`, no módulos ES.
- Las rutas `assets/` son relativas y funcionan en el subdirectorio de GitHub Pages.
- El archivo original ponía todas las imágenes en Base64; ahora son archivos individuales para editar o sustituir fácilmente.
- `css/fonts.css` contiene las tipografías originales como datos incrustados; no borres su contenido si quieres conservar el mismo aspecto.
- El `meta robots=noindex,nofollow` se conserva: es una demostración conceptual no oficial.
