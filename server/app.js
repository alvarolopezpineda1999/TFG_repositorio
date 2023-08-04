const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { API_VERSION } = require('./constants');

const app = express();

//import routings
const authRoutes = require('./router/auth');
const userRoutes = require('./router/user');
const postRoutes = require('./router/post');

//configure Body Parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//configure static folders
app.use(express.static('uploads'));

//configure Header HTTP-CORS
app.use(cors());

//configure routings
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);
app.use(`/api/${API_VERSION}`, postRoutes);

module.exports = app;
