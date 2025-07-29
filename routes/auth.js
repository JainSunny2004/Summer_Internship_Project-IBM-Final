const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');
const { requireAuth, requireGuest } = require('../middleware/auth');

const router = express.Router();

// Validation rules
const loginValidation = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const signupValidation = [
  body('name')
    .trim()
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters')
];

// Authentication routes
router.get('/login', requireGuest, authController.showLogin);
router.post('/login', requireGuest, loginValidation, authController.login);

router.get('/signup', requireGuest, authController.showSignup);
router.post('/signup', requireGuest, signupValidation, authController.signup);

router.post('/logout', authController.logout);

// Profile routes
router.get('/profile', requireAuth, authController.showProfile);
router.post('/profile', requireAuth, authController.updateProfile);

module.exports = router;
