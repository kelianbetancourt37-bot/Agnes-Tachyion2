let deniquesUsuario = 1500;
let nivelUsuario = 1;

async function ejecutarComando(client, msg) {
    const textoMensaje = msg.body.trim();
    const args = textoMensaje.split(' ');
    const comando = args[0].toLowerCase();

    // ==================== ADMINISTRACIÓN ====================
    if (comando === '.kick' || comando === '.ban' || comando === '.eliminar' || comando === '.sacar') {
        const chat = await msg.getChat();
        if (!chat.isGroup) {
            await msg.reply('⚠️ Este comando solo se puede usar en grupos.');
            return;
        }
        try {
            const contactosMencionado = await msg.getMentions();
            if (contactosMencionado.length === 0) {
                await msg.reply('⚠️ Por favor, menciona a la persona que deseas expulsar.');
                return;
            }
            await chat.removeParticipants([contactosMencionado[0].id._serialized]);
            await msg.reply('✅ Usuario expulsado con éxito.');
        } catch (error) {
            console.error(error);
            await msg.reply('❌ No se pudo expulsar al usuario. Asegúrate de que el bot sea administrador.');
        }
    } 
    else if (comando === '.del' || comando === '.delete' || comando === '.borrar') {
        try {
            const mensajeCitado = await msg.getQuotedMessage();
            if (mensajeCitado) {
                // Se usa el método seguro para borrar para todos
                await mensajeCitado.delete(true);
            } else {
                await msg.reply('⚠️ Debes responder (citar) al mensaje que deseas borrar.');
            }
        } catch (error) {
            console.error(error);
            // Si el bot no puede borrarlo con el método anterior, intentamos una alternativa o avisamos
            try {
                const mensajeCitado = await msg.getQuotedMessage();
                if (mensajeCitado) await client.sendMessage(msg.from, { delete: mensajeCitado.id });
            } catch (err2) {
                await msg.reply('❌ No se pudo borrar el mensaje. Asegúrate de que sea un mensaje reciente.');
            }
        }
    }
    else if (comando === '.open' || comando === '.abrirgrupo' || comando === '.abrir') {
        const chat = await msg.getChat();
        if (!chat.isGroup) {
            await msg.reply('⚠️ Este comando solo se puede usar en grupos.');
            return;
        }
        try {
            await chat.setMessagesAdminsOnly(false);
            await msg.reply('🔓 Grupo abierto. Todos los participantes pueden enviar mensajes.');
        } catch (error) {
            console.error(error);
            await msg.reply('❌ No se pudo abrir el grupo.');
        }
    }
    else if (comando === '.tag' || comando === '.todos' || comando === '.hidetag') {
        const chat = await msg.getChat();
        if (!chat.isGroup) {
            await msg.reply('⚠️ Este comando solo se puede usar en grupos.');
            return;
        }

        try {
            let text = `📢 *ETIQUETANDO A TODOS* 📢\n\n`;
            let mentions = [];

            for (let participant of chat.participants) {
                const contactId = participant.id._serialized;
                mentions.push(contactId);
                text += `@${participant.id.user} `;
            }

            await chat.sendMessage(text, { mentions });
        } catch (error) {
            console.error(error);
            await msg.reply('❌ Ocurrió un error al intentar mencionar a los miembros del grupo.');
        }
    }

    // ==================== BÚSQUEDA Y DESCARGA MULTIMEDIA (ACTUALIZADO) ====================
    else if (comando === '.mp3' || comando === '.playmp3' || comando === '.musica') {
        const query = args.slice(1).join(' ');
        if (!query) {
            await msg.reply('⚠️ Por favor, escribe el nombre de la canción que deseas buscar.\nEjemplo: `.mp3 Perfect - Ed Sheeran`');
            return;
        }
        await msg.reply('⚠️ *Aviso:* Las descargas multimedia automáticas están temporalmente desactivadas para mantener el bot rápido y sin bloqueos.');
    }
    else if (comando === '.mp4' || comando === '.playmp4' || comando === '.video') {
        const query = args.slice(1).join(' ');
        if (!query) {
            await msg.reply('⚠️ Por favor, escribe el nombre o enlace del video que deseas buscar.\nEjemplo: `.mp4 trailer gta vi`');
            return;
        }
        await msg.reply('⚠️ *Aviso:* Las descargas de video automáticas están temporalmente desactivadas.');
    }
    else if (comando === '.fb' || comando === '.facebook' || comando === '.fbdl') {
        await msg.reply('⚠️ Función de descarga de Facebook temporalmente desactivada.');
    } else if (comando === '.ig' || comando === '.instagram' || comando === '.insta') {
        await msg.reply('⚠️ Función de descarga de Instagram temporalmente desactivada.');
    } else if (comando === '.tiktok' || comando === '.tt' || comando === '.tk') {
        await msg.reply('⚠️ Función de descarga de TikTok temporalmente desactivada.');
    } else if (comando === '.yt' || comando === '.youtube' || comando === '.play' || comando === '.play1') {
        await msg.reply('⚠️ Función de reproducción de YouTube temporalmente desactivada.');
    } else if (comando === '.spotify' || comando === '.spot' || comando === '.playspot') {
        await msg.reply('⚠️ Función de Spotify temporalmente desactivada.');
    } else if (comando === '.pinterest' || comando === '.pin' || comando === '.pins') {
        await msg.reply('⚠️ Función de Pinterest temporalmente desactivada.');
    }
    else if (comando === '.mediafire' || comando === '.mf') {
        const url = args[1];
        if (!url) {
            await msg.reply('⚠️ Ingresa un enlace de MediaFire válido.\nEjemplo: `.mediafire https://www.mediafire.com/file/...`');
            return;
        }
        if (!url.includes('mediafire.com')) {
            await msg.reply('❌ El enlace proporcionado no pertenece a MediaFire.');
            return;
        }
        await msg.reply('⚠️ *Nota:* La descarga directa automática de MediaFire requiere complementos adicionales. Abre el enlace directamente en tu navegador.');
    }

    // ==================== RPG / GACHA ====================
    else if (comando === '.perfil' || comando === '.profile' || comando === '.bal' || comando === '.balance') {
        const perfilTexto = `🦈 Proxy *Nevi*
⭐ Lv.*${nivelUsuario}* ·  ◈ *${deniquesUsuario}* deniques`;
        await msg.reply(perfilTexto);
    } else if (comando === '.baltop' || comando === '.topbal' || comando === '.topcoins' || comando === '.topdinero') {
        await msg.reply(`🏆 *Top de Deniques*\n1. Nevi - ${deniquesUsuario} deniques ⭐`);
    } else if (comando === '.trabajar' || comando === '.work' || comando === '.curro' || comando === '.job') {
        deniquesUsuario += 150;
        await msg.reply(`💼 Has trabajado duro y ganaste *150 deniques* ◈.`);
    } else if (comando === '.daily' || comando === '.diario' || comando === '.claim') {
        deniquesUsuario += 500;
        await msg.reply(`🎁 Recompensa diaria reclamada: *500 deniques* ◈!`);
    } else if (comando === '.tienda' || comando === '.shop' || comando === '.films' || comando === '.peliculas') {
        await msg.reply(`🛒 *Tienda de Películas*\nUsa *.comprar <nombre>* para adquirir una.`);
    } else if (comando === '.nivel' || comando === '.level' || comando === '.xp' || comando === '.lvl') {
        await msg.reply(`📈 Nivel actual: *${nivelUsuario}* (XP: 0/100)`);
    }

    // ==================== MENÚ ====================
    else if (comando === '.menu' || comando === '.help' || comando === '.ayuda') {
        const menuTexto = `╭━━━〔 🦈 *Agnes-Tachyion Bot* 〕━━━╮
🦈 Proxy *Nevi*
⭐ Lv.*${nivelUsuario}* ·  ◈ *${deniquesUsuario}* deniques
◇────────────────◇

╭─〔 🛠️ *ADMINISTRADOR* 〕
┊ ✦ *.kick* - Eliminar usuario del grupo
┊ ✦ *.del* - Borrar mensaje citado
┊ ✦ *.close* - Cerrar Grupo
┊ ✦ *.open* - Abrir Grupo
┊ ✦ *.tag* - Mencionar a todos los miembros
╰───────────────╯

╭─〔 📥 *DESCARGAS & MÚSICA* 〕
┊ ✦ *.mp3* - Música MP3 (En pausa)
┊ ✦ *.mp4* - Video MP4 (En pausa)
┊ ✦ *.fb* - Facebook
┊ ✦ *.ig* - Instagram
┊ ✦ *.tiktok* - TikTok
┊ ✦ *.yt* - YouTube
┊ ✦ *.spotify* - Spotify
┊ ✦ *.pinterest* - Pinterest
┊ ✦ *.mediafire* - Enlace directo
╰───────────────╯

╭─〔 🎮 *RPG / GACHA* 〕
┊ ✦ *.perfil* - Ver tu perfil Proxy
┊ ✦ *.baltop* - Top de deniques
┊ ✦ *.trabajar* - Ganar deniques
┊ ✦ *.daily* - Recompensa diaria
┊ ✦ *.tienda* - Tienda de películas
┊ ✦ *.nivel* - Ver nivel y XP
╰───────────────╯
╰━━━━〔 🦈 〕━━━━╯`;
        await msg.reply(menuTexto);
    }
}

module.exports = { ejecutarComando };