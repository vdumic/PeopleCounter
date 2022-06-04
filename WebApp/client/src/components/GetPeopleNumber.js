import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./GetPeopleNumber.css";
import "../App.css";

const GetPeopleNumber = () => {
  const [peopleInside, setPeopleInside] = useState("");
  const [peopleOutside, setPeopleOutside] = useState("");

  const getPeopleNumber = async () => {
    try {
      const response = await fetch("http://192.168.0.20:5000/people/current");
      const jsonData = await response.json();

      setPeopleInside(jsonData[0].peopleinside);
      setPeopleOutside(jsonData[0].peopleoutside);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getPeopleNumber();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="Counter">
      <h1 fontSize="40px">People Counter</h1>
      <p>Number of people inside:</p>

      <div style={{ width: 280, margin: "auto", padding: 20 }}>
        <CircularProgressbar
          value={peopleInside - peopleOutside}
          maxValue={20}
          text={`${peopleInside - peopleOutside}`}
          styles={buildStyles({
            textColor: "#485f8e",
            pathColor: "#485f8e",
          })}
        />
      </div>
      <div className="totalsRow">
        <p>Walked in total: {peopleInside}</p>
        <p>Walked out total: {peopleOutside}</p>
      </div>
      <Link className="link" to="/days">
        People in the room for each day
      </Link>
    </div>
  );
};

export default GetPeopleNumber;
