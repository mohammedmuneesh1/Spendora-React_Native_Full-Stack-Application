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

import { View, Text, Image, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import SignOutButton from '@/components/SignOutButton';
import { useUser } from '@clerk/expo';
import { useTransactions } from '@/hooks/useTransactions';
import PageLoader from '@/components/PageLoader';
import { styles } from '@/assets/styles/home.styles';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import BalanceCard from '@/components/BalanceCard';
import { TransactionItem } from '@/components/TransactionItem';
import NoTransactionsFound from '@/components/NoTransactionFound';

const RootIndexPage = () => {
  const {user} = useUser();
  const router = useRouter();
  const {transactions,summary,isLoading,deleteTransactions,loadData} = useTransactions(user?.id as string);
  const [refreshing,setRefreshing] = useState(false);

  const onRefresh = async ()=>{
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }




  useEffect(()=>{
    loadData();
  },[loadData]);




  if(isLoading && !refreshing){
  // if(isLoading){ //THIS IS THE COMMON WAY TO SHOW LOADER,
  //  BUT TO PREVENT ENTIRE PAGE LOADING SIGN ON REFRESHING THE FLATLIST
  //  WE WILL BE ADDING CONDITION TO IT  ⚠️⚠️⚠️"isLoading && !refreshing"⚠️⚠️⚠️
    return <PageLoader/>
  }


  return (
    <View style={styles?.container}>
      <View style={styles?.content}>

        {/* HEADER START */}
        <View 
        style={styles?.header}
        >

          {/* LEFT SIDE */}
          <View style={styles?.headerLeft}>
            <Image
            source={require("../../assets/custom/logo.png")}
            style={styles?.headerLogo}
            resizeMode='contain'
            />
            <View
            style={styles?.welcomeContainer}
            >
              <Text style={styles?.welcomeText}>Welcome,</Text>
              <Text style={styles?.usernameText}>
                {user?.emailAddresses[0]?.emailAddress?.split("@")[0]}
              </Text>
              
              
            </View>
          </View>

          {/* RIGHT SIDE */}
          <View style={styles?.headerRight}>
            <TouchableOpacity 
            style={styles?.addButton}
            onPress={()=>router.push("/create")}
            // onPress={()=>router.push("/create")}
            >
 <Ionicons name='add' size={20} color={"#fff"} />
 <Text style={styles?.addButtonText}>Add</Text>
            </TouchableOpacity>
            <SignOutButton/>
          </View>
        </View>
        {/* HEADER end */}


        {/*BALANCE CARD  */}
        <BalanceCard summary={summary}/>

        {/*RECENT TRANSACTION START */}
        <View style={styles?.transactionsHeaderContainer}>
        <Text style={styles?.sectionTitle}>Recent Transactions</Text>
        </View>
        {/*RECENT TRANSACTION END */}

        


        {/* FLATLIST IS A PERFORMNT WAY TO RENDER LONG LISTES IN REACT NATIVE */}
        {/** IT RENDERS ITEMS LAZILY ONLY THOSE ON THE SCREEN. */}
 
<FlatList
// style={styles?.transactionsList}
// style={{marginHorizontal:5}}
// contentContainerStyle={styles?.transactionsListContent}
  data={transactions || []}
  keyExtractor={(item:any) => item?.id.toString()}
  renderItem={({ item }) => (
    <TransactionItem
           item={item}
           onDelete={deleteTransactions}
           />
  )}
  ListEmptyComponent={<NoTransactionsFound/>}
  showsVerticalScrollIndicator={false} //ONLY HIDE THE SCROLL INDICATOR , NOT SCROLLING
  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}
  //here refreshing is a state, onRefresh is a function
  /> }
/>

      </View>
    </View>
  )
    
}

export default RootIndexPage;