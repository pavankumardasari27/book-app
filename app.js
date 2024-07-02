const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

const app = express();
const port = process.env.PORT || 3005;

// MongoDB connection URL
const mongoURI = 'mongodb://mongo:wvOiRDNfucjiPvpBdqOeRqzklfAtjipn@monorail.proxy.rlwy.net:41480';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: 'majority'
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/books', booksRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${port} is already in use. Trying port ${port + 1}`);
    app.listen(port + 1);
  } else {
    console.error('An error occurred:', err);
  }
});