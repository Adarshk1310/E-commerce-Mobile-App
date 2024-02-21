import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserType } from '../UserContext';

import "core-js/stable/atob";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const AddressScreen = () => {
    const navigation =useNavigation();
    const[name,setName]=useState("");
    const[mobileNo,setMobileNo]=useState("");
    const[houseNo,setHouseNo]=useState("");
    const[street,setStreet]=useState("");
    const[landmark,setLandmark]=useState("");
    const[postalCode,setPostalCode ]=useState("");
    const {userId,setUserId}= useContext(UserType);

    useEffect(()=>{
        const fetchUser =async()=>{
           try {
            const token = await AsyncStorage.getItem('authToken');
           const decodedToken = jwtDecode(token);
           const user = decodedToken.userId;
           setUserId(user)
           } catch (error) {
            console.log("Error in fetching authToken",error)
           }
        }
        fetchUser();
    },[])


    const handleAddAddress =()=>{
        const address = {
            name,
            mobileNo,
            houseNo,
            street,
            landmark,
            postalCode
        }
        axios.post('http://"Your IP Address":8000/addresses',{userId,address}).then((response)=>{
            Alert.alert('Success','Addresses added successfully');
            setName('');
            setMobileNo('');
            setHouseNo('');
            setStreet('');
            setLandmark('');
            setPostalCode('')
            setTimeout(()=>{
                navigation.goBack();
            },200)
        }).catch((err)=>{
            console.log("Error in handle Address:",err);
            Alert.alert('Error','Failed to add address')
        })
    }

   


  return (
    <ScrollView style={{marginTop:50}} >
      <View style={{height:50,backgroundColor:'#00CED1'}} />
      <View style={{padding:10 }} >
        <Text style={{fontSize:17,fontWeight:'bold'}} >Add a new Address</Text>
        <TextInput style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholderTextColor={'black'} placeholder='India' />
        <View style={{marginVertical:10}}>
            <Text style={{fontSize:15,fontWeight:'bold'}} >Full Name (First and Last Name)</Text>
            <TextInput value={name} onChangeText={(text)=>setName(text)} style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholder='Enter you name' placeholderTextColor={'black'} />
        </View>
        <View style={{fontSize:15,fontWeight:'bold'}} >
            <Text style={{fontSize:15,fontWeight:'bold'}}  >Mobile number</Text>
            <TextInput value={mobileNo} onChangeText={(text)=>setMobileNo(text)} style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholder='Mobile No.' placeholderTextColor={'black'} />
        </View>
        <View style={{marginVertical:10,fontSize:15,fontWeight:'bold'}} >
            <Text style={{fontSize:15,fontWeight:'bold'}}  >Flat,House No.,Building,Company</Text>
            <TextInput value={houseNo} onChangeText={(text)=>setHouseNo(text)} style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholder='' placeholderTextColor={'black'} />
        </View>
        <View style={{marginVertical:10,fontSize:15,fontWeight:'bold'}} >
            <Text style={{fontSize:15,fontWeight:'bold'}}  >Area,Street,Sector,Village</Text>
            <TextInput value={street} onChangeText={(text)=>setStreet(text)} style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholder='' placeholderTextColor={'black'} />
        </View>

        <View style={{marginVertical:10,fontSize:15,fontWeight:'bold'}} >
            <Text style={{fontSize:15,fontWeight:'bold'}} >Landmark</Text>
            <TextInput value={landmark} onChangeText={(text)=>setLandmark(text)} style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholder='Eg: near appollo hospital' placeholderTextColor={'black'} />

        </View>
        <View>
            <Text style={{fontSize:15,fontWeight:'bold'}} >Pincode</Text>
            <TextInput value={postalCode} onChangeText={(text)=>setPostalCode(text)} style={{padding:10,borderColor:'#D0D0D0',borderWidth:1,marginTop:10,borderRadius:5}} placeholder='Enter Pincode' placeholderTextColor={'black'} />
        
        </View>
        <Pressable onPress={handleAddAddress} style={{backgroundColor:'#FFC72C',padding:19,borderRadius:6,justifyContent:'center',alignItems:'center',marginTop:20}} >
            <Text style={{fontWeight:'bold'}}>Add Address</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}

export default AddressScreen

const styles = StyleSheet.create({})