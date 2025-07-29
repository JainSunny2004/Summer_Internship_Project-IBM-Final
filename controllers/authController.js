const User = require('../models/User');
const { validationResult } = require('express-validator');

class AuthController {
  // Show login page
  showLogin(req, res) {
    res.render('login', { title: 'Login' });
  }

  // Show signup page
  showSignup(req, res) {
    res.render('signup', { title: 'Sign Up' });
  }

  // Handle login
  async login(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/auth/login');
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        req.flash('error', 'Invalid email or password');
        return res.redirect('/auth/login');
      }

      req.session.user = {
        id: user._id,
        email: user.email,
        name: user.name
      };

      req.flash('success', 'Welcome back!');
      res.redirect('/');
    } catch (error) {
      console.error('Login error:', error);
      req.flash('error', 'An error occurred during login');
      res.redirect('/auth/login');
    }
  }

  // Handle signup
  async signup(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash('error', errors.array()[0].msg);
        return res.redirect('/auth/signup');
      }

      const { name, email, password } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        req.flash('error', 'User with this email already exists');
        return res.redirect('/auth/signup');
      }

      // Create new user
      const user = new User({ name, email, password });
      await user.save();

      req.session.user = {
        id: user._id,
        email: user.email,
        name: user.name
      };

      req.flash('success', 'Account created successfully!');
      res.redirect('/');
    } catch (error) {
      console.error('Signup error:', error);
      req.flash('error', 'An error occurred during signup');
      res.redirect('/auth/signup');
    }
  }

  // Handle logout
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
      }
      res.redirect('/');
    });
  }

  // Show profile page
  async showProfile(req, res) {
    try {
      const user = await User.findById(req.session.user.id);
      res.render('profile', { 
        title: 'Profile',
        user 
      });
    } catch (error) {
      console.error('Profile error:', error);
      req.flash('error', 'Error loading profile');
      res.redirect('/');
    }
  }

  // Update profile
  async updateProfile(req, res) {
    try {
      const { name, genres, actors, keywords } = req.body;
      
      await User.findByIdAndUpdate(req.session.user.id, {
        name,
        preferences: {
          genres: genres ? genres.split(',').map(g => g.trim()) : [],
          actors: actors ? actors.split(',').map(a => a.trim()) : [],
          keywords: keywords ? keywords.split(',').map(k => k.trim()) : []
        }
      });

      req.session.user.name = name;
      req.flash('success', 'Profile updated successfully!');
      res.redirect('/auth/profile');
    } catch (error) {
      console.error('Profile update error:', error);
      req.flash('error', 'Error updating profile');
      res.redirect('/auth/profile');
    }
  }
}

module.exports = new AuthController();

