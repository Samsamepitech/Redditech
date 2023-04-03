import {View, Text, StyleSheet, ScrollView, Image} from 'react-native';
import { Stack, Button, Avatar } from "@react-native-material/core";
import React, {useState, useEffect} from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { PostTypes } from '../constants/types/PostTypes';



export default function Comments () {

  const [posts, setPostData] = useState<Array<PostTypes>>([]);
  const [text, setQuery] = React.useState("");
  const subreddit = "";

useEffect(() => {
 const getPosts = async() => {
     const postID = "";
     const sort = "old";
     const threded = false;

  let token = await AsyncStorage.getItem('access_token')
      fetch(`https://oauth.reddit.com/comments/${postID}?sort=${sort}&threded=${threded}` + text, {
        method: 'GET',
        mode: 'cors',
        redirect: 'follow',
      headers: {
          Authorization: "Bearer" + token
        },

      })
      .then((response) => response.json())
      .then((result) => setPostData(result.data.children))
      .catch((err) => console.log("error", err))
 };
 getPosts();
 console.log(posts)
}, []);

  return (
    <>
    <ScrollView>
      {posts.map((post:any) => { return (
     <View >
        <View style={styles.container}>
        <Avatar image={{ uri: post.data.thumbnail }} />
        <Text> {post.data.subreddit_name_prefixed}</Text>
          <Text style={styles.auth} > {post.data.author}</Text>
          <Text style={styles.title}> {post.data.title}</Text>
          <Text style={styles.selftext}> {post.data.selftext} </Text>
         
          <View style={styles.icons}>
          <Ionicons name="arrow-up" size={32} color="green" />
          <Text > {post.data.ups} </Text>
          <Ionicons name="arrow-down" size={32} color="red" />
          <Text >{post.data.downs} </Text>
          <Image source={{uri: post.data.url}} style={styles.image}/>
          </View>
          {post.data.post_hint == "image" ? 
            <Image source={{uri: post.data.url}} style={styles.image}/>
          : <view></view>}
          { post.data.post_hint == "hosted:video" ? 
            <Image source={{ uri: post.data.media?.reddit_video.scrubber_media.url }}  />
      : <Text> {post.data.post_hint} !!! </Text>}
        
       
        </View>
    </View>
    )})}
    </ScrollView>
    </>
    );
  };


const styles = StyleSheet.create({ 
 
  container:{
    height: 'auto', 
    backgroundColor: 'white', 
    borderBottomColor: 'black',  
    marginBottom: '2em',
    padding: '2em'
  },
  auth:{
    fontWeight: 'bold',
  },
  selftext:{
    margin: '1em',
    fontSize:16,
  },
  title:{
    textTransform: 'uppercase',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image:{
    width: 250,
    height: 'auto',
  },
  icons:{
    flex: 1,
    alignItems: 'flex-end'
  },

})