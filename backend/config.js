export const PORT = 5555;

require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
