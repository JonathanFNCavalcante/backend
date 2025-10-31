const express = require('express');

const { gerarToken, verificarToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', (req, res) => {
  try {

    const payload = { email: req.body.usuario };

    const token = gerarToken(payload);
    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

router.post('/renovar', verificarToken, (req, res) => {
  try {

    const payload = { email: req.usuario.email };
    
    const token = gerarToken(payload);

    res.status(200).json({ token });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

module.exports = router;