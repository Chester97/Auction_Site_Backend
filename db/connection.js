const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/auctionDB',{ autoIndex: true, useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, },() => console.log("Connected to DB"));

module.exports = db;