import {
  BorderRadiusTypes,
  BreakpointsTypes,
  TextsSpacingRatioTypes,
  LineHeightRatioTypes,
  SpacingTypes,
  MetricsTypes,
  IconSizesTypes,
  OCDsizeTypes,
  ContentSizesTypes
} from './interfaces';

const textsSpacingRatio: TextsSpacingRatioTypes = {
  paragraph: 1,
  title: 1.5
};

const lineHeightRatio: LineHeightRatioTypes = {
  title: 1.5,
  text: 1.2
};

const iconSizes: IconSizesTypes = {
  xxs: 8,
  xs: 10,
  s: 12,
  xm: 15,
  m: 20,
  mplus: 24,
  l: 30,
  xl: 36,
  xxl: 40
};

const spacing: SpacingTypes = {
  none: 0,
  xs: 5,
  s: 10,
  m: 15,
  xm: 20,
  xxm: 25,
  l: 30,
  xl: 35,
  xxl: 40,
  xxxl: 45,
  big: 55,
  xbig: 60,
  xxbig: 70,
  huge: 100,
  xhuge: 130,
  xxhuge: 150,
  xxxhuge: 170
};

const OCDsize: OCDsizeTypes = {
  OCDMobileTop: 175,
  OCDMobileBottom: 317,
  OCDDesktopFullTop: 113,
  OCDDesktopFullBottom: 190,
  OCDDesktopSmallBottom: 317,
  OCDDesktopSmallTop: 167
};

const contentSizes: ContentSizesTypes = {
  fundSheetContentMaxWidth: 709
};

export const borderRadius: BorderRadiusTypes = {
  none: 0,
  xs: 5,
  s: 10,
  m: 20,
  l: 40,
  full: 99999
};

const breakpoints: BreakpointsTypes = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  desktopS: 1024,
  desktopM: 1440
};

export const metrics:MetricsTypes = {
  borderRadius,
  breakpoints,
  lineHeightRatio,
  textsSpacingRatio,
  spacing,
  iconSizes,
  OCDsize,
  contentSizes
};
