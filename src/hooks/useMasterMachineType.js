import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import MasterSector from "../assets/Model/master_sectors";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterMachineType from "../assets/Model/master_machine_types";

export const useMasterMachineType = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAllMachineType() {
    setIsLoading(true);
    const allMachineType = database
      .get(MasterMachineType.table)
      .query()
      .observe()
      .subscribe((masterMachineType) => {
        // console.log("masterMachineType", );
        setData(masterMachineType.map((masterMachineType) => masterMachineType._raw));
        setIsLoading(false);
      });
    return allMachineType;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if(isGetData){
      const machineType = getAllMachineType();
      return () => machineType.unsubscribe();
    }
    // const masterMachineType = getAllMachineType();
    // return () => masterMachineType.unsubscribe();
  }, []);

  return { data, connected, isLoading,  };
};
