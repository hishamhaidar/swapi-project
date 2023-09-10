import { Button, Modal } from "antd";
import React, { useState } from "react";
import { FilterTwoTone } from "@ant-design/icons";
import AvailableFilters from "./AvailableFilters";
import "../App.css";
function Filtering({
  setSelectedValue,
  selectedCategory,
  setSelectedCategory,
}) {
  const [filterPressed, setFilteredPressed] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setFilteredPressed(true);
        }}
        className="filterButton"
        type="primary"
        icon={<FilterTwoTone />}
      />
      <Modal
        className="FilterModal"
        open={filterPressed}
        onCancel={() => {
          setFilteredPressed(false);
        }}
        footer={null}
      >
        <h1>Choose a Filter : </h1>
        <AvailableFilters
          setSelectedValue={setSelectedValue}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setFilteredPressed={setFilteredPressed}
        />
      </Modal>
    </div>
  );
}

export default Filtering;
