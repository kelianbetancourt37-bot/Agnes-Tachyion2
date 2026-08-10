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
        executablePath: path.join(__dirname, 'chrome', 'chrome', 'linux-146.0.7680.31', 'chrome-linux64', 'chrome'),
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('--- ESCANEA ESTE CÓDIGO QR ---');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('¡Bot conectado exitosamente!');
});

// Usamos message_create para interceptar TODOS los mensajes
client.on('message_create', async (msg) => {
    console.log(`Mensaje detectado: "${msg.body}" de ${msg.from}`);

    const texto = msg.body.trim().toLowerCase();

    if (texto === '.menu') {
        await client.sendMessage(msg.from, '🤖 *MENÚ DEL BOT*\n\n1. .ping\n2. .hola');
    }

    if (texto === '.ping') {
        await client.sendMessage(msg.from, 'pong 🏓');
    }
});

client.initialize();
