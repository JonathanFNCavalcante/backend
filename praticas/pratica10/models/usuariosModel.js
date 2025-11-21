const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuario', userSchema);