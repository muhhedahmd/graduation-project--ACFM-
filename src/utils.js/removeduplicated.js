export function removeDuplicateUsersWithCourses(data) {
    let uniqueUsers = {};
    data?.forEach((entry) => {
      const userId = entry.user.id;
      if (!uniqueUsers[userId]) {
        uniqueUsers[userId] = {
          user: entry.user,
          courses: [entry.course],
        };
      } else {
        uniqueUsers[userId].courses.push(entry.course);
      }
    });
    const uniqueUserData = Object.values(uniqueUsers);
    return uniqueUserData;
  }
  
  export function extractCourseDetails(data) {
    let courseDetails = {};
  
    data?.forEach((entry) => {
      entry.courses?.forEach((course) => {
        const courseName = course.coursename;
        const categories = Object.keys(course.files);
  
        if (!courseDetails[courseName]) {
          courseDetails[courseName] = {
            categories: [],
            totalFilesCount: 0,
          };
        }
  
        categories?.forEach((category) => {
          const categoryFilesCount = course.files[category].length;
          courseDetails[courseName].categories.push({
            categoryName: category,
            filesCount: categoryFilesCount,
          });
          courseDetails[courseName].totalFilesCount += categoryFilesCount;
        });
      });
    });
  
    return courseDetails;
  }
  
 export  function extractCourseNames(data) {
  
    let courseNames = [];
    data?.forEach((entry) => {
      entry.courses?.forEach((course) => {
        courseNames.push(course.coursename);
      });
    });
    return courseNames;
  }

export function mergeAndRemoveDuplicates(usersCourses) {
    const mergedData = {};

    usersCourses?.forEach(userCourses => {
        const userId = userCourses.user.id;

        if (!mergedData[userId]) {
            mergedData[userId] = { user: userCourses.user, courses: [] };
        }

        userCourses?.courses?.forEach(course =>{
            const courseId = course.courseid;

            const courseIds = mergedData[userId].courses.map(c => c.courseid);
            if (!courseIds.includes(courseId)) {
                mergedData[userId].courses.push(course);
            } else {
                const existingCourseIndex = courseIds.indexOf(courseId);
                const existingCourse = mergedData[userId].courses[existingCourseIndex];

                for (const fileType in course.files) {
                    if (course.files.hasOwnProperty(fileType)) {
                        existingCourse.files[fileType].push(...course.files[fileType]);
                    }
                }
            }
        });
    });

    return Object.values(mergedData);
}


export function mergeCategories(data) {
    const mergedData = {};
    
    for (const category in data) {
        const mergedCategories = {};
        data[category].categories?.forEach(item => {
            const categoryName = item.categoryName;
            if (!mergedCategories[categoryName]) {
                mergedCategories[categoryName] = item.filesCount;
            } else {
                mergedCategories[categoryName] += item.filesCount;
            }
        });
        
        mergedData[category] = {
            categories: Object.keys(mergedCategories).map(categoryName => ({
                categoryName: categoryName,
                filesCount: mergedCategories[categoryName]
            })),
            totalFilesCount: Object.values(mergedCategories).reduce((acc, val) => acc + val, 0)
        };
    }
    
    return mergedData;
}


export function calculateFileProgress(data) {
  let userCourses = {};

  data?.forEach((entry) => {
    const userId = entry.user.id;

    if (!userCourses[userId]) {
      userCourses[userId] = {
        ...entry.user,
        courses: {},
      };
    }

    entry.courses?.forEach((course) => {
      const courseId = course.courseid;

      if (!userCourses[userId].courses[courseId]) {
        userCourses[userId].courses[courseId] = {
          courseName: course.coursename,
          categories: {},
        };
      }

      Object.entries(course.files).forEach(([categoryName, files]) => {
        if (!userCourses[userId].courses[courseId].categories[categoryName]) {
          userCourses[userId].courses[courseId].categories[categoryName] = {
            filesCount: files.length,
            progress: files.length > 0 ? 100 : 0, 
          };
        } else {
          userCourses[userId].courses[courseId].categories[categoryName].filesCount += files.length;
          userCourses[userId].courses[courseId].categories[categoryName].progress = userCourses[userId].courses[courseId].categories[categoryName].filesCount > 0 ? 100 : 0;
        }
      });
    });
  });

  return Object.values(userCourses);
}

// export function processDataForGraph(data) {
//   let processedData = [];

//   data?.forEach((entry) => {
//     const userId = entry.user.id;
//     const userName = `${entry.user.firstName} ${entry.user.lastName}`;

//     entry.courses?.forEach((course) => {
//       const courseName = course.coursename;

//       Object.entries(course.files).forEach(([categoryName, files]) => {
//         const filesCount = files.length;
//         const progress = filesCount > 0 ? 100 : 0; // Assuming if there's at least one file, progress is 100%

//         processedData.push({
//           user: userName,
//           course: courseName,
//           category: categoryName,
//           progress: progress,
//         });
//       });
//     });
//   });

//   return processedData;
// }

export const processDataForGraph = (data) => {
  const processedData = {};

  data.forEach((user) => {
    const userName = user.user.firstName + user.user.lastName;
    user.courses.forEach((course) => {
      const courseName = course.coursename;
      const categories = Object.keys(course.files);
      const Assignments = course.files.Assignments.length 
      const Attendance = course.files.Attendance.length 
      const ExamsAndModelAnswer = course.files['Exams And Model Answer'].length 
      const FinalExams = course.files['Final Exams'].length 
      const books = course.files.books.length 
      const lecturenotes = course.files['lecture notes'].length 
      const totalFilesCount = categories.reduce((total, category) => total + course.files[category].length, 0);
      const categoryProgress = categories.reduce((progress, category) => {
        const categoryFilesCount = course.files[category].length;
        const categoryProgress = categoryFilesCount > 0 ? 100 : 0; // If files are uploaded, progress is 100%
        return progress + categoryProgress;
      }, 0);

      if (!processedData[courseName]) {
        processedData[courseName] = [];
      }

      processedData[courseName].push({
        userName,
        category: courseName,
        progress: categoryProgress / totalFilesCount, // Calculate progress percentage for the course
        total: totalFilesCount, 
      Data : [ Assignments ,
        Attendance,
        ExamsAndModelAnswer, 
        FinalExams ,
        books ,
        lecturenotes]
      });
    });
  });

  return processedData;
};
export function calculateFileProgressx(userCourses) {
  const userCourseLinks = [];

  userCourses.forEach(userCourse => {
    
    const userName = userCourse.user.firstName + userCourse.user.lastName;
      const userId = userCourse.user.id;
      const courseId = userCourse.course.courseid;
      const courseName = userCourse.course.coursename;
      const files = userCourse.course.files;

      const link = {
        userName,
          userId,
          courseId,
          courseName,
          progress: {}
      };

      // Calculate progress for each category
      Object.keys(files).forEach(category => {
          if (files[category].length > 0) {
              // If category has at least one file, set progress to 100%
              link.progress[category] = 100;
          } else {
              // Otherwise, set progress to 0
              link.progress[category] = 0;
          }
      });

      userCourseLinks.push(link);
  });

  return userCourseLinks;
}


export function calculateFileProgress2x(userCourses) {
  const courseProgressMap = {};

  userCourses.forEach(userCourse => {
    const userName = userCourse.user.firstName + " " + userCourse.user.lastName;
    const userId = userCourse.user.id;
    const courseId = userCourse.course.courseid;
    const courseName = userCourse.course.coursename;
    const files = userCourse.course.files;

    if (!courseProgressMap[courseId]) {
      courseProgressMap[courseId] = {
        courseName,
        users: []
      };
    }

    const userProgress = {
      userName,
      userId,
      progress: {}
    };

    Object.keys(files).forEach(category => {
      userProgress.progress[category] = files[category].length > 0 ? 100 : 0;
    });

    courseProgressMap[courseId].users.push(userProgress);
  });

  return Object.values(courseProgressMap);
}
