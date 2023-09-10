import React, { useState } from "react";
import { Card, List } from "antd";
import PersonDetails from "./PersonDetails";
import speciesColors from "../utils/SpeciesColors";
import "../App.css";
function People({ loading, peopleData }) {
  const [pressedPerson, setPressedPerson] = useState(null);
  const [isCardPressed, setIsCardPressed] = useState(false);
  const handleCardPress = (person) => {
    setPressedPerson(person);
    setIsCardPressed(true);
    console.log(pressedPerson);
    console.log(speciesColors);
  };
  const getBackgroundColor = (speciesURL) => {
    return speciesColors[speciesURL] || "white";
  };
  return (
    <div>
      <List
        grid={{
          gutter: 25,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 5,
        }}
        loading={loading}
        dataSource={peopleData?.results}
        rowKey={(item) => item.name}
        renderItem={(item) => {
          const randomId = Math.floor(Math.random() * 1000) + 1;
          const speciesURL = item.species[0];
          const backgroundColor = getBackgroundColor(speciesURL);
          return (
            <Card
              style={{ backgroundColor }}
              hoverable
              className="Cards"
              cover={
                <img
                  src={`https://picsum.photos/id/${randomId}/200/200`}
                  alt={" picsum"}
                />
              }
              onClick={() => {
                handleCardPress(item);
              }}
            >
              <p>{item.name}</p>
            </Card>
          );
        }}
      />
      <PersonDetails
        pressedPerson={pressedPerson}
        isCardPressed={isCardPressed}
        setPressedPerson={setPressedPerson}
        setIsCardPressed={setIsCardPressed}
      />
    </div>
  );
}

export default People;
