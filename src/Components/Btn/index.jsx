import { useTheme } from '@emotion/react'
import { Button } from '@mui/material'
import React from 'react'

const Btn = ({children , width = "100%", padding}) => {
    const theme = useTheme()
    return (
    <Button
    sx={{
        padding:padding,
        margin:"1rem 0 ",
        width:width,
        bgcolor: theme.palette.primary.paper,
                        ":hover": {
                          bgcolor: theme.palette.primary.paper,
                        },
    }}
    >
    {children}

    </Button>
  )
}

export default Btn