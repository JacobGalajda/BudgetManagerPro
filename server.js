// server.js

const {createServer} = require('https');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const sgMail = require('@sendgrid/mail');
const config = require('./config');

const app = express();
const dev = app.get('env') !== 'production';


// if (!dev) {
//     app.use(compression());
//     app.use(morgan('common'));
//     app.use(express.static('frontend/build'));

//     app.get('*', function(req, res) {
//         res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
//     });
// }

// if (dev) {
//     app.use(morgan('dev'));
// }

const normalizePort = port => parseInt(port, 10);
const PORT = normalizePort(process.env.PORT || 3001);

const MONGODB_URI = "mongodb+srv://root:!cop4331!@project.m58al.mongodb.net/cop4331?retryWrites=true&w=majority";

mongoose.Promise = global.Promise;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', function() {
    console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
    console.log('Mongoose Connection Error : ' + error);
});

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));
app.use('/auth', require('./routes/auth'));

// Check production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}.`);
});

const server = createServer(app);