import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterMachine from "../assets/Model/master_machine";

export const useMasterMachine = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllMachine() {
    setIsLoading(true);
    const getAllMachine = await database
      .get(MasterMachine.table)
      .query()
      .fetch();
    setData(getAllMachine.map((masterMachine) => masterMachine._raw));
    setIsLoading(false);
    return getAllMachine;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if (isGetData) {
      const masterMachine = getAllMachine();
      return () => masterMachine;
    }
    // const masterMachine = getAllMachine();
    // return () => masterMachine.unsubscribe();
  }, []);

  return { data, connected, isLoading };
};
