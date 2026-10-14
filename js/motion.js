/* BOYCOTT · Animaciones, transiciones y asistente de navegación
   Se carga como script clásico, en orden desde index.html. */

/* V13: motion and context layer. Native V8 routes/catalog remain in app.js. */
(() => {
 'use strict';
 const $=s=>document.querySelector(s);
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=false,hiddenByUser=false;
 try{paused=sessionStorage.getItem('boycott_motion_paused')==='1';hiddenByUser=sessionStorage.getItem('boycott_v9_guide_hidden')==='1'}catch{}
 const guide=$('#boycottGuide'),panel=$('#guideTip'),mascot=$('#guideMascot'),guideImage=$('#guideCharacter'),restore=$('#guideRestore');
 let poseControllers=[];
 let tipTimer=null,tipDue=false,tipSerial=0;
 let open=false,index=0,restored=false,scrollScheduled=false,heroTimer=null,revealObserver=null,heroVisible=true;
 const tips={
  home:{crew:'bola',items:[['¿YA VISTE LA CARTA?','VER CARTA','#/menu'],['CINCO PERSONAJES. MUCHA ACTITUD.','CONOCE AL CREW','#/nosotros']]},
  menu:{crew:'burger',items:[['¿EMPEZAMOS POR LAS OG?','VER OG','#/menu?cat=OG'],['LAS PAPAS COMPLETAN EL PLAN.','VER SIDES','#/menu?cat=SIDES']]},
  locales:{crew:'wrap',items:[['ENCUENTRA TU DEALER.','VER LOCALES','#/locales'],['ARMA EL PLAN ANTES DE SALIR.','EXPLORAR CARTA','#/menu']]},
  nosotros:{crew:'bola',items:[['CADA PERSONAJE TIENE SU ACTITUD.','EXPLORAR CARTA','#/menu'],['¿UN GIRO DIFERENTE?','VER WRAPS','#/menu?cat=WRAPS']]},
  eventos:{crew:'fries',items:[['¿BUSCAS NOVEDADES?','CANALES DE LA MARCA','https://linktr.ee/boycott.pe'],['UN BUEN PLAN EMPIEZA AQUÍ.','VER LOCALES','#/locales']]},
  pedir:{crew:'drink',items:[['ELIGE UN CANAL EXTERNO.','VER OPCIONES','#/pedir'],['¿YA ELEGISTE TU ANTOJO?','VOLVER A CARTA','#/menu']]},
  detail:{crew:'burger',items:[['¿REVISASTE LOS INGREDIENTES?','VER INGREDIENTES','ingredients'],['¿ALGO PARA ACOMPAÑAR?','VER SIDES','#/menu?cat=SIDES']]}
 };
 const route=()=>{const r=(location.hash||'#/').slice(2).split('?')[0];return r.startsWith('menu/')?'detail':r||'home'};
 const motionAllowed=()=>!paused&&!reduce.matches&&!document.hidden;
 function persist(key,value){try{sessionStorage.setItem(key,value)}catch{}}
 function setArtwork(img,id){
  const size=img===guideImage?400:1000;
  img.src=assetUrl(`assets/characters/${id}-${size}.webp`);img.dataset.activePose=id;
  if(img!==guideImage)img.srcset=`${assetUrl(`assets/characters/${id}-400.webp`)} 400w, ${assetUrl(`assets/characters/${id}-1000.webp`)} 1000w`;
 }
 function bindPose(host){
  const base=host.querySelector('img[data-pose]');if(!base)return;
  const parent=base.parentElement;if(getComputedStyle(parent).position==='static')parent.style.position='relative';
  const layer=document.createElement('img');layer.className='pose-overlay';layer.alt='';layer.setAttribute('aria-hidden','true');layer.draggable=false;
  layer.src=assetUrl(`assets/characters/${base.dataset.pose}-1000.webp`);
  layer.srcset=`${assetUrl(`assets/characters/${base.dataset.pose}-400.webp`)} 400w, ${assetUrl(`assets/characters/${base.dataset.pose}-1000.webp`)} 1000w`;
  layer.sizes=base.sizes;parent.append(layer);base.classList.add('pose-base');
  let ready=false,hover=false,focus=false,auto=false,disposed=false;
  const align=()=>{if(disposed)return;Object.assign(layer.style,{left:base.offsetLeft+'px',top:base.offsetTop+'px',width:base.offsetWidth+'px',height:base.offsetHeight+'px'})};
  const update=()=>{if(disposed)return;align();const show=ready&&motionAllowed()&&(hover||focus||auto);layer.style.opacity=show?'1':'0';base.style.opacity=show?'0':'1';host.dataset.poseState=show?'alternate':'base'};
  const loaded=()=>{ready=true;update()};
  if(layer.decode)layer.decode().then(loaded).catch(()=>{});else{layer.addEventListener('load',loaded,{once:true});if(layer.complete&&layer.naturalWidth)loaded()}
  host.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch'){hover=true;update()}});
  host.addEventListener('pointerleave',()=>{hover=false;auto=false;update()});
  host.addEventListener('focusin',()=>{focus=true;update()});host.addEventListener('focusout',e=>{if(!host.contains(e.relatedTarget)){focus=false;auto=false;update()}});
  base.addEventListener('load',align);addEventListener('resize',align,{passive:true});
  const observer='ResizeObserver'in window?new ResizeObserver(align):null;if(observer)observer.observe(base);
  align();return {host,refresh:update,toggle(){auto=!auto;update()},destroy(){disposed=true;observer?.disconnect();removeEventListener('resize',align)}};
 }
 function applyMotion(){
  poseControllers.forEach(c=>c.refresh());
  document.documentElement.classList.toggle('motion-paused',paused||reduce.matches);
  document.querySelectorAll('.motion-toggle').forEach(b=>{b.textContent=reduce.matches?'Movimiento reducido':paused?'Activar movimiento':'Pausar movimiento';b.setAttribute('aria-pressed',String(paused||reduce.matches));b.disabled=reduce.matches});
  if(paused||reduce.matches){document.documentElement.style.setProperty('--scroll-drift','0px');document.querySelectorAll('.pose-switch').forEach(i=>{clearTimeout(i._poseTimeout);i.classList.remove('pose-switch')})}
 }
 function paintTip(){
  const state=tips[route()]||tips.home,[copy,label,href]=state.items[index%state.items.length];
  $('#tipCopy').textContent=copy;const a=$('#tipAction');a.textContent=label+' ↗';a.href=href==='ingredients'?'#'+location.hash.slice(1):href;a.dataset.ingredients=String(href==='ingredients');
  if(href.startsWith('http')){a.target='_blank';a.rel='noopener noreferrer'}else{a.removeAttribute('target');a.removeAttribute('rel')}
  const families=['burger','fries','wrap','drink','bola'];const family=families[tipSerial%families.length];setArtwork(guideImage,CHARACTERS[family][Math.floor(tipSerial/families.length)%CHARACTERS[family].length]);guideImage.alt='';
 }
 function setPanel(value){open=value;panel.hidden=!value;mascot.setAttribute('aria-expanded',String(value));if(value)paintTip()}
 function scheduleTip(delay=120000){clearTimeout(tipTimer);tipDue=false;if(!hiddenByUser)tipTimer=setTimeout(()=>{tipDue=true;showScheduledTip()},delay)}
 function showScheduledTip(){if(!tipDue||hiddenByUser||document.hidden)return;tipDue=false;index=tipSerial;restored=true;setPanel(true);sync()}
 function closeTip(){setPanel(false);restored=false;tipSerial++;scheduleTip();sync()}
 function sync(){
  guide.hidden=hiddenByUser||!restored;guide.classList.toggle('is-active',!guide.hidden);restore.hidden=restored&&!hiddenByUser;
  const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);$('#readingProgress').style.width=Math.min(100,scrollY/max*100)+'%';
 }
 mascot.addEventListener('click',()=>{if(open)closeTip();else{clearTimeout(tipTimer);setPanel(true)}});
 $('#guideClose').addEventListener('click',()=>{closeTip();restore.focus()});
 $('#tipNext').addEventListener('click',()=>{index++;tipSerial++;paintTip()});
 $('#guideDismiss').addEventListener('click',()=>{hiddenByUser=true;clearTimeout(tipTimer);tipDue=false;setPanel(false);persist('boycott_v9_guide_hidden','1');sync();restore.focus()});
 restore.addEventListener('click',()=>{hiddenByUser=false;restored=true;clearTimeout(tipTimer);tipDue=false;persist('boycott_v9_guide_hidden','0');sync();setPanel(true);mascot.focus()});
 $('#tipAction').addEventListener('click',e=>{
  if(e.currentTarget.dataset.ingredients==='true'){e.preventDefault();const box=$('.ingredients');if(box){box.setAttribute('tabindex','-1');box.scrollIntoView({block:'center',behavior:motionAllowed()?'smooth':'instant'});box.focus({preventScroll:true})}}
  closeTip();
 });
 document.addEventListener('click',e=>{if(open&&!guide.contains(e.target)&&e.target!==restore)closeTip()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&open){closeTip();restore.focus()}});
 addEventListener('scroll',()=>{if(scrollScheduled)return;scrollScheduled=true;requestAnimationFrame(()=>{sync();if(motionAllowed()&&heroVisible)document.documentElement.style.setProperty('--scroll-drift',Math.min(22,scrollY*.045)+'px');scrollScheduled=false})},{passive:true});
 addEventListener('resize',sync,{passive:true});
 function setup(){
  poseControllers.forEach(c=>c.destroy());poseControllers=[];document.documentElement.style.setProperty('--scroll-drift','0px');clearInterval(heroTimer);if(revealObserver)revealObserver.disconnect();
  applyMotion();index=0;paintTip();sync();
  document.querySelectorAll('.motion-toggle').forEach(b=>b.addEventListener('click',()=>{paused=!paused;persist('boycott_motion_paused',paused?'1':'0');applyMotion()}));
  poseControllers=[...document.querySelectorAll('[data-pose-host]')].map(bindPose).filter(Boolean);
  heroVisible=true;const heroPose=poseControllers.find(c=>c.host.classList.contains('hero-v9-character'));
  if(heroPose)heroTimer=setInterval(()=>{if(motionAllowed()&&heroVisible)heroPose.toggle()},8000);
  if('IntersectionObserver'in window){
   revealObserver=new IntersectionObserver(entries=>{for(const entry of entries){
    if(entry.target.classList.contains('hero-v9')){heroVisible=entry.isIntersecting;entry.target.style.animationPlayState=heroVisible?'running':'paused';entry.target.querySelectorAll('.character').forEach(i=>i.style.animationPlayState=heroVisible?'running':'paused')}
    else if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target)}
   }},{threshold:.07});
   if($('.hero-v9'))revealObserver.observe($('.hero-v9'));
   if(motionAllowed())document.querySelectorAll('.chapter-v9,.product-card,.crew-tile,.story-v9,.local-card-v9,.story-values article,.event-feature,.event-story').forEach((node,i)=>{node.classList.add('v9-reveal');node.style.setProperty('--reveal-delay',(i%3)*55+'ms');revealObserver.observe(node)});
  }
 }
 APP.addEventListener('boycott:render',e=>{if(open)closeTip();setup();const selected=e.detail.key==='menu'?$('.category-btn.selected'):null;if(selected)selected.focus({preventScroll:true});else APP.focus({preventScroll:true})});
 reduce.addEventListener('change',()=>{applyMotion();if(reduce.matches)document.querySelectorAll('.v9-reveal').forEach(n=>n.classList.add('is-visible'))});
 document.addEventListener('visibilitychange',()=>{showScheduledTip();document.querySelectorAll('.hero-v9 .character').forEach(i=>i.style.animationPlayState=document.hidden?'paused':'running')});
 // Escape and outside click close the drawer; restore focus when it was open.
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#navToggle').getAttribute('aria-expanded')==='true'){closeMenu();$('#navToggle').focus()}});
 document.addEventListener('click',e=>{if(!e.target.closest('#mobileDrawer')&&!e.target.closest('#navToggle'))closeMenu()});
 setup();scheduleTip(30000);
})();
