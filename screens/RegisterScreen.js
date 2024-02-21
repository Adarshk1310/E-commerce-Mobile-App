import { StyleSheet,TextInput, Text, View,SafeAreaView,Pressable,Image,KeyboardAvoidingView, Alert } from 'react-native'
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';


const RegisterScreen = () => {

    const [email,setEmail] =useState('');
    const [name,setName] =useState('');
    const [password,setPassword] = useState('');
    const navigation =useNavigation();

    const handleRegister =()=>{
        const user = {
            name:name,
            email:email,
            password:password
        }

       
        //send a post request to the backend 
        axios.post("http://"Your IP Address":8000/register", user).then((res)=>{
            console.log("this is response",res.data.message);
            Alert.alert("Registration successfull",'You have registered successfully');
            setName("");
            setEmail("");
            setPassword("");
        }).catch((err)=>{
            Alert.alert('Registration Error','an error occurred during registration');
            console.log("Registration failed from handle Register",err)
        })

        
    }



  return (
    <SafeAreaView style={styles.safeAreaView}>
    <View>
      <Image style={styles.Image} source={{uri:"https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"}}/>
    </View>

    <KeyboardAvoidingView>
      <View style={{alignItems:'center'}}>
          <Text style={styles.LoginText}>Register to your Account</Text>
      </View>

      <View style={{marginTop:70}}>
      <View style={styles.EnterEmail}>
      <MaterialIcons style={{marginLeft:8}} name="person" size={24} color="gray" />
      <TextInput value={name} onChangeText={(text)=>setName(text)} style={{color:'gray',marginVertical:10,width:300,fontSize:email?16:16}} placeholder='Enter your name' />
      </View>
      </View> 

      <View style={{marginTop:10}}>
      <View style={styles.EnterEmail}>
      <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="gray" />
      <TextInput value={email} onChangeText={(text)=>setEmail(text)} style={{color:'gray',marginVertical:10,width:300,fontSize:email?16:16}} placeholder='Enter your email' />
      </View>
      </View> 

      <View style={{marginTop:10}}>
      <View style={styles.EnterEmail}>
      <AntDesign style={{marginLeft:8}} name="lock" size={24} color="gray" />
      <TextInput value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={true} style={{color:'gray',marginVertical:10,width:300,fontSize:password?16:16}} placeholder='Enter your password' />
      </View>
      </View>
      
      <View style={{marginTop:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
          <Text>Keep me logged in</Text>
          <Text style={{color:'#007FFF',fontWeight:500}}>Forgot password</Text>

      </View>

      <View style={{marginTop:80}} />
      <Pressable style={styles.pressableStyle} onPress={handleRegister}>
          <Text style={{textAlign:'center',color:'white',fontSize:16,fontWeight:'bold'}}>Register</Text>
      </Pressable>
      <Pressable onPress={()=>navigation.goBack()} style={{marginTop:15}}>
          <Text style={{textAlign:'center',color:'gray',fontSize:16}}>Already have an account? Sign In</Text>
      </Pressable>

    </KeyboardAvoidingView>
  </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    safeAreaView:{
        flex:1,
        backgroundColor:'White',
        alignItems:'center',
        marginTop:50
    },
    Image:{
        height:100,
        width:150
    },
    LoginText:{
        fontSize:17,
        fontWeight:'bold',
        marginTop:12,
        color:'#041E42'
    },
    EnterEmail:{
        flexDirection:'row',
        alignItems:'center',
        gap:5,
        backgroundColor:'#D0D0D0',
        paddingVertical:5,
        borderRadius:5,
        marginTop:30
    },
    pressableStyle:{
        width:200,
        backgroundColor:'#FEBE10',
        borderRadius:6,
        marginLeft:'auto',
        marginRight:'auto',
        padding:15
        
    }
})