/**
 * components.js
 * Shared Header and Footer for Melbourne Road Dental Clinic
 */

document.addEventListener('DOMContentLoaded', () => {
    injectHeader();
    injectFooter();
    initMobileNav();
});

function injectHeader() {
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const prefix = isHomePage ? '' : 'index.html';

    const headerHTML = `
    <header class="site-header" id="site-header">
        <div class="header-inner">
            <a href="${isHomePage ? '#' : 'index.html'}" class="logo" aria-label="Melbourne Road Dental Clinic home">
                <span class="logo-mark">✦</span>
                <span class="logo-name">Melbourne Road<br><em>Dental Clinic</em></span>
            </a>

            <nav class="nav-links" id="nav-links" role="navigation" aria-label="Main navigation">
                <a href="services.html" class="${window.location.pathname.includes('services.html') ? 'nav-active' : ''}">Services</a>
                <a href="about.html" class="${window.location.pathname.includes('about.html') ? 'nav-active' : ''}">About</a>
                <a href="${prefix}#why-us">Why Us</a>
                <a href="${prefix}#doctor">Our Doctor</a>
                <a href="gallery.html" class="${window.location.pathname.includes('gallery.html') ? 'nav-active' : ''}">Gallery</a>
                <a href="${prefix}#testimonials">Reviews</a>
                <a href="${prefix}#contact" class="nav-cta">Book Now</a>
            </nav>

            <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
                <span></span><span></span><span></span>
            </button>
        </div>
    </header>

    <!-- Mobile Nav Drawer -->
    <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
        <button class="mobile-nav-close" id="mobile-nav-close" aria-label="Close menu">✕</button>
        <nav aria-label="Mobile navigation">
            <a href="services.html" class="mobile-link ${window.location.pathname.includes('services.html') ? 'mobile-link--active' : ''}">Services</a>
            <a href="about.html" class="mobile-link ${window.location.pathname.includes('about.html') ? 'mobile-link--active' : ''}">About</a>
            <a href="${prefix}#why-us" class="mobile-link">Why Us</a>
            <a href="${prefix}#doctor" class="mobile-link">Our Doctor</a>
            <a href="gallery.html" class="mobile-link ${window.location.pathname.includes('gallery.html') ? 'mobile-link--active' : ''}">Gallery</a>
            <a href="${prefix}#testimonials" class="mobile-link">Reviews</a>
            <a href="${prefix}#contact" class="mobile-link mobile-link--cta">Book Now</a>
        </nav>
    </div>
    <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
    `;

    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function injectFooter() {
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
    const prefix = isHomePage ? '' : 'index.html';

    const footerHTML = `
    <footer class="site-footer">
        <div class="footer-inner container">
            <div class="footer-brand">
                <a href="${isHomePage ? '#' : 'index.html'}" class="logo logo--light">
                    <span class="logo-mark">✦</span>
                    <span class="logo-name">Melbourne Road<br><em>Dental Clinic</em></span>
                </a>
                <p class="footer-tagline">Providing premium, patient-focused dental care to Melbourne's western suburbs for over 18 years.</p>
                <div class="footer-social">
                    <a href="#" class="social-link" aria-label="Facebook">FB</a>
                    <a href="#" class="social-link" aria-label="Instagram">IG</a>
                    <a href="#" class="social-link" aria-label="Google">G+</a>
                </div>
            </div>

            <nav class="footer-nav">
                <div class="footer-nav-col">
                    <h4>Practice</h4>
                    <a href="${isHomePage ? '#' : 'index.html'}">Home</a>
                    <a href="about.html">About Us</a>
                    <a href="gallery.html">Smile Gallery</a>
                    <a href="${prefix}#doctor">Our Doctor</a>
                    <a href="${prefix}#contact">Contact</a>
                </div>
                <div class="footer-nav-col">
                    <h4>Services</h4>
                    <a href="services.html#general">General Dentistry</a>
                    <a href="services.html#whitening">Teeth Whitening</a>
                    <a href="services.html#invisalign">Invisalign®</a>
                    <a href="services.html#veneers">Veneers</a>
                </div>
                <div class="footer-nav-col">
                    <h4>Support</h4>
                    <a href="#">Patient Forms</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Use</a>
                    <a href="#">FAQ</a>
                </div>
            </nav>
        </div>

        <div class="footer-bottom">
            <div class="container">
                <p>&copy; 2024 Melbourne Road Dental Clinic. All rights reserved.</p>
                <p>Website by <a href="#">Bharat Forms Hub</a></p>
            </div>
        </div>
    </footer>

    <!-- Back to Top & WhatsApp -->
    <a href="https://wa.me/61390001234" class="whatsapp-fab" target="_blank" aria-label="Chat on WhatsApp">
        <div class="whatsapp-pulse"></div>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-2.32 0-4.591 1.455-4.591 4.726 0 1.258.48 2.217 1.306 2.871l-.547 1.933 2.012-.529c.642.195 1.218.3 1.819.3 2.32 0 4.591-1.455 4.591-4.726 0-3.271-2.271-4.726-4.591-4.726zm-1.89 6.223c-.31-.155-1.071-.529-1.236-.584-.165-.055-.284-.083-.404.097-.12.18-.464.584-.569.702-.105.118-.21.134-.52.016-.31-.155-1.31-.484-2.497-1.541-.923-.823-1.547-1.839-1.727-2.149-.18-.31-.019-.477.135-.631.139-.139.31-.36.465-.541.155-.181.206-.31.31-.516.103-.206.052-.387-.026-.541-.078-.155-.404-.972-.553-1.334-.145-.353-.292-.305-.404-.31-.105-.005-.224-.006-.345-.006-.12 0-.315.045-.479.224-.165.18-.631.616-.631 1.503 0 .887.645 1.745.735 1.866.09.121 1.27 1.938 3.078 2.719.43.186.765.297 1.026.381.431.137.823.117 1.133.071.346-.051 1.071-.438 1.221-.861.15-.423.15-.785.105-.861-.045-.076-.165-.121-.475-.276z"/></svg>
    </a>
    <button class="back-to-top" id="back-to-top" aria-label="Back to top">↑</button>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function initMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const mobileNavClose = document.getElementById('mobile-nav-close');
    const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
    const backToTop = document.getElementById('back-to-top');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            mobileNav.classList.add('is-open');
            mobileNavOverlay.classList.add('is-visible');
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        });
    }

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            mobileNavOverlay.classList.remove('is-visible');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    }

    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', () => {
            mobileNav.classList.remove('is-open');
            mobileNavOverlay.classList.remove('is-visible');
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('is-visible');
        } else {
            backToTop.classList.remove('is-visible');
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
}
