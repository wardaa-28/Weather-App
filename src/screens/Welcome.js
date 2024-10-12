import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'

const Welcome = () => {
 
  return (
    <View style={{flex:1}}>
      <View style={styles.imageBox}>
        <Image   source={require('../images/cloudy.png')}/>
        <Text style={styles.textBox}>Weather</Text>
        <Text style={{fontSize:20}}>Forecast</Text>
      </View>
    </View>
  )
}

export default Welcome

const styles = StyleSheet.create({
  imageBox:{flex:1,backgroundColor:'#DCE0E4',justifyContent:'center',alignItems:'center'},
  textBox:{fontSize:30,fontWeight:'bold'},
  iconBox:{justifyContent:'center',alignItems:'center',marginTop:50}
})