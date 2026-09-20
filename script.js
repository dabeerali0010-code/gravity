/* =========================================================
   Gravity Media Services — script v3
   Vanilla JS + optional Lenis / GSAP enhancement
   ========================================================= */
(function () {
    'use strict';

    var root = document.documentElement;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hasIO = 'IntersectionObserver' in window;

    /* ================= LOCATION DATA ================= */
    var locations = [
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
        { city: "shikarpur", title: "Shikarpur Main Site", size: "40' × 20'", price: "200,000", status: "available", img: "images/shikarpur.jpg", type: "Flex Billboard" }
    ];

    var cityNames = {
        hyderabad: 'Hyderabad',
        sukkur: 'Sukkur',
        mirpurkhas: 'Mirpurkhas',
        larkana: 'Larkana',
        nawabshah: 'Nawabshah',
        shikarpur: 'Shikarpur'
    };

    /* ================= REVEAL ================= */
    function observe(el) {
        if (!hasIO) { el.classList.add('is-in'); return; }
        revealObserver.observe(el);
    }

    var revealObserver = null;
    if (hasIO) {
        revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    }

    function observeAll(scope) {
        (scope || document).querySelectorAll('.reveal:not(.is-in)').forEach(observe);
    }

    /* ================= LOCATIONS RENDER ================= */
    var grid = document.getElementById('locationsGrid');
    var filterCount = document.getElementById('filterCount');

    function esc(str) {
        return String(str).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    function renderLocations(filter) {
        if (!grid) return;
        var filtered = filter === 'all' ? locations.slice() : locations.filter(function (l) { return l.city === filter; });

        grid.innerHTML = filtered.map(function (loc) {
            return '' +
                '<article class="location-card reveal">' +
                    '<div class="loc-img">' +
                        '<img src="' + esc(loc.img) + '" alt="' + esc(loc.title + ', ' + cityNames[loc.city]) + '" loading="lazy">' +
                        '<span class="loc-badge ' + esc(loc.status) + '">' + esc(loc.status) + '</span>' +
                    '</div>' +
                    '<div class="loc-info">' +
                        '<span class="loc-city">' + esc(cityNames[loc.city] || loc.city) + '</span>' +
                        '<h3 class="loc-title">' + esc(loc.title) + '</h3>' +
                        '<div class="loc-specs">' +
                            '<div><span>Size</span><b>' + esc(loc.size) + '</b></div>' +
                            '<div><span>Type</span><b>' + esc(loc.type) + '</b></div>' +
                        '</div>' +
                        '<div class="loc-foot">' +
                            '<div class="loc-price">PKR ' + Number(loc.price).toLocaleString() + ' <small>/month</small></div>' +
                            '<a class="btn btn-ghost btn-sm" href="#contact">Enquire</a>' +
                        '</div>' +
                    '</div>' +
                '</article>';
        }).join('');

        var cards = grid.querySelectorAll('.location-card');
        cards.forEach(function (card, i) {
            card.style.transitionDelay = Math.min(i * 0.045, 0.35) + 's';
            observe(card);
        });

        if (filterCount) {
            if (filter === 'all') {
                filterCount.textContent = 'Showing all ' + locations.length + ' sites across ' + Object.keys(cityNames).length + ' cities';
            } else {
                filterCount.textContent = 'Showing ' + filtered.length + ' site' + (filtered.length === 1 ? '' : 's') + ' in ' + (cityNames[filter] || filter);
            }
        }
    }

    function setFilter(filter) {
        document.querySelectorAll('.filter-btn').forEach(function (b) {
            b.classList.toggle('is-active', b.dataset.filter === filter);
        });
        renderLocations(filter);
    }

    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () { setFilter(btn.dataset.filter); });
    });

    document.querySelectorAll('[data-goto-city]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            setFilter(btn.dataset.gotoCity);
            scrollToEl(document.getElementById('locations'));
        });
    });

    renderLocations('all');
    observeAll(document);

    /* ================= COUNTERS ================= */
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(function (num) {
            var target = parseInt(num.dataset.target, 10);
            if (isNaN(target)) return;
            if (reduceMotion) { num.textContent = target; return; }
            var duration = 1600, start = null;
            function step(now) {
                if (start === null) start = now;
                var p = Math.min((now - start) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                num.textContent = Math.round(eased * target);
                if (p < 1) requestAnimationFrame(step);
                else num.textContent = target;
            }
            num.textContent = '0';
            requestAnimationFrame(step);
        });
    }

    var statsSection = document.querySelector('.stats-section');
    if (statsSection && hasIO) {
        var statsObs = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
        }, { threshold: 0.35 });
        statsObs.observe(statsSection);
    }

    /* ================= NAV ================= */
    var navbar = document.getElementById('navbar');
    var progress = document.getElementById('navProgress');
    var toTop = document.getElementById('toTop');
    var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
    var navAnchors = Array.prototype.slice.call(document.querySelectorAll('.nav-links a:not(.btn)'));

    function onScroll() {
        var y = window.scrollY || window.pageYOffset;
        if (navbar) navbar.classList.toggle('is-scrolled', y > 24);
        if (toTop) toTop.classList.toggle('is-visible', y > 700);

        var max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress) progress.style.width = (max > 0 ? Math.min(y / max, 1) * 100 : 0) + '%';

        var current = '';
        sections.forEach(function (sec) {
            if (sec.offsetTop - 140 <= y) current = sec.id;
        });
        navAnchors.forEach(function (a) {
            a.classList.toggle('is-current', a.getAttribute('href') === '#' + current);
        });
    }

    var ticking = false;
    window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () { onScroll(); ticking = false; });
    }, { passive: true });

    /* ================= SMOOTH SCROLL ================= */
    var lenis = null;

    function scrollToEl(el) {
        if (!el) return;
        if (lenis) lenis.scrollTo(el, { offset: -76, duration: 1.1 });
        else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
        a.addEventListener('click', function (e) {
            var id = a.getAttribute('href');
            if (!id || id === '#') return;
            var el = document.querySelector(id);
            if (!el) return;
            e.preventDefault();
            scrollToEl(el);
            closeMenu();
            if (history.replaceState) history.replaceState(null, '', id);
        });
    });

    /* ================= MOBILE MENU ================= */
    var hamburger = document.getElementById('hamburger');
    var navLinks = document.getElementById('navLinks');

    function closeMenu() {
        if (!hamburger || !navLinks) return;
        hamburger.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var open = !navLinks.classList.contains('is-open');
            hamburger.classList.toggle('is-open', open);
            navLinks.classList.toggle('is-open', open);
            hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    if (toTop) {
        toTop.addEventListener('click', function () {
            if (lenis) lenis.scrollTo(0, { duration: 1.2 });
            else window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    onScroll();

    /* ================= LIGHTBOX ================= */
    (function () {
        var lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        var lightboxImg = document.getElementById('lightboxImg');
        var lightboxCaption = document.getElementById('lightboxCaption');
        var closeBtn = lightbox.querySelector('.lightbox-close');
        var prevBtn = lightbox.querySelector('.lightbox-prev');
        var nextBtn = lightbox.querySelector('.lightbox-next');
        var overlay = lightbox.querySelector('.lightbox-overlay');
        var list = [];
        var index = 0;
        var lastFocus = null;

        function collect() {
            list = [];
            document.querySelectorAll('.city-img-wrap').forEach(function (wrap) {
                var img = wrap.querySelector('img');
                var card = wrap.closest('.city-card');
                var title = card && card.querySelector('h3') ? card.querySelector('h3').textContent : img.alt;
                list.push({ src: img.src, alt: title.trim() });
            });
            document.querySelectorAll('.loc-img').forEach(function (wrap) {
                var img = wrap.querySelector('img');
                var t = wrap.parentElement.querySelector('.loc-title');
                list.push({ src: img.src, alt: (t ? t.textContent : img.alt).trim() });
            });
        }

        function show(i) {
            if (!list.length) return;
            index = (i + list.length) % list.length;
            lightboxImg.src = list[index].src;
            lightboxImg.alt = list[index].alt;
            lightboxCaption.textContent = list[index].alt;
        }

        function open(i) {
            collect();
            show(i);
            lastFocus = document.activeElement;
            lightbox.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }

        function close() {
            lightbox.classList.remove('is-open');
            document.body.style.overflow = '';
            if (lastFocus && lastFocus.focus) lastFocus.focus();
        }

        document.addEventListener('click', function (e) {
            var cityWrap = e.target.closest('.city-img-wrap');
            if (cityWrap) {
                collect();
                open(Array.prototype.indexOf.call(document.querySelectorAll('.city-img-wrap'), cityWrap));
                return;
            }
            var locWrap = e.target.closest('.loc-img');
            if (locWrap) {
                collect();
                open(document.querySelectorAll('.city-img-wrap').length +
                     Array.prototype.indexOf.call(document.querySelectorAll('.loc-img'), locWrap));
            }
        });

        closeBtn.addEventListener('click', close);
        if (overlay) overlay.addEventListener('click', close);
        prevBtn.addEventListener('click', function () { show(index - 1); });
        nextBtn.addEventListener('click', function () { show(index + 1); });

        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('is-open')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(index - 1);
            if (e.key === 'ArrowRight') show(index + 1);
        });
    })();

    /* ================= PROGRESSIVE ENHANCEMENT ================= */
    window.addEventListener('load', function () {
        var canEnhance = !reduceMotion;

        if (canEnhance && typeof window.Lenis === 'function') {
            try {
                lenis = new window.Lenis({ duration: 1.05, smoothWheel: true });
                if (window.gsap && window.ScrollTrigger) {
                    lenis.on('scroll', window.ScrollTrigger.update);
                    window.gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
                    window.gsap.ticker.lagSmoothing(0);
                } else {
                    (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
                }
            } catch (err) { lenis = null; }
        }

        if (canEnhance && window.gsap && window.ScrollTrigger) {
            try {
                var gsap = window.gsap;
                gsap.registerPlugin(window.ScrollTrigger);
                document.querySelectorAll('[data-parallax]').forEach(function (el) {
                    var amount = parseFloat(el.dataset.parallax) || 0.06;
                    gsap.to(el, {
                        yPercent: amount * 100 * -1,
                        ease: 'none',
                        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
                    });
                });
            } catch (err) { /* parallax is optional */ }
        }
    });
})();
