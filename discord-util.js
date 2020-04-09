const DISCORD = require('discord.js');

const construct_message_handler = (command_handler) => {
    return async (message) => {
        console.log(`Got message: ${message.content}`);

        try {
            /* General message prefiltering */

            if (message.author.bot) {
                // Prevent the bot from triggering on itself.
                return;
            }

            if (!message.guild) {
                // Dissalow private messaging the bot at this point.
                message.reply("Back to your quarters!");
                return;
            }

            // Extract a bot command, if detected!
            let command = "";
            // TODO(BP);

            await command_handler(command, message);
        } catch (e) {
            console.error("Message processing error, ignoring\n", e);
            // Silence the exception.
        }
    }
};

const connect = async (discord_token, command_handler) => {
    try {
        const connection = new DISCORD.Client();
        connection.on('message', construct_message_handler(command_handler));

        await connection.login(discord_token);
        console.log(`Logged in as ${connection.user.tag}`);

        await connection.user.setPresence({ status: "idle" });
        return connection;
    } catch (e) {
        throw e;
    }
};

module.exports.connection_factory = connect;