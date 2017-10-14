require('dotenv').config();
const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// config
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

// routes
app.use('/api/orders', require('./routes/orders'));

// all remaining requests return to react for client routing
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
