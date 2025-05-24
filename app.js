// app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const { Pool } = require('pg');

const app = express();

// --- PostgreSQL Setup ---
// const pool = new Pool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// });

// // Test DB connection
// pool.connect((err, client, release) => {
//   if (err) {
//     console.error('❌ PostgreSQL connection error:', err.stack);
//   } else {
//     console.log('✅ Connected to PostgreSQL database');
//     release();
//   }
// });

// --- Middleware ---
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret',
  resave: false,
  saveUninitialized: false,
}));

// Static files
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(express.static('public'));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes
const indexRoutes = require('./src/routes/index');
app.use('/', indexRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server started at http://localhost:${PORT}`);
});
