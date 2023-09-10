import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import moment from "moment/moment";
import { swApi } from "../api/AxiosConfig";
import "../App.css";

function PersonDetails({ pressedPerson, isCardPressed, setIsCardPressed }) {
  const [homeWorld, setHomeWorld] = useState(null);
  const getHomeDetails = async () => {
    let targerURL = pressedPerson?.homeworld.replace(
      "https://swapi.dev/api/",
      ""
    );
    try {
      const response = await swApi.get(targerURL);
      console.log(response);
      setHomeWorld(response?.data);
    } catch (error) {
      message.error(error?.message);
    }
  };

  const handleModalClose = () => {
    setIsCardPressed(false);
    setHomeWorld(null);
  };

  return (
    <Modal
      className="PeopleDetailsModal"
      open={isCardPressed}
      footer={null}
      onCancel={handleModalClose}
    >
      {pressedPerson && (
        <>
          <h1>{pressedPerson.name}</h1>
          <p>Height: {pressedPerson.height / 100} m</p>
          <p>Mass: {pressedPerson.mass} kg</p>
          <p>
            Date Added to API:{" "}
            {moment(pressedPerson.created).format("DD-MM-YYYY")}
          </p>
          <p>Number of Films: {pressedPerson.films.length}</p>
          <p>Birth Year: {pressedPerson.birth_year}</p>
          {!homeWorld && (
            <Button size="large" type="primary" onClick={getHomeDetails}>
              Get HomeWorld
            </Button>
          )}
          {homeWorld && (
            <>
              <h2>Homeworld</h2>
              <p>Name: {homeWorld.name}</p>
              <p>Terrain: {homeWorld.terrain}</p>
              <p>Climate: {homeWorld.climate}</p>
              <p>Number of Residents: {homeWorld.residents.length}</p>
            </>
          )}
        </>
      )}
    </Modal>
  );
}

export default PersonDetails;
