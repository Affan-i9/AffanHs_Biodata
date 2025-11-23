import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signOut, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyByv4FnBvB2p321TWXeTWTIEZUPAnWhXQg",
    authDomain: "affanhs-60fcc.firebaseapp.com",
    projectId: "affanhs-60fcc",
    storageBucket: "affanhs-60fcc.firebasestorage.app",
    messagingSenderId: "982429155569",
    appId: "1:982429155569:web:2da0cb6572ebde47d06950"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

auth.onAuthStateChanged((user) => {
    if (user) {
        const userData = {
            name: user.displayName,
            email: user.email,
            picture: user.photoURL
        };
        localStorage.setItem('user', JSON.stringify(userData));
        updateUserInterface(userData);
    } else {
        window.location.href = 'login.html';
    }
});

function updateUserInterface(userData) {
    document.getElementById('userImage').src = userData.picture || '/api/placeholder/45/45';
    document.getElementById('userName').textContent = userData.name;
    document.getElementById('userEmail').textContent = userData.email;
    document.getElementById('userGreeting').textContent = userData.name.split(' ')[0];
}

window.logout = async function () {
    try {
        await signOut(auth);
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal keluar. Silakan coba lagi.');
    }
}