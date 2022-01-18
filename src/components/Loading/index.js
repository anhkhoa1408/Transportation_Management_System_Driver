import React from 'react';
import Spinner from 'react-native-spinkit';
import { SafeAreaView, StyleSheet } from 'react-native';
import { primary } from '../../styles/color';
import { containerOverlay } from '../../styles/layoutStyle';
import { Text } from 'react-native-elements';

const Loading = () => {
  //   const [visible, setVisible] = useState(true);
  //   useEffect(() => {
  //     let time = setTimeout(() => setVisible(false), 10000);
  //     return () => {
  //       clearTimeout(time);
  //     };
  //   }, [visible]);

  return (
    <SafeAreaView style={[styles.container, styles.containerOverlay]}>
      <Spinner
        style={styles.spinner}
        isVisible={true}
        size={100}
        type="ThreeBounce"
        color={primary}
      />
      <Text style={styles.text}>Xin vui lòng đợi</Text>
    </SafeAreaView>
  );
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  containerOverlay: {
    ...containerOverlay,
  },
  spinner: {
    marginBottom: 10,
  },
  text: {
    color: primary,
    fontSize: 20,
  },
});

export default Loading;
