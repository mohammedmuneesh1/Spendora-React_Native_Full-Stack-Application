// import SignOutButton from '@/components/SignOutButton'
// import { Show, useUser } from '@clerk/expo'
// import { useClerk } from '@clerk/expo'
// import { Link } from 'expo-router'
// import { Text, View, Pressable, StyleSheet } from 'react-native'

// export default function RootIndexPage() {
//   const { user } = useUser()
//   const { signOut } = useClerk()

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome!</Text>
//       <Show when="signed-out">
//         <Link href="/(auth)/sign-in">
//           <Text>Sign in</Text>
//         </Link>
//         <Link href="/(auth)/sign-up">
//           <Text>Sign up</Text>
//         </Link>
//       </Show>
//       <Show when="signed-in">
//         <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
//         <Pressable style={styles.button} onPress={() => signOut()}>
//           <Text style={styles.buttonText}>Sign out</Text>
//         </Pressable>
//       </Show>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     paddingTop: 60,
//     gap: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   button: {
//     backgroundColor: '#0a7ea4',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
// })

import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SignOutButton from '@/components/SignOutButton';
import { useUser } from '@clerk/expo';
import { useTransactions } from '@/hooks/useTransactions';
import PageLoader from '@/components/PageLoader';

const RootIndexPage = () => {
  const {user} = useUser();
  const {transactions,summary,isLoading,deleteTransactions,loadData} = useTransactions(user?.id as string);

  useEffect(()=>{
    loadData();
  },[loadData]);
  console.log('data is loaded ',transactions);


  if(true){
    return <PageLoader/>
  }


  return (
    <View>
      <Text>this is the root page nowonwards </Text>
      <Text>{user?.emailAddresses[0].emailAddress}</Text>
      <Text>{summary?.balance ?? "N/A"}</Text>
      <Text>{summary?.income ?? "N/A"}</Text>
      <Text>{summary?.expenses ?? ""}</Text>


      <SignOutButton/>
    </View>
  )
    
}

export default RootIndexPage;