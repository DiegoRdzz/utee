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

// Verificar si el usuario está autenticado
onAuthStateChanged(auth, (user) => {
    if (!user) {
        console.log("No hay usuario autenticado, redirigiendo...");
        window.location.href = "../html/registro.html"; // Redirigir si no hay sesión activa
    }
});

// Botón de "Salir"
const salirBtn = document.getElementById("salir_btn");

// Agregar evento solo si el botón existe
if (salirBtn) {
    salirBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            console.log("Sesión cerrada exitosamente");
            
            // Eliminar datos almacenados en sessionStorage o localStorage
            sessionStorage.clear();
            localStorage.clear();
            
            // Redirigir al usuario a la página de inicio de sesión
            window.location.href = "../html/registro.html";
            window.location.reload(true);  // Recarga la página para eliminar la caché
            
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    });
} else {
    console.error("El botón de cerrar sesión no se encontró en el DOM.");
}
