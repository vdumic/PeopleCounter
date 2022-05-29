import React, { useEffect, useState } from "react";

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
    <div>
      <h1>Max people entered per day</h1>
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
    </div>
  );
};

export default MaxPeoplePerDay;
