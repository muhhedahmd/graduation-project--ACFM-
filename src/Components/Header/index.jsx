import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Drawer,
  
  List,
  ListItem,
  ListItemIcon,
  
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SegmentIcon from "@mui/icons-material/Segment";
import { StyledListItemCenter } from "./style";
import MainDrawer from "../../MainDrawer";
import UseAuth from "../Contexts/Authantication";
import { useUserContext } from "../Contexts/UserContexts";

const Header = ({  bgcolor }) => {
  const {users} = useUserContext()
  const {Data} = UseAuth()
  const AvatarImg = users.find((item)=>item.id === Data?.user?.id ? item?.avatar : null)?.avatar || ""
    const theme = useTheme();
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [MenuDrawer, setMenuDrawer] = useState(false);
  const HandleDrawer = () => {
    setMenuDrawer((prev) => !prev);
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        disablePadding
        sx={{
          boxShadow: "none",
          position: "static",
          zIndex: "100",
          maxHeight: "7vh",
          background: `${ bgcolor ? bgcolor :  theme.palette.background.default}`,
        }}
      >
        <Toolbar>
          <List
          
            disablePadding
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {!isSm  ? (
              <>
                <ListItem
                  disablePadding
                  sx={{

                    width: "fit-content",
                  }}
                >
                  <ListItemIcon>
                  <Avatar>

                    <img
                      style={{
                        maxWidth: "2.2rem",
                      }}
                      src={AvatarImg}
                      alt="Profile"
                    />
                  </Avatar>
                  </ListItemIcon>
                </ListItem>



                <ListItem
                  sx={{
                    width: "fit-content",
                  }}
                >
                  <List
                    disablePadding
                    sx={{
                      width: "fit-content",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <ListItem
                      sx={{
                        width: "fit-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                        color: theme.palette.icons.default,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                       <ListItemIcon>
                       
                       <Avatar
  src={AvatarImg}
  alt="Profile Image"
  style={{
    width: "2.5rem", // Adjust the width as needed
    height: "2.5rem", // Adjust the height as needed
    border: "2px solid #fff", // Add a border with white color
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
 
  }}
/>
                  </ListItemIcon>
                      </Box>
                      <Typography variant="body2" component={"p"}>
                      {
                Data.user.access === "Instructor" ? "Dr:"
                                     :         Data.user.access === "Staff" ?"Eng :"
                                     :""
        }


   {Data.user.first_name+ " " + Data.user.last_name}
                      </Typography>
                    </ListItem>
                    <ListItem
                      sx={{
                        width: "fit-content",
                      }}
                    ></ListItem>
                  </List>
                </ListItem>
              </>
            ) : (
              <>
                <StyledListItemCenter  disablePadding gap={"1"}>
                  <Button
                    sx={{
                      minWidth: "2rem",
                      padding: "0",
                    }}
                    onClick={() => HandleDrawer()}
                  >
                    <SegmentIcon
                      sx={{
                        color: theme.palette.primary.paper,
                        fontWeight: "bold",
                        fontSize: "1.4rem",
                      }}
                    />
                  </Button>

                  <ListItemIcon>
                  <Avatar>

                    <img
                      style={{
                        maxWidth: "2.2rem",
                      }}
                      src={AvatarImg}
                      alt=""
                    />
                  </Avatar>
                  </ListItemIcon>
                </StyledListItemCenter>

                <ListItem
                  sx={{
                    padding:"0",
                    width: "fit-content",
                  }}
                >
                  <List
                    disablePadding
                    sx={{
                      width: "fit-content",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <ListItem
                      sx={{
                        padding:".5rem",
                        width: "fit-content",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "1rem",
                        color: theme.palette.icons.default,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <AccountCircleOutlinedIcon
                          // fontSize='large'
                          sx={{
                            color: theme.palette.icons.default,
                            fontSize: "2rem",
                          }}
                        />
                      </Box>
                      <Typography variant="body2" component={"p"}>
                        Dr:Name
                      </Typography>
                    </ListItem>
                  </List>
                </ListItem>
              </>
            )}
          </List>
        </Toolbar>
      </AppBar>

      <Drawer
        onClose={() => setMenuDrawer(false)}
        open={MenuDrawer}
        anchor="left"
        aria-expanded={MenuDrawer ? "true" : "false"}
        aria-describedby="Menudrawer"
      >
        <Box
          sx={{
            width: "20rem",
          }}
        >
          <MainDrawer
            setMenuDrawer={setMenuDrawer}
            isMD={isSm}
            area="Menudrawer"
          />
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
