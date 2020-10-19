import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";

import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';




const Becomeverified = () => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])

    return (

        <View style={{ flex: 1 }}>
     
            <View style={styles.secondContainer}>

                <Text style={styles.alignTextContainer}>
                    We are happy to see you again
                    and can’t wait to help you find
                    friends! I see this is the first time
                    you have logged in to the app.
    </Text>



                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                    title="Free 7 Days Trial"
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                />
                <Text style={styles.alignTextContainerButton}>(No card required)</Text>
                <View>
                    <Text style={styles.alignTextContainerTwo}>Become a verified member
                    now for ad-free app usage,
                    unlimited instant messages,
      and enhanced search</Text>


                    <Button
                        containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50 }}
                        title="Become Verified"
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
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