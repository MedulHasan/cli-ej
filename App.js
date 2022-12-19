import 'react-native-gesture-handler';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
  LogBox,
} from 'react-native';
LogBox.ignoreAllLogs();
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import AuthProvider from './context/AuthProvider';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import {
  DMSans_500Medium,
  DMSans_700Bold,
  DMSans_400Regular,
} from '@expo-google-fonts/dm-sans';
import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
} from '@expo-google-fonts/roboto';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Welcome from './components/Navigation/Welcome';

export default function App() {
  let [fontsLoad] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_700Bold,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_500Medium_Italic,
  });
  if (!fontsLoad) {
    return <AppLoading />;
  }
  return (
    <>
      <Provider store={store}>
        <AuthProvider>
          <NativeBaseProvider>
            <SafeAreaView style={styles.appContainer}>
              <NavigationContainer>
                <Welcome />
              </NavigationContainer>
            </SafeAreaView>
          </NativeBaseProvider>
        </AuthProvider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
