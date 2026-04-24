const toc = document.querySelector('.toc');
if (toc) {
  const headings = document.querySelectorAll('.post-content h2, .post-content h3');
  const tocLinks = toc.querySelectorAll('a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-100px 0px -80% 0px' });

  headings.forEach(h => observer.observe(h));
}
