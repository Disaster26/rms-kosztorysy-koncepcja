(function(){
  var burger=document.getElementById('burger'), menu=document.getElementById('menu');
  burger.addEventListener('click',function(){
    var o=menu.classList.toggle('otwarte');
    burger.setAttribute('aria-expanded',o?'true':'false');
    burger.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu');
  });
  menu.addEventListener('click',function(e){
    if(e.target.tagName==='A'){menu.classList.remove('otwarte');burger.setAttribute('aria-expanded','false');}
  });

  // dolny pasek na telefonie: po przewinieciu za pierwszy ekran, schowany przy formularzu
  var mob=document.getElementById('mob');
  var start=document.querySelector('.hero-txt .hero-cta')||document.querySelector('.pod-hero');
  if('IntersectionObserver' in window && start){
    var za=false, przyForm=false;
    var ust=function(){mob.classList.toggle('widac',za&&!przyForm);};
    new IntersectionObserver(function(en){var e=en[0]; za=!e.isIntersecting&&e.boundingClientRect.top<0; ust();}).observe(start);
    var widoczne=new Set();
    var io=new IntersectionObserver(function(en){
      en.forEach(function(e){ if(e.isIntersecting) widoczne.add(e.target); else widoczne.delete(e.target); });
      przyForm=widoczne.size>0; ust();
    },{threshold:0.1});
    document.querySelectorAll('.wycena,.cta-zloty').forEach(function(f){io.observe(f);});
  }

  // formularze: lista plikow, przeciaganie, komunikat (bez wysylki)
  var MAX=20*1024*1024;
  document.querySelectorAll('form.wycena').forEach(function(f){
    var inp=f.querySelector('input[type=file]'), strefa=f.querySelector('.pliki'), lista=f.querySelector('.lista-plikow'), info=f.querySelector('.form-info');
    var pokaz=function(){
      lista.innerHTML=''; var suma=0;
      Array.prototype.forEach.call(inp.files,function(p){ suma+=p.size; var li=document.createElement('li'); li.textContent=p.name+' ('+(p.size/1048576).toFixed(1).replace('.',',')+' MB)'; lista.appendChild(li); });
      if(suma>MAX){ info.className='form-info blad'; info.textContent='Pliki przekraczają 20 MB. Większe projekty prosimy przesłać linkiem w opisie.'; } else { info.textContent=''; }
    };
    inp.addEventListener('change',pokaz);
    ['dragenter','dragover'].forEach(function(t){strefa.addEventListener(t,function(){strefa.classList.add('nad');});});
    ['dragleave','drop'].forEach(function(t){strefa.addEventListener(t,function(){strefa.classList.remove('nad');});});
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var kto=f.kto.value.trim(), kontakt=(f.email.value+f.tel.value).trim();
      if(!kto||!kontakt){ info.className='form-info blad'; info.textContent='Proszę podać imię lub firmę oraz e-mail albo telefon.'; return; }
      info.className='form-info';
      info.textContent='Dziękujemy. W gotowej stronie zapytanie razem z plikami trafi na biuro@rms-kosztorysy.pl, a my odpowiemy z terminem i ceną.';
      f.reset(); lista.innerHTML='';
    });
  });

  document.querySelectorAll('.rok').forEach(function(r){r.textContent=new Date().getFullYear();});
})();
