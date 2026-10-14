/* BOYCOTT · Personajes, poses y rutas de sus imágenes
   Se carga como script clásico, en orden desde index.html. */

// V9: user-supplied character artwork, preserved without anatomical changes.
const CHARACTERS = {
 bola:['boycott1.1','boycott1.2','boycott1.3','boycott1.4','boycott1.5','boycott1.6'],
 burger:['burger1.2','burger1.3','burger1.1'],
 fries:['potato1.2','potato1.3','potato1.1'],
 wrap:['wrap1.1','wrap1.2'],drink:['drink1.2','drink1.1','drink1.3']
};
function assetUrl(path){return path}
function characterImg(id,cls='',alt='',extra=''){
 return `<img class="character ${cls}" data-base="${id}" src="${assetUrl('assets/characters/'+id+'-1000.webp')}" srcset="${assetUrl('assets/characters/'+id+'-400.webp')} 400w, ${assetUrl('assets/characters/'+id+'-1000.webp')} 1000w" sizes="(max-width:720px) 220px, 360px" width="1000" height="1000" alt="${escapeHTML(alt)}" decoding="async" ${extra}>`;
}
