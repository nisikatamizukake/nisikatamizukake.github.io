/* ============================================================
   西方水かけ祭り 公式HP — main.js
   ============================================================ */

/* ---------- お知らせ描画（データは js/news-data.js） ---------- */
(function () {
  const list   = document.getElementById('newsList');
  const toggle = document.getElementById('newsToggle');
  if (!list || typeof NEWS_ITEMS === 'undefined') return;

  const BADGE_CLASS = { '祭礼': 'badge-event', 'お知らせ': 'badge-info', 'メディア': 'badge-media' };
  const NEW_DAYS    = 30;  // 投稿日からこの日数は NEW を表示
  const SHOW_COUNT  = 5;   // 初期表示件数

  const items = [...NEWS_ITEMS].sort((a, b) => b.date.localeCompare(a.date));
  let expanded = false;

  const render = () => {
    list.innerHTML = '';
    const visible = expanded ? items : items.slice(0, SHOW_COUNT);
    visible.forEach((item) => {
      const a = document.createElement('a');
      a.className = 'news-item';
      a.href = item.url || 'https://www.instagram.com/nisikata_mizukake/';
      a.target = '_blank';
      a.rel = 'noopener';
      a.setAttribute('role', 'listitem');

      const date = document.createElement('span');
      date.className = 'news-date';
      date.textContent = item.date.replaceAll('-', '.');

      const badge = document.createElement('span');
      badge.className = 'news-badge ' + (BADGE_CLASS[item.category] || 'badge-info');
      badge.textContent = item.category || 'お知らせ';

      const title = document.createElement('span');
      title.className = 'news-title';
      const ageDays = (Date.now() - new Date(item.date + 'T00:00:00')) / 86400000;
      if (ageDays >= 0 && ageDays <= NEW_DAYS) {
        const n = document.createElement('span');
        n.className = 'news-new';
        n.textContent = 'NEW';
        title.appendChild(n);
      }
      title.appendChild(document.createTextNode(item.title));

      a.append(date, badge, title);
      list.appendChild(a);
    });

    if (toggle) {
      toggle.hidden = items.length <= SHOW_COUNT;
      toggle.textContent = expanded
        ? '表示を減らす'
        : `すべてのお知らせを見る（全${items.length}件）`;
    }
  };

  if (toggle) {
    toggle.addEventListener('click', () => {
      expanded = !expanded;
      render();
    });
  }
  render();
})();

/* ---------- Navbar: スクロールで背景付与 ---------- */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ---------- Mobile Menu ---------- */
(function () {
  const burger   = document.getElementById('burgerBtn');
  const menu     = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('mobileClose');
  if (!burger || !menu || !closeBtn) return;

  const open = () => {
    menu.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    menu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  burger.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  menu.addEventListener('click', (e) => { if (e.target === menu) close(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

  // グローバルから呼べるようにする
  window.closeMobile = close;
})();

/* ---------- Scroll Reveal (IntersectionObserver) ---------- */
(function () {
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- Active Nav Link on Scroll ---------- */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');
  if (!sections.length || !links.length) return;

  const linkMap = {};
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) linkMap[href.slice(1)] = link;
  });

  const onScroll = () => {
    let current = '';
    sections.forEach((sec) => {
      if (window.scrollY + 100 >= sec.offsetTop) current = sec.id;
    });
    Object.entries(linkMap).forEach(([id, link]) => {
      link.style.color = id === current ? 'var(--gold)' : '';
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- Smooth scroll for anchor links ---------- */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    const offset = document.getElementById('navbar')?.offsetHeight || 70;
    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: 'smooth',
    });
  });
});

/* ---------- 寄付情報モーダル ---------- */
window.showDonateInfo = function (type) {
  const modal   = document.getElementById('donateModal');
  const content = document.getElementById('donateModalContent');
  if (!modal || !content) return;

  const info = {
    bank: `
      <p style="font-size:0.78rem;letter-spacing:0.2em;color:var(--gold);margin-bottom:12px;">銀行振込</p>
      <p style="font-size:0.9rem;color:var(--white);line-height:2;">
        銀行振込によるご支援を<br>受け付けております。
      </p>
      <p style="margin-top:16px;font-size:0.82rem;color:var(--white-sub);line-height:1.9;">
        口座情報はInstagram DM<br>
        <strong style="color:var(--gold);">@nisikata_mizukake</strong><br>
        よりご連絡いただければお伝えします。
      </p>`,
  };

  content.innerHTML = info[type] || '';
  modal.style.display = 'block';
};

window.closeDonateModal = function () {
  const modal = document.getElementById('donateModal');
  if (modal) modal.style.display = 'none';
};

/* ---------- Parallax on hero ---------- */
(function () {
  const hero = document.getElementById('hero');
  const bg   = hero ? hero.querySelector('.hero-bg') : null;
  if (!bg) return;

  const onScroll = () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      bg.style.transform = `translateY(${y * 0.3}px)`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ---------- 年の自動更新 (フッターコピーライト) ---------- */
(function () {
  const year = new Date().getFullYear();
  document.querySelectorAll('.footer-copy').forEach((el) => {
    el.innerHTML = el.innerHTML.replace(/©\s*\d{4}/, `© ${year}`);
  });
})();
