const express = require('express')
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')



//Use body Parser in file
app.use(bodyParser.urlencoded({ extended: false }));



const User = require('./model/user');




// Setting ejs as a template engine for my project 
app.set('view engine', 'ejs');
app.set('views', 'views');


// Set public folder to the entire app.js 
app.use(express.static(path.join(__dirname, 'public')));


// app.use('/images', express.static(path.join(__dirname, 'images')));





// Importing shop routes from routes folder 
const shopRoutes = require('./routes/shop.js')
const adminRoutes = require('./routes/admin.js')

// require('./prod')(app)


app.use((req, res, next) => {

    User.findById('5f6b442026fcb0038c864ed3')
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});





app.use('/', shopRoutes)
app.use('/admin', adminRoutes)



app.get('*', (req, res, next) => {
    res.send('Routes Not match !!!!!!!!!')
});


mongoose.connect('mongodb+srv://Cris:qwertyuiop123@cluster0.vgepz.mongodb.net/<dbname>?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true })
    .then((result) => {

        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Yukti',
                    email: 'Stream_Back_Door@gmail.com',
                    cart: {
                        items: []
                    }
                });

                user.save();
            }
        });

        console.log('DB Connected')
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log('Listening on Port 3000 ')
        })
    })
    .catch((err) => {
        console.log(err.message)
        console.log('DB Not connected !!!!  ')
    })

