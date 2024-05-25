import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LevelOptions = ({LevelOption , setLevelOption , position  ,mxwidthprop}) => {

  const handleChange = (event) => {
    setLevelOption(event.target.value)
  };



  return (
    <div>
      <FormControl variant="standard" sx={{  
        position:`${!position ? 'absolute' : "static"}`,
        top:"6rem",
        right:"1rem",
        zIndex:"1000", 
        maxWidth:mxwidthprop,
    
         minWidth: `${mxwidthprop ? 'auto ': 120}` , }}
         
         >

        <InputLabel
        // error={error}
        sx={{ color: '#333 !important' }} // Label text color

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
