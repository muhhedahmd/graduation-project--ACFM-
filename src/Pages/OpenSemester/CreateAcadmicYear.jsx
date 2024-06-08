import { Box, FormGroup, Input, InputLabel, List, ListItem, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";

const CreateAcademicYear = ({ setSelectedAcdamic }) => {
  const [inpVal, setInpVal] = useState({ val: "", msg: "" });
  const [editId, setEditId] = useState(null);
  const [editVal, setEditVal] = useState("");
  const { academicYears, addAcademicYear, deleteAcademicYear, updateAcademicYear } = useAcademicYear();


  useEffect(()=>{

  },[])
  const handleDelete = async (id) => {
    deleteAcademicYear(id);
  };
console.log(academicYears)
  const handleEdit = (id, name) => {
    console.log(name)
    setEditId(id);
    setEditVal(name);
  };

  const handleEditSubmit = (id) => {
    if(!editVal){
      setEditId(null);
      setEditVal("");
    }
    else {

      updateAcademicYear(id, editVal);
    setEditId(null);
  setEditVal("");
  }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const pattern = /^\d{4}\/\d{4}$/; // Pattern for "YYYY/YYYY" format

    if (pattern.test(inpVal.val)) {
      const exists = academicYears.some((academicYear) => academicYear.name === inpVal.val);

      if (!exists) {
        addAcademicYear(inpVal.val);
      } else {
        setInpVal((prev) => {
          return {
            ...prev,
            msg: "Value matches the pattern but already exists",
          };
        });
      }
    } else {
      setInpVal((prev) => {
        return {
          ...prev,
          msg: "Value doesn't match the pattern YYYY/YYYY",
        };
      });
    }
  };

  const handleChange = (e) => {
    setInpVal((prev) => {
      return {
        ...prev,
        val: e.target.value,
      };
    });
  };

  const handleEditChange = (e) => {
    setEditVal(e.target.value);
  };

  return (
    <Box
      sx={{
        overflow: "auto",
        borderRadius: "6px",
        width: "50%",
        bgcolor: "#fff",
        boxShadow: "3px 3px 4px #dedede",
        height: "94%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "column",
      }}
    >
      <List
        sx={{
          height: "20rem",
          maxHeight: "22rem",
          overflow: "auto",
          width: "100%",
        }}
      >
        <ListItem>
          <Typography variant="h6" component={"div"}>
            Last Academic Years
          </Typography>
        </ListItem>

        {academicYears.length > 0 ? (
          academicYears.map((item) =>
            item.name ? (
      <Box>
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "1rem",
                }}
                key={item.id}
              >
                {editId === item.id ? (
                  <Input
                  sx={{
                    width:"55rem"
                  }}
                  className="borderAfter"
                    value={editVal}
                    onChange={handleEditChange}
                    onBlur={() => handleEditSubmit(item.id)}
                    autoFocus
                  />
                ) : (
                  <Typography
                    component={"p"}
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      letterSpacing: "1px",
                    }}
                  >
                    {item.name}
                  </Typography>
                )}
                <StyledMainBtn
                  onClick={() => handleDelete(item.id)}
                  sx={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    bgcolor: "#fff00000 !important",
                    color: "#f31",
                    textTransform: "math-auto",
                  }}
                >
                  Delete
                </StyledMainBtn>
                <StyledMainBtn
                  onClick={() => handleEdit(item.id)}
                  sx={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    bgcolor: "#fff00000 !important",
                    color: "#008b9c",
                    textTransform: "math-auto",
                  }}
                >
                Edit
                  
                </StyledMainBtn>
                
                <StyledMainBtn
                  onClick={() => setSelectedAcdamic(item)}
                  sx={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    bgcolor: "#fff00000 !important",
                    color: "#008b9c",
                    textTransform: "math-auto",
                  }}
                >
                  Show
                </StyledMainBtn>
              </ListItem>
              {editId &&<StyledMainBtn
                  onClick={() => handleEdit(item.id, item.name)}
                  sx={{
                    fontWeight: "bold",
                    fontSize: ".9rem",
                    bgcolor: "#fff00000 !important",
                    color: "#0a9c",
                    textTransform: "math-auto",
                  }}
                >
                Submit 
                  
                </StyledMainBtn>}
                </Box>
            ) : null
          )
        ) : (
          <Typography>There is no academic year created yet.</Typography>
        )}
      </List>
      <form
        action="#"
        onSubmit={handleFormSubmit}
        style={{
          flexDirection: "column",
          gap: ".75rem",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "1rem",
          width: "100%",
        }}
      >
        <Typography sx={{ fontSize: ".9rem" }}>{inpVal.msg}</Typography>

        <FormGroup style={{ width: "100%" }}>
          <InputLabel
            sx={{
              textAlign: "left",
              color: "#6e6e6e",
            }}
            htmlFor={"Academic-Year"}
          >
            Academic Year
          </InputLabel>

          <Input
            className="borderAfter"
            value={inpVal.val}
            id={"Academic-Year"}
            fullWidth
            variant="standard"
            sx={{
              fontSize: ".8rem",
              paddingTop: "0",
            }}
            onChange={handleChange}
            inputProps={{
              placeholder: "enter in this format YYYY/YYYY",
              classes: {
                notchedOutline: {
                  borderWidth: "1px",
                  borderColor: "yellow !important",
                },
              },
            }}
          />
        </FormGroup>
        <StyledMainBtn
          sx={{
            bgcolor: "#fff00000 !important",
            color: "#FF5C00",
            border: "4px solid #FF5C00",
            letterSpacing: "1px",
            fontWeight: ".5px",
            fontSize: "1rem",
            width: "100% !important",
            textTransform: "math-auto",
          }}
          type="submit"
        >
          Create
        </StyledMainBtn>
      </form>
    </Box>
  );
};

export default CreateAcademicYear;
