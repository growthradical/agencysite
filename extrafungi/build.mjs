// Static site generator for Extra Fungi — writes all HTML pages.
import fs from 'fs';
import path from 'path';
const OUT = path.resolve('.');
const FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">';
const UI = 'https://images.unsplash.com/';
const img = (id,w=1000)=>`${UI}${id}?auto=format&fit=crop&w=${w}&q=80`;

function shell({title, desc, nav='', hero=false, body}){
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${title}</title>
<meta name="description" content="${desc}" />
${FONTS}
<link rel="stylesheet" href="styles.css">
</head>
<body data-nav="${nav}"${hero?' data-hero="true"':''}>
<div data-header></div>
${body}
<div data-footer></div>
<script src="script.js"></script>
</body>
</html>
`;
}
const write = (file, html)=>{ fs.writeFileSync(path.join(OUT,file), html); console.log('wrote', file); };

const cta = (eyebrow,h,p,primary,ghost)=>`
<section class="cta pad"><div class="glow"></div>
  <div class="wrap cta-inner reveal">
    <p class="eyebrow">${eyebrow}</p>
    <h2 style="margin-top:18px">${h}</h2>
    <p>${p}</p>
    <div class="cta-actions">${primary}${ghost}</div>
  </div>
</section>`;

/* ---------------- PRODUCTS DATA ---------------- */
const PRODUCTS = [
  {slug:'porcini', name:'Porcini', mk:'Vrgan&#39;', lat:'Boletus edulis', tag:'Signature', img:'photo-1518977676601-b53f82aba655',
   season:'Late summer – autumn', formats:'Fresh · Dried · IQF', grades:'Whole · sliced · caps · pieces', pack:'Bulk & retail, to spec',
   intro:['The prize of the Balkan forest — firm-fleshed, nutty and deeply aromatic. Boletus edulis grows wild across the beech and oak woodlands around Kočani, and it is the mushroom our name was built on.',
     'We handle porcini in every form the market asks for: same-day fresh in season, individually quick-frozen at their peak, and whole or sliced dried to concentrate that unmistakable savoury depth.'],
   culinaryTitle:'In the kitchen',
   culinary:'Porcini carry a dish on their own. A handful of the dried, rehydrated, will transform a risotto, a ragù or a simple omelette.',
   uses:['Risotto and pasta', 'Sauces and ragù', 'Roasts and duxelles', 'Soups and stock']},
  {slug:'chanterelle', name:'Chanterelles', mk:'Lisi&#269;arka', lat:'Cantharellus cibarius', tag:'Golden', img:'photo-1504545102780-26774c1bb073',
   season:'Summer – autumn', formats:'Fresh · Brined · Frozen', grades:'Size-graded: extra / 1st / 2nd', pack:'Bulk & retail',
   intro:['Bright, golden and unmistakable, with a gentle peppery, fruity note. Chanterelles are hand-picked and cleaned with care — they bruise easily and reward gentle handling.',
     'We size-grade every lot so buyers get consistency in the box, and offer them fresh in season, traditionally brined, and frozen for year-round supply.'],
   culinaryTitle:'In the kitchen',
   culinary:'Chanterelles love butter and a hot pan. Keep it simple — a quick sauté, a little garlic, parsley and they shine.',
   uses:['Sautéed as a side', 'Eggs and omelettes', 'Cream sauces', 'Game and poultry']},
  {slug:'saffron-milk-cap', name:'Saffron Milk Caps', mk:'Rujnica', lat:'Lactarius deliciosus', tag:'Autumn', img:'photo-1607301405390-d831c242f59b',
   season:'Autumn', formats:'Fresh · Brined · Frozen', grades:'Whole caps, graded', pack:'Bulk & jars',
   intro:['Carrot-orange, firm and prized across the Mediterranean, the saffron milk cap is an autumn favourite. It holds its shape and colour beautifully through cooking.',
     'Best enjoyed fresh or traditionally brined, rujnica is also frozen for buyers who want it out of season.'],
   culinaryTitle:'In the kitchen',
   culinary:'A classic on the grill or in the pan with oil, garlic and a squeeze of lemon — the way it is eaten across the Balkans and Iberia.',
   uses:['Grilled whole', 'Pan-fried', 'Preserved in oil', 'Stews']},
  {slug:'st-georges', name:'St George&#39;s Mushroom', mk:'&#272;ur&#273;ovka', lat:'Calocybe gambosa', tag:'Spring', img:'photo-1552825896-2f9a7d2c6b7f',
   season:'Spring (from St George&#39;s Day)', formats:'Fresh · Frozen', grades:'Whole, cleaned', pack:'Bulk',
   intro:['One of the first prizes of spring, appearing around St George&#39;s Day. Mealy, sweet and dense, it is a seasonal speciality for kitchens that follow the calendar.',
     'We supply it fresh in its short season and frozen to extend availability.'],
   culinaryTitle:'In the kitchen',
   culinary:'Gentle flavours suit it best — softly sautéed, folded into spring dishes, or paired with young vegetables.',
   uses:['Spring sautés', 'Creamy sauces', 'With eggs', 'Light braises']},
  {slug:'morel', name:'Morels', mk:'Smr&#269;ak', lat:'Morchella', tag:'Rare', img:'photo-1610725664285-7c57e6eeac3f',
   season:'Spring', formats:'Dried · Fresh (limited)', grades:'Whole, size-graded', pack:'Retail & bulk dried',
   intro:['Honeycombed, intense and a genuine chef&#39;s treasure. Morels are foraged in a brief spring window and are among the most sought-after wild mushrooms in the world.',
     'We dry them to preserve their deep, smoky character — light to ship and long to keep — with limited fresh supply in season.'],
   culinaryTitle:'In the kitchen',
   culinary:'Rehydrate dried morels and use both the mushroom and the fragrant soaking liquor. Superb with cream, poultry and spring vegetables.',
   uses:['Cream sauces', 'Stuffed', 'With poultry', 'Spring risotto']},
  {slug:'produce', name:'Fruits, Berries &amp; Vegetables', mk:'From the valley', lat:'Ko&#269;ani region', tag:'Valley', img:'photo-1425934398893-310a009a77f9',
   season:'Year-round', formats:'Fresh · IQF frozen', grades:'By crop', pack:'Bulk & retail',
   intro:['The Kočani valley&#39;s sun and fertile soil give far more than mushrooms. Through the same modern cold chain we buy and process orchard fruit, wild forest berries and field vegetables.',
     'Frozen at harvest to lock in colour and sweetness, or handled fresh, our produce line rounds out what we can bring to European buyers.'],
   culinaryTitle:'The range',
   culinary:'From wild berries and orchard fruit to peppers, tomatoes and field vegetables — supplied to spec for retail and manufacturing.',
   uses:['Wild berries', 'Orchard fruit', 'Peppers & tomatoes', 'Field vegetables']}
];
const pmap = Object.fromEntries(PRODUCTS.map(p=>[p.slug,p]));

const prodCard = (p)=>`<a class="card card--link reveal" href="product-${p.slug}.html">
  <div class="ph" style="background-image:url('${img(p.img,900)}')"></div>
  <span class="tag">${p.tag}</span>
  <div class="body"><h3>${p.name}</h3><div class="lat">${p.mk} · ${p.lat}</div><p>${p.intro[0].slice(0,120)}…</p></div>
</a>`;

/* ---------------- BLOG DATA ---------------- */
const P = (s)=>`<p>${s}</p>`;
const POSTS = [
  {slug:'blog-caesar-salad', cat:'Recipe', title:'Caesar Salad, Porcini Twist', date:'1 November 2025', iso:'2025-11-01', read:'2 min watch', img:'photo-1546793665-c74683f339c1',
   excerpt:'The familiar Caesar, lifted with the savoury, umami note of wild porcini.', video:'tTsXhe6vUcs',
   body:P('Chef Nikola Mishkovski gives the classic Caesar a Balkan-forest twist, folding wild porcini into the dish for a deeper, savoury edge. Simple, fresh and ready in minutes — press play above and cook along.')},
  {slug:'blog-beef-wellington', cat:'Recipe', title:'Beef Wellington with Porcini', date:'18 October 2025', iso:'2025-10-18', read:'3 min watch', img:'photo-1558030006-450675393462',
   excerpt:'A classic showpiece where a wild-mushroom duxelles wraps the fillet in deep forest flavour.', video:'zBjpznHgU_0',
   body:P('The showpiece of the series: a fillet wrapped in a finely chopped wild-porcini duxelles and golden pastry. The mushrooms do the heavy lifting here — their concentrated, savoury depth is what makes a Wellington sing.')},
  {slug:'blog-porcini-risotto', cat:'Recipe', title:'Porcini Risotto', date:'2 October 2025', iso:'2025-10-02', read:'2 min watch', img:'photo-1476124369491-e7addf5db371',
   excerpt:'Creamy, slow-stirred and fragrant with wild vrgan&#39; — the easiest way to taste the season.', video:'qULxKFUD9s4',
   body:P('This is the dish that shows why Boletus edulis is the prize of the Balkan forest. Slow-stirred Arborio, good stock and wild porcini — comfort food with an aromatic, foraged heart. It is also the first recipe we ever shared on our journal.')},
  {slug:'blog-kocani-forests', cat:'Journal', title:'A Season in the Kočani Forests', date:'12 September 2025', iso:'2025-09-12', read:'4 min', img:'photo-1478147427282-58a87a120781',
   excerpt:'How the foraging calendar shapes everything we do — from spring morels to autumn porcini.',
   body:[P('The forest keeps its own calendar, and after more than thirty years we have learned to keep it too. Every species has its window, and much of our work is simply being ready when it opens.'),
     '<h2>Spring</h2>',
     P('The year begins with morels and, around St George&#39;s Day, the dense and mealy ѓурѓовка. These are short, precious seasons — a few weeks where the pickers we have known for decades bring in the first baskets of the year.'),
     '<h2>Summer into autumn</h2>',
     P('As the weather warms, chanterelles light up the forest floor in gold, followed by the main event: porcini. Autumn also brings the carrot-orange saffron milk caps that are so loved across the Mediterranean.'),
     '<blockquote>We harvest what the season gives, and take no more.</blockquote>',
     P('That rhythm is why our range moves through the year, and why we preserve so carefully — fresh in season, then frozen and dried so the forest can reach a European kitchen in any month.')]},
  {slug:'blog-grading-porcini', cat:'Journal', title:'How We Grade Wild Porcini', date:'28 August 2025', iso:'2025-08-28', read:'3 min', img:'photo-1518977676601-b53f82aba655',
   excerpt:'Why every basket is inspected by hand before it earns a place in the box.',
   body:[P('Wild food is not uniform — that is its beauty and its challenge. A basket of porcini brought in from the forest holds a range of sizes, ages and conditions, and it is our job to sort it into something a buyer can rely on.'),
     '<h2>Inspected, not guessed</h2>',
     P('Every delivery is weighed and inspected within hours of picking. Our graders check each cap and stem by hand, setting aside anything that does not meet the standard for its grade before the lot moves to chilling, freezing or drying.'),
     '<ul><li><strong>Whole caps</strong> — the firmest, youngest specimens</li><li><strong>Sliced</strong> — graded for even drying and freezing</li><li><strong>Pieces</strong> — for sauces, stocks and manufacturing</li></ul>',
     P('It is slower than machine sorting, but it is the only way to guarantee that what leaves Kočani is exactly what the label says. That discipline is why buyers across Europe keep coming back.')]},
  {slug:'blog-cold-chain', cat:'Journal', title:'From Forest to Europe: Our Cold Chain', date:'5 August 2025', iso:'2025-08-05', read:'4 min', img:'photo-1567306226416-28f0efdc88ce',
   excerpt:'The short, controlled journey that keeps wild food at its peak across four borders.',
   body:[P('The flavour of a wild mushroom starts to fade the moment it leaves the ground. Everything we have built — the buy-out stations, the modern facility, the freezers — exists to slow that clock down.'),
     '<h2>Speed at the start</h2>',
     P('Because our facility sits in the middle of the foraging region, deliveries reach us within hours. Fast intake means we can chill, quick-freeze or begin drying while the harvest is still at its best.'),
     '<h2>Controlled all the way</h2>',
     P('From there, product is packed to each customer&#39;s specification and moved in a controlled cold chain to buyers in France, Italy, Spain and Germany. Our location puts the whole EU within short, reliable reach.'),
     P('It is not glamorous work, but it is the difference between wild food that tastes of the forest and wild food that does not.')]},
  {slug:'blog-extra-food', cat:'Journal', title:'Meet Extra Food: The Forest on Your Shelf', date:'17 July 2025', iso:'2025-07-17', read:'3 min', img:'photo-1607301405390-d831c242f59b',
   excerpt:'Our retail label brings wild quality straight to the home kitchen.',
   body:[P('For most of our history, Extra Fungi has been a wholesale business — supplying importers, distributors and manufacturers. Extra Food is how we bring that same wild quality directly to the shelf.'),
     '<h2>Wild, ready for the home</h2>',
     P('Under the Extra Food label we pack a selection of our forest mushrooms and frozen fruit for retail: dried porcini, a frozen forest mix, frozen berries and traditionally brined mushrooms — the pantry the Balkans has cooked from for generations.'),
     '<ul><li>Dried porcini, whole and sliced</li><li>Frozen forest mushroom mix</li><li>Wild and orchard frozen berries</li><li>Brined mushrooms</li></ul>',
     P('Same forest, same standards — now in a pack you can take home.')]}
];
const pretty = (s)=>Array.isArray(s)?s.join('\n'):s;

const postCard = (post)=>`<a class="post-card reveal" href="${post.slug}.html">
  <div class="thumb"><img loading="lazy" src="${img(post.img,800)}" alt="" onerror="this.style.display='none'"><span class="cat${post.cat==='Recipe'?' recipe':''}">${post.cat}</span></div>
  <div class="pc-body"><h3>${post.title}</h3><p>${post.excerpt}</p><span class="date">${post.date} · ${post.read}</span></div>
</a>`;

/* ---------------- PRESS DATA ---------------- */
const PRESS = [
  {outlet:'Бизнис Инфо', en:'Biznis Info', headline:'„Екстра Фунги, компанија чиј квалитет е препознатлив на европскиот пазар“', sub:'Extra Fungi — a company whose quality is recognised on the European market', url:'https://biznisinfo.mk/ekstra-fungi-kompanija-chij-kvalitet-e-prepoznatliv-na-evropskiot-pazar/'},
  {outlet:'Плусинфо', en:'Plusinfo', headline:'„Брзи, здрави и ароматични оброци со печурки“', sub:'Quick, healthy and aromatic meals with mushrooms — the recipe series with chef Nikola Mishkovski', url:'https://plusinfo.mk/brzi-zdravi-i-aromatichni-obroci-so-pechurki-duri-i-obichna-ka-gana-stanuva-ekskluziven-ruchek-ako-dodadete-malku-vrga/'},
  {outlet:'Органски Свет', en:'Organski Svet', headline:'Extra Fungi на органскиот пазар', sub:'Extra Fungi listed on the organic marketplace', url:'https://organskisvet.mk/product/ekstra-fungi/'},
  {outlet:'PitchBook', en:'PitchBook', headline:'Extra Fungi — Company Profile', sub:'International business profile and market data', url:'https://pitchbook.com/profiles/company/179935-66'}
];

/* =====================================================================
   PAGES
   ===================================================================== */

/* ---- HOME ---- */
write('index.html', shell({nav:'', hero:true,
  title:'Extra Fungi &mdash; Wild Forest Mushrooms from Ko&#269;ani, since 1988',
  desc:'Extra Fungi is a family company from Ko&#269;ani, North Macedonia. Since 1988 we hand-harvest, process and export organic-certified wild forest mushrooms, fruits and vegetables to kitchens across Europe.',
  body:`
<section class="hero" id="top">
  <div class="hero-bg"></div><div class="hero-photo"></div>
  <div class="hero-meta reveal"><div class="yr">1988</div><p>Three generations foraging the forests of eastern Macedonia.</p></div>
  <div class="wrap hero-inner"><div class="reveal">
    <p class="eyebrow" style="color:var(--gold)">Ko&#269;ani · North Macedonia</p>
    <h1 style="margin-top:22px">Wild forests, <em>naturally</em> delivered.</h1>
    <p class="hero-sub">A family company that hand-harvests, cleans and processes the wild mushrooms, fruits and vegetables of the Balkan forests — and ships them, organic-certified and at their peak, to kitchens across Europe.</p>
    <div class="hero-actions"><a href="products.html" class="btn btn-primary">Explore our harvest &rarr;</a><a href="about.html" class="btn btn-ghost">Our story since 1988</a></div>
  </div></div>
  <div class="scroll-hint"><span></span> Scroll</div>
</section>
<div class="marquee" aria-hidden="true"><div class="marquee-track">
  <span>Porcini <i>◦</i> Chanterelles <i>◦</i> Saffron Milk Caps <i>◦</i> St George&#39;s <i>◦</i> Morels <i>◦</i> Wild Berries <i>◦</i> Fresh Vegetables <i>◦</i> Fresh · Dried · Brined · Frozen <i>◦</i>&nbsp;</span>
  <span>Porcini <i>◦</i> Chanterelles <i>◦</i> Saffron Milk Caps <i>◦</i> St George&#39;s <i>◦</i> Morels <i>◦</i> Wild Berries <i>◦</i> Fresh Vegetables <i>◦</i> Fresh · Dried · Brined · Frozen <i>◦</i>&nbsp;</span>
</div></div>
<section class="about pad"><div class="wrap split">
  <div class="copy reveal">
    <p class="eyebrow">Our story</p>
    <p class="lead" style="margin-top:18px">A trade that began with one village, a cooling room, and a respect for the forest.</p>
    <p>Extra Fungi started in 1988 as a small family enterprise — buying wild forest mushrooms from the pickers of the Ko&#269;ani region and processing them in our own facility. It has grown into one of North Macedonia&#39;s trusted names in wild-food export.</p>
    <p>Today we run a modern, full-scale cooling and processing facility built to European standards, most of our range is organic-certified, and we have widened our baskets to include orchard fruit and fresh vegetables.</p>
    <div style="margin-top:30px"><a href="about.html" class="btn btn-ghost">More about us &rarr;</a></div>
  </div>
  <div class="figure reveal"><img loading="lazy" src="${img('photo-1607301405390-d831c242f59b')}" alt="Freshly foraged wild mushrooms" onerror="this.style.display='none'"><div class="badge"><b>35+</b><small>Years foraging</small></div></div>
</div>
<div class="wrap stats">
  <div class="stat reveal"><b>19<em>88</em></b><p>The year the family trade began</p></div>
  <div class="stat reveal"><b>4</b><p>Core export markets across the EU</p></div>
  <div class="stat reveal"><b>25</b><p>People behind every shipment</p></div>
  <div class="stat reveal"><b>100<em>%</em></b><p>Wild-harvested, forest-to-cold-chain</p></div>
</div></section>
<section class="products pad dark"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">The harvest</p><h2>What we bring<br>out of the forest.</h2></div>
  <p class="body">Every basket is graded, cleaned and preserved the way each species deserves — fresh on ice, brined, quick-frozen at peak, or slowly dried. Supplied to importers, distributors and food manufacturers.</p></div>
  <div class="prod-grid">${['porcini','chanterelle','saffron-milk-cap'].map(s=>prodCard(pmap[s])).join('')}</div>
  <div style="margin-top:34px" class="reveal"><a href="products.html" class="btn btn-primary">See the full range &rarr;</a></div>
</div></section>
<section class="pad"><div class="wrap video-feature">
  <div class="video-embed reveal"><iframe src="https://www.youtube-nocookie.com/embed/qULxKFUD9s4" title="Porcini Risotto — Extra Fungi" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  <div class="reveal"><p class="eyebrow">From our kitchen</p><h2 style="font-size:clamp(30px,4vw,46px);font-weight:300;margin-top:16px">Cooking with<br>the wild harvest.</h2>
  <p style="color:var(--muted);margin-top:18px;max-width:44ch">We work with chef Nikola Mishkovski on a series of quick, honest recipes that show what our mushrooms can do — starting with a classic <em>porcini risotto</em>.</p>
  <div style="margin-top:26px"><a href="recipes.html" class="btn btn-ghost">Watch all recipes &rarr;</a></div></div>
</div></section>
<section class="markets pad"><div class="wrap markets-grid">
  <div class="reveal"><p class="eyebrow">Where we ship</p><h2 style="font-size:clamp(30px,4vw,46px);font-weight:300;margin-top:16px">Trusted across<br>European kitchens.</h2>
  <ul class="country-list">
    <li><span class="c">France</span><span class="d">Wild mushroom specialists &amp; distributors</span></li>
    <li><span class="c">Italy</span><span class="d">Porcini for retail &amp; food manufacture</span></li>
    <li><span class="c">Spain</span><span class="d">Fresh &amp; frozen seasonal programmes</span></li>
    <li><span class="c">Germany</span><span class="d">Dried and IQF wholesale supply</span></li>
  </ul></div>
  <div class="map-card reveal"><svg viewBox="0 0 200 200" fill="none" stroke="var(--gold)" stroke-width="4"><circle cx="100" cy="100" r="90"/><path d="M10 100h180M100 10v180M30 55h140M30 145h140"/></svg>
  <p class="eyebrow">From Ko&#269;ani, with care</p><h3>One valley, four borders, countless kitchens.</h3>
  <p>Our location in eastern North Macedonia puts us within a short, reliable cold-chain reach of the whole EU — so wild food that was in the forest this week can be in a European kitchen the next.</p>
  <div style="margin-top:26px"><a href="contact.html" class="btn btn-gold">Become a partner &rarr;</a></div></div>
</div></section>
${cta('Let&#39;s talk harvest','Bring the wild forest<br>to <em>your</em> shelves.','Importers, distributors, chefs and manufacturers — reach out for our current season sheet, samples and export terms.','<a href="mailto:info@extrafungi.com" class="btn btn-primary">info@extrafungi.com</a>','<a href="contact.html" class="btn btn-ghost">Contact us</a>')}
`}));

/* ---- ABOUT ---- */
write('about.html', shell({nav:'about',
  title:'About &mdash; Extra Fungi · Family wild-mushroom company since 1988',
  desc:'Extra Fungi has bought, processed and exported wild forest mushrooms from Ko&#269;ani, North Macedonia since 1988 — a family business with a modern, organic-certified processing facility serving European markets.',
  body:`
<section class="page-hero"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / About</p>
  <p class="eyebrow">Since 1988 · Ko&#269;ani</p>
  <h1>A family trade, rooted in the <em>forest</em>.</h1>
  <p class="sub">For over three decades we have connected the wild forests of eastern North Macedonia with the kitchens and shelves of Europe — one carefully graded basket at a time.</p>
</div></section>
<section class="pad"><div class="wrap split">
  <div class="copy reveal"><p class="eyebrow">The beginning</p><p class="lead" style="margin-top:18px">It started with pickers, a scale, and a single cooling room.</p>
  <p>In 1988, our family began buying wild forest mushrooms from the pickers around Ko&#269;ani and processing them in our own small facility. The region — sunny, fertile and clean — has always been among the finest foraging grounds in the Balkans.</p>
  <p>That seasonal trade became a full-scale, modernised operation. What never changed is the principle it was built on: pay the pickers fairly, handle the harvest with respect, and never ship anything we would not put on our own table.</p></div>
  <div class="figure reveal"><img loading="lazy" src="${img('photo-1478147427282-58a87a120781')}" alt="Forest floor in autumn" onerror="this.style.display='none'"><div class="badge"><b>1988</b><small>Founded</small></div></div>
</div></section>
<section class="about pad"><div class="wrap split rev">
  <div class="figure reveal" style="aspect-ratio:5/4"><img loading="lazy" src="${img('photo-1567306226416-28f0efdc88ce')}" alt="Modern cold storage facility" onerror="this.style.display='none'"></div>
  <div class="copy reveal"><p class="eyebrow">The facility</p><p class="lead" style="margin-top:18px">Modern cold chain, built to European standards.</p>
  <p>Our cooling and processing facility lets us move quickly the moment a delivery arrives — sorting, cleaning and preserving each species by the method that suits it best: fresh on ice, brined, quick-frozen, or slowly dried.</p>
  <p>Most of our range is <strong>organic-certified</strong>, and every lot is inspected and graded before it is packed. That discipline is why our quality is recognised by buyers across the European market.</p></div>
</div></section>
<section class="pad"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Forest to table</p><h2>How it reaches<br>your kitchen.</h2></div><p class="body">A short, honest chain that protects the flavour of wild food — from the pickers we have known for decades to the container that leaves for Europe.</p></div>
  <div class="feature-list proc-grid">
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 21c5-4 8-8 8-12a8 8 0 0 0-16 0c0 4 3 8 8 12Z"/><circle cx="12" cy="9" r="2.5"/></svg><div class="n">01</div><h3>Foraged</h3><p>Local pickers harvest by hand across the forests of eastern Macedonia, exactly in season.</p></div>
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M4 7h16M6 7v11a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M9 7V5a3 3 0 0 1 6 0v2"/></svg><div class="n">02</div><h3>Bought &amp; sorted</h3><p>Each delivery is weighed, inspected and graded at our buy-out station within hours of picking.</p></div>
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg><div class="n">03</div><h3>Processed</h3><p>Cleaned, then chilled, brined, quick-frozen or slowly dried in our facility, built to modern EU standards.</p></div>
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M3 8h13l4 4v4h-2M3 8v8h2M9 16h6M7 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg><div class="n">04</div><h3>Exported</h3><p>Packed to spec and shipped in a controlled cold chain to buyers across the European Union.</p></div>
  </div>
</div></section>
<section class="about pad"><div class="wrap">
  <div class="sec-head reveal" style="grid-template-columns:1fr"><div><p class="eyebrow">What we stand for</p><h2 style="max-width:16ch">Honest wild food, handled with respect.</h2></div></div>
  <div class="values-grid">
    <div class="value reveal"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 3c4 3 6 6 6 10a6 6 0 0 1-12 0c0-4 2-7 6-10Z"/></svg></div><h3>Of the forest</h3><p>We harvest what the season gives and take no more — protecting the woodlands that have fed three generations of our family.</p></div>
    <div class="value reveal"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M20 6 9 17l-5-5"/></svg></div><h3>Graded, not guessed</h3><p>Every lot is inspected, cleaned and graded by hand and to standard, so buyers know exactly what arrives in the box.</p></div>
    <div class="value reveal"><div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM2 12h20M12 2c3 3 3 17 0 20M12 2c-3 3-3 17 0 20"/></svg></div><h3>Built for Europe</h3><p>A modern, organic-certified cold chain means our wild food travels across borders without losing what makes it special.</p></div>
  </div>
</div></section>
<section class="products pad dark"><div class="wrap split">
  <div class="copy reveal"><p class="eyebrow">Our retail brand</p><h2 style="font-size:clamp(30px,4vw,46px);font-weight:300;margin:16px 0 18px;color:#fff">Extra&nbsp;Food.</h2>
  <p style="color:rgba(255,255,255,.8)">Beyond wholesale, we pack a selection of our forest mushrooms and frozen fruit under our own retail label, <strong>Extra&nbsp;Food</strong> — bringing the same wild quality straight to the shelf and the home kitchen.</p>
  <div style="margin-top:26px"><a href="blog-extra-food.html" class="btn btn-primary">Read the story &rarr;</a></div></div>
  <div class="reveal"><div class="chips" style="gap:14px"><span class="chip">Dried porcini</span><span class="chip">Frozen forest mix</span><span class="chip">Frozen berries</span><span class="chip">Brined mushrooms</span><span class="chip">Retail &amp; HORECA packs</span></div></div>
</div></section>
${cta('Let&#39;s talk harvest','Partner with a name Europe<br><em>already</em> trusts.','Reach out for our current season sheet, certifications, samples and export terms.','<a href="mailto:info@extrafungi.com" class="btn btn-primary">info@extrafungi.com</a>','<a href="contact.html" class="btn btn-ghost">Contact us</a>')}
`}));

/* ---- PRODUCTS (index) ---- */
write('products.html', shell({nav:'products',
  title:'Products &mdash; Extra Fungi · Wild mushrooms, fruits &amp; vegetables',
  desc:'Extra Fungi supplies wild forest mushrooms — porcini, chanterelle, saffron milk cap, St George&#39;s, morel — plus fruits, berries and vegetables, available fresh, dried, brined and IQF-frozen.',
  body:`
<section class="page-hero"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / Products</p>
  <p class="eyebrow">The range</p>
  <h1>Everything the <em>forest</em> and valley give.</h1>
  <p class="sub">Wild mushrooms at the heart of it, alongside orchard fruit, wild berries and fresh vegetables — each handled in the format that keeps it at its best. Click any product for detail.</p>
</div></section>
<section class="products pad dark"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Wild mushrooms</p><h2>Graded by hand,<br>species by species.</h2></div><p class="body">Foraged across eastern North Macedonia and processed within hours. Available fresh, dried, brined and IQF-frozen — graded to your specification for retail, HORECA and manufacturing.</p></div>
  <div class="prod-grid">${['porcini','chanterelle','saffron-milk-cap','st-georges','morel','produce'].map(s=>prodCard(pmap[s])).join('')}</div>
</div></section>
<section class="pad"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Formats</p><h2>Preserved the way<br>each species deserves.</h2></div><p class="body">The method follows the mushroom — not the other way around. Tell us your market and we will grade, cut and pack to suit.</p></div>
  <div class="feature-list">
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 18 0M12 3v9"/></svg><div class="n">Fresh</div><h3>On ice, in season</h3><p>Same-day graded and chilled for the shortest possible journey from forest to kitchen.</p></div>
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19"/></svg><div class="n">IQF Frozen</div><h3>Quick-frozen at peak</h3><p>Individually quick-frozen to lock in texture, colour and aroma for year-round supply.</p></div>
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M12 2c3 4 5 7 5 10a5 5 0 0 1-10 0c0-3 2-6 5-10Z"/></svg><div class="n">Brined</div><h3>Traditionally preserved</h3><p>Salted and brined for stable shelf life and the classic depth manufacturers rely on.</p></div>
    <div class="step reveal"><svg viewBox="0 0 24 24" fill="none" stroke-width="1.6"><path d="M4 12h16M7 8h10M7 16h10M12 4v16" stroke-linecap="round"/></svg><div class="n">Dried</div><h3>Slowly concentrated</h3><p>Air-dried whole or sliced to intensify flavour — light to ship, long to keep.</p></div>
  </div>
</div></section>
<section class="about pad"><div class="wrap split">
  <div class="copy reveal"><p class="eyebrow">Beyond mushrooms</p><p class="lead" style="margin-top:18px">Fruit, berries and vegetables from the same valley.</p>
  <p>The Ko&#269;ani valley&#39;s sun and fertile soil give more than mushrooms. We buy and process orchard fruit, wild forest berries and field vegetables — frozen at harvest or handled fresh through the same modern cold chain.</p>
  <div class="chips"><span class="chip">Wild berries</span><span class="chip">Orchard fruit</span><span class="chip">Peppers</span><span class="chip">Tomatoes</span><span class="chip">Field vegetables</span></div>
  <div style="margin-top:26px"><a href="product-produce.html" class="btn btn-ghost">See produce &rarr;</a></div></div>
  <div class="figure reveal"><img loading="lazy" src="${img('photo-1425934398893-310a009a77f9')}" alt="Fresh produce from the valley" onerror="this.style.display='none'"></div>
</div></section>
${cta('Trade enquiries','Request the current<br><em>season sheet</em>.','Grades, formats, pack sizes and availability change with the season. Tell us your market and we will send what is ready now.','<a href="mailto:info@extrafungi.com" class="btn btn-primary">Request catalogue</a>','<a href="contact.html" class="btn btn-ghost">Contact us</a>')}
`}));

/* ---- PRODUCT DETAIL PAGES ---- */
PRODUCTS.forEach((p, i)=>{
  const related = PRODUCTS.filter(x=>x.slug!==p.slug).slice(0,3);
  write(`product-${p.slug}.html`, shell({nav:'products',
    title:`${p.name.replace(/&amp;/g,'&')} &mdash; Extra Fungi`,
    desc:`${p.name} (${p.lat}) from Extra Fungi, Ko&#269;ani — ${p.formats}. Wild-harvested and processed to European standards.`,
    body:`
<section class="page-hero tight"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / <a href="products.html">Products</a> / ${p.name}</p>
  <div class="pd-hero">
    <div><p class="eyebrow">${p.tag}</p><h1 style="margin-top:14px">${p.name}</h1>
      <p style="font-family:'Fraunces';font-style:italic;color:var(--gold);font-size:20px;margin-top:8px">${p.mk} · ${p.lat}</p>
      <p class="sub">${p.intro[0]}</p>
      <div style="margin-top:26px" class="hero-actions"><a href="contact.html" class="btn btn-primary">Enquire about ${p.name.split(' ')[0]} &rarr;</a></div>
    </div>
    <div class="figure reveal"><img loading="lazy" src="${img(p.img,1000)}" alt="${p.name}" onerror="this.style.display='none'"></div>
  </div>
</div></section>
<section class="pad"><div class="wrap">
  <div class="spec-grid reveal">
    <div class="spec"><h4>Season</h4><p>${p.season}</p></div>
    <div class="spec"><h4>Formats</h4><p>${p.formats}</p></div>
    <div class="spec"><h4>Grades</h4><p>${p.grades}</p></div>
    <div class="spec"><h4>Packing</h4><p>${p.pack}</p></div>
  </div>
  <div class="split" style="margin-top:64px;align-items:start">
    <div class="copy reveal"><p class="eyebrow">About the ${p.name.split(' ')[0].toLowerCase()==='fruits'?'range':'mushroom'}</p>
      <p class="lead" style="margin:16px 0 20px">${p.intro[0]}</p>
      <p style="color:var(--muted)">${p.intro[1]}</p></div>
    <div class="reveal"><div style="background:var(--cream-2);border-radius:12px;padding:34px">
      <p class="eyebrow">${p.culinaryTitle}</p>
      <p style="margin:14px 0 18px">${p.culinary}</p>
      <div class="chips">${p.uses.map(u=>`<span class="chip">${u}</span>`).join('')}</div>
    </div></div>
  </div>
</div></section>
<section class="products pad dark"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">More from the harvest</p><h2>You might also<br>be looking for.</h2></div><p class="body">Every species is available fresh, and in the preserved formats that suit it. Mix and match across a single order.</p></div>
  <div class="prod-grid">${related.map(r=>prodCard(r)).join('')}</div>
</div></section>
${cta('Trade enquiries','Get ${p} on your<br><em>menu</em> or shelf.'.replace('${p}',p.name),'Ask for current availability, grades and export terms — we reply with the season sheet.','<a href="mailto:info@extrafungi.com" class="btn btn-primary">Request pricing</a>','<a href="products.html" class="btn btn-ghost">All products</a>')}
`}));
});

/* ---- RECIPES ---- */
write('recipes.html', shell({nav:'recipes',
  title:'Recipes &mdash; Extra Fungi · Cooking with wild porcini',
  desc:'A recipe series with chef Nikola Mishkovski and Extra Fungi — porcini risotto, beef Wellington and Caesar salad, all built around wild forest mushrooms.',
  body:`
<section class="page-hero"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / Recipes</p>
  <p class="eyebrow">With chef Nikola Mishkovski</p>
  <h1>Quick, honest dishes<br>built on <em>wild porcini</em>.</h1>
  <p class="sub">A short series that shows what our mushrooms can do in a real kitchen — simple ingredients, forest flavour, nothing fussy.</p>
</div></section>
<section class="pad"><div class="wrap video-feature">
  <div class="video-embed reveal"><iframe src="https://www.youtube-nocookie.com/embed/qULxKFUD9s4" title="Porcini Risotto — Extra Fungi" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>
  <div class="reveal"><p class="eyebrow">Featured</p><h2 style="font-size:clamp(28px,3.6vw,42px);font-weight:300;margin-top:14px">Porcini Risotto</h2>
  <p style="color:var(--muted);margin-top:16px;max-width:44ch">Creamy, slow-stirred and fragrant with wild <em>vrgan&#39;</em>. The dish that shows why Boletus edulis is the prize of the Balkan forest.</p>
  <div style="margin-top:24px"><a href="blog-porcini-risotto.html" class="btn btn-ghost">Read the recipe &rarr;</a></div></div>
</div></section>
<section class="about pad"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">The series</p><h2>Three ways with<br>wild mushrooms.</h2></div><p class="body">Recipes originally shared on our journal at extrafungi.com. Press play — each one takes just a few minutes to watch.</p></div>
  <div class="video-grid">
    <article class="video-card reveal"><div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/qULxKFUD9s4" title="Porcini Risotto" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="vbody"><div class="vk">Primo</div><h3>Porcini Risotto</h3><p>Slow-stirred Arborio, stock and wild porcini — comfort with an aromatic, foraged heart.</p></div></article>
    <article class="video-card reveal"><div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/zBjpznHgU_0" title="Beef Wellington with porcini" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="vbody"><div class="vk">Main</div><h3>Beef Wellington with Porcini</h3><p>A classic showpiece, where a wild-mushroom duxelles wraps the fillet in deep forest flavour.</p></div></article>
    <article class="video-card reveal"><div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/tTsXhe6vUcs" title="Caesar salad with porcini" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="vbody"><div class="vk">Starter</div><h3>Caesar Salad, Porcini Twist</h3><p>The familiar Caesar, lifted with the savoury, umami note of wild porcini.</p></div></article>
  </div>
</div></section>
${cta('Cook with the real thing','Want these mushrooms<br>in <em>your</em> kitchen?','From restaurant supply to retail packs under our Extra&nbsp;Food label — let&#39;s get wild porcini onto your menu or shelf.','<a href="products.html" class="btn btn-primary">See our products</a>','<a href="contact.html" class="btn btn-ghost">Contact us</a>')}
`}));

/* ---- BLOG INDEX ---- */
write('blog.html', shell({nav:'blog',
  title:'Blog &mdash; Extra Fungi · Journal &amp; recipes from the forest',
  desc:'Stories from the Ko&#269;ani forests, notes on how we work, and the Extra Fungi recipe series — the journal of a family wild-mushroom company.',
  body:`
<section class="page-hero"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / Blog</p>
  <p class="eyebrow">Journal</p>
  <h1>Notes from the <em>forest</em> floor.</h1>
  <p class="sub">Stories from the Ko&#269;ani forests, how we grade and ship wild food, our Extra Food retail brand, and the recipe series with chef Nikola Mishkovski.</p>
</div></section>
<section class="pad"><div class="wrap">
  <div class="blog-grid">${POSTS.map(postCard).join('')}</div>
</div></section>
${cta('Stay close to the harvest','Bring the forest<br>to <em>your</em> business.','Whether you buy by the pallet or pack for the shelf, we would love to talk.','<a href="products.html" class="btn btn-primary">See our products</a>','<a href="contact.html" class="btn btn-ghost">Contact us</a>')}
`}));

/* ---- BLOG POSTS ---- */
POSTS.forEach(post=>{
  const others = POSTS.filter(x=>x.slug!==post.slug).slice(0,3);
  const videoBlock = post.video ? `<div class="video-embed reveal" style="border-radius:12px;overflow:hidden;margin:8px 0 30px"><iframe src="https://www.youtube-nocookie.com/embed/${post.video}" title="${post.title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>` : `<div class="post-figure reveal"><img loading="lazy" src="${img(post.img,1200)}" alt="" onerror="this.style.display='none'"></div>`;
  write(`${post.slug}.html`, shell({nav:'blog',
    title:`${post.title} &mdash; Extra Fungi`,
    desc:post.excerpt,
    body:`
<section class="page-hero tight"><div class="wrap narrow">
  <p class="crumb"><a href="index.html">Home</a> / <a href="blog.html">Blog</a> / ${post.cat}</p>
  <div class="post-meta"><span class="cat${post.cat==='Recipe'?' recipe':''}">${post.cat}</span><span>${post.date}</span><span>·</span><span>${post.read}</span></div>
  <h1 style="margin-top:16px;font-size:clamp(32px,5vw,58px)">${post.title}</h1>
</div></section>
<section class="pad" style="padding-top:64px"><div class="wrap narrow">
  ${videoBlock}
  <div class="prose reveal">${pretty(post.body)}</div>
  <div style="margin-top:40px;display:flex;gap:14px;flex-wrap:wrap">
    ${post.video?`<a href="https://www.youtube.com/watch?v=${post.video}" target="_blank" rel="noopener" class="btn btn-primary">Watch on YouTube &rarr;</a>`:''}
    <a href="products.html" class="btn btn-ghost">Explore our products</a>
  </div>
</div></section>
<section class="about pad"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Keep reading</p><h2>More from the<br>journal.</h2></div></div>
  <div class="blog-grid">${others.map(postCard).join('')}</div>
</div></section>
`}));
});

/* ---- PRESS ---- */
write('press.html', shell({nav:'press',
  title:'Press &mdash; Extra Fungi · Recognised across Europe',
  desc:'Extra Fungi in the press — coverage of a family wild-mushroom company from Ko&#269;ani whose quality is recognised on the European market, plus a company fact sheet for media.',
  body:`
<section class="page-hero"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / Press</p>
  <p class="eyebrow">In the media</p>
  <h1>A quality Europe <em>recognises</em>.</h1>
  <p class="sub">Coverage of Extra Fungi and our recipe series, plus the facts and figures you need to write about us.</p>
</div></section>
<section class="pad"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Coverage</p><h2>Extra Fungi<br>in the press.</h2></div><p class="body">A selection of articles and profiles. Some are in Macedonian — an English gloss is given beneath each headline.</p></div>
  <div class="press-list reveal">
    ${PRESS.map(m=>`<a class="press-item" href="${m.url}" target="_blank" rel="noopener">
      <span class="outlet">${m.outlet}</span>
      <span class="headline">${m.headline}<small>${m.sub}</small></span>
      <span class="go">Read &rarr;</span>
    </a>`).join('')}
  </div>
</div></section>
<section class="products pad dark"><div class="wrap">
  <div class="sec-head reveal"><div><p class="eyebrow">Press kit</p><h2>Company<br>fact sheet.</h2></div><p class="body">Everything at a glance. For interviews, images or further information, contact us at <a href="mailto:info@extrafungi.com" style="color:var(--gold)">info@extrafungi.com</a>.</p></div>
  <div class="factsheet reveal">
    <div class="f"><h4>Founded</h4><p>1988 — family business</p></div>
    <div class="f"><h4>Headquarters</h4><p>Ko&#269;ani, North Macedonia</p></div>
    <div class="f"><h4>Team</h4><p>≈ 25 people</p></div>
    <div class="f"><h4>Core business</h4><p>Buy-out, processing &amp; export of wild forest mushrooms</p></div>
    <div class="f"><h4>Also</h4><p>Fruits, berries &amp; vegetables</p></div>
    <div class="f"><h4>Formats</h4><p>Fresh · Dried · Brined · IQF frozen</p></div>
    <div class="f"><h4>Certification</h4><p>Organic-certified range</p></div>
    <div class="f"><h4>Export markets</h4><p>France · Italy · Spain · Germany</p></div>
    <div class="f"><h4>Brands</h4><p>Extra Fungi (wholesale) · Extra Food (retail)</p></div>
  </div>
</div></section>
${cta('Media &amp; partnerships','Writing about<br><em>wild food</em>?','We are happy to help with interviews, imagery and background on the wild-mushroom trade in North Macedonia.','<a href="mailto:info@extrafungi.com" class="btn btn-primary">Contact press</a>','<a href="about.html" class="btn btn-ghost">About us</a>')}
`}));

/* ---- CONTACT ---- */
write('contact.html', shell({nav:'contact',
  title:'Contact &mdash; Extra Fungi · Ko&#269;ani, North Macedonia',
  desc:'Get in touch with Extra Fungi in Ko&#269;ani, North Macedonia — trade enquiries, samples, certifications and the current season sheet for wild forest mushrooms.',
  body:`
<section class="page-hero"><div class="wrap">
  <p class="crumb"><a href="index.html">Home</a> / Contact</p>
  <p class="eyebrow">Let&#39;s talk harvest</p>
  <h1>Get in <em>touch</em>.</h1>
  <p class="sub">Importers, distributors, chefs and manufacturers — tell us your market and we&#39;ll send the current season sheet, samples and export terms.</p>
</div></section>
<section class="pad"><div class="wrap contact-grid">
  <div class="reveal">
    <h2 style="font-size:clamp(26px,3vw,36px);font-weight:300;margin-bottom:6px">Send a message</h2>
    <p style="color:var(--muted);margin-bottom:26px">We reply in the language of the harvest.</p>
    <form id="contactForm" novalidate>
      <div class="field"><label for="cf-name">Name</label><input id="cf-name" name="name" type="text" autocomplete="name" placeholder="Your name" required></div>
      <div class="field"><label for="cf-email">Email</label><input id="cf-email" name="email" type="email" autocomplete="email" placeholder="you@company.com" required></div>
      <div class="field"><label for="cf-company">Company</label><input id="cf-company" name="company" type="text" placeholder="Company / market"></div>
      <div class="field"><label for="cf-interest">Interest</label>
        <select id="cf-interest" name="interest">
          <option>Wild mushrooms — wholesale</option>
          <option>Fruits, berries &amp; vegetables</option>
          <option>Extra Food retail packs</option>
          <option>Certifications &amp; documents</option>
          <option>Press &amp; media</option>
          <option>Other</option>
        </select>
      </div>
      <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" rows="4" placeholder="What are you looking for, and for which market?"></textarea></div>
      <button type="submit" class="btn btn-primary">Send enquiry &rarr;</button>
      <p id="formNote" role="status" hidden style="margin-top:16px;color:var(--blue);font-size:14px"></p>
    </form>
  </div>
  <div class="reveal">
    <h2 style="font-size:clamp(26px,3vw,36px);font-weight:300;margin-bottom:22px">Find us</h2>
    <div class="info-row"><div class="ic"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M12 21c5-4 8-8 8-12a8 8 0 0 0-16 0c0 4 3 8 8 12Z"/><circle cx="12" cy="9" r="2.6"/></svg></div><div><h4>Address</h4><p>Extra Fungi<br>ul. Kliment Ohridski, Ko&#269;ani<br>North Macedonia</p></div></div>
    <div class="info-row"><div class="ic"><svg viewBox="0 0 24 24" stroke-width="1.6"><path d="M4 5h4l2 5-2.5 1.5a11 11 0 0 0 5 5L20 14l2 4v2a2 2 0 0 1-2 2A16 16 0 0 1 4 6 2 2 0 0 1 4 5Z"/></svg></div><div><h4>Email</h4><p><a href="mailto:info@extrafungi.com">info@extrafungi.com</a></p></div></div>
    <div class="info-row"><div class="ic"><svg viewBox="0 0 24 24" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg></div><div><h4>Website</h4><p><a href="https://www.extrafungi.com" target="_blank" rel="noopener">www.extrafungi.com</a></p></div></div>
    <div class="info-row" style="border-bottom:0"><div class="ic"><svg viewBox="0 0 24 24" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg></div><div><h4>Trading hours</h4><p>Mon&ndash;Fri, and through the harvest season</p></div></div>
    <div style="margin-top:26px;border-radius:10px;overflow:hidden;border:1px solid var(--line)">
      <iframe title="Ko&#269;ani, North Macedonia map" width="100%" height="240" style="border:0;display:block" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Ko%C4%8Dani,+North+Macedonia&output=embed"></iframe>
    </div>
  </div>
</div></section>
`}));

console.log('\\nAll pages generated.');
