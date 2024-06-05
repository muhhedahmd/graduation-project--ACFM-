import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SemsterOptions = ({position  ,top ,  mxwidthprop , left, setsemsterOption , semsterOption}) => {

  const handleChange = (event) => {
    setsemsterOption(event.target.value)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  
        position:position,

        top:top ,
        right :left,
        zIndex:"1000", 
        width:mxwidthprop ? mxwidthprop : 120,
    
         minWidth: `${mxwidthprop ? 'auto ': 120}` , }}
         >
        <InputLabel
        // error={error}
        
        sx={{

           color: '#333 !important' }} // Label text color

         id="demo-simple-select-standard-label">Semster</InputLabel>
        <Select

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={semsterOption}
          onChange={handleChange}
          label="Semster"
        >
          <MenuItem value="Fall">
          </MenuItem>
          <MenuItem value={"Fall"}>Fall</MenuItem>
          <MenuItem value={"Spring"}>Spring</MenuItem>
          <MenuItem value={"Summer"}>Summer</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SemsterOptions;
