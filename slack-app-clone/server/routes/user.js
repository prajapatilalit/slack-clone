const express = require('express');
const router = express.Router();   // creating the express router


const userRoute = require('../controllers/userControl');

// degault user route
router.all('/', userRoute.default);

// registration route
router.post('/signup', userRoute.register);

// login route
router.post('/signin', userRoute.login);

// findUser route
router.get('/findUser', userRoute.findUser);

// route to delete user
router.delete('/delete', userRoute.deleteUser);


// exporting the router
module.exports=router;