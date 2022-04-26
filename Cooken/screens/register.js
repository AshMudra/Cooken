import { View, Text, TextInput, ImageBackground, StyleSheet, useWindowDimensions, TouchableWithoutFeedback, Keyboard} from 'react-native'
import React, { useState } from 'react'
import GenericButton from '../ButtonComponents/GenericButton';
import Checkbox from 'expo-checkbox';
import { userService } from '../Services/userService';
// require('dotenv').config()
// import { userService } from '../Services/userService'

const baseURL = process.env.baseURL;

const img = { uri: 'https://firebasestorage.googleapis.com/v0/b/cooken-imgs.appspot.com/o/screenshot%20no%20lines.png?alt=media&token=8b555913-fa90-4848-93db-96d0bce147e1'}

export default function register({ navigation }) {
  console.log(baseURL)
  const windowHeight = useWindowDimensions().height;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [favCuisines, setFavCuisines] = useState([])
  //checkbox states
  const [italianIsChecked, setItalianIsChecked] = useState({ checked: false , value: 'italian'});
  const [greekIsChecked, setGreekIsChecked] = useState({checked: false, value: 'greek'});
  const [americanIsChecked, setAmericanIsChecked] = useState({checked: false, value:'american'});
  const [chineseIsChecked, setChineseIsChecked] = useState({checked: false, value:'chinese'});
  const [mexicanIsChecked, setMexicanIsChecked] = useState({checked: false, value:'mexican'});
  const [indianIsChecked, setIndianIsChecked] = useState({checked: false, value:'indian'});

  const backToLogin = () => navigation.navigate('Login');

  async function handleSubmit(e)  {
    e.preventDefault();
    const newUser = { email, password, username, favCuisines };
    //TODO take out ip and replace with .env value
    fetch(`http://192.168.1.117:3001/register`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser)
    }).then(() => {
      console.log(newUser)
    })
    setEmail('');
    setPassword('');
    setUsername('');
    setFavCuisines([]);
    setItalianIsChecked(false);
    setGreekIsChecked(false);
    setAmericanIsChecked(false);
    setChineseIsChecked(false);
    setMexicanIsChecked(false);
    setIndianIsChecked(false);
    navigation.navigate('Login');
    }
    //checkbox add to favecuisine array
    const saveCheck = (obj) => {
      if(!obj.checked) {
        setFavCuisines([...favCuisines, obj.value])
      } else {
        setFavCuisines(favCuisines.filter((cuisine)=> {
          return cuisine !== obj.value;
        }))
      }

    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, {minHeight: Math.round(windowHeight)}]} >
        <ImageBackground source={img} resizeMode='cover' style={styles.img}>
          <View style={styles.inputs}>
            <Text style={styles.pageInfo}>Create Your Account</Text>
            <TextInput
              style={styles.inputFields}
              onChangeText={(email) => setEmail(email)}
              value={email}
              placeholder="Enter Email"
              />
            <TextInput
            style={styles.inputFields}
            onChangeText={(password) => setPassword(password)}
            value={password}
            placeholder="Create Password"
            />
            <TextInput
            style={styles.inputFields}
            onChangeText={(username) => setUsername(username)}
            value={username}
            placeholder="Create Username"
            />
          </View>
          <View style={styles.checkBoxesContainer}>
            <Checkbox
              value={italianIsChecked.checked}
              onValueChange={(e) => {
                setItalianIsChecked({...italianIsChecked, checked: e})
                saveCheck(italianIsChecked)
            }}></Checkbox><Text style={styles.checkBoxText}>italian</Text>
            <Checkbox
              value={greekIsChecked.checked}
              onValueChange={(e) => {
                setGreekIsChecked({...greekIsChecked, checked: e})
                saveCheck(greekIsChecked)
            }}>
            </Checkbox><Text style={styles.checkBoxText}>greek</Text>
            <Checkbox
              value={americanIsChecked.checked}
              onValueChange={(e) => {
                setAmericanIsChecked({...americanIsChecked, checked: e})
                saveCheck(americanIsChecked)
              }}></Checkbox><Text style={styles.checkBoxText}>american</Text>
          </View>
          <View style={styles.checkBoxesContainer}>
            <Checkbox
              value={chineseIsChecked.checked}
              onValueChange={(e) => {
                setChineseIsChecked({...chineseIsChecked, checked: e})
                saveCheck(chineseIsChecked)
              }}></Checkbox><Text style={styles.checkBoxText}>chinese</Text>
            <Checkbox
              value={mexicanIsChecked.checked}
              onValueChange={(e) => {
                setMexicanIsChecked({...mexicanIsChecked, checked: e})
                saveCheck(mexicanIsChecked)
              }}></Checkbox><Text style={styles.checkBoxText}>mexican</Text>
            <Checkbox
              value={indianIsChecked.checked}
              onValueChange={(e) => {
                setIndianIsChecked({...indianIsChecked, checked: e})
                saveCheck(indianIsChecked)
              }}></Checkbox><Text style={styles.checkBoxText}>indian</Text>
          </View>
          <View style={styles.buttons}>
            <GenericButton text={'Submit Account Details'} onPress={handleSubmit}/>
            <GenericButton text={'Back to Login'} onPress={backToLogin}/>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:40,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  img:{
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  inputs:{
    flex: 1,
    // backgroundColor: 'yellow',
    justifyContent:'center',
    alignItems: 'center',
    padding: 20
  },
  checkBoxesContainer:{
    marginLeft:40,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    flex:.2,
    // backgroundColor:'blue'
  },
  checkBox:{
    color:'black'
  },
  checkBoxText:{
    marginLeft:5,
    marginRight:45,
    fontWeight:'bold',
    fontSize: 15
  },
  buttons:{
    justifyContent:'center',
    alignItems:'center',
    color:'orange',
    flex:1,
    // backgroundColor: 'green',
  },
  inputFields:{
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#777',
    padding: 8,
    margin: 15,
    height: 50,
    width:300,
    borderRadius: 100/ 5,
  },
  pageInfo:{
    fontSize:20,
    justifyContent:'center',
    alignItems:'center',
    fontWeight:'bold'
  },
})