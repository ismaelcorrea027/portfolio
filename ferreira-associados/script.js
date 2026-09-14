'use strict';
const paths={calendar:'M5 6h26v26H5z M5 13h26 M11 3v6 M25 3v6 M11 19h2 M18 19h2 M25 19h1 M11 25h2 M18 25h2',scales:'M18 3v28 M11 33h14 M5 10h26 M18 5l-2 2h4Z M7 11 2 24h10Z M29 11l-5 13h10Z M2 25c1 4 9 4 10 0 M24 25c1 4 9 4 10 0',briefcase:'M4 11h28v21H4Z M12 11V5h12v6 M4 19c8 5 20 5 28 0 M15 20h6v5h-6Z',people:'M18 3a6 6 0 1 0 0 12 6 6 0 0 0 0-12 M7 33v-8c0-11 22-11 22 0v8Z M7 8c-7 0-7 12 0 12 M29 8c7 0 7 12 0 12 M3 22l-1 9 M33 22l1 9',court:'M2 11 18 2l16 9Z M3 33h30 M5 29h26 M7 14v12 M11 14v12 M16 14v12 M20 14v12 M25 14v12 M29 14v12',family:'M18 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M6 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M30 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6 M13 22v-4c0-5 10-5 10 0v4 M2 33V23c0-5 8-5 8 0v10 M26 33V23c0-5 8-5 8 0v10 M15 33v-6c0-5 6-5 6 0v6Z',document:'M8 3h15l7 7v21H8Z M23 3v8h7 M12 16h13 M12 21h13 M12 26h8 M4 8v26h19',shield:'M18 3c5 4 9 5 14 5v11c0 8-9 13-14 15C13 32 4 27 4 19V8c5 0 9-1 14-5Z M11 18l5 5 10-11',target:'M29 11a14 14 0 1 1-7-6 M24 15a8 8 0 1 1-5-4 M18 18 31 5 M26 5h5v5',check:'M30 9a14 14 0 1 1-6-5 M11 18l5 5L30 8'};
function icon(name){return `<svg viewBox="0 0 36 36" aria-hidden="true"><path d="${paths[name]||paths.scales}"/></svg>`;}
const areas=[['Direito Empresarial','Consultoria e assessoria jurídica para empresas.','briefcase','Atendimento voltado às necessidades do negócio, com uma conversa inicial para compreender a operação, os desafios e os objetivos da empresa.'],['Direito Cível','Soluções completas para questões do dia a dia.','people','Um espaço para apresentar sua questão, organizar as informações e conversar sobre o acompanhamento mais adequado ao seu contexto.'],['Direito Trabalhista','Defesa dos direitos de empresas e trabalhadores.','court','Atendimento para compreender situações das relações de trabalho, com escuta e atenção às particularidades de cada caso.'],['Direito de Família e Sucessões','Soluções jurídicas para proteger o que mais importa.','family','Acolhimento, discrição e atenção às questões familiares. A primeira conversa ajuda a compreender sua história e suas prioridades.'],['Direito Previdenciário','Benefícios e aposentadorias com segurança jurídica.','scales','Atendimento para conhecer sua trajetória e suas dúvidas relacionadas a benefícios e aposentadoria. A análise depende das informações de cada caso.'],['Direito Contratual','Elaboração e análise de contratos com segurança.','document','Uma conversa sobre o contexto, os objetivos e os documentos envolvidos na relação contratual, com comunicação clara ao longo do atendimento.']];
const articles=[['Atendimento','Como funciona a primeira conversa','Escuta e contexto antes de definir os próximos passos.','people','O primeiro encontro é um momento para contar sua história, compartilhar suas dúvidas e apresentar seus objetivos. A equipe organiza as informações com você e explica como funciona o atendimento. Neste protótipo, você pode experimentar o fluxo de solicitação de consulta.'],['Organização','Clareza em cada etapa','Informações organizadas para um diálogo mais próximo.','document','Uma comunicação clara permite que o atendimento seja acompanhado com tranquilidade. Nosso processo valoriza a organização das informações, a atenção aos detalhes e o espaço para esclarecer dúvidas ao longo da conversa.'],['Nosso escritório','Uma relação de confiança','Proximidade, transparência e atenção individual.','shield','Cada história tem um contexto próprio. Por isso, nosso conceito de atendimento combina escuta, planejamento e diálogo. Conheça a apresentação do escritório e experimente o formulário demonstrativo para explorar essa jornada.']];
document.querySelector('#areas-list').innerHTML=areas.map((a,i)=>`<button class="area" data-area="${i}"><span>${icon(a[2])}</span><h3>${a[0]}</h3><p>${a[1]}</p></button>`).join('');
document.querySelector('#booking-area').innerHTML=areas.map(a=>`<option>${a[0]}</option>`).join('');
document.querySelector('#articles').innerHTML=articles.map((a,i)=>`<article class="article-card"><span class="article-icon">${icon(a[3])}</span><span class="tag">${a[0]}</span><h3>${a[1]}</h3><p>${a[2]}</p><button class="text-button" data-article="${i}">Ler artigo <span aria-hidden="true">→</span></button></article>`).join('');
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#menu');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
const booking=document.querySelector('#booking'),details=document.querySelector('#details'),form=document.querySelector('#booking-form'),result=document.querySelector('#booking-result');
const dialogTriggers=new WeakMap();
function show(dialog,trigger=document.activeElement){dialogTriggers.set(dialog,trigger);dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]')){document.body.classList.remove('modal-open');dialogTriggers.get(d)?.focus();}});});
function openBooking(area){let trigger=document.activeElement;if(details.open){trigger=dialogTriggers.get(details);details.close();}form.hidden=false;result.hidden=true;form.reset();if(area)form.elements.area.value=area;show(booking,trigger);}
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>openBooking()));
let selectedArea;
function showDetails(title,text,area,category='Ferreira & Associados'){selectedArea=area;document.querySelector('#detail-title').textContent=title;document.querySelector('#detail-text').textContent=text;document.querySelector('#detail-category').textContent=category;show(details);}
document.querySelectorAll('[data-area]').forEach(b=>b.addEventListener('click',()=>{const a=areas[Number(b.dataset.area)];showDetails(a[0],a[3],a[0],'Áreas de atuação');}));
document.querySelectorAll('[data-article]').forEach(b=>b.addEventListener('click',()=>{const a=articles[Number(b.dataset.article)];showDetails(a[1],a[4],undefined,a[0]);}));
document.querySelector('#detail-book').addEventListener('click',()=>openBooking(selectedArea));
document.querySelector('#about-more').addEventListener('click',()=>showDetails('Excelência jurídica que gera confiança.','Nosso compromisso é oferecer um atendimento que começa pela escuta. O conceito Ferreira & Associados reúne um ambiente acolhedor, planejamento e comunicação transparente para acompanhar cada questão com atenção individual. Explore as áreas de atuação e conheça o fluxo demonstrativo de atendimento.'));
function today(){const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
form.elements.date.min=today();
form.addEventListener('submit',e=>{e.preventDefault();form.elements.date.min=today();if(!form.reportValidity())return;const data=new FormData(form);const date=new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('pt-BR');result.textContent=`Simulação concluída, ${data.get('name')}! Solicitação de atendimento ${data.get('format').toLowerCase()} em ${data.get('area')}, para ${date}. Nenhuma consulta foi marcada. Seus dados não foram enviados nem armazenados.`;form.hidden=true;result.hidden=false;});
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)nav.querySelectorAll('a').forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}),{rootMargin:'-5% 0px -55% 0px',threshold:0});
['inicio','sobre','areas','equipe','blog','contato'].forEach(id=>observer.observe(document.getElementById(id)));

// Reveal sections once; keep content accessible when motion preferences change.
const motionPreference=window.matchMedia('(prefers-reduced-motion: reduce)');
const pointerPreference=window.matchMedia('(hover: hover) and (pointer: fine)');
const revealTargets=document.querySelectorAll('.area,.about-copy,.office-photo,.principles article,.section-heading,.info-card,.blog-section h2,.article-card,.partner-card,.contact-inner');
let revealObserver;
function configureReveals(){
  revealObserver?.disconnect();
  if(motionPreference.matches){revealTargets.forEach(el=>el.classList.add('is-visible'));return;}
  revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}
  }),{threshold:.08});
  revealTargets.forEach(el=>{
    const siblings=[...el.parentElement.children];
    el.style.setProperty('--reveal-delay',`${Math.min(siblings.indexOf(el)%3,2)*80}ms`);
    el.classList.add('motion-reveal');
    revealObserver.observe(el);
  });
}
configureReveals();
const motionHero=document.querySelector('.hero'),motionPhoto=document.querySelector('.hero-photo');
let pointerFrame=0;
function resetPointer(){cancelAnimationFrame(pointerFrame);pointerFrame=0;motionPhoto.style.removeProperty('--pointer-x');motionPhoto.style.removeProperty('--pointer-y');}
motionHero.addEventListener('pointermove',event=>{
  if(motionPreference.matches||!pointerPreference.matches||window.innerWidth<=1050||event.pointerType!=='mouse')return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame=requestAnimationFrame(()=>{
    const bounds=motionHero.getBoundingClientRect();
    motionPhoto.style.setProperty('--pointer-x',`${((event.clientX-bounds.left)/bounds.width-.5)*7}px`);
    motionPhoto.style.setProperty('--pointer-y',`${((event.clientY-bounds.top)/bounds.height-.5)*5}px`);
  });
},{passive:true});
motionHero.addEventListener('pointerleave',resetPointer);
motionPreference.addEventListener('change',()=>{resetPointer();configureReveals();});
pointerPreference.addEventListener('change',resetPointer);
window.addEventListener('resize',resetPointer,{passive:true});


// Automatic background crossfade; the hero text remains unchanged.
const backgroundScenes=[['justice','Escritório com estátua da Justiça e livros'],['reception','Recepção Ferreira e Associados com balcão em mármore'],['portrait','Advogada de blazer vinho em close no escritório'],['partners','Advogada entre dois sócios de terno no escritório']];
backgroundScenes.forEach(([name])=>{const layer=document.createElement('div');layer.className=`hero-backdrop ${name}`;motionPhoto.append(layer);});
const backgroundLayers=[...motionPhoto.children];
let backgroundIndex=0,backgroundTimer=0,backgroundVisible=true;
function scheduleBackground(){
  clearTimeout(backgroundTimer);
  if(motionPreference.matches||!backgroundVisible||document.hidden)return;
  backgroundTimer=setTimeout(()=>setBackground(backgroundIndex+1),6500);
}
function setBackground(index){
  backgroundIndex=index%backgroundLayers.length;
  backgroundLayers.forEach((layer,i)=>layer.classList.toggle('is-active',i===backgroundIndex));
  motionPhoto.setAttribute('aria-label',backgroundScenes[backgroundIndex][1]);
  scheduleBackground();
}
document.addEventListener('visibilitychange',scheduleBackground);
new IntersectionObserver(entries=>{backgroundVisible=entries[0].isIntersecting;scheduleBackground();},{threshold:.1}).observe(motionHero);
motionPreference.addEventListener('change',scheduleBackground);
setBackground(0);