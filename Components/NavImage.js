import React ,{useState,useEffect}from "react";
import { Text, StyleSheet ,Image ,View , TouchableOpacity} from "react-native";
import { Button, Overlay } from 'react-native-elements';
import { AsyncStorage } from 'react-native';
const NavImage = props =>{
  const [Login,setLogin] = useState(false)
  useEffect(() => {

})

return(

  <View>
    <TouchableOpacity>
    <Image source={require('../../assets/Images/header-logo.png')}/>
   </TouchableOpacity>
  </View>
)
}

export default NavImage