// Extra Fungi — shared interactions
(function(){
  var hdr = document.getElementById('hdr');
  var hero = document.querySelector('.hero');
  function onScroll(){
    if(!hdr) return;
    hdr.classList.toggle('scrolled', window.scrollY > 40);
    if(hero){
      var past = window.scrollY > (hero.offsetHeight - 90);
      hdr.classList.toggle('on-dark', !past);
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // mobile menu: jump to footer nav
  var mb = document.querySelector('.menu-btn');
  if(mb) mb.addEventListener('click', function(){
    var f = document.querySelector('footer'); if(f) f.scrollIntoView({behavior:'smooth'});
  });

  // year
  var y = document.getElementById('yr'); if(y) y.textContent = new Date().getFullYear();

  // simple contact form handler (no backend)
  var form = document.getElementById('contactForm');
  if(form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var note = document.getElementById('formNote');
    var name = (document.getElementById('cf-name')||{}).value || 'there';
    if(note){ note.hidden = false; note.textContent = 'Thank you, ' + name.split(' ')[0] + ' — your message is ready. Email us at info@extrafungi.com and we’ll reply with the current season sheet.'; }
    form.reset();
  });
})();
