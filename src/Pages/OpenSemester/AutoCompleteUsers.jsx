import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
// import { v4 as uuid5 } from '';
import { useState } from 'react';
import { useImperativeHandle } from 'react';


const courses =   [
    {
      checked:false,
      courseName: "Math 1",
      courseCode: "MATH101",
      byLaw: "Required",
      level: "100",
      creditHours: 3,
      semester: "Fall",
      program: "Computer Science",
      schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
      room: "Room 101",
    },
    {
      checked:false,
      // id: 2,
      courseName: "Physics 1",
      courseCode: "PHY101",
      byLaw: "Required",
      level: "100",
      creditHours: 3,
      semester: "Fall",
      program: "Computer Science",
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      room: "Room 102",
    },

    {
      checked:false,
      courseName: "Advanced Programming",
      courseCode: "COMP301",
      byLaw: "Elective",
      level: "300",
      creditHours: 4,
      semester: "Spring",
      program: "Computer Science",
      schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
      room: "Room 201",
    },
    {
      checked:false,
      courseName: "Advanced Software Engineering",
      courseCode: "COMP401",
      byLaw: "Elective",
      level: "400",
      creditHours: 4,
      semester: "Spring",
      program: "Computer Science",
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      room: "Room 202",
    },
  

    {

      checked:false,
      courseName: "Database Management Systems",
      courseCode: "COMP201",
      byLaw: "Elective",
      level: "200",
      creditHours: 3,
      semester: "Summer",
      program: "Computer Science",
      instructor: "Dr. White",
      schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
      room: "Room 301",
    },
    {
      semester:"Summaer",
      checked:false,
      courseName: "Network Security",
      courseCode: "COMP501",
      byLaw: "Elective",
      level: "500",
      creditHours: 4,
      program: "Computer Science",
      instructor: "Dr. Black",
      schedule: "Tue, Thu 11:00 AM - 12:30 PM",
      room: "Room 302",
    },
   
  ]
export default React.forwardRef(

  function   AsynchronousAutoCompete( props, ref) {

    const [open, setOpen] = React.useState(true);
    const [options, setOptions] = React.useState([...courses]);
    const loading = open && options.length === 0;
  
    // useEffect(() => {
    //   let active = true;
  
    //   if (!loading) {
    //     return undefined;
    //   }
  
    //   (async () => {
    //     await sleep(1e3); // For demo purposes.
  
    //     if (active) {
    //       setOptions([...courses]);
    //     }
    //   })();
  
    //   return () => {
    //     active = false;
    //   };
    // }, [loading]);
  

    React.useEffect(() => {
      if (!open) {
        setOptions([]);
      }
    }, [open]);
    const [selectedItem, setSelectedItem] = useState(null);
    const HandleClear= ()=> setSelectedItem(null)
    useImperativeHandle(ref, () => ({
      selected: selectedItem,
      HandleClear: HandleClear,
      }));

    const handleUserChange = (event, newValue) => {
      if(newValue)
      {

        setSelectedItem(newValue) 
      }
      else {
        setSelectedItem(null)
      }

    };
  
    return (
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: "100%" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.courseName === value.courseName}
        getOptionLabel={(option) => option.courseName +" " +  option.courseCode  }
        options={options}
        loading={loading}
        ref={ref}
        onChange={(e , newValue)=>handleUserChange(e , newValue)}
        
        renderInput={(params) => (
          <TextField
            {...params}
            label="Asynchronous"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    );
  }
)  

