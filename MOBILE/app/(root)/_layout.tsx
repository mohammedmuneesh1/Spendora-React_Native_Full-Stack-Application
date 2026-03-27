import { View, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/expo';
import { Redirect, Stack } from 'expo-router';

const Layout = () => {
    const {isSignedIn,isLoaded} = useUser();

    if(!isLoaded){
      return null 
      //this is for better ux , for example initial loading time, "EVEN IF LOGGED,
      //  it need to load user from clerk, so before complete the loading, it will
      //  redirect to signin page, so there for to prevent redirecting, we will be using isLoaded there."
      
    }




    if(!isSignedIn){
        return <Redirect href={"/sign-in"} />
    }
  return (
<Stack screenOptions={{headerShown:false}} />
  )
}

export default Layout;