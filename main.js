// ==================== NAVBAR SCROLL ====================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNavbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// ==================== GALLERY SYSTEM ====================

const BASE = '../Images';

const GALLERY_DATA = {
    buildings: {
        label: 'Buildings',
        cover: `${BASE}/buildings/build1.png`,
        subfolders: [
            {
                label: 'Home Building',
                cover: `${BASE}/buildings/build1.png`,
                photos: Array.from({length: 10}, (_, i) => ({
                    src: `${BASE}/buildings/build${i + 1}.png`,
                    title: `Home Building`,
                    location: 'KwaZulu-Natal'
                }))
            },
            {
                label: 'Double Storey Build',
                cover: `${BASE}/buildings/build11.png`,
                photos: Array.from({length: 13}, (_, i) => ({
                    src: `${BASE}/buildings/build${i + 11}.png`,
                    title: `Double Storey Build`,
                    location: 'KwaZulu-Natal'
                }))
            }
        ]
    },
    fencing: {
        label: 'Fencing',
        cover: `${BASE}/fencing/fence1.png`,
        photos: Array.from({length: 20}, (_, i) => ({
            src: `${BASE}/fencing/fence${i + 1}.png`,
            title: 'Fencing',
            location: 'KwaZulu-Natal'
        }))
    },
    interior: {
        label: 'Interior',
        cover: `${BASE}/interior/int1.png`,
        photos: Array.from({length: 15}, (_, i) => ({
            src: `${BASE}/interior/int${i + 1}.png`,
            title: 'Interior Design',
            location: 'KwaZulu-Natal'
        }))
    },
    landscaping: {
        label: 'Landscaping',
        cover: `${BASE}/landscaping/land1.png`,
        photos: Array.from({length: 14}, (_, i) => ({
            src: `${BASE}/landscaping/land${i + 1}.png`,
            title: 'Landscaping',
            location: 'KwaZulu-Natal'
        }))
    },
    roofing: {
        label: 'Roofing',
        cover: `${BASE}/roofing/roof1.png`,
        photos: Array.from({length: 19}, (_, i) => ({
            src: `${BASE}/roofing/roof${i + 1}.png`,
            title: 'Roofing',
            location: 'KwaZulu-Natal'
        }))
    }
};

// State
let currentView = 'all';
let currentPhotos = [];
let currentPhotoIndex = 0;

const grid = document.getElementById('galleryGrid');
const backBtn = document.getElementById('backBtn');
const backButton = document.getElementById('backButton');
const sectionTitle = document.getElementById('sectionTitle');
const filterBtns = document.querySelectorAll('.filter-btn');
const breadcrumb = document.getElementById('breadcrumbCurrent');

// ---- RENDER ALL CATEGORIES ----
function renderAllCategories() {
    currentView = 'all';
    if (backBtn) backBtn.style.display = 'none';
    if (sectionTitle) sectionTitle.style.display = 'none';
    if (breadcrumb) breadcrumb.textContent = 'Gallery';
    setActiveFilter('all');

    let html = '';
    Object.keys(GALLERY_DATA).forEach(key => {
        const cat = GALLERY_DATA[key];
        html += `
        <div class="col-sm-6 col-lg-4">
            <div class="gallery-card category-card" data-category="${key}">
                <img src="${cat.cover}" alt="${cat.label}" class="gallery-img"
                    onerror="this.style.background='#1a1a2e'; this.style.height='260px';">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h6>${cat.label}</h6>
                        <p>Click to explore</p>
                    </div>
                    <div class="gallery-zoom"><i class="bi bi-folder2-open"></i></div>
                </div>
            </div>
        </div>`;
    });
    grid.innerHTML = html;

    // Attach click events to category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.dataset.category;
            openCategory(key);
        });
    });
}

// ---- OPEN A CATEGORY ----
function openCategory(key) {
    const cat = GALLERY_DATA[key];
    currentView = key;
    setActiveFilter(key);
    if (backBtn) backBtn.style.display = 'block';
    if (breadcrumb) breadcrumb.textContent = cat.label;

    // If category has subfolders (buildings)
    if (cat.subfolders) {
        renderSubfolders(cat, key);
    } else {
        renderPhotos(cat.photos, cat.label);
    }
}

// ---- RENDER SUBFOLDERS ----
function renderSubfolders(cat, key) {
    if (sectionTitle) sectionTitle.style.display = 'none';

    let html = '';
    cat.subfolders.forEach((sub, idx) => {
        html += `
        <div class="col-sm-6 col-lg-4">
            <div class="gallery-card category-card" data-subfolder="${idx}" data-parent="${key}">
                <img src="${sub.cover}" alt="${sub.label}" class="gallery-img"
                    onerror="this.style.background='#1a1a2e';">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h6>${sub.label}</h6>
                        <p>${sub.photos.length} photos</p>
                    </div>
                    <div class="gallery-zoom"><i class="bi bi-folder2-open"></i></div>
                </div>
            </div>
        </div>`;
    });
    grid.innerHTML = html;

    document.querySelectorAll('[data-subfolder]').forEach(card => {
        card.addEventListener('click', () => {
            const idx = card.dataset.subfolder;
            const parentKey = card.dataset.parent;
            const sub = GALLERY_DATA[parentKey].subfolders[idx];
            renderPhotos(sub.photos, sub.label);
            if (breadcrumb) breadcrumb.textContent = sub.label;
        });
    });
}

// ---- RENDER PHOTOS ----
function renderPhotos(photos, label) {
    currentPhotos = photos;
    if (sectionTitle) {
        sectionTitle.style.display = 'block';
        sectionTitle.querySelector('.gallery-section-heading').textContent = label;
    }

    let html = '';
    photos.forEach((photo, idx) => {
        html += `
        <div class="col-sm-6 col-lg-4">
            <div class="gallery-card photo-card" data-index="${idx}">
                <img src="${photo.src}" alt="${photo.title}" class="gallery-img"
                    onerror="this.parentElement.style.display='none';">
                <div class="gallery-overlay">
                    <div class="gallery-info">
                        <h6>${photo.title}</h6>
                        <p>${photo.location}</p>
                    </div>
                    <div class="gallery-zoom"><i class="bi bi-zoom-in"></i></div>
                </div>
            </div>
        </div>`;
    });
    grid.innerHTML = html;

    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', () => {
            currentPhotoIndex = parseInt(card.dataset.index);
            openLightbox(currentPhotoIndex);
        });
    });
}

// ---- FILTER BUTTONS ----
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view === 'all') {
            renderAllCategories();
        } else {
            openCategory(view);
        }
    });
});

// ---- BACK BUTTON ----
if (backButton) {
    backButton.addEventListener('click', () => {
        renderAllCategories();
    });
}

// ---- SET ACTIVE FILTER ----
function setActiveFilter(view) {
    filterBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === view) {
            btn.classList.add('active');
        }
    });
}

// ---- LIGHTBOX ----
function openLightbox(index) {
    const photo = currentPhotos[index];
    document.getElementById('lightboxImg').src = photo.src;
    document.getElementById('lightboxTitle').textContent = photo.title;
    document.getElementById('lightboxLocation').textContent = photo.location;
    document.getElementById('lightboxCounter').textContent = `${index + 1} / ${currentPhotos.length}`;
    new bootstrap.Modal(document.getElementById('lightboxModal')).show();
}

document.getElementById('lightboxNext')?.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentPhotos.length;
    const photo = currentPhotos[currentPhotoIndex];
    document.getElementById('lightboxImg').src = photo.src;
    document.getElementById('lightboxTitle').textContent = photo.title;
    document.getElementById('lightboxCounter').textContent = `${currentPhotoIndex + 1} / ${currentPhotos.length}`;
});

document.getElementById('lightboxPrev')?.addEventListener('click', () => {
    currentPhotoIndex = (currentPhotoIndex - 1 + currentPhotos.length) % currentPhotos.length;
    const photo = currentPhotos[currentPhotoIndex];
    document.getElementById('lightboxImg').src = photo.src;
    document.getElementById('lightboxTitle').textContent = photo.title;
    document.getElementById('lightboxCounter').textContent = `${currentPhotoIndex + 1} / ${currentPhotos.length}`;
});

// ---- CONTACT FORMS ----
const forms = document.querySelectorAll('#contactForm, #quoteForm');
const successMsg = document.getElementById('successMessage');

forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = new FormData(form);
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                form.reset();
                if (successMsg) {
                    successMsg.style.display = 'flex';
                    setTimeout(() => successMsg.style.display = 'none', 4000);
                }
            }
        } catch (error) {
            console.error('Form error:', error);
        }
    });
});

// ---- INIT ----
if (document.getElementById('galleryGrid')) {
    renderAllCategories();
}