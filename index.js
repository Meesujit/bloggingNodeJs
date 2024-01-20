const express = require('express');
const path = require('path');
const { connectToMongoDB }  = require('./connect');
require('dotenv').config({path: './config.env'});
const userRoute = require('./routes/user');


const app = express()
const PORT = 8000;

connectToMongoDB(process.env.MONGODB_URI).then (() =>
 console.log('Mongodb is connected.')
 );

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'./views'))

app.use(express.urlencoded({extended: false}));
// Route
app.get('/', (req, res) => {
    res.render('home')
})

app.use('/user', userRoute)

app.listen(PORT, (req, res) => console.log(`server started at ${PORT}`))
