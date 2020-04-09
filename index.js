require('dotenv').config();

const DISCORD = require('discord.js');
const client = new DISCORD.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', msg => {
    if(msg.content === 'ping') {
        msg.reply('pong');
    }
})

client.login(process.env.DISCORD_TOKEN);