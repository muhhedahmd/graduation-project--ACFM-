import { FormGroup } from "@mui/material"
import styled from "styled-components"


export const StyledFormGroup = styled(FormGroup)(({theme})=>{
    return {
        display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  overflowY:"auto",
                  maxHeight:"23rem",
                  flexWrap:"nowrap",
                  width:"max-content",
                  '&::-webkit-scrollbar': {
  width: "6px", /* Set the width of the scrollbar */
},

"&::-webkit-scrollbar-thumb" :{
  backgroundColor: "#888", /* Set the color of the scrollbar thumb */
 borderRadius: "3px", /* Set the border radius of the scrollbar thumb */
},

'&::-webkit-scrollbar-thumb:hover': {
  backgroundColor: "#555", /* Set the color of the scrollbar thumb on hover */
},

"&::-webkit-scrollbar-track" :{
  backgroundColor:" #f1f1f1", /* Set the color of the scrollbar track */
  borderRadius: "3px", /* Set the border radius of the scrollbar track */
}
    }
})