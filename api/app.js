const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const eventsRouter = require('./routes/event');
const encryptRouter = require('./routes/encrypt');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');


const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 1024 * 1024 * 1024 }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/encrypt', encryptRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);

module.exports = app;
