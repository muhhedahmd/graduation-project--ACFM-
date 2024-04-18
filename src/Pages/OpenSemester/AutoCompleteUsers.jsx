import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Typography, FormControl, ListItem } from '@mui/material';

const courses =   [
  {
    checked:false,
    courseName: "Math 1",
    courseCode: "MATH101",
    byLaw: "Required",
    level: "100",
    creditHours: 3,
    semester: "Fall",
    program: "Computer Science",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    room: "Room 101",
  },
  {
    checked:false,
    // id: 2,
    courseName: "Physics 1",
    courseCode: "PHY101",
    byLaw: "Required",
    level: "100",
    creditHours: 3,
    semester: "Fall",
    program: "Computer Science",
    schedule: "Tue, Thu 11:00 AM - 12:30 PM",
    room: "Room 102",
  },

  {
    checked:false,
    courseName: "Advanced Programming",
    courseCode: "COMP301",
    byLaw: "Elective",
    level: "300",
    creditHours: 4,
    semester: "Spring",
    program: "Computer Science",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    room: "Room 201",
  },
  {
    checked:false,
    courseName: "Advanced Software Engineering",
    courseCode: "COMP401",
    byLaw: "Elective",
    level: "400",
    creditHours: 4,
    semester: "Spring",
    program: "Computer Science",
    schedule: "Tue, Thu 11:00 AM - 12:30 PM",
    room: "Room 202",
  },


  {

    checked:false,
    courseName: "Database Management Systems",
    courseCode: "COMP201",
    byLaw: "Elective",
    level: "200",
    creditHours: 3,
    semester: "Summer",
    program: "Computer Science",
    instructor: "Dr. White",
    schedule: "Mon, Wed, Fri 9:00 AM - 10:30 AM",
    room: "Room 301",
  },
  {
    semester:"Summaer",
    checked:false,
    courseName: "Network Security",
    courseCode: "COMP501",
    byLaw: "Elective",
    level: "500",
    creditHours: 4,
    program: "Computer Science",
    instructor: "Dr. Black",
    schedule: "Tue, Thu 11:00 AM - 12:30 PM",
    room: "Room 302",
  },
 
]

export default function AsynchronousAutoComplete({isClear, SetIsClear , setSemesterState}) {
    const [linksState, setLinksState] = useState(null);
    const [inpVal, setInpVal] = useState("");

    const handleSearchClick = (courseId) => {
        console.log(courseId);
        setLinksState(null)
    };


    const HandleChange  = (e) =>{

      setInpVal(e.target.value)
      SetIsClear(false)
    }

    useEffect(()=>{
      if(isClear){
          setLinksState(null)
          setInpVal("")

      }

    }, [isClear])
    
    useEffect(() => {
        if (!inpVal) {
            setLinksState(null);
            return;
        }

        const filteredCourses = courses.reduce((acc, course, index) => {
            const regex = new RegExp(inpVal, "i");
            if (regex.test(course.courseName) || regex.test(course.courseCode)) {
                return { ...acc, [index]: { courseName: course.courseName, courseId: course.courseCode } };
            }
            return acc;
        }, {});

        setLinksState(filteredCourses);
    }, [inpVal]);

    return (
        <motion.li
            initial={{
                width: '100%',
            }}
            animate={{
                // Add your animation values here
            }}
            transition={{ duration: 0.4, ease: "linear", stiffness: 60 }}
            style={{
                background: "#fff",
                padding: "0 .5rem .5rem .3rem",
                borderRadius: "7px",
                position: "relative"
            }}
            disablePadding
        >
            <form action="#">
                <FormControl fullWidth>
                    <TextField
                        // onFocus={() => setIsFocused(true)}
                        // onBlur={() => setLinksState(false)}
                        value={inpVal}
                        onChange={(e) => HandleChange(e)}
                        fullWidth
                        color="secondary"
                        variant="standard"
                        sx={{
                            fontSize: ".8rem",
                            paddingTop: "0",
                        }}
                        type="text"
                        InputProps={{
                            classes: {
                                notchedOutline: {
                                    borderWidth: "1px",
                                    borderColor: "yellow !important",
                                },
                            },
                        }}
                    />
                </FormControl>
                {inpVal && linksState !== null && (
                    <AnimatePresence>
                        <motion.ul
                            key={`search-results${inpVal}`}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: -20 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: .2 }}
                            id='search-results'
                            aria-labelledby="Search results"
                            style={{
                                opacity: "0",
                                left: "0%",
                                width: "100%",
                                borderRadius: "7px",
                                top: "110%",
                                position: "absolute",
                                overflowY: "auto",
                                maxHeight: "20rem",
                                background: "#fff",
                                padding: "0",
                                zIndex: "100",
                                boxShadow: "3px 2px 6px #dedede",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                gap: ".5rem",
                                color: "#222"
                            }}
                        >
                            {Object.values(linksState).map((course, i) => (
                                <ListItem
                                    key={i}
                                    onClick={(e) => {
                                      e.stopPropagation()   
                                        handleSearchClick(course.courseId);
                                    }}
                                    sx={{
                                        ':hover': {
                                            bgcolor: "#fafafa",
                                            cursor: "pointer"
                                        }
                                    }}
                                >
                                    <Typography
                                        style={{
                                            width: "100%",
                                            textAlign: "left",
                                            fontSize: ".9rem",
                                            color: "inherit",
                                            textDecoration: "none"
                                        }}
                                    >
                                        {course.courseName + " " + course.courseId}
                                    </Typography>
                                </ListItem>
                            ))}
                        </motion.ul>
                    </AnimatePresence>
                )}
            </form>
        </motion.li>
    );
}
