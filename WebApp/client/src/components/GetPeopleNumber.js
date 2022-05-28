import React, { useEffect, useState } from "react";

const GetPeopleNumber = () => {
  const [peopleInside, setPeopleInside] = useState("");
  const [peopleOutside, setPeopleOutside] = useState("");

  const getPeopleNumber = async () => {
    try {
      const response = await fetch("http://localhost:5000/people/current");
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
    <div>
      <h2>Number of people</h2>
      <div>{peopleInside - peopleOutside}</div>
    </div>
  );
};

export default GetPeopleNumber;
