import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  FormControlLabel
} from '@mui/material';

const defaultScheduleData = [
  { week: 1, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 2, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 3, topic: ".", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 4, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 5, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 6, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 7, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 8, exam: "Mid-Term Exam" },
  { week: 9, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 10, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 11, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 12, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 13, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 14, topic: "", lectureHours: 2, tutorialHours: 1, practicalHours: 2 },
  { week: 15 ,  exam: "practical Exam / final Revision" },
  { week: '-' ,  exam: "Final Exam" },
  { week  :"-" , Totals: 'Total Hours' ,  lectureHoursTotal  : 39 ,tutorialHours: 13 , TotalpracticalHours: 26 },
];

const P2Report = ({ CourseReport, p2Ref, scheduleData = defaultScheduleData, setDataReportDr }) => {
  const [data, setData] = useState(scheduleData);
  const [fields, setFields] = useState({
    topicstaughtperc: "",
    reasonnot: "",
    reasontopic: "",
    lectures: "",
    practical: "",
    discussion: "",
    quizzes: "",
    assignments: "",
  });

  useEffect(() => {
    setDataReportDr((prev) => ({
      ...prev,
      ...fields,
    }));
  }, [fields, setDataReportDr]);

  useEffect(() => {

      setFields({
        topicstaughtperc: CourseReport?.topicstaughtperc || "",
        reasonnot: CourseReport?.reasonnot || "",
        reasontopic: CourseReport?.reasontopic || "",
        lectures: CourseReport?.lectures || "",
        practical: CourseReport?.practical || "",
        discussion: CourseReport?.discussion || "",
        quizzes: CourseReport?.quizzes || "",
        assignments: CourseReport?.assignments || "",
      });
    
  }, [CourseReport]);

  const [editingField, setEditingField] = useState('');

  const handleFieldChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => ({
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
    setEditingField('');
  };

  const handleInputChange = (event, index, field) => {
    const newData = [...data];
    newData[index][field] = event.target.value;
    setData(newData);
  };

  const renderEditableField = (name, label, multiline = false) => (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography sx={{ color: "#000", fontSize: "1.3rem", textAlign: "left", width: "30rem" }}>
        {label}
      </Typography>
      {editingField === name ? (
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          multiline={multiline}
          sx={{ width: "100%", color: "#333" }}
          name={name}
          value={fields[name]}
          onChange={handleFieldChange}
          onBlur={handleFieldBlur}
          autoFocus
        />
      ) : (
        <Typography
          sx={{
            lineBreak: "anywhere",
            maxWidth: "100%",
            textAlign: "center",
            width: "100%",
            color: "#111",
            padding: "8px 0",
            margin: "0 auto",
            borderRadius: "4px",
            minHeight: multiline ? "100px" : "auto",
            fontSize: "1.3rem",
            fontWeight: "bold",
          }}
          onClick={() => handleFieldFocus(name)}
        >
          {fields[name] || "............................."}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box ref={p2Ref} sx={{ padding: "1rem 4rem ", display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-start" }}>
      <Typography variant="h4" sx={{ color: "#000" }} gutterBottom>
        Course Teaching Schedule
      </Typography>
      <TableContainer sx={{ width: "90vw" }} component={Paper}>
        <Table sx={{ color: "#000", border: "1px solid #333" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#000" }}>Week No.</TableCell>
              <TableCell sx={{ color: "#000" }}>Topic</TableCell>
              <TableCell sx={{ color: "#000" }}>Lecture Hours</TableCell>
              <TableCell sx={{ color: "#000" }}>Tutorial Hours</TableCell>
              <TableCell>Practical Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => {
              return index !== 7 && index !== 14 && index !== 16 && index !== 15 ? (
                <TableRow key={index} sx={{ border: "1px solid black" }}>
                  <TableCell sx={{ border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {item.week}
                  </TableCell>
                  <TableCell sx={{ lineBreak: "anywhere", border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {editingField === item.week ? (
                      <TextField
                        sx={{ border: "none", ':after': { border: "none" } }}
                        value={item.topic}
                        onChange={(event) => handleInputChange(event, index, 'topic')}
                        onBlur={() => handleFieldBlur(item.week)}
                        variant="outlined"
                        size="small"
                        fullWidth
                      />
                    ) : (
                      <Typography
                        variant="body1"
                        style={{
                          display: "-webkit-box",
                          WebkitLineClamp: "3",
                          WebkitBoxOrient: "vertical",
                          height: "max-content",
                          color: "#333",
                          fontSize: "1.3rem",
                          fontWeight: "bold"
                        }}
                        onClick={() => handleFieldFocus(item.week)}
                      >
                        {item.topic || '.......'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {item.lectureHours}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {item.tutorialHours}
                  </TableCell>
                  <TableCell sx={{ border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {item.practicalHours}
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={index} sx={{ bgcolor: "#cccccc" }}>
                  <TableCell sx={{ border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {item.week}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      bgcolor: "#aaaaaa",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#000",
                      border: "1px solid black"
                    }}
                  >
                    {item.exam || item.Totals}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      bgcolor: "#aaaaaa",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#000",
                      border: "1px solid black"
                    }}
                  >
                    {item.lectureHoursTotal}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      bgcolor: "#aaaaaa",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#000",
                      border: "1px solid black"
                    }}
                  >
                    {item.tutorialHours}
                  </TableCell>
                  <TableCell
                    sx={{
                      textAlign: "center",
                      width: "100%",
                      bgcolor: "#aaaaaa",
                      fontSize: "1.3rem",
                      fontWeight: "bold",
                      color: "#000",
                      border: "1px solid black"
                    }}
                  >
                    {item.TotalpracticalHours}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ marginY: 2 }}>
        <Typography sx={{ listStyle: "doted", color: "#000", fontSize: "1.3rem" }} variant="h6">
          Topics taught as a percentage of the content specified:
        </Typography>

        <RadioGroup name="topicstaughtperc" value={fields.topicstaughtperc} onChange={handleRadioChange}>
          {[
            { label: "> 90%", value: "1" },
            { label: "70-90%", value: "2" },
            { label: "< 70%", value: "3" },
          ].map(({ label, value }) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
      </Box>

      <Box sx={{ marginY: 2, alignSelf: "center" }}>
        <Typography variant="h6" sx={{ color: "#000", margin: ".3rem 0 ", fontSize: "1.3rem" }}>
          Reason in detail for not teaching any topic
        </Typography>
        {renderEditableField("reasonnot", "", true)}
      </Box>

      <Box sx={{ marginY: 2, alignSelf: "center", width: "100%" }}>
        <Typography variant="h6" sx={{ color: "#000", margin: ".3rem 0 ", fontSize: "1.3rem" }}>
          If any topics were taught which are not specified, give reasons in detail
        </Typography>
        {renderEditableField("reasontopic", "", true)}
      </Box>

      <Box sx={{ marginY: 2 }}>
        <Typography variant="h6" sx={{ color: "#000", margin: ".5rem 0 ", textAlign: "left", fontSize: "1.3rem" }}>
          Teaching and Learning Methods
        </Typography>
        {renderEditableField("lectures", "Lectures")}
        {renderEditableField("practical", "Practical Training/Laboratory")}
        {renderEditableField("discussion", "Seminar/Discussions")}
        {renderEditableField("quizzes", "Class Activity/Quizzes")}
        {/* {renderEditableField("assignments", "Class Activity/Quizzes")} */}
      </Box>
    </Box>
  );
};

export default P2Report;
