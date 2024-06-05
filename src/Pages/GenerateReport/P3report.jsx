import {
  Box,
  Typography,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@mui/material";
import React, { useEffect, useState } from "react";

const P3report = ({ CourseReport, p3Ref, setDataReportDr }) => {
  const [textFields, setTextFields] = useState({
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
  });

  useEffect(() => {
    setDataReportDr((prev) => ({
      ...prev,
      ...textFields,
    }));
  }, [setDataReportDr, textFields]);

  useEffect(() => {
      setTextFields((prev) => ({
        ...prev,
        assothers: CourseReport?.assothers,
        adequate: CourseReport?.adequate,
        adminconstraint: CourseReport?.adminconstraint,
        assmidterm: CourseReport?.assmidterm,
        asspractical: CourseReport?.asspractical,
        assexamination: CourseReport?.assexamination,
        reasonteching: CourseReport?.reasonteching,
        assignments: CourseReport?.assignments,
        projects: CourseReport?.projects,
        quizzes: CourseReport?.quizzes,
      }));
    
  }, [CourseReport]);

  const [editingField, setEditingField] = useState("");

  const handleTextFieldChange = (event) => {
    const { name, value } = event.target;
    setTextFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDataReportDr((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFieldFocus = (field) => {
    setEditingField(field);
  };

  const handleFieldBlur = () => {
    setEditingField("");
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setTextFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    setDataReportDr((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const renderEditableField = (name, label, multiline = false) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        justifyItems: "flex-start",
        gap: "2rem",
        width: "100%",
      }}
    >
      <Typography sx={{ color: "#111", fontSize: "1.3rem" }}>{label}</Typography>
      {editingField === name ? (
        <TextField
          className="borderAfter"
          fullWidth
          variant="outlined"
          margin="normal"
          multiline={multiline}
          sx={{ width: "100%", color: "#333" }}
          name={name}
          value={textFields[name]}
          onChange={handleTextFieldChange}
          onBlur={handleFieldBlur}
          autoFocus
        />
      ) : (
        <Typography
          sx={{
            color: "#333",
            width: "100%",
            padding: "8px 12px",
            margin: "0 .5rem",
            borderRadius: "4px",
            minHeight: multiline ? "100px" : "auto",
            fontSize: "1.3rem",
            fontWeight: "bold"
          }}
          onClick={() => handleFieldFocus(name)}
        >
          {textFields[name] || "................................"}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      sx={{
        background: "#fff",
        padding:"1rem 4rem",
      }}
      ref={p3Ref}
      className="page-3"
    >
      <div
        className="page-h-1"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          margin: "0 0 2rem 0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
            margin: "0 0 2rem 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              margin: ".5rem",
            }}
          >
            <Typography
              sx={{
                color:"#000",
                width: "25rem",
                textAlign:"left",
                fontSize: "1.3rem"
              }}
            >
              Case Study/projects
            </Typography>
            {renderEditableField("projects", "", false)}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              margin: ".5rem",
            }}
          >
            <Typography
              sx={{
                color:"#000",
                width: "25rem",
                textAlign:"left",
                fontSize: "1.3rem"
              }}
            >Assignments/Reports</Typography>
            
            {renderEditableField("assignments", "", false)}
          </div>
          <Typography
            variant="h6"
            component={"p"}
            sx={{
              color:"#000",
              width: "100%",
              fontSize: "1.3rem"
            }}
          >
            If teaching and teaming methods were used other than those
            specified, list and give reasons:
          </Typography>
          {renderEditableField("reasonteching", "", true)}
        </div>
        <div
          style={{
            margin: "1rem 0 ",
          }}
        >
          <Typography
            component={"div"}
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              alignSelf: "flex-start",
              textAlign: "left",
              color: "#000",
            }}
          >
            3- Student Assessment
          </Typography>
          <div
            style={{
              padding:".5rem",
              marginLeft:"-17px",
              display:"flex",
              alignItems:"center",
              justifyContent:"flex-start"
            }}
          >

            <Typography
              style={{
                color:"#000",
                width:"23rem",
                fontWeight:"bold",
                fontSize: "1.3rem"
              }}
            >
              Method of Assessment
            </Typography>
            <Typography
              sx={{
                color: "#111",
                width: "100%",
                borderRadius: "4px",
                fontWeight:"bold",
                fontSize: "1.3rem"
              }}
            >
              Percent of totals
            </Typography>
          </div>
          {[
            { label: "Written Examination", name: "assexamination" },
            { label: "Mid-Term", name: "assmidterm" },
            { label: "Practical/Laboratory Work", name: "asspractical" },
            {
              label: "assothers: Assignments/Reports/Quizzes",
              name: "assothers",
            },
          ].map(({ label, name }) => (
            <Box
              key={name}
              className="p3-info-box"
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              {renderEditableField(name, label)}
            </Box>
          ))}
          <Box
            className="p3-info-box"
            style={{ display: "flex", alignItems: "flex-start" ,justifyContent:"flex-start" }}
          >
            <Typography 
              style={{
                width:"25rem",
                color:"#111",
                fontSize: "1.3rem"
              }}
            component={"p"}>Total</Typography>
            <Typography
              color="#000"
              style={{ fontSize: "1.3rem" }}
            >
              100%
            </Typography>
          </Box>
        </div>

        <div
          className="p3-info-box"
          style={{
            flexDirection: "column",
          }}
        >
          <Typography
            component={"div"}
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              alignSelf: "flex-start",
              textAlign: "left",
              color: "#000",
            }}
          >
            Members of Examination Committee
          </Typography>
          <Typography
          sx={{
            fontSize:"1.1rem",
            color:"#111",

          }}
          >- Syllabus review</Typography>
          <Typography
          sx={{
            fontSize:"1.1rem",
            color:"#111",

          }}
          >- Content update</Typography>
          <Typography
          sx={{
            fontSize:"1.1rem",
            color:"#111",

          }}
          >- Course report follow-up</Typography>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              alignSelf: "flex-start",
              textAlign: "left",
              color: "#000",
            }}
          >
             4- Facilities and Teaching Materials:
          </Typography>
          <RadioGroup
            name="adequate"
            value={textFields.adequate}
            onChange={handleRadioChange}
          >
            {[
              { label: "Totally Adequate", value: "1" },
              { label: "Adequate to Some Extent", value: "2" },
              { label: "Inadequate", value: "3" },
            ].map(({ label, value }) => (
              <FormControlLabel
                key={value}
                value={value}
                control={<Radio  />}
           
                label={<Typography
                sx={{
                  fontSize:"1.1rem",
                  color:"#111"
                }}>
{label}
                </Typography>}
              />
            ))}
          </RadioGroup>
        </div>
        <div>
          <Typography
            style={{
              fontWeight: "bold",
              fontSize: "1.2rem",
              alignSelf: "flex-start",
              textAlign: "left",
              color: "#000",
            }}
          >
            5- Administrative Constraints
          </Typography>
          {renderEditableField("adminconstraint", "", true)}
        </div>
      </div>
    </Box>
  );
};

export default P3report;
