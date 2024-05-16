import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const CourseOptions = ({  values ,  setCourseOption , CourseOption}) => {

  const handleChange = (event) => {
    setCourseOption(event.target.value)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  

        position:"absolute",
        top:"0rem",
        right:"5rem",
        zIndex:"1000",    
    
         minWidth: 120 }}>
        <InputLabel
        // error={error}
        sx={{ color: '#333 !important' }} // Label text color

         id="demo-simple-select-standard-label">Course</InputLabel>
        <Select

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={CourseOption}
          onChange={handleChange}
          label="Courses"
        >
        
            {
                values && values.length > 0 &&                values?.map((course ,i )=>{
          return (<MenuItem key={i} value={course}>{course}</MenuItem>)

            })}
          
        </Select>
      </FormControl>
    </div>
  );
}

export default CourseOptions;
