const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Used for password hashing and comparison
const path = require('path');
const port = 4000;

const app = express();

// Middleware to serve static files and parse form data
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/jetsetjourneyfinal', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.once('open', () => {
    console.log("MongoDB connection established");
});
db.on('error', (error) => {
    console.error("MongoDB connection error:", error);
});

// Define Mongoose schema for Sign-Up
const userSchema = new mongoose.Schema({
    form2Example1_signup: {
        type: String,
        required: true,
        unique: true,  // Ensures unique email
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation regex
    },
    form2Example2_signup: {
        type: String,
        required: true,
        minlength: 8,  // Enforce password length
        match: [/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'] // Password must contain a special character
    }
});

// Pre-save middleware to hash passwords before saving
userSchema.pre('save', async function (next) {
    try {
        if (this.isModified('form2Example2_signup') || this.isNew) {
            const salt = await bcrypt.genSalt(10);
            this.form2Example2_signup = await bcrypt.hash(this.form2Example2_signup, salt);
        }
        next();
    } catch (err) {
        next(err);
    }
});

const Users = mongoose.model("users", userSchema);

// Serve the index.html file on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle Sign-Up form submission
app.post('/signup', async (req, res) => {
    try {
        const { form2Example1_signup, form2Example2_signup, form2Example2_confirm } = req.body;

        // Validate passwords match
        if (form2Example2_signup !== form2Example2_confirm) {
            return res.status(400).send("Passwords do not match.");
        }

        // Create and save the user
        const user = new Users({
            form2Example1_signup,
            form2Example2_signup
        });

        await user.save();
        console.log(user);

        res.send("Sign-Up form submitted successfully");
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).send("Error submitting Sign-Up form");
    }
});

// Handle Login form submission
app.post('/login', async (req, res) => {
    try {
        const { form2Example1_signin, form2Example2_signin } = req.body;

        // Find the user by email
        const user = await Users.findOne({ form2Example1_signup: form2Example1_signin });
        if (!user) {
            return res.status(400).send("User not found. Please sign up first.");
        }

        // Compare the entered password with the hashed password in the database
        const isMatch = await bcrypt.compare(form2Example2_signin, user.form2Example2_signup);
        if (!isMatch) {
            return res.status(400).send("Incorrect password.");
        }

        // If login is successful
        res.status(200).send("Login successful!");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Error during login process.");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
