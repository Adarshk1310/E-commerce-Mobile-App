import { StyleSheet, Image, View } from 'react-native'
import React from 'react'

const SplashScreen = () => {

  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Image style={styles.Image} source={{uri:"https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png"}}/>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    Image:{
        height:100,
        width:150
    },
})