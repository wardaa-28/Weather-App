import { StyleSheet, Text, View, Image, FlatList, TextInput, TouchableOpacity, ImageBackground, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo'
import {DotIndicator} from 'react-native-indicators'
const Home = () => {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState('');
    const [city,setCity]=useState('Islamabad');
    const [modal,setModal]=useState(false);
    const [weekWeather, setWeekWeather] = useState([]);
    const [loadingWeather, setLoadingWeather] = useState(true);
    const [loadingWeekWeather, setLoadingWeekWeather] = useState(true);
    useEffect(()=>{
      GetWeather(city);
      GetWeekWeather(city);
   },[city])

    const MY_API = '26eef5a3d714068f33454c4ad2d02586';
    const GetWeather = async (city) => {
        if (!city) return;
        setLoadingWeather(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${MY_API}&units=metric`);
        console.log("🚀 ~ GetWeather ~ response :", response )
        const jsonData = await response.json();
        console.log("🚀 ~ GetWeather ~ jsonData :", jsonData )
        setData(jsonData);
        setLoadingWeather(false);
    }

    const GetWeekWeather = async (city) => {
        if (!city) return;
        setLoadingWeekWeather(true);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${MY_API}&units=metric`);
        console.log("🚀 ~ GetWeekWeather ~ response:", response)
        const json = await response.json();
        console.log("🚀 ~ GetWeekWeather ~ json:",JSON.stringify (json.list))
        setWeekWeather(json.list);
        setLoadingWeekWeather(false);
    }


    const handleSearch = () => {
        setCity(search);
        setModal(false)
    }
 return (
    <View style={{flex:1}}>
        <ImageBackground source={require('../images/background.jpg')} resizeMode="cover" style={styles.bgBox}>
          <View style={styles.overlay}>
            <View style={{justifyContent:'space-between',flexDirection:'row'}}>
                <View style={styles.justment}>
                  <Text style={[styles.cityName,{color:'white'}]}>Weather Update</Text>
                </View>
                <TouchableOpacity style={styles.iconsBox} onPress={()=>setModal(true)}>
                <Entypo name='location' size={30} color={'#016ca1'}/>
                </TouchableOpacity>
            </View>
        <Modal visible={modal} style={{justifyContent:'center',alignItems:'center',flex:1}} >
            <ImageBackground source={require('../images/background.jpg')} resizeMode="cover" style={styles.bgBox}>
            <View style={styles.searchBox}>
                <TextInput
                    placeholder='Search'
                    placeholderTextColor={'white'}
                    onChangeText={(input) => setSearch(input)}
                    style={styles.inputBox}
                 />
                <TouchableOpacity onPress={handleSearch} style={styles.buttonBox}>
                <Text style={styles.searchText}>Search</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </Modal>
        
        
     <View style={{backgroundColor:'#c1dde7',borderRadius:10,opacity:0.8}}>
     
        <View style={styles.justment}>
        <Text style={styles.cityName}>{data?.name}</Text>
        <View style={styles.infoBox}>
            <View style={{flexDirection:'row'}}>
                <Image style={[styles.weatherIcon,{width:'45%'}]}  source={{uri:`http://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`}} />
                <View style={styles.tempContainer}>
                {loadingWeather ? (<DotIndicator color='white' size={10} /> ) : (        
                <Text style={{fontSize:47,color:'white',opacity:1.5,fontWeight:'bold'}}>{data?.main?.temp}°C</Text>
            )}
                <Text style={styles.descriptionBox}>{data?.weather[0]?.description}</Text>
                </View>
            </View>
        </View>
       </View> 
        <Text style={styles.additionalInfo}> Feels like {data?.main?.feels_like }°C | Wind {data?.wind?.speed} km/h</Text>
        <Text style={styles.additionalInfo}>{data?.main?.temp_max}° /{data?.main?.temp_min }° </Text>
    </View>

        <View style={styles.statsContainer}>
            <View style={{margin:8,justifyContent:'center',alignItems:'center'}}>
                <View style={styles.statBox}>
                <Image  source={require('../images/smallcloud.png')} />
                <Text style={styles.textBox}>Pressure: {data?.main?.pressure} hPa</Text>
                </View>
                <View style={styles.statBox}>
                <Image  source={require('../images/humidity.png')} />
                <Text style={styles.textBox}>Humidity : {data?.main?.humidity}%</Text>
                </View>
           
            
                <View style={styles.statBox}>
                <Image  source={require('../images/wind.png')} />
                <Text style={styles.textBox}>Wind : {data?.wind?.speed} km/h</Text>
                </View>
                
                </View> 
        </View>
        
 
    
  <View style={styles.hourlyBox}>
    <View style={{flex:1}}>
    <Text style={styles.forecast}>See 3 hour forecasts data</Text>
    <Text style={styles.forecast}>Plan for the next 5 days</Text>
    </View>
  </View>
  <View >
  {loadingWeekWeather ? (<DotIndicator color='white' size={10} />) : (
    <FlatList 
    showsHorizontalScrollIndicator={false}
    data={weekWeather}
    renderItem={({item,index})=>{
    return(
    <View style={styles.flex}>
        
      <View style={ styles.weather1Box}>
        <View style={{flexDirection:'row'}}>
        <Image style={styles.weatherIcon} source={{uri:`http://openweathermap.org/img/w/${item?.weather[0]?.icon}.png`}}/>
        <View style={{flexDirection:'column'}}>
        <Text style={styles.dateBox}>{new Date(item?.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
        <Text style={styles.dateBox}>{new Date(item?.dt_txt).toDateString()}</Text>
        <Text style={styles.tempBox}>{item?.main?.temp}°C</Text>
        <Text style={[styles.tempBox,{fontSize: 16}]}>{item?.weather[0]?.description}</Text>
      </View> 
      </View>
      </View>
    </View> 
 )
}}/>
)}
  </View>
  </View>
  
   </ImageBackground>
</View>

    )
}

export default Home

const styles = StyleSheet.create({
    overlay: {flex: 1,padding: 20},
    searchBox: {flexDirection: 'row',alignItems: 'center'},
    inputBox: {color:'white', flex: 1, backgroundColor: '#016ca1', borderColor:'white', borderRadius: 10, padding: 10,borderWidth:1 },
    buttonBox: {backgroundColor: '#016ca1',borderRadius: 10,padding: 10,marginLeft: 10 },
    searchText: {color: 'white'},
    weatherBox: {alignItems: 'center',backgroundColor:'#6cb1d2',borderRadius:10},
    cityName: {fontSize: 30, color: '#094b6b',fontWeight:'bold',opacity:1.5 },
    infoBox: {alignItems: 'center',justifyContent: 'center',marginVertical: 20},
    weatherIcon: { height:100,width:100},
    tempContainer: {justifyContent: 'center', alignItems: 'center', marginLeft: 20 },
    iconsBox:{backgroundColor:'#c1dde7',width:50,height:60,borderRadius:10,justifyContent:'center',alignItems:'center',marginBottom:5},
    descriptionBox: {fontSize: 18, color: '#094b6b',opacity:1.5},
    additionalInfo: {color: '#094b6b',fontSize: 18,fontWeight:'500',textAlign: 'center' },
    statsContainer: {justifyContent: 'center',backgroundColor:'#c1dde7',borderRadius:5,margin:5,opacity:0.7},
    statBox: {flexDirection:'row',alignItems: 'center' },
    iconBox: {marginRight: 10 },
    textBox: {color: '#094b6b',fontSize: 18,fontWeight:'500',opacity:1},
    weather1Box:{padding: 10,marginBottom:5,margin:5,backgroundColor: '#c1dde7',borderRadius: 10,opacity:0.7},
    dateBox:{ fontSize: 18, color: '#094b6b',fontWeight:'500',opacity:1.5},
    tempBox:{ fontSize: 24, color: '#094b6b',fontWeight:'500',opacity:1.5},
    forecast:{color: '#094b6b',fontSize: 16,opacity:1.5},
    flex:{flex:1,borderRadius:5},
    hourlyBox:{flexDirection: 'row',alignItems: 'center',backgroundColor: '#c1dde7',padding: 10,borderRadius: 20,margin:3,opacity:0.8},
    justment:{alignItems:'center',justifyContent:'center'},
    bgBox:{flex: 1,justifyContent: 'center'}

});
