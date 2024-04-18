import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControlLabel,
  
  Radio,
  Typography,
} from "@mui/material";
import React, { useEffect,  useId,  useState } from "react";
import Users from "./Users";
import StanderdBox from "../../Components/StanderdBox";
import { useSemester } from "../../Components/Contexts/SemesterContext";

const OpenSemester = ({page}) => {
  const {  setSemesterData } = useSemester()
  const currentYear = new Date().getFullYear();


 
  const [Semester, setSemester] = useState({
    Fall: true,
    Spring: false,
    Saummer: false,
  });
  const [SemesterState , setSemesterState ] = useState({
    Semester:"Fall",
    id:useId,
    courses:[],
    year:currentYear.toString() + '/' + (currentYear + 1).toString()

  })
  const handleChange = (e, item, state, setState, onlyOne) => {
    const { checked } = e.target;

    if (onlyOne) {
      const updatedState = {};
      for (const key in state) {
        updatedState[key] = key === item ? checked : false;
      }
      setState(updatedState);
      setSemesterState((prev) => ({ ...prev, Semester: item }));


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

<StanderdBox>




        <Box
          sx={{
            width: "100vw",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            height: "calc(100vh - 7vh)",
flexDirection:"column",
            overflow: "hidden",
          }}
        >
        <Typography
        padding={"0 1rem"}
        variant="h5"
        component={"p"}
        >

        {page}
        </Typography>
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
            <Box
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
                overflow:"auto"
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
            </Box>
            <Box
            
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Users setSemesterState={setSemesterState} />

              <Button
               sx={{
        padding:".5rem  0 .5rem 0 ",
        margin:"1rem 0 ",
        width:"100%",
        bgcolor: theme.palette.primary.paper,
                        ":hover": {
                          bgcolor: theme.palette.primary.paper,
                        },
    }}
    
            onClick={()=>setSemesterData(SemesterState)}
                width="100%"
            
              >

                Submit
              </Button>
            </Box>
          </Box>

        </Box>
      
</StanderdBox>
    
  );
};

export default OpenSemester;

