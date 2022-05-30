import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "../App.css";

const MaxPeoplePerDay = () => {
  const [peoplePerDay, setPeoplePerDay] = useState([]);

  const getMaxPeoplePerDay = async () => {
    try {
      const response = await fetch("http://192.168.0.20:5000/people/maxday");
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
    <div className="Counter">
      <h1>People Counter</h1>
      <div className="container">
        <table>
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">People entered</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {peoplePerDay.map((day) => {
              return (
                <tr>
                  <th scope="row">1</th>
                  <td>{day.peopleentered}</td>
                  <td>{day.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Link className="link" to="/">
        Go to Home page
      </Link>
    </div>
  );
};

export default MaxPeoplePerDay;
