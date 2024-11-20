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

// // Define Mongoose schema for Sign-Up
// const userSchema = new mongoose.Schema({
//     form2Example1_signup: {
//         type: String,
//         required: true,
//         unique: true,  // Ensures unique email
//         match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation regex
//     },
//     form2Example2_signup: {
//         type: String,
//         required: true,
//         minlength: 8,  // Enforce password length
//         match: [/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character'] // Password must contain a special character
//     }
// });
const userSchema = new mongoose.Schema({
    form2Example1_signup: {
        type: String,
        required: true,
        unique: true,  
        match: [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    form2Example2_signup: {
        type: String,
        required: true,
        minlength: 8,
        match: [/(?=.*[!@#$%^&*])/, 'Password must contain at least one special character']
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
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
const nodemailer = require('nodemailer');
const crypto = require('crypto');

// MongoDB and other required imports...

// Forgot Password route to generate token and send email
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    // Find the user by email
    const user = await Users.findOne({ form2Example1_signup: email });
    if (!user) {
        return res.status(400).json({ success: false, message: "Email not found." });
    }

    // Generate a token for the password reset link
    const resetToken = crypto.randomBytes(20).toString('hex');
    
    // Save the token in the database for this user (You can set an expiry for it)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    // Create a password reset link with the token
    const resetLink = `http://localhost:4000/reset-password/${resetToken}`;

    // Setup Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email service (Gmail for example)
        auth: {
            user: 'your-email@gmail.com', // Replace with your email
            pass: 'your-email-password'    // Replace with your email password or app password
        }
    });

    // Email content
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: email,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`
    };

    // Send email with reset link
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({ success: false, message: "Error sending email." });
        }
        res.status(200).json({ success: true, message: "Password reset link sent to email." });
    });
});

// Reset Password Route
app.get('/reset-password/:token', async (req, res) => {
    const { token } = req.params;

    // Find user with the reset token and check expiry
    const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() } // Token not expired
    });

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    // Render a form to reset password (you can create a separate HTML page for this)
    res.send(`
        <form action="/reset-password/${token}" method="POST">
            <input type="password" name="newPassword" placeholder="Enter New Password" required />
            <button type="submit">Reset Password</button>
        </form>
    `);
});

// Handle password reset submission
app.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
        return res.status(400).json({ success: false, message: "Invalid or expired token." });
    }

    // Hash the new password and save it
    const salt = await bcrypt.genSalt(10);
    user.form2Example2_signup = await bcrypt.hash(newPassword, salt);
    
    // Clear the reset token
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful." });
});
