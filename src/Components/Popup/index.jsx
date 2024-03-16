import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFile } from "../Contexts/FileContext";

const Popup = ({ Name, active, setActivePopup, file, fileNameObj }) => {
  const { uploadFile } = useFile();

  const [Data, SetData] = useState({
    FileName: fileNameObj, // Set file name properly
    Description: "",
  });

  useEffect(() => {
    SetData({
      [Name.split(" ").join("")]: fileNameObj,
      Description: "",
    });
  }, [Name, fileNameObj]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    SetData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
    console.log(Data);
  };

  const Handleclose = () => {
    setActivePopup((prev) => false);
    SetData({
      [Name.split(" ").join("")]: fileNameObj,
      Description: "",
    });
  };

  const HandleSubmit = (e) => {
    if (Data[Name.split(" ").join("")]) {
      const myNewFile = new File([file], Data.FileName, { type: file.type });

      // const formData = new FormData()
      // formData.append('file',myNewFile);
      // formData.append("Description" , Data?.Description)

      uploadFile(
        myNewFile,
        Math.round(Math.random() * file?.size),
        Data.Description
      );
      console.log(Data?.Description);
      setActivePopup(false);
    }

    e.preventDefault();
  };
  return (
    <Box
      className="popup"
      sx={{
        visibility: `${active ? "visible" : "hidden"}`,
        opacity: `${active ? "1" : "0"}`,
        zIndex: `${active ? "9999" : "-100"}`,
        height: "100vh",
        width: "100vw",
        backdropFilter: "brightness(.9) blur(2px)",
        transition: ".3s",
        position: "fixed",

        top: "0",
        left: "0",
        bgcolor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
          padding: "1.5rem",
          bgcolor: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "2rem",
          borderRadius: "0  15px  15px 0 ",

          position: "relative",
          ":before": {
            width: ".9rem",
            height: "100%",
            content: '""',
            position: "absolute",
            top: "0",
            left: "-.7rem",
            background: "linear-gradient(45deg, #FF5E03, #FF9A11)",
            borderRadius: "15px 0 0 15px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography variant="h5" component={"p"}>
            File Info
          </Typography>
          <Close onClick={() => Handleclose()} fontSize="medium" />
        </Box>

        <form
          onSubmit={(e) => HandleSubmit(e)}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <FormLabel
              sx={{
                padding: "0",
                color: "#6c7571",
                fontWeight: "bold",
                alignSelf: "flex-start",
                justifyContent: "flex-start",
              }}
              aria-label={`${Name} label`}
              htmlfor={`${Name}-label`}
            >
              {Name}
            </FormLabel>

            <TextField
              onChange={(e) => handleChange(e)}
              fullWidth
              variant="standard"
              placeholder="File Name"
              required
              id={Name.split(" ").join("")}
              value={Data[Name.split(" ").join("")] /* Corrected here */}
              style={{
                width: "100%",
              }}
            />
          </FormControl>
          <FormControl
            fullWidth
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              width: "100%",
              flexDirection: "column",
              gap: "0",
            }}
          >
            <FormLabel
              sx={{
                padding: "0",
                color: "#6c7571",
                fontWeight: "bold",
                alignSelf: "flex-start",
                justifyContent: "flex-start",
              }}
              aria-label={`${"Description"} label`}
              htmlfor={`${"Description"}-label`}
            >
              {"Description"}
            </FormLabel>
            <TextField
            onChange={(e)=>handleChange(e)}
              multiline
              label="Description"
              variant="standard"
              style={{
                width: "100%",
              }}
              placeholder="Description...."
              id={"Description"}
            />
          </FormControl>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              type="submit"
              sx={{
                margin: ".5rem 0 0 0",
                padding: ".3rem",
                width: "100%",
                transition: ".3s",
                background: "#FF5E23",
                letterSpacing: ".5px",

                ":hover , :focus": {
                  background: "#FF5E23",
                },
              }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Popup;
