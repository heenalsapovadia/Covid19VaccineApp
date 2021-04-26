const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const peopleRoutes = require('./routes/people');

db.execute('SELECT * FROM people')
    .then(result => {
        console.log(result[0]);
    })
    .catch(err => {
        console.log(err);
    });

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);

app.use(peopleRoutes);

app.use(errorController.get404);
app.listen(3000);