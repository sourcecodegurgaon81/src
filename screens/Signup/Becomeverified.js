import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View ,TextInput} from "react-native";
import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import Http from '../../Api/Http'
import axios from 'axios';
import * as font from 'expo-font';
import APIKit, { setClientToken } from '../../Api/APIKit'
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';
import { Overlay } from 'react-native-elements';
import Moment from 'moment';




const Becomeverified = (props) => {
    const [spinner, setspinner] = useState(false)


    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        becomeCerified()
    }, [])


    const becomeCerified = () =>{
        AsyncStorage.getItem('Token', (err, result) => {
        const LogoutToken = JSON.parse(result)
        if(LogoutToken.data.user.field_trial_period_start_date.length == undefined) 
    {
        var msDiff =  new Date().getTime() - new Date(LogoutToken.data.user.field_trial_period_start_date.und[0].value).getTime();    //Future date - current date
    }
        var daysTill30June2035 = Math.floor(msDiff / (1000 * 60 * 60 * 24));
      
         if(daysTill30June2035 > 8)
         {
            props.navigation.navigate('Tabs')
        }
         else
         {
            props.navigation.navigate('FindFriends')
         }
        });
      }



      const sevenDaysTrail = () =>{
        AsyncStorage.getItem('Token', (err, result) => {
            setspinner(true)
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            const newDate = new Date()
       

            Http.put('user/' + userId, {
                field_trial_period_start_date: {
                    und: [
                        {
                            value: newDate
                        }
                    ]
                },

                
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
                props.navigation.navigate('FindFriends')
            })


        })


    
      }
   

    return (

        <View style={{ flex: 1,backgroundColor:"white" }}>
       <Spinner
                visible={spinner}
                textContent={'Updating...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.secondContainer}>

                <Text style={styles.alignTextContainer}>
                    We are happy to see you again
                    and can’t wait to help you find
                    friends! I see this is the first time
                    you have logged in to the app.
               </Text>



                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10}}
                    title="Free 7 Days Trial"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                    onPress={sevenDaysTrail}
                />
                <Text style={styles.alignTextContainerButton}>(No card required)</Text>
                <View>
                    <Text style={styles.alignTextContainerTwo}>Become a verified member
                    now for ad-free app usage,
                    unlimited instant messages,
                    and enhanced search</Text>


                    <Button
                        containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                        title="Become Verified"
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        onPress={()=> props.navigation.navigate('TrialOver')}
                    
                    />


                    <Text style={styles.alignTextContainerthree}>No Thanks! I am happy to
                    stay a basic member. Take
                    me to the free web version at
          www.not4dating.com.</Text>

                </View>




            </View>

        </View>







    )

}

const styles = StyleSheet.create({

    secondContainer: {
        flex: 2,
        justifyContent: "center",
        marginHorizontal: 15,
        textAlign: "center"
    },
    alignTextContainer:
    {
        textAlign: "center",
        fontSize: 18,
        fontFamily: 'Montserrat-ExtraLight'
    },
    alignTextContainerButton: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: 'Montserrat-ExtraLight',
    },
    alignTextContainerTwo: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: 'Montserrat-ExtraLight',
        marginTop: 25
    },
    alignTextContainerthree: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: 'Montserrat-ExtraLight',
        marginTop: 40
    }
})
export default Becomeverified