/* BOYCOTT · Navegación, render y menú móvil
   Se carga como script clásico, en orden desde index.html. */

// Microanimaciones editoriales: se aplican solo si el navegador las soporta
// y el visitante NO ha pedido reducir movimiento.
function setupReveals(){
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const nodes=[...APP.querySelectorAll('.home-products .section-h, .home-product-grid .product-card, .chapter, .home-story, .locations-teaser, .home-bottom-editorial > *, .products-grid .product-card, .location-page-card, .story-values article, .event-feature')];
  const observer=new IntersectionObserver((entries)=>{
    for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}
  },{threshold:.08,rootMargin:'0px 0px 45px 0px'});
  nodes.forEach((n,i)=>{n.classList.add('reveal-target');n.style.setProperty('--reveal-delay',Math.min(i%4*55,165)+'ms');observer.observe(n)});
}
function syncNav(path){document.querySelectorAll('[data-route]').forEach(a=>{const active=a.dataset.route===path;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')});}
function render(){const preserveMenuScroll=!!APP.querySelector('.category-bar');const previousScroll=window.scrollY||0;let hash=(location.hash||'#/').slice(2);if(hash.startsWith('/'))hash=hash.slice(1);const [routeWithParams]=hash.split('/');const [route,qs]=routeWithParams.split('?');if(route==='menu'&&!qs)state.cat='ALL';if(route==='menu'&&qs){const cat=new URLSearchParams(qs).get('cat');if(categories.some(c=>c[0]===cat))state.cat=cat;}
 const productMatch=hash.match(/^menu\/([\w-]+)$/);
 const key=productMatch?'detail':(route||'home');if(key==='menu')APP.innerHTML=menu();else if(key==='detail')APP.innerHTML=detail(productMatch[1]);else if(key==='locales')APP.innerHTML=locales();else if(key==='concepto')APP.innerHTML=concepto();else if(key==='nosotros')APP.innerHTML=nosotros();else if(key==='eventos')APP.innerHTML=eventos();else if(key==='pedir')APP.innerHTML=pedir();else APP.innerHTML=home();syncNav(key==='detail'?'menu':key);
 wireCategories();closeMenu();window.scrollTo({top:key==='menu'&&preserveMenuScroll?previousScroll:0,behavior:'instant'});
 document.title=(key==='home'?'Inicio':key==='menu'?'Carta':key==='detail'?'Detalle de producto':key==='locales'?'Locales':key==='nosotros'?'Nosotros':key==='eventos'?'Eventos':key==='pedir'?'Pedir':'Concepto')+' | BOYCOTT — Propuesta conceptual';
 APP.dispatchEvent(new CustomEvent('boycott:render',{detail:{key}}));
}
function wireCategories(){APP.querySelectorAll('[data-cat]').forEach(btn=>btn.addEventListener('click',()=>{const next='#/menu?cat='+encodeURIComponent(btn.dataset.cat);if(location.hash!==next)location.hash=next;}));}
const drawer=document.querySelector('#mobileDrawer'),toggle=document.querySelector('#navToggle');function closeMenu(){drawer.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menú')}toggle.addEventListener('click',()=>{const open=drawer.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Cerrar menú':'Abrir menú');});drawer.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});window.addEventListener('hashchange',render);render();
const intro=document.querySelector('#intro');const dismiss=()=>{intro.classList.add('hidden');try{sessionStorage.setItem('boycottIntroSeen','1')}catch(e){}};document.querySelector('#skipIntro').addEventListener('click',dismiss);
let seen=false;try{seen=sessionStorage.getItem('boycottIntroSeen')==='1'}catch(e){};
if(seen||matchMedia('(prefers-reduced-motion: reduce)').matches)intro.classList.add('hidden');else setTimeout(dismiss,1250);
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&drawer.classList.contains('open')){closeMenu();toggle.focus()}});
