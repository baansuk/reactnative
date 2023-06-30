import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const icons: Record<string, string> = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

interface WeatherData {
  temp: { day: number };
  weather: { main: string; description: string }[];
}

interface LocationData {
  city: string;
  district: string;
}

export default function App(): JSX.Element {
  const [day, setDay] = useState<WeatherData[]>([]);
  const [city, setCity] = useState<string | undefined>();
  const [district, setDistrict] = useState<string | undefined>();
  const [ok, setOk] = useState<boolean>(true);

  const getWeather = async (): Promise<void> => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });
    setCity(location[0]?.city);
    setDistrict(location[0]?.district);

    const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&appid=5fb68538c2c3f380eba0909bc9d31e91&units=metric`);
    const json = await response.json();
    setDay(json?.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        {city ? (
          <Text style={styles.cityName}>{city}</Text>
        ) : (
          <ActivityIndicator size='large' color='black' />
        )}
        <Text style={styles.districtName}>{district}</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        contentContainerStyle={styles.weather}
      >
        {day.length === 0 ? (
          <View style={styles.dayIndicator}>
            <ActivityIndicator size='large' color='black' />
          </View>
        ) : (
          day.map((d, idx) => (
            <View style={styles.day} key={idx}>
              <Text style={styles.temp}>{parseFloat(d.temp.day).toFixed(1)}º</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Fontisto name={icons[d.weather[0].main]} size={32} color="black" />
                <Text style={styles.description}>{d.weather[0].main}</Text>
              </View>
              <Text style={styles.descriptionDetail}>{d.weather[0].description}</Text>
            </View>
          ))
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
    flex: 1,
    borderBottomWidth: 3,
    margin: 10,
    width: '100%',
  },
  cityName: {
    fontSize: 50,
    fontWeight: '900',
  },
  districtName: {
    fontSize: 30,
    fontWeight: '600',
    marginTop: 10,
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  dayIndicator: {
    width: SCREEN_WIDTH,
    marginTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  temp: {
    fontWeight: '700',
    fontSize: 100,
  },
  description: {
    marginTop: -10,
    paddingLeft: 10,
    fontSize: 40,
  },
  descriptionDetail: {
    fontSize: 20,
  },
});