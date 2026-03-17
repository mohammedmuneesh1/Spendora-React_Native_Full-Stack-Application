import { Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useClerk } from '@clerk/expo';
import { useRouter } from 'expo-router';

const SignOutButton = () => {
    const { signOut } = useClerk();

    const router = useRouter();


    const handleSignOut = async ()=>{
        try {
            await signOut();
            //Redirect to your desired page 
            router.replace("/");
        } catch (error) {
            console.error(JSON.stringify(error,null,2))
        }
    }
    return (
    <TouchableOpacity onPress={handleSignOut}>
        <Text>Sign Out</Text>
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