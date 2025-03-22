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

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
console.log("✅ Firebase inicializado correctamente");

// Referencia a los datos en la base de datos
const sensorRef = ref(db, "sensores/dht22");

// Configuración inicial de la gráfica
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: [],
        borderColor: 'red',
        borderWidth: 2,
        fill: false
      },
      {
        label: 'Humedad (%)',
        data: [],
        borderColor: 'blue',
        borderWidth: 2,
        fill: false
      }
    ]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Tiempo' }
      },
      y: {
        title: { display: true, text: 'Valor' },
        beginAtZero: false
      }
    }
  }
});

// Escuchar cambios en la base de datos y actualizar la gráfica
onValue(sensorRef, (snapshot) => {
  const data = snapshot.val();
  console.log("📊 Datos recibidos de Firebase:", data);

  if (data && data.temperatura !== undefined && data.humedad !== undefined) {
    const currentTime = new Date().toLocaleTimeString();

    // Añadir nuevos datos a la gráfica
    chart.data.labels.push(currentTime);
    chart.data.datasets[0].data.push(parseFloat(data.temperatura));
    chart.data.datasets[1].data.push(parseFloat(data.humedad));

    // Limitar a los últimos 10 datos para evitar sobrecarga
    if (chart.data.labels.length > 10) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
      chart.data.datasets[1].data.shift();
    }

    // Ajustar dinámicamente la escala del eje Y
    const minValue = Math.min(...chart.data.datasets[0].data, ...chart.data.datasets[1].data);
    const maxValue = Math.max(...chart.data.datasets[0].data, ...chart.data.datasets[1].data);
    chart.options.scales.y.min = minValue - 2; 
    chart.options.scales.y.max = maxValue + 2;

    chart.update();
  } else {
    console.warn("⚠️ Datos recibidos vacíos o incorrectos.");
  }
});