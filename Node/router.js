const express = require('express');
const router = express.Router();
const {login, signup, adminSignup}= require('./controllers/authController')



router.post('/login', login);
router.post('/signup', signup);

router.post('/admin/signup', adminSignup)

module.exports = router;