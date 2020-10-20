
import { Text, StyleSheet, View, Picker, FlatList, TextInput } from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component, useEffect } from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";
import * as font from 'expo-font';
import { Linking } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { AsyncStorage } from 'react-native';

const Searchpostcode = props => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [latitude, setLatitude] = useState(null)
    const [longitude, setLongitude] = useState(null)
    const [locationPostocde, setlocationPostocde] = useState(null)
    const [loactioncountry, setLocationCountry] = useState(null)
    const [spinner, setspinner] = useState(false)
    //OverLay 
    const [visible, setVisible] = useState(true);
    const [term, setTerm] = useState('')
    const [selectedValue, setSelectedValue] = useState("");

    const [locationOff, setLocationoff] = useState(false)


    const toggleOverlay = () => {
        setVisible(visible);
    };
    useEffect(() => {
        
        async function getKind() {
   
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf')
        });

        (async () => {
            setspinner(true)

            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                setspinner(false)
            }

            let location = await Location.getCurrentPositionAsync({});


            setLocationoff(false)
            const lat = location.coords.latitude
            const lng = location.coords.longitude
            setLongitude(lng)
            setLatitude(lat)
            fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + "," + lng + "&types;=postal_code" + '&key=AIzaSyBru6wNx3CwcvRbACg2G4-Cq7o6Lt4wOvI')
                .then(res => res.json())
                .then(json => {

                    const addressData = json

                    const address = addressData.results[0].address_components;

                    for (var i = 0; i < address.length; i++) {
                        if (address[i].types.includes("postal_code")) {
                            const postcode = address[i].long_name;
                            AsyncStorage.setItem('Postcode',JSON.stringify(postcode))
                            setTerm(postcode)
                        }


                        if (address[i].types.includes("country")) {
                            const country = address[i].long_name;
                            setLocationCountry(address[i].long_name)
                            if (country == "Australia") {
                                setLocationCountry('au')
                            }
                            if (country == "Canada") {
                                setLocationCountry('ca')
                            }
                            if (country == "India") {
                                setLocationCountry('in')
                            }
                            if (country == "New Zealand") {
                                setLocationCountry('nz')


                            }
                            if (country == "Singapore") {
                                setLocationCountry('sg')


                            }
                            if (country == "United Kingdom") {
                                setLocationCountry('uk')


                            }
                            if (country == "United States") {
                                setLocationCountry('us')
                            }

                            AsyncStorage.setItem('country',JSON.stringify(country))
                        }

                    }
                  
                    postcountryCode()
                        setspinner(false)
                        //props.navigation.navigate('WelcomeResult', { term, selectedValue })
                
                });





        })();
    }

        getKind();
    }, [])


    const postcountryCode = () =>{
        AsyncStorage.getItem('Postcode', (err, result) => {
            const postcode = JSON.parse(result)
            AsyncStorage.getItem('country', (err, results) => {
                const country= JSON.parse(results)

        


            if (country == "Australia") {
                   const countrys ='au'
                   props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "Canada") {
                 const countrys='ca'
                 props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "India") {
                   const countrys ='in'
                   props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "New Zealand") {
                    const countrys ='nz'
                    props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })


            }
            if (country == "Singapore") {
                    const countrys ='sg'

                    props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "United Kingdom") {
                  const countrys='uk'

                  props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })

            }
            if (country == "United States") {
                const countrys ='us'
            
              props.navigation.navigate('WelcomeResult', { term:postcode, selectedValue:countrys })
            }



            })
        })
 
    }

    // Geetting SearchResult
    const [searchPostcode, setserachPostocde] = useState([])





    return (
        //Html
        <View style={styles.MainBackground}>
            <Spinner
                visible={spinner}
                textContent={'Fetching...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View style={styles.SecondMainBackground}>
                <Text style={styles.upperText}>Oops! Looks like we have not yet expanded to your area.
       <Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com')}>Click here </Text>to suggest that we come to you next</Text>



                <View style={{ marginHorizontal: 15, marginVertical: 10 }}>
                    <TextInput placeholder='Postcode' value={term} onChangeText={newValue => setTerm(newValue)} style={{ borderWidth: 1, paddingHorizontal: 8, height: 40, borderRadius: 5 }} />
                </View>


                <View style={styles.FieldContainer}>

                    <DropDownPicker
                        items={[
                            { label: 'Australia', value: 'au' },
                            { label: 'Canada', value: 'ca' },
                            { label: 'India', value: 'in' },
                            { label: 'New Zealand', value: 'nz' },
                            { label: 'Singapore', value: 'sg' },
                            { label: 'United Kingdom', value: 'uk' },
                            { label: 'United States', value: 'us' },
                        ]}
                        defaultIndex={0}
                        containerStyle={styles.DropDown}
                        labelStyle={styles.dropDownActive}
                        activeItemStyle={styles.dropDownActive}
                        dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                        onChangeItem={items => setSelectedValue(items.value)}
                        value={selectedValue}


                    />

                </View>

                <Text style={styles.upperText}>Don’t see your country?<Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com')}> Click here</Text> to tell us where to expand next.</Text>

                <Button containerStyle={{ marginHorizontal: 30, marginVertical: 30 }}
                    titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                    underlineColor="transparent"
                    inputContainerStyle={{ borderWidth: "none" }}
                    buttonStyle={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}
                    title="Search"
                    onPress={() => props.navigation.navigate('WelcomeResult', {
                        term, selectedValue
                    })} />

            </View>





        </View>





    );

};





const styles = StyleSheet.create({
    MainBackground: {
        backgroundColor: "#08080885",
        flex: 1,
        justifyContent: "center"
    },
    SecondMainBackground: {
        backgroundColor: "white",
        marginVertical: 20,
        marginHorizontal: 20,
        marginTop: 50,
        justifyContent: "center"
    },
    upperText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 23,
        fontFamily: 'Cairo-Bold',
        lineHeight: 30

    },
    lowerText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'Cairo-Bold',
    },
    container: {
        alignItems: "center",
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical: 20
    },
    FieldContainer: {
        marginVertical: 10,
        zIndex: 200,
        borderRadius: 5
    },
    DropDown: {
        height: 40,
        zIndex: 2,
        borderWidth: 1,
        marginHorizontal: 15,
        borderRadius: 5

    },

});

export default Searchpostcode