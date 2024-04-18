import { useEffect } from 'react';
import { useState } from 'react';

const useErrorMsg = (errorArray, path) => {
  const [isError, setIsError] = useState(false);

  // Check for errors related to the specified path
  useEffect(() => {
    setIsError(errorArray.some(err => err.field === path));
  }, [errorArray, path]);

  return isError;
};

export default useErrorMsg;
