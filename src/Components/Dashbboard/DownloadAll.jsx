import React, { useState } from "react";
import { Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import JSZip from "jszip";
import axios from "axios";
import { useFile } from "../Contexts/FileContext";

const DownloadAll = ({ page }) => {
  const { state } = useFile();
  const theme = useTheme();
  const [downloadLink, setDownloadLink] = useState(null);

  const handleDownloadRAR = async () => {
    const zip = new JSZip();
    const promises = [];

    state.uploadedFiles.forEach((file, index) => {
      const promise = axios
        .get(file.url, { responseType: "blob" })
        .then((response) => {
          zip.file(file.file.name + `${index}.pdf`, response.data, {
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
      const url = URL.createObjectURL(blob);
      setDownloadLink(url);
    } catch (error) {
      console.error("Error generating RAR archive:", error);
    }
  };

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
