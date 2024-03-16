import { FormControl, Input } from "@mui/material";
import CustomAutocomplete from "../../MainDrawer/AutoComplete";


export default function CatagoryOptions() {
    const options = ["a" ,"b" , "c"]
    
  return (
<CustomAutocomplete isexpand={true} options={options} placeholder="Select a Category"/>
  );
}