import {
  Box,
  Button,
  List,
  ListItem,
  SvgIcon,
  Typography,
  Skeleton,
} from "@mui/material";
import React, { memo, useState, lazy, Suspense } from "react";
import { Close } from "@mui/icons-material";
import { StyledMainDrawer } from "./style";
import SegmentIcon from "@mui/icons-material/Segment";
import { useTheme } from "@emotion/react";
import SemsterOptions from "../Pages/AdminDashbord/SemsterOptions";

const Bullets = lazy(() => import("./Bullets"));
const MenuCollapse = lazy(() => import("./MenuCollapse"));
const LevelOptions = lazy(() => import("../Pages/AdminDashbord/LevelOption"));
const Asynchronous = lazy(() => import("./MainDrawerAysnc"));
const AcadamicOptions = lazy(() => import("./AcadamicOptions"));

const MainDrawer = memo(({ ismd, area, setMenuDrawer }) => {
  const [levelOption, setLevelOption] = useState();
  const [acadamicOptions, setAcadamicOptions] = useState();
  const [semesterOptions, setSemesterOptions] = useState();
  const theme = useTheme();
  const [isexpand, setIsexpand] = useState(false);

  const handleClouseDrawer = () => {
    setIsexpand((prev) => !prev);
  };
  const renderSkeletons = (count) => (
    Array.from({ length: count }).map((_, index) => (
      <Skeleton key={index} width="100%" height="2rem" animation="wave" />
    ))
  );
  return (
    <StyledMainDrawer ismd={ismd} area={area} isexpand={isexpand}>
      <Suspense fallback={<Skeleton width="100%" height="2rem" animation="wave" />}>
        <Bullets />
      </Suspense>
      <List>
        <ListItem
          disablePadding
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: ".6rem",
            }}
          >
            <img
              style={{ maxWidth: "2.2rem" }}
              src="Images/logo-o6u1.png"
              alt=""
            />
            <Typography
              sx={{
                visibility: `${!isexpand ? "visible" : "hidden"}`,
                opacity: `${!isexpand ? "1" : "0"}`,
                fontSize: `${!isexpand ? "1.25rem" : "0rem"}`,
                cursor: "none",
                zIndex: "-1",
                transition: ".3s opacity",
                color: theme.palette.text.heading,
                fontWeight: "700",
              }}
              variant="h6"
              component={"p"}
            >
              ACFM
            </Typography>
          </Box>
          {!(area === "Menudrawer") ? (
            <Button
              onClick={() => handleClouseDrawer()}
              disableRipple
              sx={{
                width: "fit-content",
                color: theme.palette.primary.main,
                padding: 0,
                display: "flex",
                justifyContent: `${isexpand ? "center" : "flex-end"}`,
                cursor: "pointer",
              }}
            >
              {!isexpand ? (
                <SvgIcon
                  color={theme.palette.bullet["1nd"]}
                  sx={{
                    color: theme.palette.bullet["1nd"],
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                  }}
                >
                  <Close
                    sx={{
                      color: theme.palette.bullet["1nd"],
                      fontWeight: "bold",
                      fontSize: "1.4rem",
                    }}
                  />
                </SvgIcon>
              ) : (
                <SegmentIcon
                  sx={{
                    color: theme.palette.bullet["1nd"],
                    fontWeight: "bold",
                    fontSize: "1.4rem",
                  }}
                />
              )}
            </Button>
          ) : (
            <Button
              onClick={() => setMenuDrawer(false)}
              sx={{
                width: "fit-content",
                fill: theme.palette.text.heading,
                padding: 0,
                display: "flex",
                justifyContent: `${isexpand ? "center" : "flex-end"}`,
                cursor: "pointer",
              }}
            >
              <Close
                sx={{
                  fill: theme.palette.text.heading,
                  fontWeight: "bold",
                  fontSize: "1.4rem",
                }}
              />
            </Button>
          )}
        </ListItem>
      </List>
      <List className="Choose-course">
        <ListItem
          disablePadding
          sx={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box
              sx={{
                transition: ".4s",
                color: theme.palette.text.heading,
                display: "flex",
                justifyContent: `${isexpand ? "center" : "flex-start"}`,
                alignItems: "flex-start",
                gap: ".5rem",
                p: "0 0 .5rem 0",
              }}
            >
              <img
                style={{
                  filter: "invert(.6)",
                  transition: ".4s",
                }}
                src="Images/maincourse.png"
                alt="course.png"
              />
              <Typography
                className={`${!isexpand ? "" : "isNotExpandText"}`}
                variant="subtitle2"
                component={"p"}
              >
                Courses
              </Typography>
            </Box>
          </Box>
        </ListItem>
        <Box
          sx={{
            scale: `${isexpand ? "0" : "1"}`,
            height: `${isexpand ? "0" : "auto"}`,
          }}
        >
          <Box
            sx={{
              maxWidth: "100%",
              width: "100%",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: ".5rem",
            }}
          >
            <Suspense fallback={<Skeleton width="100%" height="2rem" animation="wave" />}>
              <LevelOptions
                mxwidthprop={"90px"}
                position={'static'}
                LevelOption={levelOption}
                setLevelOption={setLevelOption}
                left={"0rem"}
              />
              <AcadamicOptions
                mxwidthprop={"90px"}
                position={true}
                acadamicOptions={acadamicOptions}
                setAcadamicOptions={setAcadamicOptions}
              />
            </Suspense>
          </Box>
              <SemsterOptions
              top={'0'}
              left={'0'}
                mxwidthprop={"100%"}
                position={true}
                setsemsterOption={setSemesterOptions} 
                 semsterOption={semesterOptions}
              />
          <Suspense fallback={<Skeleton width="100%" height="2.7rem" animation="wave" />}>
            <Asynchronous
            semesterOptions={semesterOptions}
            setSemesterOptions={setSemesterOptions}
              acadamicOptions={acadamicOptions}
              LevelOption={levelOption}
            />
          </Suspense>
        </Box>
      </List>
      <Suspense fallback={<div
      style={{
        display:"flex",
        justifyContent:"flex-start",
        alignItems:"flex-start",
        gap:"1.5rem",
        flexDirection:"column"
      }}
      >
{        renderSkeletons(5)}
      </div>}>
        <MenuCollapse isexpand={isexpand} />
      </Suspense>
    </StyledMainDrawer>
  );
});

export default MainDrawer;
