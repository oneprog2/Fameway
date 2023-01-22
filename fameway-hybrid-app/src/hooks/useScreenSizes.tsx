import { useWindowDimensions } from "react-native";

import { useTheme } from "@styles";

interface ScreenSizes {
  windowWidth: number;
  windowHeight: number;
  isMobileS: boolean;
  isMobileM: boolean;
  isMobileL: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktopS: boolean;
  isDesktopM: boolean;
  isDesktop: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
}

export const useScreenSizes = (): ScreenSizes => {
  const { width, height } = useWindowDimensions();
  const theme = useTheme();
  const { mobileM, mobileL, tablet, desktopS, desktopM } =
    theme.metrics.breakpoints;

  const windowWidth = width;
  const windowHeight = height;

  const isMobileS = windowWidth <= mobileM;
  const isMobileM = windowWidth > mobileM && windowWidth <= mobileL;
  const isMobileL = windowWidth > mobileL && windowWidth <= tablet;
  const isMobile = isMobileS || isMobileM || isMobileL;
  const isTablet = windowWidth > tablet && windowWidth <= desktopS;
  const isDesktopS = windowWidth > desktopS && windowWidth <= desktopM;
  const isDesktopM = windowWidth > desktopM;
  const isDesktop = isDesktopS || isDesktopM;

  const isPortrait = windowHeight >= windowWidth;
  const isLandscape = !isPortrait;

  return {
    windowWidth,
    windowHeight,
    isMobileS,
    isMobileM,
    isMobileL,
    isMobile,
    isTablet,
    isDesktopS,
    isDesktopM,
    isDesktop,
    isPortrait,
    isLandscape,
  };
};
