import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView ,TouchableOpacity} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { AsyncStorage } from 'react-native';
import Http from '../../Api/Http'
import Moment from 'moment';


const Chats = (props) => {


    return (
        <View style={styles.mainContainer}>




            <View style={styles.secondContainer}>

                <FlatList
                    data={props.chatmessage}
                    keyExtractor={item => item.thread_id}
                    renderItem={({ item }) => {
                        const PictureUrl = "https://gowebtutorial.com/sites/default/files/" + item.picture.filename
                
                       //Time Stamp to Date
                        var t = new Date();
                        t.setSeconds( item.time );
                        const formatted =  Moment(t).format('DD MMMM')
                        
                        
              
                        return (
                            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                                <ScrollView style={styles.scrollView}>
                                    <TouchableOpacity onPress={() => props.navigation.navigation.navigate('Personalchat',{
                                        threadId:item.thread_id,
                                        Name:item.name,
                                        picture:PictureUrl,
                                        Uid:item.uid
                                    })}>
                                    <View style={styles.mainContainerOutput}>

                                        <View style={styles.Image}>

                                            <Image
                                                style={styles.tinyLogo}
                                                source={{ uri: PictureUrl }}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={{ fontFamily: 'Cairo-Bold' }}>{item.name}</Text>
                                            <Text style={{ fontFamily: 'Montserrat-ExtraLight', color: 'black', fontSize: 15,width: 100 }} numberOfLines = {1}>{item.subject}</Text>
                                        </View>
                                        <View style={styles.textContainerTime}>
                                            <Text style={{ fontFamily: 'Cairo-Bold' }}>{formatted}</Text>
                                        </View>

                                    </View>
                                    </TouchableOpacity>
                                </ScrollView>
                            </SafeAreaView>

                        )

                    }}
                />


            </View>








        </View>

    )




}
const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: 'white',
        flex: 1
    },


    container: {

        marginBottom: 10,
        backgroundColor: "white"
    },
    mainHeading:
    {
        marginHorizontal: 10,
        marginVertical: 10,
        fontSize: 23,
        fontFamily: 'Cairo-Bold'
    },
    secondContainer: {
        flex: 2,
        marginHorizontal: 10,
    },

    mainContainerOutput: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20
    },
    textContainer: {
        marginHorizontal: 10
    },
    tinyLogo: {
        width: 60, height: 60, borderRadius: 40
    },
    textContainerTime: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flex: 1
    }


});

export default Chats 