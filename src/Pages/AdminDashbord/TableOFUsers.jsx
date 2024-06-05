import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableOfUSersCard from './TableOfUSersCard'
import CourseOptions from './CourseOption'

const TableOFUsers = ({ AcadmicYearData }) => {
  const [CourseOption, setCourseOption] = useState('')

  useEffect(() => {
    const formattedData = reformatData(AcadmicYearData)
    if (formattedData.length > 0) {
      setCourseOption(Object.keys(formattedData)[0])
    }
  }, [AcadmicYearData])

  function removeDuplicates(users) {
    const seen = new Set()
    return users.filter(user => {
      const duplicate = seen.has(user.id)
      seen.add(user.id)
      return !duplicate
    })
  }

  function reformatData(data) {
    const courses = {}

    data?.forEach(item => {
      const { user, course } = item
      const { coursename } = course

      if (courses[coursename]) {
        courses[coursename].push(user)
      } else {
        courses[coursename] = [user]
      }
    })

    const coursesArray = Object.keys(courses).map(courseName => ({
      course: courseName,
      users: removeDuplicates(courses[courseName])
    }))

    return coursesArray
  }

  console.log('', reformatData(AcadmicYearData))

  return (
    <Box
      padding={"1rem"}
      sx={{
        width: "100%",
        position: "relative",
        bgcolor: "#fff",
        boxShadow: "3px 3px 4px #dedede",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <CourseOptions
        values={reformatData(AcadmicYearData).map((item) => {
          return item.course
        })}
        setCourseOption={setCourseOption}
        CourseOption={CourseOption}
      />
      <TableOfUSersCard border={"#FF4F0F"} name={"name"} email={"email"} role={"role"} type={"type"} optionText={"option"} />
      <Box
        sx={{
          height: '8rem',
          overflow: 'auto',
          width: '101%',
          padding: '0 0.4rem',
        }}
      >
        {reformatData(AcadmicYearData).map((item) =>
          item.course === CourseOption ?
            item.users.map((user) => {
              return <TableOfUSersCard key={user.id} id={user.id} border={"#333"} role={user.access} name={user.firstName + " " + user.lastName} email={user.email} option={"option"} />
            })
            : ""
        )}
      </Box>
    </Box>
  )
}

export default TableOFUsers
