const DOTENV = require('dotenv');
const ASSERT = require('assert');

const MONGO = require('./mongo-util.js');
const DISCORD = require('./discord-util.js');
const SCHEMAS = require('./schemas.js');
const UTIL = require('./util.js');

const INFO_HANDLERS = require('./commands/info.js');

// const DIALOGFLOW = require('@google-cloud/dialogflow');
DOTENV.config();

const construct_models = async (mongo_connection) => {
    const model_mapping = {
        "User": mongo_connection.model("User", SCHEMAS.UserSchema),
    }

    return model_mapping;
};

const construct_message_handler = async (model_mapping) => {
    // TODO(BP); Load commands through name and aliases!
    const commands = {
        "ping": INFO_HANDLERS.ping,
        "stat": INFO_HANDLERS.stat,
    };
    var commandKeys = Object.keys(commands);
    
    return async (command, message) => {
        // TODO(BP); Use command argument
        UTIL.asyncForEach(commandKeys, async (command) => {
            if(message.content.includes(command)) {
                await commands[command].run(message);
            }
        });
    };
};

MONGO.connection_factory(process.env.MONGO_URL)
    .then(construct_models)
    .then(construct_message_handler)
    .then((handler) => DISCORD.connection_factory(process.env.DISCORD_TOKEN, handler))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });