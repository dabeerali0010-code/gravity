/* === LOCATION DATA === */
const locations = [
    { city: "hyderabad", title: "Autobhan Road — Pone7 Chowk", size: "80' × 12'", price: "650,000", status: "available", img: "images/hyd-autobhan-road.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "AutoBhan Road — Rooftop EXPO Store", size: "75' × 30'", price: "750,000", status: "available", img: "images/hyd-autobhan-rooftop.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Court Road — SP Chowk", size: "50' × 10'", price: "450,000", status: "available", img: "images/hyd-court-road.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Shahbaz Building — Rani Bagh", size: "50' × 15'", price: "450,000", status: "available", img: "images/hyd-shahbaz-ranibagh.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Jamshoro Road — Opp. Gulistan-e-Sajjad", size: "45' × 15'", price: "400,000", status: "available", img: "images/hyd-jamshoro-road.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Naseem Nagar Chowk — Qasimabad", size: "60' × 20'", price: "400,000", status: "available", img: "images/hyd-naseem-nagar.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Chandni Chowk — CANNT / Saddar", size: "40' × 30'", price: "500,000", status: "available", img: "images/hyd-chandni-chowk.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Tilak Incline — Near Nazerath College", size: "25' × 25'", price: "300,000", status: "available", img: "images/hyd-tilak-incline.jpg", type: "Flex Billboard" },
    { city: "hyderabad", title: "Giddu Chowk — Agriculture Complex", size: "60' × 20'", price: "450,000", status: "available", img: "images/hyd-giddu-chowk.jpg", type: "Flex Billboard" },
    { city: "sukkur", title: "Dolphin Chowk — SMD", size: "30' × 12'", price: "400,000", status: "available", img: "images/sukkur-dolphin.jpg", type: "Flex Billboard" },
    { city: "sukkur", title: "Gymkhana Chowk", size: "30' × 50'", price: "550,000", status: "available", img: "images/sukkur-gymkhana.jpg", type: "Flex Billboard" },
    { city: "nawabshah", title: "Nawabshah Bridge", size: "25' × 30'", price: "250,000", status: "available", img: "images/nawabshah-bridge.jpg", type: "Flex Billboard" },
    { city: "larkana", title: "VIP Flyover — Chandka Hospital", size: "60' × 20'", price: "400,000", status: "available", img: "images/larkana-vip.jpg", type: "Flex Billboard" },
    { city: "mirpurkhas", title: "4 Minar Chowk — Baldia Chowk", size: "12' × 30'", price: "100,000", status: "available", img: "images/mirpurkhas-4minar.jpg", type: "Flex Billboard" },
    { city: "shikarpur", title: "Shikarpur Main Site", size: "40' × 20'", price: "200,000", status: "available", img: "images/shikarpur.jpg", type: "Flex Billboard" },
];

/* === RENDER LOCATIONS === */
function renderLocations(filter) {
    const grid = document.getElementById('locationsGrid');
    grid.innerHTML = '';
    const filtered = filter === 'all' ? locations : locations.filter(l => l.city === filter);
    filtered.forEach((loc, i) => {
        const card = document.createElement('div');
        card.className = 'location-card reveal';
        card.style.transitionDelay = `${i * 0.05}s`;
        card.innerHTML = `
            <div class="loc-img">
                <img src="${loc.img}" alt="${loc.title}" loading="lazy">
                <span class="loc-badge ${loc.status}">${loc.status}</span>
            </div>
            <div class="loc-info">
                <div class="loc-city">${loc.city}</div>
                <div class="loc-title">${loc.title}</div>
                <div class="loc-details">
                    <span>${loc.size}</span>
                    <span>${loc.type}</span>
                </div>
                <div class="loc-price">PKR ${Number(loc.price).toLocaleString()} <small>/month</small></div>
            </div>
        `;
        grid.appendChild(card);
    });
    requestAnimationFrame(() => {
        document.querySelectorAll('.location-card.reveal').forEach(el => el.classList.add('visible'));
    });
}

/* === FILTER BUTTONS === */
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderLocations(btn.dataset.filter);
    });
});

/* === COUNTER ANIMATION === */
function animateCounters() {
    const nums = document.querySelectorAll('.stat-number');
    nums.forEach(num => {
        const target = parseInt(num.dataset.target);
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            num.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(update);
            else num.textContent = target;
        }
        requestAnimationFrame(update);
    });
}

/* === SCROLL OBSERVER === */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (entry.target.closest('.stats-section')) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Also observe stat cards
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
    const statsObs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            statsObs.disconnect();
        }
    }, { threshold: 0.3 });
    statsObs.observe(statsSection);
}

/* === NAVBAR SCROLL === */
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* === HAMBURGER MENU === */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
    });
});

/* === CONTACT FORM === */
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    success.classList.add('show');
    setTimeout(() => {
        success.classList.remove('show');
        e.target.reset();
    }, 4000);
});

/* === INIT === */
renderLocations('all');

// Add reveal class to scrollable elements
document.querySelectorAll('.stat-card, .city-card, .section-title, .section-sub').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});
