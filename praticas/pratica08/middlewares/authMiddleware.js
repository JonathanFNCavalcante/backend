const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ msg: 'Não autorizado' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {

    return res.status(401).json({ msg: 'Token inválido' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = decoded;

    next();

  } catch (error) {
 
    return res.status(401).json({ msg: 'Token inválido' });
  }
};

const gerarToken = (payload) => {
  try {
  
    const expiresIn = 120;

    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn }
    );

  } catch (error) {
    console.error(error); 
    throw new Error('Erro ao gerar o token');
  }
};

module.exports = {
  verificarToken,
  gerarToken
};