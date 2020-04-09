const MONGOOSE = require('mongoose');

const connect = async (mongodb_url) => {
    try {
        const options = { useNewUrlParser: true, useUnifiedTopology: true };
        const connection = await MONGOOSE.createConnection(mongodb_url, options);
        console.log("Opened MongoDB connection");
        return connection;
    } catch (e) {
        throw e;
    }
};

module.exports.connection_factory = connect;

