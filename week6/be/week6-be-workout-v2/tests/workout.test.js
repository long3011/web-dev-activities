const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

let token = null;

const workoutsInDb = async () => {
  const workouts = await Workout.find({});
  return workouts.map((workout) => workout.toJSON());
};

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "mattiv@matti.fi", password: "R3g5T7#gh" });
  token = result.body.token;
});

describe("when there is initially some workouts saved", () => {
  beforeEach(async () => {
    await Workout.deleteMany({});
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(workouts[0])
      .send(workouts[1]);
  });

  it("Should return workouts as json", async () => {
    await api
      .get("/api/workouts")
      .set("Authorization", "bearer " + token)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  it("Should add new workout successfully", async () => {
    const newWorkout = {
      title: "testworkout",
      reps: 10,
      load: 100,
    };
    await api
      .post("/api/workouts")
      .set("Authorization", "bearer " + token)
      .send(newWorkout)
      .expect(201);
  });

it("should delete with status code 204 if id is valid", async () => {
  const workoutsAtStart = await workoutsInDb();
  const workoutToDelete = workoutsAtStart[0];
  console.log(workoutsAtStart);
  console.log(workoutToDelete);

  await api
    .delete(`/api/workouts/${workoutToDelete._id}`)
    .set("Authorization", "bearer " + token)
    .expect(200);

  const workoutsAtEnd = await workoutsInDb();
  expect(workoutsAtEnd).toHaveLength(workoutsAtStart.length - 1);

  const contents = workoutsAtEnd.map((r) => r.title);
  expect(contents).not.toContain(workoutToDelete.title);
});

it("Should update a workout", async () => {
  const workoutsAtStart = await Workout.find({});
  const workoutToUpdate = workoutsAtStart[0];
  console.log(workoutsAtStart);
  console.log(workoutToUpdate);

  await api
    .patch(`/api/workouts/${workoutToUpdate.id}`)
    .set("Authorization", "bearer " + token)
    .send({
      title: "Updated workout",
      load: 200,
    })
    .expect(200);
  const workoutsAtEnd = await workoutsInDb();
  const updatedWorkout = workoutsAtEnd[0];
  expect(updatedWorkout.title).toBe("Updated workout");
  expect(updatedWorkout.load).toBe(200);
});

it("should return workout with given id", async () => {
  const workoutsAtStart = await workoutsInDb();
  const workoutToView = workoutsAtStart[0];

  await api
    .get(`/api/workouts/${workoutToView._id}`)
    .set("Authorization", "bearer " + token)
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

});

afterAll(() => {
  mongoose.connection.close();
});
