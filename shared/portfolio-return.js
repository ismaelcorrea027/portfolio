(() => {
  'use strict';
  if (document.querySelector('[data-portfolio-return]')) return;
  const source = document.currentScript;
  const destination = new URL('../index.html', source.src).href;
  const color = source.dataset.color || '#17334b';
  const host = document.createElement('div');
  host.dataset.portfolioReturn = '';
  const root = host.attachShadow({mode:'open'});
  root.innerHTML = `<style>
    :host{position:fixed;left:max(18px,env(safe-area-inset-left));bottom:max(18px,env(safe-area-inset-bottom));z-index:9999;display:block;color-scheme:normal}
    :host([hidden]){display:none!important}
    a{display:flex;align-items:center;gap:9px;min-height:44px;box-sizing:border-box;padding:11px 17px;border:1px solid #ffffff55;border-radius:30px;background:var(--return-color);color:#fff;text-decoration:none;font:600 14px/1.3 Arial,sans-serif;box-shadow:0 5px 20px #0003;position:relative;isolation:isolate;transition:transform .2s}
    a::before{content:'';position:absolute;inset:-1px;border:2px solid var(--return-color);border-radius:inherit;z-index:-1;pointer-events:none;animation:return-pulse 3s ease-out infinite}
    a:hover{transform:translateY(-3px)}a:focus-visible{outline:3px solid #fff;outline-offset:4px;box-shadow:0 0 0 7px var(--return-color)}
    span{font-size:20px;line-height:1}
    @keyframes return-pulse{0%{transform:scale(1);opacity:.55}80%,100%{transform:scale(1.13,1.35);opacity:0}}
    @media(max-width:600px){:host{left:max(12px,env(safe-area-inset-left));bottom:max(12px,env(safe-area-inset-bottom))}a{font-size:12px;padding:10px 13px}}
    @media(prefers-reduced-motion:reduce){a::before{animation:none}a{transition:none}a:hover{transform:none}}
    @media print{:host{display:none}}
  </style><a><span aria-hidden="true">←</span>Voltar ao portfólio</a>`;
  root.querySelector('a').href = destination;
  host.style.setProperty('--return-color', color);
  document.body.append(host);
  const update = () => {
    const typing = document.activeElement?.matches('input,textarea,select,[contenteditable="true"]');
    const hide = !!typing || [...document.querySelectorAll('dialog[open],[aria-modal="true"]')].some(el => { const style = getComputedStyle(el); return el.getClientRects().length > 0 && style.visibility !== 'hidden' && style.opacity !== '0'; });
    if (host.hidden !== hide) host.hidden = hide;
  };
  document.addEventListener('focusin', update);
  document.addEventListener('focusout', () => setTimeout(update, 0));
  new MutationObserver(update).observe(document.body,{subtree:true,attributes:true,attributeFilter:['open','hidden','aria-modal','class','style']});
  update();
})();
