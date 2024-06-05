import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const ProgramOptions = ({  top , setProgramOption  ,position, ProgramOption}) => {

  const handleChange = (event) => {
    setProgramOption(event.target.value)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  
        position:position,

        top:`${!top ? '10rem' : 0}`,
        right:"1rem",
        zIndex:"1000",  
    
         minWidth: 120 }}>
        <InputLabel
  sx={{

           color: '#333 !important' }} // Label text color

         id="demo-simple-select-standard-label">Program</InputLabel>
        <Select

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={ProgramOption}
          onChange={handleChange}
          label="Program"
        >
    <MenuItem  value='general'>{'General'}</MenuItem>
        
      
            <MenuItem  value={'CS'}>{'CS'}</MenuItem>
            <MenuItem  value={'IS'}>{'IS'}</MenuItem>
            <MenuItem  value={'AI'}>{'AI'}</MenuItem>
            <MenuItem  value={'NT'}>{'NT'}</MenuItem> 

            
          
        </Select>
      </FormControl>
    </div>
  );
}

export default ProgramOptions;
