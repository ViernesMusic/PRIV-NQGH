//Hora
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? '' : '';

    hours = hours % 12;
    hours = hours ? hours : 12; // El '0' debería ser '12'
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    

    const timeString = hours + ':' + minutesStr ;
    document.getElementById('clock').textContent = timeString;
}

// Actualiza el reloj cada segundo
setInterval(updateClock, 1000);


//Estado de la batería
function updateBatteryStatus(battery) {
    const batteryStatus = document.getElementById('battery-status');
    const level = Math.floor(battery.level * 100);
    const charging = battery.charging ? '⚡' : '';

    batteryStatus.textContent = ` ${level}% ${charging}`;
}

// Monitoriza el estado de la batería
navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);

    battery.addEventListener('chargingchange', () => updateBatteryStatus(battery));
    battery.addEventListener('levelchange', () => updateBatteryStatus(battery));
});

function checkLatency() {
    const startTime = performance.now();

    // Realiza una solicitud a un recurso de baja latencia (puede ser una imagen pequeña)
    const img = new Image();
    img.src = "https://via.placeholder.com/1x1.png?" + startTime;
    
    img.onload = () => {
        const latency = performance.now() - startTime;
        updateWifiIcon(latency);
    };
}

function updateWifiIcon(latency) {
    const wifiStatus = document.getElementById('wifi-status');

    if (latency < 100) {
        wifiStatus.innerHTML = '<img src="PATH_TO_STRONG_SIGNAL_ICON" alt="Strong Signal">'; // Señal fuerte
        wifiStatus.className = "status-icon low-latency";
    } else if (latency < 300) {
        wifiStatus.innerHTML = '<img src="PATH_TO_MEDIUM_SIGNAL_ICON" alt="Medium Signal">'; // Señal media
        wifiStatus.className = "status-icon medium-latency";
    } else {
        wifiStatus.innerHTML = '<img src="PATH_TO_WEAK_SIGNAL_ICON" alt="Weak Signal">'; // Señal débil o sin conexión
        wifiStatus.className = "status-icon high-latency";
    }
}

// Pantallas
const cryptographyScreen = document.getElementById('cryptography-screen');
const loginScreen = document.getElementById('login-screen');
const comproScreen = document.getElementById('compro-screen');

// Cifrador César
const cryptographyInput = document.getElementById('cryptography-input');
const cryptographyForm = document.getElementById('cryptography-form');
const resultado = document.getElementById('resultado');

// Palabras clave para la segunda interfaz
const claves = ["c", "c", "c"];
const inputs = [
    document.getElementById('password'),
    document.getElementById('password2'),
    document.getElementById('password3')
];
const loginBtn = document.getElementById('login-btn');

// Función para validar las palabras clave de inicio de sesión
const checkLoginPassword = () => {
    return inputs.every((input, index) => input.value.toLowerCase() === claves[index]);
}

// Función para manejar el inicio de sesión
const login = () => {
    if (checkLoginPassword()) {
        loginScreen.classList.add('hidden');
        comproScreen.classList.remove('hidden');
    } else {
        alert('Alguna palabra clave es incorrecta. Intenta de nuevo.');
    }
}


// Función para validar la palabra clave de criptografía
const checkCryptographyPassword = (password) => {
    return password.toLowerCase() === 'Messi';
}

// Función para manejar el formulario de criptografía
const submitCryptography = (e) => {
    e.preventDefault();
    if (checkCryptographyPassword(cryptographyInput.value)) {
        resultado.innerHTML = 'Palabra correcta.';
        setTimeout(() => {
            resultado.innerHTML = '';
            cryptographyScreen.classList.add('hidden');
            loginScreen.classList.remove('hidden');
        }, 700); // 700 milisegundos = 0.7 segundos
    } else {
        resultado.innerHTML = 'Palabra clave incorrecta.';
    }
}

cryptographyForm.addEventListener('submit', submitCryptography);


// Eventos de inicio de sesión
loginBtn.addEventListener('click', login);
inputs.forEach(input => {
    input.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            login();
        }
    });
});

// Evento para descargar la imagen
// Seleccionamos el botón de descarga y la sección que queremos capturar
const downloadBtn = document.getElementById('download-btn');

// Función para descargar el comprobante
const downloadComprobante = () => {
    html2canvas(comproScreen).then(canvas => {
        // Convertimos el canvas a una imagen PNG
        const imgData = canvas.toDataURL('image/png');
        
        // Creamos un enlace para descargar la imagen
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'comprobante.png'; // Nombre del archivo de descarga
        link.click(); // Simulamos un clic en el enlace
    });
}

// Añadimos el evento de clic al botón de descarga
downloadBtn.addEventListener('click', downloadComprobante);


// Evento para descargar la imagen
document.getElementById('download-btn').addEventListener('click', function() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
        let link = document.createElement('a');
        link.download = 'comprobante.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
});
