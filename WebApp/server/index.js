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

app.get("/people", async (req, res) => {
  try {
    const allRecords = await pool.query("SELECT * FROM peopleCounter");

    res.json(allRecords.rows);
  } catch (error) {
    console.log(error.message);
  }
});
