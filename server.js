const express = require('express');

const port = process.env.PORT || 8000;

const app = express();

app.use('/dist', express.static('dist'));

// Handles HTML5 style requests
app.get('/*', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
