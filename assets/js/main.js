
(function(){
  document.documentElement.classList.add('js-ready');
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.progress');
  const hero = document.querySelector('.hero');

  function onScroll(){
    if(header) header.classList.toggle('scrolled', window.scrollY > 40);
    if(progress){
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = max > 0 ? (window.scrollY / max * 100) + '%' : '0%';
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth mouse-follow light effect
  if(hero && !window.matchMedia('(max-width: 768px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    let tx = 58, ty = 45, cx = 58, cy = 45;
    function animate(){
      cx += (tx - cx) * 0.10;
      cy += (ty - cy) * 0.10;
      hero.style.setProperty('--mouse-x', cx + '%');
      hero.style.setProperty('--mouse-y', cy + '%');
      requestAnimationFrame(animate);
    }
    hero.addEventListener('mousemove', (e)=>{
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
    });
    hero.addEventListener('mouseleave', ()=>{
      tx = 58;
      ty = 45;
    });
    animate();
  }

  // Reveal animations - improved threshold and fallback
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('show');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.08, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('show'));
  }
  // Immediate reveal for first viewport content
  setTimeout(()=>{document.querySelectorAll('.hero .reveal, .page-hero .reveal').forEach(el=>el.classList.add('show'));}, 120);

  // Animated counters
  const counters = document.querySelectorAll('[data-count]');
  function animateCounter(el){
    if(el.dataset.done) return;
    el.dataset.done = '1';
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const duration = 1300;
    const start = performance.now();
    function tick(now){
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      current = target * eased;
      el.textContent = Math.round(current).toLocaleString() + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  if('IntersectionObserver' in window){
    const counterIO = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          animateCounter(entry.target);
          counterIO.unobserve(entry.target);
        }
      })
    }, {threshold:.25});
    counters.forEach(el=>counterIO.observe(el));
  } else {
    counters.forEach(animateCounter);
  }

  const form = document.querySelector('[data-demo-form]');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const msg = document.querySelector('.success-message');
      if(msg) msg.style.display = 'block';
      form.reset();
    });
  }

  document.querySelectorAll('.lang-toggle').forEach(el=>{
    el.addEventListener('click', ()=>{
      const isAr = document.documentElement.getAttribute('lang') === 'ar';
      const currentPath = window.location.pathname;
      let currentPage = currentPath.split('/').pop() || 'index.html';
      if(!currentPage.includes('.html')) currentPage = 'index.html';
      
      let targetPage;
      if (isAr) {
        targetPage = currentPage.replace('-ar.html', '.html');
      } else {
        targetPage = currentPage.replace('.html', '-ar.html');
      }
      
      window.location.href = targetPage + window.location.hash;
    });
  });

  const searchButtons = document.querySelectorAll('.nav-icon-btn');
  if(searchButtons.length){
    const isAr = document.documentElement.getAttribute('lang') === 'ar';
    const pages = isAr ? [
      ['الرئيسية','نظرة عامة على سكولبري والمكتبات والأدوار','index-ar.html'],
      ['من نحن','قصة سكولبري ومجموعة المتحدة للتعليم','about-ar.html'],
      ['المكتبات','المكتبات الاثنتا عشرة وأنواع المحتوى','libraries-ar.html'],
      ['بنك الأسئلة','التقييم الذكي والتصحيح الآلي والتحليلات','question-bank-ar.html'],
      ['التكاملات','LTI وSCORM وxAPI وتسجيل الدخول الموحد','integrations-ar.html'],
      ['المدارس','الفوائد المؤسسية والانتشار والتفعيل','schools-ar.html'],
      ['المعلمون','سير عمل المعلم قبل وبعد سكولبري','teachers-ar.html'],
      ['الطلاب والأهل','تجربة تعلم آمنة ومناسبة للجوال','students-ar.html'],
      ['اتصل بنا','طلب عرض تجريبي والتواصل مع الفريق','contact-ar.html'],
      ['الخصوصية والشروط','السياسات وإمكانية الوصول','legal-ar.html']
    ] : [
      ['Home','Overview of Schoobrary, libraries, roles, and integrations','index.html'],
      ['About','Schoobrary story and United Education Group','about.html'],
      ['Libraries','The twelve libraries and content types','libraries.html'],
      ['Question Bank','Smart assessment, auto-grading, and analytics','question-bank.html'],
      ['Integrations','LTI, SCORM, xAPI, and single sign-on','integrations.html'],
      ['Schools','Institutional benefits, rollout, and activation','schools.html'],
      ['Teachers','Teacher workflow before and after Schoobrary','teachers.html'],
      ['Students & Parents','Safe mobile-friendly learning experience','students.html'],
      ['Contact','Request a demo and contact the team','contact.html'],
      ['Privacy & Terms','Policies and accessibility','legal.html']
    ];
    const panel = document.createElement('div');
    panel.className = 'search-panel';
    panel.innerHTML = `
      <div class="search-dialog" role="dialog" aria-modal="true" aria-label="${isAr ? 'بحث في الموقع' : 'Site search'}">
        <div class="search-head">
          <input type="search" placeholder="${isAr ? 'ابحث عن صفحة أو موضوع' : 'Search pages or topics'}" aria-label="${isAr ? 'بحث' : 'Search'}">
          <button class="search-close" type="button" aria-label="${isAr ? 'إغلاق البحث' : 'Close search'}">×</button>
        </div>
        <div class="search-results"></div>
      </div>`;
    document.body.appendChild(panel);
    const input = panel.querySelector('input');
    const results = panel.querySelector('.search-results');
    const close = panel.querySelector('.search-close');

    function renderResults(query=''){
      const q = query.trim().toLowerCase();
      const matched = pages.filter(([title, desc]) => !q || (title + ' ' + desc).toLowerCase().includes(q));
      results.innerHTML = matched.length ? matched.map(([title, desc, url]) => (
        `<a class="search-result" href="${url}"><strong>${title}</strong><span>${desc}</span></a>`
      )).join('') : `<div class="search-empty">${isAr ? 'لا توجد نتائج مطابقة.' : 'No matching results.'}</div>`;
    }
    function openSearch(){
      renderResults();
      panel.classList.add('open');
      searchButtons.forEach(btn=>btn.setAttribute('aria-expanded','true'));
      setTimeout(()=>input.focus(), 20);
    }
    function closeSearch(){
      panel.classList.remove('open');
      searchButtons.forEach(btn=>btn.setAttribute('aria-expanded','false'));
    }
    searchButtons.forEach(btn=>{
      btn.setAttribute('aria-expanded','false');
      btn.addEventListener('click', openSearch);
    });
    input.addEventListener('input', ()=>renderResults(input.value));
    close.addEventListener('click', closeSearch);
    panel.addEventListener('click', (e)=>{ if(e.target === panel) closeSearch(); });
    document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && panel.classList.contains('open')) closeSearch(); });
  }

  const menuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if(menuBtn && navLinks){
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.addEventListener('click', ()=>{
      const open = navLinks.classList.toggle('mobile-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click', ()=>{
        navLinks.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
    // Close on outside click
    document.addEventListener('click', (e)=>{
      if(navLinks.classList.contains('mobile-open') && !navLinks.contains(e.target) && !menuBtn.contains(e.target)){
        navLinks.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
    // Close on Escape
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && navLinks.classList.contains('mobile-open')){
        navLinks.classList.remove('mobile-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }
})();
