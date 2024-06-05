import React, { useEffect, useState } from "react";
import StanderdBox from "../../Components/StanderdBox";
import InfoBoxes from "./InfoBoxes";
import { Box, Typography, useMediaQuery } from "@mui/material";
import TickPlacementBars from "./ChartReport";
import AddReport from "./AddReport";

import UseAuth from "../../Components/Contexts/Authantication";
import FilesTable from "../../Components/Dashbboard/FilesTable";
import { StyledMainBtn } from "../../MainDrawer/style";
import { AnimatePresence , motion } from "framer-motion";
import Reportprint from "./testtr";
import { Close } from "@mui/icons-material";
import { useFileContext } from "../../Components/Contexts/FileCourseContext";
import { useCourseContext } from "../../Components/Contexts/CourseContexts";
import { useDoctorReportContext } from "../../Components/Contexts/DoctorReportContext";

const GenerateReport = ({ page }) => {
  const  {Data}= UseAuth()
  const [showProductionReport  , setshowProductionReport] = useState(false)
  const [mainReportState , setMainReportState ]= useState( 
    [
      {
        studentsattending: 0,
        studentscompleting: 0,
        passed: 0,
        totalUnenrolled: 0,
        failed: 0
    }
      ,
        {
          gradeA: 10,
          gradeB: 10,
          gradeC: 10,
          gradeD: 10,
          FGrade: 0
      }
      
    ]
  )




  const [CourseReport, setCourseReport] = useState({
    topicstaughtperc: "",
    reasonnot: "",
    reasontopic: "",
    lectures: "",
    practical: "",
    discussion: "",
    quizzes: "",
    projects: "",
    assignments: "",
    reasonteching: "",
    assexamination: "",
    assmidterm: "",
    asspractical: "",
    assothers: "",
    adequate: "",
    adminconstraint: "",
    studentevalresponse: "",
    externalevalresponse: "",
    courseenhancment: "",
    action: "",
    state: "",
    actionplan: "",
    completetiondate: "",
    personresponsible: "",
  });
  const [dataReportDr, setDataReportDr] = useState({
    topicstaughtperc: "",
    reasonnot: "",
    reasontopic: "",
    lectures: "",
    practical: "",
    discussion: "",
    quizzes: "",
    projects: "",
    assignments: "",
    reasonteching: "",
    assexamination: "",
    assmidterm: "",
    asspractical: "",
    assothers: "",
    adequate: "",
    adminconstraint: "",
    studentevalresponse: "",
    externalevalresponse: "",
    courseenhancment: "",
    action: "",
    state: "",
    actionplan: "",
    completetiondate: "",
    personresponsible: "",
  });
  const { reports,} = useDoctorReportContext();
  
  const {MainDrawerCourse  , users} = useCourseContext()
  useEffect(() => {


    const SCourseRep = reports.filter((rep) => rep.courseid === MainDrawerCourse.courseid);
    if (SCourseRep.length > 0) {
      setCourseReport(SCourseRep[0]);
      setDataReportDr(SCourseRep[0]);
    } else {
      setCourseReport(SCourseRep);
      setDataReportDr(SCourseRep);
    }
    // console.log(MainDrawerCourse.courseid , reports ,  SCourseRep)
  }, [MainDrawerCourse?.courseid, reports]);


  const { FetchFilesOFCatagory,   }=useFileContext()
  useEffect(()=>{
 
    FetchFilesOFCatagory(Data?.user?.id, MainDrawerCourse?.courseid, page)

  },[Data?.user?.id, FetchFilesOFCatagory, MainDrawerCourse?.courseid, page])





 






  const {state} = useFileContext()
    const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
    const totalStudents = parseInt(MainDrawerCourse?.studentsattending);
const totalEnrolled = parseInt(MainDrawerCourse?.studentscompleting);
const totalPassed = parseInt(MainDrawerCourse?.passed);
const totalUnenrolled = parseInt(MainDrawerCourse?.studentsattending  - MainDrawerCourse?.studentscompleting );
const totalFailed = parseInt(MainDrawerCourse?.studentscompleting -  MainDrawerCourse?.passed);

const { FetchAlldilesofCourses} = useFileContext()
useEffect(()=>{
  
  FetchAlldilesofCourses(users , MainDrawerCourse?.courseid ,page )
},[users, MainDrawerCourse?.courseid, page, FetchAlldilesofCourses])
  return (
    <StanderdBox>
    <AnimatePresence>
  {
    showProductionReport&& 
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1  }}
        exit={{ opacity: 0 }}
      style={{
        width:"100vw",
        height:"100vh",
        bgcolor:"#fff",
        zIndex:"1000",
        backdropFilter:"brightness(0.5)",
        position:"absolute",
        top:"50%",
        left:"50%",
        transform:"translate(-50% ,-50%)"
      }}
    
    >
    <Close
sx={{
  cursor:"pointer",
    color:"#000",
  position:"absolute",
  right:"3rem",
  top:"2rem",
  fontSize:"2.2rem"

}}
onClick={()=>setshowProductionReport(false)}

    />
<Reportprint
dataReportDr={dataReportDr}
CourseReport={CourseReport}
setCourseReport={setCourseReport}
setDataReportDr={setDataReportDr}








 mainReportState={mainReportState}/>
    </motion.div>
  }
    </AnimatePresence>

      <Box
        className="Holder"
        sx={{
          height: "100vh",
          width: "100%",
          margin: '.5rem 1rem 0 1rem ',
          display:"flex",
          justifyContent:"flex-start",
          alignItems:"flex-start",
          gap:".5rem",
          flexDirection:"column",
        }}
      >
        <Typography variant="h5" component={"p"} align="left">
          {page}
        </Typography>

        <Box
          sx={{
            height: "95vh",
            width: "100%",
            display: "flex",
            justifyContent:"flex-start",
            alignItems:"flex-start",
            flexDirection:"column",
            gap:"1rem",
          }}
        >
          <Box
            sx={{
              flexDirection: `${isSm ? "column" : "row"}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: `${isSm ? "95%" : "100%"}`,
              maxHeight:`${isSm ? '19%': "100%"}`,
              height: "auto",
              overflow: "auto",
              gap: ".5rem",
            }}
            className="infoBox-wrapper"
          >
          <InfoBoxes
    title={"Total Students"}
    percent={((totalStudents / totalStudents) * 100).toFixed(2) }
    value={totalStudents|| 0}
    key={"1"}
/>
<InfoBoxes
    title={"Total Enrolled"}
    percent={((totalEnrolled / totalStudents) * 100).toFixed(2)}
    value={totalEnrolled|| 0}
    key={"2"}
/>
<InfoBoxes
    title={"Total Not Enrolled"}
    percent={((totalUnenrolled / totalStudents) * 100).toFixed(2)}
    value={totalUnenrolled|| 0}
    key={"3"}
/>
<InfoBoxes
    title={"Total Passed"}
    percent={((totalPassed / totalEnrolled) * 100).toFixed(2)}
    value={totalPassed|| 0}
    key={"4"}
/>
<InfoBoxes
    title={"Total Failed"}
    percent={((totalFailed / totalStudents) * 100).toFixed(2)}
    value={totalFailed|| 0}
    key={"5"}
/>
          </Box>
          <Box
            className="chart-wrapper"
            sx={{
              borderRadius: "6px",
              width: `${isSm ? "    95%" : "100%"}`,
              padding: ".5rem",
              boxShadow: "3px 2px 4px #dedede",
              bgcolor: "#fff",
              // maxHeight:"49%",
              margin: `${isSm ? "1rem 0  00 0 " : "0"}`,
              height: `${isSm ? "25%" : "40%"}`,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TickPlacementBars totalFailed={totalFailed} mainReportState={mainReportState}/>
          </Box>

          <Box
            className="Add-Report-wrapper"
            sx={{
              borderRadius: "6px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              height: "38%",
              flexDirection: `${isSm ? "column" : "row-reverse"}`,

            }}
          >
          <Box
          sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"flex-start",
            alignItems:"center",
            height:"100%",
            width:`${isSm ?' 100%'  : '30%'}`
          }}
          >
          

{Data.user.access === "Instructor" || 
Data.user.access === "Instructor" ?


            <StyledMainBtn
            
            onClick={()=>{

return   setshowProductionReport(true)
          }}
              colorProp={"#fff"}
            sx={{
              height:"83%",
              boxShadow:"1px 1px 3px #333",
              color:"#00796B",
              // border:"3px solid #00796B",
            }}
            >
              Complete the report 
            </StyledMainBtn>

:
            <AddReport mainReportState={mainReportState} setMainReportState={setMainReportState} />

}

          </Box>
          

            <Box
              sx={{
                height: "84%",
                width: `${isSm ? "98%" : "80%"}`,
              }}
            >

 
              <FilesTable

                state={state?.uploadedFiles}
                Report={true}
                NoSearch={true}
              /> 
            
            </Box> 

          </Box>
        </Box>
      </Box>


      
    </StanderdBox>
  );
};

export default GenerateReport;