import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const about = () => {
  return (
    <View>
        <Stack.Screen options={{
            title:'About us page '
        }} />
      <Text>about</Text>
    </View>
  )
}

export default about