import { Box } from "@mui/material";
import {motion} from 'framer-motion'
const AcdamicYear = ({ title , AcadmicSelect }) => {


  return (
    <motion.div
     whileHover={{
                  background:"rgb(225 225 225)"
                }}
     whileTap={{
                  background:"rgb(255 255 255)"
                }}
                
      style={{

        cursor:"pointer",
    borderRadius: "10px",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "22rem",
        background: `${AcadmicSelect === title ? "rgb(225 225 225)" :"#fff"}`,
        padding: "1rem",
        boxShadow: "3px 3px 4px #dedede",
        
      }}
    >
     AcadmicYear : {title}
      <Box
        sx={{
          width: "100%",
          "apexcharts-legend-marker": {
            background: "#222 !important",
          },
        }}
      >
        in complete
      </Box>
    </motion.div>
  );
};

export default AcdamicYear;
