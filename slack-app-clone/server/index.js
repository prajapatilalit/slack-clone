const express = require('express');
const app = express();           // importing the required modules
const bodyParser = require('body-parser');

const cors = require('cors');

const db = require('./models/db');

const userRoutes = require('./routes/user');
const channelRoutes = require('./routes/channel');
const messageRoutes = require('./routes/message');
const profileRoutes = require('./routes/profile');
const { Socket } = require('socket.io');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// default route
app.all('/',(req,res)=>{
    res.send('Welcome to Slack');
});

// user route
app.use('/user', userRoutes);

// channel route
app.use('/channel', channelRoutes);

// message route
app.use('/message', messageRoutes);

// profile route
app.use('/profile', profileRoutes);
// assigning the port
const server =  app.listen('8080',()=>{
    console.log('Server is running on the port 8080');
});

// importing the socket

const io = require('socket.io')(server);
const jwt = require('jsonwebtoken');

io.use(async(socket,next)=>{
    try{
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, 'verySecretValue');
    socket.userId = payload.id;
    next();
    }
    catch(err){     
    }
});

io.on('connection' , (socket)=>{
    console.log('connected:' +socket.userId);

    socket.on('disconnected', ()=>{
        console.log('disconnected:' +socket.userId);
    });
});
