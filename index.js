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

// ==========================================
// AQUÍ ES DONDE EL BOT LEE Y RESPONDE MENSAJES
// ==========================================
client.on('message_create', async (msg) => {
    // Imprime en la consola para confirmar que Render recibe los mensajes
    console.log(`Mensaje recibido: ${msg.body}`);

    // Comando .menu
    if (msg.body === '.menu') {
        await msg.reply('🤖 *MENÚ PRINCIPAL*\n\n1. Hola - Saludo\n2. .ping - Test de conexión');
    }

    // Comando .ping
    if (msg.body === '.ping') {
        await msg.reply('pong 🏓');
    }
});

client.initialize();
