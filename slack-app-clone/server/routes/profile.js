const express = require('express');
const router = express.Router();   // creating the express router

const profileControl = require('../controllers/profileControl');  // importing the controller module

const authRoute = require('../authentication/auth');

// default route
router.get('/', authRoute,profileControl.default);

// route to upload profile
router.post('/upload', authRoute, profileControl.uploadProfile);

// route to view your own profile
router.get('/view', authRoute,profileControl.viewProfile);

// route to view other user profile
router.get('/viewProfile', authRoute,profileControl.viewOther);

// exporting the router
module.exports=router;