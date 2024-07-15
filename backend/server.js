const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); 

// Database connection
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/users', require('./routes/userRoutes'));

// Start server
const PORT = process.env.PORT || config.port;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
