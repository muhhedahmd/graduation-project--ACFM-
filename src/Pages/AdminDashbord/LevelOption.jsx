import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LevelOptions = ({LevelOption ,left, setLevelOption  ,position, top  ,mxwidthprop}) => {

  const handleChange = (event) => {
    setLevelOption(event.target.value)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  
        position:position,

        top:`${!top ? '5rem' : 0}`,
        right:`${left ? '0rem' : "1rem"}`,
        zIndex:"1000", 
        width:mxwidthprop ? mxwidthprop : 120,
    
         minWidth: `${mxwidthprop ? 'auto ': 120}` , }}
         
         >

        <InputLabel
   sx={{

          color: '#333 !important' }} // Label text color

         id="demo-simple-select-standard-label">Level</InputLabel>
        <Select

          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={LevelOption}
          onChange={handleChange}
          label="Level"
        >
          <MenuItem value="1">
          </MenuItem>
          <MenuItem value={"1"}>First level</MenuItem>
          <MenuItem value={"2"}>Secound level</MenuItem>
          <MenuItem value={"3"}>Third level</MenuItem>
          <MenuItem value={"4"}>Fourth level</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default LevelOptions;
