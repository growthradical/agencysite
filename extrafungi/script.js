// Extra Fungi — shared header/footer injection + interactions
(function(){
  var NAV = [
    {key:'about',    label:'About',    href:'about.html'},
    {key:'products', label:'Products', href:'products.html'},
    {key:'recipes',  label:'Recipes',  href:'recipes.html'},
    {key:'blog',     label:'Blog',     href:'blog.html'},
    {key:'press',    label:'Press',    href:'press.html'},
    {key:'contact',  label:'Contact',  href:'contact.html'}
  ];
  var LOGO = '<svg class="logo" viewBox="0 0 40 40" fill="none" aria-hidden="true">'
    + '<path d="M20 4C11 4 4 11 4 19c0 1.6 1.2 2.6 3 2.6h26c1.8 0 3-1 3-2.6C36 11 29 4 20 4Z" fill="currentColor"/>'
    + '<path d="M16 21c0 6 0 11-2 14 0 0 3 1 6 1s6-1 6-1c-2-3-2-8-2-14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>'
    + '<circle cx="14" cy="14" r="1.7" fill="#f4c500"/><circle cx="24" cy="12" r="1.4" fill="#f4c500"/><circle cx="28" cy="17" r="1.2" fill="#f4c500"/></svg>';

  var active = document.body.getAttribute('data-nav') || '';
  var isHero = document.body.getAttribute('data-hero') === 'true';

  function buildHeader(){
    var items = NAV.map(function(n){
      return '<li><a href="'+n.href+'"'+(n.key===active?' class="active"':'')+'>'+n.label+'</a></li>';
    }).join('');
    var cta = active==='contact'
      ? '<a href="mailto:info@extrafungi.com" class="btn btn-ghost nav-cta">Email us</a>'
      : '<a href="contact.html" class="btn btn-ghost nav-cta">Get in touch</a>';
    return '<header id="hdr" class="'+(isHero?'on-dark':'solid')+'">'
      + '<div class="wrap nav">'
      + '<a class="brand" href="index.html" aria-label="Extra Fungi home">'+LOGO+'<div><b>Extra</b> <span>Fungi</span></div></a>'
      + '<nav><ul>'+items+'</ul></nav>'
      + cta
      + '<button class="menu-btn" aria-label="Menu"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>'
      + '</div></header>';
  }

  function buildFooter(){
    return '<footer><div class="wrap">'
      + '<div class="foot-grid">'
      + '<div><div class="brand"><b>Extra</b> <span>Fungi</span></div>'
      + '<p class="about-foot">A family company hand-harvesting and processing the wild mushrooms, fruits and vegetables of North Macedonia — and delivering them, at their peak, to Europe. Since 1988.</p></div>'
      + '<div><h4>Explore</h4><ul><li><a href="about.html">About</a></li><li><a href="products.html">Products</a></li><li><a href="recipes.html">Recipes</a></li><li><a href="blog.html">Blog</a></li><li><a href="press.html">Press</a></li></ul></div>'
      + '<div><h4>Range</h4><ul><li><a href="product-porcini.html">Porcini</a></li><li><a href="product-chanterelle.html">Chanterelles</a></li><li><a href="products.html">Fruits &amp; vegetables</a></li><li><a href="about.html">Extra Food retail</a></li></ul></div>'
      + '<div><h4>Contact</h4><ul><li><a href="mailto:info@extrafungi.com">info@extrafungi.com</a></li><li><a href="https://www.extrafungi.com">www.extrafungi.com</a></li><li>Kočani, North Macedonia</li></ul></div>'
      + '</div>'
      + '<div class="foot-bottom"><span>© '+new Date().getFullYear()+' Extra Fungi. All rights reserved.</span><span>Wild-harvested · Organic-certified · European delivery</span></div>'
      + '</div></footer>';
  }

  var h = document.querySelector('[data-header]');
  if(h) h.outerHTML = buildHeader();
  var f = document.querySelector('[data-footer]');
  if(f) f.outerHTML = buildFooter();

  // header scroll state
  var hdr = document.getElementById('hdr');
  var hero = document.querySelector('.hero');
  function onScroll(){
    if(!hdr) return;
    hdr.classList.toggle('scrolled', window.scrollY > 40);
    if(hero) hdr.classList.toggle('on-dark', window.scrollY <= (hero.offsetHeight - 90));
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.14});
  document.querySelectorAll('.reveal').forEach(function(el){ io.observe(el); });

  // mobile menu -> footer nav
  var mb = document.querySelector('.menu-btn');
  if(mb) mb.addEventListener('click', function(){
    var ft = document.querySelector('footer'); if(ft) ft.scrollIntoView({behavior:'smooth'});
  });

  // contact form (no backend)
  var form = document.getElementById('contactForm');
  if(form) form.addEventListener('submit', function(e){
    e.preventDefault();
    var note = document.getElementById('formNote');
    var nm = (document.getElementById('cf-name')||{}).value || 'there';
    if(note){ note.hidden = false; note.textContent = 'Thank you, ' + nm.split(' ')[0] + ' — email us at info@extrafungi.com and we’ll reply with the current season sheet.'; }
    form.reset();
  });
})();
