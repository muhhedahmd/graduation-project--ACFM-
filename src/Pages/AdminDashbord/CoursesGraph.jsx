import * as React from "react";
import { Box, Typography } from "@mui/material";

import { useState } from "react";
import { extractCourseDetails, mergeCategories, removeDuplicateUsersWithCourses } from "../../utils.js/removeduplicated";
import { useEffect } from "react";
import { PieChart } from "@mui/x-charts";









export default function CoursesGraph({ AcadmicYearData }) {


  const catagoryCourses = mergeCategories(extractCourseDetails(removeDuplicateUsersWithCourses((AcadmicYearData))))
  console.log(removeDuplicateUsersWithCourses((AcadmicYearData)))

  
  
  const [filesCountArray, setFilesCountArray] = useState(null);   
  useEffect(() => {
    if (catagoryCourses && Object.values(catagoryCourses).length > 0) {
      const newData = Object.values(catagoryCourses).map(course =>
        course.categories.map(category => category.filesCount)
      );
      setFilesCountArray(newData);
    } else {
      setFilesCountArray([]); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);





  console.log('catagoryCourses' , catagoryCourses)
  return (

<>


 {filesCountArray ?
  <Box
  sx={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
    gap: "2rem",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%", 
    maxWidth: "100%", 
    height: "100%",
    overflowX: "auto", 
        padding: "1rem",
  }}
>
  {Object.keys(catagoryCourses).map((item) => (
    <Box
      key={item}
      sx={{
        flexShrink: 0,
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        gap:"1rem",
        height:"30rem",
        width:"30rem",
        borderBottom: "2px solid #ccc",

        overflow: "hidden",
      }}
    >
    <Typography 
    variant="body1"
    sx={{
      marginBottom:"-12rem"
    }}
    component={"p"}
    >
    {item}
    </Typography>
      <PieChart
        sx={{
      // marginBottom:"-10rem"
    }}
        width={500}
        height={420}
        series={[
          {
            data: catagoryCourses[item]?.categories.map((category, index) => (
              {

              value: category.filesCount,
              id: index,
              label: category.categoryName,
              }
            )),
            innerRadius: 30,
            outerRadius: 80,
            paddingAngle: -10,
            cornerRadius: 0,
            startAngle: -51,
            endAngle: 189,
            cx: 130,
            cy: 200,
          },
        ]}
      />
    </Box>
  ))}
</Box>
 :""}

 
</>

  
)}
