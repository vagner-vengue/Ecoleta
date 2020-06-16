import React from 'react';
import { StatusBar, View } from 'react-native';
import { AppLoading } from "expo";

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';  // useFonts se importa somente uma vez.

import Routes from './src/routes';

export default function App() {
  
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }
  
  return(
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}

// backgroundColor e translucent só functionam no Android. Translucent permite que a tela apareça por trás da status bar.
