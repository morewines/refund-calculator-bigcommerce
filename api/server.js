require('dotenv').config();
const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

//Config
//
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

//Routes

app.use('/api/orders', require('./routes/orders'));

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
