import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import MasterSector from "../assets/Model/master_sectors";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterMainActivities from "../assets/Model/master_main_activity";

export const useMasterMainActivity = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getAllMainActivity() {
    setIsLoading(true);
    const allMainActivity = await database
      .get(MasterMainActivities.table)
      .query()
      .fetch();

    setData(allMainActivity.map((mainActivity) => mainActivity._raw));
    setIsLoading(false);
    return allMainActivity;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if (isGetData) {
      const mainActivity = getAllMainActivity();
      return () => mainActivity;
    }
  }, []);

  return { data, connected, isLoading };
};
