#!/usr/bin/env node
"use strict";

const fs = require('fs');
const express = require('express');

const port = process.env.PORT || 8000;

const app = express();

app.use('/dist', express.static('dist', {
  extensions: 'js'
}));

// This serves the current file paths to the app so it can edit the right files
app.engine('html', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err);
    let rendered = content.toString()
      .replace('#rootPath#', 'file:///usr/src/app/sources/')
      .replace('#jsPath#', 'file:///usr/src/app/sources/file.js');
    return callback(null, rendered)
  });
});
app.set('views', '');
app.set('view engine', 'html');

// Handles HTML5 style requests
app.get('/*', function(req, res) {
  res.render('index.html');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
