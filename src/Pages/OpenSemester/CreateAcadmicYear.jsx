import { Box,  FormGroup, Input, InputLabel, List, ListItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useAcademicYear } from "../../Components/Contexts/AcadmicYearContext";

const CreateAcadmicYear = () => {
  const [inpVal , setInpVal] = useState({val:"" , msg: ""})
  const  { academicYears,  addAcademicYear, deleteAcademicYear} = useAcademicYear()




  const HandleDelete = async (id) => {
    deleteAcademicYear(id)
  };
  const handleFormSubmit = (e)=>{
    e.preventDefault()
    const pattern = /^\d{4}\/\d{4}$/; // Pattern for "YYYY/YYYY" format
    console.log(pattern.test(inpVal.val) , inpVal)
  // Check if the input value matches the pattern
  if (pattern.test(inpVal.val)) {
    // Check if the input value exists in the list of academic years
    const exists = academicYears.some(academicYear => academicYear.name === inpVal.val);
    console.log(exists , academicYears)
    
    if (!exists ) {
      addAcademicYear(inpVal.val)

    } else {
        setInpVal((prev)=>{
            return {
                ...prev , msg:'Value matches the pattern but already exists in '
            }
        })
    }
  } else {
    setInpVal((prev)=>{
        return {
            ...prev , msg:"Value doesn't match the pattern YYYY/YYYY"
        }
    })
  }


  }

  const handleChange =(e)=>{
    setInpVal((prev)=>{
        return {
            ...prev , val: e.target.value
        }
    })  }

  return (
    <Box
      sx={{
        overflow:"auto",
        borderRadius: "6px",
        width: "40%",
        bgcolor: "#fff",
        boxShadow: "3px 3px 4px #dedede ",
        height: "94%",
      }}
    >
      <List
      sx={{
        height:"20rem",
        maxHeight:"22rem",
        overflow:"auto"
      }}
      >
        <ListItem>
          <Typography variant="h5" component={"div"}>
            Last Acadmic Years
          </Typography>
        </ListItem>

        {academicYears.length > 0 ? (
  academicYears.map((item) => 
    item.name && (
      <ListItem
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
        key={item.id}
      >
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
        <StyledMainBtn
          onClick={() => HandleDelete(item.id)}
          sx={{
            fontSize: ".9rem",
            bgcolor: "#fff00000 !important",
            color:"#f01",
            textTransform: "math-auto",
          }}
        >
          Delete
        </StyledMainBtn>
        <StyledMainBtn
          onClick={() => HandleDelete(item.id)}
          sx={{
            fontSize: ".9rem",
            bgcolor: "#fff00000 !important",
            color:"#008b9c",
            textTransform: "math-auto",
          }}
        >
          Edit
        </StyledMainBtn>
      </ListItem>
    )
  )
) : (
  <Typography>
    There is no academic year created yet.
  </Typography>
)}

      </List>
        <form
        action="#"
        onSubmit={handleFormSubmit}
        style={{
            flexDirection:"column",
            gap:".75rem",
            display:"flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            padding:"1rem"
        }}
        >

<Typography
sx={{
    fontSize:".9rem",
}}
>
    {inpVal.msg}
</Typography>

    <FormGroup  style={{ width: "100%" }}>


 
<InputLabel
//   error={isError}
  sx={{
    textAlign: "left",
    color: "#6e6e6e",
  }}
  htmlFor={"Acadmic-Year"}
>
Acadmic Year
</InputLabel>

<Input

  className="borderAfter"
  value={inpVal.val}

  id={'Acadmic-Year'}
  fullWidth
  variant="standard"
  sx={{
    fontSize: ".8rem",
    paddingTop: "0",
  }}
  onChange={handleChange}
  inputProps={{
    placeholder: "enter in this format YYYY / YYYY ",
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
            color:"#FF5C00",
            border:"4px solid #FF5C00",
      letterSpacing:"1px",
      fontWeight:".5px",
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

export default CreateAcadmicYear;
