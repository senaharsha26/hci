const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Import path module

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hci')
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// User schema and model
const userSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    lName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model('user', userSchema);

// Handle POST request for signup
app.post('/signup', async (req, res) => {
    try {
        const { fName, lName, email, password } = req.body;

        if (!fName || !lName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = new User({ fName, lName, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Handle POST request to /login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find user in the database
        const user = await User.findOne({ email, password });

        if (user) {
            res.json({ message: 'Login successful', userDetails: user });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(8000, () => {
    console.log('Server running on port 8000');
});
