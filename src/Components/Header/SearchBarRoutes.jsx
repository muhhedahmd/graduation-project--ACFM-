import { FormControl, ListItem, TextField } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { ROUTE_PATHS } from '../Routes/Path'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

const SearchBarRoutes = () => {
  const [linksState, setLinksState] = useState(null)
  const [inpVal, setInpVal] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const searchRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setLinksState(null)
        setInpVal("")
        setIsFocused(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (!inpVal) {
      setLinksState(null)
      return
    }

    const filteredLinks = Object.entries(ROUTE_PATHS).reduce((acc, [key, value]) => {
      const regex = new RegExp(inpVal, "i")

      if (regex.test(key)) {
        return { ...acc, [key]: value }
      }

      return acc
    }, {})

    setLinksState(filteredLinks)
  }, [inpVal])

  return (
    <motion.li
      ref={searchRef}
      initial={{
        transform: 'translateX(17rem)',
        width: '20rem',
      }}
      animate={{
        transform: `${isFocused ? "translateX(3rem)" : "translateX(17rem)"}`,
        width: `${isFocused ? "30rem" : "20rem"}`,
      }}
      transition={{ duration: 0.2, ease: "linear", stiffness: 60 }}
      style={{
        background: "#fff",
        padding: "0 .5rem .5rem .3rem",
        boxShadow: "3px 4px 6px #dedede",
        borderRadius: "7px",
        position: "relative"
      }}
      disablePadding
    >
      <form action="#" style={{ width: "100%" }}>
        <FormControl fullWidth>
          <TextField
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setLinksState(null)
              setInpVal("")
              setIsFocused(false)
            }}
            value={inpVal}
            onChange={(e) => setInpVal(e.target.value)}
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
        {inpVal &&
          <AnimatePresence>
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: .2 }}
              id='search-results'
              aria-labelledby="Search results"
              style={{
                transformOrigin: "right center",
                opacity: "0",
                left: "0%",
                width: "100%",
                borderRadius: "7px",
                top: "110%",
                position: "absolute",
                overflowY: "scroll",
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
              {linksState === null && inpVal ?
                Object.keys(ROUTE_PATHS).map((keyItem, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      ':hover': {
                        bgcolor: "#fafafa",
                        cursor: "pointer"
                      }
                    }}
                  >
                    <Link
                      style={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: ".9rem",
                        color: "inherit",
                        textDecoration: "none"
                      }}
                      to={ROUTE_PATHS[keyItem]}
                    >
                      {keyItem}
                    </Link>
                  </ListItem>
                ))
                :
                Object.keys(linksState).map((keyItem, i) => (
                  <ListItem
                    key={i}
                    sx={{
                      ':hover': {
                        bgcolor: "#fafafa",
                        cursor: "pointer"
                      }
                    }}
                  >
                    <Link
                      style={{
                        width: "100%",
                        textAlign: "left",
                        fontSize: ".9rem",
                        color: "inherit",
                        textDecoration: "none"
                      }}
                      to={ROUTE_PATHS[keyItem]}
                    >
                      Page {'>'}{keyItem}
                    </Link>
                  </ListItem>
                ))
              }
            </motion.ul>
          </AnimatePresence>
        }
      </form>
    </motion.li>
  )
}

export default SearchBarRoutes
