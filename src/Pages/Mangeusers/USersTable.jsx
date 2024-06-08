import React, { useState, useEffect, useContext, useCallback } from "react";
import { SearchContext } from ".";
import axios from "axios";
import { useUserContext } from "../../Components/Contexts/UserContexts";
import { CustomizedTables } from "./CustomizedTables";
import { Box, CircularProgress } from "@mui/material";


const UsersTable = ({ Report }) => {
  const { searchResults } = useContext(SearchContext);
  const [UserState, setUserState] = useState([]);
const {users , loader} = useUserContext()


  const fetchData = useCallback( async () => {
    try {
      const response = await axios.get(
        "http://optima-software-solutions.com/apis/usershow.php"
      );
      return response.data;
    } catch (error) {
      console.error("Error:", error.message);
      return [];
    }
  } , [])

  const applySearchFilter = (data, searchValue) => {
    if (!searchValue) return data;
    const regex = new RegExp(searchValue, "ig"); // Case insensitive regex
    return data.filter(
      (user) =>
        regex.test(user.first_name) ||
        regex.test(user.last_name) ||
        regex.test(user.email)
    );
  };

  useEffect(() => {
    const fetchDataAndFilter = async () => {
  
      const filteredData = applySearchFilter(users, searchResults);
      setUserState(filteredData);
    };

    fetchDataAndFilter();
  }, [users , searchResults]);

  return (
    <Box sx={{ overflow: "hidden", height: "100%", width: "100%" }}>
      <Box
        sx={{
          boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
          height: `${Report ? "99%" : "87%"}`,
          width: `${Report ? "97%" : "100%"}`,
          borderRadius: "9px",
        }}
      >
      {
        loader ? 
<CircularProgress sx={{
  color:"#333",
}}/>:
        <CustomizedTables fetchData={fetchData} state={UserState} />
      }
      </Box>
    </Box>
  );
};

export default UsersTable;
