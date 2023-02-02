import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CustomTextField from "../custom-elements/CustomTextField";
import FeatherIcon from "feather-icons-react";

const priceInputs = [
  {
    key: 1,
    title: "Catégorie principale",
    input: <CustomTextField></CustomTextField>,
    icon: "plus",
  },
  {
    key: 2,
    title: "Catégorie secondaire",
    input: <CustomTextField></CustomTextField>,
    icon: "plus",
  },
  {
    key: 3,
    title: "Genre",
    input: <CustomTextField></CustomTextField>,
    icon: "arrow-right",
  },
];

const CategoryForm = () => {
  const [state, setState] = React.useState({
    checkedA: false,
    checkedB: false,
    checkedC: false,
  });

  const Row = ({ title, input, icon }) => {
    return (
      <Box
        sx={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Typography
          sx={{
            marginTop: 2,
          }}
          fontWeight="700"
        >
          {title}
        </Typography>
        <Box
          sx={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flex: 1,
          }}
        >
          {input}
        </Box>
      </Box>
    );
  };

  return (
    <Card
      sx={{
        p: 0,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          height: 180,
          px: "30px",
        }}
      >
        {priceInputs.map(({ title, input, icon }) => {
          return <Row title={title} input={input} icon={icon}></Row>;
        })}
      </CardContent>
    </Card>
  );
};

export default CategoryForm;
