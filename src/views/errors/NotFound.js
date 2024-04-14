import { Box, Typography, Paper } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";

const useStyles = makeStyles((theme) => ({
  mainBox: {
    height: "100vh",
  },
}));
export default function NotFound(props) {
  const classes = useStyles();
  return (
    <Paper title="page not found!">
      <Box pt={20} className={classes.mainBox}>
        <Typography variant="h1" align="center">
          Oops!
        </Typography>
        <Typography variant="h1" align="center" paragraph>
          404 Not Found
        </Typography>
        <Typography variant="h4" align="center">
          Sorry, an error has occured, Requested page not found!
        </Typography>
      </Box>
    </Paper>
  );
}
