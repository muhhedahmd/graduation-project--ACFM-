import { Box, useMediaQuery } from '@mui/material'
import React from 'react'
import Header from './Header'
import MainDrawer from '../MainDrawer'
import { UserProvider } from './Contexts/UserContexts'

const StanderdBox = ({ children }) => {
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"))

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw"
      }}
    >
    <UserProvider>

      <Header />
    </UserProvider>
      {!isSm ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <MainDrawer />
          {children} 
        </Box>
      ) : (
        // Render children directly without MainDrawer if isSm is true
        children
      )}
    </Box>
  )
}

export default StanderdBox
