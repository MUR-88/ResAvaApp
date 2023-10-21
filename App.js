import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import Route from './src/routes';
import { useFonts } from 'expo-font';
import store from './src/redux/store'
import { Toast_Error, Toast_Sukses, Loading } from './src/component';
// import './OneSignal'

export default function App() {
  const [loaded] = useFonts({
    Poppins: require('./src/assets/font/Poppins-Regular.ttf'),
    PoppinsBold: require('./src/assets/font/Poppins-Bold.ttf'),
    PoppinsMedium: require('./src/assets/font/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('./src/assets/font/Poppins-SemiBold.ttf'),
    PoppinsMedium: require('./src/assets/font/Poppins-Medium.ttf'),
    Poppins_ExtraLight: require('./src/assets/font/Poppins-ExtraLight.ttf'),
    Poppins_ExtraLightItalic: require('./src/assets/font/Poppins-ExtraLightItalic.ttf'),
    Poppins_Light: require('./src/assets/font/Poppins-Light.ttf'),
    Poppins_Regular: require('./src/assets/font/Poppins-Regular.ttf')
  });
  
  if (!loaded) {
    return null;
  }
 
  return (
    // <Text>oke</Text>
    <Provider store={store}>
      {/* <Loading /> */}
      {/* <Toast_Error />
      <Toast_Sukses/> */}
      <Route />
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
