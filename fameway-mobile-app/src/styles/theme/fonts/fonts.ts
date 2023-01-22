import { FontFamilyTypes, FontSizeTypes, FontsTypes } from './interfaces';

export const fontFamily: FontFamilyTypes = {
  regular: 'Oblivian-Regular',
  bold: 'Oblivian-Bold',
  light: 'Oblivian-Light',
  regularDM: 'DM-Regular',
  boldDM: 'DM-Bold',
  lightDM: 'DM-Light',
};

export const fontSize: FontSizeTypes = {
  title: {
    't1': 80,
    't2': 50,
    't3': 24,
    't4': 22,
    't5': 20,
    't5s': 18,
    't6': 16,
    't7': 14,
    't8': 12,
    't8s': 11,
    't9': 10,
  },
  paragraph: {
    't1': 18,
    't2': 16,
    't3': 14,
    't4': 12,
    't5': 10,
  },
  button: {
    't1': 16,
    't2': 14,
    't3': 12,
  },
};

export const fonts:FontsTypes = {
  fontFamily,
  fontSize,
};
