const User = require('../models/user.model');
const express = require('express');
const bcrypt = require('bcrypt');

let auth = express.Router();

auth.post('/login', async (req, res) => {
    const { credential, password } = req.body;

    try {
        // Find the user by email
        
        let is_email = req.body.credential.includes('@');

        const user = await User.findOne({
            where: is_email ? { email: credential } : { username: credential }
        });

        if (!user) {
            return res.status(400).send('Invalid email or password');
        }

        // Compare the provided password with the stored hash
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }

        // Set the session user object
        req.session.user = user;

        // Redirect to the home page
        res.redirect('/');

    } catch (error) {
        res.status(500).send('An error occurred while logging in');
    }
});

auth.post('/register', async (req, res) => {
    const { email, password, username } = req.body;
  
    // Check if the user already exists
    const user = await User.findOne({ where: { email } });
  
    if (user) {
      return res.status(400).send('Email already in use');
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      username
    });
  
    // Set the session user object
    req.session.user = newUser;
  
    // Redirect to the home page
    res.redirect('/');
});

auth.get('/logout', (req, res) => {
    req.session = null; // This will clear the session cookie
    res.redirect('/'); // Redirect to the home page or wherever you want
});

auth.post('/delete/:id', async (req, res) => {
    try {
        let user = await User.findByPk(Number(req.params.id))

        if (!user) return res.status(404).send('User not found')

        await User.destroy({
            where: {
                id: Number(req.params.id)
            }
        })

        res.redirect('/admin/see_users')
    } catch (e) {
        res.status(404).send(e.message)
    }
})

module.exports = auth;