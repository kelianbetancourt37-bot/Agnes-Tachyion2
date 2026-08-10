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

// ESCUCHAMOS TANTO 'message' COMO 'message_create' PARA ASEGURAR GRUPOS Y CHATS DIRECTOS
const handleMessage = async (msg) => {
    // Ver lo que entra en los Logs de Render
    console.log(`📩 Mensaje recibido de ${msg.from}: "${msg.body}"`);

    const texto = msg.body.trim().toLowerCase();

    if (texto === '.menu') {
        await msg.reply('🤖 *MENÚ PRINCIPAL*\n\n1. .ping - Test de conexión\n2. .hola - Saludo');
    } else if (texto === '.ping') {
        await msg.reply('pong 🏓');
    } else if (texto === '.hola') {
        await msg.reply('¡Hola! El bot te responde correctamente.');
    }
};

client.on('message', handleMessage);
client.on('message_create', async (msg) => {
    // Responder cuando el propio número del bot manda el mensaje en un grupo
    if (msg.fromMe) {
        await handleMessage(msg);
    }
});

client.initialize();
