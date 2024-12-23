const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('open', () => console.log('Connected to MongoDB'));

// Routes
const reviewRoutes = require('./routes/reviews');
app.use('/api/reviews', reviewRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));