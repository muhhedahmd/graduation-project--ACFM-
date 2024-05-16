import React from 'react'

import GenerateReport from '../GenerateReport'
import { FileContextProvider } from '../../Components/Contexts/FileCourseContext'

const StaticalAndalalysis = ({page}) => {
    return (
      
      <FileContextProvider>
      <GenerateReport page={page}/>
      </FileContextProvider>
  )
}

export default StaticalAndalalysis