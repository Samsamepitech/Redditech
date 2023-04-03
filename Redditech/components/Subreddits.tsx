import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import {useEffect, useState} from 'react';
import axios from 'axios'
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, Alert, Modal, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { PostTypes } from '../constants/types/PostTypes';
import { InfiniteQueryObserver, useInfiniteQuery } from 'react-query';
import SubPosts from './Posts/SubPosts';
import Filters from '../components/Filters';


//const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Subreddits () {

  const [subs, setSubreddits] = useState<Array<String>>([]);
  const [posts, setPosts] = useState([])

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const getSubreddits= async() => {

      let token = await AsyncStorage.getItem('access_token');
        fetch('https://oauth.reddit.com/subreddits/mine',{
          method: 'GET',
          mode: 'cors',
          redirect: 'follow',
          headers: {
            'Authorization': 'Bearer ' + token,
        },
        })
        .then(response => response.json())
        .then(result => setSubreddits(result.data.children))
        .catch(error => console.log('error', error));

    }
    getSubreddits()
    console.log(subs);
    }, []);

return (
<>
       <View style={styles.container}>
            {subs.map(( sub: any) => { return (
            <View style={styles.subred} >
               <View style={styles.header}>
           {sub.data.header_img !== "" ?
             <Image
                style={styles.avatar}
                source={{uri: sub.data.header_img}}
              />
           :
             <Image source={require('../assets/images/logo-reddit.png')}/>
           }
               </View>
              <View style={styles.body}>
              <View>
                <Text style={styles.name}>
                  {sub.data.display_name}
                </Text>
                <Text>  {sub.data.title}</Text>
                <Text style={styles.detail}>
                  {sub.data.subscribers} subscribers 0{' '}
                  {sub.data.active_user_count} online
                </Text>
                <Text style={styles.description}>
                  {sub.data.public_description}
                </Text>
              </View>
            </View>
            <Modal
        animationType="slide"
        transparent={true}
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
        <Text style={styles.textStyle}>Show New Posts</Text>
      </Pressable>
</View>
        )})}
        </View>
</>
);
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'space-between',
    padding:20,
    backgroundColor: 'transparent'
  },
  subred: {
    height: 'auto',
    marginBottom: '1em',
    padding: '1em',
    borderRadius: 10,
    shadowColor: 'gray',
    shadowRadius: 5,
  },
  header: {
    backgroundColor: '#B00256',
    height: 100,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginLeft: 10,
    position: 'absolute',
    marginTop: 20,
  },
  body: {
    marginTop: 20,
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


export const useSubs = (sort: string) =>
  useInfiniteQuery(['subs', sort]);
