import { ScrollView, StyleSheet, Text, View,Pressable,TextInput } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import { Entypo } from '@expo/vector-icons';

const AddAddressScreen = () => {

    const navigation = useNavigation();
    const [addresses,setAddresses]=useState([]);
    const {userId,setUserId}= useContext(UserType);
    


    
    useEffect(()=>{
      fetchAddresses();
    },[])

    const fetchAddresses = async()=>{
      
      try {
        const response = await axios.get(`http://"Your IP Address":8000/addresses/${userId}`);
        const {addresses} =response.data;
        setAddresses(addresses);

      } catch (error) {
        console.log("Error:",error)
      }
    }

    // refresh the addresses when the screen comes into focus 

    useFocusEffect(
      useCallback(()=>{
        fetchAddresses();
      },[])
    )


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:50}} >
       <View style={{backgroundColor:'#00CED1',padding:10,flexDirection:'row',alignItems:'center'}}>
          <Pressable style={styles.searchPressable}>
          <AntDesign style={{paddingLeft:10}} name="search1" size={22} color="black" />
          <TextInput placeholder='Search' />
          </Pressable>
          <Feather name="mic" size={24} color="black" />
        </View>
        <View style={{padding:10}} >
            <Text style={{fontSize:20,fontWeight:'bold'}} >Your Addresses</Text>
            <Pressable onPress={()=>navigation.navigate('Add')} style={{flexDirection:'row',
                                alignItems:'center',
                                justifyContent:'space-between',
                                marginTop:10,
                                borderColor:'#D0D0D0',
                                borderWidth:1,
                                borderLeftWidth:0,
                                borderRightWidth:0,
                                paddingVertical:7,
                                paddingHorizontal:5}} >
                <Text>Add a new Address</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </Pressable>
            <Pressable>
                {/* all the addresses */}
                {addresses.map((item,index)=><Pressable key={index} style={{borderWidth:1,borderColor:'#D0D0D0',padding:10,flexDirection:'column',gap:5,marginVertical:10}}>
                  <View style={{flexDirection:'row',alignItems:'center',gap:3}} >
                    <Text style={{fontSize:15,fontWeight:'bold'}} >{item.name}</Text>
                    <Entypo name="location-pin" size={24} color="red" />
                  </View>
                  <Text style={{fontSize:15,color:'#181818'}} >{item?.houseNo}, {item?.landmark}</Text>
                  <Text style={{fontSize:15,color:'#181818'}} >{item?.street}</Text>
                  <Text style={{fontSize:15,color:'#181818'}} >India, New Delhi</Text>
                  <Text style={{fontSize:15,color:'#181818'}} >{item?.postalCode}</Text>
                  <Text style={{fontSize:15,color:'#181818'}} >{item?.mobileNo}</Text>
                  <View style={{flexDirection:'row',alignItems:'center',gap:10,marginTop:10}}>
                    <Pressable style={{backgroundColor:'#F5F5F5',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:'#D0D0D0'}}>
                      <Text>Edit</Text>
                    </Pressable>
                    <Pressable style={{backgroundColor:'#F5F5F5',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:'#D0D0D0'}}>
                      <Text>Remove</Text>
                    </Pressable>

                    <Pressable style={{backgroundColor:'#F5F5F5',paddingHorizontal:10,paddingVertical:6,borderRadius:5,borderWidth:0.9,borderColor:'#D0D0D0'}}>
                      <Text>Set as Default</Text>
                    </Pressable>
                  </View>

                </Pressable>)}
            </Pressable>
        </View>


    </ScrollView>
  )
}

export default AddAddressScreen

const styles = StyleSheet.create({
    searchPressable:{
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:7,
        gap:10,
        backgroundColor:'white',
        borderRadius:3,
        height:38,
        flex:1
      },
})