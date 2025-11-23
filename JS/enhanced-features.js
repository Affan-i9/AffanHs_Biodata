// Script untuk fitur-fitur tambahan

// Fungsi untuk scroll reveal
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-zoom');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            } else {
                // Opsional: hapus kelas jika ingin animasi berulang saat scroll ke atas
                // element.classList.remove('active');
            }
        });
    }
    
    // Periksa saat halaman dimuat
    checkReveal();
    
    // Periksa saat scroll
    window.addEventListener('scroll', checkReveal);
}

// Fungsi untuk galeri foto dengan lightbox
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const body = document.body;
    
    // Buat overlay lightbox jika belum ada
    if (!document.querySelector('.lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <span class="lightbox-close">&times;</span>
            <img class="lightbox-content" src="" alt="Gambar yang diperbesar">
        `;
        body.appendChild(overlay);
        
        // Tambahkan event listener untuk menutup lightbox
        const closeBtn = overlay.querySelector('.lightbox-close');
        closeBtn.addEventListener('click', () => {
            overlay.classList.remove('active');
        });
        
        // Tutup juga saat klik di luar gambar
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    }
    
    const overlay = document.querySelector('.lightbox-overlay');
    const lightboxImg = overlay.querySelector('.lightbox-content');
    
    // Tambahkan event listener untuk setiap item galeri
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.getAttribute('data-full-img') || item.src;
            lightboxImg.src = imgSrc;
            overlay.classList.add('active');
        });
    });
}

// Fungsi untuk widget cuaca
async function initWeatherWidget() {
    const weatherContainer = document.getElementById('weatherWidget');
    
    if (!weatherContainer) return;
    
    try {
        // Dapatkan lokasi pengguna
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            try {
                // Gunakan API OpenWeatherMap (perlu API key)
                // Untuk demo, kita gunakan data statis
                // Dalam implementasi nyata, gunakan: 
                // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=YOUR_API_KEY`);
                
                // Data cuaca statis untuk demo
                const weatherData = {
                    name: "Cibinong",
                    main: {
                        temp: 30,
                        humidity: 75
                    },
                    weather: [{
                        main: "Clouds",
                        description: "berawan",
                        icon: "04d"
                    }]
                };
                
                // Tampilkan data cuaca
                weatherContainer.innerHTML = `
                    <div class="weather-card glass-effect p-3 rounded-lg">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="font-medium">${weatherData.name}</h3>
                                <p class="text-2xl font-bold">${weatherData.main.temp}°C</p>
                                <p class="text-sm">${weatherData.weather[0].description}</p>
                            </div>
                            <div>
                                <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" 
                                     alt="${weatherData.weather[0].description}" 
                                     width="50" height="50">
                            </div>
                        </div>
                        <p class="text-xs mt-2">Kelembaban: ${weatherData.main.humidity}%</p>
                    </div>
                `;
                
                // Tampilkan widget
                weatherContainer.classList.remove('hidden');
            } catch (error) {
                console.error('Error fetching weather data:', error);
                weatherContainer.innerHTML = '<p class="text-sm text-red-500">Gagal memuat data cuaca</p>';
                weatherContainer.classList.remove('hidden');
            }
        }, (error) => {
            console.error('Geolocation error:', error);
            weatherContainer.innerHTML = '<p class="text-sm">Izinkan akses lokasi untuk melihat cuaca</p>';
            weatherContainer.classList.remove('hidden');
        });
    } catch (error) {
        console.error('Weather widget error:', error);
    }
}

// Fungsi untuk tombol share
function initShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const platform = button.getAttribute('data-platform');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl;
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://api.whatsapp.com/send?text=${title} ${url}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// Inisialisasi semua fitur saat DOM sudah siap
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi scroll reveal
    initScrollReveal();
    
    // Inisialisasi galeri foto
    initGallery();
    
    // Inisialisasi widget cuaca
    initWeatherWidget();
    
    // Inisialisasi tombol share
    initShareButtons();
});