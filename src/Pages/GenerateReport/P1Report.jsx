import { Paper, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useCourseContext } from '../../Components/Contexts/CourseContexts';
import { useUserContext } from '../../Components/Contexts/UserContexts';
import axios from 'axios';

const tableStyle = {
  margin: '0 auto',
  marginBottom: '20px',
  border: '1px solid black',
  fontSize: '1.4rem', // Increase font size
  fontWeight: 'bold',
  color: '#000', // Change color to black
};

const headerStyle = {
  backgroundColor: '#ddd',
  border: '1px solid black',
  fontSize: '1.4rem', // Increase font size
  fontWeight: 'bold',
  color: '#000', // Change color to black
};

const cellStyle = {
  border: '1px solid black',
  fontSize: '1.4rem', // Increase font size
  fontWeight: 'bold',
  color: '#000', // Change color to black
};

// const examCellStyle = {
//   backgroundColor: '#aaaaaa',
//   border: '1px solid black',
//   fontSize: '1.4rem', // Increase font size
//   fontWeight: 'bold',
//   color: '#000', // Change color to black
// };

const P1Report = ({ refp1 }) => {
  const { MainDrawerCourse } = useCourseContext();

  const { users } = useUserContext();
  const [usersAssigned, setUsersAssigned] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const selectedCourseUsers = [];

        await Promise.all(
          users.map(async (user) => {
            if (user.access !== 'user') {
              try {
                const coursesResponse = await axios.get(
                  `https://optima-software-solutions.com/apis/courseshow.php?userid=${user.id}`
                );
                const courses = coursesResponse.data;

                const selectedCourse = courses.find(course => course.courseid === MainDrawerCourse?.courseid);
                if (selectedCourse) {
                  const userData = {
                    id: user.id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    access: user.access,
                    creation_date: user.creation_date,
                    email: user.email,
                  };
                  selectedCourseUsers.push(userData);
                }
              } catch (error) {
                console.error('Error fetching courses:', error);
              }
            }
          })
        );
        const filteredUsers = selectedCourseUsers.filter((user) => {
          return user.access === 'instructor' || user.access === 'Instructor' || user.access === 'Staff' || user.access === 'staff';
        });
        setUsersAssigned(filteredUsers);
        console.log('Users assigned to the selected course:');
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    })();
  }, [MainDrawerCourse?.courseid, users]);

  const AGrade = parseInt(MainDrawerCourse.gradeA);
  const BGrade = parseInt(MainDrawerCourse.gradeB);
  const CGrade = parseInt(MainDrawerCourse.gradeC);
  const DGrade = parseInt(MainDrawerCourse.gradeD);

  const totalStudents = parseInt(MainDrawerCourse?.studentsattending);
  const totalEnrolled = parseInt(MainDrawerCourse?.studentscompleting);
  const totalPassed = parseInt(MainDrawerCourse?.passed);
  const totalFailed = parseInt(MainDrawerCourse?.studentscompleting - MainDrawerCourse?.passed);

  console.log(MainDrawerCourse)
  return (
    <div
      style={{
        background: '#fff',
        padding: '1rem 4rem',
        fontSize: '1.4rem', // Increase font size
        color: '#000', // Change color to black
      }}
      ref={refp1}
    >
      <h2
        style={{
          color: '#000',
          textAlign: 'center',
        }}
      >
        Annual Course Report
      </h2>
      <div
        className="basic-info"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          fontSize: '1.4rem', // Increase font size
          color: '#000', // Change color to black
        }}
      >
        <h2>A- Basic Information</h2>
        <p>
          <strong>University:</strong> October 6 University
        </p>
        <p>
          <strong>Faculty:</strong> FISCS
        </p>
        <p>
          <strong>Department:</strong> {MainDrawerCourse?.general}
        </p>
        <p>
          <strong>Title and Code:</strong> {MainDrawerCourse?.coursename + MainDrawerCourse?.courseid}
        </p>
        <p>
          <strong>Program on which this course is given:</strong> Computer Science
        </p>
        <p>
          <strong>Year/Level of program:</strong> {+MainDrawerCourse?.level === 1 ? 'First' : +MainDrawerCourse?.level === 2 ? 'Second' : +MainDrawerCourse?.level === 3 ? 'Third' : 'Fourth'}
        </p>
        <p>
          <strong>Units/Credit hours:</strong> {MainDrawerCourse?.credit_hour}
        </p>
        <p>
          <strong>Contact Hours/week:</strong>
        </p>
        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            gap: '2rem',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            fontSize: '1.4rem', // Increase font size
            color: '#000', // Change color to black
          }}
        >
          <li>
            <strong>Lectures:</strong> {+MainDrawerCourse?.practical > 0 ? +MainDrawerCourse?.credit_hour - 1 : +MainDrawerCourse?.credit_hour}
          </li>
          <li>
            <strong>Tutorial/Practical:</strong> {+MainDrawerCourse?.practical > 0 ? 1 : 0}
          </li>
          <li>
            <strong>Total:</strong> {MainDrawerCourse?.credit_hour}
          </li>
        </ul>
        <p>
          <strong>Names of lecturers contributing to the delivery of the course:</strong>
        </p>
        <ul>
          {usersAssigned.map((user, i) => {
            const userAccess = user.access.toLowerCase();

            if (userAccess === 'instructor') {
              return (
                <li
                  style={{
                    textAlign: 'left',
                    listStyle: 'none',
                  }}
                  key={i}
                >
                  Dr. {user.firstName} {user.lastName}
                </li>
              );
            } else if (userAccess === 'staff') {
              return (
                <li
                  style={{
                    textAlign: 'left',
                    listStyle: 'none',
                  }}
                  key={i}
                >
                  Eng. {user.firstName} {user.lastName}
                </li>
              );
            }
            return null; // Ignore users with other access levels
          })}
        </ul>
        <strong>Course coordinator:</strong>
        {usersAssigned.map((user, i) => {
          if (user.access === 'instructor' || user.access === 'Instructor') {
            return (
              <p key={i}>
                {user.firstName} {user.lastName}
              </p>
            );
          }
          return null; // Ignore users with other access levels
        })}
        <p>
          <strong>External evaluator:</strong>
        </p>
      </div>
      <Paper
        sx={{
          bgcolor: '#fff00000',
        }}
      >
        <div className="statistical-info">
          <h2>B- Statistical Information</h2>
          <Table style={tableStyle}>
            <TableHead style={headerStyle}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Number of students</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>Students attending the course</TableCell>
                <TableCell style={cellStyle}>{totalEnrolled}</TableCell>
                <TableCell style={cellStyle}>100%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>Students completing the course</TableCell>
                <TableCell style={cellStyle}>{totalPassed}</TableCell>
                <TableCell style={cellStyle}>{((totalPassed / totalEnrolled) * 100).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <h3>Results</h3>
          <Table style={tableStyle}>
            <TableHead style={headerStyle}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Number of students</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>Passed</TableCell>
                <TableCell style={cellStyle}>{totalPassed}</TableCell>
                <TableCell style={cellStyle}>{((totalPassed / totalStudents) * 100).toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>Failed</TableCell>
                <TableCell style={cellStyle}>{totalFailed}</TableCell>
                <TableCell style={cellStyle}>{((totalFailed / totalStudents) * 100).toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <h3>Grading of successful students</h3>
          <Table style={tableStyle}>
            <TableHead style={headerStyle}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Number of students</TableCell>
                <TableCell>Percentage</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell style={cellStyle}>A</TableCell>
                <TableCell style={cellStyle}>{AGrade}</TableCell>
                <TableCell style={cellStyle}>{((AGrade / totalPassed) * 100).toFixed(2)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>B</TableCell>
                <TableCell style={cellStyle}>{BGrade}</TableCell>
                <TableCell style={cellStyle}>{((BGrade / totalPassed) * 100).toFixed(2)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>C</TableCell>
                <TableCell style={cellStyle}>{CGrade}</TableCell>
                <TableCell style={cellStyle}>{((CGrade / totalPassed) * 100).toFixed(2)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={cellStyle}>D</TableCell>
                <TableCell style={cellStyle}>{DGrade}</TableCell>
                <TableCell style={cellStyle}>{((DGrade / totalPassed) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Paper>
      <div className="professional-info">
        <h2>C- Professional Information</h2>
      </div>
    </div>
  );
};

export default P1Report;
