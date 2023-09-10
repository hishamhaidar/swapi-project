import { Input } from "antd";
import React from "react";
import "../App.css";
import Filtering from "./Filtering";

function SearchFilterBar({ setSearchedText }) {
  const handleSearch = (value) => {
    console.log(value);
    setSearchedText(value);
  };

  return (
    <div className="Search-Filter">
      <Input.Search onSearch={handleSearch} className="search-bar" allowClear />
      <Filtering />
    </div>
  );
}

export default SearchFilterBar;
