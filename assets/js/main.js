gsap.registerPlugin(ScrollTrigger);

const bootTL = gsap.timeline({ defaults: { ease: "power2.out" } });
const logoPlate = document.querySelector(".logo-plate");
const statusEl = document.querySelector(".status");

bootTL
    .from(logoPlate, { y: -30, opacity: 0, duration: 0.9 })
    .to(
        statusEl,
        {
            innerText: "booting • 36%",
            duration: 0.6,
            onStart: () => {
                statusEl.style.opacity = 1;
            },
        },
        ">-0.2"
    )
    .to(statusEl, { innerText: "booting • 72%", duration: 0.6 })
    .to(statusEl, {
        innerText: "online • 100%",
        duration: 0.6,
        onComplete: () => {
            document.getElementById("statusVal").textContent = "Operational";
        },
    });

gsap.from(".nav a", { y: -8, opacity: 0, stagger: 0.06, duration: 0.8, ease: "power3.out" });

gsap.to(".hero-image", {
    scale: 1.14,
    filter: "contrast(1.06) saturate(1.05)",
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
    },
});

ScrollTrigger.create({
    trigger: ".panel",
    start: "top bottom",
    end: "top center",
    scrub: 1,
    onUpdate: (self) => {
        const pct = Math.min(100, Math.max(0, self.progress * 100));
        document.getElementById("revealLine").style.width = pct + "%";
    },
});

const gears = document.querySelector(".gears");
gsap.to(gears, {
    rotation: 360,
    transformOrigin: "50% 50%",
    ease: "none",
    repeat: -1,
    duration: 80,
});

gsap.utils.toArray(".card").forEach((card) => {
    gsap.from(card, {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
    });
});

gsap.to(".hazard", {
    backgroundPosition: "560px 0",
    ease: "none",
    scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: 0.7 },
});

document.addEventListener("visibilitychange", () => {
    if (document.hidden) gsap.globalTimeline.pause();
    else gsap.globalTimeline.resume();
});
