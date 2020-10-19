
import { Text, StyleSheet, View, Picker ,FlatList , TextInput} from "react-native";

import { Button } from 'react-native-elements';
import { Input } from 'react-native-elements';
import React, { useState, Component ,useEffect} from 'react';
import { Overlay } from 'react-native-elements';
import Http from '../../../Api/Http'
import { AppLoading } from 'expo';
import { startAsync } from "expo/build/AR";
import * as font from 'expo-font';
import { Linking } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
const Searchpostcode = props => {

 
    //OverLay 
    const [visible, setVisible] = useState(true);
    const [selectedValue, setSelectedValue] = useState("");
    const toggleOverlay = () => {
        setVisible(visible);
    };
    useEffect(() => {
        font.loadAsync({
            'Cairo-Bold': require('../../../../assets/fonts/Cairo-Bold.ttf')
              });
          },[])


    // Geetting SearchResult
    const [searchPostcode, setserachPostocde] = useState([])
    const [term, setTerm] = useState('')

   


    return (
        //Html
        <View style={styles.MainBackground}>
      <View  style={styles.SecondMainBackground}>
            <Text style={styles.upperText}>Oops! Looks like we have not yet expanded to your area. 
       <Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com') }>Click here </Text>to suggest that we come to you next</Text>


        
            <View style={{ marginHorizontal: 15,marginVertical:10}}>
            <TextInput placeholder='Postcode' value={term} onChangeText={newValue => setTerm(newValue)} style={{borderWidth:1,paddingHorizontal:8,height:40, borderRadius: 5}}/>
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
     
            <Text style={styles.upperText}>Don’t see your country?<Text onPress={() => Linking.openURL('mailto:contactus@not4dating.com') }> Click here</Text> to tell us where to expand next.</Text>

            <Button containerStyle={{ marginHorizontal: 30, marginVertical: 30 }}
             titleStyle={{fontFamily:'Cairo-Bold',fontSize:20}}
             underlineColor="transparent"
             inputContainerStyle={{borderWidth:"none"}}
                buttonStyle={{ textAlign: "center", alignItems: "center", justifyContent: "center" }}
                title="Search"
                onPress={() => props.navigation.navigate('WelcomeResult',{
                    term,selectedValue
                })}/>
           
</View>





        </View>





    );

};





const styles = StyleSheet.create({
    MainBackground: {
        backgroundColor: "#08080885",
        flex: 1,
        justifyContent:"center"
    },
    SecondMainBackground: {
        backgroundColor: "white",
         marginVertical: 20,
        marginHorizontal: 20,
        marginTop: 50,
        justifyContent:"center"
    },
    upperText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 23,
        fontFamily:'Cairo-Bold',
        lineHeight:30

    },
    lowerText: {
        marginVertical: 20,
        marginHorizontal: 20,
        textAlign: "center",
        fontSize: 20,
        fontFamily:'Cairo-Bold',
    },
    container: {
        alignItems: "center",
        borderWidth: 1,
        marginHorizontal: 15,
        marginVertical:20
    },
    FieldContainer: {
        marginVertical: 10,
        zIndex:200,
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