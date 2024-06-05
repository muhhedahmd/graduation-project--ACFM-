import { Box,  } from "@mui/material";

import React, {  useState } from "react";
import { useTheme } from "@emotion/react";

import SearchFiles from "./SearchFiles";
import { UserProvider, } from "../Contexts/UserContexts";
import { CustomizedTables } from "./CustomizedTables";


const FilesTable = ({ NoSearch, Report, colors, state, page }) => {
  const theme = useTheme();
  const [searchItems, setSearchItems] = useState(null);

  console.log('state',state)
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
    >
      <UserProvider>
        {!NoSearch ? (
          <SearchFiles page={page} setSearchItems={setSearchItems} />
        ) : null}
        <Box
          sx={{
            boxShadow: "rgb(222, 222, 222) 3px 3px 4px",
            background: theme.palette.background.paper,

            height: `${Report ? "99%" : "88%"}`,
            width: `${Report ? "97%" : "auto"}`,
            borderRadius: "9px",
          }}
        >
          <CustomizedTables
            colors={colors}
            state={searchItems ? searchItems : state}
          />
        </Box>
      </UserProvider>
    </Box>
  );
};

export default FilesTable;
