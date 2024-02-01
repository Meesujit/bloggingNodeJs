const express = require('express');
const path = require('path');
const { connectToMongoDB }  = require('./connect');
require('dotenv').config({path: './config.env'});
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const cookieParser = require('cookie-parser');
const { checkForAuthenticationCookie } = require('./middleware/authentication');
const Blog = require('./models/blog')
const app = express()
const PORT = process.env.PORT || 8000;

connectToMongoDB(process.env.MONGODB_URI).then (() =>
 console.log('Mongodb is connected.')
 );

app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname,'./views'))

app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));



app.use(express.static(path.resolve('./public')))
// Route
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render('home', {
        user: req.user,
        blogs: allBlogs,
    });
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, (req, res) => console.log(`server started at ${PORT}`))
