import _ from "lodash";
import { colors, responsiveFontSizes, adaptV4Theme, createTheme as createMuiTheme } from "@mui/material";
import typography from "./typography";

const baseOptions = {
  typography,
  overrides: {
    MuiTableCell: {
      root: {
        borderBottom: "transparent",
      },
      head: {
        background: "#F4F7FF",
        // borderRadius: "10px",
      },
    },
    MuiTableRow: {
      root: {},
    },
    MuiFormLabel: {
      root: { color: "#222" },
      colorSecondary: {
        "&.Mui-focused": {
          color: "#222",
        },
      },
    },
    MuiListSubheader: {
      root: {
        color: "#000000",
        fontSize: "22px !important",
        fontWeight: "600 !important",
        lineHeight: "33px !important",
      },
    },
    MuiOutlinedInput: {
      root: {
        background: "#FCFCFC",
        borderRadius: "5px",
        height: "55px",
        // border: "1px solid rgba(0, 0, 0, 0.08)",
        "& .Mui-focused": {
          color: "#262626",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
      input: {
        color: "#000",
        fontSize: "14px",
        fontFamily: "poppins",
        fontWeight: 400,
      },
      notchedOutline: {
        borderColor: "rgba(0, 0, 0, 0.08)",
      },
      colorSecondary: {
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
          color: "#262626",
        },
        "& .Mui-focused": {
          color: "#262626",
        },
      },
    },
    MuiPaper: {
      outlined: {
        padding: "20px",
        width: "100%",
      },
      elevation1: {
        background: "#fff",
        borderRadius: "10px",
        padding: "26px 20px",
        boxShadow: "none",
      },
      elevation2: {
        background:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.03) 0%, rgba(0, 0, 0, 0) 68.15%)",
        border: "2px solid rgba(0, 0, 0, 0.15)",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "none",
      },
    },
    MuiPopover: {
      root: {
        zIndex: 99999,
      },
    },
    MuiMenuItem: { root: { paddingLeft: "20px" } },
    MuiListItem: {
      root: {
        alignItems: "self-start",
      },
      gutters: {
        paddingLeft: 0,
      },
    },
    MuiCheckbox: {
      root: {
        padding: "6px",
        fontSize: "22px",
        color: "rgba(0, 0, 0, 0.40)",
        strokeWidth: "1.2px",
      },
      colorSecondary: {
        "&.Mui-checked": { color: "#FF7F26" },
      },
    },
    MuiFormControlLabel: {
      root: {
        paddingBottom: "0",
      },
    },
    MuiListItemSecondaryAction: {
      root: {
        right: 0,
      },
    },
    MuiDialog: {
      paperScrollPaper: {
        Width: 450,
        maxWidth: "100%",
      },
      paper: {
        overflowY: "scroll",
      },
      paperWidthSm: {
        maxWidth: "900px ",
      },
    },
    MuiInputBase: {
      input: {
        fontSize: 14,
        color: "#222",
        height: "0.1876em",
      },
    },
    MuiBackdrop: {
      root: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
    },
    MuiAutocomplete: {
      option: {
        fontFamily: "Poppins !important",
        fontSize: "12px !important",
        fontWeight: "400 !important",
        lineHeight: "18px !important",
        letterSpacing: "0px !important",
        textAlign: "left !important",
      },
    },
    MuiButton: {
      containedSecondary: {
        color: "#262626",
        height: "40px",
        padding: "10px 39px",
        fontSize: "14px",
        border: "1px solid #E1E1E1",
        background: "#E1E1E1",
        fontWeight: "400",
        lineHeight: "21px",
        fontFamily: "'Calibri', sans-serif",
        borderRadius: "5px",
        backgroundColor: "#E1E1E1",
        "&:hover": {
          background: "#E1E1E1",
          border: "1px solid #E1E1E1",
          boxShadow: "none !important",
          color: "#262626",
          backgroundColor: "#E1E1E1",
        },
      },

      containedPrimary: {
        color: "#fff",
        height: "40px",
        padding: "10px 39px",
        fontSize: "18px",
        background: "#EC1F24",
        border: "1px solid #EC1F24",
        fontWeight: "500",
        lineHeight: "21px",
        fontFamily: "'Calibri', sans-serif",
        borderRadius: "5px",
        backgroundColor: "#EC1F24",
        "&:hover": {
          color: "#fff",
          border: "1px solid #EC1F24",
          background: "#EC1F24",
        },
      },
      contained: {
        borderRadius: "50px",
        fontWeight: 600,
        padding: "5px 19px",
        boxShadow: "none !important",
      },
      outlinedPrimary: {
        color: "#EC1F24",
        border: "1px solid #EC1F24",
        padding: "5px 25px",
        fontWeight: "500",
        borderRadius: "50px",
        fontSize: "13px",
        "&:hover": {
          backgroundColor: "#EC1F24",
          border: "1px solid #EC1F24",
          color: "#fff",
        },
      },
      outlinedSizeSmall: {
        padding: "6px 23px",
        fontSize: "16px",
        lineHeight: " 24px",
      },
    },
    MuiDrawer: {
      paperAnchorDockedLeft: {
        borderRight: "0",
      },
    },
    MuiMenu: {
      paper: { top: "47px" },
    },

    MuiTypography: {
      subtitle1: {
        color: "#000",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: " 16px",
        colorSecondary: {
          color: "#8d8989",
        },
      },
    },
  },
};

const themesOptions = {
  typography: {
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
  },
  palette: {
    type: "light",
    action: {
      primary: "#20509e",
    },
    background: {
      default: "#FBFBFD",
      dark: "#f3f7f9",
      paper: colors.common.white,
    },
    primary: {
      main: "#262A41",
      dark: "#de0d0d",
      light: "#de0d0d",
    },
    secondary: {
      main: "#fff",
    },
    warning: {
      main: "#ffae33",
      dark: "#ffae33",
      light: "#fff1dc",
    },
    success: {
      main: "#54e18c",
      dark: "#54e18c",
      light: "#e2faec",
    },
    error: {
      main: "#ED2124",
      dark: "#ff7d68",
      light: "#ffe9e6",
    },
    text: {
      primary: "#262626",
      secondary: "#FF7F26",
      light: "#484848",
      extralight: "rgba(0, 0, 0, 0.60)",
    },
    common: {
      black: "#000000",
    },
  },
};

export function createTheme(config = {}) {
  let themeOptions = false;

  let theme = createMuiTheme(
    adaptV4Theme(_.merge({}, baseOptions, themeOptions, { direction: config.direction }))
  );

  if (config.responsiveFontSizes) {
    theme = responsiveFontSizes(theme);
  }

  return theme;
};
