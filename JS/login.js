// Waktu lokal dengan pembaruan per detik
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
}
setInterval(updateDateTime, 1000);
updateDateTime();

const backgrounds = [
    "img/ltr1.webp",
    "img/ltr2.webp",
    "img/ltr3.webp"
];

let currentBg = 0;
setInterval(() => {
    currentBg = (currentBg + 1) % backgrounds.length;

    // Blur effect during transition dengan animasi yang lebih smooth
    gsap.to("body", {
        filter: "blur(8px)",
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
            document.body.style.backgroundImage = `url('${backgrounds[currentBg]}')`;

            // Remove blur after changing background dengan transisi yang lebih halus
            gsap.to("body", {
                filter: "blur(0px)",
                duration: 0.8,
                ease: "power2.inOut"
            });
        }
    });
}, 10000);

// Tambahkan efek floating particles
document.addEventListener("DOMContentLoaded", function () {
    // Buat particle container
    const particleContainer = document.createElement("div");
    particleContainer.className = "absolute inset-0 z-0 overflow-hidden pointer-events-none";
    document.querySelector('.flex.flex-col.items-center').appendChild(particleContainer);

    // Buat 20 particle
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
});

function createParticle(container) {
    const particle = document.createElement("div");

    // Random size dan opacity
    const size = Math.random() * 10 + 5;
    const opacity = Math.random() * 0.5 + 0.1;

    // Style particle
    particle.style.position = "absolute";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.borderRadius = "50%";
    particle.style.backgroundColor = getRandomColor();
    particle.style.opacity = opacity.toString();

    // Random position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;

    // Add to container
    container.appendChild(particle);

    // Animate
    animateParticle(particle);
}

function getRandomColor() {
    const colors = ["#3b82f6", "#6366f1", "#8b5cf6", "#ec4899", "#06b6d4"];
    return colors[Math.floor(Math.random() * colors.length)];
}

function animateParticle(particle) {
    const duration = Math.random() * 20 + 10;
    const xMove = Math.random() * 100 - 50;
    const yMove = Math.random() * 100 - 50;

    gsap.to(particle, {
        x: xMove,
        y: yMove,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 2 // Menambahkan delay acak untuk animasi yang lebih natural
    });
}


