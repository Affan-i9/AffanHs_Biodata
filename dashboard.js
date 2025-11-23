// dashboard.js - Versi PHP/MySQL Self-Hosted

document.addEventListener('DOMContentLoaded', function() {
    // 1. Cek apakah user sudah login
    const userSession = localStorage.getItem('user');

    if (!userSession) {
        // Belum login -> Redirect ke login
        window.location.href = 'login.html';
        return;
    }

    // 2. Ambil data user
    const userData = JSON.parse(userSession);

    // 3. Update UI dengan data user
    updateUserInterface(userData);
});

function updateUserInterface(userData) {
    // Update gambar profil (gunakan default jika kosong)
    const userImg = document.getElementById('userImage');
    if (userImg) {
        userImg.src = userData.picture || 'img/pp.webp';
    }

    // Update nama
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = userData.name || 'Pengguna';
    }

    // Update email
    const userEmail = document.getElementById('userEmail');
    if (userEmail) {
        userEmail.textContent = userData.email || '';
    }

    // Update greeting nama depan
    const userGreeting = document.getElementById('userGreeting');
    if (userGreeting && userData.name) {
        userGreeting.textContent = userData.name.split(' ')[0];
    }
}

// Fungsi Global Logout (bisa dipanggil dari onclick HTML)
window.logout = function () {
    if(confirm('Yakin ingin keluar?')) {
        localStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');
        window.location.href = 'login.html';
    }
}