import SafeScreen from "@/components/SafeScreen";
import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Text, View,ActivityIndicator  } from "react-native";

import NoInternetScreen from "@/components/NoInternetScreen";
import NetInfo from "@react-native-community/netinfo";
import InternetCheckingScreen from "@/components/InternetCheckingScreen";


//============================================== BIG NOTE ===============================================================

//tokenCache dont work on web,
//so open on phone, in web it won't work

//============================================== BIG NOTE ===============================================================
export default function RootLayout() {
  // return <Stack screenOptions={{headerShown:false}} />; // ⚠️⚠️ TO REMOVE THE TOP TITLE
  // return <Stack screenOptions={{headerShown:false}} />;

    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    
      useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  // if (isConnected === null) {
  //   return (
  //     <InternetCheckingScreen/>
  //   );
  // }

  // if (!isConnected) {
  //   return <NoInternetScreen onRetry={() => NetInfo.fetch().then(state => setIsConnected(state.isConnected))} />;
  // }



  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
  if (!publishableKey) {
    throw new Error("Add your Clerk Publishable Key to the .env file");
  }

  return (
     <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ThemeProvider>

        {isConnected === null && <InternetCheckingScreen />}

        {(isConnected !== true  && isConnected !== null ) && (
          <NoInternetScreen
            onRetry={() =>
              NetInfo.fetch().then((state) =>
                setIsConnected(state.isConnected)
              )
            }
          />
        )}

        {isConnected === true && (
          <SafeScreen>
            <Slot /> {/* SLOT IS SOMETHING EQUIVALENT TO <OUTLET/> IN REACT */}
          </SafeScreen>
        )}
      </ThemeProvider>
      <StatusBar style="dark" />  {/* PHONE BATTERY PARCENTAGE AND OTHER DETAILS SHOWING AREA */}
    </ClerkProvider>

  );
}

//
