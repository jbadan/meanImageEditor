import {
  cyanA400, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullWhite,
  amber300, amber50, grey600, deepOrange200, grey800



} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';

export default {
  spacing: spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: amber300,
    primary2Color: amber50,
    primary3Color: grey600,
    accent1Color: deepOrange200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: fullWhite,
    secondaryTextColor: fade(fullWhite, 0.7),
    alternateTextColor: fullWhite,
    canvasColor: grey800,
    borderColor: fade(fullWhite, 0.3),
    disabledColor: fade(fullWhite, 0.3),
    pickerHeaderColor: fade(fullWhite, 0.12),
    clockCircleColor: fade(fullWhite, 0.12),
  },
};
