const grid = document.getElementById('projectGrid');
const filters = document.querySelectorAll('.filter');
const modal = document.getElementById('videoModal');
const frame = document.getElementById('videoFrame');
const localVideoPlayer = document.getElementById('localVideoPlayer');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const videoExternalLink = document.getElementById('videoExternalLink');
let clearVideoTimer = null;
const cursorGlow = document.getElementById('cursorGlow');

function driveThumb(id){
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1200`;
}

/* ---------- Render portfolio ---------- */
function renderProjects(){
  grid.innerHTML = '';

  window.PORTFOLIO_PROJECTS.forEach((p) => {
    const card = document.createElement('article');
    card.className = 'project-card card-visible';
    card.dataset.filter = p.filter;
    card.dataset.id = p.id;
    card.dataset.title = p.title;
    card.dataset.category = p.category;

    card.innerHTML = `
      <div class="project-media">
        <div class="project-preview-fallback">
          <span>${p.category}</span>
          <strong>${p.title}</strong>
        </div>

        <img
          class="project-thumb"
          src="${driveThumb(p.id)}"
          alt="${p.title} thumbnail"
          loading="lazy"
        >

        <div class="project-shade"></div>
      </div>

      <div class="project-top">
        <span class="tag">${p.category.toUpperCase()}</span>
        <span class="play-mini">▶</span>
      </div>

      <div class="project-copy">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </div>`;

    const img = card.querySelector('.project-thumb');
    img.addEventListener('error', () => img.classList.add('thumb-error'), {once:true});

    card.addEventListener('click',()=>openVideo(p));
    grid.appendChild(card);
  });
}

/* ---------- Video modal ---------- */
function openVideo(p){
  if(clearVideoTimer){
    clearTimeout(clearVideoTimer);
    clearVideoTimer = null;
  }

  const driveView = `https://drive.google.com/file/d/${p.id}/view`;
  const drivePreview = `https://drive.google.com/file/d/${p.id}/preview`;

  const hasLocalVideo = Boolean(p.localVideo);

  if(hasLocalVideo){
    frame.style.display = 'none';
    frame.src = 'about:blank';

    localVideoPlayer.style.display = 'block';
    localVideoPlayer.src = p.localVideo;
    localVideoPlayer.load();
  }else{
    localVideoPlayer.pause();
    localVideoPlayer.removeAttribute('src');
    localVideoPlayer.load();
    localVideoPlayer.style.display = 'none';

    frame.style.display = 'block';
    frame.src = drivePreview;
  }

  videoExternalLink.href = driveView;
  modalTitle.textContent = p.title;
  modalCategory.textContent = p.category.toUpperCase();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeModal(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';

  localVideoPlayer.pause();

  if(clearVideoTimer) clearTimeout(clearVideoTimer);
  clearVideoTimer = setTimeout(()=>{
    if(!modal.classList.contains('open')){
      frame.src='about:blank';
      localVideoPlayer.removeAttribute('src');
      localVideoPlayer.load();
    }
    clearVideoTimer = null;
  }, 350);
}

document.querySelectorAll('[data-close-modal]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeModal();});

document.querySelectorAll('[data-video]').forEach(el=>el.addEventListener('click',()=>openVideo({
  id:el.dataset.video,
  title:el.dataset.title,
  category:'Pixar 3D'
})));

/* ---------- Smooth filter transitions ---------- */
filters.forEach(btn=>btn.addEventListener('click',()=>{
  filters.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter = btn.dataset.filter;
  const cards = [...document.querySelectorAll('.project-card')];

  cards.forEach((card, index)=>{
    const shouldShow = filter === 'all' || card.dataset.filter === filter;

    if(!shouldShow && !card.classList.contains('hidden')){
      card.classList.add('filter-leave');
      setTimeout(()=>{
        card.classList.add('hidden');
        card.classList.remove('filter-leave','card-visible');
      }, 180);
    }

    if(shouldShow){
      card.classList.remove('hidden','filter-leave');
      card.classList.add('filter-enter');
      requestAnimationFrame(()=>{
        setTimeout(()=>{
          card.classList.add('card-visible');
          card.classList.remove('filter-enter');
        }, Math.min(index * 20, 220));
      });
    }
  });
}));

/* ---------- Scroll reveal (safe fallback) ---------- */
document.querySelectorAll('.reveal-section').forEach(section=>{
  section.classList.add('is-visible');
});

/* ---------- Cards are visible by default ---------- */
function observeCards(){
  document.querySelectorAll('.project-card,.service-card').forEach((card,index)=>{
    card.classList.add('card-visible');
    card.style.transitionDelay = `${Math.min(index * 20, 180)}ms`;
  });
}

/* ---------- Thumbnail load animation ---------- */
document.querySelectorAll('.featured-thumb').forEach(img=>{
  if(img.complete && img.naturalWidth > 0) img.classList.add('loaded');
  else img.addEventListener('load',()=>img.classList.add('loaded'),{once:true});
});

/* ---------- Cursor glow ---------- */
if(cursorGlow && window.matchMedia('(pointer:fine)').matches){
  window.addEventListener('pointermove',(e)=>{
    document.body.style.setProperty('--mx',`${e.clientX}px`);
    document.body.style.setProperty('--my',`${e.clientY}px`);
  },{passive:true});

  window.addEventListener('mouseleave',()=>cursorGlow.style.opacity='0');
  window.addEventListener('mouseenter',()=>cursorGlow.style.opacity='.11');
}

/* ---------- Soft parallax on hero visual ---------- */
const heroVisual = document.querySelector('.hero-visual');
if(heroVisual && window.matchMedia('(pointer:fine)').matches){
  heroVisual.addEventListener('pointermove',(e)=>{
    const r = heroVisual.getBoundingClientRect();
    const x = (e.clientX-r.left)/r.width-.5;
    const y = (e.clientY-r.top)/r.height-.5;
    heroVisual.style.setProperty('--rx',`${(-y*2.4).toFixed(2)}deg`);
    heroVisual.style.setProperty('--ry',`${(x*3.2).toFixed(2)}deg`);
    const stack = heroVisual.querySelector('.video-stack');
    if(stack) stack.style.rotate = `var(--rx) var(--ry)`;
  });
  heroVisual.addEventListener('pointerleave',()=>{
    const stack = heroVisual.querySelector('.video-stack');
    if(stack) stack.style.rotate = '';
  });
}



/* =========================
   FEATURED PROJECT SWITCHER
   ========================= */
const featuredProjects = window.FEATURED_PROJECTS || [];
let featuredIndex = 0;
let featuredTimer = null;

const featuredCard = document.getElementById('featuredCard');
const featuredImage = document.getElementById('featuredImage');
const featuredTitle = document.getElementById('featuredTitle');
const featuredCategory = document.getElementById('featuredCategory');
const featuredDesc = document.getElementById('featuredDesc');
const featuredCounter = document.getElementById('featuredCounter');
const featuredPicker = document.getElementById('featuredPicker');
const featuredPrev = document.querySelector('.featured-prev');
const featuredNext = document.querySelector('.featured-next');

function renderFeaturedPicker(){
  if(!featuredPicker) return;
  featuredPicker.innerHTML = featuredProjects.map((project,index)=>`
    <button class="featured-picker-button ${index===featuredIndex?'active':''}" type="button" data-featured-index="${index}" aria-label="Show ${project.title}">
      <img src="${project.thumb}" alt="${project.title} thumbnail">
    </button>
  `).join('');

  featuredPicker.querySelectorAll('[data-featured-index]').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      setFeatured(Number(btn.dataset.featuredIndex),true);
    });
  });
}

function updateFeaturedContent(){
  if(!featuredProjects.length || !featuredCard) return;
  const project = featuredProjects[featuredIndex];

  featuredImage.src = project.thumb;
  featuredImage.alt = `${project.title} thumbnail`;
  featuredTitle.textContent = project.title;
  featuredCategory.textContent = project.category;
  featuredDesc.textContent = project.desc || '';
  featuredCounter.textContent =
    `${String(featuredIndex+1).padStart(2,'0')} / ${String(featuredProjects.length).padStart(2,'0')}`;

  featuredCard.dataset.id = project.id;
  featuredCard.dataset.title = project.title;
  featuredCard.dataset.category = project.category;

  renderFeaturedPicker();
}

function setFeatured(index,userAction=false){
  if(!featuredProjects.length) return;
  featuredIndex = (index + featuredProjects.length) % featuredProjects.length;
  featuredCard?.classList.add('featured-changing');

  setTimeout(()=>{
    updateFeaturedContent();
    requestAnimationFrame(()=>featuredCard?.classList.remove('featured-changing'));
  },160);

  if(userAction) restartFeaturedTimer();
}

function restartFeaturedTimer(){
  if(featuredTimer) clearInterval(featuredTimer);
  if(featuredProjects.length > 1){
    featuredTimer = setInterval(()=>setFeatured(featuredIndex+1,false),8000);
  }
}

featuredPrev?.addEventListener('click',(e)=>{
  e.stopPropagation();
  setFeatured(featuredIndex-1,true);
});
featuredNext?.addEventListener('click',(e)=>{
  e.stopPropagation();
  setFeatured(featuredIndex+1,true);
});
featuredCard?.addEventListener('click',()=>{
  const project = featuredProjects[featuredIndex];
  if(project) openVideo(project);
});

updateFeaturedContent();
restartFeaturedTimer();

/* =========================
   CONTACT / HIRE MODAL
   ========================= */

/*
  Fill these in when the exact handles/numbers are provided.
  Leave blank to keep that contact method hidden publicly.
*/
const CONTACT_DETAILS = {
  email: 'joyculanculanjr@gmail.com',
  discord: 'joyculanculan21',
  telegram: '@joyculanculan',
  whatsapp: '+63 951 836 4107'
};

const contactModal = document.getElementById('contactModal');
const contactForm = document.getElementById('contactForm');
const contactFormStatus = document.getElementById('contactFormStatus');


function openContactModal(e){
  if(e) e.preventDefault();
  contactModal?.classList.add('open');
  contactModal?.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  setTimeout(()=>contactForm?.querySelector('input[name="name"]')?.focus(),250);
}

function closeContactModal(){
  contactModal?.classList.remove('open');
  contactModal?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.querySelectorAll('[data-contact-open]').forEach(el=>{
  el.addEventListener('click',openContactModal);
});
document.querySelectorAll('[data-contact-close]').forEach(el=>{
  el.addEventListener('click',closeContactModal);
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && contactModal?.classList.contains('open')) closeContactModal();
});

contactForm?.addEventListener('submit',(e)=>{
  const formData = new FormData(contactForm);

  // Honeypot: do not submit obvious bot fills.
  if(formData.get('_honey')){
    e.preventDefault();
    return;
  }

  const visitorEmail = String(formData.get('email') || '').trim();
  const projectType = String(formData.get('project_type') || 'Project');

  const replyTo = document.getElementById('formReplyTo');
  const subject = document.getElementById('formSubject');
  const nextUrl = document.getElementById('formNextUrl');
  const pageUrl = document.getElementById('formPageUrl');

  if(replyTo) replyTo.value = visitorEmail;
  if(subject) subject.value = `New Portfolio Inquiry — ${projectType}`;

  const thanksUrl = new URL('thank-you.html', window.location.href).href;
  if(nextUrl) nextUrl.value = thanksUrl;
  if(pageUrl) pageUrl.value = window.location.href;

  contactFormStatus.className = '';
  contactFormStatus.textContent = 'Sending securely…';

  const submitButton = contactForm.querySelector('button[type="submit"]');
  if(submitButton) submitButton.disabled = true;

  // IMPORTANT: do not preventDefault().
  // The browser now sends the form directly to FormSubmit.
});





/* ---------- Discord copy helper ---------- */
document.querySelectorAll('[data-copy-discord]').forEach(button=>{
  button.addEventListener('click',async()=>{
    const handle = button.dataset.copyDiscord;

    try{
      await navigator.clipboard.writeText(handle);
      const original = button.innerHTML;
      if(button.classList.contains('contact-link')){
        button.querySelector('strong').textContent = 'Copied: ' + handle;
      }else{
        button.textContent = 'Discord copied ✓';
      }

      setTimeout(()=>{
        if(button.classList.contains('contact-link')){
          button.querySelector('strong').textContent = handle;
        }else{
          button.textContent = 'Discord · ' + handle;
        }
      },1600);
    }catch{
      window.prompt('Copy my Discord handle:',handle);
    }
  });
});

/* =========================
   ABOUT ME MODAL
   ========================= */
const aboutModal = document.getElementById('aboutModal');

function openAboutModal(e){
  if(e) e.preventDefault();
  aboutModal?.classList.add('open');
  aboutModal?.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
}

function closeAboutModal(){
  aboutModal?.classList.remove('open');
  aboutModal?.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
}

document.querySelectorAll('[data-about-open]').forEach(el=>{
  el.addEventListener('click',openAboutModal);
});

document.querySelectorAll('[data-about-close]').forEach(el=>{
  el.addEventListener('click',closeAboutModal);
});

document.querySelectorAll('[data-about-contact]').forEach(el=>{
  el.addEventListener('click',()=>{
    closeAboutModal();
    setTimeout(()=>openContactModal(),160);
  });
});

document.addEventListener('keydown',e=>{
  if(e.key==='Escape' && aboutModal?.classList.contains('open')){
    closeAboutModal();
  }
});





renderProjects();
