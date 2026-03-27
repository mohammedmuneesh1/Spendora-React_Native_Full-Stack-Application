import SafeScreen from "@/components/SafeScreen";
import { Slot } from "expo-router";
import { ClerkProvider } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache'
import {StatusBar} from 'expo-status-bar'




//============================================== BIG NOTE ===============================================================

//tokenCache dont work on web, 
//so open on phone, in web it won't work 

//============================================== BIG NOTE ===============================================================
export default function RootLayout() {
  // return <Stack screenOptions={{headerShown:false}} />; // ⚠️⚠️ TO REMOVE THE TOP TITLE
  // return <Stack screenOptions={{headerShown:false}} />;

  
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  
if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

  return (

     <ClerkProvider
      publishableKey={publishableKey}
       tokenCache={tokenCache}>
        <SafeScreen>
        <Slot />   {/* SLOT IS SOMETHING EQUIVALENT TO <OUTLET/> IN REACT */}
      </SafeScreen>
      <StatusBar style="dark"/>
    </ClerkProvider>
  )
}






    // 