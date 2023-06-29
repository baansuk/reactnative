import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';

const { width:SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [day, setDay] = useState();
  const [city, setCity] = useState();
  const [district, setDistrict] = useState();
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if(!granted) {
      setOk(false);
    }
    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps: false});
    setCity(location[0].city);
    setDistrict(location[0].district);
    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=5fb68538c2c3f380eba0909bc9d31e91`)
    const json = await response.json();
    setDay(json.daily);
    console.log(json);
  };

  useEffect(()=> {
    getWeather();
  },[]);

  return ( 
    <View style={styles.container}>

      <View style={styles.city}>
        {city ? <Text style={styles.cityName}>{city}</Text> :
         <ActivityIndicator size='large' color='black'/>       
        }
        <Text style={styles.districtName}>{district}</Text>
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} pagingEnabled horizontal contentContainerStyle={styles.weather}>
        {day.length === 0 ? (
          <ActivityIndicator size='large' color='black'/> 
        ): day.map((d, idx) => {
            <View style={styles.day}>
              <Text style={styles.temp}>{d.temp.day}</Text>
              <Text style={styles.description}>{d.weather[0].main}</Text>
            </View>
          }

        )}

      </ScrollView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 50,
    flex:1,
    borderBottomWidth: 3,
    margin: 20,
    width: '100%'
  },

  cityName: {
    fontSize: 50,
    fontWeight: '900'
  },
  districtName: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 15
  },
  weather: {
  },
  day: {
    width: SCREEN_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  temp: {
    fontWeight: '700',
    fontSize: 130,
  },
  description: {
    marginTop: -10,
    fontSize: 40,
  },
});
