import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,FlatList,Image, TouchableOpacity } from 'react-native'
import { useRecoilState } from 'recoil';
import { InputText } from '../atoms';
import Navbar from './Navbar';



const Screen1 = ({navigation}) => {
const accessKey = '5bYa6uTXXwhlk76pY17jLTVCYKW-x27eH6WhZn2GxQU'

const [images,setImages] = useState([]);

  const [searchValue,setSearchValue] = useRecoilState(InputText);

  useEffect(()=>{
    const getImage = async()=>{
      const res = await fetch(`https://api.unsplash.com/search/collections?page=1&per_page=30&query=${searchValue}&client_id=${accessKey}`)
      const data = await res.json();
      setImages(data);

    }

    getImage();

  },[searchValue])

images.total == 0 && setSearchValue("all");



const showWallpaper = (item)=>{
  // console.log(item);
navigation.navigate('S2',{clickedImage:`${JSON.stringify(item)}`});

  }

  return (
<View style={styles.container}> 
<Navbar/>

<FlatList 
numColumns={2}
data={images.results}
renderItem={
  ({item})=>(
    <TouchableOpacity onPress={()=>{showWallpaper(item)}}>
    <View style={styles.imageContainer}>

<Image
source={{uri:item.cover_photo.urls.regular}}
style={styles.image}
 />
    </View>
    </TouchableOpacity>
)
}
/>


</View>
  )
}

export default Screen1

const styles = StyleSheet.create({
    container: {
    height:"100%",
      width:"100%",
      alignItems: "center",

    },
    imageContainer:{
      width:200,
      height:200,
      backgroundColor:"#fff",

    },
    image:{
      width:"100%",
      height:"100%",

    }
  });