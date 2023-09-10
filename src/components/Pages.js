import React, { useEffect } from "react";
import { swApi } from "../api/AxiosConfig";
import { Button, Pagination } from "antd";
import "../App.css";
import { ReloadOutlined } from "@ant-design/icons";

function Pages({
  peopleData,
  setPeopleData,
  setLoading,
  setError,
  currPage,
  setCurrPage,
  searchedText,
}) {
  const refreshPage = () => {
    handlePageChange(currPage);
  };
  const handlePageChange = async (page) => {
    setLoading(true);
    setError(null);
    setCurrPage(page);
    try {
      const response = await swApi.get(
        `people/?page=${page}&search=${searchedText}`
      );
      console.log(response?.data);
      setPeopleData(response?.data);
    } catch (error) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePageChange(1); // eslint-disable-next-line
  }, [searchedText]);
  return (
    <div className="Pages">
      <Pagination
        total={peopleData?.count}
        showSizeChanger={false}
        onChange={(page) => {
          handlePageChange(page);
        }}
      />
      <Button
        danger
        style={{ width: "100px" }}
        onClick={refreshPage}
        type="dashed"
        size="large"
        icon={<ReloadOutlined />}
      />
    </div>
  );
}

export default Pages;
