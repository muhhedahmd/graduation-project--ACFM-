import React, { useState } from "react";
import {
  Box,
  
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { StyledMainBtn } from "../../MainDrawer/style";

const EditCourseDialog = ({ open, onClose, course, isLoading,  onSave }) => {
  const [editedCourse, setEditedCourse] = useState(course);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse({ ...editedCourse, [name]: value });
  };

  const handleSave = () => {
    onSave(editedCourse);
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Course</DialogTitle>
      <DialogContent>
        <Box
        sx={{
            width:"30vw",
            scrollBehavior:"smooth"
        }}
        
         display="flex" flexDirection="column" gap="1rem">
          <TextField
            label="Course Name"
            name="coursename"
            value={editedCourse.coursename}
            onChange={handleChange}
          />
          <TextField
            label="Academic Year"
            name="academicyear"
            value={editedCourse.academicyear}
            onChange={handleChange}
          />
          <TextField
            label="Semester"
            name="semester"
            value={editedCourse.semester}
            onChange={handleChange}
          />
          <TextField
            label="Program"
            name="general"
            value={editedCourse.general}
            onChange={handleChange}
          />
          <TextField
            label="Is Completed"
            name="iscompleted"
            value={editedCourse.iscompleted}
            onChange={handleChange}
          />
          <TextField
            label="Abbreviation"
            name="abbreviation"
            value={editedCourse.abbreviation}
            onChange={handleChange}
          />
          <TextField
            label="Bylaw"
            name="bylaw"
            value={editedCourse.bylaw}
            onChange={handleChange}
          />
          <TextField
            label="Credit Hour"
            name="credit_hour"
            value={editedCourse.credit_hour}
            onChange={handleChange}
          />
          <TextField
            label="Lab"
            name="teaching_hours_training"
            value={editedCourse.teaching_hours_training}
            onChange={handleChange}
          />
          <TextField
            label="Level"
            name="level"
            value={editedCourse.level}
            onChange={handleChange}
          />
          <TextField
            label="Lecture"
            name="lecture"
            value={editedCourse.lecture}
            onChange={handleChange}
          />
          <TextField
            label="Practical"
            name="practical"
            value={editedCourse.practical}
            onChange={handleChange}
          />
          <TextField
            label="Final"
            name="final"
            value={editedCourse.final}
            onChange={handleChange}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <StyledMainBtn  onClick={onClose}
        sx={{
            color:"#f03",
            border:"2px solid #f03"
        }}
        colorProp="#fff">
           {isLoading ? 
            <CircularProgress sx={{ color: '#f03' }} />
 :
          'Close'
        }
        </StyledMainBtn>
        <StyledMainBtn 
         sx={{
            color:"#ff5c00",
            border:"2px solid #ff5c00"
        }}
        colorProp="#fff"
        
        onClick={handleSave} color="primary">

        {isLoading ? 
            <CircularProgress sx={{ color: '#ff5c00' }} />
 :
          'Save'
        }
        </StyledMainBtn>
      </DialogActions>
    </Dialog>
  );
};

export default EditCourseDialog;
