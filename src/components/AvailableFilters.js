import React, { useEffect, useState } from "react";
import { Button, Pagination, Radio, Select, Space, message } from "antd";
import { swApi } from "../api/AxiosConfig";

const { Option } = Select;

const AvailableFilters = ({
  setSelectedValue,
  selectedCategory,
  setSelectedCategory,
  setFilteredPressed,
}) => {
  const [totalPages, setTotalPages] = useState(1);
  const [optionsData, SetOptionsData] = useState([]);
  const [tempSelectedValue, setTempSelectedValue] = useState(null);
  const [filterPage, setFilterPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const getFilterOptions = async () => {
    try {
      setLoading(true);
      const response = await swApi.get(
        `/${selectedCategory}/?page=${filterPage}`
      );
      SetOptionsData(response?.data?.results);
      setTotalPages(response?.data?.count);
    } catch (error) {
      message.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    selectedCategory && getFilterOptions();

    // eslint-disable-next-line
  }, [filterPage, selectedCategory]);

  const handleOk = () => {
    setSelectedValue(tempSelectedValue);
    setFilteredPressed(false);
  };
  const handleReset = () => {
    setFilterPage(1);
    setSelectedCategory("");
    setSelectedValue("");
  };

  return (
    <div>
      <Radio.Group
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setFilterPage(1);
        }}
      >
        <Radio value="planets">Planet</Radio>
        <Radio value="species">Species</Radio>
        <Radio value="films">Film</Radio>
      </Radio.Group>

      {selectedCategory && (
        <>
          <Pagination
            size="small"
            total={totalPages}
            showSizeChanger={false}
            onChange={(page) => {
              setFilterPage(page);
            }}
          />
          <Space className={"Filer-Space"} size="large">
            <Select
              loading={loading}
              placeholder={`Select a ${selectedCategory}`}
              onChange={setTempSelectedValue}
            >
              {!loading && (
                <>
                  {" "}
                  {selectedCategory === "films" &&
                    optionsData.map((option) => (
                      <Option key={option?.url} value={option?.url}>
                        {option?.title}
                      </Option>
                    ))}
                  {(selectedCategory === "planets" ||
                    selectedCategory === "species") &&
                    optionsData.map((option) => (
                      <Option key={option?.url} value={option?.url}>
                        {option?.name}
                      </Option>
                    ))}
                </>
              )}
            </Select>

            <Button type="primary" onClick={handleOk}>
              Ok
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Space>
        </>
      )}
    </div>
  );
};

export default AvailableFilters;
