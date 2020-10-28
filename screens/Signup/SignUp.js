import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Dimensions, Picker, SafeAreaView, ScrollView, Image, Platform, TextInput } from "react-native";

import { Button } from 'react-native-elements';
import { Tooltip, Input } from 'react-native-elements';
import { TabView, SceneMap } from 'react-native-tab-view';
import * as Progress from 'react-native-progress';
import * as font from 'expo-font';
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import Textarea from 'react-native-textarea';
import Http from '../../Api/Http'
  
import DatePicker from 'react-native-datepicker';
import { CheckBox } from "native-base"
import { Overlay } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import MultiSelect from 'react-native-multiple-select';
import { Camera } from 'expo-camera'; 
import ImgToBase64 from 'react-native-image-base64';
import Spinner from 'react-native-loading-spinner-overlay';
import { useFonts, Cairo_700Bold} from '@expo-google-fonts/cairo';
import { Montserrat_200ExtraLight} from '@expo-google-fonts/montserrat';


function FirstRoute({navigation: {navigate}}) {


    //Fields 
    const [userName, setuserName] = useState();
    const [userFirstName, setuserFirstName] = useState();
    const [userLastName, setuserLastName] = useState();
    const [date, setDate] = useState();
    const [checkBoxes, setCheckBox] = useState(0)
    const [message, setMessage] = useState()

    const [errorOverLay, seterrorOverLay] = useState(false);
    const toggleOverlay = () => {
        seterrorOverLay(!errorOverLay);
    };
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    const checkUserDetail = () => {
        if (userName == null) {
            toggleOverlay()
            setMessage("Please Enter Username")
        }
        else if (userFirstName == null) {
            toggleOverlay()
            setMessage("Please Enter First Name")
        }
        else if (userLastName == null) {
            toggleOverlay()
            setMessage("Please Enter Last Name")
        }
        else if (date == null) {
            toggleOverlay()
            setMessage("Please Select Date")
        }
        else if (
            Math.floor(Math.abs(Date.now() - new Date(date).getTime()) /
                (1000 * 3600 * 24) /
                365.25
            ) < 18
        ) {
            toggleOverlay()
            setMessage("age must be 18+")
        }
        else if (checkBoxes == 0) {
            toggleOverlay()
            setMessage("Please Select Checkbox")
        }
        else {
            navigate('Second', {
                userName: userName, userFirstName: userFirstName, userLastName: userLastName,
                userLastName: userLastName, date: date 
            })
        }


    }


    useEffect(() => {




    }, [])
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{
    return (

        <View style={{ backgroundColor: "white", flex: 1 }}>
            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                <Progress.Bar progress={0.3} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
            </View>



            {/*Field Name Container*/}
            <View style={styles.FieldContainer}>
                <Text style={styles.labelText}>What should we call you here?</Text>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={text => setuserName(text)}
                    value={userName}
                    labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                    placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                    placeholder="Username"
                />
            </View>
            <Text style={styles.lowerTextfield}>(This is your username)</Text>


            {/*Field First Name Container*/}
            <View style={styles.FieldContainer}>
                <Text style={styles.labelText}>What is your First name</Text>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={text => setuserFirstName(text)}
                    value={userFirstName}
                />
            </View>
            <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>



            {/*Field Last Name Container*/}
            <View style={styles.FieldContainer}>
                <Text style={styles.labelText}>What is your Last name</Text>
                <TextInput
                    style={styles.TextInput}
                    onChangeText={text => setuserLastName(text)}
                    value={userLastName}
                />
            </View>
            <Text style={styles.lowerTextfield}>(Not for display publicly, for account management only)</Text>


            <View style={styles.FieldContainer}>
                <Text style={styles.labelText}>When is your birthday*?</Text>
                <DatePicker
                    style={styles.datePickerStyle}
                    date={date} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="Date of Birth"
                    format="DD-MM-YYYY"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateIcon: {
                            //display: 'none',
                            position: 'absolute',
                            right: 0,
                            top: 4,
                            marginLeft: 0,
                        },

                    }}
                    onDateChange={(date) => {
                        setDate(date);
                    }}
                />
            </View>
            <Text style={styles.lowerTextfield}>(Only age is displayed publicly)</Text>




            <Text style={styles.notifyText}>*Must be over 18 years old to be a member and use the app By continuing below</Text>

            <View style={styles.CheckboxContainer}>
                <CheckBox color="#fc5185" color="#fc5185" onPress={() => setCheckBox(1)} checked={checkBoxes == 1} style={{ marginRight: 10 }} />
                <Text style={styles.lowerTextfield}>I confirm I am over 18.</Text>


            </View>

            <Button containerStyle={{ marginHorizontal: 20 }}
                onPress={checkUserDetail}
                title="Continue"
                buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10, fontFamily: 'Cairo_700Bold' }}
                titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}

            />


            <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                <Text style={styles.errorText}>{message}</Text>
                <View style={{paddingHorizontal:10}}>
                <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                </View>
            </Overlay>

        </View>

    )
};
}

const SecondRoute = ({ navigation: { navigate }, route }) => {


    const firstRoute = route.params

    const [IamName, setuserIamtName] = useState();
    const [contracted, setContracted] = useState()
    const [consider, setconsider] = useState()
    const [meet, setMeet] = useState()
    const [errorOverLay, seterrorOverLay] = useState(false);
    const [message, setMessage] = useState()
    const toggleOverlay = () => {
        seterrorOverLay(!errorOverLay);
    };

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    const checkFields = () => {
        if (IamName == null) {
            toggleOverlay()
            setMessage("Please Select Items from I am")
        }
        else if (contracted == null) {
            toggleOverlay()
            setMessage("Please Select Items from Wanting to be contracted by")
        }
        else if (consider == null) {
            toggleOverlay()
            setMessage("Please Select Items from I Consider Myself")
        }
        else if (meet == null) {
            toggleOverlay()
            setMessage("Please Select Items from I want to meet")
        }
        else {
            navigate('Third', { Gender: IamName, Contract: contracted, meet: meet, consider: consider, firstRoute: firstRoute })
        }
    }
    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{
    return (
        <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
            <ScrollView>
                <View>
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={0.5} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
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
                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, }}
                            buttonStyle={{ borderRadius: 10 }}
                            title="Why do we ask this if its
  not for dating or sex?"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}

                        />
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


                    <View style={styles.mainContainerPicker}>
                        <Text style={styles.labelText}>And</Text>
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

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10}}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            onPress={checkFields}

                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #E62E2D", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10 }}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            onPress={() => navigate('First')}

                        />
                    </View>

                </View>

                <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                    <Text style={styles.errorText}>{message}</Text>
                    <View style={{paddingHorizontal:10}}>
                    <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                    </View>
                </Overlay>
            </ScrollView>
        </SafeAreaView>

    )
};
}



const ThirdRoute = ({ navigation: { navigate }, route }) => {
    const [image, setImage] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [imageUrls, setImageUrls] = useState()
    const [spinner, setspinner] = useState(false)
    const [doSomething,doSomethingWith] = useState()
    const [imageNotUploaded, setimageNotUploaded] = useState(true)
    const [uploadedImage , setuploadedImage ] = useState(false)
    const  secondRoute = route.params

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
          setimageNotUploaded(false)
        } 
        setspinner(true)
        // Get File Name
        var url = result.uri;
        var filename = url.substring(url.lastIndexOf('/')+1);
  
        //Post File Name
        Http.post('file/' , {
            file: result.base64,
      filename: filename,
      filepath: "public://" + filename,}).then((response) => {

      //Getting Full Url
        Http.get('file/' + response.data.fid).then((imageUrl) => {
            console.log(imageUrl.data)
           setImageUrls(imageUrl.data)
           setuploadedImage(true)
           setspinner(false)

        })

    })
    

    };
    

   
  
      if (hasPermission === false) {
        return <Text>No access to camera</Text>;
      }

      if(!fontsLoaded)
      {
        return(<AppLoading />)
      }
      else{

    return (

        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                <Progress.Bar progress={0.7} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
            </View>
            <Spinner
                visible={spinner}
                textContent={'Uploading Image...'}
                textStyle={styles.spinnerTextStyle}
            />
              
            <View style={{ flex: 2, backgroundColor: "white", alignItems: "center" }}>
            {imageNotUploaded?(
              <View>
                <View style={styles.ImageTopHeading}>
                    <Text style={styles.ImageTopHeadingText}>Choose Your Profile Photo</Text>
                </View>
            
                <View style={styles.imageUploadButton}>
              
                    <Entypo name="camera" size={24} color="black" />
                    <Text style={styles.imageUploadButtonText} >Take a selfie</Text>
                </View>
                
                <View style={styles.ImageTopHeading}>
                    <Text style={styles.ImageTopHeadingText}>
                        OR
           </Text>
                </View>
                <View style={styles.imageUploadButton}>
                    <Entypo name="camera" size={24} color="black" />
                    
                    <Text style={styles.imageUploadButtonText} onPress={pickImage} >Upload from library</Text>

                </View>
                </View>
                ):null}
           {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            </View>
              
       {uploadedImage ?(
            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                    title="Continue"
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                    onPress={() => navigate('Fourth',{secondRoute:secondRoute ,result:imageUrls})}

                />
            </View>
            ):null}    

            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: " #E62E2D", marginVertical: 8, paddingBottom: 10 }}
                    buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10 }}
                    title="Previous"
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                    onPress={() => navigate('Second')}
                />
            </View>

        </View>
    )
}
}
const FourthRoute = ({ navigation: { navigate }, route }) => {

    const thirdRoute = route.params

    const [liveValue, setliveValue] = useState("");
    const [activityValue, setactivityValue] = useState("");

    const [CountryValue, setCountry] = useState("");
    const [Postalcode, setPostal] = useState("")
    const [selectedItems, setSelectedItems] = useState([]);
    const [errorOverLay, seterrorOverLay] = useState(false);
    const [message, setMessage] = useState()

    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
    const toggleOverlay = () => {
        seterrorOverLay(!errorOverLay);
    };

  
    const checkUserDetails = () =>{

        if(CountryValue == null)
        {
            toggleOverlay()
            setMessage("Please Select Items from Country")
        }
       else if(Postalcode == null)
        {
            toggleOverlay()
            setMessage("Please enter Postcode")
        }
        else if(selectedItems == null)
        {
            toggleOverlay()
            setMessage("Please enter Activity")
        }
        else
        {
            navigate('Fifth', { thirdRoute:thirdRoute, CountryValue : CountryValue , Postalcode: Postalcode, Activity: selectedItems})

            
        }

        
    }




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

    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{

    return (
        <ScrollView style={{backgroundColor:"white"}}>
            <SafeAreaView>
                <View >
                    <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                        <Progress.Bar progress={0.9} unfilledColor="white" color="#027BFF" animationType="spring" width={300} borderColor="white" height={20} borderRadius={10} />
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



                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10 }}
                            title="Why isn't my country here?"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}
                            containerStyle={{ marginHorizontal: 10 }}
                            buttonStyle={{ borderRadius: 10 }}
                        />
                    </View>

                    {/*t this postal/Zip code Container*/}
                    <View style={styles.FieldContainer}>
                        <Text style={styles.labelText}>at this postal/Zip code</Text>
                        <TextInput
                            style={styles.TextInput}
                            onChangeText={text => setPostal(text)}
                            value={Postalcode}
                            labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                            placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                        />
                    </View>




                    <View style={styles.mainContainerPicker}>
                        <Button
                            title="Why can i only meet people who live near me?"
                            containerStyle={{ marginHorizontal: 10 }}
                            buttonStyle={{ borderRadius: 10 }}
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 18 }}

                        />
                    </View>



                    <SafeAreaView>
                        <View >
                            <Text style={styles.labelText}>Actvities/Interest</Text>
                            <View style={{borderWidth:1,backgroundColor:"white",marginHorizontal:10,borderRadius:5,marginTop:5}} >

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
                                    fontFamily='Montserrat_200ExtraLight'
                                    itemFontFamily='Montserrat_200ExtraLight'
                                    selectedItemFontFamily='Montserrat_200ExtraLight'
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


                    <Text style={styles.labelText}>Terms and Conditions</Text>

                    <View style={styles.overflowContainer}>

                        <Text style={styles.overflowContainerText}>
                            This Terms of Use (“Agreement”) is a legally binding agreement made by and
                            between Not 4 Dating, LLC
                            (“N4D”) and you, personally and, if applicable, on behalf of the entity for whom you are using this web
                            site (collectively, “you”). This Agreement governs your use of the not4dating.com web site (the “Site”)
                            and the services offered by N4D on the Site (the “Services”), so please read it carefully.

                            BY CLICKING THE “I AGREE” BUTTON OR ACCESSING OR USING ANY PART OF THE SITE, YOU AGREE THAT YOU HAVE
                            READ, UNDERSTAND AND AGREE TO BE BOUND BY THIS AGREEMENT AND THE TERMS AND CONDITIONS REFERENCED HEREIN,
                            WHETHER OR NOT YOU REGISTERED AS A MEMBER. IF YOU DO NOT AGREE TO BE SO BOUND, DO NOT ACCESS OR USE THE
                            WEB SITE. INTERNET TECHNOLOGY AND THE APPLICABLE LAWS, RULES, AND REGULATIONS CHANGE FREQUENTLY.
                            ACCORDINGLY, N4D RESERVES THE RIGHT TO MAKE CHANGES TO THIS AGREEMENT AT ANY TIME. YOUR CONTINUED USE OF
                            THE SITE AND SERVICES CONSTITUTES ASSENT TO ANY NEW PROVISION OF THIS AGREEMENT THAT MAY BE POSTED ON
                            THE WEB SITE.

                            You must be at least eighteen (18) years of age to register with the Site or use the Site. By using the
                            Site, you represent and warrant that you have the right, authority and capacity to enter into this
                            Agreement and to abide by all of the terms and conditions of this Agreement.

                            This Agreement will remain in full force and effect while you use the Site and/or are registered with
                            the Site.

                            Representations and Warranties.
                            Each party represents and warrants to the other party: (i)that it has the full power and authority to
                            enter into and perform its obligations under this Agreement; (ii)the assent to and performance by it of
                            its obligations under this Agreement do not constitute a breach of or conflict with any other agreement
                            or arrangement by which it is bound, or any applicable laws, regulations or rules; and (iii)this
                            Agreement contains legal, valid and binding obligations of the parties executing or assenting to this
                            Agreement, enforceable in accordance with its terms and conditions.
                            You represent and warrant to N4D that: (i)you will not infringe the patent, copyright, trademark, trade
                            secret, right of publicity or other right of any third party in your use of the Site and (ii)you will
                            comply with all applicable laws, rules and regulations in your use of the Site.

                            Prohibited Conduct
                            In your use of the Site, you may not: (i)infringe any patent, trademark, trade secret, copyright, right
                            of publicity or other right of any party; (ii)disrupt or interfere with the security or use of the Site
                            or any web sites linked to the Site; (iii)interfere with or damage the Site, including, without
                            limitation, through the use of viruses, cancel bots, Trojan horses, harmful code, flood pings, denial of
                            service attacks, packet or IP spoofing, forged routing or electronic mail address information, or
                            similar methods or technology; (iv)attempt to use another’s user name or password, impersonate another
                            person or entity, misrepresent your affiliation with a person or entity, including without limitation
                            N4D, or use a false identity; (v)attempt to obtain unauthorized access to the Site or portions of the
                            Site that are restricted from general access; (vi)engage, directly or indirectly, in transmission of
                            “spam,” chain letters, junk mail or any other type of unsolicited solicitation; (vii)collect, manually
                            or through an automatic process, information about other users without their express consent or other
                            information relating to the Site; (viii)submit false or misleading information to N4D; (ix)engage in any
                            activity that interferes with any third party’s ability to use or enjoy the Site; or (x)assist any third
                            party in engaging in any activity prohibited by this Agreement.

                            Privacy Policy
                            You agree to the terms of N4D’s Privacy Policy, which is incorporated by reference into this Agreement.

                            Intellectual Property
                            All materials on the Site, including without limitation, the N4D logo, design, text, graphics, other
                            files, and the selection and arrangement thereof are either owned by N4D or are the property of N4D’s
                            suppliers or licensors. You may not use such materials without permission.

                            NOT4DATING™ and the NOT4DATING logo™ are trademarks owned by N4D. Page headers, custom graphics, button
                            icons and scripts are trademarks or trade dress of N4D. You may not use any of these trademarks, trade
                            dress, or trade names without express permission of N4D. N4D will retain ownership of its intellectual
                            property rights and you may not obtain any rights therein by virtue of this Agreement or otherwise.

                            You will have no right to use, copy, display, perform, create derivative works from, distribute, have
                            distributed, transmit or sublicense from materials or content available on the Site. You may not use any
                            third-party intellectual property without the express written permission of the applicable third party,
                            except as permitted by law.

                            Content Posted by You
                            You will not post on the Site or transmit to N4D members, any obscene, abusive, harassing or illegal
                            material or any material that infringes or violates another party’s rights. You will not provide
                            misleading or false information to N4D or to other members. N4D may review and delete any content which,
                            in N4D’s sole discretion, violates this Agreement or which might be offensive, illegal, or that might
                            violate the rights or threaten the safety of other members. By posting information on the Site, you
                            automatically grant to N4D an irrevocable, perpetual, non-exclusive, royalty-free, worldwide license to
                            use the information and prepare derivative works thereof, and to grant and authorize sublicenses of the
                            foregoing.

                            Linking and Framing
                            You may not deep link to password-protected portions of the Site; or frame, inline link, or similarly
                            display any N4D content or property, including, without limitation, the Site.

                            Confidentiality
                            You may obtain information that is confidential and proprietary to N4D. Such information (“Confidential
                            Information”) may include, without limitation, consumer information, product information, marketing
                            information, and confidential communications from N4D. You shall keep all Confidential Information
                            confidential and not disclose it to any third party. Further, you shall not use the Confidential
                            Information for any purposes.

                            Indemnification
                            You agree to hold N4D and its employees, representatives, agents, attorneys, affiliates, directors,
                            employees, officers, managers and shareholders (the “Indemnified Parties”) harmless from any damage,
                            loss, cost or expense (including without limitation, attorneys’ fees and costs) incurred in connection
                            with any third-party claim, demand or action (“Claim”) brought or asserted against any of the
                            Indemnified Parties: (i)alleging facts or circumstances that would constitute a breach of any provision
                            of this Agreement by you or (ii)arising from, related to, or connected with your use of the Site. If you
                            are obligated to provide indemnification pursuant to this provision, N4D may, in its sole and absolute
                            discretion, control the disposition of any Claim at your sole cost and expense. Without limitation of
                            the foregoing, you may not settle, compromise or in any other manner dispose of any Claim without the
                            consent of N4D.

                            Disclaimers, Exclusions and Limitations
                            N4D PROVIDES THE ON AN “AS IS” AND “AS AVAILABLE” BASIS. N4D DOES NOT REPRESENT OR WARRANT THAT THE
                            SITE, ITS USE, OR ANY INFORMATION THEREFROM: (I)WILL BE UNINTERRUPTED, (II)WILL BE FREE OF DEFECTS,
                            INACCURACIES OR ERRORS, (III)WILL MEET YOUR REQUIREMENTS, OR (IV) WILL OPERATE IN THE CONFIGURATION OR
                            WITH OTHER HARDWARE OR SOFTWARE YOU USE.
                            N4D DOES NOT SCREEN ITS MEMBERS, CONDUCT BACKGROUND CHECKS ON ITS MEMBERS, OR CONFIRM THE ACCURACY OF
                            THE STATEMENTS OF ITS MEMBERS. N4D MAKES NO REPRESENTATIONS OR WARRANTIES REGARDING THE CONDUCT OF
                            MEMBERS. YOU AGREE TO TAKE REASONABLE PRECAUTIONS IN ALL INTERACTIONS WITH OTHER N4D MEMBERS

                            N4D MAKES NO WARRANTIES OTHER THAN THOSE MADE EXPRESSLY IN THIS AGREEMENT, AND HEREBY DISCLAIMS ANY AND
                            ALL IMPLIED WARRANTIES, INCLUDING WITHOUT LIMITATION, WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE,
                            MERCHANTABILITY AND NON-INFRINGEMENT.
                            N4DWILL NOT BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY CONSEQUENTIAL, INCIDENTAL, INDIRECT, PUNITIVE OR
                            SPECIAL DAMAGES (INCLUDING DAMAGES RELATING TO LOST PROFITS, LOST DATA OR LOSS OF GOODWILL) ARISING OUT
                            OF, RELATING TO OR CONNECTED WITH THE USE OF THE SITE, BASED ON ANY CAUSE OF ACTION, EVEN IF ADVISED OF
                            THE POSSIBILITY OF SUCH DAMAGES.

                            Limitation of Liability
                            EXCEPT FOR A BREACH OF A PARTY’S REPRESENTATIONS AND WARRANTIES OR IN CONNECTION WITH YOUR INDEMNITY
                            OBLIGATIONS UNDER THIS AGREEMENT, IN NO EVENT WILL THE LIABILITY OF EITHER PARTY IN CONNECTION WITH THIS
                            AGREEMENT OR THE SITE EXCEED $100.

                            Force Majeure
                            N4D will not be liable for failing to perform under this Agreement by the occurrence of any event beyond
                            its reasonable control, including, without limitation, a labor disturbance, an Internet outage or
                            interruption of service, a communications outage, failure by a service provider to N4D to perform, fire,
                            terrorism, natural disaster or war.

                            Arbitration
                            All disputes arising out of or relating to this Agreement (including its formation, performance or
                            alleged breach) or your use of the Site will be exclusively resolved under confidential binding
                            arbitration held in New York, New York before and in accordance with the Rules of the American
                            Arbitration Association. The arbitrator’s award will be binding and may be entered as a judgment in any
                            court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under
                            this Agreement will be joined to an arbitration involving any other party subject to this Agreement,
                            whether through class arbitration proceedings or otherwise. Notwithstanding the foregoing, N4D will have
                            the right to seek injunctive or other equitable relief in state or federal court located in New York,
                            New York to enforce this Agreement or prevent an infringement of a third party’s rights. In the event
                            equitable relief is sought, each party hereby irrevocably submits to the personal jurisdiction of such
                            court.

                            Waiver of Class Action Rights
                            By entering into this Agreement, you hereby irrevocably waive any right you may have to join claims with
                            those of others in the form of a class action or similar procedural device. Any claims arising out of,
                            relating to, or connected with this Agreement must be asserted individually.

                            Limitation of Actions
                            You acknowledge and agree that, regardless of any statute or law to the contrary, any claim or cause of
                            action you may have arising out of, relating to, or connected with your use of the Site must be filed
                            within one calendar year after such claim or cause of action arises, or forever be barred.

                            Changes to the Web Site or Service
                            N4D may, in its sole discretion, change, modify, suspend, make improvements to or discontinue any aspect
                            of the Site, temporarily or permanently, at any time without notice to you, and N4D will not be liable
                            for doing so. Without limiting the foregoing, and notwithstanding anything contained in this Agreement,
                            N4D will have the right from time to time to change the amount of the fees or institute new fees
                            relating to the Site. Further, N4D may impose limits on the amount of storage space for members, or
                            delete materials: (i)stored for an excessive period of time; (ii)that are out-of-date; or (iii)relating
                            to an inactive member account.

                            Termination
                            N4D will have the right to terminate your account or your access to the Web Site if it reasonably
                            believes you have breached any of the terms and conditions of this Agreement or N4D discontinues the
                            Site.

                            Effect of Termination
                            If your account is terminated, N4D may delete any web sites, files, graphics or other content or
                            materials relating to your use of the Site on N4D’s servers or otherwise in its possession and N4D will
                            have no liability to you or any third party for doing so. Following termination, you will not be
                            permitted to use the Site. If your account or your access to the Site is terminated, N4D reserves the
                            right to exercise whatever means it deems necessary to prevent unauthorized access to the Site,
                            including, but not limited to, technological barriers, IP mapping, and direct contact with your Internet
                            Service Provider.

                            Survival
                            This Agreement will survive indefinitely unless and until N4D chooses to terminate it, regardless of
                            whether any account you open is terminated by you or N4D or if you have the right to access or use the
                            Site.

                            This Agreement contain the entire understanding of the you and N4D regarding you and N4D regarding the
                            use of the Site, and supersedes all prior and contemporaneous agreements and understandings between you
                            and N4D regarding the use of the Site.

                            Notices and Electronic Communications
                            All notices required or permitted to be given under this Agreement will be in writing and delivered to
                            the other party by any of the following methods: (i)hand delivery, (ii)certified U.S. mail, return
                            receipt requested, postage prepaid, (iii)overnight courier, or (iv)electronic mail. If you give notice
                            to N4D, you must use the address shown on the Site. If N4D provides notice to you, it will use the
                            contact information provided by you to N4D. All notices will be deemed received and effective as
                            follows: (i)if by hand-delivery, on the date of delivery, (ii)if by delivery by U.S. mail, on the date
                            of receipt appearing on a return receipt card, (iii)if by overnight courier, on the date receipt is
                            confirmed by such courier service, or (iv)if by electronic mail, 24 hours after the message was sent, if
                            no “system error” or other notice of non-delivery is generated. Each party agrees that any notice that
                            it receives from the other party electronically satisfies any legal requirement that such communications
                            be in writing.

                    </Text>


                    </View>
                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                            buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10}}
                            title="Continue"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            onPress={checkUserDetails}
                        />
                    </View>

                    <View style={styles.mainContainerPicker}>
                        <Button
                            containerStyle={{ marginHorizontal: 10, backgroundColor: " #E62E2D", marginVertical: 8, paddingBottom: 10 }}
                            buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10}}
                            title="Previous"
                            titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                            onPress={()=> navigate('Third')}

                        />
                    </View>

                    <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                    <Text style={styles.errorText}>{message}</Text>
                    <View style={{paddingHorizontal:10}}>
                    <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                    </View>
                </Overlay>

                </View>

            </SafeAreaView>
        </ScrollView>
    )



}
}



const FifthRoute = ({ navigation: { navigate }, route},props) => {

    const routerOutput = route.params

    const [enterEmail,setEnterEmail] = useState()
    const [ ConfirmEmail ,setConfirmEmail] = useState()
    const [errorOverLay, seterrorOverLay] = useState(false);
    const [message, setMessage] = useState()
    const [spinner, setspinner] = useState(false)
    const [imageUrls ,setImageUrls] = useState()
    let [fontsLoaded] = useFonts({
        Cairo_700Bold,
        Montserrat_200ExtraLight
      });
     
    const toggleOverlay = () => {
        seterrorOverLay(!errorOverLay);
    };

    const submitDetails = () =>{
            setImageUrls(route.params.thirdRoute.result)
        
        let ts = Math.round(new Date().getTime() / 1000);
        //setspinner(true)
         Http.post("user/register",{
            name: routerOutput.thirdRoute.secondRoute.firstRoute.userName,
            mail: enterEmail,
            conf_mail: ConfirmEmail,
            timezone: ts,
            login: ts,
            access: ts,
      
            field_consider_myself_:{
              und:routerOutput.thirdRoute.secondRoute.consider
            },
            field_first_name: {
              und: [
                {
                  value: routerOutput.thirdRoute.secondRoute.firstRoute.userFirstName,
                },
              ],
            },
            field_last_name: {
              und: [
                {
                  value: routerOutput.thirdRoute.secondRoute.firstRoute.userLastName
                },
              ],
            },
            field_zip_code: {
              und: [
                {
                  postal_code: routerOutput.Postalcode,
                  country: routerOutput.CountryValue,
                },
              ],
            },
            field_birth_date: {
              und: routerOutput.thirdRoute.secondRoute.firstRoute.date      
            },
      
            field_gender: {
              und: routerOutput.thirdRoute.secondRoute.Gender,
            },
      
            field_activities_interests: {
              und:routerOutput.Activity,
            },
            field_look_meet: {
              und: routerOutput.thirdRoute.secondRoute.meet,
            },
            picture_upload: routerOutput.thirdRoute.result,
      
            picture: routerOutput.thirdRoute.result,
      
            field_user_avatar: {
              und: [routerOutput.thirdRoute.result],
            },
      
            field_want_contarct: {
              und: routerOutput.thirdRoute.secondRoute.Contract,
            },
          }).then((response) => {
              if(response.status == 200)
              {
                toggleOverlay()
                setMessage("Account Created Successfully Please verify your mail")
                setspinner(false)
              }
              setspinner(false)
     
        }).catch((error)=>{
 
            if(error.response.status == 406)
            {  
              toggleOverlay()
              setMessage("Username is already taken/Email is already taken")
              setspinner(false)
            }
       

        })





    }
     












    if(!fontsLoaded)
    {
      return(<AppLoading />)
    }
    else{



    return (
        <View >

            <View style={{ marginVertical: 20, borderWidth: 1, borderRadius: 20, marginHorizontal: 10 }}>
                <Progress.Bar progress={1} unfilledColor="white" color="#027BFF" animationType="spring" width={350} borderColor="white" height={20} borderRadius={10} />
            </View>

            <Spinner
                visible={spinner}
                textContent={'Uploading Image...'}
                textStyle={styles.spinnerTextStyle}
            />

            <View style={styles.FieldContainer}>
     
                <TextInput
                    style={styles.TextInput}
                    onChangeText={text => setEnterEmail(text)}
                    value={enterEmail}
                    labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                    placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
                    placeholder="Enter email address"
                />
            </View>
            <View style={styles.FieldContainer}>
     
     <TextInput
         style={styles.TextInput}
         onChangeText={text => setConfirmEmail(text)}
         value={ConfirmEmail}
         labelStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
         placeholderStyle={{ fontFamily: 'Montserrat_200ExtraLight' }}
         placeholder="Confirm email address"
     />
      </View>
        

                <Overlay isVisible={errorOverLay} onBackdropPress={toggleOverlay}>
                    <Text style={styles.errorText}>{message}</Text>
                    <View style={{paddingHorizontal:10}}>
                    <View style={{paddingHorizontal:10}}>
                    <Button title="Ok" containerStyle={styles.buttoncontainerStyle} buttonStyle={styles.successButton} titleStyle={styles.tittleText} onPress={toggleOverlay} />
                    </View>
                    </View>
                </Overlay>

            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 10, backgroundColor: "green", marginVertical: 8, alignItems: "center", justifyContent: "center" }}
                    buttonStyle={{ marginHorizontal: 10, backgroundColor: "green", borderRadius: 10 }}
                    title="Continue"
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                    onPress={submitDetails}
                />
            </View>

            <View style={styles.mainContainerPicker}>
                <Button
                    containerStyle={{ marginHorizontal: 15, marginVertical: 15, height: 100, fontFamily: "roboto-bold" }}
                    buttonStyle={{ fontFamily: "roboto-bold" }}
                    buttonStyle={{ backgroundColor: "#E62E2D", borderRadius: 10 }}
                    title="Previous"
                    titleStyle={{ fontFamily: 'Cairo_700Bold', fontSize: 20 }}
                    onPress={()=>navigate('Home')}
                />
            </View>




        </View>


    )
}
}




//Export Upper Content

const Tab = createMaterialTopTabNavigator();

const SignUp = props => {

   
    const [index, setIndex] = React.useState(0);




    return (
        <View style={{ flex: 1 }}>

            <NavigationContainer>
                <Tab.Navigator tabBarOptions={{ activeTintColor: 'transparent', inactiveTintColor: '#D3D3D3', indicatorStyle: { backgroundColor: 'transparent' } }} tabBarPosition='bottom'>
                    <Tab.Screen name="First"  options={{ tabBarLabel: '' }}  component={FirstRoute}/>
                    <Tab.Screen name="Second" component={SecondRoute} options={{ tabBarLabel: '' }} />
                    <Tab.Screen name="Third" component={ThirdRoute} options={{ tabBarLabel: '' }} />
                    <Tab.Screen name="Fourth" component={FourthRoute} options={{ tabBarLabel: '' }}  />
                    <Tab.Screen name="Fifth"  options={{ tabBarLabel: '' }}  component={FifthRoute}/>

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

        fontSize: 14,
        marginLeft: 10,
        marginBottom: 10,
        fontFamily: 'Montserrat_200ExtraLight'

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
        height: 40,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        fontFamily: 'Montserrat_200ExtraLight',
        borderRadius: 5,

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
    datePickerStyle: {

        marginLeft: 10,
        width: "95%",
        borderWidth: 1,
        borderRadius: 5


    },
    notifyText: {
        fontFamily: "Cairo_700Bold",
        fontSize: 14,
        color: "grey",
        marginHorizontal: 10
    },
    CheckboxContainer: {
        flexDirection: "row",
        marginVertical: 10
    },
    ImageTopHeadingText: {
        fontSize: 20,
        fontFamily: 'Montserrat_200ExtraLight',
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center"
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
        justifyContent: "center"
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
      errorText: {
        fontFamily: "Cairo_700Bold",
        paddingHorizontal: 20,
        paddingVertical: 20,
        fontSize: 16,
        textAlign: "center"
    }

});




export default SignUp