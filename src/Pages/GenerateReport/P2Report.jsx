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
// import { useCourseContext } from '../../Components/Contexts/CourseContexts';



const P2Report = ({ CourseReport, p2Ref, data ,setData , setDataReportDr }) => {

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

  useEffect(() => {
    const calculateTotals = () => {
      let lectureHoursTotal = 0;
      let tutorialHoursTotal = 0;
      let practicalHoursTotal = 0;

      data.forEach((item) => {
        lectureHoursTotal += parseFloat(item.lectureHours) || 0;
        tutorialHoursTotal += parseFloat(item.tutorialHours) || 0;
        practicalHoursTotal += parseFloat(item.practicalHours) || 0;
      });

      setData((prevData) =>
        prevData.map((item) =>
          item.Totals
            ? {
                ...item,
                lectureHoursTotal: lectureHoursTotal.toFixed(2),
                tutorialHoursTotal: tutorialHoursTotal.toFixed(2),
                practicalHoursTotal: practicalHoursTotal.toFixed(2),
              }
            : item
        )
      );
    };

    calculateTotals();
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
      <TableContainer sx={{ width: "98%" }} component={Paper}>
        <Table sx={{ color: "#000", border: "1px solid #333" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#000" }}>Week No.</TableCell>
              <TableCell sx={{ color: "#000" }}>Topic</TableCell>
              <TableCell sx={{ color: "#000" }}>Lecture Hours</TableCell>
              <TableCell sx={{ color: "#000" }}>Tutorial Hours</TableCell>
              <TableCell sx={{ color: "#000" }}>Practical Hours</TableCell>
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
                    {editingField === `topic-${index}` ? (
                      <TextField
                        sx={{ border: "none", ':after': { border: "none" } }}
                        value={item.topic}
                        onChange={(event) => handleInputChange(event, index, 'topic')}
                        onBlur={() => handleFieldBlur(`topic-${index}`)}
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
                        onClick={() => handleFieldFocus(`topic-${index}`)}
                      >
                        {item.topic || '.......'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ lineBreak: "anywhere", border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {editingField === `lectureHours-${index}` ? (
                      <TextField
                        sx={{ border: "none", ':after': { border: "none" } }}
                        value={item.lectureHours}
                        onChange={(event) => handleInputChange(event, index, 'lectureHours')}
                        onBlur={() => handleFieldBlur(`lectureHours-${index}`)}
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
                        onClick={() => handleFieldFocus(`lectureHours-${index}`)}
                      >
                        {item.lectureHours || '.......'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ lineBreak: "anywhere", border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {editingField === `tutorialHours-${index}` ? (
                      <TextField
                        sx={{ border: "none", ':after': { border: "none" } }}
                        value={item.tutorialHours}
                        onChange={(event) => handleInputChange(event, index, 'tutorialHours')}
                        onBlur={() => handleFieldBlur(`tutorialHours-${index}`)}
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
                        onClick={() => handleFieldFocus(`tutorialHours-${index}`)}
                      >
                        {item.tutorialHours || '.......'}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ lineBreak: "anywhere", border: "1px solid black", fontSize: "1.3rem", fontWeight: "bold", color: "#000" }}>
                    {editingField === `practicalHours-${index}` ? (
                      <TextField
                        sx={{ border: "none", ':after': { border: "none" } }}
                        value={item.practicalHours}
                        onChange={(event) => handleInputChange(event, index, 'practicalHours')}
                        onBlur={() => handleFieldBlur(`practicalHours-${index}`)}
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
                        onClick={() => handleFieldFocus(`practicalHours-${index}`)}
                      >
                        {item.practicalHours || '.......'}
                      </Typography>
                    )}
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
                    {item.tutorialHoursTotal}
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
                    {item.practicalHoursTotal}
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
