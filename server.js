const express = require('express');
const app = express();
const connectDB = require('./config/db');
// Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Handle get request to '/' route
app.get('/', (req, res) => res.send({ msg: 'Welcome to the contact keeper API..' }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Declaring where server will start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

