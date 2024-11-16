import React, { useState, useEffect } from "react";
import Person from "./Person";

const PersonController = () => {
  const [person, setPerson] = useState(null);

  const getPerson = async () => {
    const response = await fetch("https://www.randomuser.me/api?results=1");
    const data = await response.json();
    const formattedPerson = {
      first_name: data.results[0].name.first,
      last_name: data.results[0].name.last,
      email: data.results[0].email,
    };
    setPerson(formattedPerson);
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div>
      <button onClick={getPerson}>Fetch New Person</button>
      <Person person={person} />
    </div>
  );
};

export default PersonController;
