const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;

const UserSchema = new Schema();

UserSchema.add({
    discord_id: { type: String, index: true }
});


module.exports.UserSchema = UserSchema;