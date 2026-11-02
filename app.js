(function(){
  // menu na telefonie
  var burger=document.getElementById('burger'), menu=document.getElementById('menu');
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('otwarte');
    burger.setAttribute('aria-expanded',o?'true':'false');
    burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');
  });
  menu.addEventListener('click',function(e){
    if(e.target.tagName==='A'){menu.classList.remove('otwarte');burger.setAttribute('aria-expanded','false');}
  });

  // dolny pasek dopiero po przewinięciu za przycisk w hero, chowany przy sekcji kontakt
  var mob=document.getElementById('mob'), cta=document.getElementById('hero-cta'), kontakt=document.getElementById('kontakt');
  if('IntersectionObserver' in window){
    var zaCta=false, wKontakcie=false;
    var ust=function(){mob.classList.toggle('widac',zaCta&&!wKontakcie);};
    new IntersectionObserver(function(en){
      var e=en[0]; zaCta=!e.isIntersecting && e.boundingClientRect.top<0; ust();
    }).observe(cta);
    new IntersectionObserver(function(en){wKontakcie=en[0].isIntersecting; ust();},{threshold:0.15}).observe(kontakt);
  }

  // galeria
  var lb=document.getElementById('lb'), lbImg=document.getElementById('lb-img');
  document.getElementById('galeria').addEventListener('click',function(e){
    var a=e.target.closest('a'); if(!a) return;
    e.preventDefault();
    lbImg.src=a.getAttribute('href'); lbImg.alt=a.querySelector('img').alt;
    lb.hidden=false; document.getElementById('lb-x').focus();
  });
  var zamknij=function(){lb.hidden=true; lbImg.removeAttribute('src');};
  lb.addEventListener('click',function(e){ if(e.target!==lbImg) zamknij(); });
  document.addEventListener('keydown',function(e){ if(e.key==='Escape' && !lb.hidden) zamknij(); });

  // formularz (wizualizacja - bez wysyłki)
  var f=document.getElementById('formularz'), info=document.getElementById('form-info');
  f.addEventListener('submit',function(e){
    e.preventDefault();
    if(!f.kto.value.trim() || !f.kontakt.value.trim()){
      info.className='form-info blad'; info.textContent='Proszę podać imię lub firmę oraz telefon albo e-mail.'; return;
    }
    info.className='form-info';
    info.textContent='Dziękujemy. W gotowej stronie zapytanie trafi od razu na biuro@rms-kosztorysy.pl, a my oddzwonimy z terminem i wyceną.';
    f.reset();
  });

  document.getElementById('rok').textContent=new Date().getFullYear();
})();
