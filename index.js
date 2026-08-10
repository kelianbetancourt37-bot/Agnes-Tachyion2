const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');

const app = express();
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Ellen Joe Bot Activo 🚀'));
app.listen(PORT, () => console.log(`Servidor activo en puerto ${PORT}`));

// UN SOLO CLIENTE CONFIGURADO PARA SERVIDORES EN LA NUBE
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
    executablePath: '/usr/bin/chromium-browser', // Ruta para Linux en Discloud
    headless: true,
    args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu'
    ]
}