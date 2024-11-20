// const nodemailer = require('nodemailer');
// const crypto = require('crypto');

// // MongoDB and other required imports...

// // Forgot Password route to generate token and send email
// app.post('/forgot-password', async (req, res) => {
//     const { email } = req.body;

//     // Find the user by email
//     const user = await Users.findOne({ form2Example1_signup: email });
//     if (!user) {
//         return res.status(400).json({ success: false, message: "Email not found." });
//     }

//     // Generate a token for the password reset link
//     const resetToken = crypto.randomBytes(20).toString('hex');
    
//     // Save the token in the database for this user (You can set an expiry for it)
//     user.resetPasswordToken = resetToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiry
//     await user.save();

//     // Create a password reset link with the token
//     const resetLink = `http://localhost:4000/reset-password/${resetToken}`;

//     // Setup Nodemailer transporter
//     const transporter = nodemailer.createTransport({
//         service: 'gmail', // Use your email service (Gmail for example)
//         auth: {
//             user: 'your-email@gmail.com', // Replace with your email
//             pass: 'your-email-password'    // Replace with your email password or app password
//         }
//     });

//     // Email content
//     const mailOptions = {
//         from: 'your-email@gmail.com',
//         to: email,
//         subject: 'Password Reset Request',
//         text: `You requested a password reset. Click the link to reset your password: ${resetLink}`
//     };

//     // Send email with reset link
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return res.status(500).json({ success: false, message: "Error sending email." });
//         }
//         res.status(200).json({ success: true, message: "Password reset link sent to email." });
//     });
// });

// // Reset Password Route
// app.get('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;

//     // Find user with the reset token and check expiry
//     const user = await Users.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() } // Token not expired
//     });

//     if (!user) {
//         return res.status(400).json({ success: false, message: "Invalid or expired token." });
//     }

//     // Render a form to reset password (you can create a separate HTML page for this)
//     res.send(`
//         <form action="/reset-password/${token}" method="POST">
//             <input type="password" name="newPassword" placeholder="Enter New Password" required />
//             <button type="submit">Reset Password</button>
//         </form>
//     `);
// });

// // Handle password reset submission
// app.post('/reset-password/:token', async (req, res) => {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     const user = await Users.findOne({
//         resetPasswordToken: token,
//         resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//         return res.status(400).json({ success: false, message: "Invalid or expired token." });
//     }

//     // Hash the new password and save it
//     const salt = await bcrypt.genSalt(10);
//     user.form2Example2_signup = await bcrypt.hash(newPassword, salt);
    
//     // Clear the reset token
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;
    
//     await user.save();

//     res.status(200).json({ success: true, message: "Password reset successful." });
// });
