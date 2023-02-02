import React from "react";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  FormControlLabel,
  Button,
  Grid,
  RadioGroup,
  FormControl,
  MenuItem,
} from "@mui/material";
import CustomTextField from "../custom-elements/CustomTextField";
import CustomSelect from "../custom-elements/CustomSelect";
import CustomCheckbox from "../custom-elements/CustomCheckbox";
import CustomRadio from "../custom-elements/CustomRadio";
import CustomFormLabel from "../custom-elements/CustomFormLabel";
import QuillEditor from "../../inputs/QuillEditor";

const numbers = [
  {
    value: "one",
    label: "One",
  },
  {
    value: "two",
    label: "Two",
  },
  {
    value: "three",
    label: "Three",
  },
  {
    value: "four",
    label: "Four",
  },
];

const DescriptionCardForm = () => {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [value, setValue] = React.useState("");

  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  const [number, setNumber] = React.useState("");

  const handleChange3 = (event) => {
    setNumber(event.target.value);
  };

  return (
    <Card
      sx={{
        p: 0,
      }}
    >
      <CardContent
        sx={{
          px: "30px",
        }}
      >
        <form>
          <CustomFormLabel
            sx={{
              mt: 0,
            }}
          >
            Nom de l'article
          </CustomFormLabel>
          <CustomTextField
            id="default-value"
            variant="outlined"
            defaultValue="George deo"
            fullWidth
            size="small"
          />

          <CustomFormLabel htmlFor="default-outlined-password-input">
            Description
          </CustomFormLabel>
          <QuillEditor />
        </form>
      </CardContent>
    </Card>
  );
};

export default DescriptionCardForm;
