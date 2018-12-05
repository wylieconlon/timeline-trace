const express = require('express');
const https = require('https');

const port = process.env.PORT || 8000;

const app = express();

app.use('/dist', express.static('dist'));

// Handles HTML5 style requests
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
