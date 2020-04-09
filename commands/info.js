const MOMENT = require('moment');

const STARTUP = new Date();

const ping_descriptor = {
    name: 'ping',
    description: 'Returns latency and API ping',
    alias: [],
    run: async (message, args) => {
        const msg = await message.channel.send('🏓 Pinging....');
        const roundtrip_latency = Math.floor(msg.createdTimestamp - message.createdTimestamp);
        
        // TODO(BP); Find out how we distribute context to handlers!
        // const api_latency = Math.round(client.ping);
        
        const api_latency = 0;
        await msg.edit(`🏓 Pong!\nLatency is ${roundtrip_latency}ms\nAPI Latency is ${api_latency}ms`);
    }
};

const stat_descriptor = {
    name: 'stat',
    description: 'Returns bot information',
    alias: [],
    run: async (message, args) => {
        const startup_since = MOMENT(STARTUP).fromNow();
        message.reply(`The bots started ${startup_since}`);
    }
};

module.exports = {
    ping: ping_descriptor,
    stat: stat_descriptor,
};