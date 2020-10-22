import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TextInput, FlatList } from "react-native";
import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';
import * as font from 'expo-font';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Textarea from 'react-native-textarea';
import Http from '../../Api/Http'
export const NetworkContext = React.createContext();
import Spinner from 'react-native-loading-spinner-overlay';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';

const FirstRoute = ({ navigation: { navigate } }) => {


    const [CountryValue, setCountry] = useState("");
    const [Postalcode, setPostal] = useState("")
    const [activityValue, setactivityValue] = useState("");
    const [liveValue, setliveValue] = useState("");
    const [talkValue, settalkValue] = useState("");
    const [FriendValue, setFriendValue] = useState("");
    const [CancelValue, setCancelValue] = useState("")
    const [StatusValue, setStatusValue] = useState("")
    const [KidsValue, setKidsValue] = useState("")
    const [PetValue, setPetValue] = useState("")
    const [daysvalue, setdays] = useState("")
    const [spaekvalue, setspeak] = useState("")




    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)


            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        setCountry(response.data.field_zip_code.und[0].country)
                        setPostal(response.data.field_zip_code.und[0].postal_code)

                        if (response.data.field_do_for_fun.length == undefined) {
                            setactivityValue(response.data.field_do_for_fun.und[0].value)
                        }
                        if (response.data.field_long_in_city.length == undefined) {
                            setliveValue(response.data.field_long_in_city.und[0].value)
                        }
                        if (response.data.field_talk_about.length == undefined) {
                            settalkValue(response.data.field_talk_about.und[0].value)
                        }

                        if (response.data.field_good_friend.length == undefined) {
                            setFriendValue(response.data.field_good_friend.und[0].value)
                        }

                        if (response.data.field_plans_get_cancelled.length == undefined) {
                            setCancelValue(response.data.field_plans_get_cancelled.und[0].value)
                        }

                        if (response.data.field_relationship_status.length == undefined) {
                            setStatusValue(response.data.field_relationship_status.und[0].value)
                        }

                        if (response.data.field_kids.length == undefined) {
                            setKidsValue(response.data.field_kids.und[0].value)
                        }


                        if (response.data.field_any_pets.length == undefined) {
                            setPetValue(response.data.field_spend_your_days.und[0].value)
                        }

                        if (response.data.field_spend_your_days.length == undefined) {
                            setdays(response.data.field_spend_your_days.und[0].value)
                        }
                        if (response.data.field_languages.length == undefined) {
                            setspeak(response.data.field_languages.und[0].value)
                        }

                    }
                })
            }




        })

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


const onSelectedItemsChange = (activityValue) => {
    // Set Selected Items
    setactivityValue(activityValue);
};

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View>
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={0.2} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>




                    <View style={styles.dropDownStyle}>
                        <Text style={styles.labelText}>What do you like to do for fun?</Text>
                        <View style={styles.iAmContainer} >

<MultiSelect
    hideTags
    items={items}
    uniqueKey="id"
    onSelectedItemsChange={onSelectedItemsChange}
    selectedItems={activityValue}
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
    styleSelectorContainer={{ backgroundColor: "red" }}
    styleDropdownMenuSubsection={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
/>
</View>

                    </View>



                    <View style={styles.seconddropDownStyle}>
                        <Text style={styles.labelText}>How long have you lived here?</Text>
                        <DropDownPicker
                            items={[
                                { label: '< 2 years', value: '0' },
                                { label: '2-5 years', value: '1' },
                                { label: '> 5 years', value: '2' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}

                            onChangeItem={items => setliveValue(items.value)}
                            defaultValue={liveValue}
                            defaultIndex={0}
                            value={liveValue}
                        />

                    </View>





                    <View style={styles.thirddropDownStyle}>
                        <Text style={styles.labelText}>My friends and I usually talk about</Text>
                      <DropDownPicker
                            items={[
                                { label: 'Work', value: 'Work' },
                                { label: 'Family', value: 'Family' },
                                { label: 'Relationships', value: 'Relationships' },
                                { label: 'Gossip', value: 'Gossip' },
                                { label: 'Fashion', value: 'Fashion' },
                                { label: 'Sports', value: 'Sports' },
                                { label: 'Other', value: 'Other' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => settalkValue(items.value)}
                            value={talkValue}
                            defaultValue={talkValue}

                        /> 

                    </View>



                    <View style={styles.fourthdropDownStyle}>
                        <Text style={styles.labelText}>A good friend is someone who..</Text>
                        <DropDownPicker
                            items={[
                                { label: 'is always there for me', value: 'is always there for me' },
                                { label: 'always sides with me no matter what.', value: 'always sides with me no matter what.' },
                                { label: 'Relationships', value: 'Relationships' },
                                { label: 'will be honest with me even if it hurts.', value: 'will be honest with me even if it hurts.' },
                                { label: 'gives advice', value: 'gives advice' },
                                { label: 'Fashion', value: 'Fashion' },
                                { label: 'takes my advice.', value: 'takes my advice.' },
                                { label: 'is an activity partner', value: 'is an activity partner' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setFriendValue(items.value)}
                            value={FriendValue}
                            defaultValue={FriendValue}
                        />

                    </View>



                    <View style={styles.fifthdropDownStyle}>
                        <Text style={styles.labelText}>When someone cancels plans we made</Text>
                        <DropDownPicker
                            items={[
                                { label:'It really bothers me and I am wary of the friendship.', value: 'It really bothers me and I am wary of the friendship.' },
                                 { label: 'My reaction depends on the reason why.', value: 'My reaction depends on the reason why.' },
                                 { label: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.',  value: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.' },
                                 { label: "Things happen – no big deal.", value: "Things happen – no big deal." },
                            ]}
                           
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setCancelValue(items.value)}
                            value={CancelValue}
                            defaultValue={CancelValue}
                        />

                    </View> 


                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={() => navigate('Second', {
                                liveValue: liveValue, talkValue: talkValue, FriendValue: FriendValue,
                                CancelValue: CancelValue, activityValue: activityValue
                            })}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        />
                    </View>



                </View>
            </ScrollView>
        </SafeAreaView>

    )
};

const SecondRoute = ({ navigation: { navigate }, route }) => {

    const firstRoute = route.params
    const [CountryValue, setCountry] = useState("");
    const [Postalcode, setPostal] = useState("")
    const [activityValue, setactivityValue] = useState("");
    const [liveValue, setliveValue] = useState("");
    const [talkValue, settalkValue] = useState("");
    const [FriendValue, setFriendValue] = useState("");
    const [CancelValue, setCancelValue] = useState("")
    const [StatusValue, setStatusValue] = useState()
    const [KidsValue, setKidsValue] = useState("")
    const [PetValue, setPetValue] = useState("")
    const [daysvalue, setdays] = useState("")
    const [spaekvalue, setspeak] = useState("")



    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)


            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        setCountry(response.data.field_zip_code.und[0].country)
                        setPostal(response.data.field_zip_code.und[0].postal_code)

                        if (response.data.field_do_for_fun.length == undefined) {
                            setactivityValue(response.data.field_do_for_fun.und[0].value)
                        }

                        if (response.data.field_long_in_city.length == undefined) {
                            setliveValue(response.data.field_long_in_city.und[0].value)
                        }


                        if (response.data.field_talk_about.length == undefined) {
                            settalkValue(response.data.field_talk_about.und[0].value)
                        }

                        if (response.data.field_good_friend.length == undefined) {
                            setFriendValue(response.data.field_good_friend.und[0].value)
                        }

                        if (response.data.field_plans_get_cancelled.length == undefined) {
                            setCancelValue(response.data.field_plans_get_cancelled.und[0].value)
                        }

                        if (response.data.field_relationship_status.length == undefined) {
                           if( response.data.field_relationship_status.und[0].value == "Married")
                           {
                            setStatusValue("Yes")

                           }
                           else if(response.data.field_relationship_status.und[0].value == "Co-habitating")
                           {
                            setStatusValue("Yes")
                           }
                           else if(response.data.field_relationship_status.und[0].value == "Significant Other But Not Living Together")
                           {
                            setStatusValue("No")
                           }
                           else if(response.data.field_relationship_status.und[0].value == "Divorced")
                           {
                            setStatusValue("No")
                           }
                           else if(response.data.field_relationship_status.und[0].value == "Widowed")
                           {
                            setStatusValue("No")
                           }
                           else if(response.data.field_relationship_status.und[0].value == "Engaged")
                           {
                            setStatusValue("Yes")
                           }
                           else if(response.data.field_relationship_status.und[0].value == "Single")
                           {
                            setStatusValue("No")
                           }
                        }

                        if (response.data.field_kids.length == undefined) {
                            setKidsValue(response.data.field_kids.und[0].value)
                        }


                        if (response.data.field_any_pets.length == undefined) {
                            setPetValue(response.data.field_spend_your_days.und[0].value)
                        }

                        if (response.data.field_spend_your_days.length == undefined) {
                            setdays(response.data.field_spend_your_days.und[0].value)
                        }
                        if (response.data.field_languages.length == undefined) {
                            setspeak(response.data.field_languages.und[0].value)
                        }

                    }
                })
            }




        })

    }, [])



    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View>
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>

                    <View style={styles.sixdropDownStyle}>
                        <Text style={styles.labelText}>Are you in a realtionship?</Text>
                        <DropDownPicker
                            items={[
                                { label:'Yes', value: 'Yes'},
                                { label:'No',  value: 'No'}
                            ]}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setStatusValue(items)}
                            value={StatusValue}
                            defaultValue={StatusValue}
                        />

                    </View>


                    <View style={styles.sevendropDownStyle}>
                        <Text style={styles.labelText}>Do you have kids?</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Yes', value: 'Yes' },
                                { label: 'No', value: 'No' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setKidsValue(items.value)}
                            value={KidsValue}
                            defaultValue={KidsValue}
                        />

                    </View>



                    <View style={styles.eightdropDownStyle}>
                        <Text style={styles.labelText}>Do you have pets?</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Dog', value: 'Dog' },
                                { label: 'Cat', value: 'Cat' },
                                { label: 'Rabbit', value: 'Rabbit' },
                                { label: 'Birds', value: 'Birds' },
                                { label: 'Fish', value: 'Fish' },
                                { label: 'Reptile', value: 'Reptile' },
                                { label: 'Other', value: 'Other' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setPetValue(items.value)}
                            value={PetValue}
                            defaultValue={PetValue}
                        />
                    </View>





                    {/*I spend my days code Container*/}

                    <View style={styles.TextAreaContainer}>
                        <View style={styles.FieldContainer}>
                            <Text style={styles.labelTextTextarea}>I spend my days..</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={text => setdays(text)}
                                maxLength={120}
                                value={daysvalue}
                                placeholder={'I spend my days'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>

                    {/*I also speak code Container*/}
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelText}>I also speak</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setspeak(text)}
                            value={spaekvalue}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={() => navigate('Third', {
                                StatusValue: StatusValue, KidsValue: KidsValue,
                                PetValue: PetValue, daysvalue: daysvalue, spaekvalue: spaekvalue, firstRoute: firstRoute
                            })}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={() => navigate('First')}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #4472C4", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#4472C4", borderRadius: 10 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}

                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
};



const ThirdRoute = ({ navigation: { navigate }, route }) => {

    const secondRoute = route.params
    const [smokeValue, setsmokeValue] = useState("");
    const [alcoholValue, setalcoholValue] = useState("");
    const [Booksvalue, setBooks] = useState("");
    const [Moviesvalue, setMovies] = useState("");
    const [TVvalue, setTV] = useState("");
    const [Musicvalue, setMusic] = useState("");




    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        if (response.data.field_smoke.length == undefined) {
                            setsmokeValue(response.data.field_smoke.und[0].value)
                        }
                        if (response.data.field_alcohol.length == undefined) {
                            setalcoholValue(response.data.field_alcohol.und[0].value)
                        }
                        if (response.data.field_favorite_books.length == undefined) {
                            setBooks(response.data.field_favorite_books.und[0].value)
                        }
                        if (response.data.field_favorite_movies.length == undefined) {
                            setMovies(response.data.field_favorite_movies.und[0].value)
                        }
                        if (response.data.field_favorite_tv_shows.length == undefined) {
                            setTV(response.data.field_favorite_tv_shows.und[0].value)
                        }
                        if (response.data.field_favorite_music.length == undefined) {
                            setMusic(response.data.field_favorite_music.und[0].value)
                        }


                    }
                })
            }
        })

    }, [])







    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <SafeAreaView>
                <View >
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 8, marginVertical: 20 }}>
                        <Progress.Bar progress={0.7} unfilledColor="white" animationType="spring" borderColor="white" height={20} width={300} borderRadius={10} />
                    </View>


                    <View style={styles.seconddropDownStyle}>
                        <Text style={styles.labelText}>Do you smoke?</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Never', value: 'Never' },
                                { label: 'Socially', value: 'Socially' },
                                { label: 'Yes', value: 'Yes' },
                                { label: 'Rarely', value: 'Rarely' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setsmokeValue(items.value)}
                            value={smokeValue}
                            defaultValue={smokeValue}
                        />
                    </View>




                    <View style={styles.thirddropDownStyle}>
                        <Text style={styles.labelText}>How about drinking alcohol?</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Never', value: 'Never' },
                                { label: 'Socially', value: 'Socially' },
                                { label: 'Couple Times a Week', value: 'Couple Times a Week' },
                                { label: 'Every Day', value: 'Every Day' },
                                { label: 'Rarely', value: 'Rarely' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setalcoholValue(items.value)}
                            value={alcoholValue}
                            defaultValue={alcoholValue}
                        />
                    </View>



                    {/*Favorite Books code Container*/}

                    <View style={styles.TextAreaContainer}>
                        <View style={styles.FieldContainer}>
                            <Text style={styles.labelTextTextarea}>Favorite Books</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={text => setBooks(text)}
                                maxLength={120}
                                value={Booksvalue}
                                placeholder={'Favorite Books'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>




                    {/*Favorite Movies code Container*/}

                    <View style={styles.TextAreaContainer}>
                        <View style={styles.FieldContainer}>
                            <Text style={styles.labelTextTextarea}>Favorite Movies</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={text => setMovies(text)}
                                maxLength={120}
                                value={Moviesvalue}
                                placeholder={'Favorite Movies'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>


                    {/*Favorite TV Shows code Container*/}

                    <View style={styles.TextAreaContainer}>
                        <View style={styles.FieldContainer}>
                            <Text style={styles.labelTextTextarea}>Favorite TV Shows</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={text => setTV(text)}
                                maxLength={120}
                                value={TVvalue}
                                placeholder={'Favorite TV Shows'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>

                    {/*Favorite Music code Container*/}

                    <View style={styles.TextAreaContainer}>
                        <View style={styles.FieldContainer}>
                            <Text style={styles.labelTextTextarea}>Favorite Music</Text>
                            <Textarea
                                containerStyle={styles.textareaContainer}
                                style={styles.textarea}
                                onChangeText={text => setMusic(text)}
                                maxLength={120}
                                value={Musicvalue}
                                placeholder={'Favorite Music'}
                                placeholderTextColor={'#c7c7c7'}
                                underlineColorAndroid={'transparent'}
                            />
                        </View>
                    </View>




                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            onPress={() => navigate('Fourth', { secondRoute: secondRoute, smokeValue: smokeValue, alcoholValue: alcoholValue, Booksvalue: Booksvalue, Moviesvalue: Moviesvalue, TVvalue, Musicvalue: Musicvalue })}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 15, marginVertical: 15, height: 100, fontFamily: "roboto-bold" }}
                            buttonStyle={{ fontFamily: "roboto-bold" }}
                            buttonStyle={{ backgroundColor: "#4472C4", borderRadius: 10 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            onPress={() => navigate('Second')}
                        />
                    </View>


                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
function FourthRoute({ navigation, route }) {
    const [anyThingvalue, setanyThing] = useState("");
    const [spinner, setspinner] = useState(false)
    const [images, setImages] = useState()
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });
    

        if (!result.cancelled) {
          setImage(result.uri);
          
   
        }
    }

    var items = [];
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {

                    if (response.data.field_you_say.length == undefined) {
                        setanyThing(response.data.field_you_say.und[0].value)
                    }
                    for (let i = 0; i <= response.data.field_user_avatar.und.length; i++) {
                        items.push(response.data.field_user_avatar.und[i])


                    }

                    var newItem = response.data.field_user_avatar.und

                    setImages(newItem)



                })
            }
        })

    }, [])

    const GoPressed = (navigate) => {
        navigate("UserDetail");
    }
    //User Details Update
    const UserDetails = () => {
        const routesSection = route.params
        setspinner(true)
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            const allData = routesSection


            Http.put('user/' + userId, {
                field_long_in_city: {
                    und: routesSection.secondRoute.firstRoute.liveValue,
                },

                field_talk_about: {
                    und: routesSection.secondRoute.firstRoute.talkValue,
                },
                field_do_for_fun: {
                    und: routesSection.secondRoute.firstRoute.activityValue
                },
                field_good_friend:
                {
                    und: routesSection.secondRoute.firstRoute.FriendValue
                },
                field_plans_get_cancelled: {
                    und: routesSection.secondRoute.firstRoute.CancelValue,
                },
                field_relationship_status: {
                    und: routesSection.secondRoute.StatusValue,
                },
                field_any_pets: {
                    und: routesSection.secondRoute.PetValue,
                },
                field_spend_your_days: {
                    und: [
                        {
                            value: routesSection.secondRoute.daysvalue,
                        },
                    ],
                },
                field_languages: {
                    und: [
                        {
                            value: routesSection.secondRoute.spaekvalue
                        }

                    ]
                },
                field_smoke: { und: routesSection.smokeValue },
                field_alcohol: { und: routesSection.alcoholValue },
                field_favorite_books: { und: [{ value: routesSection.Booksvalue }] },
                field_favorite_movies: { und: [{ value: routesSection.Moviesvalue }] },
                field_favorite_tv_shows: { und: [{ value: routesSection.TVvalue }] },
                field_favorite_music: { und: [{ value: routesSection.Musicvalue }] },
                field_you_say: { und: [{ value: anyThingvalue }] },
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
            })


        })


    }




    return (
        <View style={{backgroundColor:"white",flex:1}}>
            <Spinner
                visible={spinner}
                textContent={'Updating...'}
                textStyle={styles.spinnerTextStyle}
            />
            <View>
                <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                    <Progress.Bar progress={1} unfilledColor="white" color="#027BFF" animationType="spring" width={392} borderColor="white" height={20} borderRadius={10} />
                </View>

                <FlatList
                        data={images}
                     
                        keyExtractor={item => item.fid}
                        renderItem={({ item }) => {
                            var pictureItem = item.filename
                            var pictureUrl = 'https://gowebtutorial.com/sites/default/files/' +pictureItem

                            return (
                               
                                        <View  style={{flexDirection: 'row',flex:2,marginHorizontal:20}}>
                                        <Image style={{ height:50,width:50}} source={{uri:pictureUrl}}/>
                                        </View>
                         
                            )

                        }}
                    />

<View style={styles.imageUploadButton}>
                    <Entypo name="camera" size={24} color="black" />
                    <Text style={styles.imageUploadButtonText} onPress={pickImage} >Upload From Gallery</Text>
                </View>



                {/*Anything else you want to share? Container*/}
                <View style={styles.TextAreaContainer}>
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelTextTextarea}>Anything else you want to share?</Text>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={text => setanyThing(text)}
                            maxLength={120}
                            value={anyThingvalue}
                            placeholder={'Favorite Books'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>

                   


                </View>



                <View style={styles.mainContainerPicker}>
                    <Button
                        containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                        buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                        title="Continue"
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        onPress={UserDetails}

                    />

                    <Button
                        containerStyle={{ marginHorizontal: 10, backgroundColor: " #4472C4", marginVertical: 8, paddingBottom: 10 }}
                        buttonStyle={{ backgroundColor: "#4472C4", borderRadius: 10 }}
                        title="Previous"
                        titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                        onPress={() => navigation.navigate('Third')}
                    />
                </View>



            </View>
        </View>

    )



}







const Tab = createMaterialTopTabNavigator();

//Export Upper Content

const Optionaldetail = (props) => {


    useEffect(() => {
        async function getKind() {
            font.loadAsync({
                'Cairo-Bold': require('../../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../../assets/fonts/Montserrat-ExtraLight.ttf')
            });
        }
        getKind()
    }, [])
    const [index, setIndex] = React.useState(0);
    const network = React.useContext(NetworkContext);




    return (
        <View style={{ flex: 1 }}>
            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{ activeTintColor: 'transparent', inactiveTintColor: '#D3D3D3', indicatorStyle: { backgroundColor: 'transparent' } }} tabBarPosition='bottom'>
                    <Tab.Screen name="First" component={FirstRoute} options={{ tabBarLabel: '' }} />
                    <Tab.Screen name="Second" component={SecondRoute} options={{ tabBarLabel: '' }} />
                    <Tab.Screen name="Third" component={ThirdRoute} options={{ tabBarLabel: '' }} />
                    <Tab.Screen name="Fourth" component={FourthRoute} options={{ tabBarLabel: '' }} />
                </Tab.Navigator>
            </NavigationContainer>

        </View>
    );

}
const styles = StyleSheet.create({
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
    labelTextTextarea: {
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
    overflowContainerText:
    {
        marginHorizontal: 5,
        textAlign: "justify",
        marginVertical: 10,
        fontFamily: 'Montserrat-ExtraLight'
    },
    lowerTextfield: {
        marginTop: -23,
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat-ExtraLight'

    },
    textArea:
    {
        borderWidth: 1,
        height: 100,
        marginHorizontal: 10,

    },
    inputText: {
        borderWidth: 1, paddingHorizontal: 8, marginTop: 4
    },
    TextInputStyleClass: {
        height: 50,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        height: 150, marginHorizontal: 10,

    },
    TextInput: {
        borderWidth: 1,
        height: 45,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight',
        borderRadius: 5
    },
    FieldContainer: {
        marginVertical: 10,

    },
    DropDown: {
        borderWidth: 1,
        marginHorizontal: 10,
        borderRadius: 5,
        zIndex: 10,
        backgroundColor: '#fff'


    },
    dropDownActive: {
        fontFamily: 'Montserrat-ExtraLight'
    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Montserrat-ExtraLight'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat-ExtraLight'
    },
    TextAreaContainer: {
        marginHorizontal: 10
    },
    dropDownStyle: {
        position: 'relative',
        zIndex: 40,
        backgroundColor: '#fff',
        marginVertical: 5
    },
    seconddropDownStyle: {
        position: "relative",
        zIndex: 30,
        backgroundColor: '#fff',
    },
    thirddropDownStyle: {
        position: "relative",
        zIndex: 20,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    fourthdropDownStyle: {
        position: "relative",
        zIndex: 10,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    fifthdropDownStyle: {
        position: "relative",
        zIndex: 9,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    sixdropDownStyle: {
        position: "relative",
        zIndex: 8,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    sevendropDownStyle: {
        position: "relative",
        zIndex: 7,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    eightdropDownStyle: {
        position: "relative",
        zIndex: 6,
        backgroundColor: '#fff',
        marginVertical: 10
    },
    imagesShow:{
        flex: 1, flexDirection: 'row',
     
    },
    imageUploadButtonText: {
        fontSize: 20,
        fontFamily: 'Montserrat-ExtraLight',
        backgroundColor: "#DFF4F5",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"


    },
    imageUploadButton: {
        fontSize: 20,
        fontFamily: 'Montserrat-ExtraLight',
        backgroundColor: "#DFF4F5",
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal:60,
        marginVertical:20
    },

    iAmContainer: {
        borderWidth: 1,
        marginHorizontal: 10,
        fontFamily: 'Montserrat-ExtraLight',
        borderRadius:5,
        paddingTop:3
    },


});




export default Optionaldetail
