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

