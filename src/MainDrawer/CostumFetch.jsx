import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetchData = ({ Data, LevelOption, semesterOptions, acadamicOptions, MainDrawerCourse, academicYears, SelectedCourse }) => {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://optima-software-solutions.com/apis/courseshow.php?userid=${Data.user.id}`);
      let filteredOptions = res.data.filter(option => option.academicyear !== null);

      filteredOptions = filteredOptions.filter(option => {
        return academicYears.some(year => year.id === option.academicyear);
      });

      filteredOptions = filteredOptions.filter(option => option.iscompleted !== "1");

      if (Data.user.access !== "Admin") {
        filteredOptions = filteredOptions.filter(option => option.status === "In Progress");
      }

      if (LevelOption) {
        const level = parseInt(LevelOption, 10);
        filteredOptions = filteredOptions.filter(option => +option.level === level);
      }

      if (semesterOptions) {
        const semester = semesterOptions === "Fall" ? 1 : semesterOptions === "Spring" ? 2 : 3;
        filteredOptions = filteredOptions.filter(option => +option.semester === semester);
      }

      if (acadamicOptions) {
        const academic = parseInt(acadamicOptions, 10);
        filteredOptions = filteredOptions.filter(option => +option.academicyear === academic);
      }

      setOptions(filteredOptions);

      if (filteredOptions.length > 0 && !MainDrawerCourse) {
        SelectedCourse(filteredOptions[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [Data.user.id, Data.user.access, LevelOption, semesterOptions, acadamicOptions, MainDrawerCourse, academicYears, SelectedCourse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { options, loading };
};

export default useFetchData;
