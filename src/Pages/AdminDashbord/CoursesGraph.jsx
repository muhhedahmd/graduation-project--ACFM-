import * as React from "react";
import { Box, Stack } from "@mui/material";

import { BarChart } from '@mui/x-charts/BarChart';

// import HighlightedCode from '@mui/docs/HighlightedCode';
import { useMediaQuery } from "@mui/material";
import { useState } from "react";
import { extractCourseDetails, extractCourseNames, mergeCategories, removeDuplicateUsersWithCourses } from "../../utils.js/removeduplicated";
import { useEffect } from "react";









export default function CoursesGraph({ AcadmicYearData }) {

  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));

  console.log(removeDuplicateUsersWithCourses(AcadmicYearData))
  const courseNames = extractCourseNames(
    removeDuplicateUsersWithCourses(AcadmicYearData)
  );

  const catagoryCourses = mergeCategories(extractCourseDetails(removeDuplicateUsersWithCourses((AcadmicYearData))))
  

  
  
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
  }, [catagoryCourses]);



  const barChartsParams = {
    series: Object?.values(catagoryCourses[Object.keys(catagoryCourses)[0]]?.categories)?.map((category, i) => ({
      id: `category-${i}`,
      data: Object?.values(catagoryCourses)?.map(course => course.categories[i]?.filesCount),
      label: category.categoryName,
      
      highlightScope: {
        highlighted: 'item',
      },
    })),
    xAxis: [{ data: Object.keys(catagoryCourses), scaleType: 'band', id: 'deaultized-x-axis-0' }],
    height: isSm ?240  : 270
  };

  return (<>

  {filesCountArray ? (<Stack
        
          xAxis={[
            {
              data: courseNames,
              scaleType: "band",
            },
          ]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          yAxis={[{ max: 50 }]}
    direction={{ xs: 'column', md: 'column' }}
    spacing={{ xs: 0, md: 4 }}
    sx={{ width: '100%' }}
  >
    <Box sx={{ flexGrow: 1 }}>
      <BarChart
        {...barChartsParams}
        


      />
    </Box>

  </Stack>)
  :""
  }
  </>

  );
}
