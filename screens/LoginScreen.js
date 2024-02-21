import { StyleSheet, Text, View,SafeAreaView,Image,KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './SplashScreen';

const LoginScreen = () => {

    const [email,setEmail] =useState('');
    const [password,setPassword] = useState('');
    const navigation =useNavigation();
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const checkLoginStatus = async()=>{
            try {
                const token =await AsyncStorage.getItem('authToken');
                if(token){
                    navigation.replace('Main');
                    setLoading(false);
                }
            } catch (error) {
                console.log("Error message:",error);
            }
        }

        checkLoginStatus();
        setLoading(false);
    },[])
    if(loading){
        return <SplashScreen />
    }

    const handleLogin=()=>{
        const user={
            email:email,
            password:password
        }
        axios.post("http://"Your IP Address":8000/login", user).then((res)=>{
      
        const token =res.data.token;
        AsyncStorage.setItem('authToken',token);
        navigation.replace('Main');
        }).catch((err)=>{
            Alert.alert("Login Error",'Invalid Email')
            console.log(err);
        })
    }



  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View >
        <Image style={styles.Image} source={{uri:"https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"}}/>
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems:'center'}}>
            <Text style={styles.LoginText}>Login into your Account</Text>
        </View>

        <View style={{marginTop:70}}>
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
        <Pressable style={styles.pressableStyle} onPress={handleLogin}>
            <Text style={{textAlign:'center',color:'white',fontSize:16,fontWeight:'bold'}}>Login</Text>
        </Pressable>
        <Pressable onPress={()=>navigation.navigate('Register')} style={{marginTop:15}}>
            <Text style={{textAlign:'center',color:'gray',fontSize:16}}>Don't have an account? Sign Up</Text>
        </Pressable>

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default LoginScreen

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