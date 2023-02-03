import React from "react";
import { Card, CardContent } from "@mui/material";
import CustomTextField from "../custom-elements/CustomTextField";
import CustomFormLabel from "../custom-elements/CustomFormLabel";
import QuillEditor from "../../inputs/QuillEditor";

const DescriptionCardForm = ({
  name,
  setName,
  description,
  setDescription,
}) => {
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
            Nom
          </CustomFormLabel>
          <CustomTextField
            id="default-value"
            variant="outlined"
            defaultValue=""
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom de l'article..."
            fullWidth
            size="small"
          />

          <CustomFormLabel htmlFor="default-outlined-password-input">
            Description
          </CustomFormLabel>
          <QuillEditor
            value={description}
            onChange={setDescription}
            placeholder="Description de l'article..."
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default DescriptionCardForm;
