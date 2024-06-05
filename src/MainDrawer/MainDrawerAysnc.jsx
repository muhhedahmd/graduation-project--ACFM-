import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import UseAuth from '../Components/Contexts/Authantication';
import { useCourseContext } from '../Components/Contexts/CourseContexts';
import { useAcademicYear } from '../Components/Contexts/AcadmicYearContext';
import useFetchData from './CostumFetch';

const Asynchronous = React.memo(({ LevelOption, acadamicOptions , SetselectCourse , semesterOptions, setSemesterOptions
  , assign }) => {
  const { SelectedCourse, MainDrawerCourse } = useCourseContext();
  const { Data } = UseAuth();
  const [open, setOpen] = useState(false);

  const { academicYears } = useAcademicYear();


  const { options, loading } = useFetchData({ 
    Data, 
    LevelOption, 
    semesterOptions, 
    acadamicOptions, 
    MainDrawerCourse, 
    academicYears, 
    SelectedCourse 
  });


  const handleCourseChange = (_, newValue) => {
    if(assign){

      SetselectCourse((prev)=>{return [...prev , newValue]})
    }
    else {

      SelectedCourse(newValue);
    }
  };

  return (
    <Autocomplete
      value={MainDrawerCourse || (options.length > 0 && options[0])}
      onChange={handleCourseChange}
      id="asynchronous-demo"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option?.coursename === value?.coursename}
      getOptionLabel={(option) => {
        const academicYear = academicYears.find(year => year.id === option.academicyear);
        if (academicYear) {
          return `${option.coursename} - ${academicYear.name}`;
        } else {
          return option.coursename;
        }
      }}
      options={Array.isArray(options) ? options : []}
      loading={loading}
      renderInput={(params) => (
        <TextField
          variant="standard"
          {...params}
          label="Courses"
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
