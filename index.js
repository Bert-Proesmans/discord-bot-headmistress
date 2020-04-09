const DOTENV = require('dotenv');
const ASSERT = require('assert');

const MOMENT = require('moment');
const MONGO = require('./mongo-util.js');
const DISCORD = require('./discord-util.js');
const SCHEMAS = require('./schemas.js');

// const DIALOGFLOW = require('@google-cloud/dialogflow');


const STARTUP = new Date();
DOTENV.config();

const construct_models = async (mongo_connection) => {
    const model_mapping = {
        "User": mongo_connection.model("User", SCHEMAS.UserSchema),
    }

    return model_mapping;
};

const construct_message_handler = async (model_mapping) => {
    return async (command, message) => {
        if (message.content.includes('stats')) {
            const startup_since = MOMENT(STARTUP).fromNow();
            message.reply(`The bots started ${startup_since}`);
        }

        return;
    }
};

MONGO.connection_factory(process.env.MONGO_URL)
    .then(construct_models)
    .then(construct_message_handler)
    .then((handler) => DISCORD.connection_factory(process.env.DISCORD_TOKEN, handler))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });