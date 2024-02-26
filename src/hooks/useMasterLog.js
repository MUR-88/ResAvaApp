import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterLogActivity from "../assets/Model/master_log_activity";
import { Q } from "@nozbe/watermelondb";

export const useMasterLog = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB'

  // todo
  //
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getAllLog() {
    setIsLoading(true);
    const allLogActivity = database
      .get(MasterLogActivity.table)
      .query(Q.experimentalJoinTables(["master_machine"]))
      .observe()
      .subscribe((masterLog) => {
        // When changes occur, update the data and set loading state to false
        setData(masterLog.map((masterLog) => masterLog._raw));
        setIsLoading(false);
      });
    return allLogActivity;
  }

  useEffect(() => {
    // const subscription = getAllLog();
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if (isGetData) {
      const masterLog = getAllLog();
      return () => masterLog.unsubscribe();
    }
  }, []);

  return { data, connected, isLoading };
};
