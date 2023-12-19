import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useMasterSector = () => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
  }, []);
  
  useEffect(() => {
    if(connected !== undefined){
        // if(connected){
        //     // ambil data dari API
        //     // update data dari API ke WatermelonDB
        // } else {
        //     // ambil data dari WatermelonDB
        //
        // }
    }
  }, [connected]);
  return { data, connected, isLoading };
};
