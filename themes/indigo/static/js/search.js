const searchBtn = document.getElementById('search-btn');
const searchModal = document.getElementById('search-modal');
const searchClose = document.getElementById('search-close');
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');

let fuse;
let searchIndex;

async function loadSearch() {
  if (!searchIndex) {
    const res = await fetch('/search.json');
    searchIndex = await res.json();
    const Fuse = (await import('https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.mjs')).default;
    fuse = new Fuse(searchIndex, {
      keys: ['title', 'content', 'tags'],
      threshold: 0.3,
      includeScore: true
    });
  }
}

searchBtn?.addEventListener('click', async () => {
  searchModal.classList.add('active');
  searchInput.focus();
  await loadSearch();
});

searchClose?.addEventListener('click', () => {
  searchModal.classList.remove('active');
  searchInput.value = '';
  searchResults.innerHTML = '';
});

searchModal?.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    searchModal.classList.remove('active');
  }
});

searchInput?.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  if (!query || !fuse) {
    searchResults.innerHTML = '';
    return;
  }

  const results = fuse.search(query).slice(0, 10);

  if (results.length === 0) {
    searchResults.innerHTML = '<p style="color:var(--text-secondary)">无结果</p>';
    return;
  }

  searchResults.innerHTML = results.map(r => `
    <a href="${r.item.permalink}" class="search-item">
      <h3>${r.item.title}</h3>
      <p>${r.item.content.slice(0, 100)}...</p>
      <div style="margin-top:4px;">
        ${r.item.tags?.map(t => `<span class="tag">#${t}</span>`).join(' ') || ''}
      </div>
    </a>
  `).join('');
});
