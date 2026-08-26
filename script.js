const eventDate = new Date('2026-09-03T09:00:00+05:30').getTime();
const pad = n => String(n).padStart(2,'0');
function updateCountdown(){
  const diff = Math.max(0, eventDate - Date.now());
  const total = Math.floor(diff/1000);
  const days = Math.floor(total/86400);
  const hours = Math.floor((total%86400)/3600);
  const minutes = Math.floor((total%3600)/60);
  const seconds = total%60;
  document.querySelector('#days').textContent = pad(days);
  document.querySelector('#hours').textContent = pad(hours);
  document.querySelector('#minutes').textContent = pad(minutes);
  document.querySelector('#seconds').textContent = pad(seconds);
}
updateCountdown();
setInterval(updateCountdown,1000);

const menuBtn = document.querySelector('#menuBtn');
const mobileNav = document.querySelector('#mobileNav');
menuBtn?.addEventListener('click',()=>{
  const open = mobileNav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded',String(open));
  mobileNav.setAttribute('aria-hidden',String(!open));
});
mobileNav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  mobileNav.classList.remove('open');
  menuBtn?.setAttribute('aria-expanded','false');
  mobileNav.setAttribute('aria-hidden','true');
}));

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

document.addEventListener('mousemove',e=>{
  const glow=document.querySelector('#cursorGlow');
  if(glow) { glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px'; }
});
