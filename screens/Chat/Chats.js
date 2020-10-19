import { Text, StyleSheet, View, Picker, FlatList , SafeAreaView, ScrollView} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'



const Chats = () => {
const [chat,chatMessages] = useState('')

    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        // AsyncStorage.getItem('Token', (err, result) => {
        //     const UserDetail = JSON.parse(result)

        //     Http.get('privatemsg/' , { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((responses) => {
        //         for (var i = 0; i < responses.data.length; i++) {
        //             for(const participants in responses.data[i].participants){
        //                 if (responses.data[i].participants[participants].uid != UserDetail.data.user.uid ) {
        //              // Add subject and time in participant object
        //              responses.data[i].participants[participants].subject = responses.data[i].subject;
        //              responses.data[i].participants[participants].time=responses.data[i].last_updated;
        //              responses.data[i].participants[participants].thread_id = responses.data[i].thread_id;
        //              chatMessages(responses.data[i].participants[participants])

        //                   } 
                      
                        

                    
        //             }

        //         }
        //           }) 
                 
             

        // })  
    }, [])
 

    return (
        <View style={styles.mainContainer}>
    

                 
                        <SafeAreaView style={{flex:1,backgroundColor:"white"}}>
                        <ScrollView style={styles.scrollView}>
           <View style={styles.secondContainer}>
                        <View style={styles.mainContainerOutput}>
                            <View style={styles.Image}>

                                <Image 
                                    style={styles.tinyLogo}    
                                    source={require('../../../assets/Images/p1.jpg')}/>
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>test</Text>
                                <Text style={{fontFamily:'Montserrat-ExtraLight',color:'black',fontSize:15}}>test</Text>
                            </View>
                            <View style={styles.textContainerTime}>
                                <Text style={{fontFamily:'Cairo-Bold'}}>15 June</Text>
                            </View>
                    
                        </View>
 
                   

   

            </View>
            </ScrollView>
                    </SafeAreaView>      
                 

           
 



        </View>

    )
    



}
const styles = StyleSheet.create({
    mainContainer: {
    backgroundColor:'white',
    flex:1
    },
  
  
    container:{
       
        marginBottom:10,
        backgroundColor:"white"
    },
    mainHeading:
    {
        marginHorizontal:10,
        marginVertical:10,
        fontSize:23,
        fontFamily:'Cairo-Bold'
    },
    secondContainer:{
flex:2,
    marginHorizontal:10,
    },
  
    mainContainerOutput:{
        flexDirection:"row",
        alignItems:"center",
        marginVertical:20
    },
    textContainer:{
        marginHorizontal:10
    },
    tinyLogo:{
        width: 60, height: 60,borderRadius:40 
    },
    textContainerTime:{
    justifyContent:"flex-end",
    alignItems:"flex-end",
   flex:1
    }


  });

export default Chats