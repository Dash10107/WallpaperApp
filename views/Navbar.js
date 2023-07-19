import React from 'react'
import { StyleSheet, Text, View ,TextInput,Image} from 'react-native'
import searchIcon from "../assets/download (1).png";
import { useRecoilState } from 'recoil';
import { InputText } from '../atoms';

const Navbar = () => {
  const [searchValue,setSearchValue] = useRecoilState(InputText);

  const handleChangeText=(text)=>{
    setSearchValue(text);

  }

  return (
<View style={styles.container}>
{/* <Text>Navbar</Text> */}
<View style={styles.searchContainer}>
    <Image source={searchIcon} style={styles.icon} />
    <TextInput style={styles.searchInput}
    placeholder="Search..."
    onChangeText={handleChangeText} />
</View>
</View>
  )
}

export default Navbar

const styles = StyleSheet.create({
    container: {
      // flex: 1,
        paddingVertical:10,
      width:"100%",
      backgroundColor: "#fff",
      alignItems: "center",
      // justifyContent: "center",
    },
    searchContainer:{
      display:"flex",
      flexDirection:"row",
      alignItems:"center",
      backgroundColor:"#fff",
      elevation:10,
      borderRadius:10,
      padding:10,
      width:"80%",
    },
    icon:{
      width:20,
      height:20,

    },
    searchInput:{
      width:"90%",
      fontSize:20,
      paddingLeft:10,

    }
  });