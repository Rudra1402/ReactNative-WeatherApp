import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput, TouchableOpacity, Switch, Platform } from 'react-native';
import { useState, useEffect } from 'react'
import axios from 'axios';

export default function App() {

  // 5d2e559182ee498080c119e7f1798b55

  const [weaObj, setWeather] = useState({})
  const [loading, setLoading] = useState(true)
  const [city, setCity] = useState('')
  const [darkMode, setDarkMode] = useState(true)

  const AQI = (n) => {
    if (n >= 0 && n <= 50)
      return "AQI - " + n + "\nAQI Level - Good\nAir quality poses little to no health risk."
    else if (n >= 51 && n <= 100)
      return "AQI - " + n + "\nAQI Level - Moderate\nDue to the risk of respiratory illness symptoms, sensitive groups should greatly reduce outdoor exercise."
    else if (n >= 101 && n <= 150)
      return "AQI - " + n + "\nAQI Level - Unhealthy for Sensitive Groups\nEveryone is at risk for eye, skin, and throat irritation as well as respiratory problems. The public should greatly reduce outdoor exertion."
    else if (n >= 151 && n <= 200)
      return "AQI - " + n + "\nAQI Level - Unhealthy\nAn increased likelihood of heart and lung aggravation as well as health impacts among the public, particularly for sensitive groups."
    else if (n >= 201 && n <= 300)
      return "AQI - " + n + "\nAQI Level - Very Unhealthy\nThe public will be noticeably affected. Sensitive groups will experience reduced endurance in activities. These individuals should remain indoors and limit activities."
    else
      return "AQI - " + n + "\nAQI Level - Hazardous\nEveryone is at high risk of experiencing strong irritation and negative health effects that could trigger cardiovascular and respiratory illnesses."
  }

  const toggleSwitch = () => setDarkMode(previousState => !previousState)

  const fetchWeather = async (str) => {
    if (str !== "") {
      setLoading(true)
      const api_url = `https://api.weatherbit.io/v2.0/current?city=${str}&key=f6d6df03de94428e861aaa9dd210b2cc&include=minutely`
      await axios.get(api_url)
        .then(res => {
          setWeather(res.data)
          setLoading(false)
        })
      setCity('')
    }
  }

  useEffect(() => {
    fetchWeather('vadodara')
  }, [])

  return (
    <SafeAreaView style={[styles.container, darkMode && { backgroundColor: "#123456" }]}>
      {loading ? <Text style={[{ fontSize: 24 }, darkMode ? { color: "#fff" } : { color: "#212529" }]}>Loading...</Text> : <View style={styles.weatherContainer}>
        <Text style={[styles.title, darkMode && { color: "#fff" }]}>Weather App</Text>
        <View style={[styles.searchContainer, darkMode && { borderColor: "#fff" }]}>
          <TextInput
            style={[styles.input, darkMode && { color: "#fff" }]}
            value={city}
            onChangeText={setCity}
            onSubmitEditing={() => fetchWeather(city)}
            placeholder='city'
            placeholderTextColor={darkMode ? '#fff8' : '#0005'}
          />
          <TouchableOpacity style={[styles.button, darkMode && { borderColor: "#fff" }]} onPress={() => fetchWeather(city)}>
            <Text style={[styles.btnText, darkMode && { color: "#fff" }]}>Submit</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.imgContainer, darkMode && { borderColor: "#fff" }]}>
          <Image
            source={{
              uri: `https://www.weatherbit.io/static/img/icons/${weaObj.data[0].weather.icon}.png`
            }}
            style={styles.img}
          />
        </View>
        <View style={[styles.weatherData, darkMode && { borderColor: "#fff" }]}>
          <View style={{ width: "50%" }}>
            <Text style={[styles.weatherLeft, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>
              City&nbsp;&nbsp;&nbsp;/
            </Text>
            <Text style={[styles.weatherLeft, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>
              Temperature&nbsp;&nbsp;&nbsp;/
            </Text>
            <Text style={[styles.weatherLeft, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>
              Latitude&nbsp;&nbsp;&nbsp;/
            </Text>
            <Text style={[styles.weatherLeft, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>
              Longitude&nbsp;&nbsp;&nbsp;/
            </Text>
            <Text style={[styles.weatherLeft, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>
              Description&nbsp;&nbsp;&nbsp;/
            </Text>
          </View>
          <View style={{ width: "50%" }}>
            <Text style={[styles.weatherRight, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>&nbsp;&nbsp;&nbsp;{weaObj.data[0].city_name}</Text>
            <Text style={[styles.weatherRight, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>&nbsp;&nbsp;&nbsp;{weaObj.data[0].temp} °C</Text>
            <Text style={[styles.weatherRight, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>&nbsp;&nbsp;&nbsp;{weaObj.data[0].lat.toFixed(4)}</Text>
            <Text style={[styles.weatherRight, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>&nbsp;&nbsp;&nbsp;{weaObj.data[0].lon.toFixed(4)}</Text>
            <Text style={[styles.weatherRight, styles.weatherTextCommon, darkMode && { color: "#fff" }]}>&nbsp;&nbsp;&nbsp;{weaObj.data[0].weather.description}</Text>
          </View>
        </View>
        <Text style={[styles.aqi, darkMode && { borderColor: "#fff", color: "#fff" }]} onPress={() => alert(AQI(weaObj.data[0].aqi))}>Air Quality Index&nbsp;-&nbsp;{weaObj.data[0].aqi}</Text>
        <View style={{ display: "flex", alignItems: "flex-end" }}>
          <Switch
            trackColor={{ false: "lightblue", true: "lightblue" }}
            thumbColor={darkMode ? "#123456" : "#f4f3f4"}
            ios_backgroundColor="#123456"
            onValueChange={toggleSwitch}
            value={darkMode}
          />
        </View>
      </View>
      }
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  title: {
    fontSize: 36,
    marginBottom: 20,
    color: "#123456",
    textAlign: "center"
  },
  weatherContainer: {
    display: 'flex',
    // alignItems: "center"
  },
  weatherData: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#212529",
    borderRadius: 8,
    padding: 20
  },
  weatherTextCommon: {
    color: "#212529",
    fontSize: 18,
    marginVertical: 5,
    paddingVertical: 5
  },
  weatherLeft: {
    textAlign: "right",
  },
  weatherRight: {
    textAlign: "left",
  },
  imgContainer: {
    borderWidth: 1,
    borderColor: "#212529",
    borderRadius: 8,
    marginBottom: 20,
    padding: 15,
    display: "flex",
    alignItems: "center"
  },
  img: {
    width: "90%",
    height: 150,
    width: 150
  },
  searchContainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#212529",
    borderRadius: 8,
    marginBottom: 20,
    padding: 10
  },
  input: {
    width: "80%",
    height: 40,
    fontSize: 18,
  },
  button: {
    width: "20%",
    height: 40,
    borderWidth: 1,
    borderColor: "#212529",
    borderRadius: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#000c"
  },
  aqi: {
    textAlign: "center",
    fontSize: 20,
    color: "#212529",
    marginVertical: 20,
    padding: 15,
    borderWidth: 1,
    borderColor: "#212529",
    borderRadius: 8,
  }
});
