const express = require('express');
const db = require('./db/connection');
const volleyball = require('volleyball');
const middlewares = require('./middlewares');

require('dotenv').config();
const app = express();
const auth = require('./auth/index');


app.use(volleyball);   //  <---  This is a kind of morgan, tiny http logger
app.use(express.json()); //  <--- This is a build-in bory-parser, very nice :)
app.use(middlewares.checkIsUserAuthorized); //  <--- check is user logged in 
app.use('/auth', auth);
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listening on port: "+port));
