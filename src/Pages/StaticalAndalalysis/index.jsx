import React from 'react'
import StanderdBox from '../../Components/StanderdBox'
import AddReport from '../GenerateReport/AddReport'
import { Box, Typography, useMediaQuery } from '@mui/material'
import InfoBoxes from '../GenerateReport/InfoBoxes'
import TickPlacementBars from '../GenerateReport/ChartReport'
import FilesTable from '../../Components/Dashbboard/FilesTable'
import GenerateReport from '../GenerateReport'

const StaticalAndalalysis = ({page}) => {
    const isSm = useMediaQuery((theme)=> theme.breakpoints.down("md"))
    return (
      <GenerateReport/>
  )
}

export default StaticalAndalalysis