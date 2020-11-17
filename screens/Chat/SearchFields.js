import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions,  SafeAreaView, ScrollView, Image, TextInput,TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import SearchItems from './SearchItems'
import DropDownPicker from 'react-native-dropdown-picker';
import { Tooltip, Input } from 'react-native-elements';
import * as font from 'expo-font';
import { FlatList } from 'react-native-gesture-handler';
import Http from '../../Api/Http'
import Favorate from './Favorate'
import Chats from  './Chats'
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import Spinner from 'react-native-loading-spinner-overlay';

import CustomMultiPicker from "react-native-multiple-select-list";
import { Picker } from 'react-native'
import { AppLoading } from 'expo';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';


const SearchFields = (props) => { 

const navigation = useNavigation();

  const [Postcode, setPostcode] = useState('')
  const [CountryValue, setCountry] = useState('')
  const [meetValue, setmeetValue] = useState("0");
  const [genderValue, setgenderValue] = useState("0");
  const [gender , setDefaultGender] = useState("")
  const [searchResults, setSearch] = useState('')
  const [liveValue, setliveValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [activityValue, setactivityValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  const [android, setAndroid] = useState(false)
  const [ios, setIos] = useState(false)

  // Result Show Hide Variables
  const [output, setoutput] = useState(false)
  const [search, setSearchField] = useState(true)
 //Spinner
 const [spinner ,setspinner] = useState(false)

 let [fontsLoaded] = useFonts({
  Cairo_700Bold,
  Montserrat_200ExtraLight
});
 
useEffect(() => {

  Platform.select({
      ios: () => setIos(true),
      android: () => setAndroid(true)
  })();
}, [])
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

  const searchResult = async () => {

        setspinner(true)
    const response = await Http.get('search-view', {
      params: {
        postal: Postcode,
      }
    }

    ); setSearch(response.data)
    setspinner(false)
    setoutput(true)
   setSearchField(false)
  }

  const onSelectedItemsChange = (selectedItems) => {
    // Set Selected Items
    setSelectedItems(selectedItems);
  };
  const showSearchFields = () => {
    setoutput(false)
    setSearchField(true)
  }
  if(!fontsLoaded)
  {
    return(<AppLoading />)
  }
  else{
  return (
    <SafeAreaView>
   <ScrollView>
   <Spinner
          visible={spinner}
          textContent={'Loading Results...'}
          textStyle={styles.spinnerTextStyle}
        />
    <View style={styles.mainContainerField}>
 
      {/*Search Fields area start */}
      {search ? (
        <View style={styles.secondContainer}>
          <View>
            <Text style={styles.upperText}> Search User</Text>
            <Text style={styles.upperTextHeading}>Location</Text>
            <View style={styles.mainContainerPicker}>
              <Text style={styles.labelText}>Postcode</Text>
              <View style={styles.postocdeField}>
                <View style={{ flex: 5 }}>
                  <TextInput
                    placeholder='Enter Postcode' value={Postcode} onChangeText={newValue => setPostcode(newValue)} style={styles.TextInput} />

                </View>
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <Image style={styles.tinyLogo} source={require('../../../assets/Images/locate.png')} />
                </View>
              </View>
              <View style={styles.dropDownStyle}>
                <Text style={styles.labelText}>Country </Text>

                {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={CountryValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >
                                        <Picker.Item label= 'Australia' value= 'au' />
                                        <Picker.Item label='Canada' value= 'ca' />
                                        <Picker.Item label = 'India' value ='in'/>
                                        <Picker.Item label = 'Singapore' value= 'sg'/>
                                        <Picker.Item label = 'New Zealand' value = 'nz'/>
                                        <Picker.Item label = 'United Kingdom' value = 'uk'/>
                                        <Picker.Item label = 'United States' value = 'us'/>

                                    </Picker>
                                </View>
                            ) : null}



                   {ios?(
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
                  
                  onChangeItem={items => setCountry(items.value)}
                  value={CountryValue}
                  defaultValue={CountryValue}
                  defaultIndex={0}
                />
                ):null}

                <View>
                  

                <Text style={styles.upperTextHeading}>Criteria</Text>
        
        <View style={styles.dropDownStyle}>

                  <Text style={styles.labelText}>Looking For</Text>


                  {android ? (
                                <View style={styles.androidDropDown}>
                                    <Picker
                                        selectedValue={meetValue}
                                        style={styles.androidPickerDropdown}
                                        onValueChange={(itemValue, itemIndex) => setmeetValue(itemValue)}
                                        containerStyle={styles.DropDown}
                                    >

                                        <Picker.Item label = 'No Prefrence'  value = '0'  />
                                        <Picker.Item label='a few goods friends' value='1' />
                                        <Picker.Item label='a lot of accquaintances' value='2' />
                                        <Picker.Item label='no preference' value='3' />

                                    </Picker>
                                </View>
                            ) : null}


                            {ios?(
                <DropDownPicker
                  items={[
                    { label: 'No Prefrence', value: '0' },
                    { label: 'a few goods friends', value: '1' },
                    { label: 'a lot of accquaintancesa', value: '2' },
                    { label: 'no preference', value: '3' },
             
                  ]}
                  containerStyle={styles.DropDown}
                  labelStyle={styles.dropDownActive}
                  
                  onChangeItem={items => setmeetValue(items.value)}
                  value={meetValue}
                  defaultValue={meetValue}
                  defaultIndex={1}
                />
                ):null}
</View>

           
           <View style={styles.seconddropDownStyle}>
                <Text style={styles.labelText}>Gender</Text>  


                {android ? (
                                    <View style={styles.androidDropDown}>
                                        <Picker
                                            selectedValue={genderValue}
                                            style={styles.androidPickerDropdown}
                                            onValueChange={(itemValue, itemIndex) => setgenderValue(itemValue)}
                                            containerStyle={styles.DropDown}
                                        >
                                                       <Picker.Item label='male' value='Male' />
                                        <Picker.Item label='female' value='Female' />
                                        <Picker.Item label='gender diverse' value='Gender Diverse' />

                                        </Picker>
                                    </View>
                                ) : null}



                                {ios?(
                <DropDownPicker
                  items={[
                    { label: 'No Prefrence', value: '0' },
                    { label: 'Male', value: 'Male' },
                    { label: 'Female', value: 'Female' },
                    { label: 'Gender Diverse', value: 'Gender Diverse' },
             
                  ]}
                  containerStyle={styles.DropDown}
                  labelStyle={styles.dropDownActive}
                  
                  onChangeItem={items => setgenderValue(items.value)}
                  value={genderValue}
                  defaultValue={genderValue}
                  defaultIndex={0}
                />
                ):null}
</View>




<View >
                <Text style={styles.labelText}>Activities</Text>  
                <View style={{ marginHorizontal: 10, borderWidth: 1, borderRadius: 5 }}>
                                <CustomMultiPicker
                                    options={userList}
                                    search={false}
                                    multiple={true}
                                    placeholder={"Pick Activities"}
                                    placeholderTextColor={'#757575'}
                                    returnValue={"label"}
                                    callback={(res) => setSelectedItems(res)}
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




               <View style={{ marginVertical: 20 }} >
                    <Button title="Find Friends"
                      onPress={searchResult}
                      containerStyle={{ marginVertical: 10 }}
                      buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                      titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                      containerStyle={{ width: "100%" }} />
                  </View>

            
                  
                </View>
              </View>

              <Text style={styles.endText} >Reset Filter</Text>

            </View>

       

          </View>
          <View>
          </View>
        </View>
      ) : null}

      {/*Search Fields area End */}
      {/*Search Result area start */}
      {output ? (
        <View style={{ flex: 3 }}>
        <SearchItems searchResults={searchResults}  navigation={props}/>

          <Button title="Back"
            onPress={showSearchFields}
            containerStyle={{ marginVertical: 20 }}
            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold'}}
            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
            containerStyle={{ width: "100%" }} />
        </View>
      ) : null}


      {/*Search Result area End */}




    </View>
    </ScrollView>
    </SafeAreaView>



  )

}
}
const styles = StyleSheet.create({

    mainContainerField: {
      flex: 1,backgroundColor:"white"
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
      fontFamily: "Cairo_700Bold",
      fontSize: 20,
      textAlign: "center",
      marginVertical: 20,
      marginHorizontal: 20,
  
    },
    endText: {
      fontFamily: "Cairo_700Bold",
      fontSize: 20,
      textAlign: "center",
      marginVertical: 20,
      marginHorizontal: 20, color: "red"
    },
    secondContainer: {
      justifyContent: "center",
      flex: 2
    },
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
    upperTextHeading: {
      fontFamily: "Cairo_700Bold",
      fontSize: 20,
      textAlign: "left",
      marginHorizontal: 10,
      marginVertical:10
    },
    tinyLogo: {
      height: 20,
      width: 20,
      marginTop: -20,
      marginLeft: 20
    },
    postocdeField: {
      flexDirection: "row",
      alignItems: "center",
  
    },
    dropDownStyle: {
      position: "relative",
      zIndex: 35,
      backgroundColor: '#fff',
      marginBottom:10
    },
    seconddropDownStyle:{
      position: "relative",
      zIndex: 30,
      backgroundColor: '#fff',
      marginBottom:10
    },
 
    MultiMainDropDown:{
      borderWidth: 1,
      marginHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
    
  
    },
    DropDown: {
      borderWidth: 1,
      marginHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      height: 40
    },
    MultiDropDown:{
      borderWidth: 1,
      marginHorizontal: 10,
      borderRadius: 5,
      backgroundColor: '#fff',
      position: "relative",
      zIndex: 30, 
      height:40
   
    },
    dropDownActive: {
      fontFamily: 'Montserrat_200ExtraLight'
    },
    TextInput: {
      borderWidth: 1,
      height: 40,
      marginHorizontal: 10,
      paddingHorizontal: 10,
      fontFamily: 'Montserrat_200ExtraLight',
      borderRadius: 5,
      backgroundColor: "white"
    },
  
  
    // Result Conatiner Styles
  
    ResultsMainContainer: {
      flex: 2,
  
    },
    mainContainerOutput: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      marginVertical: 20,
      borderRadius: 5,
      marginVertical: 10,
      marginHorizontal: 10
    },
    mainHeading:
    {
      marginHorizontal: 10,
      marginVertical: 10,
      fontSize: 23,
      fontFamily: 'Cairo_700Bold'
    },
    textContainer: {
      marginHorizontal: 10
    },
   
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
      fontFamily: 'Cairo_700Bold'
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
  { fontFamily: 'Montserrat_200ExtraLight', color: 'black', fontSize: 15 ,marginRight:110},
  iAmContainer: {
    borderWidth: 1,
    marginHorizontal: 10,
    fontFamily: 'Montserrat_200ExtraLight',
    borderRadius:5,
    paddingTop:3
},
androidDropDown: { borderWidth: 1, marginHorizontal: 10, borderRadius: 5 },
androidPickerDropdown: { height: 40, width: "100%", borderWidth: 1, marginHorizontal: 10 }
  
  
  })
  
  export default SearchFields