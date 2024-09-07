const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogpostRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/auth/authRoutes');
const app = express();

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require('cors');//install dotenv
app.use(express.json());

// Use CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your client origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
  }));
// CONSTANTS
require("dotenv").config();
const USER_NAME = process.env.DB_USER_NAME;
const PASSWORD = process.env.DB_PASSWORD

const DB_NAME =  process.env.DB_NAME

 const dbURI = `mongodb+srv://${USER_NAME}:${PASSWORD}@merncluster.ffwuw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=MernCluster`;
const PORT = 4000;

// express app
 // middleware & static files
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());

mongoose.connect(dbURI )
    .then((result) => {
        console.log(`Connected to database ${DB_NAME}`);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Failed to connect to database', err);
        process.exit(1); // Exit the process with a failure code
    });


// register view engine
app.set('view engine', 'ejs');

// middleware -> checkUser
app.use(cookieParser());
// 1. create a function to check if the user is logged in or not
function checkUser(req, res, next) {
    const token = req.cookies.authtoken;
    console.log(token);
    if (token) {
        jwt.verify(token, 'veryComplexSecret', (err, decodedToken) => {
            if (err) {
                console.log(`Token is incorrect: ${err}`);
                res.locals.user = null;
            } else {
                // Token is correct
                res.locals.user = decodedToken; // {email: "email"}
            }
        });
    } else {
        res.locals.user = null;
    }
    next();
}
app.use(checkUser);


app.get('/', (req, res) => {
   console.log("DSSSSSSSSSSs")
});

// auth routes
app.use('/auth', authRoutes);

// blog routes
app.use('/blogs', blogpostRoutes);

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

// 404 page
app.use((req, res) => {
    res.status(404).render('error', { title: 'Error' });
});




















// Problem Statement: We need to display only the blogs created by the logged in user.
// 1. Map the user to the blog post Document.
// 1.1 We already have author field in the blogpost schema. Can we use that?
// 1.2 What else can we use ? email, name, id ?
// Once we have the key final, we need to update the schema
// 2. Update the Schema to have a reference to the User Schema
// 2.1 Do we need to update the Model?
// 3. Next , we should update the blog with the key before saving it to the database
// 3.1 In order to update the blog with the key (ID), first we need to get info about the logged in user
// 3.2 Can we use res.locals.user to get the user info?
// Does it have the user ID ? -> NOf
// Can we add the userID to the res.locals.user object? Where does this value come from?
// token ? cookies?
// We need to update the token generation logic to include the user ID
// 4. Update the token generation logic to include the user ID
// 4.1 We need to update the signup route to include the user ID in the token
// 4.2 We need to update the login route to include the user ID in the token
// 5. Once, we have added the ID, we need to read ID and save in the res.locals.user object
// 6. Before saving the blog, we need to update the blog object with the user ID
// 7. Now, in order to display the blogs, we need to filter the blogs based on the user ID
// 7.1 Where do we get the user ID? 













// 1. Let's submit a form
// Q: What is the default method of the form?
// -> GET
// Q: What is the default path of the form?
// -> /blogs
// Q: What is the content type of the form? 
// -> application/x-www-form-urlencoded
// Q: What is url encoding?
// -> It is a way to encode the form data before sending it to the server.
// Do we need to convert this url encoded data to JSON?
// -> Yes
// How to do that?
// -> Use body-parser middleware
// app.use(bodyParser.urlencoded({ extended: true }));
// What is the difference between body-parser.urlencoded and body-parser.json?
// -> urlencoded is used to parse the data with content type application/x-www-form-urlencoded
// -> json is used to parse the data with content type application/json


