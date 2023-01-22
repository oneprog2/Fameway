// import { Key } from "react";
// import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
// import ScrollableTabView from "react-native-scrollable-tab-view";
// import TabBar from "react-native-underline-tabbar";

// export type TopTabBarProps = {
//   children: React.ReactNode;
//   tabQuantity: number;
// };

// const Tab = ({
//   tab,
//   page,
//   isTabActive,
//   onPressHandler,
//   onTabLayout,
//   styles,
// }) => {
//   const { label, icon } = tab;
//   const style = {
//     marginHorizontal: 20,
//     paddingBottom: 10,
//   };
//   const containerStyle = {
//     flexDirection: "row",
//     alignItems: "center",
//     transform: [{ scale: styles.scale }],
//   };
//   const textStyle = {
//     fontSize: 16,
//     fontFamily: "DM-Regular",
//   };
//   return (
//     <TouchableOpacity
//       style={style}
//       onPress={onPressHandler}
//       onLayout={onTabLayout}
//       key={page}
//     >
//       <Animated.View style={containerStyle}>
//         <Animated.Text style={textStyle}>{label}</Animated.Text>
//       </Animated.View>
//     </TouchableOpacity>
//   );
// };

// export const TopTabBar = ({ children, tabQuantity }: TopTabBarProps) => {
//   const _scrollX = new Animated.Value(0);
//   const interpolators = Array.from({ length: tabQuantity }, (_, i) => i).map(
//     (idx) => ({
//       scale: _scrollX.interpolate({
//         inputRange: [idx - 1, idx, idx + 1],
//         outputRange: [1, 1.1, 1],
//         extrapolate: "clamp",
//       }),
//     })
//   );

//   return (
//     <ScrollableTabView
//       onScroll={(x: number) => _scrollX.setValue(x)}
//       tabBarActiveTextColor="#000000"
//       renderTabBar={() => (
//         <TabBar
//           renderTab={(
//             tab: any,
//             page: any,
//             isTabActive: any,
//             onPressHandler: any,
//             onTabLayout: any
//           ) => (
//             <Tab
//               key={page}
//               tab={tab}
//               page={page}
//               isTabActive={isTabActive}
//               onPressHandler={onPressHandler}
//               onTabLayout={onTabLayout}
//               styles={interpolators[page]}
//             />
//           )}
//           tabBarTextStyle={{
//             fontSize: 16,
//             fontFamily: "DM-Regular",
//           }}
//           tabBarStyle={{
//             borderTopWidth: 0,
//             borderBottomWidth: 0.5,
//             borderBottomColor: "#DDDDDD",
//           }}
//           underlineColor="#000000"
//         />
//       )}
//     >
//       {children}
//     </ScrollableTabView>
//   );
// };
