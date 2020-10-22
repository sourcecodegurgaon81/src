import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { Entypo } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';
import Http from '../../Api/Http'
import { AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
const Tophobbies = (props) => {
    const [selectedItems, setSelectedItems] = useState([]);

    const [otherActvities, setotherActvities] = useState([]);

    const [activityValue, setactivityValue] = useState("");

      //Spinner
      const [spinner ,setspinner] = useState(false)
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });


    }, [])
    // Dummy Data for the MutiSelect
    const items = [
        // name key is must. It is to show the text in front
        { id: 'yoga', name: 'yoga' },
        { id: 'playdates (parents and children)', name: 'playdates (parents and children)' },
        { id: 'happy hour/cocktails/beers', name: 'happy hour/cocktails/beers' },
        { id: 'sightseeing', name: 'sightseeing' },
        { id: 'artsy stuff (making or looking at)', name: 'artsy stuff (making or looking at)' },
        { id: 'cooking', name: 'cooking' },
        { id: 'dancing', name: 'dancing' },
        { id: 'people watching', name: 'people watching' },
        { id: 'traveling/vacations', name: 'traveling/vacations' },
        { id: 'history buff', name: 'history buff' },
        { id: 'board games', name: 'board games' },
        { id: 'sports (playing)', name: 'sports (playing)' },
        { id: "mom's/dad's night out w/o kids", name: "mom's/dad's night out w/o kids" },
        { id: 'outdoor activities', name: 'outdoor activities' },
        { id: 'dining out', name: 'dining out' },
        { id: 'concerts/shows', name: 'concerts/shows' },
        { id: 'sports (watching)', name: 'sports (watching)' },
        { id: 'shopping', name: 'shopping' },
        { id: 'video games', name: 'video games' },
        { id: 'photography', name: 'photography' },
        { id: 'animal lover/pet owner', name: 'animal lover/pet owner' },
        { id: 'crime/mystery reader', name: 'crime/mystery reader' },
        { id: 'chess', name: 'chess' },
    ];


    const onSelectedItemsChange = (selectedItems) => {
        // Set Selected Items
        setSelectedItems(selectedItems);
    };

    const onOtherActivitiesChange = (otherActvities) => {
        // Set Selected Items
        setotherActvities(otherActvities);
    };

    const SubmitDetails = () =>{
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail= JSON.parse(result)
            if(UserDetail != null)
            {
              Http.put('user/' + UserDetail.data.user.uid, {
                field_already_declared: {
                    und: [
                      {
                        value: "true",
                      },
                    ],
                  },
                  field_top3_activities: {
                    und: selectedItems,
                  },
                  field_activities_interests: {
                    und: otherActvities,
                  },


              },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
                props.navigation.navigate('Tabs')
            })
            }     
          }) 
   




    }

    const dontAskAgain = () =>{
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail= JSON.parse(result)
            if(UserDetail != null)
            {
              Http.put('user/' + UserDetail.data.user.uid, {
                field_already_declared: {
                    und: [
                      {
                        value: "true",
                      },
                    ],
                  },
                 
              },{ headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
              
                console.log(response)
                setspinner(false)
                             props.navigation.navigate('Tabs')

               
            })  
            }     
          }) 
   




    }

    return (
        <View style={styles.mainContainer}>
   <Spinner
          visible={spinner}
          textContent={'Updating...'}
          textStyle={styles.spinnerTextStyle}
        />
            <View style={styles.secondContainer}>
                <View>
                    <Text style={styles.upperText}> Hello! Would you like to add your hobbies and interests to your profile to improve your results?</Text>
                  
                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Top 3 Activities/Interes</Text>
                        <View style={styles.iAmContainer}>
                        <SafeAreaView>
                        <View >
                            <View  >

                                <MultiSelect
                                    hideTags
                                    items={items}
                                    uniqueKey="id"
                                    onSelectedItemsChange={onSelectedItemsChange}
                                    selectedItems={selectedItems}
                                    selectText="   Pick Activities"
                                    searchInputPlaceholderText="Search Items..."
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    fontFamily='Montserrat-ExtraLight'
                                    itemFontFamily='Montserrat-ExtraLight'
                                    selectedItemFontFamily='Montserrat-ExtraLight'
                                    selectedItemIconColor="black"
                                    selectedItemTextColor="black"
                                    submitButtonColor="#CCC"
                                    submitButtonText="Submit"
                                    styleSelectorContainer={{backgroundColor:"red"}}
                                    styleDropdownMenuSubsection={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                        </View>
                    </View>




                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>Other Activities/Interest</Text>
                        <View style={styles.iAmContainer}>
            
                        <View >
                            <View  >

                                <MultiSelect
                                    hideTags
                                    items={items}
                                    uniqueKey="id"
                                    //ref={(component) => { this.multiSelect = component }}
                                    onSelectedItemsChange={onOtherActivitiesChange}
                                    selectedItems={otherActvities}
                                    selectText="   Pick Activities"
                                    searchInputPlaceholderText="Search Items..."
                                    //onChangeInput={(text) => console.log(text)}
                                    //altFontFamily="ProximaNova-Light"
                                    tagRemoveIconColor="#CCC"
                                    tagBorderColor="#CCC"
                                    tagTextColor="#CCC"
                                    selectedItemTextColor="#CCC"
                                    selectedItemIconColor="#CCC"
                                    itemTextColor="#000"
                                    displayKey="name"
                                    fontFamily='Montserrat-ExtraLight'
                                    itemFontFamily='Montserrat-ExtraLight'
                                    selectedItemFontFamily='Montserrat-ExtraLight'
                                    selectedItemIconColor="black"
                                    selectedItemTextColor="black"
                                    submitButtonColor="#CCC"
                                    submitButtonText="Submit"
                                    styleDropdownMenuSubsection={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                                />
                            </View>
                        </View>
         
                    </View>
                    </View>

                </View>
                <View>
                    <View style={{marginVertical:20}}>
                        <Button title="Continue"
                            containerStyle={{marginVertical:10}}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10,fontFamily: 'Cairo-Bold' }}
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            containerStyle={{ width: "100%" }}
                            onPress= {SubmitDetails} />
                    </View>
                </View>
                <View>
                

      <Text style={styles.upperText} onPress={dontAskAgain}>Don’t ask me this again</Text>
                </View>





            </View>

        </View>




    )

}
const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        backgroundColor:"white"
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
        fontFamily: 'Montserrat-ExtraLight',
        borderRadius:5,
        paddingTop:3
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