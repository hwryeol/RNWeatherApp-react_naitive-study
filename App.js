import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.constainer}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
    </View>
      
  );
}

const styles = StyleSheet.create({
  constainer:{
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
    flex:1,
  },
  day:{
    flex: 1,
    alignItems:"center",
  },
  temp:{
    fontSize:178,
  },
  description:{
    marginTop:-40,
    fontSize: 60,
  }
})
