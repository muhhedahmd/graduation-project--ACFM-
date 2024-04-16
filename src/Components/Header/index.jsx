import {
  AppBar,
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
import SearchBarRoutes from "./SearchBarRoutes";

const Header = ({ nosearch , bgcolor }) => {
  const theme = useTheme();
  const isSm = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
                  sx={{
                    width: "fit-content",
                  }}
                >
                  <ListItemIcon>
                    <img
                      style={{
                        maxWidth: "2.2rem",
                      }}
                      src="Images/logo-o6u 1.png"
                      alt=""
                    />
                  </ListItemIcon>
                </ListItem>


                      {!nosearch ? 
                        <SearchBarRoutes/>
                :""
                      }


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
                        <AccountCircleOutlinedIcon
                          sx={{
                            fontSize: "2rem",
                            color: theme.palette.icons.default,
                          }}
                        />
                      </Box>
                      <Typography variant="body2" component={"p"}>
                        Dr:Name
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
                <StyledListItemCenter gap={0}>
                  <Button
                    sx={{
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
                    <img
                      style={{
                        maxWidth: "2.2rem",
                      }}
                      src="Images/logo-o6u 1.png"
                      alt=""
                    />
                  </ListItemIcon>
                </StyledListItemCenter>

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
