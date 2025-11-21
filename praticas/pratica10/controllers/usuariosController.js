const { cifrarSenha, gerarToken, compararSenha } = require('../middlewares/authMiddleware');

const Usuario = require('../models/usuariosModel');

async function criar(req, res) {
    try {
        const senhaCifrada = cifrarSenha(req.body.senha);

        const novoUsuario = await Usuario.create({
            email: req.body.email,
            senha: senhaCifrada
        });

        res.status(201).json({
            _id: novoUsuario._id,
            email: novoUsuario.email
        });
    } catch (error) {
        res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
}

async function entrar(req, res) {
    const usuarioEncontrado = await Usuario.findOne({ email: req.body.usuario });

    if (usuarioEncontrado) {
        const senhaConfere = await compararSenha(req.body.senha, usuarioEncontrado.senha);

        if (senhaConfere) {
            const token = gerarToken({ email: req.body.usuario });
            return res.status(200).json({ token: token });
        }
    }

    return res.status(401).json({ msg: "Credenciais inválidas" });
}

async function renovar(req, res) {
    const token = gerarToken({ email: req.usuario });
    res.status(200).json({ token: token });
}

async function remover(req, res) {
    await Usuario.findOneAndDelete({ _id: req.params.id });
    res.status(204).end();
}

module.exports = { criar, entrar, renovar, remover };