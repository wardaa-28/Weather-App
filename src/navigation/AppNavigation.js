import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Welcome from '../screens/Welcome'
import Home from '../screens/Home'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator()
const AppNavigation = () => {
  const [splash,showSplash]=useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      showSplash(false)
    },3000)
  },[])
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{headerShown:false, gestureEnabled: true}}>
      {splash? <Stack.Screen name='Welcome' component={Welcome}/>
      :
      <>
      <Stack.Screen name='Home' component={Home}/>
      </>
      }
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation

const styles = StyleSheet.create({})