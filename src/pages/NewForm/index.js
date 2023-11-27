import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import database from "../../assets/Model/db";

const NewForm = () => {
    
  const [isConnected, setIsConnected] = useState(true);

  const checkInternetConnection = async () => {
    const netInfoState = await NetInfo.fetch();
    setIsConnected(netInfoState.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkInternetConnection();
  }, []);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // // const postsCollection = database.get("master_companies");
      // const allPosts = await postsCollection.query().fetch();
      // console.log(allPosts)
      // setPosts(allPosts);
      console.log(database)
    };

    fetchPosts();
  }, []);

  return (
    <SafeAreaView>
      <View>
        {isConnected ? (
          <Text>Connected to the Internet</Text>
          // {posts.map((post) => (
            // <Text key={post.id}>{post.title}</Text>
          // ))}
        ) : (
          <Alert.Alert title="No Internet Connection" />
        )}
        {/* <View>
          {posts.map((post) => (
            <Text key={post.id}>{post.title}</Text>
          ))}
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default NewForm;
