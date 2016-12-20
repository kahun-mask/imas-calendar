process.env.PORT = process.env.PORT || 8080;

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const routes = require('./routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);

// Error Handling
app.use(function(err, req, res, next) { // eslint-disable-line
  res.status(500).send('Internal Server Error');
});

app.listen(process.env.PORT);

