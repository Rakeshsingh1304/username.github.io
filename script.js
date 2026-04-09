/**
 * Melbourne Road Dental Clinic — script.js
 * Handles: sticky header, scroll reveal, mobile nav,
 *          testimonial slider, before/after swipe,
 *          contact form validation, back-to-top, footer year
 */

(function () {
    "use strict";

    /* ── HELPERS ────────────────────────────────────────────────── */
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

    /* ── 1. FOOTER YEAR ─────────────────────────────────────────── */
    const yearEl = $("#footer-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ── 2. STICKY HEADER ────────────────────────────────────────── */
    const header = $("#site-header");

    function onScroll() {
        if (!header) return;
        const scrolled = window.scrollY > 60;
        header.classList.toggle("scrolled", scrolled);

        // Back-to-top
        const btt = $("#back-to-top");
        if (btt) btt.classList.toggle("is-visible", window.scrollY > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on load

    /* ── 3. SMOOTH SCROLL FOR INTERNAL LINKS ────────────────────── */
    document.addEventListener("click", function (e) {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;

        const targetId = link.getAttribute("href").slice(1);
        if (!targetId) return;

        const target = document.getElementById(targetId);
        if (!target) return;

        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

        window.scrollTo({ top, behavior: "smooth" });
    });

    /* ── 4. MOBILE NAV ───────────────────────────────────────────── */
    const hamburger = $("#hamburger");
    const mobileNav = $("#mobile-nav");
    const mobileClose = $("#mobile-nav-close");
    const mobileOverlay = $("#mobile-nav-overlay");
    const mobileLinks = $$(".mobile-link");

    function openMobileNav() {
        mobileNav?.classList.add("is-open");
        mobileOverlay?.classList.add("is-visible");
        hamburger?.classList.add("is-open");
        hamburger?.setAttribute("aria-expanded", "true");
        mobileNav?.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        mobileClose?.focus();
    }

    function closeMobileNav() {
        mobileNav?.classList.remove("is-open");
        mobileOverlay?.classList.remove("is-visible");
        hamburger?.classList.remove("is-open");
        hamburger?.setAttribute("aria-expanded", "false");
        mobileNav?.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        hamburger?.focus();
    }

    hamburger?.addEventListener("click", openMobileNav);
    mobileClose?.addEventListener("click", closeMobileNav);
    mobileOverlay?.addEventListener("click", closeMobileNav);
    mobileLinks.forEach((l) => l.addEventListener("click", closeMobileNav));

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileNav?.classList.contains("is-open")) {
            closeMobileNav();
        }
    });

    /* ── 5. SCROLL REVEAL (Intersection Observer) ────────────────── */
    const revealEls = $$(".reveal");

    if (revealEls.length && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        revealEls.forEach((el) => revealObserver.observe(el));
    } else {
        // Fallback: show everything
        revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    /* ── 6. TESTIMONIAL SLIDER ───────────────────────────────────── */
    const slider = $("#testimonials-slider");
    const cards = slider ? $$(".testimonial-card", slider) : [];
    const dots = $$(".dot", document);
    const prevBtn = $("#slider-prev");
    const nextBtn = $("#slider-next");
    let current = 0;
    let autoplayTimer = null;

    function goToSlide(index) {
        if (!cards.length) return;

        cards[current].classList.remove("active");
        dots[current]?.classList.remove("active");
        dots[current]?.setAttribute("aria-selected", "false");

        current = (index + cards.length) % cards.length;

        cards[current].classList.add("active");
        dots[current]?.classList.add("active");
        dots[current]?.setAttribute("aria-selected", "true");
    }

    function startAutoplay() {
        stopAutoplay();
        autoplayTimer = setInterval(() => goToSlide(current + 1), 6000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    prevBtn?.addEventListener("click", () => {
        stopAutoplay();
        goToSlide(current - 1);
        startAutoplay();
    });

    nextBtn?.addEventListener("click", () => {
        stopAutoplay();
        goToSlide(current + 1);
        startAutoplay();
    });

    dots.forEach((dot) => {
        dot.addEventListener("click", () => {
            const index = parseInt(dot.dataset.index, 10);
            stopAutoplay();
            goToSlide(index);
            startAutoplay();
        });
    });

    // Touch/swipe support for slider
    if (slider) {
        let touchStartX = 0;
        let touchEndX = 0;

        slider.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        slider.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                stopAutoplay();
                goToSlide(diff > 0 ? current + 1 : current - 1);
                startAutoplay();
            }
        }, { passive: true });
    }

    // Pause autoplay on hover/focus
    slider?.addEventListener("mouseenter", stopAutoplay);
    slider?.addEventListener("mouseleave", startAutoplay);
    slider?.addEventListener("focusin", stopAutoplay);
    slider?.addEventListener("focusout", startAutoplay);

    startAutoplay();

    /* ── 7. BEFORE/AFTER SLIDER ──────────────────────────────────── */
    function initBeforeAfterSlider(container) {
        const handle = $(".ba-handle", container);
        const afterEl = $(".ba-after", container);
        if (!handle || !afterEl) return;

        let dragging = false;

        function setPosition(clientX) {
            const rect = container.getBoundingClientRect();
            let ratio = (clientX - rect.left) / rect.width;
            ratio = Math.max(0.02, Math.min(0.98, ratio));

            handle.style.left = `${ratio * 100}%`;
            afterEl.style.clipPath = `inset(0 ${(1 - ratio) * 100}% 0 0)`;

            const pct = Math.round(ratio * 100);
            handle.setAttribute("aria-valuenow", pct);
        }

        // Mouse
        handle.addEventListener("mousedown", (e) => {
            dragging = true;
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (dragging) setPosition(e.clientX);
        });

        document.addEventListener("mouseup", () => { dragging = false; });

        // Touch
        handle.addEventListener("touchstart", (e) => {
            dragging = true;
            e.preventDefault();
        }, { passive: false });

        document.addEventListener("touchmove", (e) => {
            if (dragging) setPosition(e.touches[0].clientX);
        }, { passive: true });

        document.addEventListener("touchend", () => { dragging = false; });

        // Keyboard
        handle.addEventListener("keydown", (e) => {
            const rect = container.getBoundingClientRect();
            const current = parseFloat(handle.style.left || "50") / 100;
            const step = 0.05;

            if (e.key === "ArrowLeft") setPosition(rect.left + (current - step) * rect.width);
            if (e.key === "ArrowRight") setPosition(rect.left + (current + step) * rect.width);
        });

        // Click anywhere on the container
        container.addEventListener("click", (e) => {
            if (!e.target.closest(".ba-handle")) {
                setPosition(e.clientX);
            }
        });

        // Initialise at 50%
        setPosition(container.getBoundingClientRect().left + container.getBoundingClientRect().width * 0.5);

        // Re-init on resize
        const ro = new ResizeObserver(() => {
            const pos = parseFloat(handle.style.left || "50") / 100;
            setPosition(
                container.getBoundingClientRect().left +
                pos * container.getBoundingClientRect().width
            );
        });
        ro.observe(container);
    }

    $$("[data-slider]").forEach(initBeforeAfterSlider);

    /* ── 8. CONTACT FORM VALIDATION & SUBMISSION ─────────────────── */
    const form = $("#contact-form");
    const btnText = $("#btn-text");
    const btnLoad = $("#btn-loading");
    const successEl = $("#form-success");
    const submitBtn = $("#form-submit");

    function showError(inputId, msg) {
        const el = document.getElementById(inputId);
        const err = document.getElementById(`${inputId}-error`);
        el?.classList.add("is-invalid");
        if (err) err.textContent = msg;
    }

    function clearError(inputId) {
        const el = document.getElementById(inputId);
        const err = document.getElementById(`${inputId}-error`);
        el?.classList.remove("is-invalid");
        if (err) err.textContent = "";
    }

    function validateForm() {
        let valid = true;

        const name = $("#name");
        const phone = $("#phone");

        clearError("name");
        clearError("phone");

        if (!name?.value.trim() || name.value.trim().length < 2) {
            showError("name", "Please enter your full name.");
            valid = false;
        }

        const phoneVal = phone?.value.trim().replace(/\s/g, "");
        if (!phoneVal || !/^(\+?61|0)[2-9]\d{8}$/.test(phoneVal)) {
            showError("phone", "Please enter a valid Australian phone number.");
            valid = false;
        }

        return valid;
    }

    // Inline validation on blur
    $("#name")?.addEventListener("blur", () => {
        const v = $("#name").value.trim();
        if (v.length < 2) showError("name", "Please enter your full name.");
        else clearError("name");
    });

    $("#phone")?.addEventListener("blur", () => {
        const v = $("#phone").value.trim().replace(/\s/g, "");
        if (!/^(\+?61|0)[2-9]\d{8}$/.test(v)) showError("phone", "Please enter a valid Australian phone number.");
        else clearError("phone");
    });

    form?.addEventListener("submit", async function (e) {
        e.preventDefault();

        if (!validateForm()) {
            // Focus first error
            const firstInvalid = form.querySelector(".is-invalid");
            firstInvalid?.focus();
            return;
        }

        // Show loading state
        btnText.hidden = true;
        btnLoad.hidden = false;
        submitBtn.disabled = true;

        // --- INTEGRATION POINT ---
        // Replace this timeout with a real fetch() to your backend or
        // a form service like Formspree, EmailJS, or your own API.
        //
        // Example with Formspree:
        //   const res = await fetch("https://formspree.io/f/YOUR_ID", {
        //     method: "POST",
        //     headers: { "Accept": "application/json" },
        //     body: new FormData(form),
        //   });
        //   if (res.ok) { ... } else { ... }

        await new Promise((r) => setTimeout(r, 1500)); // Simulated delay

        // Reset button
        btnText.hidden = false;
        btnLoad.hidden = true;
        submitBtn.disabled = false;

        // Show success
        form.reset();
        successEl.hidden = false;
        successEl.scrollIntoView({ behavior: "smooth", block: "nearest" });

        // Hide success after 8 seconds
        setTimeout(() => { successEl.hidden = true; }, 8000);
    });

    /* ── 9. BACK TO TOP ──────────────────────────────────────────── */
    const bttBtn = $("#back-to-top");
    bttBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ── 10. ACCESSIBILITY — TRAP FOCUS IN MOBILE NAV ────────────── */
    mobileNav?.addEventListener("keydown", function (e) {
        if (e.key !== "Tab") return;
        const focusable = $$(
            'a, button, input, [tabindex]:not([tabindex="-1"])',
            mobileNav
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    /* ── 11. CONSOLE ACCESSIBILITY CHECK (dev only) ──────────────── */
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
        const issues = [];

        // Check all images have alt text
        $$("img").forEach((img) => {
            if (!img.getAttribute("alt")) {
                issues.push(`Image missing alt: ${img.src}`);
            }
        });

        // Check all interactive elements are keyboard reachable
        $$("a, button").forEach((el) => {
            if (!el.textContent.trim() && !el.getAttribute("aria-label")) {
                issues.push(`Element missing accessible name: ${el.outerHTML.slice(0, 80)}`);
            }
        });

        if (issues.length) {
            console.group("⚠️  Accessibility Issues");
            issues.forEach((i) => console.warn(i));
            console.groupEnd();
        } else {
            console.log("✅ Accessibility check passed — no obvious issues found.");
        }

        // Mobile responsiveness check
        const vw = window.innerWidth;
        const overflowing = $$("*").filter((el) => el.scrollWidth > vw + 2);
        if (overflowing.length) {
            console.group("📱 Mobile Overflow Issues");
            overflowing.forEach((el) =>
                console.warn("Overflow:", el.tagName, el.className)
            );
            console.groupEnd();
        } else {
            console.log("📱 Mobile responsiveness check passed — no overflowing elements.");
        }
    }

})();