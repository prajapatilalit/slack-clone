const express = require('express');
const router = express.Router();   // creating the express router

const messageControl = require('../controllers/messageControl'); // importing the control module

const authRoute = require('../authentication/auth');  // importing the auithentication middleware

// default route
router.get('/', authRoute, messageControl.default);

// route to create a message
router.post('/create', authRoute, messageControl.createMessage);

// route to edit message
router.put('/edit', authRoute, messageControl.updateMessage);

// route to delete a message
router.delete('/delete', authRoute,messageControl.deleteMessage);

// exporting the router
module.exports=router;