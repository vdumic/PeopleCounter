import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./MaxPeoplePerDay.css";
import "./GetPeopleNumber.css";
import "../App.css";

const MaxPeoplePerDay = () => {
  const [peoplePerDay, setPeoplePerDay] = useState([]);

  const getMaxPeoplePerDay = async () => {
    try {
      const response = await fetch("http://localhost:5000/people/maxday");
      const jsonData = await response.json();

      setPeoplePerDay(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(peoplePerDay);

  useEffect(() => {
    getMaxPeoplePerDay();
  }, []);

  return (
    <div className="container">
      <h1>People Counter</h1>
      <ul className="responsive-table">
        <li className="table-header">
          <div className="col col-1">ID</div>
          <div className="col col-2">People Entered</div>
          <div className="col col-3">Date</div>
        </li>
        {peoplePerDay.map((day) => {
          return (
            <li className="table-row">
              <div className="col col-1" data-label="Job Id">
                1
              </div>
              <div class="col col-2" data-label="Customer Name">
                {day.peopleentered}
              </div>
              <div class="col col-3" data-label="Amount">
                {day.date}
              </div>
            </li>
          );
        })}
      </ul>
      <Link className="link" to="/">
        Go to Home page
      </Link>
    </div>
  );
};

export default MaxPeoplePerDay;
