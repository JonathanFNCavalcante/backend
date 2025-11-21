const mongoose = require('mongoose');

const Produto = require('../models/produtosModel');

const criar = async (req, res) => {
    try {
      
        const { nome, preco } = req.body;
        const novoProduto = await Produto.create({ nome, preco });
        
        res.status(201).json(novoProduto);

    } catch (error) {
        res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
};

const listar = async (req, res) => {
    try {
        const produtosCadastrados = await Produto.find({});
        
        res.status(200).json(produtosCadastrados);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const buscar = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Parâmetro inválido" });
        }
        
        const produtoEncontrado = await Produto.findOne({ _id: id });

        if (produtoEncontrado) {
            req.produto = produtoEncontrado;
            return next();
        } else {
            return res.status(404).json({ msg: "Produto não encontrado" });
        }

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const exibir = (req, res) => {
    
    res.status(200).json(req.produto);
};

const atualizar = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, preco } = req.body;

        const produtoAtualizado = await Produto.findOneAndUpdate(
            { _id: id }, 
            { nome, preco },
            { runValidators: true, new: true } 
        );

        res.status(200).json(produtoAtualizado);

    } catch (error) {
        res.status(422).json({ msg: "Nome e preço do produto são obrigatórios" });
    }
};

const remover = async (req, res) => {
    try {
        const { id } = req.params;

        await Produto.findOneAndDelete({ _id: id });

        res.status(204).end();

    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

module.exports = {
    criar,
    listar,
    buscar,
    exibir,
    atualizar,
    remover
};