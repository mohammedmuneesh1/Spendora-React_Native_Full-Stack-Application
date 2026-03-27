import { Alert, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/expo';
import { useRouter } from 'expo-router';
import { styles } from '@/assets/styles/home.styles';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/assets/styles/colors';

const SignOutButton = () => {
    const { signOut } = useClerk();

    const router = useRouter();


    const handleSignOut = async ()=>{
        // try {
        //     await signOut();
        //     //Redirect to your desired page 
        //     router.replace("/");
        // } catch (error) {
        //     console.error(JSON.stringify(error,null,2))
        // }

        Alert.alert("logout","Are you sure you want to logout?",
            [
                {text:"Cancel",style:"cancel"},
                {text:"Yes",style:"destructive",onPress:()=>signOut()}
            ]);
            
    }
    return (
    <TouchableOpacity
    style={styles?.logoutButton}
    onPress={handleSignOut}>
        <Ionicons name="log-out-outline"
        size={22}
        color={COLORS?.text}
        />
    </TouchableOpacity>
  )
}
export default SignOutButton



// import { View, Text } from 'react-native'
// import React from 'react'

// const SignOutButton = () => {
//   return (
//     <View>
//       <Text>SignOutButton</Text>
//     </View>
//   )
// }

// export default SignOutButton