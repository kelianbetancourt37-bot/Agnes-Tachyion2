const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

app.get('/', (req, res) => res.send('Bot Activo 🚀'));
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        // RUTA CORRECTA APUNTANDO A LA CARPETA LOCAL:
        executablePath: path.join(__dirname, 'chrome', 'chrome', 'linux-146.0.7680.31', 'chrome-linux64', 'chrome'),
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// Asegúrate de importar qrcode-terminal al inicio
const qrcode = require('qrcode-terminal');

// ... tu configuración del cliente ...

// EVENTO PARA GENERAR Y MOSTRAR EL QR
client.on('qr', (qr) => {
    console.log('\n========================================');
    console.log('ESCANEA ESTE CÓDIGO QR CON TU WHATSAPP:');
    console.log('========================================\n');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Bot conectado y listo para usar!');
});

client.on('ready', () => {
    console.log('¡Bot conectado exitosamente!');
});

client.initialize();
