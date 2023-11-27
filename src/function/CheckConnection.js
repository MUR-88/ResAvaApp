import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const CheckConnection = () => {
  const [isConnected, setIsConnected] = useState(true);

  const checkInternetConnection = async () => {
    const netInfoState = await API.fetch();
    setIsConnected(netInfoState.isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    checkInternetConnection();
  }, []);

  return (
    <View>
      {isConnected ? (
        <Text>Connected to the Internet</Text>
      ) : (
        <Alert.Alert title="No Internet Connection" />
      )}
    </View>
  );
};

export default CheckConnection;