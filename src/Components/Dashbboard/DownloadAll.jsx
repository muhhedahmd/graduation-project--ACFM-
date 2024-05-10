import React, { useState } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import JSZip from "jszip";
import axios from "axios";
import { useCourseContext } from "../Contexts/CourseContexts";
import UseAuth from "../Contexts/Authantication";

const DownloadAll = ({ page  ,FileState , AllFiles }) => {
  const {MainDrawerCourse} = useCourseContext()
  const {Data} = UseAuth()
  // const { state } = useFile();
  const theme = useTheme();
  const [downloadLink, setDownloadLink] = useState(null);
  const AllCatagories = [
    'ecture notes',
'books',
'Attendance',
'ExamsAndSolutions',
'Assignments',
'GenerateReport',
'Admin files',
'Final Exams',
'Student Survey',
  ]
  const [AllFilesData  , setAllFilesData  ] =useState([]) 
  const handleDownloadRAR = async () => {
    if(!AllFiles){
      
      const zip = new JSZip();
      const promises = [];
      
      FileState.forEach((file, index) => {
        const promise = axios
        .get(file.filename, { responseType: "blob" })
        .then((response) => {
          zip.file(`file_${index}.pdf`, response.data, {
            binary: true,
          });
        })
        .catch((error) => {
          console.error("Error fetching file:", error);
        });
        promises.push(promise);
      });
      
      try {
        await Promise.all(promises);
        const blob = await zip.generateAsync({ type: "blob" });
        
        // Download the RAR archive
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'files.rar');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating RAR archive:", error);
      }
    } else {
      try {
        // Fetch data from the API
        const promisesAPI = AllCatagories.map(async (item) => {
          try {
            const res = await axios.post('https://optima-software-solutions.com/apis/filesshow.php', {
              "userid": Data.user.id,
              "courseid": MainDrawerCourse.courseid,
              "category": item
            });
            // Return the data
            return res.data;
          } catch (err) {
            console.log(err);
            // Return an empty array if there's an error
            return [];
          }
        });
    
        // Wait for all promises to resolve
        const resultsAPI = await Promise.all(promisesAPI);
    
        // Concatenate all data arrays
        const newData = resultsAPI.reduce((acc, data) => {
          return [...acc, ...data];
        }, []);
    
        // Update the state with the new data
        setAllFilesData(newData);
    
        // Generate zip archive
        const zip = new JSZip();
        const promisesZip = [];
    
        AllFilesData.forEach((file, index) => {
          const promise = axios
            .get(file.filename, { responseType: "blob" })
            .then((response) => {
              zip.file(`file_${index}.pdf`, response.data, {
                binary: true,
              });
            })
            .catch((error) => {
              console.error("Error fetching file:", error);
            });
          promisesZip.push(promise);
        });
    
        await Promise.all(promisesZip);
        const content = await zip.generateAsync({ type: "blob" });
    
        // Download the RAR archive
        const url = URL.createObjectURL(content);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'files.rar');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating RAR archive:", error);
      }
    }
    
    
    
    // Assuming you have the JSON array stored in a variable called `files`
  }
  console.log("AllFilesData" , AllFilesData)

 
    
  return (
    <div>
      <Button
        href={downloadLink}
        download={`${page}.rar`}
        color="primary"
        variant="text"
        sx={{
          padding: ".2rem .7rem",
          width: "100%",
          boxShadow: "none",
          bgcolor: theme.palette.primary.paper,
          color: "#fff",
          textTransform: "capitalize",
          "&:hover , &:focus": {
            bgcolor: theme.palette.primary.paper,
            color: "#fff",
            boxShadow: "4px 4px 0px #000",
          },
        }}
        onClick={handleDownloadRAR}
      >
        Download All
      </Button>
    </div>
  );
};

export default DownloadAll;
