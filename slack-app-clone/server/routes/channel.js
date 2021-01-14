const express = require('express');
const router = express.Router();   // creating the express router

const channelControl = require('../controllers/channelControl'); // importing the control module

const authRoute = require('../authentication/auth');  // importing the auithentication middleware

// default route
router.get('/',authRoute,channelControl.default);

// route to create a channel
router.post('/create', authRoute,channelControl.createChannel);

// route to update a channel by id
router.put('/update', authRoute,channelControl.updateChannel);

// to find all channels
router.get('/findall', authRoute, channelControl.findall);

// route to find a channel
router.get('/find/:channelName', authRoute, channelControl.findChannel);

// route to add any member in the channel
router.put('/join', authRoute,channelControl.addMembers);
// exporting the router
module.exports=router;