import React ,{useEffect ,useState} from "react";
import { Text, StyleSheet, View ,SafeAreaView, ScrollView } from "react-native";

import { Button } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';



const HomeScreen = props => {

  useEffect(() => {
    font.loadAsync({
      'Cairo-Bold':{uri: require('../../../assets/fonts/Cairo-Bold.ttf')},
        });
        AsyncStorage.getItem('Token', (err, result) => {
          const LogoutToken = JSON.parse(result)
          if(LogoutToken != null)
          {
            props.navigation.navigate('FindFriends')
          }
        })
      }, [])

    
  return (

 
    <View style={styles.mainTextContainer}>



      <View style={styles.mainTextContainerTwo}>
        <Text style={styles.text}>Welcome!</Text>
        <Text style={styles.textTwo}>We can help you make platonic connections in your local area.</Text>
        <Text style={styles.textTwo}>First, ONE BIG RULE:{"\n"}

Platonic = we will not help you
find a date or sexual partners. No
judgment if that is your goal, but
kindly save your energy and use another app.</Text>



        <Button 
        onPress ={() => props.navigation.navigate('Postcode')}
          containerStyle={{ marginHorizontal: 15, marginVertical: 15, height:50 ,borderRadius:10 }}
          buttonStyle = {{height:50}}
          title="Sounds Cool! Who can I meet"
          titleStyle={{fontSize:20}}
        />
        <Button 
        onPress ={() => props.navigation.navigate('SignUp')}
          buttonStyle={{ backgroundColor: "green",textAlign:"center",height:50,borderRadius:10  }}
              containerStyle={{ marginHorizontal: 15, marginVertical: 15}}
              titleStyle={{fontSize:20}}
          title="Awesome! Sign me up!"
        />

        <Text style={styles.textThree }  onPress ={() => props.navigation.navigate('SignIn')}>I am already a member</Text>
      </View>
    </View>

  )
  
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginVertical: 10,
    marginHorizontal: 15,


    

  },
  textTwo: {
    marginVertical: 10,
    marginHorizontal: 15,
    fontSize: 19,


  },
  textThree: {
    marginVertical: 10,
    marginHorizontal: 10,
    textAlign: "center",
    color: "green",
    fontSize: 20,
   

  },
  mainTextContainer: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor:"white"
  },
  mainTextContainerTwo: {
    justifyContent: "center",
    flex: 2
  }
});


export default HomeScreen;


