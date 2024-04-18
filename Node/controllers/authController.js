const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const admin_secret = "imcipher"

const signup = async (req, res) => {
    const userData = req.body;
console.log(userData)    

    User.findUserByEmail(userData.email, (err, user) => {
        if (err) {


            return res.status(500).json({ error: 'Internal server error' });
        }
        if (user) {

            return res.status(400).json({ error: 'User already exists' });
        }


        bcrypt.hash(userData.password, 10, (err, hashedPassword) => {


            if (err) {
console.log(err)
                return res.status(500).json({ error: 'Error hashing password' });
            }
            userData.password = hashedPassword;

            User.createUser(userData, async (err, result) => {

                if (err) {
                    return res.status(500).json({ error: 'Error creating user 1' });
                }

                res.status(201).json({ message: 'User created successfully' });
            });


        });

    });
};

const login = async (req, res) => {

    const { email, password } = req.body;

    User.findUserByEmail(email, (err, user) => {

        if (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        bcrypt.compare(password, user.password, (err, result) => {


            if (err || !result) {
                return res.status(401).json({ error: 'Authentication failed' });
            }

            const token = jwt.sign({

                email: user.email
            }, 'your_secret_key', { expiresIn: '1h' });


            res.json({ user: user.email, token });

        });
    });
};




//Admin controller

//for testing our php application we needs to create our admin;
const adminSignup = async (req, res) => {


    const userData = req.body;

    //here i am using a secret to create admin
    if (userData.secret) {

        if (userData.secret === admin_secret) {


            User.findAdminByEmail(userData.email, (err, user) => {
                if (err) {


                    return res.status(500).json({ error: 'Internal server error' });
                }
                if (user) {

                    return res.status(400).json({ error: 'Admin already exists' });
                }


                bcrypt.hash(userData.password, 10, (err, hashedPassword) => {


                    if (err) {

                        return res.status(500).json({ error: 'Error hashing password' });
                    }
                    userData.password = hashedPassword;

                    User.createAdmin(userData, async (err, result) => {

                        if (err) {
                            return res.status(500).json({ error: 'Error creating user 1' });
                        }

                        res.status(201).json({ message: 'Admin created successfully' });
                    });


                });

            });

        }
        else {
            res.status(500).json({ message: "secret did not match" })
        }
    }
    else {
        res.status(300).json({ message: "secret field is required  to create admin" })
    }












}






module.exports = { login, signup, adminSignup };