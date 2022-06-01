// installing http-server -> npm install -g http-server
// run command -> http-server
// in network setting set network profile to private

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server has started on port 5000");
});

// Post data from ESP32 to database
app.post("/people", async (req, res) => {
  try {
    const { peopleInside, peopleOutside } = req.body;
    const newRecord = await pool.query(
      "INSERT INTO peoplecounter (peopleInside, peopleOutside) VALUES($1, $2) RETURNING *",
      [peopleInside, peopleOutside]
    );

    res.json(newRecord.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// Get all records from database
app.get("/people", async (req, res) => {
  try {
    const allRecords = await pool.query("SELECT * FROM peoplecounter");

    res.json(allRecords.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// Get current number of people from database
app.get("/people/current", async (req, res) => {
  try {
    const latestRecord = await pool.query(
      "SELECT * FROM peoplecounter ORDER BY time DESC LIMIT 1"
    );

    res.json(latestRecord.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// Get maximum number of people per day
app.get("/people/maxday", async (req, res) => {
  try {
    const maxPeoplePerDay = await pool.query(
      "SELECT MAX(peopleInside) AS peopleEntered, time::date + 1 AS date FROM peoplecounter GROUP BY date"
    );

    res.json(maxPeoplePerDay.rows);
  } catch (error) {
    console.log(error.message);
  }
});
