document.addEventListener('DOMContentLoaded',function(){
  const ham=document.querySelector('.hamburger');
  const nav=document.querySelector('.main-nav');
  ham&&ham.addEventListener('click',()=>{
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  });
  
  // Category filtering logic (class-based + ARIA)
  const catLinks = document.querySelectorAll('[data-cat]');
  const cards = document.querySelectorAll('.articles-grid .card');

  function setActiveCat(cat){
    // Highlight links
    catLinks.forEach(a=>{ a.classList.toggle('active', a.dataset.cat===cat); });

    // Show/hide cards using class and aria-hidden for accessibility
    cards.forEach(c=>{
      const cardCat = c.dataset.category || 'uncategorized';
      const match = (cat === 'all' || cardCat === cat);
      if(match){
        c.classList.remove('is-hidden');
        c.setAttribute('aria-hidden','false');
        // make focusable
        const link = c.querySelector('a');
        if(link) link.tabIndex = 0;
      } else {
        c.classList.add('is-hidden');
        c.setAttribute('aria-hidden','true');
        const link = c.querySelector('a');
        if(link) link.tabIndex = -1;
      }
    });
    // Toggle no-results
    const noResults = document.querySelector('.no-results');
    const visible = Array.from(cards).some(c=>!c.classList.contains('is-hidden'));
    if(noResults){
      if(visible){ noResults.classList.add('is-hidden'); }
      else { noResults.classList.remove('is-hidden'); }
    }
  }

  catLinks.forEach(link=>{
    link.addEventListener('click', (e)=>{
      const cat = link.dataset.cat || 'all';
      e.preventDefault();
      history.replaceState(null,'', '#' + cat);
      setActiveCat(cat);
    });
  });

  // On load, read hash
  const hash = (location.hash||'').replace('#','');
  if(hash){ setActiveCat(hash); }
  else { setActiveCat('all'); }
});
