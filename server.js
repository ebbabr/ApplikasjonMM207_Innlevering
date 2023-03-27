const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'frontend')));

// Serve the index page for all other routes
app.get('*', (req, res) => {
  const indexFilePath = path.join(__dirname, 'frontend', 'index.html');
  res.sendFile(indexFilePath, err => {
    if (err) {
      console.error(`Error sending file: ${indexFilePath}`, err);
      res.status(err.status).end();
    }
  });
});


// Serve event.js for /event.js route
app.get('/event.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'event.js'));
});

// Serve form.js for /form route
app.get('/form.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'form.js'));
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});