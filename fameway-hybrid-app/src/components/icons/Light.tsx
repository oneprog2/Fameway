import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

export const Light = ({
  color = "white",
  position = "center",
}: {
  color: string;
  position: string;
}) => {
  if (position === "center") {
    return (
      <Svg
        preserveAspectRatio="xMinYMin slice"
        width={"100%"}
        height="100%"
        fill="none"
        viewBox="0 0 175 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <Path
          d="M62.4027 -50.133C67.3481 -66.6363 101.25 -66.6368 106.196 -50.1336L186.795 218.788H-18.1824L62.4027 -50.133Z"
          fill="url(#b)"
        />
        <Defs>
          <LinearGradient
            id="b"
            x1={0}
            y1={0}
            x2={0}
            y2={50}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color} />
            <Stop offset={1} stopColor={color} stopOpacity={0.1} />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  } else {
    return (
      <Svg
        preserveAspectRatio="xMinYMin slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="300 200 700 1650"
        width="1650"
        height="364"
      >
        <Path
          d="M-220.832 -35.4193C-236.06 -82.3954 -133.106 -175.746 -87.8385 -156.007L649.798 165.637L27.3073 730.055L-220.832 -35.4193Z"
          fill="url(#a)"
        />

        <Defs>
          <LinearGradient
            id="a"
            x1={34.973}
            y1={15.61}
            x2={39.973}
            y2={76.65}
            gradientUnits="userSpaceOnUse"
          >
            <Stop stopColor={color} />
            <Stop offset={1} stopColor={color} stopOpacity={0.1} />
          </LinearGradient>
        </Defs>
      </Svg>
    );
  }
};
