// Efek Ketik untuk Nama
document.addEventListener('DOMContentLoaded', function() {
    // Ambil elemen nama
    const nameElement = document.querySelector('h1.text-2xl.font-bold.mt-3.neon-text');
    
    if (nameElement) {
        // Simpan teks asli
        const originalText = nameElement.textContent.trim();
        // Kosongkan teks
        nameElement.textContent = '';
        // Tambahkan class untuk efek ketik
        nameElement.classList.add('typing-effect');
        
        // Fungsi untuk mengetik karakter satu per satu dengan efek suara ketik
        // Variabel untuk melacak semua timeout
        let typeTimeouts = [];
        
        function typeText() {
            // Reset teks dan mulai animasi ketik
            nameElement.textContent = '';
            let i = 0;
            
            // Bersihkan semua timeout sebelumnya
            if (window.typeTextTimeout) {
                clearTimeout(window.typeTextTimeout);
            }
            
            // Bersihkan semua timeout dalam array
            typeTimeouts.forEach(timeout => clearTimeout(timeout));
            typeTimeouts = [];
            
            // Tambahkan efek getaran saat mulai mengetik
            gsap.fromTo(nameElement, 
                { x: 0 }, 
                { x: 3, duration: 0.1, repeat: 3, yoyo: true }
            );
            
            function type() {
                if (i < originalText.length) {
                    nameElement.textContent += originalText.charAt(i);
                    i++;
                    
                    // Tambahkan efek getaran kecil saat mengetik
                    if (i % 3 === 0) {
                        gsap.fromTo(nameElement, 
                            { y: 0 }, 
                            { y: 1, duration: 0.05, repeat: 1, yoyo: true }
                        );
                    }
                    
                    // Variasi kecepatan ketik untuk efek lebih natural
                    const randomSpeed = Math.floor(Math.random() * 50) + 80;
                    const timeout = setTimeout(type, randomSpeed);
                    typeTimeouts.push(timeout);
                } else {
                    // Efek highlight setelah selesai mengetik
                    gsap.fromTo(nameElement,
                        { textShadow: '0 0 5px rgba(59, 130, 246, 0.5)' },
                        { 
                            textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)', 
                            duration: 1,
                            repeat: 1,
                            yoyo: true,
                            onComplete: function() {
                                // Setelah selesai mengetik dan efek highlight, tunggu sebentar lalu mulai lagi
                                window.typeTextTimeout = setTimeout(() => {
                                    typeText();
                                }, 5000); // Jeda 5 detik sebelum mengetik ulang
                            }
                        }
                    );
                }
            }
            
            type();
        }
        
        // Mulai efek ketik
        typeText();
        
        // Tambahkan interaksi klik untuk memulai ulang animasi ketik
        nameElement.addEventListener('click', function() {
            // Efek getaran saat diklik
            gsap.fromTo(this, 
                { rotation: 0 }, 
                { rotation: 5, duration: 0.1, repeat: 4, yoyo: true }
            );
            
            // Bersihkan timeout sebelumnya jika ada
            if (window.typeTextTimeout) {
                clearTimeout(window.typeTextTimeout);
            }
            
            // Bersihkan semua timeout dalam array
            typeTimeouts.forEach(timeout => clearTimeout(timeout));
            typeTimeouts = [];
            
            // Mulai ulang animasi ketik
            typeText();
        });
    }
    
    // Tambahkan efek 3D pada card
    const bioCard = document.getElementById('bioCard');
    if (bioCard) {
        bioCard.classList.add('card-3d-effect');
    }
    
    // Tambahkan efek glow pada teks
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.classList.add('text-glow');
        
        // Tambahkan interaksi hover pada nama
        if (heading.classList.contains('typing-effect')) {
            heading.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.5)',
                    duration: 0.3
                });
            });
            
            heading.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    textShadow: '0 0 5px rgba(59, 130, 246, 0.5), 0 0 10px rgba(59, 130, 246, 0.3), 0 0 15px rgba(59, 130, 246, 0.1)',
                    duration: 0.3
                });
            });
        }
    });
    
    // Tambahkan efek pulse pada tombol
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.classList.add('pulse-effect', 'ripple');
    });
    
    // Efek parallax untuk background
    document.addEventListener('mousemove', function(e) {
        const particles = document.querySelectorAll('.particle');
        const moveX = (e.clientX - window.innerWidth / 2) / 50;
        const moveY = (e.clientY - window.innerHeight / 2) / 50;
        
        particles.forEach(particle => {
            // Buat efek parallax dengan kecepatan berbeda untuk setiap partikel
            const speed = parseFloat(particle.getAttribute('data-speed') || 1);
            const x = moveX * speed;
            const y = moveY * speed;
            
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
});