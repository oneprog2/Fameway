import { Card } from "@mui/material";
import { Box } from "@mui/system";
import imageIcon from "../../assets/images/logos/Icons.png";
import imageIconDark from "../../assets/images/logos/Icons-black.png";

export const PicturesInput = ({ handleSetPictures, pictures }) => {
  return (
    <Box>
      <Card
        sx={{
          borderRadius: 3,
          mt: 2,
          backgroundColor: "#222222",
          p: 0,
          display: "flex",
          aspectRatio: "1/1.2",
          cursor: "pointer",
        }}
      >
        <label
          key={"mainPic"}
          onChange={(e) =>
            handleSetPictures({
              file: e,
              index: 0,
            })
          }
          style={{
            cursor: "pointer",
            height: "100%",
            width: "100%",
            objectFit: "contain",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
          htmlFor="mainPicture"
        >
          <input
            alt={"Photo principale"}
            accept="image/*"
            name="mainPicture"
            type="file"
            id="mainPicture"
            hidden
          />
          <img
            alt="banners"
            style={{
              height: pictures?.find((o) => o.index === 0) ? "100%" : "30%",
              width: pictures?.find((o) => o.index === 0) ? "100%" : "30%",
              objectFit: pictures?.find((o) => o.index === 0)
                ? "cover"
                : "contain",
            }}
            src={
              pictures?.find((o) => o.index === 0)
                ? pictures?.find((o) => o.index === 0)?.preview
                : imageIcon
            }
          />
        </label>
      </Card>

      <Box
        sx={{
          display: "flex",
          flex: 1,
          px: 2,
          mt: 0,
          justifyContent: "space-between",
          spacing: {
            sm: 0,
            lg: 40,
          },
          gap: 1,
        }}
      >
        {new Array(4).fill(0).map((item, index) => (
          <label
            key={index + "pic"}
            onChange={(e) =>
              handleSetPictures({
                file: e,
                index: index + 1,
              })
            }
            style={{
              cursor: "pointer",
              height: "100%",
              width: "100%",
              objectFit: "contain",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
            htmlFor={`pictures-${index}`}
          >
            <input
              accept="image/*"
              alt={`Photo ${index + 1}`}
              name={`pictures-${index}`}
              type="file"
              id={`pictures-${index}`}
              hidden
            />
            <Card
              key={index + "pic"}
              sx={{
                flex: 1,
                m: 0,
                p: 0,
                borderRadius: 2,
                aspectRatio: "1/1.2",
                backgroundColor: pictures?.find((o) => o.index === index + 1)
                  ? "#222222"
                  : "#FFCE00",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <img
                alt="banners"
                style={{
                  height: pictures?.find((o) => o.index === index + 1)
                    ? "100%"
                    : "50%",
                  width: "100%",
                  objectFit: pictures?.find((o) => o.index === index + 1)
                    ? "cover"
                    : "contain",
                }}
                src={
                  pictures?.find((o) => o.index === index + 1)
                    ? pictures?.find((o) => o.index === index + 1)?.preview
                    : imageIconDark
                }
              />
            </Card>
          </label>
        ))}
      </Box>
    </Box>
  );
};
