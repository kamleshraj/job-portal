// SETUP COLORS
const GREY = {
    0: '#FFFFFF',
    100: '#F5F3F5', 
    200: '#ECECFF',
    300: '#C2C2C2',
    400: '#D5D5DD',
    500: '#D9D9D9', 
    600: '#A9A9AC',
    700: '#454F5B',
    800: '#212B36',
    900: '#0F0F19'
  };
  const BACKGROUNDS = {
    white: '#ffffff',
    light: '#f5f3f5'
  };
  const GREYTHEME = {
    0: '#3a3a42',
    100: '#d5d5dd',
    200: '#ECECFF',
    300: '#1976d2',
    400: '#D5D5DD',
    500: '#89898e',
    600: '#6E6E72',
    700: '#3E3C90'
  };
  const PRIMARY = {
    light: '#3230be',
    main: '#1e1450',
    mainLight: '#827C9D',
    contrastText: '#ffffff'
  };
  const SECONDARY = {
    main: '#f5f3f5',
    darker: '#0f0f19',
    contrastText: '#ffffff'
  };
  const INFO = {
    main: '#3230be',
    contrastText: '#ffffff'
  };
  const SUCCESS = {
    main: '#4aa359',
    contrastText: '#ffffff'
  };
  const WARNING = {
    main: '#ffd300',
    dark: '#ff800b',
    contrastText: '#0f0f19'
  };
  const ERROR = {
    main: '#b72015',
    contrastText: '#ffffff'
  };

const palette = {
    text: {
        primary: SECONDARY.darker,
        secondary: PRIMARY.darker,
        secondarydark: SECONDARY.darker,
        blue: PRIMARY.light,
        black: PRIMARY.main,
        white: PRIMARY.contrastText,
        disabled: GREYTHEME[600]
    },
    background: { paper: GREY[0], default: GREY[100] }
}

export default palette