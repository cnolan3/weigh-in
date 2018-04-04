const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const logger = require('morgan');
const models = require('./models');

const app = express();

const users = require('./routes/users');
const debates = require('./routes/debate');

const port = 4000;

// use cors
app.use(cors());

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// body-parser
app.use(bodyParser.json());

// logging
app.use(logger('dev'));

// passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// routes
app.use('/users', users);
app.use('/debates', debates);

app.disable('etag');

// send test get response
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start server on port
app.listen(port, () => {
    console.log('Server started on port ' + port);
});
