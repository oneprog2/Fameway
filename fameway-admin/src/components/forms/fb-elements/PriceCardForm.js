import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CustomTextField from "../custom-elements/CustomTextField";
import FeatherIcon from "feather-icons-react";

const priceInputs = [
  {
    key: 1,
    title: "Coût de production",
    input: (
      <CustomTextField
        disabled
        value={"0 €"}
        inputProps={{
          style: { textAlign: "center" },
        }}
      ></CustomTextField>
    ),
    icon: "plus",
  },
  {
    key: 2,
    title: "Mon bénéfice net",
    input: (
      <CustomTextField
        value={"2 €"}
        inputProps={{
          style: {
            fontSize: 19,
            textAlign: "center",
            color: "green",
            fontWeight: "700",
          },
        }}
      ></CustomTextField>
    ),
    icon: "plus",
  },
  {
    key: 3,
    title: "Commission",
    input: (
      <CustomTextField
        disabled
        value={"20%"}
        inputProps={{
          style: { textAlign: "center" },
        }}
      ></CustomTextField>
    ),
    icon: "arrow-right",
  },
  {
    key: 4,
    title: "Prix TTC client",
    input: (
      <CustomTextField
        disabled
        value={"2.20 €"}
        inputProps={{
          style: { textAlign: "center" },
        }}
      ></CustomTextField>
    ),
  },
];

const PriceCardForm = () => {
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
          <Box
            sx={{
              ml: 2,
            }}
          >
            <FeatherIcon icon={icon} width="25" height="25" />
          </Box>
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
          height: 200,
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

export default PriceCardForm;