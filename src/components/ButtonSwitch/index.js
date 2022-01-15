// import React, { useState, useRef, useCallback } from 'react';
// import { ButtonGroup } from 'react-native-elements';
// import { View, StyleSheet, Text, Dimensions } from 'react-native';
// import { COLORS } from '../../styles';
// import * as Animatable from 'react-native-animatable';

// const ButtonSwitch = () => {
//   const [width, setWidth] = useState(0);
//   const buttons = ['Chưa vận chuyển', 'Đã vận chuyển'];
//   const [selectedIndex, setSelectedIdx] = useState(0);
//   const view = useRef(null);
//   const [element1Width, setEle1Width] = useState(0);
//   const [element2Width, setEle2Width] = useState(0);
//   const [element1Tab, setEle1Tab] = useState(0);
//   const [element2Tab, setEle2Tab] = useState(0);
//   const [tabWidth, setTab] = useState(element1Tab);

//   const slideRight = () => {
//     view.current.animate({
//       0: {
//         translateX: 0,
//       },
//       0.5: {
//         translateX: element1Width / 2 - element1Tab,
//       },
//       // 0.75: {
//       //   translateX: element1Width / 20 - element1Tab,
//       // },
//       1: {
//         translateX: 0,
//       },
//       // 2: {
//       //   translateX: element1Tab - 20,
//       // },
//     });
//   };

//   const slideLeft = () => {
//     view.current.animate({
//       0: {
//         translateX: width / 2,
//       },
//       1: {
//         translateX: -0.5,
//       },
//       2: {
//         translateX: 0,
//       },
//     });
//   };

//   const component1 = () => (
//     <View
//       onLayout={e => {
//         setEle1Width(e.nativeEvent.layout.width);
//         setEle1Tab(e.nativeEvent.layout.x);
//         // setTab(e.nativeEvent.layout.x + 10);
//       }}>
//       <Text>Đang vận chuyển</Text>
//     </View>
//   );
//   const component2 = () => (
//     <View
//       onLayout={e => {
//         setEle2Width(e.nativeEvent.layout.width);
//         setEle2Tab(e.nativeEvent.layout.x);
//       }}>
//       <Text>Đã vận chuyển</Text>
//     </View>
//   );

//   const handleChangeSlide = idx => {
//     setSelectedIdx(idx);
//     setTab(
//       idx === 0
//         ? 10 + element1Tab
//         : element2Tab + Dimensions.get('window').width / 2,
//     );
//     if (idx === 1 && tabWidth === 10 + element1Tab) slideRight();
//     else if (
//       idx === 0 &&
//       tabWidth === element2Tab + Dimensions.get('window').width / 2
//     )
//       slideLeft();
//     setWidth(idx === 0 ? element1Width : element2Width);
//   };

//   console.log(element1Tab);

//   return (
//     <View style={style.container} onLayout={e => setWidth(element1Width)}>
//       <ButtonGroup
//         onPress={handleChangeSlide}
//         selectedIndex={selectedIndex}
//         buttons={[{ element: component1 }, { element: component2 }]}
//         containerStyle={{
//           margin: 0,
//           borderWidth: 0,
//           backgroundColor: 'transparent',
//         }}
//         selectedButtonStyle={{
//           backgroundColor: 'transparent',
//         }}
//         buttonStyle={{
//           borderWidth: 0,
//         }}
//         textStyle={{
//           color: '#000',
//           fontSize: 15,
//         }}
//         selectedTextStyle={{
//           color: COLORS.primary,
//         }}
//         innerBorderStyle={{
//           width: 0,
//         }}
//         underlayColor="white"
//       />
//       <Animatable.View
//         easing="ease-in"
//         duration={1000}
//         ref={view}
//         style={{
//           width: width,
//           marginLeft: tabWidth,
//           ...style.overlayBtn,
//         }}></Animatable.View>
//     </View>
//   );
// };

// const style = StyleSheet.create({
//   container: {
//     marginBottom: 10,
//   },
//   overlayBtn: {
//     backgroundColor: 'transparent',
//     borderBottomColor: COLORS.primary,
//     borderBottomWidth: 4,
//     borderRadius: 20,
//   },
// });

// export default ButtonSwitch;
