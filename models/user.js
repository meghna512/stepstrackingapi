const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    }
});

UserSchema.index({ phoneNumber: 1 }); 
const users = mongoose.model('user', UserSchema);

module.exports = users;
