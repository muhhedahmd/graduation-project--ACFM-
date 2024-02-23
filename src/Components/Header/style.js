import styled from "@emotion/styled";
import { ListItem } from "@mui/material";

export const StyledListItemCenter = styled(ListItem)(({gap , theme})=>{
    return {
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"center",
        gap: `${gap}rem`,


    }
})