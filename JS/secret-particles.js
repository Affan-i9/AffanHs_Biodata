// Efek partikel khusus untuk rahasia
document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk membuat partikel konfeti saat rahasia ditampilkan
    window.createSecretParticles = function() {
        const container = document.getElementById('bioCard');
        const particleCount = 100; // Jumlah partikel
        
        for (let i = 0; i < particleCount; i++) {
            createParticle(container);
        }
    }
    
    // Fungsi untuk membuat satu partikel konfeti
    function createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'secret-particle';
        
        // Warna-warna cerah untuk partikel
        const colors = [
            '#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', 
            '#B5EAD7', '#C7CEEA', '#FF6B6B', '#4ECDC4',
            '#F9D5E5', '#D0E6A5', '#FFDD94', '#A0E7E5'
        ];
        
        // Properti acak untuk partikel
        const size = Math.random() * 10 + 5; // Ukuran 5-15px
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100; // Posisi horizontal (0-100%)
        const isRound = Math.random() > 0.5; // 50% kemungkinan bentuk bulat
        
        // Styling partikel
        particle.style.backgroundColor = color;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.position = 'absolute';
        particle.style.left = `${left}%`;
        particle.style.top = '-20px';
        particle.style.borderRadius = isRound ? '50%' : '0';
        particle.style.zIndex = '5';
        
        // Tambahkan ke container
        container.appendChild(particle);
        
        // Animasi jatuh dengan GSAP
        gsap.to(particle, {
            y: container.offsetHeight + 100, // Jatuh melewati container
            x: (Math.random() - 0.5) * 200, // Gerakan horizontal acak
            rotation: Math.random() * 360, // Rotasi acak
            duration: Math.random() * 3 + 2, // Durasi 2-5 detik
            ease: 'power1.out',
            onComplete: () => particle.remove() // Hapus setelah animasi selesai
        });
    }
    
    // Tambahkan fungsi untuk menambahkan efek kilau pada teks rahasia
    window.addSecretTextGlitter = function(element) {
        // Buat container untuk glitter
        const glitterContainer = document.createElement('div');
        glitterContainer.className = 'glitter-container';
        glitterContainer.style.position = 'absolute';
        glitterContainer.style.top = '0';
        glitterContainer.style.left = '0';
        glitterContainer.style.width = '100%';
        glitterContainer.style.height = '100%';
        glitterContainer.style.pointerEvents = 'none';
        glitterContainer.style.zIndex = '2';
        
        // Tambahkan ke elemen
        element.style.position = 'relative';
        element.appendChild(glitterContainer);
        
        // Buat beberapa titik glitter
        for (let i = 0; i < 15; i++) {
            const glitter = document.createElement('div');
            glitter.className = 'glitter';
            
            // Styling untuk glitter
            glitter.style.position = 'absolute';
            glitter.style.width = '3px';
            glitter.style.height = '3px';
            glitter.style.borderRadius = '50%';
            glitter.style.backgroundColor = 'white';
            glitter.style.boxShadow = '0 0 10px 2px rgba(255, 255, 255, 0.8)';
            
            // Posisi acak
            glitter.style.left = `${Math.random() * 100}%`;
            glitter.style.top = `${Math.random() * 100}%`;
            
            // Tambahkan ke container
            glitterContainer.appendChild(glitter);
            
            // Animasi kedip
            gsap.to(glitter, {
                opacity: 0,
                repeat: -1,
                yoyo: true,
                duration: Math.random() * 0.8 + 0.2,
                delay: Math.random() * 2
            });
        }
        
        // Return container untuk bisa dihapus nanti
        return glitterContainer;
    }
});