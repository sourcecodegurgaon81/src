import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, View, TouchableHighlight, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import { Button, Overlay } from 'react-native-elements';

import { Tooltip, Input } from 'react-native-elements';
import { CheckBox } from 'react-native-elements'
import * as font from 'expo-font';



const Useroption = () => {
    useEffect(() => {

            font.loadAsync({
                'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
            });
        

    }, [])
    return (
        <View style={styles.mainContainer}>

            <SafeAreaView style={styles.secondMainCotainer}>
                <TouchableOpacity style={styles.imageContainer}>
                    <Image style={styles.Image} source={require('../../assets/Images/cross.png')} />
                </TouchableOpacity>
                <ScrollView>

                   
                </ScrollView>
            </SafeAreaView>



        </View>
    )



}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1, backgroundColor: "#08080885",

    },
    secondMainCotainer:
    {
        justifyContent: "space-around",
        backgroundColor: "white",
        justifyContent: "center",
        flex: 2,
        marginHorizontal: 30,
        marginVertical: 30

    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    thirdContainer: {
        marginHorizontal: 20
    },
    upperHeading: {
        fontSize: 18,
        marginHorizontal: 16,
        marginVertical: 10,
        fontFamily: 'Cairo-Bold'
    },
    buttonstyle: {
        marginHorizontal: 20
    },
    bottomText: {
        textAlign: "center",
        fontFamily: 'Cairo-Bold',
        color: "red",
        fontSize: 16
    },
    Image:
    {
        width: 20,
        height: 20,
    },
    imageContainer:
    {

        alignItems: "flex-end",
        marginHorizontal: 10, marginVertical: 10
    }



})


export default Useroption