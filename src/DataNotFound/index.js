import { Box, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
const useStyles = makeStyles((theme) => ({
  mainBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& h6": {
    },
  },
}));

export default function NoDataFound() {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox} align="center">
      <Typography
        variant="h6"
        style={{
          textAlign: "left",
          fontSize: "16px",
          fontWeight: "100",
          fontFamily: "Inter",
        }}
      >
        No Data Found
      </Typography>
    </Box>
  );
}
