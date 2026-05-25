// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        galleryItems.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Gallery lightbox
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const img = item.querySelector('.gallery-img');
        const title = item.querySelector('.gallery-info h6');
        const location = item.querySelector('.gallery-info p');

        if (img) {
            document.getElementById('lightboxImg').src = img.src;
            document.getElementById('lightboxTitle').textContent = title ? title.textContent : '';
            document.getElementById('lightboxLocation').textContent = location ? location.textContent : '';
            new bootstrap.Modal(document.getElementById('lightboxModal')).show();
        }
    });
});