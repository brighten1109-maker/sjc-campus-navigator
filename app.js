document.addEventListener('DOMContentLoaded',()=>{
  const body=document.body;
  if(localStorage.getItem('sjc-theme')==='dark') body.classList.add('dark');
  document.querySelectorAll('[data-theme]').forEach(btn=>btn.addEventListener('click',()=>{
    body.classList.toggle('dark');
    localStorage.setItem('sjc-theme',body.classList.contains('dark')?'dark':'light');
  }));
  const toggle=document.querySelector('.mobile-toggle'), nav=document.querySelector('.main-nav');
  if(toggle&&nav) toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open'));});
  const path=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.main-nav a[data-page]').forEach(a=>a.classList.toggle('active',a.dataset.page===path));
  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
});