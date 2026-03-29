import { View } from 'react-native'
import React from 'react'
import { BallIndicator } from 'react-native-indicators';
import { useTheme } from '@/context/ThemeContext';
import { createHomeStyles } from '@/assets/styles/home.styles';


const PageLoader = () => {

      const { theme } = useTheme();
      const styles = createHomeStyles(theme);
      

  return (
    <View style={styles?.loadingContainer}>
      {/* <ActivityIndicator
      size={"large"}
      color={COLORS?.primary}
    animating={true}
  hidesWhenStopped={true}
      /> */}
<BallIndicator
 color={theme?.primary} 
 size={60}
  />
    </View>
  )
}

export default PageLoader