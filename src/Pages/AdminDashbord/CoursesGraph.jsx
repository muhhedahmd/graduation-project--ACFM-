import * as React from "react";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts";
import { calculateFileProgress2x } from "../../utils.js/removeduplicated";

const categories = ["lecture notes", "Books", "Attendance", "Exams And Model Answer", "Assignments", "Final Exams"];

export default function CoursesGraph({ AcadmicYearData }) {
  const [processedData, setProcessedData] = useState([]);

  useEffect(() => {
    const data = calculateFileProgress2x(AcadmicYearData);
    setProcessedData(data);
  }, [AcadmicYearData]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(800px, 1fr))",
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
      {processedData.map((course) => (
        <Box
          key={course.courseName}
          sx={{
            flexShrink: 0,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            gap: "1rem",
            height: "280px",
            width: "100%",
            borderBottom: "2px solid #ccc",
            overflow: "hidden",
          }}
        >
          <Typography variant="h6">{course.courseName}</Typography>

          <BarChart
            series={course.users.map((user) => ({
              data: categories.map((category) => user.progress[category]),
              stack: "stack",
              label: user.userName,
            }))}
            barLabel={(item, context) => {
              if ((item.value ?? 0) > 10) {
                return 'High';
              }
              return context.bar.height < 60 ? null : item.value?.toString();
            }}
            xAxis={[{ scaleType: "band", data: categories }]}
            width={1200}
            height={270}
          />
        </Box>
      ))}
    </Box>
  );
}
