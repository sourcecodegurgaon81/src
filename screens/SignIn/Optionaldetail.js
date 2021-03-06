import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions,  SafeAreaView, ScrollView, Image, Platform, TextInput, FlatList } from "react-native";
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
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';
import CustomMultiPicker from "react-native-multiple-select-list";
import { Picker } from 'react-native'




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



    const [android, setAndroid] = useState(false)
    const [ios, setIos] = useState(false)
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });



    useEffect(() => {

        
    
        AsyncStorage.getItem('Token', (err, result) => {
            const UserDetail = JSON.parse(result)
            CheckPhone()

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
                            console.log(response.data.field_plans_get_cancelled.und[0].value)
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




    const CheckPhone = () =>{
        Platform.select({
            ios: () => setIos(true),
            android: () => setAndroid(true)
        })();
    }
  // Dummy Data for the MutiSelect
  const userList = {
    'yoga': 'yoga',
    'playdates (parents and children)': 'playdates (parents and children)',
    'happy hour/cocktails/beers': 'happy hour/cocktails/beers',
    'sightseeing': 'sightseeing',
    'artsy stuff (making or looking at)': 'artsy stuff (making or looking at)',
    'cooking': 'cooking',
    'dancing': 'dancing',
    'people watching': 'people watching',
    'traveling/vacations': 'traveling/vacations',
    'history buff': 'history buff',
    'board games': 'board games',
    'sports (playing)': 'sports (playing)',
    "mom's/dad's night out w/o kids": "mom's/dad's night out w/o kids",
    'outdoor activities': 'outdoor activities',
    'dining out': 'dining out',
    'concerts/shows': 'concerts/shows',
    'sports (watching)': 'sports (watching)',
    'shopping': 'shopping',
    'video games': 'video games',
    'photography': 'photography',
    'animal lover/pet owner': 'animal lover/pet owner',
    'crime/mystery reader': 'crime/mystery reader',
    'chess': 'chess',

}


const onSelectedItemsChange = (activityValue) => {
    // Set Selected Items
    setactivityValue(activityValue);
};
if(!fontsLoaded)
{
  return(<AppLoading />)
}
else{
    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View>
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={0.2} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>




                    
                       
                    <View style={{ marginHorizontal: 5 }}>
           <Text style={styles.labelText}>What do you like to do for fun?</Text>                          
           <View style={{ marginHorizontal: 5, borderWidth: 1, borderRadius: 5 }}>
                                <CustomMultiPicker
                                    options={userList}
                                    search={false}
                                    multiple={true}
                                    placeholder={"Pick Activities"}
                                    placeholderTextColor={'#757575'}
                                    returnValue={"label"}
                                    callback={(res) => setactivityValue(res)}
                                    rowBackgroundColor={"#eee"}
                                    rowHeight={45}
                                    rowRadius={5}
                                    searchIconName="ios-checkmark"
                                    searchIconColor="red"
                                    searchIconSize={30}
                                    iconColor={"black"}
                                    iconSize={30}
                                    selectedIconName={"ios-checkmark-circle-outline"}
                                    unselectedIconName={"ios-add-circle-outline"}
                                    scrollViewHeight={150}
                                />
                            </View>
                        </View>


                    <View style={styles.seconddropDownStyle}>
                        <Text style={styles.labelText}>How long have you lived here?</Text>


                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={liveValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setliveValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label= '< 2 years' value= '0'  />
                                        <Picker.Item label = '2-5 years' value ='1'  />
                                        <Picker.Item label ='> 5 years' value = '2'/>

                                    </Picker>
                                </View>
                            ) : null}

                            {ios ?(
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
                        ):null}
                    </View>





                    <View style={styles.thirddropDownStyle}>
                        <Text style={styles.labelText}>My friends and I usually talk about</Text>


                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={talkValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => settalkValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                     
                                        <Picker.Item label='Work' value='Work'  />
                                        <Picker.Item label = 'Family' value= 'Family'  />
                                        <Picker.Item label ='Relationships' value = 'Relationships' />
                                        <Picker.Item label = 'Gossip' value = 'Gossip' />
                                        <Picker.Item label = 'Fashion' value ='Fashion' />
                                        <Picker.Item label = 'Sports' value = 'Sports' />
                                        <Picker.Item  label = 'Other' value = 'Other' />
                                    </Picker>
                                </View>
                            ) : null}



                    {ios ? (
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
                        ):null}
                    </View>



                    <View style={styles.fourthdropDownStyle}>
                        <Text style={styles.labelText}>A good friend is someone who..</Text>

                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={FriendValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setFriendValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                     
                                        <Picker.Item label = 'is always there for me' value = 'is always there for me' />
                                        <Picker.Item label= 'always sides with me no matter what.' value= 'always sides with me no matter what.'  />
                                        <Picker.Item label ='Relationships' value = 'Relationships' />
                                        <Picker.Item label =  'Relationships'value = 'Relationships'/>
                                        <Picker.Item label = 'will be honest with me even if it hurts.' value= 'will be honest with me even if it hurts.' />
                                        <Picker.Item label = 'gives advice' value = 'gives advice'/>
                                        <Picker.Item  label = 'is an activity partner' value = 'is an activity partner'/>
                                    </Picker>
                                </View>
                            ) : null}








                  {ios?(
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
                        ):null}
                    </View>



                    <View style={styles.fifthdropDownStyle}>
                        <Text style={styles.labelText}>When someone cancels plans we made</Text>


                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={CancelValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setCancelValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                     
                                        <Picker.Item label = 'It really bothers me and I am wary of the friendship.'value = 'It really bothers me and I am wary of the friendship.'  />
                                        <Picker.Item label = 'My reaction depends on the reason why.' value = 'My reaction depends on the reason why.'  />
                                        <Picker.Item label = 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.'  value = 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.'/>
                                        <Picker.Item label = 'Things happen – no big deal.' value = 'Things happen – no big deal.' />
                                    </Picker>
                                </View>
                            ) : null}



                      {ios?(
                        <DropDownPicker
                            items={[
                                { label:'It really bothers me and I am wary of the friendship.', value: 'It really bothers me and I am wary of the friendship.' },
                                 { label: 'My reaction depends on the reason why.', value: 'My reaction depends on the reason why.' },
                                 { label: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.',  value: 'I’m generally understanding, but I can only be blown off so many times before I will start to question the friendship.' },
                                 { label: 'Things happen – no big deal.', value: 'Things happen – no big deal.' },
                            ]}
                           
                            containerStyle={styles.DropDown}
                            labelStyle={styles.dropDownActive}
                            activeItemStyle={styles.dropDownActive}
                            dropDownStyle={{ backgroundColor: '#fafafa', zIndex: 200 }}
                            onChangeItem={items => setCancelValue(items.value)}
                            value={CancelValue}
                            defaultValue={CancelValue}
                        />
                        ):null}
                    </View> 


                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={() => navigate('Second', {
                                liveValue: liveValue, talkValue: talkValue, FriendValue: FriendValue,
                                CancelValue: CancelValue, activityValue: activityValue
                            })}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                        />
                    </View>



                </View>
            </ScrollView>
        </SafeAreaView>

    )
};
}

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



    const [android, setAndroid] = useState(false)
    const [ios, setIos] = useState(false)
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });



    useEffect(() => {
        CheckPhone ()
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
    const CheckPhone = () =>{
        Platform.select({
            ios: () => setIos(true),
            android: () => setAndroid(true)
        })();
    }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <ScrollView>
                <View>
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 10, marginVertical: 20 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
                    </View>

                    <View style={styles.sixdropDownStyle}>
                        <Text style={styles.labelText}>Are you in a realtionship?</Text>


                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={StatusValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setStatusValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label='Yes' value= 'Yes' />
                                        <Picker.Item label = 'No' value = 'No'   />
                                

                                    </Picker>
                                </View>
                            ) : null}


                            {ios ?(
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
                        ):null}
                    </View>


                    <View style={styles.sevendropDownStyle}>
                        <Text style={styles.labelText}>Do you have kids?</Text>



                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={KidsValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setKidsValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label='Yes' value= 'Yes' />
                                        <Picker.Item label = 'No' value = 'No'   />
                                

                                    </Picker>
                                </View>
                            ) : null}

                            {ios?(
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
                        ):null}

                    </View>



                    <View style={styles.eightdropDownStyle}>
                        <Text style={styles.labelText}>Do you have pets?</Text>



                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={PetValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setPetValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label = 'Dog' value = 'Dog'  />
                                        <Picker.Item label = 'Cat' value = 'Cat'   />
                                        <Picker.Item label = 'Rabbit' value = 'Rabbit'   />
                                        <Picker.Item label = 'Birds' value = 'Birds'   />
                                        <Picker.Item label = 'Fish' value = 'Fish'   />
                                        <Picker.Item label = 'Reptile' value = 'Reptile'   />
                                        <Picker.Item label = 'Other' value = 'Other'   />

                                    </Picker>
                                </View>
                            ) : null}



                            {ios?(
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
                        ):null}
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
                            labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={() => navigate('Third', {
                                StatusValue: StatusValue, KidsValue: KidsValue,
                                PetValue: PetValue, daysvalue: daysvalue, spaekvalue: spaekvalue, firstRoute: firstRoute
                            })}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8}}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            onPress={() => navigate('First')}
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #4472C4", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#4472C4", borderRadius: 10 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}

                        />
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>

    )
};
}


const ThirdRoute = ({ navigation: { navigate }, route }) => {

    const secondRoute = route.params
    const [smokeValue, setsmokeValue] = useState("");
    const [alcoholValue, setalcoholValue] = useState("");
    const [Booksvalue, setBooks] = useState("");
    const [Moviesvalue, setMovies] = useState("");
    const [TVvalue, setTV] = useState("");
    const [Musicvalue, setMusic] = useState("");
    const [android, setAndroid] = useState(false)
    const [ios, setIos] = useState(false)
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });



    useEffect(() => {
        CheckPhone ()
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


    const CheckPhone = () =>{
        Platform.select({
            ios: () => setIos(true),
            android: () => setAndroid(true)
        })();
    }

    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{


    return (
        <ScrollView style={{ backgroundColor: "white" }}>
            <SafeAreaView>
                <View >
                    <View style={{ borderWidth: 1, borderRadius: 20, marginHorizontal: 8, marginVertical: 20 }}>
                        <Progress.Bar progress={0.7} unfilledColor="white" animationType="spring" borderColor="white" height={20} width={300} borderRadius={10} />
                    </View>


                    <View style={styles.seconddropDownStyle}>
                        <Text style={styles.labelText}>Do you smoke?</Text>


                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={smokeValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setsmokeValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label= 'Never' value= 'Never' />
                                        <Picker.Item label= 'Socially' value= 'Socially'   />
                                        <Picker.Item label= 'Yes' value='Yes'/>
                                        <Picker.Item label= 'Rarely' value='Rarely'/>

                                    </Picker>
                                </View>
                            ) : null}



                      {ios ? (
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
                        ):null}
                    </View>




                    <View style={styles.thirddropDownStyle}>
                        <Text style={styles.labelText}>How about drinking alcohol?</Text>



                        {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={alcoholValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setalcoholValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label= 'Never' value= 'Never' />
                                        <Picker.Item label= 'Socially' value= 'Socially'   />
                                        <Picker.Item label ='Couple Times a Week' value = 'Couple Times a Week'/>
                                        <Picker.Item label = 'Every Day' value =  'Every Day'/>
                                        <Picker.Item label= 'Rarely' value='Rarely'/>

                                    </Picker>
                                </View>
                            ) : null}


                        {ios ? (
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
                        ):null}
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
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8 }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            onPress={() => navigate('Fourth', { secondRoute: secondRoute, smokeValue: smokeValue, alcoholValue: alcoholValue, Booksvalue: Booksvalue, Moviesvalue: Moviesvalue, TVvalue, Musicvalue: Musicvalue })}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 15, marginVertical: 15, height: 100, fontFamily: "roboto-bold" }}
                            buttonStyle={{ fontFamily: "roboto-bold" }}
                            buttonStyle={{ backgroundColor: "#4472C4", borderRadius: 10 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            onPress={() => navigate('Second')}
                        />
                    </View>


                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
}
function FourthRoute({ navigation, route }) {
    const [anyThingvalue, setanyThing] = useState("");
    const [spinner, setspinner] = useState(false)
    const [images, setImages] = useState()
    const [image, setImage] = useState(null);
    const [imageUrls, setImageUrls] = useState()

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });

    const pickImage = async () => {
      
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });


       
        if (!result.cancelled) {
          setImage(result.uri);
        } 
     
        // Get File Name
        var url = result.uri;
        var filename = url.substring(url.lastIndexOf('/')+1);

        //Post File Name

        Http.post('file',{file: result.base64, filename: filename,filepath: "public://" + filename}).then((responses) => {
      console.log(responses)
      setspinner(false)
    
      //Getting Full Url
        Http.get('file/' + responses.data.fid).then((imageUrl) => {
            console.log(imageUrl)
           setImageUrls(imageUrl.data)
           setspinner(false)

        }).catch((error)=>{
 console.log(error.response)
           
       
})
       
    })

  
    
    
    };

    var items = [];
    useEffect(() => {
       
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
                field_user_avatar: {
                    und: [imageUrls],
                  },
            }, { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-Cookie': UserDetail.data.sessid + "=" + UserDetail.data.session_name, 'X-CSRF-Token': UserDetail.data.token } }).then((response) => {
                setspinner(false)
            })


        })


    }


    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

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
                        titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                        onPress={UserDetails}

                    />

                    <Button
                        containerStyle={{ marginHorizontal: 10, backgroundColor: " #4472C4", marginVertical: 8, paddingBottom: 10 }}
                        buttonStyle={{ backgroundColor: "#4472C4", borderRadius: 10 }}
                        title="Previous"
                        titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                        onPress={() => navigation.navigate('Third')}
                    />
                </View>



            </View>
        </View>

    )



}
}







const Tab = createMaterialTopTabNavigator();

//Export Upper Content

const Optionaldetail = (props) => {


    useEffect(() => {
      
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
        fontFamily: 'Montserrat_200ExtraLight'
    },
    labelText: {
        marginHorizontal: 10,
        marginVertical: 5,
        fontFamily: 'Montserrat_200ExtraLight',
        fontSize: 16
    },
    labelTextTextarea: {
        marginVertical: 5,
        fontFamily: 'Montserrat_200ExtraLight',
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
        fontFamily: 'Montserrat_200ExtraLight'
    },
    lowerTextfield: {
        marginTop: -23,
        fontSize: 18,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat_200ExtraLight'

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
        fontFamily: 'Montserrat_200ExtraLight',
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
        fontFamily: 'Montserrat_200ExtraLight'
    },
    textareaContainer: {
        height: 140,
        padding: 5,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        fontFamily: 'Montserrat_200ExtraLight'
    },
    textarea: {
        textAlignVertical: 'top',  // hack android
        height: 140,
        fontSize: 14,
        color: '#333',
        fontFamily: 'Montserrat_200ExtraLight'
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
        fontFamily: 'Montserrat_200ExtraLight',
        backgroundColor: "#DFF4F5",
        marginLeft: 10,
        alignItems: "center",
        justifyContent: "center"


    },
    imageUploadButton: {
        fontSize: 20,
        fontFamily: 'Montserrat_200ExtraLight',
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
        fontFamily: 'Montserrat_200ExtraLight',
        borderRadius:5,
        paddingTop:3
    },
    androidDropDown: { borderWidth: 1, marginHorizontal: 10, borderRadius: 5 },
    androidPickerDropdown: { height: 40, width: "100%", borderWidth: 1, marginHorizontal: 10 }


});




export default Optionaldetail
