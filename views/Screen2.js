import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

import { useRecoilState } from 'recoil';
import { InputText } from '../atoms';

function Screen2({ route }) {
  const { clickedImage } = route.params;
  const [imagedata, setImageData] = useState();
  const [imageUrl, setImageUrl] = useState('');
  const [searchValue,setSearchValue] = useRecoilState(InputText);
  const [loading,setLoading] = useState(false);
  useEffect(() => {
    const image = JSON.parse(clickedImage);
   
    setImageData(image);
    // console.log(image);
    const imageURL = image?.cover_photo.urls.regular;
    setImageUrl(imageURL);
  }, []);

  const downloadImage = async () => {
    const fileName = 'image.jpg';
    const directory = FileSystem.documentDirectory + 'Download/'; // Directory path for saving the image
    const fileUri = directory + fileName;
  
    try {
      // Create the directory if it doesn't exist
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
  
      await FileSystem.downloadAsync(imageUrl, fileUri);
      console.log('Image downloaded:');
  
     
  
      // Request the MEDIA_LIBRARY permission using expo-file-system's requestPermissionsAsync
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (!granted) {
        console.log('Permission denied for media library access.');
        return;
      }
  
      // Save the file to the device's media library
      await MediaLibrary.saveToLibraryAsync(fileUri);
      console.log('Image saved to media library.');
  
       // Share the downloaded image using Expo's Sharing API
       await Sharing.shareAsync(fileUri);
      // alert('Image Downloaded and Shared Successfully.');
    } catch (error) {
      console.log('Image download error:', error);
      alert('Failed to download the image.');
    }
  };
  const showNextImage = async()=>{
    setLoading(true);
    try{
    const data = await fetch (`https://source.unsplash.com/900x1600/?${searchValue}`)
// console.log(data);
    setImageUrl(data.url);
setLoading(false); 
    }
    catch(err){
      console.log(err);
    }
     setLoading(false); 
  }
  return (
    <View style={styles.imageContainer}>
    {loading ? 
      <ActivityIndicator size='large' color="#312651" /> 

      :
      <Image
          source={{ uri: imageUrl }}
          style={styles.image}
        />

    }
       
      <View style={styles.btnContainer}>
      <TouchableOpacity style={styles.downloadBtn} onPress={downloadImage}>
        <Text style={styles.downloadText}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.nextBtn} onPress={showNextImage}>
        <Text style={styles.nextText}>Next</Text>
       </TouchableOpacity>
       </View>
    </View>
  );
}

export default Screen2;

const styles = StyleSheet.create({
  imageContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
    justifyContent:"center",
    flexDirection:"row",
  },
  image: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  downloadBtn:{
    // position:"relative",
    // width:"8%",
    flexDirection:"row",
    backgroundColor:"black",
    paddingHorizontal:20,
    paddingVertical:10,
    justifyContent: 'center',
    borderRadius:10,
    elevation:10,  
},
nextBtn:{
    // position:"relative",
    // width:"8%",
    // height:"auto",
    flexDirection:"row",
    backgroundColor:"white",
    paddingHorizontal:20,
    paddingVertical:10,
    justifyContent: 'center',
    borderRadius:10,
    elevation:10,  
},
downloadText:{
    fontSize:20,
    color:"white",
},
nextText:{
    fontSize:20,
    color:"black",
    
},
btnContainer:{

flexDirection:"row",
  justifyContent:"space-evenly",
  width:"100%",
 
  position:"absolute",
  bottom:15,
}
});
