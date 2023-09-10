import React, { useState } from "react";
import { Alert, FloatButton, Typography } from "antd";
import "../App.css";
import People from "./People";
import Pages from "./Pages";
import SearchFilterBar from "./SearchFilterBar";

function Home() {
  const [peopleData, setPeopleData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [searchedText, setSearchedText] = useState("");
  return (
    <div>
      <Typography.Title id="starwarH1">Star Wars</Typography.Title>
      {error && <Alert type="error" showIcon closable message={error} />}

      <SearchFilterBar setSearchedText={setSearchedText} />

      <Pages
        currPage={currPage}
        setCurrPage={setCurrPage}
        peopleData={peopleData}
        searchedText={searchedText}
        setPeopleData={setPeopleData}
        setLoading={setLoading}
        setError={setError}
      />
      <People loading={loading} peopleData={peopleData} />

      <FloatButton.BackTop />
    </div>
  );
}

export default Home;