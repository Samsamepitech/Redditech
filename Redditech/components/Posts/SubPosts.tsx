import {View, Text, StyleSheet, ScrollView, Image, Alert} from 'react-native';
import { Stack, Button, Avatar } from "@react-native-material/core";
import React, {useState, useEffect, useCallback} from 'react';
import { PostTypes } from '../../constants/types/PostTypes';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio, Video } from 'expo-av';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialCommunityIcons, Entypo, FontAwesome5, Ionicons } from '@expo/vector-icons';
import YoutubePlayer from 'react-native-youtube-iframe';



function kFormatter(num: any) {
  return Math.abs(num) > 999 ? Math.sign(num) * Math.abs(num) + 'k' : Math.sign(num)*Math.abs(num)}

  function ImageDisplayer(url:any){
    const image = url.split(".").pop();}

export default function SubPosts () {

  const [posts, setPostData] = useState<Array<PostTypes>>([]);
  const [text, setQuery] = React.useState("");


useEffect(() => {
 const getPosts = async() => {

  let token = await AsyncStorage.getItem('access_token')
      fetch('https://oauth.reddit.com/new.json' + text , {
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


/*
const [playing, setPlaying] = useState(false);

const onStateChange = useCallback((state) => {
  if (state === "ended") {
    setPlaying(false);
    Alert.alert("video has finished playing!");
  }
}, []);

const togglePlaying = useCallback(() => {
  setPlaying((prev) => !prev);
}, []);



}*/




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

      <View style={styles.image_cont}>
        {post.data.post_hint == "image"
        ? <Image source={{uri: post.data.url}} style={{ width:post.data.thumbnail_width, height:post.data.thumbnail_height, marginBottom:10}}/>
        :   <Video

          source = {{ uri: post.data.url}}
          style= {{ width: 250, height: 250 , marginBottom:10 }}
          useNativeControls
          isLooping

          />





      }


      </View>

          <View style={styles.icons}>
          <Ionicons name="people-outline" size={30} color="black" />
          <Text> {kFormatter(post.data.subreddit_subscribers)} </Text>
          <Ionicons name="chatbubble-ellipses-outline" size={30} color="blue" />
          <Text> {post.data.num_comments} </Text>
          <Ionicons name="arrow-up" size={30} color="green" />
          <Text > {post.data.ups} </Text>
          <Ionicons name="arrow-down" size={30} color="red" />
          <Text >{post.data.downs} </Text>
          </View>
        </View>
    </View>
    )})}
    </ScrollView>
    </>
    );
  };


const styles = StyleSheet.create({

  container:{
    height: '30em',
    backgroundColor: 'white',
    borderBottomColor: 'gray',
    marginBottom: '2em',
    padding: '2em',
    border: 'gray 2px solid',
    borderRadius: 10,
    shadowColor: 'gray',
    shadowRadius: 10,
    shadowOpacity: 50,
  },
  auth:{
    fontWeight: 'bold',
    textAlign: 'right',
  },
  selftext:{
    margin: '1em',
    fontSize:16,
    overflow: 'hidden',
    ellipsizeMode:'tail',
    numberOfLines: 6
  },
  title:{
    textTransform: 'uppercase',
    alignContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'flex-end',
    height: 10,
    fontSize:18
  },
  image_cont:{
    width:'90%',
    height: 'auto',
    alignContent: 'center',
    backgroundColor: 'lwhite'
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
    borderRadius: 15,
    margin: 10,
},

});

/**icons: rocket, send, comments, home, feed(wifi) */