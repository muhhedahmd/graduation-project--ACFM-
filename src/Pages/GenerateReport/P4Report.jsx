import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField } from '@mui/material';

const P4Report = ({ p4Ref, dataReportDr, CourseReport, setDataReportDr }) => {
  const [inputs, setInputs] = useState({
    studentEvaluation: '',
    adminconstraint: '',
    studentevalresponse: '',
    externalevalresponse: '',
    courseenhancment: '',
    action: '',
    state: '',
    actionplan: '',
    completetiondate: '',
    personresponsible: ''
  });

  // Update inputs state and dataReportDr when CourseReport? changes
  useEffect(() => {
 
      setInputs({
        studentEvaluation: CourseReport?.studentEvaluation || '',
        adminconstraint: CourseReport?.adminconstraint || '',
        studentevalresponse: CourseReport?.studentevalresponse || '',
        externalevalresponse: CourseReport?.externalevalresponse || '',
        courseenhancment: CourseReport?.courseenhancment || '',
        action: CourseReport?.action || '',
        state: CourseReport?.state || '',
        actionplan: CourseReport?.actionplan || '',
        completetiondate: CourseReport?.completetiondate || '',
        personresponsible: CourseReport?.personresponsible || ''
      });
    
  }, [CourseReport]);

  // Update dataReportDr when inputs state changes
  useEffect(() => {
    setDataReportDr((prev) => ({
      ...prev,
      ...inputs
    }));
  }, [inputs, setDataReportDr]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const [editingField, setEditingField] = useState('');

  const handleFieldFocus = (field) => {
    setEditingField(field);
  };

  const handleFieldBlur = () => {
    setEditingField('');
  };

  const renderEditableField = (name, label, multiline = false) => (
    <Box sx={{ width: '100%' }}>
      <Typography sx={{ color: "#111", fontWeight: 'bold', fontSize: '1.2rem' }}>{label}</Typography>
      {editingField === name ? (
        <TextField
          className='borderAfter'
          fullWidth
          variant="outlined"
          margin="normal"
          multiline={multiline}
          sx={{ width: "100%", color: "#111", fontSize: '1.2rem' }}
          name={name}
          value={inputs[name]}
          onChange={handleInputChange}
          onBlur={handleFieldBlur}
          autoFocus
        />
      ) : (
        <Typography
          sx={{
            margin: ".2rem 0",
            color: "#111",
            width: "100%",
            padding: "8px 12px",
            borderRadius: "4px",
            fontSize: '1.2rem',
            minHeight: multiline ? "auto" : "auto"
          }}
          onClick={() => handleFieldFocus(name)}
        >
          {inputs[name] || "................"}
        </Typography>
      )}
    </Box>
  );

  return (
    <div ref={p4Ref} style={{ padding: '1rem 4rem', width: "100%" }}>
      <div style={{ background: "#fff", width: "100%", padding: "1rem 3rem" }} className='flex-start'>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%"
        }}>
          {renderEditableField('studentEvaluation', '6- Student Evaluation of the course:', true)}
          {renderEditableField('adminconstraint', 'Response of course Team')}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%"
        }}>
          {renderEditableField('externalevalresponse', '7- Comments from external evaluator(s):')}
          {renderEditableField('courseTeamResponseToEvaluator', 'Response of course Team')}
          {/* {renderEditableField('courseTeamResponseToEvaluator', 'Response of course Team')} */}
        </div>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%"
        }}>
          {renderEditableField('courseenhancment', '8- Course Enhancement:')}
          {/* {renderEditableField('studentevalresponse', 'Response of course Team')} */}
        </div>
        <Typography sx={{ color: "#000", fontWeight: 'bold', fontSize: '1.2rem' }}>Progress on actions identified in the previous year's action plan:</Typography>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%"
        }}>
          {renderEditableField('action', 'Action:')}
          {renderEditableField('state', 'State whether or not completed and give reasons for any non-completion')}
        </div>
        <Typography sx={{ color: "#000", fontWeight: 'bold', fontSize: '1.2rem' }}>9- Action plan for academic year {'2022/2023'}:</Typography>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          width: "100%"
        }}>
          {renderEditableField('actionplan', 'Action Required:')}
          {renderEditableField('completetiondate', 'Completion Date')}
          {renderEditableField('personresponsible', 'Person Responsible')}
        </div>
        <Typography sx={{ color: "#000", fontWeight: 'bold', fontSize: '1.2rem' }}>Course Coordinator</Typography>
        <Typography sx={{ color: "#000", fontWeight: 'bold', fontSize: '1.2rem' }}>Signature:</Typography>
        <Typography sx={{ color: "#000", fontWeight: 'bold', fontSize: '1.2rem' }}>Date: {getCurrentDate()}</Typography>
      </div>
    </div>
  );
};

export default P4Report;

const getCurrentDate = () => {
  const currentDate = new Date();
  const options = { month: 'long', year: 'numeric' };
  return currentDate.toLocaleDateString('en-US', options);
};
