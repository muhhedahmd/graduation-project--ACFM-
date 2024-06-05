import {
  CircularProgress,
} from "@mui/material";
import React, {  useRef } from "react";
import P1Report from "./P1Report";
import P3report from "./P3report";
import jsPDF from "jspdf";
import P4Report from "./P4Report";
import html2canvas from "html2canvas";
import P2report from "./P2Report";
import { useFileContext } from "../../Components/Contexts/FileCourseContext";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";
import { StyledMainBtn } from "../../MainDrawer/style";
import { useDoctorReportContext } from "../../Components/Contexts/DoctorReportContext";
import UseAuth from "../../Components/Contexts/Authantication";

const Reportprint = ({ printRef, mainReportState    , setDataReportDr, dataReportDr , CourseReport}) => {
  const {  progressContext } = useFileContext();
  const { MainDrawerCourse } = useCourseContext();
  const { reports, editReport, addReport  } = useDoctorReportContext();
  const {Data} = UseAuth()
const {uploadFile} = useFileContext()
  const p1Ref = useRef(null);
  const p3Ref = useRef(null);
  const p2Ref = useRef(null);
  const p4Ref = useRef(null);

  const handleDownloadPdf = async (save) => {
    const refs = [p1Ref, p2Ref, p3Ref, p4Ref];
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const scaleFactor = 1.5;

    for (let i = 0; i < refs.length; i++) {
      const input = refs[i].current;
      const canvas = await html2canvas(input, {
        useCORS: true,
        scale: scaleFactor,
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.8);
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgHeight = pdfHeight;
      const imgWidth = (canvasWidth * imgHeight) / canvasHeight;

      if (imgWidth > pdfWidth) {
        const adjustedHeight = canvasHeight * (pdfWidth / canvasWidth);
        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, adjustedHeight);
      } else {
        pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
      }

      if (i < refs.length - 1) {
        pdf.addPage();
      }
    }
    if(save){
      const pdfx = pdf.output("blob"); // Use "blob" instead of "file"
      
      // // Upload the PDF file (assuming you have an uploadFile function)
      await uploadFile(pdfx, '', Data?.user?.id, MainDrawerCourse?.courseid, "GenerateReport");
      
      console.log(pdfx)
          // console.log('File upload complete');
    }else {
      pdf.save("Report.pdf");

    }

  };






  const HandleSavePdf = async () => {
    const ifExisit = reports.some((rep) => rep.courseid === MainDrawerCourse.courseid);

    if (!MainDrawerCourse.courseid) {
      alert("Please select the course");
      return;
    }

    if (ifExisit) {
      try {
        editReport( CourseReport.id, { ...dataReportDr, courseid: MainDrawerCourse.courseid });
      handleDownloadPdf(true)
      } catch (error) {
        console.error("Error occurred:", error);
      }
    } else {
      handleDownloadPdf(true)
      
      addReport({ ...dataReportDr, courseid: MainDrawerCourse.courseid });
    }
  };
  return (
    <div
      ref={printRef}
      className="course-report"
      style={{
        overflow: "scroll",
        // padding: "1rem",
        display: "flex:",
        justifyContent: "center",
        alignItems: "flex-start",
        maxHeight: "98vh",
        width: "90%",
        scrollBehavior: "smooth",
        margin: ".5rem auto",
        padding: "1rem",
        border: "2px solid #000",
        background: "#fff",
      }}
    >
      <div ref={p1Ref}>
        <P1Report mainReportState={mainReportState} p1Ref={p1Ref} />
      </div>
      <div>
        <P2report
          dataReportDr={dataReportDr}
          setDataReportDr={setDataReportDr}
          CourseReport={CourseReport}
          p2Ref={p2Ref}
        />
      </div>
      <div>
        <P3report
          CourseReport={CourseReport}
          dataReportDr={dataReportDr}
          setDataReportDr={setDataReportDr}
          p3Ref={p3Ref}
        />
      </div>
      <div>
        <P4Report
          CourseReport={CourseReport}
          dataReportDr={dataReportDr}
          setDataReportDr={setDataReportDr}
          p4Ref={p4Ref}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "1rem",
        }}
      >
        <StyledMainBtn
          width="10rem"
          colorProp="#07f"
          sx={{
            color: "#fff",
          }}
          onClick={handleDownloadPdf}
        >
          Download PDF
        </StyledMainBtn>

        <StyledMainBtn
          width="min-content"
          colorProp="#ff5c00"
          sx={{
            color: "#fff",
          }}
          onClick={() => HandleSavePdf()}
        >
          {progressContext ? (
            <CircularProgress
              sx={{
                color: "#fff",
              }}
            />
          ) : (
            "save"
          )}
        </StyledMainBtn>
      </div>
    </div>
  );
};

export default Reportprint;
