import * as React from 'react';
import {useEffect, useState} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, Button, ScrollView, Image,  Modal, Pressable  } from "react-native";
import { Router } from 'express';
import {Avatar} from "@react-native-material/core";



export default function  Filters () {


  const [ hots, setHots] = useState([]);
  const [ tops, setTops] = useState([]);
  const [ bests, setBests] = useState([]);




  const getHot= async() => {
    let token = await AsyncStorage.getItem('access_token');

    console.log(token);

      fetch( 'https://oauth.reddit.com/hot?limit=10', {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Authorization': 'Bearer ' + token,
      },
      })
      .then(response => response.json())
      .then(result => setHots(result.data.children))
      .catch(error => console.log('error', error));

  }
  console.log(hots);

  const getTop= async() => {
    let token = await AsyncStorage.getItem('access_token');

    console.log(token);

      fetch( 'https://oauth.reddit.com/top?limit=10', {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Authorization': 'Bearer ' + token,
      },
      })
      .then(response => response.json())
      .then(result => setTops(result.data.children))
      .catch(error => console.log('error', error));

  }

  console.log(tops);
//}, []);

  const getBest= async() => {
    let token = await AsyncStorage.getItem('access_token');

    console.log(token);

      fetch( 'https://oauth.reddit.com/best?limit=10', {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
        headers: {
          'Authorization': 'Bearer ' + token,
      },
      })
      .then(response => response.json())
      .then(result => setBests(result.data.children))
      .catch(error => console.log('error', error));

  }

  console.log(bests);



  return (
<>
<View>
        <Button
        style={styles.button}
        title="top"
        onPress={() => getTop()}
        color="#63AD90"
        />

        <Button
          style={styles.button}
          title="best"
          onPress={() => getBest()}
          color="#63AD90"
        />
         <Button
          style={styles.button}
          title="hot"
          onPress={() => getHot()}
          color="#63AD90"
        />

      <View>

        {tops.map(( top: any) => { return (


            <View style={styles.container}>
              <Avatar image={{ uri: top.data.thumbnail }} />
          <Text style={styles.auth}> {top.data.author}</Text>
          <Text style={styles.title}> {top.data.title}</Text>
          <Text style={styles.selftext}> {top.data.selftext} </Text>
          <Image source={{uri: top.data.data.url}} style={{width:top.data.thumbnail_width, height:top.data.thumbnail_height, marginBottom:10}}/>
          </View>
           )})}
           </View>

       <View >
        {bests.map(( best: any) => { return (
          <View style={styles.container}>
            <Avatar image={{ uri: best.data.thumbnail }} />
            <Text style={styles.auth}> {best.data.author}</Text>
            <Text style={styles.title}> {best.data.title}</Text>
            <Text style={styles.selftext}> {best.data.selftext} </Text>
            <Image source={{uri: best.data.url}} style={{width:best.data.thumbnail_width, height:best.data.thumbnail_height, marginBottom:10}}/>
          </View>
           )})}
       </View>

       <View >
        {hots.map(( hot: any) => { return (
          <View style={styles.container}>
            <Avatar image={{ uri: hot.data.thumbnail }} />
            <Text style={styles.auth} > {hot.data.author}</Text>
            <Text style={styles.title}> {hot.data.title}</Text>
            <Text style={styles.selftext}> {hot.data.selftext} </Text>
            <Image source={{uri: hot.data.url}} style={{width:hot.data.thumbnail_width, height:hot.data.thumbnail_height, marginBottom:10}}/>
          </View>


        )})}
        </View>


        </View>

     </>
  );
};

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
  auth:{
    fontWeight: 'bold',
  },
  selftext:{
    margin: '1em',
    fontSize:16,
    ellipsizeMode:'tail',
    numberOfLines: 6
  },
  title:{
    textTransform: 'uppercase',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image:{
    width: 25,
    height: 'auto',
  },
  icons:{
    alignItems: 'flex-end'
  },
  button:{
    alignItems: 'flex-end',
    marginBottom: '2em',
  }

})
