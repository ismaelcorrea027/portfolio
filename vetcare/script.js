'use strict';
const paths={calendar:'M5 6h26v26H5z M5 13h26 M11 3v6 M25 3v6 M11 19h2 M18 19h2 M25 19h1 M11 25h2 M18 25h2',paw:'M10 22c-7 10 2 11 8 7 6 4 15 3 8-7-5-8-11-8-16 0Z M7 9c-4 0-4 9 0 9s4-9 0-9Z M15 4c-4 0-4 9 0 9s4-9 0-9Z M24 4c-4 0-4 9 0 9s4-9 0-9Z M31 11c-4 0-4 9 0 9s4-9 0-9Z',heart:'M18 31 5 18C-4 6 11 0 18 11 25 0 40 6 31 18Z M5 19h7l3-7 5 13 4-8h8',shield:'M18 3c5 4 9 5 14 5v11c0 8-9 13-14 15C13 32 4 27 4 19V8c5 0 9-1 14-5Z M18 12v12 M12 18h12',cross:'M13 3h10v10h10v10H23v10H13V23H3V13h10Z',team:'M18 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M8 3a3 3 0 1 0 0 6 M28 3a3 3 0 1 1 0 6 M9 31v-7c0-9 18-9 18 0v7 M3 22v-7c0-4 4-6 7-5 M33 22v-7c0-4-4-6-7-5',stethoscope:'M5 4v11c0 13 18 13 18 0V4 M3 4h5 M20 4h5 M14 25v3c0 10 17 10 17-2v-5 M31 15a3 3 0 1 0 0 6 3 3 0 0 0 0-6',vaccine:'M6 25 24 7l7 7-18 18Z M22 5l11 11 M27 2l7 7 M28 9l3-3 M4 34l4-5 M14 18l4 4 M19 13l4 4',tooth:'M18 7C-2-4 1 17 6 27c5 16 7-1 8-5 2-6 6-6 8 0 1 4 3 21 8 5C35 17 38-4 18 7Z',care:'M18 18C0 8 13-1 18 7 23-1 36 8 18 18Z M5 23c6-5 20-5 26 0l3 10c-8 3-24 3-32 0Z M5 23c6 5 20 5 26 0'};
function icon(name){return `<svg viewBox="0 0 36 36" aria-hidden="true"><path d="${paths[name]||paths.paw}"/></svg>`;}
const services=[['Consultas','Atendimento completo para cães e gatos','stethoscope','Um atendimento atento à história, à rotina e às necessidades do seu pet. A consulta é o primeiro passo para definir os próximos cuidados.'],['Vacinas','Protocolos personalizados para cada fase da vida','vaccine','Converse com a equipe sobre o acompanhamento preventivo e o calendário individual de vacinação do seu pet.'],['Exames','Laboratoriais e de imagem com resultados rápidos','paw','Avaliações laboratoriais e de imagem ajudam a equipe a investigar e acompanhar a saúde do seu pet.'],['Cirurgias','Procedimentos seguros com anestesia monitorada','heart','Cada procedimento começa com uma avaliação individual e um planejamento cuidadoso, incluindo acompanhamento antes e depois da cirurgia.'],['Odontologia','Saúde bucal para mais qualidade de vida','tooth','Avaliação da saúde bucal e orientação de cuidados para o conforto e bem-estar do seu melhor amigo.'],['Pet Care','Banho, tosa e cuidados com muito amor','care','Higiene e cuidados com respeito ao tempo, à sensibilidade e às características de cada animal.']];
const articles=[['Bem-estar','Uma rotina com mais qualidade de vida','Pequenos hábitos, grandes momentos juntos.','Observar o comportamento, oferecer um ambiente acolhedor e reservar tempo para brincar são formas de estar mais próximo do seu pet. Leve suas dúvidas sobre a rotina para uma avaliação individual com a equipe.'],['Prevenção','Cuidado em todas as fases da vida','Do primeiro encontro aos anos de companhia.','Cada fase traz novas necessidades. Nas consultas, compartilhe as mudanças percebidas na rotina do seu pet para que a equipe possa orientar o acompanhamento.'],['Medicina felina','Um olhar especial para os gatos','Respeito, tranquilidade e acolhimento.','Uma experiência acolhedora começa antes da consulta. Converse com a equipe sobre o transporte e conte como seu gato costuma reagir a ambientes novos.']];
document.querySelector('#service-list').innerHTML=services.map((s,i)=>`<button class="service" data-service="${i}"><span>${icon(s[2])}</span><h3>${s[0]}</h3><p>${s[1]}</p></button>`).join('');
document.querySelector('#booking-service').innerHTML=services.map(s=>`<option>${s[0]}</option>`).join('');
document.querySelector('#articles').innerHTML=articles.map((a,i)=>`<article class="article-card"><span class="tag">${a[0]}</span><h3>${a[1]}</h3><p>${a[2]}</p><button class="text-link" data-article="${i}">Ler mais <span aria-hidden="true">→</span></button></article>`).join('');
document.querySelectorAll('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon));
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#menu');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeMenu();}});
const booking=document.querySelector('#booking'),details=document.querySelector('#details'),form=document.querySelector('#booking-form'),result=document.querySelector('#booking-result');
let returnFocus;
function show(dialog){returnFocus=document.activeElement;dialog.showModal();document.body.classList.add('modal-open');}
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('[data-close]').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});d.addEventListener('close',()=>{if(!document.querySelector('dialog[open]')){document.body.classList.remove('modal-open');returnFocus?.focus();}});});
function openBooking(service){if(details.open)details.close();form.hidden=false;result.hidden=true;form.reset();if(service)document.querySelector('#booking-service').value=service;show(booking);}
document.querySelectorAll('[data-book]').forEach(b=>b.addEventListener('click',()=>openBooking()));
let selectedService;
function showDetails(title,text,service){selectedService=service;document.querySelector('#detail-title').textContent=title;document.querySelector('#detail-text').textContent=text;show(details);}
document.querySelectorAll('[data-service]').forEach(b=>b.addEventListener('click',()=>{const s=services[Number(b.dataset.service)];showDetails(s[0],s[3],s[0]);}));
document.querySelectorAll('[data-article]').forEach(b=>b.addEventListener('click',()=>{const a=articles[Number(b.dataset.article)];showDetails(a[1],a[3]);}));
document.querySelector('#detail-book').addEventListener('click',()=>openBooking(selectedService));
document.querySelector('#about-more').addEventListener('click',()=>showDetails('Muito mais que uma clínica, somos família!','Na VetCare, acolhimento e cuidado caminham juntos. Nosso espaço foi pensado para receber pets e tutores com tranquilidade. Reunimos atendimento clínico, prevenção e especialidades para acompanhar cada fase da vida com atenção e carinho.'));
const now=new Date(),dateField=form.elements.date;dateField.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const date=new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('pt-BR');result.textContent=`Simulação concluída, ${data.get('name')}! Solicitação de ${data.get('service').toLowerCase()} para ${data.get('pet')}, em ${date}. Este é um protótipo: nenhuma consulta foi marcada e nenhum dado foi enviado ou armazenado.`;form.hidden=true;result.hidden=false;});
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){nav.querySelectorAll('a').forEach(a=>a.classList.toggle('active',a.hash===`#${entry.target.id}`));}});},{rootMargin:'-10% 0px -55% 0px',threshold:0});
['inicio','sobre','servicos','especialidades','equipe','blog','contato'].forEach(id=>observer.observe(document.getElementById(id)));

// Scroll reveals and pointer feedback are progressive enhancements.
const vetReduced=matchMedia('(prefers-reduced-motion: reduce)');
const vetPointer=matchMedia('(hover: hover) and (pointer: fine)');
const vetTargets=document.querySelectorAll('.service,.benefits article,.about-copy,.clinic-photo,.specialties,.info-card,.article-card,.contact-inner');
let vetObserver;
function setupVetMotion(){
  vetObserver?.disconnect();
  if(vetReduced.matches){vetTargets.forEach(el=>el.classList.add('is-visible'));return;}
  vetObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');vetObserver.unobserve(entry.target);}}),{threshold:.08});
  vetTargets.forEach(el=>{el.classList.add('vet-reveal');el.style.setProperty('--reveal-delay',`${([...el.parentElement.children].indexOf(el)%3)*75}ms`);vetObserver.observe(el);});
}
const vetHero=document.querySelector('.hero'),vetPhoto=document.querySelector('.hero-photo');
let vetFrame=0;
function resetVetPointer(){cancelAnimationFrame(vetFrame);vetPhoto.style.removeProperty('--photo-x');vetPhoto.style.removeProperty('--photo-y');}
vetHero.addEventListener('pointermove',event=>{
  if(vetReduced.matches||!vetPointer.matches||event.pointerType!=='mouse'||innerWidth<1001)return;
  cancelAnimationFrame(vetFrame);vetFrame=requestAnimationFrame(()=>{const r=vetHero.getBoundingClientRect();vetPhoto.style.setProperty('--photo-x',`${((event.clientX-r.left)/r.width-.5)*6}px`);vetPhoto.style.setProperty('--photo-y',`${((event.clientY-r.top)/r.height-.5)*4}px`);});
},{passive:true});
vetHero.addEventListener('pointerleave',resetVetPointer);
document.querySelectorAll('.info-card,.article-card').forEach(card=>{let frame=0;card.addEventListener('pointermove',event=>{if(vetReduced.matches||!vetPointer.matches||event.pointerType!=='mouse')return;cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const r=card.getBoundingClientRect();card.style.setProperty('--glow-x',`${event.clientX-r.left}px`);card.style.setProperty('--glow-y',`${event.clientY-r.top}px`);});},{passive:true});card.addEventListener('pointerleave',()=>cancelAnimationFrame(frame));});
vetReduced.addEventListener('change',()=>{resetVetPointer();setupVetMotion();});
vetPointer.addEventListener('change',resetVetPointer);
window.addEventListener('resize',resetVetPointer,{passive:true});
setupVetMotion();
