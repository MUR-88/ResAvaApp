import React, { useEffect, useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { SafeAreaView } from "react-native-safe-area-context";
import database from "../../assets/Model/db";
import { Button } from "react-native-web";

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
      const postsCollection = database.get("google.com");
      const allPosts = await postsCollection.query().fetch();
      console.log(allPosts);
      setPosts(allPosts);
      console.log(database);
    };

    fetchPosts();
  }, []);

  return (
    <SafeAreaView>
      <View>
        {isConnected ? (
          <Text style={[styles.style]}>Connected</Text>
        ) : (
          <Alert.Alert title="No Internet Connection" />
        )}
      </View>
    </SafeAreaView>
  );
};

export default NewForm;
const styles = StyleSheet.create({
  style: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    color:'green'
  }

});