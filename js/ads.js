// Ads helper: lazy-init AdSense blocks when in viewport
function initAds(){
  const adContainers=document.querySelectorAll('.ad-container');
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const scripts = e.target.querySelectorAll('script[data-ads]');
        scripts.forEach(s=>{ if(!s.dataset.loaded){ eval(s.textContent); s.dataset.loaded = '1'; }});
      }
    });
  },{rootMargin:'200px'});
  adContainers.forEach(c=>io.observe(c));
}
document.addEventListener('DOMContentLoaded',initAds);
