
const db = require('../databaseConnection/dbConnect');
const bcrypt = require('bcrypt');
const createToken = require('../middleware/createToken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const checkPlanValidity = require('../functions/checkPlanValidity');

exports.register = async (req, res) => {  
        const { name, email, number, password } = req.body;  
    
        if (!name || !email || !number || !password) {  
            return res.status(400).json({ error: 'All fields are required: name, email, number, password' });  
        }  
        const hashedPassword = await bcrypt.hash(password, 10);  
        db.execute('CALL RegisterUser(?, ?, ?, ?)', [name, email, number, hashedPassword], (err, results) => {  
            if (err) return res.status(500).json({ error: err.message });  
            const token = createToken(results[0][0].userId);  
            res.status(201).json({ message: 'User registered successfully!', userId: results[0][0].userId, token });  
        });  
    }

exports.login = async (req, res) => {
    const { number, password } = req.body;

    if (!number || !password) {
        return res.status(400).json({ error: 'Number and password are required' });
    }

    db.execute('CALL LoginUser(?)', [number], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!results[0] || results[0].length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = results[0][0];
        const storedHashedPassword = user.password;

        try {
            const isMatch = await bcrypt.compare(password, storedHashedPassword);

            if (!isMatch) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Successful login
            const token = createToken(user.userId);
            res.json({ message: 'Login successful', userId: user.userId, token });
        } catch (bcryptError) {
            console.error(bcryptError);
            return res.status(500).json({ error: 'Internal server error' });
        }
    });
};

exports.userDetails = (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
    }

    db.execute('CALL GetUserDetails(?)', [userId], (err, results) => {
        if (err) {
            console.error(err); 
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!results[0] || results[0].length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userDetails = results[0][0];

        db.execute('CALL GetMiniWebsitesByUserId(?)', [userId], async (err, websiteResults) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal server error while fetching websites' });
            }

            try {
                const plan = await checkPlanValidity(userId);

                const response = {
                    name: userDetails.name,
                    number: userDetails.number,
                    plan: plan,
                    websites: websiteResults[0] || [],
                };

                res.json(response);

            } catch (planCheckError) {
                console.error('Error getting:', planCheckError);
                res.status(500).json({ error: 'Error getting user details' });
            }

        });
    });
}

exports.getId = (req, res) => {
    res.json({ userId: req.userData.id })
}

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Generate token without hashing
        const resetToken = crypto.randomBytes(32).toString('hex');
        
        const resetTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');

        // Check if user exists
        db.execute('CALL GetUserByEmail(?)', [email], async (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            if (!results[0] || results[0].length === 0) {
                return res.status(200).json({ 
                    message: 'If a user with this email exists, they will receive a password reset link' 
                });
            }

            const userId = results[0][0].userId;

            // Save the token directly without hashing
            db.execute('CALL SaveResetToken(?, ?, ?)', 
                [userId, resetToken, resetTokenExpiry], 
                async (err) => {
                    if (err) {
                        console.error('Token save error:', err);
                        return res.status(500).json({ error: 'Internal server error' });
                    }

                    try {
                        const transporter = nodemailer.createTransport({
                            host: process.env.SMTP_HOST,
                            port: process.env.SMTP_PORT,
                            secure: false,
                            auth: {
                                user: process.env.EMAIL_USER,
                                pass: process.env.EMAIL_PASS,
                            },
                        });

                        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
                        
                        const mailOptions = {
                            from: `"Your App Name" <${process.env.EMAIL_USER}>`,
                            to: email,
                            subject: 'Password Reset Request',
                            html: `
                                <h2>Password Reset Request</h2>
                                <p>You requested a password reset. Click the button below to reset your password:</p>
                                <a href="${resetLink}" style="padding: 10px 20px; background: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
                                <p>This link will expire in 1 hour.</p>
                                <p>If you didn't request this, please ignore this email.</p>
                            `,
                        };

                        await transporter.sendMail(mailOptions);
                        
                        return res.status(200).json({ 
                            message: 'If a user with this email exists, they will receive a password reset link' 
                        });
                    } catch (emailError) {
                        console.error('Email error:', emailError);
                        return res.status(500).json({ error: 'Error sending email' });
                    }
                }
            );
        });
    } catch (error) {
        console.error('Reset request error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
    
    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

    try {
        console.log('Attempting to reset password with token:', token);
        
        // Add current server time logging
        console.log('Current server time:', new Date().toISOString());
        
        db.execute('CALL GetUserByResetToken(?)', [token], async (err, results) => {
            if (err) {
                console.error('Token verification error:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            console.log('Full database response:', JSON.stringify(results, null, 2));

            if (!results[0] || results[0].length === 0) {
                // Query the database directly to see if token exists at all
                db.execute(
                    'SELECT userId, resetToken, resetTokenExpiry FROM users WHERE resetToken = ?',
                    [token],
                    (err, directResults) => {
                        if (err) {
                            console.error('Direct query error:', err);
                        } else {
                            console.log('Direct query results:', JSON.stringify(directResults, null, 2));
                        }
                    }
                );
                
                return res.status(400).json({ error: 'Invalid or expired reset token' });
            }

            const user = results[0][0];
            console.log('Found user data:', user);

            // Convert expiry time to UTC for consistent comparison
            const tokenExpiry = new Date(user.resetTokenExpiry);
            const now = new Date();
            
            console.log('Token expiry (UTC):', tokenExpiry.toUTCString());
            console.log('Current time (UTC):', now.toUTCString());

            if (now > tokenExpiry) {
                console.log('Token has expired');
                return res.status(400).json({ error: 'Reset token has expired' });
            }

            try {
                if (newPassword.length < 8) {
                    return res.status(400).json({ 
                        error: 'Password must be at least 8 characters long' 
                    });
                }

                const hashedPassword = await bcrypt.hash(newPassword, 10);

                db.execute('CALL UpdatePasswordAndClearToken(?, ?)', 
                    [user.userId, hashedPassword], 
                    (err, updateResult) => {
                        if (err) {
                            console.error('Password update error:', err);
                            return res.status(500).json({ error: 'Internal server error' });
                        }
                        
                        console.log('Password updated successfully');
                        return res.status(200).json({ message: 'Password has been reset successfully' });
                    }
                );
            } catch (hashError) {
                console.error('Password hashing error:', hashError);
                return res.status(500).json({ error: 'Error processing new password' });
            }
        });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};