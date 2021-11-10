const mongoose = require('mongoose');
const express = require('express');
const logger = require('morgan');

const PORT = process.env.PORT || 3001;

const Workout = require('./models/workout');

const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(require('./routes/apiRoutes'));
app.use(require('./routes/htmlRoutes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`)
});