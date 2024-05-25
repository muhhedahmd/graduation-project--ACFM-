import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useAcademicYear } from '../Components/Contexts/AcadmicYearContext';

const AcadamicOptions = ({acadamicOptions, setAcadamicOptions , position  ,mxwidthprop}) => {

    const {academicYears} = useAcademicYear()
  const handleChange = (event) => {
    setAcadamicOptions(event.target.value)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  
 
        zIndex:"1000", 
           
    
         maxWidth:mxwidthprop}}
         
         >

        <InputLabel
        // error={error}
        sx={{ color: '#333 !important' }} // Label text color

         id="demo-simple-select-standard-label">Year</InputLabel>
        <Select

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={acadamicOptions}
          onChange={handleChange}
          label="Level"
        >
        {academicYears.map((item)=>{
          return <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>

        })}
       
        </Select>
      </FormControl>
    </div>
  );
}

export default AcadamicOptions;
