const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const superAdminRoutes = require('./routes/superRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', adminRoutes);
app.use('/', superAdminRoutes);
app.use('/', userRoutes);



mongoose.connect(process.env.MONGODB_URI, {
  }); 
  
  const db = mongoose.connection;
  db.once('open', () => {
    console.log('connected to db');
  });
  db.on('error', (err) => {
    console.error(err);
  });


app.listen(process.env.PORT || 3037, () => {
    console.log(`Listening on port ${process.env.PORT || 3037}`);
  });