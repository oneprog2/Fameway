export interface SpacingTypes {
  none: 0
  xs: 5
  s: 10
  m: 15
  xm: 20
  xxm: 25
  l: 30
  xl: 35
  xxl: 40
  xxxl: 45
  big: 55
  xbig: 60
  xxbig: 70
  huge: 100
  xhuge: 130
  xxhuge: 150
  xxxhuge: 170
}

export interface OCDsizeTypes {
  OCDMobileTop: 175,
  OCDMobileBottom: 317,
  OCDDesktopFullTop: 113,
  OCDDesktopFullBottom: 190,
  OCDDesktopSmallBottom: 317,
  OCDDesktopSmallTop: 167
}

export interface ContentSizesTypes {
  fundSheetContentMaxWidth: 709
}
export interface IconSizesTypes {
  xxs: 8,
  xs: 10,
  s: 12,
  xm: 15,
  m: 20,
  mplus: 24,
  l: 30,
  xl: 36,
  xxl: 40
}
export interface TextsSpacingRatioTypes {
  paragraph: 1
  title: 1.5
}

export interface LineHeightRatioTypes {
  title: 1.5
  text: 1.2
}

export interface BorderRadiusTypes {
  none: 0
  xs: 5
  s: 10
  m: 24
  l: 40
  full: 99999
}

export interface BreakpointsTypes {
  mobileS: 320
  mobileM: 375
  mobileL: 425
  tablet: 768
  desktopS: 1024
  desktopM: 1440
}

export interface MetricsTypes {
  borderRadius:BorderRadiusTypes
  breakpoints:BreakpointsTypes
  lineHeightRatio:LineHeightRatioTypes
  textsSpacingRatio:TextsSpacingRatioTypes
  spacing:SpacingTypes
  iconSizes: IconSizesTypes
  OCDsize: OCDsizeTypes
  contentSizes: ContentSizesTypes
}
