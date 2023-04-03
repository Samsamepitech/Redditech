import * as React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, TextInput, Text, FlatList, StyleSheet, Image,  Modal, Pressable, Alert } from "react-native";
import {ScrollView, TouchableOpacity} from "react-native";
import { ListItem, SearchBar } from "react-native-elements";
import SubPosts from './Posts/SubPosts';
import Filters from '../components/Filters';


export default function  Search () {
  const [ sub, setSubreddit] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);


  //useEffect(() => {
    const getSearch = async () => {
      let token = await AsyncStorage.getItem('access_token');

     console.log(token);

        fetch( `https://oauth.reddit.com/r/subreddit/search?q=${searchQuery} `, {
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          headers: {
            'Authorization': 'Bearer ' + token
        },
        })
        .then(response => response.json())
        .then(result =>
          setSubreddit(result.data.children))
        .catch(error => console.log('error', error));

    }
    console.log(sub);
  //}, []);


  return (
   <>
      <View>

            <SearchBar
                onChangeText={setSearchQuery}
                value={searchQuery}
                placeholder="Search subreddits"
                onSubmitEditing={getSearch}

                />

    {sub.map((su: any) => { return (

           <View style={styles.container}>
             <Text style={styles.name}> {su.data.subreddit}</Text>
             <Image
             source= {{uri:su.data.thumbnail}}
             style = {styles.avatar}/>
             <Text style={styles.detail}>  {su.data.subreddit_name_prefixed}</Text>
             <Text style={styles.detail}>  {su.data.title}</Text>
             <Text style={styles.detail}> number of subcribers : {su.data.subreddit_subscribers}</Text>
             <Text style={styles.description}>{su.data.public_description}</Text>

            <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
          <Filters route={undefined} />
          <SubPosts/>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Posts</Text>
      </Pressable>
</View>


    )})}

     </View>
    </>
  );
    }


const styles = StyleSheet.create({
  container:{
    height: 'auto',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    marginBottom: '2em',
    padding: '2em',
    border: 'gray 2px solid',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  name: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    textAlign: 'left',
  },
  detail: {
    fontSize: 16,
    color: '#696969',
    marginTop: 1,
    textAlign: 'left',
  },
  description: {
    fontSize: 18,
    color: 'black',
    marginTop: 15,
    marginRight: 5,
    textAlign: 'left',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginLeft: 10,
    position: 'relative',
    marginTop: 20,
  },
  SearchBar:{
    height: 50,
  width: '100%',
  paddingLeft: 10,
  borderWidth: 1,
  borderColor: '${COLORS.GREY.VERY_LIGHT_GREY}',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    shadowColor: 'black',
    shadowRadius: 5,
  },
  buttonOpen: {
    backgroundColor: "#CACACA",
    margin: '1em',
    width: '30%',
    alignSelf: 'center'
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: 'white',
    textShadowRadius: 4
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
  });