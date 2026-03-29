import { createHomeStyles } from '@/assets/styles/home.styles';
import { useTheme } from '@/context/ThemeContext';
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const SafeScreen = ({children}:{children:React.ReactNode}) => {

    const insets = useSafeAreaInsets();
    const { theme } = useTheme();

  return (
    <View style={{paddingTop:insets.top, flex:1,backgroundColor:theme?.background}}>
      {children}
    </View>
  )
}

export default SafeScreen;