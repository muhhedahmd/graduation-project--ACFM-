import React, { useState } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import JSZip from "jszip";
import axios from "axios";
import { useCourseContext } from "../Contexts/CourseContexts";
import { useFileContext } from "../Contexts/FileCourseContext";
import { useUserContext } from "../Contexts/UserContexts";

const DownloadAll = ({ page  , AllFiles , title , bgcolor }) => {
  const {state} = useFileContext()
  const {users} = useUserContext()
  const {MainDrawerCourse} = useCourseContext()

  const theme = useTheme();
  const [downloadLink,] = useState(null);
  const AllCatagories = [
    'lecture notes',
'books',
'Attendance',
'ExamsAndSolutions',
'Assignments',
'GenerateReport',
'Admin files',
'Final Exams',
'Student Survey',
  ]
  const [AllFilesData  ,   ] =useState([]) 
  const handleDownloadRAR = async () => {
    if (!AllFiles) {
        const zip = new JSZip();
        const promises = [];

        state?.uploadedFiles?.forEach((file, index) => {
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
                const promisesUser = users.map(async (user) => {
                    try {
                        const res = await axios.post('https://optima-software-solutions.com/apis/filesshow.php', {
                            "userid": user.id,
                            "courseid": MainDrawerCourse.courseid,
                            "category": item
                        });
                        return res.data;
                    } catch (err) {
                        console.log(err);
                        return [];
                    }
                });
                return await Promise.all(promisesUser);
            });

            // Wait for all promises for all categories to resolve
            const resultsAPI = await Promise.all(promisesAPI);

            // Flatten the results and concatenate all data arrays
            const newData = resultsAPI.flat().reduce((acc, data) => {
                return [...acc, ...data];
            }, []);

            // Generate zip archive
            const zip = new JSZip();
            const promisesZip = [];

            // Loop over files to download
            newData.forEach((file, index) => {
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

            // Wait for all file download promises to resolve
            await Promise.all(promisesZip);

            // Generate the zip content
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

    console.log("AllFilesData", AllFilesData);
}

 
    
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
       {title }
      </Button>
    </div>
  );
};

export default DownloadAll;
