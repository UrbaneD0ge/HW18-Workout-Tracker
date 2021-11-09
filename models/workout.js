const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Name your Workout!",
    },
    type: {
        type: Number,
        required: "What type of workout is it?",
    },
    duration: {
        type: Number,
        required: "Enter a duration",
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;