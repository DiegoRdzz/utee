import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC2v-hIiAh5I4CJw47QCSgxJrj8LY0caiA",
    authDomain: "integradora-d156e.firebaseapp.com",
    databaseURL: "https://integradora-d156e-default-rtdb.firebaseio.com",
    projectId: "integradora-d156e",
    storageBucket: "integradora-d156e.firebasestorage.app",
    messagingSenderId: "840923902931",
    appId: "1:840923902931:web:2c2600a79578074bba3526",
    measurementId: "G-BQGJLDWHJJ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Referencias a elementos del DOM
const forgotPasswordLink = document.getElementById('forgotPasswordLink');
const forgotPasswordModal = document.getElementById('forgotPasswordModal');
const closeModal = document.querySelector('.close');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const resetEmailInput = document.getElementById('resetEmail');

// Abrir el modal al hacer clic en "¿Olvidaste tu contraseña?"
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (event) => {
        event.preventDefault(); // Evita que el enlace redirija
        forgotPasswordModal.style.display = 'flex'; // Muestra el modal
    });
}

// Cerrar el modal al hacer clic en la "X"
if (closeModal) {
    closeModal.addEventListener('click', () => {
        forgotPasswordModal.style.display = 'none'; // Oculta el modal
    });
}

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (event) => {
    if (event.target === forgotPasswordModal) {
        forgotPasswordModal.style.display = 'none'; // Oculta el modal
    }
});

// Enviar correo de recuperación de contraseña
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe

        const email = resetEmailInput.value.trim();

        if (email) {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert('Se ha enviado un correo de recuperación a ' + email);
                    forgotPasswordModal.style.display = 'none'; // Cierra el modal
                })
                .catch((error) => {
                    console.error('Error al enviar el correo:', error);
                    alert('Error: ' + error.message);
                });
        } else {
            alert('Por favor, ingresa tu correo electrónico.');
        }
    });
}