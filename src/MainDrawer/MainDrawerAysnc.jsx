import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import UseAuth from '../Components/Contexts/Authantication';
import { useCourseContext } from '../Components/Contexts/CourseContexts';

const Asynchronous = React.memo(() => {
  const { SelectedCourse, MainDrawerCourse } = useCourseContext();
  const { Data } = UseAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [isInitialOpen, setIsInitialOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://optima-software-solutions.com/apis/courseshow.php?userid=${Data.user.id}`);
        let filteredOptions = res.data;
        if (Data.user.access !== "Admin") {
          filteredOptions = res.data.filter(option => option.status === "In Progress");
        }
        setOptions(filteredOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (open && options.length === 0 && isInitialOpen) {
      fetchData();
      setIsInitialOpen(false);
    }
  }, [open]);

  const handleCourseChange = (event, newValue) => {
    SelectedCourse(newValue);
  };
 

  return (
    <Autocomplete
      value={MainDrawerCourse || (options.length > 0 ? options[0] : null)} // Select the first item from options if MainDrawerCourse is undefined
      onChange={handleCourseChange}
      id="asynchronous-demo"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.coursename === value?.coursename}
      getOptionLabel={(option) => option.coursename}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          label="Asynchronous"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading && <CircularProgress color="inherit" size={20} />}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
});

export default Asynchronous;
