import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';



const Tophobbies = () => {
    const [activityValue, setactivityValue] = useState("");
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
    }, [])


    return (
        <View style={styles.mainContainer}>

            <View style={styles.secondContainer}>
                <View>
                    <Text style={styles.upperText}> Hello! Would you like to add your hobbies and interests to your profile to improve your results?</Text>
                  
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Top 3 Activities/Interes</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={activityValue}
                                style={{ height: 35, width: "100%" }}
                                value={activityValue}
                                onValueChange={itemValue => setactivityValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="playdates (parents and children)" value="playdates (parents and children)" />
                                <Picker.Item label="happy hour/cocktails/beers" value="happy hour/cocktails/beers" />
                                <Picker.Item label="sightseeing" value="sightseeing" />
                                <Picker.Item label="artsy stuff (making or looking at)" value="artsy stuff (making or looking at)" />
                                <Picker.Item label="cooking" value="cooking" />
                                <Picker.Item label="dancing" value="dancing" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="yoga" value="yoga" />

                                {/* <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" /> */}
                            </Picker>
                        </View>
                    </View>




                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Other Activities/Interest</Text>
                        <View style={styles.iAmContainer}>
                            <Picker
                                selectedValue={activityValue}
                                style={{ height: 35, width: "100%" }}
                                value={activityValue}
                                onValueChange={itemValue => setactivityValue(itemValue)}
                                label="I live in">
                                <Picker.Item label="playdates (parents and children)" value="playdates (parents and children)" />
                                <Picker.Item label="happy hour/cocktails/beers" value="happy hour/cocktails/beers" />
                                <Picker.Item label="sightseeing" value="sightseeing" />
                                <Picker.Item label="artsy stuff (making or looking at)" value="artsy stuff (making or looking at)" />
                                <Picker.Item label="cooking" value="cooking" />
                                <Picker.Item label="dancing" value="dancing" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="yoga" value="yoga" />

                                {/* <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" />
                                <Picker.Item label="people watching" value="people watching" /> */}
                            </Picker>
                        </View>
                    </View>


                </View>
                <View>
                    <View style={{marginVertical:20}}>
                        <Button title="Continue"
                            containerStyle={{marginVertical:10}}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, height: 50, fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }} />
                    </View>
                </View>
                <View>
                

      <Text style={styles.upperText}>Don’t ask me this again</Text>
                </View>





            </View>

        </View>




    )

}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1
    },
    secondMainCotainer:
    {
        flex: 2,
        backgroundColor: "white",
        justifyContent: "center",

    },
    forgotPass: {

        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    upperText:
    {
        fontFamily: "Montserrat-ExtraLight",
        fontSize: 20,
        textAlign: "center",
        marginVertical: 20,
        marginHorizontal:20

    },
    secondContainer:{
        justifyContent:"center",
        flex:2
    },
    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat-ExtraLight',
        fontSize: 16
    },
    mainContainerPicker:
    {
        marginVertical: 8
    },
    overflowContainer:
    {
        justifyContent: "center",
        marginHorizontal: 10,
        borderWidth: 1,
        borderRadius: 5,
        maxHeight: 80,
        overflow: "hidden"

    },


})

export default Tophobbies