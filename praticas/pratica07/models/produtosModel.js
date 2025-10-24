const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true,
            minlength: 3 
        },
        preco: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true 
    }
);

module.exports = mongoose.model('Produto', schema);