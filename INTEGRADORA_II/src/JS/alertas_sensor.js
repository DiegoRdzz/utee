import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

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
const database = getDatabase(app);

// Referencia a los sensores
const sensoresRef = ref(database, 'sensores');

// Cola de alertas (para toast notifications)
const alertQueue = [];
let isShowingAlert = false;

// Función para agregar alertas a la cola (toast notifications)
function addAlertToQueue(message, type = 'info') {
    alertQueue.push({ message, type }); // Agrega la alerta a la cola
    processAlertQueue(); // Intenta procesar la cola
}

// Función para procesar la cola de alertas (toast notifications)
function processAlertQueue() {
    if (isShowingAlert || alertQueue.length === 0) {
        return; // Si ya se está mostrando una alerta o no hay alertas, no hacer nada
    }

    const { message, type } = alertQueue.shift(); // Obtiene la primera alerta de la cola
    isShowingAlert = true; // Indica que se está mostrando una alerta

    showToast(message, type); // Muestra la alerta como toast

    // Espera 3 segundos antes de procesar la siguiente alerta
    setTimeout(() => {
        isShowingAlert = false; // Indica que la alerta actual ha terminado
        processAlertQueue(); // Procesa la siguiente alerta
    }, 3000); // 3000 ms = 3 segundos
}

// Función para mostrar notificaciones emergentes (toast)
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (toast && toastMessage) {
        toast.className = 'toast';
        toast.classList.add(type);

        let icon = '';
        switch (type) {
            case 'success':
                icon = '<i class="fa-solid fa-circle-check"></i>';
                break;
            case 'warning':
                icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
                break;
            case 'error':
                icon = '<i class="fa-solid fa-circle-xmark"></i>';
                break;
            default:
                icon = '<i class="fa-solid fa-circle-info"></i>';
        }

        toastMessage.innerHTML = `${icon} ${message}`;
        toast.classList.add('show');
    }
}

// Escucha cambios en los sensores
onValue(sensoresRef, (snapshot) => {
    const sensores = snapshot.val();
    const alertas = [];

    // Verifica condiciones de alerta para el sensor dht22
    if (sensores.dht22) {
        const temperatura = sensores.dht22.temperatura;
        const humedad = sensores.dht22.humedad;

        if (temperatura < 10 || temperatura > 25) {
            const mensaje = `Alerta: Temperatura fuera de rango (${temperatura}°C)`;
            alertas.push(mensaje);
            addAlertToQueue(mensaje, 'warning'); // Agrega a la cola (toast)
        }

        if (humedad < 20 || humedad > 25) {
            const mensaje = `Alerta: Humedad fuera de rango (${humedad}%)`;
            alertas.push(mensaje);
            addAlertToQueue(mensaje, 'warning'); // Agrega a la cola (toast)
        }
    }

    // Verifica condiciones de alerta para el sensor mpu
    if (sensores.mpu && sensores.mpu.vibracion === 1) {
        const mensaje = 'Alerta: Vibración detectada';
        alertas.push(mensaje);
        addAlertToQueue(mensaje, 'error'); // Agrega a la cola (toast)
    }

    // Si estamos en la página de alertas, muestra las alertas en el alert-box
    if (window.location.pathname.endsWith('Alertas.html')) {
        const alertBox = document.getElementById('alert-box');
        if (alertBox) {
            if (alertas.length > 0) {
                alertBox.innerHTML = alertas.map(alerta => `<p>${alerta}</p>`).join('');
            } else {
                alertBox.innerHTML = '<p>No hay alertas en este momento.</p>';
            }
        }
    }
});