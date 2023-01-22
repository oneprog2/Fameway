import * as React from "react";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

export const FamewayIcon = ({ color = "#FFCF26" }: { color?: string }) => (
  <Svg
    preserveAspectRatio="xMinYMin slice"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 80 80"
    width={"100%"}
    height="100%"
  >
    <Path
      d="M36.67 18.296c.745-3.581 5.859-3.581 6.605 0L55.433 76.65h-30.92L36.67 18.296Z"
      fill="url(#a)"
    />
    <Path
      d="M29.696 58.499c-2.785 2.372-6.825-.764-5.22-4.05L50.649.895l24.427 18.957-45.38 38.647Z"
      fill="url(#b)"
    />
    <Path
      d="M55.67 54.246c1.618 3.28-2.41 6.431-5.204 4.07L4.934 19.848 29.286.796l26.383 53.45Z"
      fill="url(#c)"
    />
    <Path
      d="M59.396 30.315c3.645-.307 5.105 4.594 1.886 6.33L8.824 64.952 0 35.317l59.396-5.002Z"
      fill="url(#d)"
    />
    <Path
      d="M18.706 36.357c-3.195-1.78-1.67-6.661 1.971-6.305L80 35.863l-9.228 29.511-52.066-29.017Z"
      fill="url(#e)"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={39.973}
        y1={15.61}
        x2={39.973}
        y2={76.65}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={color} />
        <Stop offset={1} stopColor={color} stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={25.439}
        y1={58.595}
        x2={62.862}
        y2={10.373}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={color} />
        <Stop offset={1} stopColor={color} stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={54.722}
        y1={58.397}
        x2={17.11}
        y2={10.322}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={color} />
        <Stop offset={1} stopColor={color} stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={62.913}
        y1={32.715}
        x2={4.412}
        y2={50.134}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={color} />
        <Stop offset={1} stopColor={color} stopOpacity={0} />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={17.128}
        y1={32.402}
        x2={75.386}
        y2={50.619}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor={color} />
        <Stop offset={1} stopColor={color} stopOpacity={0} />
      </LinearGradient>
    </Defs>
  </Svg>
);
