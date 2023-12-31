import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { synchronize } from "@nozbe/watermelondb/sync";
import { database } from "../assets/Model/db";
import API from "../function/API";
import dayjs from "dayjs";
import MasterMainActivities from "../assets/Model/master_main_activity";

export const useMasterMainActivity = ({isGetData}) => {
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
        const response = await API.get(`master_main_activity/sync?${urlParams}`);
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

  function getAllMainActivity() {
    setIsLoading(true);
    const allMainActivity = database
      .get(MasterMainActivities.table)
      .query()
      .observe()
      .subscribe((masterMainActivity) => {
        console.log("masterMainActivity", );
        setData(masterMainActivity.map((masterMainActivity) => masterMainActivity._raw));
        setIsLoading(false);
      });
    return allMainActivity;
  }

  useEffect(() => {
    const checkInternetConnection = async () => {
      const netInfoState = await NetInfo.fetch();
      setConnected(netInfoState.isConnected);
    };
    checkInternetConnection();
    if(isGetData){
      const mainActivity = getAllMainActivity();
      return () => mainActivity.unsubscribe();
    }
    // const mainActivity = getAllMainActivity();
    // return () => mainActivity.unsubscribe();
  }, []);

  return { data, connected, isLoading, fetching };
};
