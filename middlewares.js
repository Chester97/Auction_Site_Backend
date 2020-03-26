const jwt = require('jsonwebtoken');

function checkIsUserAuthorized(req,res,next) {
  req.loggedUser = null;
  const authHeader = req.get('authorization');
  if(!authHeader) return next();

  const token = authHeader.split(' ')[1];
  if(!token) return next();

  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  req.loggedUser = user;
  return next();
}

function notFound(req,res,next) {
  res.status(404);
  const error = new Error("Not Found - " + req.originalUrl);
  next(error);
}

function errorHandler(err,req,res,next) {
  res.status(res.statusCode || 500);
  res.json({
    message: err.message,
    stack: err.stack,
  });
}

module.exports = { checkIsUserAuthorized, notFound, errorHandler };