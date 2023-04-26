/* eslint-disable no-unused-vars */
const express = require('express');

const catRoutes = require('./routes/cats');

// Top
const app = express();

const logger = (req, res, next) => {
  console.log('Host: ', req.hostname);
  console.log('Method: ', req.method);
  console.log('Path: ', req.path);
  next();
};

app.use(logger);

app.use(express.json());

app.use('/cats', catRoutes);

app.use((err, req, res, next) => {
  res.status(err.status).send(err.msg);
});

// 🥺
const server = app.listen(4494, () => console.log(`Server started on ${server.address().port}`));

module.exports = server;
