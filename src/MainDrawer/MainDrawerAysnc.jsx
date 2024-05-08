import React, { useEffect, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import UseAuth from '../Components/Contexts/Authantication';
import { useCourseContext } from '../Components/Contexts/CourseContexts';

const Asynchronous = React.memo(() => {
  const { SelectedCourse } = useCourseContext();
  const { Data, MainDrawerCourse } = UseAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://optima-software-solutions.com/apis/courseshow.php?userid=${Data.user.id}`);
      console.log(res.data);
      setOptions(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open && options.length === 0) {
      fetchData();
    }
  }, [open, options]);

  const memoizedOptions = useMemo(() => options, [options]);

  const handleCourseChange = (event, newValue) => {
    SelectedCourse(newValue);
    console.log(newValue);
  };

  return (
    <Autocomplete
      value={MainDrawerCourse && MainDrawerCourse}
      onChange={handleCourseChange}
      id="asynchronous-demo"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.coursename === value.coursename}
      getOptionLabel={(option) => option.coursename}
      options={memoizedOptions}
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
