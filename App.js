import * as Location from "expo-location";
import { ActivityIndicator, StyleSheet, Text, View, ScrollView,Dimensions } from "react-native";
import React,{ useEffect, useState } from 'react';
import {IonInput} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get('window').width
const {API_KEY} = require('./API_KEY.json')

export default function App() {
  const [location, setLocation] = useState(null);
  const [city,setCity] = useState();
  const [days,setDays] = useState([]);
  const [ok,setOk] = useState(true);
  const [errorMsg,setErrorMsg] = useState(null);
  const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Rain: "rains",
    Drizzle: "rain",
    Thunderstorm: "lightning",
  };
  const ask = async () => {
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if (!granted){
      setOk(false);
    }
    const {coords:{latitude,longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude,longitude})
    console.log(location[0].city);
    setCity(location[0].city);
    console.log(API_KEY)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_key}&units=metric`);
    const json = await response.json()
    setDays(json.daily);
    }
  useEffect(()=>{
    ask()
  },[])

  function printDate(dt){
    const date = new Date(parseInt(dt)*1000);
    return `${date.getMonth()+1}월 ${date.getDate()}일`
  }

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0? (
          <View style={styles.day}>
            <ActivityIndicator size="large" color="#00ff00" />
          </View>
        ):(
          
          days.map((day, index)=>(
            <View key={index} style={styles.day}>
              <Text style={styles.date}>{printDate(day.dt)}</Text>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <MaterialCommunityIcons name="temperature-celsius" size={50} color="black" />
              </View>
              <Fontisto
                  name={icons[day.weather[0].main]}
                  size={68}
                  color="black"
                />
              <Text style={styles.description}>
                {day.weather[0].main}
              </Text>
              <Text styles={styles.tinyText}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}

      </ScrollView>
    </View>
  );
}

  
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "orange"
  },
  city:{
    flex:0.5,
    justifyContent: "center",
    alignItems:"center"
  },
  cityName:{
    fontSize:48,
    fontWeight:"500",
  },
  weather:{
  },
  day:{
    width:SCREEN_WIDTH,
    alignItems:"center",
  },
  temp:{
    fontWeight:"600",
    fontSize:120,
  },
  description:{
    fontSize: 30,
  },
  tinyText:{
    fontSize:10,
  },
  date:{
    fontSize:30,
  }
})
