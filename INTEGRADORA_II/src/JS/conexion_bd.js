// Importa Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  updateProfile 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC2v-hIiAh5I4CJw47QCSgxJrj8LY0caiA",
    authDomain: "integradora-d156e.firebaseapp.com",
    databaseURL: "https://integradora-d156e-default-rtdb.firebaseio.com",
    projectId: "integradora-d156e",
    storageBucket: "integradora-d156e-default-rtdb.appspot.com",
    messagingSenderId: "840923902931",
    appId: "1:840923902931:web:2c2600a79578074bba3526",
    measurementId: "G-BQGJLDWHJJ"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Manejar el registro de usuario
const registerForm = document.querySelector("#register form");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const name = registerForm.querySelector("input[type='text']").value;
        const email = registerForm.querySelector("input[type='email']").value;
        const password = registerForm.querySelector("input[type='password']").value;
        
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log("✅ Usuario registrado:", user);

            // Redirigir después del registro
            window.location.replace("../html/index.html");

        } catch (error) {
            console.error("⛔ Error al registrar el usuario:", error);
        }
    });
}

// Manejar el inicio de sesión
const loginForm = document.querySelector("#login form");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = loginForm.querySelector("input[type='email']").value;
        const password = loginForm.querySelector("input[type='password']").value;
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("✅ Usuario autenticado:", userCredential.user);

            // Redirigir después del login
            window.location.replace("../html/index.html");

        } catch (error) {
            console.error("⛔ Error al iniciar sesión:", error);
        }
    });
}
