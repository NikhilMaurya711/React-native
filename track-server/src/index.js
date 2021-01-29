require('./models/User');
require('./models/Track');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth  = require('./middleware/requireAuth')

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:passwordpassword@cluster0.jzhom.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () =>{
    console.log('Connected to mongoo instance');
});

mongoose.connection.on('error', (err) =>{
    console.log('Error connecting to mongoo', err);
});

app.get('/',requireAuth, (req, res) => {
    console.log("all ok for",req.user.email);
    res.send(`Your email : ${req.user.email}`);
})

app.listen(3000, () => { 
    console.log("listening on port 3000");
})