export interface FontFamilyTypes {
  regular: string
  bold: string
  light: string
  regularDM: string
  boldDM: string
  lightDM: string
}

export interface FontSizeTypes {
  title: TitleSizeTypes
  paragraph: ParagraphSizeTypes
  button: ButtonSizeTypes
}

export interface TitleSizeTypes {
  't1': 80
  't2': 50
  't3': 24
  't4': 22
  't5': 20
  't5s': 18
  't6': 16
  't7': 14
  't8': 12
  't8s': 11
  't9': 10
}

export interface ParagraphSizeTypes {
    't1': 18
    't2': 16
    't3': 14
    't4': 12
    't5': 10
}

export interface ButtonSizeTypes {

    't1': 16
    't2': 14
    't3': 12
}

export interface FontsTypes {
  fontFamily: FontFamilyTypes
  fontSize: FontSizeTypes
}
