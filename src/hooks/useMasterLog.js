import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterLogActivity from "../assets/Model/master_log_activity";

export const useMasterLog = ({ isGetData }) => {
  // const . cari connected atau tidak
  // setelah itu useEffect untuk ambil data dari API jika connected, jika tidak ambil data dari WatermelonDB
  const [connected, setConnected] = useState(undefined);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetching() {
    await synchronize({
      database,
      pullChanges: async ({ schemaVersion, lastPulledAt, migration }) => {
        const urlParams = `last_pulled_at=${lastPulledAt}&schema_version=${schemaVersion}&migration=${encodeURIComponent(
          JSON.stringify(migration)
        )}`;
        const response = await API.get(`log_activity/sync?${urlParams}`);
        // Check if the request was successful
        if (response.status_code !== 200) {
          throw new Error(
            `Request failed with status ${response.status}`
          );
        }
        const timestamp =  dayjs().unix();

        return { changes: response.data, timestamp: timestamp };
      },
    })
  }

  function getAllLog() {
    setIsLoading(true);
    const allLogActivity = database
      .get(MasterLogActivity.table)
      .query()
      .observe()
      .subscribe((masterLog) => {
        console.log("masterLog", );
        setData(masterLog.map((masterLog) => masterLog._raw));
        setIsLoading(false);
      });
    return allLogActivity;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if(isGetData){
      const masterLog = getAllLog();
      return () => masterLog.unsubscribe();
    }
  }, []);

  return { data, connected, isLoading, fetching };
};
