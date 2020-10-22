import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, TextInput } from "react-native";
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

const TrialOver = props => {
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    })

    return (
        <View style={styles.MainContainer}>
            <View style={styles.SecondMainContainer}>
                <Text style={styles.TopText}>Your trail ended,please subscribe continue using our app services.</Text>
                <Button title="Become Verified "
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo-Bold' }}
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                    containerStyle={{ width: "100%" }} />
                <Text style={styles.BelowText} onPress={() => Linking.openURL('https://not4dating.com/')}>No Thanks! I am happy to
                stay a basic member. Take
                me to the free web version at
                www.not4dating.com.</Text>
            </View>

        </View>
    )



}
const styles = StyleSheet.create({

    BelowText: {
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 18,
        textAlign: "center",
        marginVertical: 15,

    },
    TopText: {
        fontFamily: "Cairo-Bold",
        textAlign: "center",
        textAlign: "center",
        fontSize: 19,
        marginVertical: 15
    },
    MainContainer: {
        flex: 1,
        backgroundColor: "white"
    },
    SecondMainContainer: {
        flex: 2,
        backgroundColor: "white",
        justifyContent: "center",
        marginHorizontal: 20
    }




})
export default TrialOver