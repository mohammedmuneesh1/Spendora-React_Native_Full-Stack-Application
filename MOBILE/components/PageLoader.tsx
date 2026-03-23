import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { styles } from '../assets/styles/home.styles'
import { COLORS } from '../assets/styles/colors'
import { BallIndicator } from 'react-native-indicators';


const PageLoader = () => {
  return (
    <View style={styles?.loadingContainer}>
      {/* <ActivityIndicator
      size={"large"}
      color={COLORS?.primary}
    animating={true}
  hidesWhenStopped={true}
      /> */}
<BallIndicator
 color={COLORS?.primary} 
 size={60}
  />
    </View>
  )
}

export default PageLoader