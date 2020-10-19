import { Text, StyleSheet, View, Picker, FlatList, SafeAreaView, ScrollView ,TouchableOpacity} from "react-native";
import React, { useState, Component, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';
import * as font from 'expo-font';
import { createStackNavigator } from 'react-navigation-stack';
import UserDetails from '../Details/UserDetails'





const SearchItems = props => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        })
  }, [])


    return (

        <View style={styles.mainContainer}>

            <FlatList
                data={props.searchResults}
                keyExtractor={item => item.Uid}
                renderItem={({ item }) => {

                    if(item.avatar == 0) {
                    console.log(item)
                    return (
                      
               
                     <TouchableOpacity  onPress={()=> props.navigation.navigation.navigation.navigate('UserDetails',{
                        uid:item.Uid
                    })}>
                        <View style={styles.secondContainer}>
                            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                                <ScrollView style={styles.scrollView}>
                                    <View style={styles.mainContainerOutput}>
                                        <View style={styles.Image}>
                                            <Image
                                                style={styles.tinyLogo}
                                                source={{ uri: item.Picture[0] }}
                                                style={{ width: 100, height: 100 }}
                                            />
                                        </View>
                                        <View style={styles.textContainer}>
                                            <Text style={{ fontFamily: 'Montserrat-ExtraLight' }}>{item.name} {item.uid}</Text>
                                            <Text style={styles.elipsText} numberOfLines = { 2} ><Text style={{ fontFamily: 'Cairo-Bold' }}>Activity :</Text>{item.Activities}</Text>
                                        </View>
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                        </TouchableOpacity>

                    )
                }
                }}
            />
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
        borderWidth: 1,
        marginVertical: 20,
        borderRadius:3
    },
    textContainer: {
        marginHorizontal: 10
    },
    elipsText:
    { fontFamily: 'Montserrat-ExtraLight', color: 'black', fontSize: 15 ,marginRight:110}


});

export default SearchItems