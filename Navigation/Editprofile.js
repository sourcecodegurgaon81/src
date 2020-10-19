import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TextInput } from "react-native";
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
import Http from '../Api/Http'
export const NetworkContext = React.createContext();

const FirstRoute = ({ navigation: { navigate } }) => {


    //Field Value
    const [userName, setuserName] = useState();
    const [userFirstName, setuserFirstName] = useState();
    const [userLastName, setuserLastName] = useState();
    const [IamName, setuserIamtName] = useState();
    const [contracted, setContracted] = useState()
    const [meet, setMeet] = useState()
    const [consider, setconsider] = useState()



    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        setuserName(response.data.name)
                        setuserFirstName(response.data.field_first_name.und[0].value)
                        setuserLastName(response.data.field_last_name.und[0].value)
                        setuserIamtName(response.data.field_gender.und[0].value)
                        setContracted(response.data.field_want_contarct.und[0].value)
                        setMeet(response.data.field_look_meet.und[0].value)
                        setconsider(response.data.field_consider_myself_.und[0].value)

                    }
                })
            }
        })

    }, [])


    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View style={{ backgroundColor: "white", flex: 1 }}>
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={0.3} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>
                    {/*Field Name Container*/}
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelText}>Username</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setuserName(text)}
                            value={userName}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                        />
                    </View>


                    {/*Field First Name Container*/}
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelText}>First name</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setuserFirstName(text)}
                            value={userFirstName}
                        />
                    </View>


                    {/*Field Last Name Container*/}
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelText}>Last name</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setuserLastName(text)}
                            value={userLastName}
                        />
                    </View>


                    {/*Field I am Container*/}
                    <View style={styles.dropDownStyle}>
                        <View style={styles.dropDownStyle} >
                            <Text style={styles.labelText}>I am</Text>
                            <DropDownPicker
                                items={[
                                    { label: 'Male', value: 'Male' },
                                    { label: 'Female', value: 'Female' },
                                    { label: 'Gender Diverse', value: 'Gender Diverse' },
                                ]}
                                defaultValue={IamName}
                                value={IamName}
                                defaultIndex={0}
                                containerStyle={styles.DropDown}
                                onChangeItem={item => setuserIamtName(item.value)}
                                activeItemStyle={styles.dropDownActive}
                                dropDownStyle={{}}
                                labelStyle={styles.dropDownActive}

                            />
                        </View>
                    </View>


                    {/*Field Wanting to be contacted by Container*/}
                    <View style={styles.seconddropDownStyle}>
                        <View style={styles.FieldContainer}>
                            <Text style={styles.labelText}>Wanting to be contacted by</Text>

                            <DropDownPicker
                                items={[
                                    { label: 'men only', value: '0' },
                                    { label: 'women only', value: '1' },
                                    { label: 'gender diverse only', value: '2' },
                                    { label: 'everyone', value: '3' },
                                ]}
                                defaultValue={contracted}
                                defaultIndex={0}
                                containerStyle={styles.DropDown}
                                onChangeItem={contr => setContracted(contr.value)}
                                activeItemStyle={styles.dropDownActive}
                                dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                                labelStyle={styles.dropDownActive}
                            />
                        </View>
                    </View>



                    {/*I consider myself Container*/}
                    <View style={styles.thirddropDownStyle}>
                        <Text style={styles.labelText}>I consider myself</Text>
                        <DropDownPicker
                            items={[
                                { label: 'Outgoing', value: 'Outgoing' },
                                { label: 'On the Quieter Side', value: 'On the Quieter Side' },
                                { label: 'A Mix of Both', value: 'A Mix of Both' },
                            ]}
                            defaultValue={consider}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            onChangeItem={cont => setconsider(cont.value)}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            labelStyle={styles.dropDownActive}
                        />
                    </View>


                    {/*Field I want to meet by Container*/}
                    <View style={styles.fourthdropDownStyle}>
                        <Text style={styles.labelText}>I want to meet</Text>
                        <DropDownPicker
                            items={[
                                { label: 'a few goods friends', value: '1' },
                                { label: 'a lot of accquaintances', value: '2' },
                                { label: 'no preference', value: '3' },
                            ]}
                            defaultValue={meet}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            onChangeItem={item => setMeet(item.value)}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            labelStyle={styles.dropDownActive}
                        />
                    </View>


                    <View>
                        <Button containerStyle={{ marginHorizontal: 20, marginVertical: 20 }}
                            onPress={() => navigate('Second', { names: userName, FirstName: userFirstName, LastName: userLastName, Gender: IamName, Contract: contracted, meet: meet, consider: consider })}
                            title="Continue"
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo-Bold' }}
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
    const [StatusValue, setStatusValue] = useState("")
    const [KidsValue, setKidsValue] = useState("")
    const [PetValue, setPetValue] = useState("")
    const [daysvalue, setdays] = useState("")
    const [spaekvalue, setspeak] = useState("")



    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
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



    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View>
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>


                    <View style={styles.dropDownStyle}>
                        <Text style={styles.labelText}>I live in </Text>

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
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                          
                            onChangeItem={items => setCountry(items.value)}
                            value={CountryValue}
                            defaultValue={CountryValue}
                            defaultIndex={0}

                        />

                    </View>


                    {/*t this postal/Zip code Container*/}
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelText}>at this postal/Zip code</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setPostal(text)}
                            value={Postalcode}
                            labelStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat-ExtraLight' }}
                        />
                    </View>



                    <View style={styles.dropDownStyle}>
                        <Text style={styles.labelText}>What do you like to do for fun?</Text>
                        <DropDownPicker
                            items={[
                                { label: 'playdates (parents and children)', value: 'playdates (parents and children)' },
                                { label: 'happy hour/cocktails/beers', value: 'happy hour/cocktails/beers' },
                                { label: 'sightseeing', value: 'sightseeing' },
                                { label: 'artsy stuff (making or looking at)', value: 'artsy stuff (making or looking at)' },
                                { label: 'cooking', value: 'cooking' },
                                { label: 'dancing', value: 'dancing' },
                                { label: 'people watching', value: 'people watching' },
                                { label: 'yoga', value: 'yoga' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            dropDownStyle={{ zIndex: 400 }}
                            onChangeItem={items => setactivityValue(items.value)}
                            value={activityValue} />

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
                                { label: 'My reaction depends on the reason why.', value: 'My reaction depends on the reason why.' },
                                { label: 'I think no big deal', value: 'I think no big deal' },
                                { label: 'It really bothers me and I am wary of the friendship.', value: 'It really bothers me and I am wary of the friendship.' },
                                { label: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.', value: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.' },
                            ]}
                            defaultIndex={0}
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setCancelValue(items.value)}
                            value={CancelValue}
                            defaultValue={CancelValue}
                        />

                    </View>


                    <View style={styles.sixdropDownStyle}>
                        <Text style={styles.labelText}>Are you in a realtionship?</Text>
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
                            onChangeItem={items => setStatusValue(items.value)}
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
                                First: firstRoute, CountryValue: CountryValue,
                                Postalcode: Postalcode, liveValue: liveValue, talkValue: talkValue, FriendValue: FriendValue,
                                CancelValue: CancelValue, StatusValue: StatusValue, KidsValue: KidsValue,
                                KidsValue: KidsValue, PetValue: PetValue, daysvalue: daysvalue, spaekvalue: spaekvalue,
                                activityValue: activityValue, StatusValue: StatusValue
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
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #F64225", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10 }}
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
            'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
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
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10 }}
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
const FourthRoute = ({ navigation, route }) => {
    const [anyThingvalue, setanyThing] = useState("");
    const routesSection = route.params


    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
            'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
        });
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            if (UserDetail != null) {
                Http.get('user/' + UserDetail.data.user.uid, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                    if (response.status == 200) {
                        if (response.data.field_you_say.length == undefined) {
                            setanyThing(response.data.field_you_say.und[0].value)

                        }
                    }
                })
            }
        })

    }, [])

   const  GoPressed =(navigate)=>{
        navigate("UserDetail");
      }
    //User Details Update
    const UserDetails = props => {
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            const userId = UserDetail.data.user.uid
            const allData = routesSection

            console.log(props)

            Http.put('user/' + userId, {
                name: allData.secondRoute.First.names,
                field_first_name: {
                    und: [
                        {
                            value: allData.secondRoute.First.FirstName,
                        },
                    ],
                },
                field_last_name: {
                    und: [
                        {
                            value: allData.secondRoute.First.LastName,
                        },
                    ],
                },
                field_gender: {
                    und: allData.secondRoute.First.Gender,
                },
                field_want_contarct: {
                    und: allData.secondRoute.First.Contract,
                },

                field_consider_myself_: {
                    und: allData.secondRoute.First.consider
                },

                field_look_meet: {
                    und: routesSection.secondRoute.First.meet,
                },

                field_zip_code: {
                    und: [
                        {
                            postal_code: routesSection.secondRoute.Postalcode,
                            country: routesSection.secondRoute.CountryValue,
                        }
                    ]
                },

                field_long_in_city: {
                    und: routesSection.secondRoute.liveValue,
                },

                field_talk_about: {
                    und: routesSection.secondRoute.talkValue,
                },
                field_do_for_fun: {
                    und: routesSection.secondRoute.activityValue
                },
                field_good_friend:
                {
                    und: routesSection.secondRoute.FriendValue
                },
                field_plans_get_cancelled: {
                    und: routesSection.secondRoute.CancelValue,
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
                if (response.status == 200) {
                    //navigation.navigate('Home')
                    //console.log(props)
                }
            })


        })


    }




    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <SafeAreaView>
                <View >
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={1} unfilledColor="white" color="#027BFF" animationType="spring" width={392} borderColor="white" height={20} borderRadius={10} />
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
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #F64225", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#F64225", borderRadius: 10 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo-Bold', fontSize: 20 }}
                            onPress={() => navigation.navigate('Third')}
                        />
                    </View>



                </View>

            </SafeAreaView>
        </ScrollView>
    )



}







const Tab = createMaterialTopTabNavigator();

//Export Upper Content

const Editprofile = (props) => {


    useEffect(() => {
        async function getKind() {
            font.loadAsync({
                'Cairo-Bold': require('../../assets/fonts/Cairo-Bold.ttf'),
                'Montserrat-ExtraLight': require('../../assets/fonts/Montserrat-ExtraLight.ttf')
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
        marginVertical:5
    },
    seconddropDownStyle:{
        position:"relative",
        zIndex: 30,
        backgroundColor: '#fff',
    },
    thirddropDownStyle:{
        position:"relative",
        zIndex: 20,
        backgroundColor: '#fff',
        marginVertical:10
    },
    fourthdropDownStyle:{
        position:"relative",
        zIndex: 10,
        backgroundColor: '#fff',
        marginVertical:10
    },
    fifthdropDownStyle:{
        position:"relative",
        zIndex: 9,
        backgroundColor: '#fff',
        marginVertical:10
    },
    sixdropDownStyle:{
        position:"relative",
        zIndex: 8,
        backgroundColor: '#fff',
        marginVertical:10
    },
    sevendropDownStyle:{
        position:"relative",
        zIndex: 7,
        backgroundColor: '#fff',
        marginVertical:10
    },
    eightdropDownStyle:{
        position:"relative",
        zIndex: 6,
        backgroundColor: '#fff',
        marginVertical:10
    }



});




export default Editprofile
