import { useTheme } from "@emotion/react";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect,  useState } from "react";
import Header from "../../Components/Header";
import Users from "./Users";
import Btn from "../../Components/Btn";
import MainDrawer from "../../MainDrawer";

const OpenSemester = () => {
 
  const [Semester, setSemester] = useState({
    Fall: true,
    Spring: false,
    Saummer: false,
  });

  const handleChange = (e, item, state, setState, onlyOne) => {
    const { checked } = e.target;

    if (onlyOne) {
      const updatedState = {};
      for (const key in state) {
        updatedState[key] = key === item ? checked : false;
      }
      setState(updatedState);
    } else {
      const updatedState = {
        ...state,
        [item]: !state[item],
      };
      setState(updatedState);
    }
  };

  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const currentDate = new Date().getFullYear();
    const formatted = `${currentDate - 1}/${currentDate}`;
    setFormattedDate(formatted);
  }, []);


  const theme = useTheme();
  return (
    <Box
    sx={{
      maxHeight:"100vh",
      overflow:"hidden"
    }}
    >
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          gap:"1rem",
          width: "100vw",
        }}
      >
        <MainDrawer />
        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "calc(100vh - 7vh)",

            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              padding: "1rem",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <FormGroup
              sx={{
                bgcolor: "#fff",
                boxShadow: "3px 3px 4px #dedede",
                flexWrap: "nowrap",
                width: "100%",
                borderRadius: "6px",
                padding: ".5rem",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                margin: "0rem 0 0 0 ",
                gap: "3rem",
              }}
            >
              {Object.keys(Semester).map((ksem) => {
                return (
                  <FormControlLabel
                    sx={{
                      transition: ".4s",
                      padding: ".2rem 1rem",
                      display: "flex",
                      flexDirection: "row-reverse",
                      justifyContent: "flex-start",
                      alignItems: "center",
                  
                    }}
                    key={ksem}
                    control={
                      <Box
                        sx={{
                          width: "10rem",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <Radio
                          checked={Semester[ksem]}
                          id={ksem}
                          component={"p"}
                          onChange={(e) =>
                            handleChange(e, ksem, Semester, setSemester, true)
                          }
                          sx={{
                            fontSize: ".9rem",
                            color: theme.palette.primary.paper,
                            "&.Mui-checked": {
                              color: theme.palette.primary.paper,
                            },
                          }}
                        />

                        <Typography variant="body2" component={"p"}>
                          {formattedDate}
                        </Typography>
                      </Box>
                    }
                    label={ksem}
                  />
                );
              })}
            </FormGroup>
            <Box
            
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Users />

              <Btn
                width="100%"
                children={"Submit"}
                padding={".5rem  0 .5rem 0 "}
              />
            </Box>
          </Box>

        </Box>
      </Box>
    </Box>
  );
};

export default OpenSemester;

