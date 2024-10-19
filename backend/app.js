const express = require('express');
const mongoose = require('mongoose');
const ruleRoutes = require('./routes/ruleRoutes');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

app.use('/api', ruleRoutes);






mongoose.connect('mongodb://localhost/ruleengine', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")));
