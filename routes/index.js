const router = require('express').Router();
const Workout = require('../models/workout');
const path = require('path');

router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
});

router.get("/api/workouts/range", ({body}, res) => {
    Workout.aggregate([
      {
          $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
          }
      }
      ])
      .sort({ day: -1 })
      .limit(7)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
  router.get("/api/workouts/", ({body}, res) => {
    Workout.aggregate([
      {
          $addFields: {
            totalDuration: {
                $sum: "$exercises.duration"
            }
          }
      }
      ])
      .sort({ day: -1 })
      .limit(7)
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

router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
      {
        _id: req.params.id
      },
      {
        $push: {
          exercises: req.body,
        }
      }
    )
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
});
  
module.exports = router;
  