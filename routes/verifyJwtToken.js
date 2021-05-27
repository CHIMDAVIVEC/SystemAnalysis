const jwt = require('jsonwebtoken');

function verifiedFunction(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    return next();
  } catch (error) {
    return res.status(400).send('Неверный токен');
  }
}

function checkAdmin(req, res, next) {
  if (req.user.role === 'admin') {
    return next();
  }
  return res
    .status(401)
    .send('Доступ запрещён: необходимы права администратора');
}

module.exports = { verifiedFunction, checkAdmin };
