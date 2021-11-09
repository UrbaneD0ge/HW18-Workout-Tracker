// get / api /workouts (findall)
// get byid /api / workouts (findone)
// put /api /workouts
// post /api /workouts (add)
// get /api / range(findall)

const router = require('express').Router();
const Workout = require('.models/workout.js');

router.get("/api/workouts/range", (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
})

router.get("/api/workouts", (req, res) => {
    Workout.findAll({})
        .sort({ date: -1 })
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

router.put("/api/workouts/:id", ({ body }, res => {
    Workout.updateOne({
        _id: mongojs.ObjectId(body.id),
    },
        {
            $set: { ...body }
        }
    )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        })
}))