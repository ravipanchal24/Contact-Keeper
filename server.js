const express = require('express');
const app = express();
const path = require('path');
const connectDB = require('./config/db');
// Connect DB
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));

// Serve static assets {react} in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder i.e. client > 'build' folder {after running 'npm run build' react for production }
    app.use(express.static('client/build'));
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))); // to direct server to load index.html file when running in production 
}

// Declaring where server will start 
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));

