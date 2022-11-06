import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import TabsScreen from './src/screens/Tabs';
import ResetPasswordScreen from './src/screens/ForgotPasswd';
import VideoViewer from './src/components/VideoViewer';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise(resolve => setTimeout(resolve, 0));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Tabs" component={TabsScreen} options={{headerShown: false}} />
          <Stack.Screen name="Forgot Password" component={ResetPasswordScreen} />
          <Stack.Screen name = "VideoViewer" component={VideoViewer} options={{title: ""}}/>
        </Stack.Navigator>
        <View onLayout={onLayoutRootView}>
        </View>
      </NavigationContainer>
    </>
  );
}
