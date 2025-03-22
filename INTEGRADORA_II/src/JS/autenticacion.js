// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

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

// Oculta la página mientras verifica la autenticación
document.body.style.display = "none";

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("No hay usuario autenticado, redirigiendo...");
        window.location.href = "../HTML/registro.html"; // Ajusta la ruta según la ubicación de tus páginas
    } else {
        document.body.style.display = "block"; // Muestra la página si el usuario está autenticado
    }
});

// Función para cerrar sesión
export function cerrarSesion() {
    signOut(auth)
        .then(() => {
            console.log("Sesión cerrada exitosamente");

            // Eliminar datos almacenados
            sessionStorage.clear();
            localStorage.clear();

            // Redirigir al login
            window.location.href = "../HTML/registro.html";
        })
        .catch((error) => {
            console.error("Error al cerrar sesión:", error);
        });
}
