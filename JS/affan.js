// Waktu lokal dengan pembaruan per detik
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('datetime').textContent = now.toLocaleDateString('id-ID', options);
}
setInterval(updateDateTime, 1000);
updateDateTime();

// Fungsi untuk toggle detail dengan aksesibilitas yang lebih baik
function toggleDetails() {
    const extraInfo = document.getElementById('extraInfo');
    const content = document.getElementById('moarContent');
    const infoItems = document.querySelectorAll(".info-item");

    if (extraInfo.classList.contains('hidden')) {
        // Reset style terlebih dahulu
        gsap.set(extraInfo, { clearProps: "all" });
        gsap.set(infoItems, { clearProps: "all" });

        // Tampilkan extraInfo
        extraInfo.classList.remove('hidden');
        extraInfo.style.display = "block";
        content.textContent = "Klik untuk Kembali";
        content.setAttribute('aria-expanded', 'true');

        // Animasi untuk extraInfo
        gsap.fromTo(extraInfo,
            { opacity: 0, height: 0 },
            {
                opacity: 1,
                height: "auto",
                duration: 0.6,
                ease: "power2.out"
            }
        );

        // Animasi untuk setiap info-item (kotak dan teks bersama)
        gsap.fromTo(infoItems,
            { y: -20, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                stagger: 0.12,
                duration: 0.5,
                ease: "power2.out",
                delay: 0.3
            }
        );
    } else {
        content.textContent = "Klik untuk Informasi Lainnya";
        content.setAttribute('aria-expanded', 'false');
        
        // Animasi sembunyikan info-item terlebih dahulu
        gsap.to(infoItems, {
            y: -20,
            opacity: 0,
            stagger: 0.08,
            duration: 0.4,
            ease: "power2.in"
        });

        // Kemudian sembunyikan extraInfo
        gsap.to(extraInfo, {
            opacity: 0,
            height: 0,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                extraInfo.classList.add('hidden');
                extraInfo.style.display = "none";
                // Reset semua properti
                gsap.set([extraInfo, infoItems], { clearProps: "all" });
            }
        });
    }
}

// Tampilkan gambar dengan animasi yang lebih dramatis
function showImages() {
    const imageContainer = document.getElementById('imageContainer');
    const bioCard = document.getElementById('bioCard');
    const aiudbibuwad = document.getElementById('AFFANLOVESYAHDU');
    const secretMessage = document.getElementById('secretMessage');
    
    // Tambahkan efek kilau/sparkle sebelum animasi utama
    createSparkles(bioCard, 30);
    
    // Tambahkan efek partikel konfeti
    if (window.createSecretParticles) {
        window.createSecretParticles();
    }
    
    // Tambahkan efek glitter pada pesan rahasia
    let glitterContainer;
    if (window.addSecretTextGlitter && secretMessage) {
        glitterContainer = window.addSecretTextGlitter(secretMessage);
    }
    
    // Efek getaran sebelum membesar
    gsap.fromTo(bioCard, 
        { x: 0 }, 
        { x: 5, duration: 0.1, repeat: 5, yoyo: true, onComplete: () => {
            // Animasi card membesar dengan efek bounce
            gsap.to(bioCard, {
                className: "card p-6 rounded-xl shadow-2xl text-center bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90 expanded",
                duration: 0.8,
                ease: "elastic.out(1, 0.5)",
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.8)"
            });
        }}
    );

    // Tampilkan gambar dan pesan rahasia
    imageContainer.classList.remove('hidden');
    secretMessage.classList.remove('hidden');
    aiudbibuwad.classList.remove('hidden');
    
    // Tambahkan class untuk efek gradient animasi pada pesan rahasia
    secretMessage.classList.add('rainbow-text-animated');

    // Animasi untuk pesan rahasia dengan efek lebih dramatis
    gsap.fromTo(secretMessage,
        { opacity: 0, scale: 0.2, y: -50, rotation: -5 },
        {
            opacity: 1,
            scale: 1.1, // Sedikit lebih besar dari normal
            y: 0,
            rotation: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
            onComplete: () => {
                // Tambahkan efek pulsing glow setelah muncul
                gsap.to(secretMessage, {
                    textShadow: "0 0 15px rgba(255, 105, 180, 0.8), 0 0 30px rgba(255, 105, 180, 0.6)",
                    repeat: -1,
                    yoyo: true,
                    duration: 1.5
                });
            }
        }
    );

    // Animasi masuk untuk gambar kiri dengan rotasi dan scale
    gsap.fromTo("#leftImage",
        { opacity: 0, x: -100, rotation: -15, scale: 0.5 },
        {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(2)"
        }
    );

    // Animasi masuk untuk gambar kanan dengan rotasi dan scale
    gsap.fromTo("#rightImage",
        { opacity: 0, x: 100, rotation: 15, scale: 0.5 },
        {
            opacity: 1,
            x: 0,
            rotation: 0,
            scale: 1,
            duration: 1,
            ease: "back.out(2)"
        }
    );
    
    // Tambahkan efek hover pada gambar
    addImageHoverEffects();

    // Timer untuk menyembunyikan gambar dan pesan (diperpanjang durasinya)
    setTimeout(() => {
        // Animasi keluar dengan efek yang lebih menarik
        gsap.to(secretMessage, {
            opacity: 0,
            scale: 1.5,
            y: -30,
            duration: 0.8,
            ease: "back.in(1.5)"
        });
        
        gsap.to("#leftImage", {
            opacity: 0,
            x: -80,
            rotation: -10,
            scale: 0.6,
            duration: 0.8,
            delay: 0.1,
            ease: "back.in(1.5)"
        });
        
        gsap.to("#rightImage", {
            opacity: 0,
            x: 80,
            rotation: 10,
            scale: 0.6,
            duration: 0.8,
            delay: 0.2,
            ease: "back.in(1.5)",
            onComplete: () => {
                imageContainer.classList.add('hidden');
                secretMessage.classList.add('hidden');
                secretMessage.classList.remove('rainbow-text-animated');
                aiudbibuwad.classList.add('hidden');

                // Kembalikan ukuran card dengan efek bounce
                gsap.to(bioCard, {
                    className: "card p-6 rounded-xl shadow-2xl text-center bg-white bg-opacity-90 dark:bg-gray-800 dark:bg-opacity-90",
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    duration: 0.8,
                    ease: "elastic.out(1, 0.75)"
                });
                
                // Hapus event listener hover pada gambar
                removeImageHoverEffects();
                
                // Bersihkan efek glitter jika ada
                if (glitterContainer && glitterContainer.parentNode) {
                    glitterContainer.parentNode.removeChild(glitterContainer);
                }
            }
        });
    }, 15000); // Diperpanjang menjadi 15 detik
}

// Fungsi untuk membuat efek sparkle/kilau
function createSparkles(element, count) {
    for (let i = 0; i < count; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Posisi acak di sekitar elemen
        const top = Math.random() * element.offsetHeight;
        const left = Math.random() * element.offsetWidth;
        const size = Math.random() * 8 + 4; // Ukuran 4-12px
        
        // Styling untuk sparkle
        sparkle.style.top = `${top}px`;
        sparkle.style.left = `${left}px`;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.position = 'absolute';
        sparkle.style.borderRadius = '50%';
        sparkle.style.backgroundColor = `hsl(${Math.random() * 60 + 180}, 100%, 70%)`; // Warna biru-ungu acak
        sparkle.style.boxShadow = `0 0 ${size}px ${size/2}px rgba(255, 255, 255, 0.8)`;
        sparkle.style.zIndex = '5';
        
        // Animasi menggunakan GSAP
        gsap.to(sparkle, {
            opacity: 0,
            scale: 0,
            duration: Math.random() * 1 + 0.5, // Durasi 0.5-1.5 detik
            onComplete: () => sparkle.remove() // Hapus setelah animasi selesai
        });
        
        element.appendChild(sparkle);
    }
}

// Tambahkan efek hover pada gambar dengan dukungan aksesibilitas
function addImageHoverEffects() {
    const leftImage = document.querySelector('#leftImage');
    const rightImage = document.querySelector('#rightImage');
    
    if (leftImage) {
        // Tambahkan atribut aksesibilitas
        leftImage.setAttribute('role', 'button');
        leftImage.setAttribute('aria-label', 'Klik untuk memperbesar foto Affan 1');
        leftImage.setAttribute('tabindex', '0');
        
        leftImage.addEventListener('mouseenter', imageHoverIn);
        leftImage.addEventListener('mouseleave', imageHoverOut);
        
        // Tambahkan dukungan keyboard untuk aksesibilitas
        leftImage.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                leftImage.click();
            }
        });
    }
    
    if (rightImage) {
        // Tambahkan atribut aksesibilitas
        rightImage.setAttribute('role', 'button');
        rightImage.setAttribute('aria-label', 'Klik untuk memperbesar foto Affan 2');
        rightImage.setAttribute('tabindex', '0');
        
        rightImage.addEventListener('mouseenter', imageHoverIn);
        rightImage.addEventListener('mouseleave', imageHoverOut);
        
        // Tambahkan dukungan keyboard untuk aksesibilitas
        rightImage.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                rightImage.click();
            }
        });
    }
}

// Fungsi untuk menghapus efek hover pada gambar
function removeImageHoverEffects() {
    const leftImage = document.querySelector('#leftImage');
    const rightImage = document.querySelector('#rightImage');
    
    if (leftImage) {
        leftImage.removeEventListener('mouseenter', imageHoverIn);
        leftImage.removeEventListener('mouseleave', imageHoverOut);
    }
    
    if (rightImage) {
        rightImage.removeEventListener('mouseenter', imageHoverIn);
        rightImage.removeEventListener('mouseleave', imageHoverOut);
    }
}

// Fungsi efek hover masuk
function imageHoverIn() {
    gsap.to(this, {
        scale: 1.1,
        rotation: this.id === 'leftImage' ? -5 : 5,
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
        duration: 0.3
    });
}

// Fungsi efek hover keluar
function imageHoverOut() {
    gsap.to(this, {
        scale: 1,
        rotation: 0,
        boxShadow: 'none',
        duration: 0.3
    });
}

// Efek transisi background yang lebih halus
const backgrounds = [
    "img/ltr1.webp",
    "img/ltr2.webp",
    "img/ltr3.webp"
];

let currentBg = 0;
setInterval(() => {
    currentBg = (currentBg + 1) % backgrounds.length;

    // Blur effect during transition dengan efek parallax
    gsap.to("body", {
        filter: "blur(8px)",
        duration: 0.5,
        onComplete: () => {
            document.body.style.backgroundImage = `url('${backgrounds[currentBg]}')`;

            // Remove blur after changing background
            gsap.to("body", {
                filter: "blur(0px)",
                duration: 0.5
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
        ease: "sine.inOut"
    });
}

let clickCount = 0;
let timer;

document.addEventListener('DOMContentLoaded', function() {
    const tripleClick = document.getElementById("tripleclick");
    
    // Tambahkan atribut aksesibilitas
    tripleClick.setAttribute('role', 'button');
    tripleClick.setAttribute('aria-label', 'Klik lima kali untuk melihat kejutan');
    tripleClick.setAttribute('tabindex', '0');
    
    tripleClick.addEventListener("click", function () {
        clickCount++;

        clearTimeout(timer); // Reset the timer on each click

        timer = setTimeout(() => {
            if (clickCount === 5) {
                showImages();
            }
            clickCount = 0;
        }, 500);
    });
    
    // Tambahkan dukungan keyboard untuk aksesibilitas
    tripleClick.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            tripleClick.click();
        }
    });
    
    // Inisialisasi tema dengan dukungan aksesibilitas
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.body.classList.add('dark');
    }
    
    // Toggle tema dengan dukungan aksesibilitas
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        // Tambahkan atribut aksesibilitas
        themeToggle.setAttribute('role', 'button');
        themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
        themeToggle.setAttribute('aria-pressed', document.body.classList.contains('dark') ? 'true' : 'false');
        themeToggle.setAttribute('tabindex', '0');
        
        themeToggle.addEventListener('click', function() {
            const isDark = document.body.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update atribut aksesibilitas
            themeToggle.setAttribute('aria-label', isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
            themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
            
            // Tambahkan efek transisi yang lebih halus
            document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        });
        
        // Tambahkan dukungan keyboard untuk aksesibilitas
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                themeToggle.click();
            }
        });
    }
});
